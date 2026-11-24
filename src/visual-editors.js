// ---------------------------------------------------------------------------
// Visual editors (ha-form)
// ---------------------------------------------------------------------------
import { LANGUAGES } from "./core.js";
import { lang, t } from "./helpers.js";
import { DEFAULT_COLLAPSED, KINDS, METRIC_ROLES, ROLES, SCENES, SECTIONS } from "./entity-roles-discovery.js";

export const ENTITY_DOMAINS = {
  water_temperature: ["sensor"],
  ph: ["sensor"],
  ammonia: ["sensor"],
  nitrite: ["sensor"],
  nitrate: ["sensor"],
  phosphate: ["sensor"],
  kh: ["sensor"],
  gh: ["sensor"],
  calcium: ["sensor"],
  magnesium: ["sensor"],
  salinity: ["sensor"],
  orp: ["sensor"],
  conductivity: ["sensor"],
  tds: ["sensor"],
  oxygen: ["sensor"],
  air_temperature: ["sensor"],
  hot_spot: ["sensor"],
  cold_spot: ["sensor"],
  humidity: ["sensor"],
  uv_index: ["sensor"],
  light: ["light", "switch", "input_boolean"],
  heater: ["climate", "water_heater", "switch", "input_boolean"],
  filter: ["switch", "fan", "input_boolean"],
  filter_speed: ["sensor", "number"],
  wave_pump: ["switch", "fan", "input_boolean"],
  return_pump: ["switch", "fan", "input_boolean"],
  skimmer: ["switch", "input_boolean"],
  co2: ["switch", "valve", "input_boolean"],
  air_pump: ["switch", "fan", "input_boolean"],
  uv: ["switch", "light", "input_boolean"],
  basking: ["switch", "light", "input_boolean"],
  heat_mat: ["switch", "climate", "input_boolean"],
  mister: ["switch", "fan", "valve", "input_boolean"],
  feeder: ["button", "script", "switch", "input_boolean", "sensor"],
  ato: ["switch", "binary_sensor", "input_boolean"],
  reservoir: ["sensor"],
  water_level: ["binary_sensor", "sensor"],
  leak: ["binary_sensor"],
  dosing: ["sensor", "switch"],
  service: ["sensor"],
  power: ["sensor"],
};

export class VivariumEditorBase extends HTMLElement {
  static get toggles() {
    return [];
  }

  static extraFields() {
    return [];
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _schema() {
    const tr = (k) => t(this._hass, this._config, k);
    return [
      { name: "area", selector: { area: {} } },
      { name: "device", selector: { device: {} } },
      { name: "title", selector: { text: {} } },
      { type: "grid", name: "", schema: [
        { name: "kind", selector: { select: { mode: "dropdown", options: ["auto", ...KINDS].map((v) => ({ value: v, label: tr(`kind_${v}`) })) } } },
        { name: "volume", selector: { number: { min: 0, step: 1, mode: "box", unit_of_measurement: "L" } } },
      ] },
      {
        type: "expandable",
        name: "",
        flatten: true,
        title: tr("entities"),
        icon: "mdi:format-list-bulleted",
        schema: ROLES.map((name) => ({ name, selector: { entity: { domain: ENTITY_DOMAINS[name] } } })),
      },
      ...this.constructor.extraFields(tr),
      { type: "grid", name: "", schema: this.constructor.toggles.map(([name]) => ({ name, selector: { boolean: {} } })) },
      {
        name: "scene",
        selector: { select: { mode: "dropdown", options: ["auto", ...Object.keys(SCENES)].map((v) => ({ value: v, label: tr(`scene_${v}`) })) } },
      },
      {
        name: "illustration_theme",
        selector: { select: { mode: "dropdown", options: ["auto", "day", "night"].map((v) => ({ value: v, label: tr(`theme_${v}`) })) } },
      },
      {
        name: "language",
        selector: { select: { mode: "dropdown", options: [{ value: "", label: tr("lang_auto") }, ...LANGUAGES.map(([value, label]) => ({ value, label }))] } },
      },
    ];
  }

  _label(name) {
    const m = /^(.*)_(min|max)$/.exec(name);
    if (m && METRIC_ROLES.includes(m[1])) return `${t(this._hass, this._config, m[1])} · ${t(this._hass, this._config, `${m[2]}_l`)}`;
    return t(this._hass, this._config, name === "language" ? "language" : name);
  }

  _helper(name) {
    if (["area", "device", "zoom", "invert_level"].includes(name)) return t(this._hass, this._config, `${name}_helper`);
    return undefined;
  }

  // A change in the form: the YAML is kept minimal, empty values and options left at their default dropped.
  _changed(ev) {
    ev.stopPropagation();
    const config = { ...ev.detail.value };
    const defaults = { ...Object.fromEntries(this.constructor.toggles), kind: "auto", scene: "auto", illustration_theme: "auto", collapsed: DEFAULT_COLLAPSED };
    for (let [k, v] of Object.entries(config)) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        v = config[k] = { ...v };
        for (const [sk, sv] of Object.entries(v)) if (sv === "" || sv === undefined || sv === null) delete v[sk];
        if (!Object.keys(v).length) delete config[k];
      } else if (v === "" || v === undefined || v === null || (k in defaults && JSON.stringify(v) === JSON.stringify(defaults[k]))) delete config[k];
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._hass || !this._config) return;
    const toggles = this.constructor.toggles;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => this._label(s.name);
      this._form.computeHelper = (s) => this._helper(s.name);
      this._form.addEventListener("value-changed", (ev) => this._changed(ev));
      this.appendChild(this._form);
    }
    const data = { kind: "auto", scene: "auto", illustration_theme: "auto", collapsed: DEFAULT_COLLAPSED, ...this._config };
    for (const f of this.constructor.extraFields(() => "")) if (f.type === "expandable" && f.name) data[f.name] = { ...data[f.name] };
    for (const [name, def] of toggles) if (data[name] === undefined) data[name] = def;
    this._form.hass = this._hass;
    if (this._dataFor !== this._config) {
      this._dataFor = this._config;
      this._form.data = data;
    }
    const l = lang(this._hass, this._config);
    if (this._schemaLang !== l) {
      this._schemaLang = l;
      this._form.schema = this._schema();
    }
  }
}

export class VivariumCardEditor extends VivariumEditorBase {
  static get toggles() {
    return [
      ["show_title", true],
      ["show_subtitle", true],
      ["illustration", true],
      ["show_equipment", true],
      ["show_quality", true],
      ["show_advice", true],
      ["show_controls", true],
      ["invert_level", false],
    ];
  }

  static extraFields(tr) {
    return [
      {
        name: "collapsed",
        selector: { select: { multiple: true, mode: "list", options: SECTIONS.map((value) => ({ value, label: tr(value === "quality" ? "water_quality" : value) })) } },
      },
      {
        type: "expandable",
        name: "ranges",
        title: tr("ranges"),
        icon: "mdi:tune-vertical",
        schema: METRIC_ROLES.flatMap((r) => ["min", "max"].map((b) => ({ name: `${r}_${b}`, selector: { number: { mode: "box", step: "any" } } }))),
      },
    ];
  }
}

// The detailed view of the mini card draws the full card: its editor offers the full card's options too, and the
// detail button.
export class VivariumMiniCardEditor extends VivariumCardEditor {
  static get toggles() {
    return [...VivariumCardEditor.toggles, ["zoom", true]];
  }
}
