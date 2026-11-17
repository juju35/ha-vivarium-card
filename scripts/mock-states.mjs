// Mock Home Assistant states and registries for the screenshots and the tests: a reef tank (Red Sea ReefBeat
// devices, a Seneye probe, a Neptune Apex, an EHEIM heater and an ESPHome feeder) in its own area, and a planted
// freshwater tank (EHEIM classicVARIO+e filter, classicLEDcontrol+e light and thermocontrol+e heater, an ESPHome
// probe and CO2) set by its devices. Neutral names only.

// The screenshots' day and time.
export const NOW = Date.parse("2026-11-15T14:30:00Z");
const ago = (min) => new Date(NOW - min * 60000).toISOString();

const sensor = (state, unit, extra = {}) => ({ state: String(state), attributes: { unit_of_measurement: unit, state_class: "measurement", ...extra } });

// entity id → [device, platform, state, entity_category]
const ENTITIES = {
  // ── Reef tank ──
  "light.reefled_90": ["reefled", "redsea", { state: "on", attributes: { brightness: 204, color_mode: "brightness", friendly_name: "ReefLED 90" } }],
  "switch.reefwave_45_pump": ["reefwave", "redsea", { state: "on", attributes: { friendly_name: "ReefWave 45 Pump" } }],
  "switch.reefrun_return_pump": ["reefrun", "redsea", { state: "on", attributes: { friendly_name: "ReefRun Return pump" } }],
  "switch.reefrun_skimmer": ["reefrun", "redsea", { state: "on", attributes: { friendly_name: "ReefRun Skimmer" } }],
  "switch.reefato_auto_top_off": ["reefato", "redsea", { state: "off", attributes: { friendly_name: "ReefATO+ Auto top off" } }],
  "sensor.reefato_reservoir_level": ["reefato", "redsea", sensor(68, "%", { friendly_name: "ReefATO+ Reservoir level" })],
  "binary_sensor.reefato_leak": ["reefato", "redsea", { state: "off", attributes: { device_class: "moisture", friendly_name: "ReefATO+ Leak" } }],
  "sensor.reefdose_calcium_remaining_volume": ["reefdose", "redsea", sensor(320, "mL", { friendly_name: "ReefDose Calcium remaining volume" })],
  "sensor.seneye_reef_temperature": ["seneye", "seneye", sensor(25.6, "°C", { device_class: "temperature", friendly_name: "Seneye Reef Temperature" })],
  "sensor.seneye_reef_ph": ["seneye", "seneye", sensor(8.21, "", { device_class: "ph", friendly_name: "Seneye Reef pH" })],
  "sensor.seneye_reef_nh3": ["seneye", "seneye", sensor(0.004, "mg/L", { friendly_name: "Seneye Reef NH3" })],
  "sensor.apex_salinity": ["apex", "apex", sensor(35.1, "ppt", { friendly_name: "Apex Salinity" })],
  "sensor.apex_alkalinity": ["apex", "apex", sensor(8.4, "dKH", { friendly_name: "Apex Alkalinity" })],
  "sensor.apex_calcium": ["apex", "apex", sensor(430, "mg/L", { friendly_name: "Apex Calcium" })],
  "sensor.apex_magnesium": ["apex", "apex", sensor(1320, "mg/L", { friendly_name: "Apex Magnesium" })],
  "sensor.apex_nitrate": ["apex", "apex", sensor(4.2, "mg/L", { friendly_name: "Apex Nitrate" })],
  "sensor.apex_phosphate": ["apex", "apex", sensor(0.05, "mg/L", { friendly_name: "Apex Phosphate" })],
  "sensor.apex_cpu_temperature": ["apex", "apex", sensor(46, "°C", { device_class: "temperature", friendly_name: "Apex CPU temperature" }), "diagnostic"],
  "climate.reef_heater": [
    "reefheater",
    "eheimdigital",
    { state: "auto", attributes: { hvac_action: "idle", current_temperature: 25.6, temperature: 25.5, hvac_modes: ["auto", "heat"], friendly_name: "Reef heater" } },
  ],
  "number.reef_heater_temperature_offset": ["reefheater", "eheimdigital", sensor(0, "°C", { friendly_name: "Reef heater Temperature offset" }), "config"],
  "button.reef_feeder_feed": ["reeffeeder", "esphome", { state: ago(125), attributes: { friendly_name: "Reef feeder Feed" } }],
  // ── Planted freshwater tank ──
  "switch.classicvario_pump": ["vario", "eheimdigital", { state: "on", attributes: { friendly_name: "classicVARIO+e Pump" } }],
  "sensor.classicvario_current_pump_speed": ["vario", "eheimdigital", sensor(70, "%", { friendly_name: "classicVARIO+e Current pump speed" })],
  "sensor.classicvario_remaining_hours_until_service": ["vario", "eheimdigital", sensor(72, "h", { friendly_name: "classicVARIO+e Remaining hours until service" }), "diagnostic"],
  "sensor.classicvario_error_code": ["vario", "eheimdigital", { state: "no_error", attributes: { friendly_name: "classicVARIO+e Error code" } }, "diagnostic"],
  "light.classicledcontrol": ["led", "eheimdigital", { state: "on", attributes: { brightness: 230, color_mode: "brightness", friendly_name: "classicLEDcontrol+e" } }],
  "climate.thermocontrol": [
    "thermo",
    "eheimdigital",
    { state: "auto", attributes: { hvac_action: "heating", current_temperature: 25.2, temperature: 25.5, hvac_modes: ["auto", "heat"], friendly_name: "thermocontrol+e" } },
  ],
  "sensor.planted_tank_ph": ["probe", "esphome", sensor(6.9, "", { device_class: "ph", friendly_name: "Planted tank probe pH" })],
  "sensor.planted_tank_kh": ["probe", "esphome", sensor(5, "°dH", { friendly_name: "Planted tank probe KH" })],
  "sensor.planted_tank_tds": ["probe", "esphome", sensor(210, "ppm", { friendly_name: "Planted tank probe TDS" })],
  "sensor.planted_tank_nitrate": ["probe", "esphome", sensor(12, "mg/L", { friendly_name: "Planted tank probe Nitrate" })],
  "sensor.planted_tank_wifi_signal": ["probe", "esphome", sensor(-61, "dBm", { device_class: "signal_strength", friendly_name: "Planted tank probe WiFi signal" }), "diagnostic"],
  "switch.planted_tank_co2": ["probe", "esphome", { state: "on", attributes: { friendly_name: "Planted tank probe CO2" } }],
  "button.planted_tank_feeder": ["probe", "esphome", { state: ago(310), attributes: { friendly_name: "Planted tank probe Feeder" } }],
  // ── Terrarium (desert): a Herpstat-like ESPHome thermostat probe, Zigbee plugs for the lamps and the heat mat ──
  "sensor.terrarium_hot_spot_temperature": ["terraprobe", "esphome", sensor(41.2, "°C", { device_class: "temperature", friendly_name: "Terrarium Hot spot temperature" })],
  "sensor.terrarium_cool_side_temperature": ["terraprobe", "esphome", sensor(26.4, "°C", { device_class: "temperature", friendly_name: "Terrarium Cool side temperature" })],
  "sensor.terrarium_air_temperature": ["terraprobe", "esphome", sensor(29.8, "°C", { device_class: "temperature", friendly_name: "Terrarium Air temperature" })],
  "sensor.terrarium_humidity": ["terraprobe", "esphome", sensor(34, "%", { device_class: "humidity", friendly_name: "Terrarium Humidity" })],
  "sensor.terrarium_uv_index": ["terraprobe", "esphome", sensor(4.2, "UV index", { friendly_name: "Terrarium UV index" })],
  "switch.terrarium_basking_lamp": ["terraplug1", "zha", { state: "on", attributes: { friendly_name: "Terrarium Basking lamp" } }],
  "switch.terrarium_uvb": ["terraplug2", "zha", { state: "on", attributes: { friendly_name: "Terrarium UVB" } }],
  "switch.terrarium_heat_mat": ["terraplug3", "zha", { state: "off", attributes: { friendly_name: "Terrarium Heat mat" } }],
  "light.terrarium_led": ["terraled", "zha", { state: "on", attributes: { brightness: 230, friendly_name: "Terrarium LED" } }],
  // ── Turtle tank: an EHEIM filter and heater, a temperature probe, a basking lamp and a UVB lamp ──
  "sensor.turtle_tank_water_temperature": ["turtleprobe", "esphome", sensor(25.6, "°C", { device_class: "temperature", friendly_name: "Turtle tank Water temperature" })],
  "sensor.turtle_tank_basking_temperature": ["turtleprobe", "esphome", sensor(33.4, "°C", { device_class: "temperature", friendly_name: "Turtle tank Basking temperature" })],
  "switch.turtle_tank_filter": ["turtlefilter", "eheimdigital", { state: "on", attributes: { friendly_name: "Turtle tank Filter" } }],
  "switch.turtle_tank_basking_lamp": ["turtleplug1", "zha", { state: "on", attributes: { friendly_name: "Turtle tank Basking lamp" } }],
  "switch.turtle_tank_uvb": ["turtleplug2", "zha", { state: "on", attributes: { friendly_name: "Turtle tank UVB" } }],
  "climate.turtle_tank_heater": ["turtleheater", "eheimdigital", { state: "auto", attributes: { hvac_action: "idle", current_temperature: 25.6, temperature: 25.5, hvac_modes: ["auto", "heat"], friendly_name: "Turtle tank heater" } }],
  // ── Elsewhere in the house (not the aquarium) ──
  "sensor.living_room_temperature": ["thermometer", "zha", sensor(21.4, "°C", { device_class: "temperature", friendly_name: "Living room Temperature" })],
  "light.living_room": ["lamp", "hue", { state: "on", attributes: { brightness: 180, friendly_name: "Living room" } }],
  "sun.sun": [null, "sun", { state: "above_horizon", attributes: { friendly_name: "Sun" } }],
};

