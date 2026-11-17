import assert from "node:assert/strict";
import { test } from "node:test";
import {
  areas,
  devices,
  entities,
  feeding,
  freshConfig,
  freshNight,
  reefConfig,
  reefNight,
  reefProblems,
  states,
  terraConfig,
  turtleConfig,
} from "../scripts/mock-states.mjs";
import { load } from "./load.mjs";

const aq = load();

const makeHass = (overrides = {}, extra = {}) => {
  const st = { ...states };
  for (const [id, o] of Object.entries(overrides)) st[id] = { ...st[id], ...o };
  const calls = [];
  return {
    calls,
    states: st,
    entities,
    devices,
    areas,
    language: "en",
    config: { unit_system: { temperature: "°C" } },
    themes: { darkMode: false },
    callService: (...a) => calls.push(a),
    ...extra,
  };
};

const newCard = (config = reefConfig, hass = makeHass(), Card = aq.VivariumCard) => {
  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  return card;
};
const html = (card) => card.shadowRoot.innerHTML;
const click = (card, dataset, path = []) => card._onClick({ composedPath: () => [{ dataset }, ...path], stopPropagation() {} });
const plain = (v) => JSON.parse(JSON.stringify(v));
const bannerClass = (card) => html(card).match(/<div class="(banner[^"]*)"/)?.[1] ?? "";

test("a reef tank is found from its area: Red Sea, Seneye, Apex, EHEIM and ESPHome entities each get their role", () => {
  const setup = aq.setupOf(makeHass(), reefConfig);
  assert.deepEqual(plain(setup.roles), {
    leak: "binary_sensor.reefato_leak",
    feeder: "button.reef_feeder_feed",
    heater: "climate.reef_heater",
    light: "light.reefled_90",
    kh: "sensor.apex_alkalinity",
    calcium: "sensor.apex_calcium",
    magnesium: "sensor.apex_magnesium",
    nitrate: "sensor.apex_nitrate",
    phosphate: "sensor.apex_phosphate",
    salinity: "sensor.apex_salinity",
    reservoir: "sensor.reefato_reservoir_level",
    dosing: "sensor.reefdose_calcium_remaining_volume",
    ammonia: "sensor.seneye_reef_nh3",
    ph: "sensor.seneye_reef_ph",
    water_temperature: "sensor.seneye_reef_temperature",
    ato: "switch.reefato_auto_top_off",
    return_pump: "switch.reefrun_return_pump",
    skimmer: "switch.reefrun_skimmer",
    wave_pump: "switch.reefwave_45_pump",
  });
  // The controller's CPU temperature (diagnostic) and the heater's offset (config) are left out.
  assert.equal(aq.kindOf(makeHass(), reefConfig, setup), "reef");
});

test("a freshwater tank is found from its devices, the EHEIM filter, speed and service included", () => {
  const hass = makeHass();
  const setup = aq.setupOf(hass, freshConfig);
  assert.deepEqual(plain(setup.roles), {
    feeder: "button.planted_tank_feeder",
    heater: "climate.thermocontrol",
    light: "light.classicledcontrol",
    filter_speed: "sensor.classicvario_current_pump_speed",
    service: "sensor.classicvario_remaining_hours_until_service",
    kh: "sensor.planted_tank_kh",
    nitrate: "sensor.planted_tank_nitrate",
    ph: "sensor.planted_tank_ph",
    tds: "sensor.planted_tank_tds",
    filter: "switch.classicvario_pump",
    co2: "switch.planted_tank_co2",
  });
  assert.equal(aq.kindOf(hass, freshConfig, setup), "freshwater");
  assert.equal(aq.kindOf(hass, { ...freshConfig, kind: "reef" }, setup), "reef");
});

