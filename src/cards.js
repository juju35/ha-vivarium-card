// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------
import { ICONS } from "./core.js";
import { clamp, domainOf, esc, fmtDuration, fmtNum, fmtState, fmtUnit, intlLocale, num, svgIcon, t, valid } from "./helpers.js";
import { morph } from "./shadow-dom-patching.js";
import { AQUA_METRICS, DEFAULT_COLLAPSED, KIND_METRICS, SHORT, WATER_KINDS, deviceName, kindOf, sceneOf, setupOf } from "./entity-roles-discovery.js";
import { PROFILES, RANK, TIP_KEYS, levelOf, rangeOf, scaleOf, trackOf, worst } from "./water-quality.js";
import { FEEDING_MS, brightnessPct, fedAt, heating, isMoon, isOn, levelLow, serviceMs, targetOf } from "./equipment-states.js";
import { THEME_ART, sceneSvg, themedStyle } from "./tank.js";
import { BASE_STYLE, FULL_STYLE, MINI_STYLE } from "./styles.js";

// Home Assistant dialogs (more-info opened from the card): a click there is not a click elsewhere on the page.
export const DIALOG_TAGS = new Set(["HA-MORE-INFO-DIALOG", "HA-DIALOG", "DIALOG"]);
// The width of an element's text as laid out (whole, even when its box cuts it with an ellipsis).
export const textWidth = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width || el.scrollWidth;
};