export const devices = {
  reefled: { id: "reefled", name: "ReefLED 90", manufacturer: "Red Sea", model: "RSLED90", area_id: "reef_tank" },
  reefwave: { id: "reefwave", name: "ReefWave 45", manufacturer: "Red Sea", model: "RSWAVE45", area_id: "reef_tank" },
  reefrun: { id: "reefrun", name: "ReefRun", manufacturer: "Red Sea", model: "RSRUN", area_id: "reef_tank" },
  reefato: { id: "reefato", name: "ReefATO+", manufacturer: "Red Sea", model: "RSATO+", area_id: "reef_tank" },
  reefdose: { id: "reefdose", name: "ReefDose 4", manufacturer: "Red Sea", model: "RSDOSE4", area_id: "reef_tank" },
  seneye: { id: "seneye", name: "Seneye Reef", manufacturer: "Seneye", model: "Reef", area_id: "reef_tank" },
  apex: { id: "apex", name: "Apex", manufacturer: "Neptune Systems", model: "Apex 2016", area_id: "reef_tank" },
  reefheater: { id: "reefheater", name: "Reef heater", manufacturer: "EHEIM", model: "thermocontrol+e", area_id: "reef_tank" },
  reeffeeder: { id: "reeffeeder", name: "Reef feeder", manufacturer: "Espressif", model: "esp32", area_id: "reef_tank" },
  vario: { id: "vario", name: "classicVARIO+e", manufacturer: "EHEIM", model: "classicVARIO+e", area_id: "office" },
  led: { id: "led", name: "classicLEDcontrol+e", manufacturer: "EHEIM", model: "classicLEDcontrol+e", area_id: "office" },
  thermo: { id: "thermo", name: "thermocontrol+e", manufacturer: "EHEIM", model: "thermocontrol+e", area_id: "office" },
  probe: { id: "probe", name: "Planted tank probe", manufacturer: "Espressif", model: "esp32", area_id: "office" },
  terraprobe: { id: "terraprobe", name: "Terrarium probe", manufacturer: "Espressif", model: "esp32", area_id: "terrarium" },
  terraplug1: { id: "terraplug1", name: "Basking plug", manufacturer: "IKEA", model: "TRETAKT", area_id: "terrarium" },
  terraplug2: { id: "terraplug2", name: "UVB plug", manufacturer: "IKEA", model: "TRETAKT", area_id: "terrarium" },
  terraplug3: { id: "terraplug3", name: "Heat mat plug", manufacturer: "IKEA", model: "TRETAKT", area_id: "terrarium" },
  terraled: { id: "terraled", name: "Terrarium LED", manufacturer: "Signify", model: "LCA001", area_id: "terrarium" },
  turtleprobe: { id: "turtleprobe", name: "Turtle tank probe", manufacturer: "Espressif", model: "esp32", area_id: "turtle_tank" },
  turtlefilter: { id: "turtlefilter", name: "Turtle tank filter", manufacturer: "EHEIM", model: "professionel5e", area_id: "turtle_tank" },
  turtleheater: { id: "turtleheater", name: "Turtle tank heater", manufacturer: "EHEIM", model: "thermocontrol+e", area_id: "turtle_tank" },
  turtleplug1: { id: "turtleplug1", name: "Basking lamp plug", manufacturer: "IKEA", model: "TRETAKT", area_id: "turtle_tank" },
  turtleplug2: { id: "turtleplug2", name: "UVB lamp plug", manufacturer: "IKEA", model: "TRETAKT", area_id: "turtle_tank" },
  thermometer: { id: "thermometer", name: "Living room", manufacturer: "Aqara", model: "WSDCGQ11LM", area_id: "living_room" },
  lamp: { id: "lamp", name: "Living room", manufacturer: "Signify", model: "LCA001", area_id: "living_room" },
};