test("with no option, the aquarium integrations and brands are gathered; the house's own lights and sensors are not", () => {
  const roles = aq.setupOf(makeHass(), {}).roles;
  assert.ok(roles.filter && roles.return_pump && roles.salinity);
  assert.ok(!Object.values(roles).includes("light.living_room"));
  assert.ok(!Object.values(roles).includes("sensor.living_room_temperature"));
  assert.equal(aq.setupOf(makeHass(), { area: "Garage" }).error, "unknown_area");
  assert.equal(aq.setupOf(makeHass(), { device: "Nowhere" }).error, "unknown_device");
  assert.equal(aq.setupOf({ ...makeHass(), entities: {}, devices: {} }, {}).error, "no_entities");
  // An option replaces the role found, and works with no device at all.
  assert.equal(aq.setupOf(makeHass(), { ...reefConfig, light: "light.living_room" }).roles.light, "light.living_room");
  assert.deepEqual(plain(aq.setupOf(makeHass(), { ph: "sensor.planted_tank_ph" }).roles), { ph: "sensor.planted_tank_ph" });
});

test("role names in other languages and integrations", () => {
  const st = (unit, extra = {}) => ({ attributes: { unit_of_measurement: unit, ...extra } });
  const hass = {
    entities: {},
    states: {
      "sensor.aquarium_wassertemperatur": st("°C", { device_class: "temperature" }),
      "sensor.aquarium_raumtemperatur_luft": st("°C", { device_class: "temperature" }),
      "sensor.bac_nitrates": st("mg/L"),
      "sensor.bac_no2": st("mg/L"),
      "sensor.reef_po4": st("ppm"),
      "sensor.reef_dkh": st("dKH"),
      "sensor.reef_specific_gravity": st(""),
      "sensor.reef_redox": st("mV"),
      "sensor.reef_ec": st("mS/cm"),
      "sensor.bac_oxygene_dissous": st("mg/L"),
      "sensor.ph_setpoint": st(""),
      "switch.ecumeur": st(""),
      "switch.pompe_de_brassage": st(""),
      "switch.pompe_remontee": st(""),
      "switch.bulleur": st(""),
      "switch.sterilisateur_uv": st(""),
      "switch.chauffage_bac": st(""),
      "switch.co2_magnetventil": st(""),
      "switch.osmolateur": st(""),
      "switch.eclairage_bac": st(""),
      "switch.filtre_externe": st(""),
      "button.futterautomat_futtern": st(""),
      "binary_sensor.fuite_meuble": st("", { device_class: "moisture" }),
      "binary_sensor.flotteur_niveau_bas": st(""),
      "sensor.reservoir_osmolateur": st("%"),
    },
  };
  const want = {
    "sensor.aquarium_wassertemperatur": "water_temperature",
    // A room's air: never the water's (an aquarium leaves it out; it is a terrarium's air).
    "sensor.aquarium_raumtemperatur_luft": "air_temperature",
    "sensor.bac_nitrates": "nitrate",
    "sensor.bac_no2": "nitrite",
    "sensor.reef_po4": "phosphate",
    "sensor.reef_dkh": "kh",
    "sensor.reef_specific_gravity": "salinity",
    "sensor.reef_redox": "orp",
    "sensor.reef_ec": "conductivity",
    "sensor.bac_oxygene_dissous": "oxygen",
    "sensor.ph_setpoint": null,
    "switch.ecumeur": "skimmer",
    "switch.pompe_de_brassage": "wave_pump",
    "switch.pompe_remontee": "return_pump",
    "switch.bulleur": "air_pump",
    "switch.sterilisateur_uv": "uv",
    "switch.chauffage_bac": "heater",
    "switch.co2_magnetventil": "co2",
    "switch.osmolateur": "ato",
    "switch.eclairage_bac": "light",
    "switch.filtre_externe": "filter",
    "button.futterautomat_futtern": "feeder",
    "binary_sensor.fuite_meuble": "leak",
    "binary_sensor.flotteur_niveau_bas": "water_level",
    "sensor.reservoir_osmolateur": "reservoir",
  };
  for (const [id, role] of Object.entries(want)) assert.equal(aq.roleOf(id, hass), role, id);
});