export const isOutside = (card, ev) => {
  const path = ev.composedPath();
  return !path.includes(card) && !path.some((n) => DIALOG_TAGS.has(n.tagName));
};
// After the popup closes, clicks are ignored this long (second click of a double click on OK).
export const CONFIRM_GUARD_MS = 400;

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable sends no click to the page. The handler runs when the press and the
// release are both outside the card (a slider dragged out of the card does not count, and a scroll cancels the
// pointer); keyboard clicks (no click count) still go through the click event. `tap(ev)` is for the tests.
export const watchOutside = (card, handler) => {
  let downOutside = false;
  const outside = (ev) => !ev.composedPath().includes(card);
  const onDown = (ev) => {
    downOutside = outside(ev);
  };
  const onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  const onClick = (ev) => {
    if (ev.detail === 0 && outside(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("pointerup", onUp, true);
      document.addEventListener("click", onClick, true);
    },
    off() {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
    },
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
  };
};

export const METRIC_ICONS = {
  water_temperature: ICONS.water_temp,
  ph: ICONS.ph,
  ammonia: ICONS.ammonia,
  nitrite: ICONS.nitrite,
  nitrate: ICONS.nitrate,
  phosphate: ICONS.phosphate,
  kh: ICONS.kh,
  gh: ICONS.gh,
  calcium: ICONS.ca,
  magnesium: ICONS.mg,
  salinity: ICONS.salt,
  orp: ICONS.orp,
  conductivity: ICONS.conductivity,
  tds: ICONS.tds,
  oxygen: ICONS.oxygen,
  air_temperature: ICONS.air_temp,
  hot_spot: ICONS.hot_spot,
  cold_spot: ICONS.cold_spot,
  humidity: ICONS.humidity,
  uv_index: ICONS.uv_index,
};
// The default name of each kind of tank, and the icon of its badge (the animal of its scene when there is one).
export const KIND_NAME = { reef: "reef", freshwater: "freshwater", terrarium: "terrarium", turtle: "turtle_tank" };
export const SCENE_ICONS = {
  reef: "jellyfish",
  sps: "jellyfish",
  soft_coral: "jellyfish",
  nano_reef: "jellyfish",
  jellyfish: "jellyfish",
  abyss: "jellyfish",
  desert: "cactus",
  rainforest: "leaf",
  leopard_gecko: "cactus",
  chameleon: "leaf",
  ball_python: "snake",
  tarantula: "spider",
  insects: "ladybug",
  crested_gecko: "leaf",
  paludarium: "leaf",
  hermit_crab: "shell",
  tortoise: "tortoise",
  turtle: "turtle",
  musk_turtle: "turtle",
};
export const badgeIcon = (m) => ICONS[SCENE_ICONS[m.scene] || (m.kind === "terrarium" ? "terrarium" : m.kind === "turtle" ? "turtle" : m.kind === "reef" ? "jellyfish" : "fish")];
export const accentStyle = (hass) => `:host { --aq-accent: ${hass?.themes?.darkMode ? "#4fc3f7" : "#0288d1"}; }`;
// Switches the card can turn on and off.
export const TOGGLE_DOMAINS = new Set(["switch", "input_boolean", "light", "fan", "valve"]);

export class VivariumCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._html = "";
    this._toggled = new Map();
    this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
    // Enter / Space on an element with the button role acts as a click.
    this.shadowRoot.addEventListener("keydown", (ev) => {
      this._byPointer = false;
      if ((ev.key !== "Enter" && ev.key !== " ") || ev.target?.getAttribute?.("role") !== "button") return;
      ev.preventDefault();
      ev.target.click();
    });
    // No rewrite of the card between the press and the release: a rewrite under the pointer can replace the element
    // pressed, so that the click does nothing. The pending render is done once released.
    this.shadowRoot.addEventListener("pointerdown", () => {
      this._byPointer = true;
      this._pressing = true;
      window.addEventListener("pointerup", this._onPressEnd, true);
      window.addEventListener("pointercancel", this._onPressEnd, true);
    });
    this._onPressEnd = () => {
      window.removeEventListener("pointerup", this._onPressEnd, true);
      window.removeEventListener("pointercancel", this._onPressEnd, true);
      setTimeout(() => {
        if (!this._pressing) return;
        this._pressing = false;
        if (this._dirty) {
          this._dirty = false;
          this._update();
        }
      }, 0);
    };
    this._onKey = (ev) => {
      if (ev.key !== "Escape" || !this._confirm) return;
      ev.stopPropagation();
      this._closeConfirm();
    };
  }

  static getConfigElement() {
    return document.createElement("vivarium-card-editor");
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 7;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...config };
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    this._html = "";
    this._lastDeps = null;
    this._update();
  }

  // Home Assistant pushes a new hass on every state change: the card is only redrawn when something it shows changed.
  set hass(hass) {
    this._hass = hass;
    const deps = this._deps();
    const prev = this._lastDeps;
    if (deps && prev && deps.length === prev.length && deps.every((d, i) => d === prev[i])) return;
    this._lastDeps = deps;
    this._update();
  }

  get hass() {
    return this._hass;
  }

  _deps() {
    const h = this._hass;
    if (!h || !this._config) return null;
    const setup = setupOf(h, this._config);
    if (setup.error) return null;
    // The minute: the feeding scene and "fed 2 h ago" move on with time.
    return [h.entities, h.devices, h.areas, h.language, h.locale, h.themes?.darkMode, Math.floor(Date.now() / 60000), ...Object.values(setup.roles).map((id) => h.states[id])];
  }

  connectedCallback() {
    // A click elsewhere on the page folds the sections back to their defaults and closes the popup.
    this._onOutside ??= (ev) => {
      if ((!this._toggled.size && !this._confirm) || !isOutside(this, ev)) return;
      this._toggled = new Map();
      if (this._confirm) this._closeConfirm();
      else this._update();
    };
    (this._onOutsideWatch ??= watchOutside(this, (ev) => this._onOutside(ev))).on();
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === "function") {
      this._resize ??= new ResizeObserver((entries) => {
        const w = Math.round(entries.at(-1).contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._resize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._update?.();
    if (this._confirm) window.addEventListener("keydown", this._onKey);
    clearInterval(this._tick);
    this._tick = setInterval(() => {
      if (this._hass) this.hass = this._hass;
    }, 60000);
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._tick = null;
    this._resize?.disconnect();
    this._resize = null;
    this._fitWidth = null;
    if (this._fitFrame) cancelAnimationFrame(this._fitFrame);
    this._onOutsideWatch?.off();
    this._pressing = false;
    window.removeEventListener("pointerup", this._onPressEnd, true);
    window.removeEventListener("pointercancel", this._onPressEnd, true);
    // Left (another dashboard view, a conditional card hidden): back to the default state, folded, popup closed
    // without running anything.
    this._toggled = new Map();
    this._confirm = null;
    window.removeEventListener("keydown", this._onKey);
  }

  _t(key, vars) {
    return t(this._hass, this._config, key, vars);
  }

  _locale() {
    return intlLocale(this._hass, this._config);
  }

  _s(id) {
    return id ? this._hass.states[id] : undefined;
  }

  // Service call whose failure Home Assistant already reports (toast): handled so that it is not "Uncaught (in promise)".
  _call(domain, service, data) {
    return Promise.resolve(this._hass.callService(domain, service, data)).catch(() => {});
  }

  _update() {
    if (!this._hass || !this._config) return;
    if (this._pressing) {
      this._dirty = true;
      return;
    }
    this._dirty = false;
    let html = this._render();
    if (this._confirm) html = html.replace(/<ha-card([^>]*)>([\s\S]*)<\/ha-card>\s*$/, (_, attrs, inner) => `<ha-card${attrs.replace(/class="/, 'class="dialog-open ')}>${inner}${this._confirmHtml()}</ha-card>`);
    if (html === this._html) return;
    this._html = html;
    morph(this.shadowRoot, html);
    this._fitPill();
    // A new <ha-card> (first render) shows its content once Home Assistant has rendered it (Lit, a microtask
    // later): the pill measured on the empty card is measured again then, before the frame is painted.
    const card = this.shadowRoot.querySelector?.("ha-card");
    if (card && card !== this._fitCard) {
      this._fitCard = card;
      if (card.hasUpdated === false && card.updateComplete?.then) card.updateComplete.then(() => this._fitPill());
    }
    // The popup's safe choice (Cancel) gets the focus: Enter or Space right after the click does not stop anything.
    if (this._confirm) this.shadowRoot.querySelector?.('.modal [data-action="confirm_cancel"]')?.focus({ preventScroll: true });
  }

  // The header's status pill goes right after the title, on its row, only while the whole title and the pill's
  // whole label fit there; otherwise it takes a line of its own under the subtitle (.below, the subtitle on one
  // line). When that does not fit above the substrate strip, the pill keeps its dot alone (.dot-only, its label in
  // its tooltip and for screen readers). Measured after each render and on each new width, in every language.
  _fitPill() {
    if (!this.isConnected) return;
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const row = t.querySelector(":scope > .title-row");
      const chip = row?.querySelector(":scope > .chip");
      if (!chip?.getBoundingClientRect) continue;
      t.classList.remove("below", "dot-only");
      const name = row.querySelector(".name");
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const title = name && getComputedStyle(name).visibility !== "hidden" ? textWidth(name) + gap : 0;
      if (title + chip.getBoundingClientRect().width <= t.getBoundingClientRect().width + 0.5) continue;
      t.classList.add("below");
      const banner = t.closest(".banner");
      const ground = banner?.querySelector(".ground");
      const floor = ground ? ground.getBoundingClientRect().top : banner?.getBoundingClientRect().bottom;
      const box = t.getBoundingClientRect();
      const text = chip.querySelector(".chip-text");
      const whole = (!text || text.scrollWidth <= text.clientWidth + 0.5) && chip.getBoundingClientRect().right <= box.right + 0.5;
      if (whole && (floor === undefined || box.bottom <= floor + 0.5)) continue;
      t.classList.add("dot-only");
    }
  }

  // ----- Model -------------------------------------------------------------

  _model() {
    const setup = setupOf(this._hass, this._config);
    if (setup.error) return setup;
    const { roles } = setup;
    const c = this._config;
    const kind = kindOf(this._hass, c, setup);
    const scene = sceneOf(this._hass, c, setup, kind);
    const th = THEME_ART(scene);
    // In a dry terrarium a temperature probe with no word for air or water is the air's; the heater (a thermostat)
    // reads the air too.
    const src = { ...roles };
    const dry = kind === "terrarium" && !th?.wet && !PROFILES[scene]?.water_temperature;
    if (kind === "terrarium" && !src.air_temperature && src.water_temperature && dry) {
      src.air_temperature = src.water_temperature;
      delete src.water_temperature;
    }
    const mainTemp = kind === "terrarium" ? "air_temperature" : "water_temperature";
    const metrics = {};
    for (const role of KIND_METRICS[kind]) {
      let s = this._s(src[role]);
      // The main temperature: the heater's current temperature when there is no probe.
      if (!s && role === mainTemp) {
        const h = this._s(roles.heater);
        const v = h?.attributes?.current_temperature;
        if (Number.isFinite(v)) s = { entity_id: h.entity_id, state: String(v), attributes: { unit_of_measurement: this._hass.config?.unit_system?.temperature || "°C" } };
      }
      if (!s) continue;
      const unit = s.attributes?.unit_of_measurement || "";
      const v = num(s);
      const range = rangeOf(role, unit, kind, v, c.ranges || {}, scene);
      metrics[role] = { role, entity: s.entity_id, v, unit: range.unit, range, ...levelOf(range, v) };
    }
    const quality = KIND_METRICS[kind].filter((r) => metrics[r]);
    const tips = [];
    for (const r of quality) {
      const m = metrics[r];
      if (!m.side) continue;
      const key = `${r}_${m.side}`;
      tips.push(TIP_KEYS.has(key) ? { cls: m.cls, key } : { cls: m.cls, key: `generic_${m.side}`, vars: { name: this._t(r) } });
    }
    const s = (r) => this._s(roles[r]);
    const now = Date.now();
    if (s("leak")?.state === "on") tips.push({ cls: "crit", key: "leak_tip" });
    if (valid(s("filter")) && !isOn(s("filter"))) tips.push({ cls: "warn", key: "filter_stopped" });
    if (valid(s("return_pump")) && !isOn(s("return_pump"))) tips.push({ cls: "warn", key: "return_stopped" });
    if (levelLow(s("water_level"), c.invert_level) && domainOf(roles.water_level) === "binary_sensor") tips.push({ cls: "warn", key: "level_tip" });
    const res = num(s("reservoir"));
    if (res !== null && s("reservoir").attributes?.unit_of_measurement === "%" && res < 15) tips.push({ cls: "warn", key: "reservoir_low" });
    const svc = serviceMs(s("service"));
    if (svc !== null && svc <= 0) tips.push({ cls: "warn", key: "service_tip" });
    tips.sort((a, b) => RANK[b.cls] - RANK[a.cls]);
    const status = worst([...quality.map((r) => metrics[r].cls).filter((l) => l !== "idle"), ...tips.map((tip) => tip.cls)]);
    const name = c.title || setup.area?.name || (setup.devices.length === 1 ? deviceName(setup.devices[0]) : "") || this._t(KIND_NAME[kind]);
    const feeder = s("feeder");
    const at = fedAt(feeder);
    const feeding = at !== null && now - at >= 0 && now - at < FEEDING_MS;
    return { ...setup, name, kind, scene, mainTemp, metrics, quality, tips, status, feeding, fedAt: at, now };
  }

  // Night in the tank: the option, else the light (off: night, dimmed: moonlight), else Home Assistant's dark theme
  // alone when the tank has no light entity (a light theme keeps the day picture after sunset).
  _lighting(m) {
    const light = this._s(m.roles.light);
    const mode = this._config.illustration_theme;
    if (mode === "night") return { dark: true, moon: true };
    if (mode === "day") return { dark: false, moon: false };
    if (light && valid(light)) {
      if (!isOn(light)) return { dark: true, moon: false };
      return isMoon(light) ? { dark: true, moon: true } : { dark: false, moon: false };
    }
    const dark = !!this._hass.themes?.darkMode;
    return { dark, moon: dark };
  }

  // What the scene draws and animates.
  _scene(m) {
    const r = m.roles;
    const light = this._s(r.light);
    const { dark, moon } = this._lighting(m);
    const rgb = light?.attributes?.rgb_color;
    const color = !dark && isOn(light) && Array.isArray(rgb) && rgb.length === 3 ? `rgb(${rgb.map((x) => clamp(Math.round(x), 0, 255)).join(",")})` : "";
    const filter = this._s(r.filter);
    const ret = this._s(r.return_pump);
    const air = this._s(r.air_pump);
    // The water moves with the filter (else the return pump); with neither, the tank is drawn running.
    const flowing = filter ? isOn(filter) : ret ? isOn(ret) : true;
    const algae = ["nitrate", "phosphate"].some((k) => m.metrics[k] && m.metrics[k].side === "high");
    const toxic = ["ammonia", "nitrite"].some((k) => m.metrics[k]?.cls === "crit");
    const heater = this._s(r.heater);
    // A terrarium's lamps: the entity's state, else lit in daytime.
    const lit = (role) => (r[role] ? isOn(this._s(r[role])) : !dark);
    return {
      kind: m.kind,
      scene: m.scene,
      spot: lit("basking"),
      uvb: lit("uv"),
      mist: r.mister ? isOn(this._s(r.mister)) : null,
      mat: isOn(this._s(r.heat_mat)),
      dark,
      moon,
      color,
      filter: flowing,
      // Bubbles: the air pump when there is one, else the filter's outflow.
      bubbles: air ? isOn(air) : flowing,
      co2: isOn(this._s(r.co2)),
      heat: heater ? heating(heater) : null,
      waves: isOn(this._s(r.wave_pump)),
      feeding: m.feeding,
      still: m.status === "crit",
      murky: toxic ? "crit" : algae ? "algae" : "",
    };
  }

  _banner(m, inner) {
    const st = this._scene(m);
    const th = THEME_ART(st.scene);
    const look = th ? themedStyle(st, th) : null;
    const cls = [
      "banner",
      st.kind === "reef" ? "reef" : "fresh",
      th ? "themed" : "",
      st.mat ? "mat" : "",
      th && th.ink === "light" ? "ink" : "",
      st.dark ? "dark" : "",
      st.dark && st.moon ? "moonlit" : "",
      st.heat ? "heating" : "",
      st.waves ? "waves" : "",
      st.still ? "still" : "",
    ]
      .filter(Boolean)
      .join(" ");
    // The parts drawn are in the key: a part appearing gets new nodes, so that its animation starts at once.
    const key = [st.scene, st.spot, st.uvb, st.mist, st.kind, st.dark, st.moon, st.color, st.filter, st.bubbles, st.co2, st.heat, st.feeding, st.murky].join("|");
    return `<div class="${cls}"${look ? ` style="${look.banner}"` : ""}>
      <div class="tank" data-key="${esc(key)}">${sceneSvg(st)}</div>
      <div class="ground"${look ? ` style="${look.ground}"` : ""}></div>
      ${inner}
    </div>`;
  }

  _statusText(status) {
    return this._t(`status_${status}`);
  }

  _chip(m) {
    const label = this._statusText(m.status);
    return `<span class="chip ${m.status}" title="${esc(label)}" aria-label="${esc(label)}"><span class="dot"></span><span class="chip-text">${esc(label)}</span></span>`;
  }

  // The badge, the name and the subtitle; the status pill on the title's line, right after the title.
  _titleBlock(m, sub, chip = "") {
    return `<div class="badge ${m.status === "idle" ? "" : m.status}">${svgIcon(badgeIcon(m))}</div>
      <div class="titles">
        <div class="title-row">
          <div class="name">${esc(m.name)}</div>
          ${chip}
        </div>
        ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
      </div>`;
  }

  _header(m, sub) {
    if (this._config.illustration === false)
      return `<div class="header${this._zoomButton() ? " zoomable" : ""}">${this._titleBlock(m, sub, this._chip(m))}${this._zoomButton("plain")}</div>`;
    const zoom = this._zoomButton();
    return this._banner(m, `<div class="head">${this._titleBlock(m, sub, this._chip(m))}</div>${zoom ? `<div class="corner">${zoom}</div>` : ""}`);
  }

  _zoomButton() {
    return "";
  }

  _errorCard(m) {
    const text = m.error === "unknown_device" ? `${this._t(m.error)}: ${m.detail}` : m.error === "unknown_area" ? `${this._t(m.error)}: ${this._config.area}` : this._t(m.error);
    return `<style>${BASE_STYLE}</style><ha-card><div class="warning">${esc(text)}</div></ha-card>`;
  }

  _value(metric) {
    const unit = metric.role === "ph" || metric.role === "uv_index" || metric.unit === "SG" ? "" : metric.unit;
    return { v: fmtNum(metric.v, metric.range.digits, this._locale()), unit };
  }

  _lightText(m) {
    const light = this._s(m.roles.light);
    if (!light) return "";
    if (!valid(light)) return this._t("unavailable");
    if (!isOn(light)) return this._t("lights_off");
    const b = brightnessPct(light);
    const key = isMoon(light) ? "moonlight" : "daylight";
    return b === null ? this._t(key) : `${this._t(key)} · ${b} %`;
  }

  _subtitle(m) {
    const parts = [];
    const vol = parseFloat(this._config.volume);
    if (Number.isFinite(vol) && vol > 0) parts.push(fmtUnit(vol, "liter", this._locale()));
    const w = m.metrics[m.mainTemp];
    if (w && w.v !== null) parts.push(`${this._value(w).v} ${w.unit}`);
    const h = m.metrics.humidity;
    if (m.kind === "terrarium" && h && h.v !== null) parts.push(`${this._value(h).v} %`);
    const light = this._lightText(m);
    if (light) parts.push(light);
    if (!parts.length) parts.push(this._t(KIND_NAME[m.kind]));
    return parts.join(" · ");
  }

  // ----- Equipment tiles ---------------------------------------------------

  // One tile per piece of equipment: { role, entity, icon, label, text, cls }.
  _tiles(m) {
    const r = m.roles;
    const loc = this._locale();
    const out = [];
    const add = (role, icon, text, cls, entity = r[role]) => out.push({ role, entity, icon, label: this._t(role), text, cls });
    const s = (role) => this._s(r[role]);
    const onOff = (role, icon, onCls = "flow", offCls = "idle") => {
      const x = s(role);
      if (!x) return;
      if (!valid(x)) return add(role, icon, this._t("unavailable"), "idle");
      const on = isOn(x);
      add(role, icon, this._t(on ? "on" : "off"), on ? onCls : offCls);
    };
    // Temperature, with the heater's state and target under it.
    const w = m.metrics[m.mainTemp];
    const heater = s("heater");
    if (w) {
      const { v, unit } = this._value(w);
      const target = targetOf(heater);
      let text = this._t("in_range");
      let cls = w.cls === "ok" ? "ok" : w.cls;
      if (w.side) text = this._t(w.side === "high" ? "too_high" : "too_low");
      else if (heater && heating(heater)) {
        text = this._t("heating");
        cls = "heat";
      } else if (target !== null) text = this._t("target", { t: `${fmtNum(target, 1, loc)} ${w.unit}` });
      out.push({ role: m.mainTemp, entity: w.entity, icon: m.mainTemp === "air_temperature" ? ICONS.air_temp : ICONS.water_temp, label: `${v} ${unit}`, text, cls: w.v === null ? "idle" : cls });
    }
    if (heater && !(w && w.entity === heater.entity_id)) {
      if (!valid(heater)) add("heater", ICONS.heater, this._t("unavailable"), "idle");
      else if (heating(heater)) add("heater", ICONS.heater, this._t("heating"), "heat");
      else add("heater", ICONS.heater, heater.state === "off" ? this._t("off") : this._t("idle"), heater.state === "off" ? "idle" : "ok");
    }
    const light = s("light");
    if (light) {
      const on = isOn(light);
      add("light", on ? ICONS.light_on : ICONS.light, this._lightText(m), !valid(light) ? "idle" : !on ? "idle" : isMoon(light) ? "moon" : "heat");
    }
    const filter = s("filter");
    if (filter) {
      if (!valid(filter)) add("filter", ICONS.filter, this._t("unavailable"), "idle");
      else {
        const on = isOn(filter);
        const speed = s("filter_speed");
        const sp = on && valid(speed) ? ` · ${fmtState(speed, loc)}` : "";
        add("filter", on ? ICONS.filter : ICONS.filter_off, `${this._t(on ? "running" : "stopped")}${sp}`, on ? "flow" : "warn");
      }
    } else if (s("filter_speed")) add("filter_speed", ICONS.speed, fmtState(s("filter_speed"), loc), "flow");
    onOff("wave_pump", ICONS.wave);
    const ret = s("return_pump");
    if (ret) add("return_pump", ICONS.return_pump, !valid(ret) ? this._t("unavailable") : this._t(isOn(ret) ? "running" : "stopped"), !valid(ret) ? "idle" : isOn(ret) ? "flow" : "warn");
    onOff("skimmer", ICONS.skimmer);
    onOff("co2", ICONS.co2, "ok");
    onOff("air_pump", ICONS.air);
    // A terrarium's or a turtle tank's UV is its UVB lamp, not a sterilizer.
    const uv = s("uv");
    if (uv && WATER_KINDS.has(m.kind) && m.kind !== "turtle") onOff("uv", ICONS.uv, "moon");
    else if (uv) out.push({ role: "uv", entity: r.uv, icon: ICONS.uv_index, label: this._t("uvb"), text: this._t(!valid(uv) ? "unavailable" : isOn(uv) ? "on" : "off"), cls: !valid(uv) || !isOn(uv) ? "idle" : "heat" });
    onOff("basking", ICONS.basking, "heat");
    onOff("heat_mat", ICONS.heat_mat, "heat");
    onOff("mister", ICONS.mister);
    const feeder = s("feeder");
    if (feeder) {
      let text;
      if (!valid(feeder) && domainOf(feeder.entity_id) !== "button") text = this._t("unavailable");
      else if (m.feeding) text = this._t("feeding");
      else if (m.fedAt !== null) text = this._t("fed_ago", { time: fmtDuration(m.now - m.fedAt, loc) });
      else text = this._t("ready");
      add("feeder", ICONS.feeder, text, m.feeding ? "heat" : "ok");
    }
    // Top-off: the pump's state, with the reservoir's level when there is one.
    const ato = s("ato");
    const res = s("reservoir");
    if (ato || res) {
      const parts = [];
      let cls = "flow";
      if (ato) parts.push(!valid(ato) ? this._t("unavailable") : this._t(isOn(ato) ? "topping_off" : "standby"));
      if (res && valid(res)) {
        parts.push(`${this._t("reservoir")} ${fmtState(res, loc)}`);
        const v = num(res);
        if (v !== null && res.attributes?.unit_of_measurement === "%" && v < 15) cls = "warn";
      }
      if (ato && !isOn(ato) && cls !== "warn") cls = "idle";
      out.push({ role: "ato", entity: r.ato || r.reservoir, icon: ICONS.ato, label: this._t("ato"), text: parts.join(" · "), cls });
    }
    const level = s("water_level");
    if (level) {
      if (domainOf(level.entity_id) === "binary_sensor") {
        const low = levelLow(level, this._config.invert_level);
        add("water_level", ICONS.level, !valid(level) ? this._t("unavailable") : this._t(low ? "level_low" : "level_ok"), !valid(level) ? "idle" : low ? "warn" : "ok");
      } else add("water_level", ICONS.level, fmtState(level, loc), "flow");
    }
    const leak = s("leak");
    if (leak) add("leak", ICONS.leak, !valid(leak) ? this._t("unavailable") : this._t(leak.state === "on" ? "leak_detected" : "dry"), !valid(leak) ? "idle" : leak.state === "on" ? "crit" : "ok");
    const dosing = s("dosing");
    if (dosing) {
      const d = domainOf(dosing.entity_id);
      const text = TOGGLE_DOMAINS.has(d) ? this._t(isOn(dosing) ? "on" : "off") : fmtState(dosing, loc);
      add("dosing", ICONS.dosing, text, valid(dosing) ? "ok" : "idle");
    }
    const service = s("service");
    if (service) {
      const ms = serviceMs(service);
      const text = ms === null ? fmtState(service, loc) : ms <= 0 ? this._t("service_due") : this._t("service_in", { time: fmtDuration(ms, loc) });
      add("service", ICONS.service, text, ms !== null && ms <= 0 ? "warn" : ms !== null && ms < 3 * 864e5 ? "heat" : "ok");
    }
    const power = s("power");
    if (power) add("power", ICONS.power, fmtState(power, loc), valid(power) ? "heat" : "idle");
    return out;
  }

  _tileHtml(tile) {
    return `<div class="tile ${tile.cls}" role="button" tabindex="0" data-entity="${esc(tile.entity)}" title="${esc(`${tile.label} · ${tile.text}`)}">
        <div class="pi">${svgIcon(tile.icon)}</div>
        <div class="tx"><span class="tn">${esc(tile.label)}</span><span class="ts">${esc(tile.text)}</span></div>
        <span class="tb"></span>
      </div>`;
  }

  // Buttons: feed, light, filter, CO2, air pump (those that can be switched).
  _controls(m, round = false) {
    if (this._config.show_controls === false) return "";
    const r = m.roles;
    const list = [];
    const btn = (action, role, icon, label, on) => {
      const s = this._s(r[role]);
      const off = !s || (!valid(s) && domainOf(s.entity_id) !== "button");
      return `<button class="btn${round ? " round" : ""}${on ? " on" : ""}" data-action="${action}" data-entity="${esc(r[role])}" title="${esc(label)}" aria-label="${esc(label)}"${action === "feed" ? "" : ` aria-pressed="${on ? "true" : "false"}"`}${off ? " disabled" : ""}>${svgIcon(icon)}${round ? "" : `<span>${esc(label)}</span>`}</button>`;
    };
    const can = (role) => r[role] && (TOGGLE_DOMAINS.has(domainOf(r[role])) || (role === "feeder" && ["button", "script"].includes(domainOf(r[role]))));
    if (can("feeder")) list.push(btn("feed", "feeder", ICONS.feeder, this._t("feed"), m.feeding));
    if (can("light")) list.push(btn("toggle", "light", isOn(this._s(r.light)) ? ICONS.light_on : ICONS.light, this._t("light"), isOn(this._s(r.light))));
    if (round) return list.join("");
    if (can("filter")) list.push(btn("filter", "filter", ICONS.filter, this._t("filter"), isOn(this._s(r.filter))));
    if (can("co2")) list.push(btn("toggle", "co2", ICONS.co2, this._t("co2"), isOn(this._s(r.co2))));
    if (can("air_pump")) list.push(btn("toggle", "air_pump", ICONS.air, this._t("air_pump"), isOn(this._s(r.air_pump))));
    if (can("basking")) list.push(btn("toggle", "basking", ICONS.basking, this._t("basking"), isOn(this._s(r.basking))));
    if (can("uv") && !(WATER_KINDS.has(m.kind) && m.kind !== "turtle")) list.push(btn("toggle", "uv", ICONS.uv_index, this._t("uvb"), isOn(this._s(r.uv))));
    if (can("mister")) list.push(btn("toggle", "mister", ICONS.mister, this._t("mister"), isOn(this._s(r.mister))));
    return list.join("");
  }

  _isCollapsed(key) {
    if (this._toggled.has(key)) return this._toggled.get(key);
    const def = Array.isArray(this._config.collapsed) ? this._config.collapsed : DEFAULT_COLLAPSED;
    return def.includes(key);
  }

  _section(key, icon, title, body, extra = "") {
    const collapsed = this._isCollapsed(key);
    return `<div class="section">
        <div class="section-title" role="button" tabindex="0" data-action="toggle_section" data-section="${key}" aria-expanded="${collapsed ? "false" : "true"}">${svgIcon(icon)}<span>${esc(title)}</span>${extra}${svgIcon(ICONS.chevron, "chevron")}</div>
        ${collapsed ? "" : body}
      </div>`;
  }

  _gauge(metric) {
    const [min, max] = scaleOf(metric.range, metric.v);
    const { v, unit } = this._value(metric);
    const loc = this._locale();
    const d = metric.range.digits;
    const [lo, hi] = metric.range.ideal;
    const u = unit ? ` ${unit}` : "";
    const ideal = lo === 0 ? this._t("max", { v: `${fmtNum(hi, d, loc)}${u}` }) : this._t("ideal", { range: `${fmtNum(lo, d, loc)}–${fmtNum(hi, d, loc)}${u}` });
    const pos = metric.v === null ? null : clamp(((metric.v - min) / (max - min || 1)) * 100, 0, 100);
    const label = this._t(metric.role);
    return `<div class="gauge clickable ${metric.cls}" role="button" tabindex="0" data-entity="${esc(metric.entity)}" aria-label="${esc(`${label} ${v}${u}, ${ideal}`)}">
        <div class="g-head">${svgIcon(METRIC_ICONS[metric.role])}<span class="g-label">${esc(label)}</span><span class="g-value">${esc(v)}${unit ? `<small>${esc(unit)}</small>` : ""}</span></div>
        <div class="g-track" style="background:${trackOf(metric.range, [min, max])}">${pos === null ? "" : `<div class="g-mark" style="left:${pos.toFixed(2)}%"></div>`}</div>
        <div class="g-range">${esc(ideal)}</div>
      </div>`;
  }

  _tipText(tip) {
    return this._t(tip.key, tip.vars);
  }

  _advice(m) {
    const items = m.tips.length
      ? m.tips.map((tip) => `<div class="tip ${tip.cls}">${svgIcon(tip.cls === "crit" ? ICONS.alert : ICONS.info)}<span>${esc(this._tipText(tip))}</span></div>`)
      : [`<div class="tip ok">${svgIcon(ICONS.check)}<span>${esc(this._t(m.kind === "terrarium" ? "all_good_terra" : "all_good"))}</span></div>`];
    const count = m.tips.length ? `<span class="count ${worst(m.tips.map((tip) => tip.cls))}">${m.tips.length}</span>` : "";
    return this._section("advice", ICONS.advice, this._t("advice"), `<div class="advice">${items.join("")}</div>`, count);
  }

  _render() {
    const m = this._model();
    if (m.error) return this._errorCard(m);
    this._m = m;
    const c = this._config;
    const parts = [];
    const tiles = c.show_equipment === false ? [] : this._tiles(m);
    if (tiles.length) parts.push(`<div class="tiles">${tiles.map((x) => this._tileHtml(x)).join("")}</div>`);
    // The temperature is a tile: the gauges are the other measures (and the temperature when tiles are hidden).
    const gauges = m.quality.filter((r) => r !== m.mainTemp || !tiles.length);
    // A section of water measures, else of the air's (a terrarium, or a turtle tank that only measures its spot).
    const watery = gauges.some((r) => AQUA_METRICS.includes(r));
    if (c.show_quality !== false && gauges.length) {
      parts.push(this._section("quality", watery ? ICONS.flask : ICONS.air_temp, this._t(watery ? "water_quality" : "climate"), `<div class="gauges">${gauges.map((r) => this._gauge(m.metrics[r])).join("")}</div>`));
    }
    if (c.show_advice !== false) parts.push(this._advice(m));
    const controls = this._controls(m);
    if (controls) parts.push(`<div class="controls">${controls}</div>`);
    return `<style>${BASE_STYLE}${FULL_STYLE}${accentStyle(this._hass)}</style>
      <ha-card class="full">
        ${this._header(m, this._subtitle(m))}
        <div class="content">${parts.join("")}</div>
      </ha-card>`;
  }

  // ----- Actions -----------------------------------------------------------

  _onClick(ev) {
    this._pressing = false;
    if (ev.detail === 0) this._byPointer = false;
    const path = ev.composedPath();
    const el = path.find((n) => n?.dataset && (n.dataset.action || n.dataset.entity));
    if (this._confirm) {
      const action = el?.dataset?.action;
      if (action === "confirm_ok") {
        const run = this._confirm.run;
        this._closeConfirm();
        run();
      } else if (action === "confirm_cancel" || (action === "confirm_backdrop" && path[0] === el)) this._closeConfirm();
      return;
    }
    if (!el) return;
    if (this._confirmClosedAt && Date.now() - this._confirmClosedAt < CONFIRM_GUARD_MS) return;
    ev.stopPropagation();
    const { action, entity } = el.dataset;
    const s = this._s(entity);
    if (action === "zoom") return this._toggleZoom(ev);
    if (action === "toggle_section") {
      const key = el.dataset.section;
      this._toggled = new Map(this._toggled).set(key, !this._isCollapsed(key));
      return this._update();
    }
    if (action === "feed") {
      const d = domainOf(entity);
      if (d === "button") return this._call("button", "press", { entity_id: entity });
      if (d === "script") return this._call("script", "turn_on", { entity_id: entity });
      return this._call(d === "light" ? "light" : d, "turn_on", { entity_id: entity });
    }
    if (action && !valid(s)) return;
    if (action === "toggle") {
      const d = domainOf(entity);
      if (d === "valve") return this._call("valve", isOn(s) ? "close_valve" : "open_valve", { entity_id: entity });
      return this._call(d, isOn(s) ? "turn_off" : "turn_on", { entity_id: entity });
    }
    if (action === "filter") {
      const d = domainOf(entity);
      if (!isOn(s)) return this._call(d, "turn_on", { entity_id: entity });
      // Stopping the filter asks first: the fish need its flow and oxygen.
      return this._openConfirm({ text: this._t("confirm_filter_off"), ok: this._t("stop"), run: () => this._call(d, "turn_off", { entity_id: entity }) });
    }
    if (entity) this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  _openConfirm(confirm) {
    this._confirm = confirm;
    window.addEventListener("keydown", this._onKey);
    this._update();
  }

  _closeConfirm() {
    this._confirm = null;
    this._confirmClosedAt = Date.now();
    window.removeEventListener("keydown", this._onKey);
    this._update();
  }

  _confirmHtml() {
    const c = this._confirm;
    return `<div class="backdrop" data-action="confirm_backdrop"><div class="modal" role="alertdialog" aria-modal="true" aria-label="${esc(c.text)}">
        <div class="msg">${esc(c.text)}</div>
        <div class="modal-actions"><button class="btn" data-action="confirm_cancel"><span>${esc(this._t("cancel"))}</span></button><button class="btn on" data-action="confirm_ok"><span>${esc(c.ok)}</span></button></div>
      </div></div>`;
  }

  _toggleZoom() {}
}

// The mini card is the full card drawn compact: its detail button (top right, `zoom: false` removes it) switches it
// to the full card's content and back, and a click anywhere else on the page brings the compact view back.
export class VivariumMiniCard extends VivariumCard {
  constructor() {
    super();
    this._onUnzoom = (ev) => {
      if (this._zoomed && isOutside(this, ev)) this._setZoom(false);
    };
  }

  static getConfigElement() {
    return document.createElement("vivarium-mini-card-editor");
  }

  connectedCallback() {
    super.connectedCallback();
    (this._onUnzoomWatch ??= watchOutside(this, (ev) => this._onUnzoom(ev))).on();
    this._update?.();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._onUnzoomWatch?.off();
    this._zoomed = false;
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 3;
  }

  getGridOptions() {
    return { ...(this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 }), rows: "auto" };
  }

  _zoomButton(extra = "") {
    if (this._config.zoom === false) return "";
    const label = esc(this._t(this._zoomed ? "zoom_out" : "zoom_in"));
    return `<button class="zoom${extra ? ` ${extra}` : ""}" data-action="zoom" title="${label}" aria-label="${label}" aria-expanded="${this._zoomed ? "true" : "false"}">${svgIcon(this._zoomed ? ICONS.collapse : ICONS.expand)}</button>`;
  }

  _setZoom(on) {
    this._zoomed = on;
    this._update();
    this.dispatchEvent(new CustomEvent("iron-resize", { bubbles: true, composed: true }));
  }

  _toggleZoom(ev) {
    this._setZoom(!this._zoomed);
    if (ev?.detail === 0) this.shadowRoot.querySelector?.(".zoom")?.focus({ preventScroll: true });
  }

  _render() {
    if (this._zoomed) return super._render();
    const m = this._model();
    if (m.error) return this._errorCard(m);
    this._m = m;
    const loc = this._locale();
    const pills = m.quality
      .slice(0, 4)
      .map((r) => {
        const x = m.metrics[r];
        const { v, unit } = this._value(x);
        const k = r === m.mainTemp ? "" : `<span class="k">${esc(SHORT[r])}</span>`;
        return `<span class="pill clickable ${x.cls}" role="button" tabindex="0" data-entity="${esc(x.entity)}" title="${esc(this._t(r))}"><span class="dot"></span>${k}<span class="v">${esc(v)}${unit ? ` ${esc(unit)}` : ""}</span></span>`;
      })
      .join("");
    const lines = [];
    const filter = this._s(m.roles.filter);
    if (filter) {
      const on = isOn(filter);
      lines.push(`<div class="line ${on ? "flow" : "warn"}">${svgIcon(on ? ICONS.filter : ICONS.filter_off)}<span>${esc(`${this._t("filter")} · ${this._t(!valid(filter) ? "unavailable" : on ? "running" : "stopped")}`)}</span></div>`);
    }
    if (m.roles.feeder && (m.feeding || m.fedAt !== null)) {
      const text = m.feeding ? this._t("feeding") : this._t("fed_ago", { time: fmtDuration(m.now - m.fedAt, loc) });
      lines.push(`<div class="line ${m.feeding ? "heat" : "ok"}">${svgIcon(ICONS.feeder)}<span>${esc(text)}</span></div>`);
    }
    const tip = m.tips[0];
    if (tip) lines.push(`<div class="line tip-line ${tip.cls}">${svgIcon(tip.cls === "crit" ? ICONS.alert : ICONS.info)}<span>${esc(this._tipText(tip))}</span></div>`);
    const controls = this._controls(m, true);
    return `<style>${BASE_STYLE}${MINI_STYLE}${accentStyle(this._hass)}</style>
      <ha-card class="mini">
        ${this._header(m, this._subtitle(m))}
        <div class="content">
          <div class="info">
            ${pills ? `<div class="pills">${pills}</div>` : ""}
            ${lines.join("")}
          </div>
          ${controls ? `<div class="controls">${controls}</div>` : ""}
        </div>
      </ha-card>`;
  }
}