export const areas = {
  reef_tank: { area_id: "reef_tank", name: "Reef tank" },
  office: { area_id: "office", name: "Office" },
  terrarium: { area_id: "terrarium", name: "Desert terrarium" },
  turtle_tank: { area_id: "turtle_tank", name: "Turtle tank" },
  living_room: { area_id: "living_room", name: "Living room" },
};

export const states = {};
export const entities = {};
for (const [id, [device, platform, st, category]] of Object.entries(ENTITIES)) {
  states[id] = { entity_id: id, last_changed: ago(30), ...st };
  entities[id] = { entity_id: id, device_id: device, platform, entity_category: category ?? null, original_name: st.attributes.friendly_name };
}

export const reefConfig = { area: "Reef tank", volume: 350 };
export const terraConfig = { area: "Desert terrarium" };
export const turtleConfig = { area: "Turtle tank", volume: 300 };
export const freshConfig = { title: "Planted tank", devices: ["classicVARIO+e", "classicLEDcontrol+e", "thermocontrol+e", "Planted tank probe"], volume: 240 };

// States that tell a story (overrides of `states`).
// The reef at night: the light dimmed to its moonlight, the corals fluoresce.
export const reefNight = { "light.reefled_90": { state: "on", attributes: { brightness: 18, effect: "Moonlight", friendly_name: "ReefLED 90" } } };
// Just fed: the flakes fall.
export const feeding = { "button.reef_feeder_feed": { state: ago(1) } };
// Trouble in the reef: too warm, the return pump stopped, nitrate climbing.
export const reefProblems = {
  "sensor.seneye_reef_temperature": { state: "28.3" },
  "climate.reef_heater": { attributes: { hvac_action: "idle", current_temperature: 28.3, temperature: 25.5, hvac_modes: ["auto", "heat"], friendly_name: "Reef heater" } },
  "switch.reefrun_return_pump": { state: "off" },
  "sensor.apex_nitrate": { state: "22" },
};
// The planted tank with its lights off (night) and the filter still running.
export const freshNight = { "light.classicledcontrol": { state: "off", attributes: { friendly_name: "classicLEDcontrol+e" } } };