test("ideal ranges follow the kind of tank and the unit of the sensor", () => {
  assert.deepEqual(plain(aq.rangeOf("ph", "", "freshwater", 7).ideal), [6.5, 7.5]);
  assert.deepEqual(plain(aq.rangeOf("ph", "", "reef", 8.2).ideal), [7.9, 8.4]);
  // Salinity as a specific gravity (a unit "SG" or a bare value near 1.025).
  assert.equal(aq.rangeOf("salinity", "", "reef", 1.025).unit, "SG");
  assert.equal(aq.rangeOf("salinity", "ppt", "reef", 35).unit, "ppt");
  // °F, meq/L and µS/cm are converted.
  const f = aq.rangeOf("water_temperature", "°F", "freshwater", 78);
  assert.deepEqual(plain(f.ideal.map((x) => Math.round(x * 10) / 10)), [75.2, 80.6]);
  assert.deepEqual(plain(aq.rangeOf("kh", "meq/L", "reef", 3).ideal.map((x) => Math.round(x * 100) / 100)), [2.5, 3.93]);
  assert.deepEqual(plain(aq.rangeOf("conductivity", "µS/cm", "reef", 53000).ideal), [51500, 54000]);
  // The options replace one bound or both.
  assert.deepEqual(plain(aq.rangeOf("water_temperature", "°C", "freshwater", 25, { water_temperature_min: 26 }).ideal), [26, 27]);
  const r = aq.rangeOf("nitrate", "mg/L", "freshwater", 30);
  assert.deepEqual(plain(aq.levelOf(r, 10)), { cls: "ok", side: null });
  assert.deepEqual(plain(aq.levelOf(r, 30)), { cls: "warn", side: "high" });
  assert.deepEqual(plain(aq.levelOf(r, 80)), { cls: "crit", side: "high" });
  assert.deepEqual(plain(aq.levelOf(r, null)), { cls: "idle", side: null });
});

test("the reef in its normal state: all good, tiles, gauges, daylight scene", () => {
  const card = newCard();
  const h = html(card);
  assert.match(h, /chip ok/);
  assert.match(h, /350 L · 25\.6 °C · Daylight · 80 %/);
  for (const t of ["Heater", "Light", "Wave pump", "Return pump", "Skimmer", "Feeder", "Top-off", "Leak", "Dosing"]) assert.match(h, new RegExp(`class="tn">${t}<`), t);
  assert.match(h, /Standby · Reservoir 68 %/);
  for (const g of ["pH", "Ammonia", "Nitrate", "Phosphate", "Carbonate hardness", "Calcium", "Magnesium", "Salinity"]) assert.match(h, new RegExp(`g-label">${g}<`), g);
  // The temperature is a tile, not a gauge, while the tiles show.
  assert.doesNotMatch(h, /g-label">Water temperature</);
  assert.equal(bannerClass(card), "banner reef waves");
  assert.match(h, /aq-clown/);
  assert.match(h, /class="bubbles"/);
});

test("night in the tank follows its light: off is night, dimmed is moonlight; without a light, the theme alone", () => {
  assert.match(bannerClass(newCard(reefConfig, makeHass(reefNight))), /dark moonlit/);
  assert.match(html(newCard(reefConfig, makeHass(reefNight))), /Moonlight · 7 %/);
  const off = newCard(freshConfig, makeHass(freshNight));
  assert.match(bannerClass(off), /fresh dark/);
  assert.doesNotMatch(bannerClass(off), /moonlit/);
  assert.match(html(off), /Lights off/);
  const noLight = { ...freshConfig, light: "sensor.none" };
  assert.doesNotMatch(bannerClass(newCard(noLight, makeHass())), /dark/);
  assert.doesNotMatch(bannerClass(newCard(noLight, makeHass({ "sun.sun": { state: "below_horizon" } }))), /dark/, "a light theme keeps the day after sunset");
  assert.match(bannerClass(newCard(noLight, makeHass({ "sun.sun": { state: "above_horizon" } }, { themes: { darkMode: true } }))), /dark/);
  assert.match(bannerClass(newCard({ ...reefConfig, illustration_theme: "night" })), /dark moonlit/);
  assert.doesNotMatch(bannerClass(newCard({ ...freshConfig, illustration_theme: "day" }, makeHass(freshNight))), /dark/);
});

test("a tank in trouble: status, advice, still fish and clouded water", () => {
  const card = newCard({ ...reefConfig, collapsed: [] }, makeHass(reefProblems));
  const h = html(card);
  assert.match(h, /chip crit/);
  assert.match(h, /Water too warm/);
  assert.match(h, /The return pump is stopped/);
  assert.match(h, /Nitrate high/);
  assert.match(h, /count crit">3</);
  assert.match(bannerClass(card), /still/);
  assert.match(h, /class="murk algae"/);
  assert.doesNotMatch(h, /class="bubbles"/);
  // A leak comes first, and a generic advice names its measure.
  const leak = html(newCard({ ...reefConfig, collapsed: [] }, makeHass({ "binary_sensor.reefato_leak": { state: "on" }, "sensor.apex_calcium": { state: "380" } })));
  assert.ok(leak.indexOf("Water leak") < leak.indexOf("Calcium below its ideal range"));
});

test("freshwater: the heater heats, CO2 runs, the filter shows its speed and the service its time left", () => {
  const card = newCard(freshConfig);
  const h = html(card);
  assert.match(bannerClass(card), /fresh heating/);
  assert.match(h, /class="co2"/);
  assert.match(h, /aq-neon/);
  assert.match(h, /Running · 70 %/);
  assert.match(h, /In 3 days/);
  assert.match(h, /class="tn">25\.2 °C<\/span><span class="ts">Heating/);
});

test("feeding: a feeder pressed a minute ago drops flakes; else the time since the last meal", () => {
  const now = new Date(Date.now() - 60000).toISOString();
  const card = newCard(reefConfig, makeHass({ "button.reef_feeder_feed": { state: now } }));
  assert.match(html(card), /class="flakes"/);
  assert.match(html(card), /Feeding…/);
  const before = newCard(reefConfig, makeHass({ "button.reef_feeder_feed": { state: new Date(Date.now() - 3 * 3600000).toISOString() } }));
  assert.match(html(before), /Fed 3 hr ago/);
  assert.doesNotMatch(html(before), /class="flakes"/);
  assert.ok(feeding);
});

test("buttons: feed presses the button, the light toggles, stopping the filter asks first", async () => {
  const hass = makeHass();
  const card = newCard(freshConfig, hass);
  click(card, { action: "feed", entity: "button.planted_tank_feeder" });
  click(card, { action: "toggle", entity: "light.classicledcontrol" });
  click(card, { action: "toggle", entity: "switch.planted_tank_co2" });
  click(card, { action: "filter", entity: "switch.classicvario_pump" });
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(plain(hass.calls), [
    ["button", "press", { entity_id: "button.planted_tank_feeder" }],
    ["light", "turn_off", { entity_id: "light.classicledcontrol" }],
    ["switch", "turn_off", { entity_id: "switch.planted_tank_co2" }],
  ]);
  assert.match(html(card), /Stop the filter\?/);
  card._confirmClosedAt = 0;
  click(card, { action: "confirm_ok" });
  assert.deepEqual(plain(hass.calls.at(-1)), ["switch", "turn_off", { entity_id: "switch.classicvario_pump" }]);
  assert.doesNotMatch(html(card), /Stop the filter\?/);
  // Leaving the page closes an open popup without running anything.
  click(card, { action: "filter", entity: "switch.classicvario_pump" });
  card.disconnectedCallback();
  assert.equal(card._confirm, null);
});

test("a click on a tile or a gauge opens its entity", () => {
  const card = newCard();
  click(card, { entity: "sensor.apex_salinity" });
  assert.equal(card.events.at(-1).type, "hass-more-info");
  assert.deepEqual(plain(card.events.at(-1).detail), { entityId: "sensor.apex_salinity" });
});

test("sections fold and unfold; advice folded by default", () => {
  const card = newCard();
  assert.match(html(card), /data-section="quality" aria-expanded="true"/);
  assert.match(html(card), /data-section="advice" aria-expanded="false"/);
  click(card, { action: "toggle_section", section: "quality" });
  assert.match(html(card), /data-section="quality" aria-expanded="false"/);
  card.disconnectedCallback();
  card._update();
  assert.match(html(card), /data-section="quality" aria-expanded="true"/);
});

test("the mini card: pills, filter and feeding lines, detail button switching to the full card", () => {
  const card = newCard(reefConfig, makeHass(), aq.VivariumMiniCard);
  const h = html(card);
  assert.match(h, /class="pill/);
  assert.match(h, /NH₃/);
  assert.match(h, /class="zoom"/);
  assert.match(h, /Fed 2 hr ago|Fed \d+ (hr|day)/);
  assert.doesNotMatch(h, /class="tiles"/);
  click(card, { action: "zoom" });
  assert.match(html(card), /class="tiles"/);
  assert.match(html(card), /aria-expanded="true"/);
  card.disconnectedCallback();
  card._update();
  assert.doesNotMatch(html(card), /class="tiles"/);
  assert.doesNotMatch(html(newCard({ ...reefConfig, zoom: false }, makeHass(), aq.VivariumMiniCard)), /class="zoom/);
});

test("scenes: the option, else a theme the names call for (of the tank's kind), else the reef or the planted tank", () => {
  const hass = makeHass();
  const reef = aq.setupOf(hass, reefConfig);
  const fresh = aq.setupOf(hass, freshConfig);
  assert.equal(aq.sceneOf(hass, reefConfig, reef, "reef"), "reef");
  assert.equal(aq.sceneOf(hass, freshConfig, fresh, "freshwater"), "planted");
  assert.equal(aq.sceneOf(hass, { ...reefConfig, scene: "abyss" }, reef, "reef"), "abyss");
  assert.equal(aq.sceneOf(hass, { ...reefConfig, scene: "nope" }, reef, "reef"), "reef");
  assert.equal(aq.sceneOf(hass, { ...freshConfig, title: "Bac à crevettes" }, fresh, "freshwater"), "shrimp");
  assert.equal(aq.sceneOf(hass, { ...freshConfig, title: "Malawi cichlids" }, fresh, "freshwater"), "malawi");
  assert.equal(aq.sceneOf(hass, { ...reefConfig, title: "Hippocampes" }, reef, "reef"), "seahorse");
  // A theme of the other kind is not taken; "koi" is a whole word only.
  assert.equal(aq.sceneOf(hass, { ...reefConfig, title: "Koi" }, reef, "reef"), "reef");
  assert.equal(aq.sceneOf(hass, { ...freshConfig, title: "Kois du jardin" }, fresh, "freshwater"), "planted");
  assert.equal(aq.sceneOf(hass, { ...freshConfig, title: "Koi pond" }, fresh, "freshwater"), "pond");
  // The scene chosen gives the kind, unless the kind is set.
  assert.equal(aq.kindOf(hass, { ...freshConfig, scene: "jellyfish" }, fresh), "reef");
  assert.equal(aq.kindOf(hass, { ...freshConfig, scene: "jellyfish", kind: "freshwater" }, fresh), "freshwater");
  assert.equal(aq.kindOf(hass, { ...freshConfig, title: "Garden pond" }, fresh), "freshwater");
});

test("every themed scene draws its art, water and ground, by day and by night", () => {
  for (const scene of Object.keys(aq.SCENES).filter((s) => s !== "reef" && s !== "planted")) {
    const th = aq.THEME_ART(scene);
    assert.ok(th?.art.length > 1000, scene);
    assert.equal(th.water?.length, 3, scene);
    for (const overrides of [{}, reefNight]) {
      const card = newCard({ ...reefConfig, scene }, makeHass(overrides));
      const out = html(card);
      assert.match(bannerClass(card), /themed/, scene);
      assert.match(out, /--aq-w1:/, scene);
      assert.match(out, /class="ground" style="background-color:/, scene);
      assert.match(out, /class="fish t-p[a-e]"|class="(bob|hang|pulse|rise|hop|nod|breathe|rock[^"]*|climb|sway[^"]*)"/, scene);
      assert.equal(/class="veil"/.test(out), !!Object.keys(overrides).length && scene !== "abyss", scene);
    }
  }
  // Dark water: light texts. The pond is seen from above: no heater nor bubbles.
  assert.match(bannerClass(newCard({ ...reefConfig, scene: "abyss" })), /\bink\b/);
  assert.doesNotMatch(bannerClass(newCard({ ...reefConfig, scene: "sps" })), /\bink\b/);
  const pond = html(newCard({ ...freshConfig, scene: "pond" }));
  assert.doesNotMatch(pond, /class="heater"|class="bubbles"/);
  assert.match(html(newCard({ ...freshConfig, scene: "betta" })), /class="heater"/);
});

test("illustration: false gives the classic header", () => {
  const h = html(newCard({ ...reefConfig, illustration: false }));
  assert.doesNotMatch(h, /class="banner/);
  assert.match(h, /class="header"/);
});

test("helpers: moonlight, feeding time, water level and service", () => {
  assert.equal(aq.isMoon({ entity_id: "light.x", state: "on", attributes: { brightness: 20 } }), true);
  assert.equal(aq.isMoon({ entity_id: "light.x", state: "on", attributes: { brightness: 200, effect: "Moonlight" } }), true);
  assert.equal(aq.isMoon({ entity_id: "light.x", state: "on", attributes: { brightness: 200 } }), false);
  assert.equal(aq.fedAt({ entity_id: "button.f", state: "2026-11-15T14:00:00Z" }), Date.parse("2026-11-15T14:00:00Z"));
  assert.equal(aq.levelLow({ entity_id: "binary_sensor.float_low", state: "on", attributes: {} }), true);
  assert.equal(aq.levelLow({ entity_id: "binary_sensor.float", state: "on", attributes: {} }), false);
  assert.equal(aq.levelLow({ entity_id: "binary_sensor.float", state: "on", attributes: {} }, true), true);
  assert.equal(aq.serviceMs({ entity_id: "sensor.s", state: "2", attributes: { unit_of_measurement: "d" } }), 2 * 864e5);
  assert.equal(aq.serviceMs({ entity_id: "sensor.s", state: "5", attributes: { unit_of_measurement: "h" } }), 5 * 36e5);
});

test("the visual editor keeps the YAML minimal", () => {
  const editor = new aq.VivariumCardEditor();
  editor.setConfig({ type: "custom:vivarium-card" });
  editor.hass = makeHass();
  assert.ok(editor.children.length, "the form is added");
  let out;
  editor.dispatchEvent = (ev) => {
    out = ev.detail?.config;
  };
  editor._changed({
    stopPropagation() {},
    detail: { value: { type: "custom:vivarium-card", kind: "auto", show_title: true, title: "", area: "reef_tank", ranges: { ph_min: "" }, collapsed: ["advice"] } },
  });
  assert.deepEqual(plain(out), { type: "custom:vivarium-card", area: "reef_tank" });
  assert.ok(aq.VivariumMiniCardEditor.toggles.some(([n]) => n === "zoom"));
  assert.ok(aq.VivariumMiniCardEditor.toggles.some(([n]) => n === "show_quality"));
});

test("every language has every text, with the same placeholders", () => {
  const en = aq.STRINGS.en;
  const vars = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const [l, table] of Object.entries(aq.STRINGS)) {
    assert.deepEqual(Object.keys(table).sort(), Object.keys(en).sort(), l);
    for (const k of Object.keys(en)) assert.equal(vars(table[k]), vars(en[k]), `${l}.${k}`);
  }
  assert.equal(Object.keys(aq.STRINGS).length, 22);
  // Every role has a label, every out-of-range measure an advice.
  for (const r of aq.ROLES) assert.ok(en[r], r);
  const card = newCard({ ...reefConfig, language: "fr", collapsed: [] }, makeHass(reefProblems));
  assert.match(html(card), /Eau trop chaude/);
  assert.match(html(card), /Action requise/);
});

test("a terrarium: its probe, lamps and heat mat get their roles; climate gauges with the animal's ranges", () => {
  const hass = makeHass();
  const setup = aq.setupOf(hass, terraConfig);
  assert.deepEqual(plain(setup.roles), {
    air_temperature: "sensor.terrarium_air_temperature",
    basking: "switch.terrarium_basking_lamp",
    cold_spot: "sensor.terrarium_cool_side_temperature",
    heat_mat: "switch.terrarium_heat_mat",
    hot_spot: "sensor.terrarium_hot_spot_temperature",
    humidity: "sensor.terrarium_humidity",
    light: "light.terrarium_led",
    uv: "switch.terrarium_uvb",
    uv_index: "sensor.terrarium_uv_index",
  });
  assert.equal(aq.kindOf(hass, terraConfig, setup), "terrarium");
  // 34 % humidity: a desert; "Desert terrarium" says so too.
  assert.equal(aq.sceneOf(hass, { area: terraConfig.area }, setup, "terrarium"), "desert");
  const card = newCard(terraConfig, hass);
  const out = html(card);
  assert.match(out, /Climate/);
  assert.match(out, /Ideal 38\.0–45\.0 °C/);
  assert.match(out, /Basking lamp/);
  assert.match(out, /UVB lamp/);
  assert.match(out, /class="spot"/);
  assert.match(out, /All good/);
  // The same probe for dart frogs: far too hot and too dry for them.
  const frogs = html(newCard({ ...terraConfig, scene: "rainforest", collapsed: [] }, hass));
  assert.match(frogs, /Too dry/);
  // The basking lamp off: no cone; the heat mat on: the ground glows.
  const off = newCard(terraConfig, makeHass({ "switch.terrarium_basking_lamp": { state: "off" }, "switch.terrarium_heat_mat": { state: "on" } }));
  assert.doesNotMatch(html(off), /class="spot"/);
  assert.match(bannerClass(off), /\bmat\b/);
});

test("a turtle tank: water and basking spot; terrarium words in other languages", () => {
  const hass = makeHass();
  const setup = aq.setupOf(hass, turtleConfig);
  assert.equal(aq.kindOf(hass, turtleConfig, setup), "turtle");
  assert.equal(aq.sceneOf(hass, turtleConfig, setup, "turtle"), "turtle");
  assert.equal(setup.roles.hot_spot, "sensor.turtle_tank_basking_temperature");
  assert.equal(setup.roles.water_temperature, "sensor.turtle_tank_water_temperature");
  const out = html(newCard(turtleConfig, hass));
  assert.match(out, /Turtle tank/);
  assert.match(out, /Basking lamp/);
  const st = (unit, attrs = {}) => ({ state: "1", attributes: { unit_of_measurement: unit, ...attrs } });
  const h = {
    states: {
      "sensor.terrarium_temperature_point_chaud": st("°C", { device_class: "temperature" }),
      "sensor.terrarium_kuhle_seite_temperatur": st("°C", { device_class: "temperature" }),
      "sensor.terrario_umidita": st("%"),
      "switch.terrarium_lampe_chauffante": st(""),
      "switch.terrarium_heizmatte": st(""),
      "switch.terrarium_brumisateur": st(""),
      "light.terrario_uvb": st(""),
      "sensor.terrario_temperatura_cpu": st("°C", { device_class: "temperature" }),
    },
  };
  const want = {
    "sensor.terrarium_temperature_point_chaud": "hot_spot",
    "sensor.terrarium_kuhle_seite_temperatur": "cold_spot",
    "sensor.terrario_umidita": "humidity",
    "switch.terrarium_lampe_chauffante": "basking",
    "switch.terrarium_heizmatte": "heat_mat",
    "switch.terrarium_brumisateur": "mister",
    "light.terrario_uvb": "uv",
    "sensor.terrario_temperatura_cpu": null,
  };
  for (const [id, role] of Object.entries(want)) assert.equal(aq.roleOf(id, h), role, id);
  // Animals in the names choose the scene and the kind.
  const terra = aq.setupOf(hass, terraConfig);
  for (const [title, scene] of [["Ball python", "ball_python"], ["Mygale", "tarantula"], ["Axolotls", "axolotl"], ["Tortue d'Hermann", "tortoise"], ["Musk turtle", "musk_turtle"]]) {
    const config = { ...terraConfig, title };
    const kind = aq.kindOf(hass, config, terra);
    assert.equal(kind, aq.SCENES[scene], title);
    assert.equal(aq.sceneOf(hass, config, terra, kind), scene, title);
  }
});
