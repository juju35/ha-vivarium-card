// ---------------------------------------------------------------------------
// Entity roles and discovery
// ---------------------------------------------------------------------------
import { domainOf, norm, num } from "./helpers.js";

// What the card can show, one entity each. The water measures first: they are the gauges, in this order.
export const METRIC_ROLES = [
  "water_temperature",
  "ph",
  "ammonia",
  "nitrite",
  "nitrate",
  "phosphate",
  "kh",
  "gh",
  "calcium",
  "magnesium",
  "salinity",
  "orp",
  "conductivity",
  "tds",
  "oxygen",
  "air_temperature",
  "hot_spot",
  "cold_spot",
  "humidity",
  "uv_index",
];
export const EQUIPMENT_ROLES = [
  "light",
  "heater",
  "filter",
  "filter_speed",
  "wave_pump",
  "return_pump",
  "skimmer",
  "co2",
  "air_pump",
  "uv",
  "basking",
  "heat_mat",
  "mister",
  "feeder",
  "ato",
  "reservoir",
  "water_level",
  "leak",
  "dosing",
  "service",
  "power",
];
export const ROLES = [...METRIC_ROLES, ...EQUIPMENT_ROLES];
export const SECTIONS = ["quality", "advice"];
export const DEFAULT_COLLAPSED = ["advice"];
// Short labels of the measures (chemical symbols, the same in every language) for the mini card's pills.
export const SHORT = {
  ph: "pH",
  ammonia: "NH₃",
  nitrite: "NO₂",
  nitrate: "NO₃",
  phosphate: "PO₄",
  kh: "KH",
  gh: "GH",
  calcium: "Ca",
  magnesium: "Mg",
  salinity: "Sal",
  orp: "ORP",
  conductivity: "EC",
  tds: "TDS",
  oxygen: "O₂",
  hot_spot: "↑",
  cold_spot: "↓",
  humidity: "RH",
  uv_index: "UVI",
};
// The measures each kind of tank shows, in this order (a terrarium: its air first; a turtle tank: its water and its
// basking spot). The air temperatures, the humidity and the UV index are not an aquarium's.
export const AQUA_METRICS = METRIC_ROLES.slice(0, 15);
export const KIND_METRICS = {
  reef: AQUA_METRICS,
  freshwater: AQUA_METRICS,
  terrarium: ["air_temperature", "hot_spot", "cold_spot", "humidity", "uv_index", "water_temperature", "ph"],
  turtle: ["water_temperature", "hot_spot", "air_temperature", "humidity", "uv_index", "ph", "ammonia", "nitrite", "nitrate", "kh", "gh", "conductivity", "tds", "oxygen"],
};
export const KINDS = Object.keys(KIND_METRICS);
export const TEMP_ROLES = new Set(["water_temperature", "air_temperature", "hot_spot", "cold_spot"]);
export const WATER_KINDS = new Set(["reef", "freshwater", "turtle"]);

// Words of the entity ids and names, in the languages of the integrations and of ESPHome / template entities.
export const W = (words) => new RegExp(`(^|[^a-z0-9])(${words})([^a-z0-9]|$)`);
export const LEAK_RE = /leak|fuite|leck|fuga|perdita|lekk|wasser.?alarm|water.?alarm/;
export const LEVEL_RE = /level|niveau|pegel|nivel|livello|float|flotteur|schwimmer|sump.?low/;
export const ATO_RE = W("ato|auto.?top.?off|top.?off|topoff|osmo\\w*|nachfull\\w*|refill|rabbocco|rellenado|remplissage|reefato\\+?|ato\\+");
export const RESERVOIR_RE = /reservoir|reserv|tank.?level|container|vorrat|deposito|serbatoio|bidon/;
export const FEED_RE = /feed|feeder|futter|nourri|aliment|comedero|mangiatoia|voer|food|fuetter/;
export const SERVICE_RE = /service|maintenance|entretien|wartung|mantenimiento|manutenzione|onderhoud|filter.?change|clean/;
export const DOSING_RE = /dos(e|ing|age|er|eur|ier|ierung|ificador)|remaining|restant|verbleib|container|daily.?volume|supplement/;
export const HEAT_RE = /heat|heater|chauff|heiz|calent|riscald|verwarm|thermo/;
export const CO2_RE = W("co2|co₂|kohlendioxid|carbon.?dioxide");
export const UV_RE = W("uv|uvc|uv.?c|uvb|uva|uv.?b|uv.?a|sterili[sz]er|steriliser|klarer|clarifier|reeflex\\w*");
export const SKIMMER_RE = /skimmer|abschaum|ecumeur|espumador|schiumatoio/;
export const WAVE_RE = /wave|vortech|stream|circulat|powerhead|gyre|stromung|stroemung|brassage|courant|onda|nero|mp\d\d/;
export const RETURN_RE = /return|retour|ruckfoerder|ruckforder|rucklauf|reefrun|vectra|remontee|riflusso/;
export const AIR_RE = /air.?pump|airpump|air.?stone|bulleur|aerat|luftpumpe|sauerstoffpumpe|aireador|oxygen.?pump|diffuser.?air/;
// Short brand words and "led" as whole words only: "enabled", "scheduled" or "primed" are no lights.
export const LIGHT_RE = /light|lamp|lumi|eclair|licht|beleucht|luz|luce|verlicht|helialux|radion|reefled|(^|[^a-z])(hydra|prime|leds?)([^a-z]|$)/;
export const FILTER_RE = /filter|filtre|filtro|pump|pompe|pumpe|bomba|canister|vario|professionel/;
export const SPEED_RE = /speed|vitesse|drehzahl|velocidad|velocita|snelheid|rpm|flow|debit/;
export const ROOM_RE = W("air|room|ambient|ambiance|outdoor|outside|exterieur|ambiante|piece|raum|aussen|luft|aria|aire|lucht|powietrz\\w*|vzduch\\w*");
// The temperature of a controller's chip is never the tank's.
export const CHIP_RE = W("cpu|chip|board|internal|interne|controller|esp32|esp8266|soc|processor");
// A terrarium's warm and cool sides.
export const HOT_RE = /hot|warm|bask|spot|chaud|sonnen|heiss|caliente|caldo|calda|heet|goracy|gorac|horuc|toply|топл|горяч|θερμ/;
export const COLD_RE = /cold|cool|froid|frais|fraiche|kalt|kuhl|frio|freddo|fredda|koud|koel|zimn|chlad|холод|ψυχρ/;
export const HUMID_RE = /humid|hygro|feucht|umid|vochtig|wilgot|vlhk|влажн|вологіст|υγρασ|fuktig|fugtig|nedvesség|nedvesseg|mitrums|vlaga|vlažn/;
export const UVI_RE = /uv.?index|uvi([^a-z]|$)|indice uv|uv.?indeks|uv.?wert/;
// Terrarium equipment: the basking lamp, the heat mat or cable and the mister (rain system, fogger).
export const BASK_RE = /bask|spot.?lamp|sun.?spot|hot.?spot|sonnenplatz|spotstrahler|halogen|heat.?lamp|lampe chauffante|spot chauffant|warmelampe|warmestrahler|lampada riscaldante|lampara de calor|warmtelamp/;
export const MAT_RE = /heat.?mat|heat.?pad|heat.?cable|heat.?tape|heizmatte|heizkabel|tapis chauffant|cable chauffant|esterilla|tappetino|warmtemat|mata grzew/;
export const MIST_RE = /mist|brumi|nebel|fogger|rain.?system|raining|pluie|beregn|monsoon|sprinkl|nebuli|humidifier|befeucht|umidific|humidificador|bevochtig|zraszacz|rocio|nebbia/;
// A set point, a target, an alarm threshold or a calibration is never a measure.
export const NOT_MEASURE_RE = /setpoint|set.?point|consigne|target|cible|sollwert|desired|offset|calibrat|alarm|threshold|seuil|limit|_min([^a-z]|$)|_max([^a-z]|$)/;
// Integrations and brands of aquarium equipment (integration domains, device names and manufacturers), for the card
// that has no option at all.
export const AQUA_RE =
  /aquari|aquarium|terrari|vivari|paludari|reptil|exo.?terra|zoo.?med|lucky.?reptile|habistat|herpstat|microclimate|arcadia|repti.?zoo|axolotl|reef|redsea|red sea|reefbeat|eheim|apex|neptune|chihiros|aquable|mobius|ecotech|radion|vortech|aquaillumination|nyos|kessil|seneye|reef.?pi|aquatlantis|juwel|helialux|aquael|hydros|tunze|fluval|oase|dennerle|sera|tetra|bac a poissons|fish.?tank/;
// A probe that says it is in the water.
export const WATER_WORD_RE = /water|wasser|(^|[^a-z])eau|agua|acqua|vann|vatten|voda|wody|apa |vesi|νερο|вод|bassin|pond|teich/;
export const REEF_RE = /reef|marine|salt.?water|saltwater|eau de mer|meerwasser|red ?sea|reefbeat|ecotech|radion|vortech|aquaillumination|nyos|kessil|tunze|skimmer|ecumeur/;
export const unitIs = (unit, list) => list.includes(String(unit || "").toLowerCase().replace(/\s/g, ""));

// The text a role is read from: entity id, translation key and names, accents and case dropped.
export const textOf = (id, hass) => {
  const e = hass.entities?.[id] || {};
  const s = hass.states?.[id];
  return norm([id.split(".")[1], e.translation_key, e.original_name, e.name, s?.attributes?.friendly_name].filter(Boolean).join(" ")).replace(/[_\-.]+/g, " ");
};

// The role of an entity, from its domain, device class, unit and names; null when it is none of them.
export const roleOf = (id, hass) => {
  const d = domainOf(id);
  const s = hass.states?.[id];
  const a = s?.attributes || {};
  const dc = a.device_class || hass.entities?.[id]?.original_device_class || "";
  const unit = String(a.unit_of_measurement || "");
  const n = textOf(id, hass);
  if (d === "climate" || d === "water_heater") return "heater";
  if (d === "light") return BASK_RE.test(n) ? "basking" : UV_RE.test(n) && !UVI_RE.test(n) ? "uv" : "light";
  if (d === "button" || d === "script") return FEED_RE.test(n) ? "feeder" : null;
  if (d === "binary_sensor") {
    if (dc === "moisture" || LEAK_RE.test(n)) return "leak";
    if (ATO_RE.test(n) && !LEVEL_RE.test(n)) return "ato";
    if (LEVEL_RE.test(n)) return "water_level";
    return null;
  }
  if (d === "sensor") {
    if (dc === "power" || unitIs(unit, ["w", "kw"])) return "power";
    if (FEED_RE.test(n) && dc === "timestamp") return "feeder";
    if (SERVICE_RE.test(n) && (unitIs(unit, ["h", "d", "min", "s", "days", "hours"]) || dc === "duration" || dc === "timestamp")) return "service";
    if (DOSING_RE.test(n)) return "dosing";
    if ((RESERVOIR_RE.test(n) || ATO_RE.test(n)) && (unit === "%" || unitIs(unit, ["l", "ml", "gal"]) || dc === "volume_storage")) return "reservoir";
    if (FILTER_RE.test(n) && SPEED_RE.test(n)) return "filter_speed";
    if (NOT_MEASURE_RE.test(n)) return null;
    if (dc === "humidity" || (HUMID_RE.test(n) && (unit === "%" || !unit))) return "humidity";
    if (UVI_RE.test(n) && !unitIs(unit, ["%", "w", "kw", "°c", "°f"])) return "uv_index";
    if (dc === "temperature" || /°[CF]|^K$/.test(unit)) {
      if (CHIP_RE.test(n)) return null;
      if (WATER_WORD_RE.test(n)) return "water_temperature";
      if (HOT_RE.test(n)) return "hot_spot";
      if (COLD_RE.test(n)) return "cold_spot";
      return ROOM_RE.test(n) ? "air_temperature" : "water_temperature";
    }
    if (dc === "ph" || W("ph").test(n)) return "ph";
    if (/nh3|nh4|ammon|amoni/.test(n)) return "ammonia";
    if (/no2|nitrit/.test(n)) return "nitrite";
    if (/no3|nitrat/.test(n)) return "nitrate";
    if (/po4|phosphat|fosfat|phosphor/.test(n)) return "phosphate";
    if (W("kh|dkh|alk|alkalinity|alkalinitat|alcalinite|alcalinidad|alcalinita|karbonathaerte|karbonatharte|carbonate").test(n)) return "kh";
    if (W("gh|dgh|gesamthaerte|gesamtharte|general hardness|durete").test(n)) return "gh";
    if (/calci|kalzium|calzio/.test(n) || W("ca").test(n)) return "calcium";
    if (/magnes/.test(n) || W("mg").test(n)) return "magnesium";
    if (/salin|salz|salt|specific gravity|densit/.test(n) || W("sg|psu|sel").test(n) || unitIs(unit, ["ppt", "‰", "psu", "sg"])) return "salinity";
    if (/orp|redox|red ox/.test(n) || unit === "mV") return "orp";
    if (dc === "conductivity" || /conduct|leitf|conduttiv/.test(n) || W("ec").test(n) || /s\/cm$/i.test(unit)) return "conductivity";
    if (W("tds").test(n)) return "tds";
    if (/oxygen|sauerstoff|oxigen|ossigen|zuurstof|oxygene/.test(n) || W("o2|do").test(n)) return "oxygen";
    if (LEVEL_RE.test(n) && (unit === "%" || dc === "distance")) return "water_level";
    return null;
  }
  if (d === "number") return FILTER_RE.test(n) && SPEED_RE.test(n) && !NOT_MEASURE_RE.test(n) ? "filter_speed" : null;
  if (!["switch", "fan", "input_boolean", "valve"].includes(d)) return null;
  // Switches: the most specific words first (a "return pump" is not the filter, a "heater" switch not a light).
  if (FEED_RE.test(n)) return "feeder";
  if (CO2_RE.test(n)) return "co2";
  if (MIST_RE.test(n)) return "mister";
  if (d === "valve") return null;
  if (BASK_RE.test(n)) return "basking";
  if (MAT_RE.test(n)) return "heat_mat";
  if (HEAT_RE.test(n)) return "heater";
  if (UV_RE.test(n)) return "uv";
  if (SKIMMER_RE.test(n)) return "skimmer";
  if (RETURN_RE.test(n)) return "return_pump";
  if (WAVE_RE.test(n)) return "wave_pump";
  if (AIR_RE.test(n)) return "air_pump";
  if (ATO_RE.test(n)) return "ato";
  if (/dos(e|ing|er|eur|ier)/.test(n)) return "dosing";
  if (LIGHT_RE.test(n) && !FILTER_RE.test(n)) return "light";
  if (FILTER_RE.test(n)) return "filter";
  return null;
};

// Diagnostic entities are left out, except measures and counters (Seneye, EHEIM file theirs there).
export const DIAGNOSTIC_ROLES = new Set([...METRIC_ROLES, "service", "filter_speed", "reservoir", "power"]);
// Which entity wins when a role has several: a better domain first, then a name that says it is the tank's.
export const DOMAIN_RANK = {
  heater: { climate: 4, water_heater: 3, switch: 2, input_boolean: 1 },
  light: { light: 4, switch: 2, input_boolean: 1 },
  feeder: { button: 4, script: 3, switch: 2, input_boolean: 1, sensor: 0 },
  filter: { switch: 4, fan: 3, input_boolean: 1 },
  filter_speed: { sensor: 3, number: 2 },
};
export const TANK_RE = /water|wasser|eau|agua|acqua|aquari|tank|bac|probe|sonde/;
export const rankOf = (role, id, hass, diagnostic) => {
  let r = (DOMAIN_RANK[role]?.[domainOf(id)] ?? 2) * 10;
  if (!diagnostic) r += 2;
  if (role === "water_temperature" && TANK_RE.test(textOf(id, hass))) r += 5;
  // A moonlight is the second light of a fixture: the daylight one first.
  if (role === "light" && /moon|lune|mond|luna|maan/.test(textOf(id, hass))) r -= 5;
  return r;
};

export const _byDevice = new WeakMap();
export const devicesOf = (hass) => {
  if (!hass.entities) return new Map();
  const cached = _byDevice.get(hass.entities);
  if (cached) return cached;
  const map = new Map();
  for (const e of Object.values(hass.entities || {})) {
    if (!e.device_id) continue;
    (map.get(e.device_id) || map.set(e.device_id, []).get(e.device_id)).push(e.entity_id);
  }
  _byDevice.set(hass.entities, map);
  return map;
};

export const deviceName = (d) => d?.name_by_user || d?.name || "";
export const findDeviceId = (hass, device) => {
  if (!device || !hass.devices) return null;
  if (hass.devices[device]) return device;
  const d = Object.values(hass.devices).find((x) => deviceName(x) === device || x.name === device);
  return d ? d.id : undefined;
};
export const findAreaId = (hass, area) => {
  const areas = hass.areas || {};
  if (areas[area]) return area;
  const found = Object.values(areas).find((a) => a.name === area || norm(a.name) === norm(area));
  return found ? found.area_id : undefined;
};
export const usable = (hass, id) => {
  const e = hass.entities?.[id];
  return !!hass.states?.[id] && !e?.hidden && !e?.disabled_by && e?.entity_category !== "config";
};

// The best entity of each role among `ids` (see rankOf).
export const rolesAmong = (hass, ids) => {
  const best = {};
  for (const id of [...new Set(ids)].sort()) {
    if (!usable(hass, id)) continue;
    const diagnostic = hass.entities?.[id]?.entity_category === "diagnostic";
    const role = roleOf(id, hass);
    if (!role || (diagnostic && !DIAGNOSTIC_ROLES.has(role))) continue;
    const rank = rankOf(role, id, hass, diagnostic);
    if (!best[role] || rank > best[role].rank) best[role] = { id, rank };
  }
  return Object.fromEntries(Object.entries(best).map(([role, { id }]) => [role, id]));
};

// With no option at all: the entities of the aquarium integrations and of the devices of aquarium brands, or named
// aquarium / reef / tank, all together (an aquarium is often several devices: a filter, a heater, a light).
export const _auto = new WeakMap();
export const autoIds = (hass) => {
  if (!hass.entities) return [];
  const cached = _auto.get(hass.entities);
  if (cached && cached.devices === hass.devices) return cached.ids;
  const ids = [];
  for (const e of Object.values(hass.entities || {})) {
    const d = hass.devices?.[e.device_id];
    const text = norm(`${e.platform || ""} ${deviceName(d)} ${d?.manufacturer || ""} ${d?.model || ""}`);
    if (AQUA_RE.test(text)) ids.push(e.entity_id);
  }
  _auto.set(hass.entities, { ids, devices: hass.devices });
  return ids;
};

// The entities of an area (their own area, else their device's). Home Assistant pushes a new hass on every state
// change and the card reads its setup each time: the registries are scanned again only when they change.
export const _byArea = new WeakMap();
export const areaIdsOf = (hass, areaId) => {
  if (!hass.entities) return [];
  let cached = _byArea.get(hass.entities);
  if (!cached || cached.devices !== hass.devices) {
    cached = { devices: hass.devices, areas: new Map() };
    _byArea.set(hass.entities, cached);
  }
  if (!cached.areas.has(areaId)) {
    const ids = [];
    for (const e of Object.values(hass.entities || {})) {
      if ((e.area_id || hass.devices?.[e.device_id]?.area_id) === areaId) ids.push(e.entity_id);
    }
    cached.areas.set(areaId, ids);
  }
  return cached.areas.get(areaId);
};

// The entities of the card: those of the area and of the devices set (or found), each role replaced by the one
// set in the options.
export const setupOf = (hass, config) => {
  const explicit = Object.fromEntries(ROLES.filter((r) => typeof config[r] === "string" && config[r]).map((r) => [r, config[r]]));
  const ids = [];
  const devices = [];
  let area = null;
  if (config.area) {
    const areaId = findAreaId(hass, config.area);
    if (areaId === undefined) return { error: "unknown_area" };
    area = hass.areas?.[areaId] || null;
    ids.push(...areaIdsOf(hass, areaId));
  }
  for (const device of [].concat(config.devices || [], config.device || [])) {
    const id = findDeviceId(hass, device);
    if (id === undefined) return { error: "unknown_device", detail: device };
    if (!id) continue;
    devices.push(hass.devices?.[id]);
    ids.push(...(devicesOf(hass).get(id) || []));
  }
  if (!config.area && !devices.length && !Object.keys(explicit).length) ids.push(...autoIds(hass));
  const roles = { ...rolesAmong(hass, ids), ...explicit };
  if (!Object.keys(roles).length) return { error: "no_entities" };
  return { roles, area, devices, ids };
};

// The scenes of the header and the kind of tank each one is: the reef and the planted tank, then 18 themes.
export const SCENES = {
  reef: "reef",
  planted: "freshwater",
  iwagumi: "freshwater",
  blackwater: "freshwater",
  malawi: "freshwater",
  tanganyika: "freshwater",
  shrimp: "freshwater",
  betta: "freshwater",
  goldfish: "freshwater",
  mangrove: "freshwater",
  pond: "freshwater",
  sps: "reef",
  soft_coral: "reef",
  nano_reef: "reef",
  seahorse: "reef",
  jellyfish: "reef",
  predator: "reef",
  wreck: "reef",
  abyss: "reef",
  arctic: "reef",
  desert: "terrarium",
  rainforest: "terrarium",
  leopard_gecko: "terrarium",
  chameleon: "terrarium",
  ball_python: "terrarium",
  tarantula: "terrarium",
  insects: "terrarium",
  crested_gecko: "terrarium",
  paludarium: "terrarium",
  hermit_crab: "terrarium",
  tortoise: "terrarium",
  axolotl: "freshwater",
  turtle: "turtle",
  musk_turtle: "turtle",
};
// The words of the names (the title, the area, the devices) that choose a theme, in the usual languages.
export const SCENE_HINTS = [
  // Terrariums and turtle tanks first: their animals name them better than an aquarium word.
  ["axolotl", /axolotl|ajolote|aksolotl|аксолотл|αξόλοτλ/],
  ["musk_turtle", /musk|musquee|moschus|sternotherus|kinosternon|mud turtle|almizcl|muschiat/],
  ["turtle", /turtle|tortue d.?eau|tortues d.?eau|tempes rouges|wasserschildkrot|tortuga acuatica|tartaruga acquatica|waterschildpad|zolw wodny|slider|trachemys|aquaterrar|aqua.?terrar/],
  ["tortoise", /tortoise|tortue|landschildkrot|schildkrot|tortuga|tartaruga|schildpad|zolw|testudo|sulcata|hermann/],
  ["desert", /pogona|bearded dragon|agame|bartagame|uromastyx|desert|desierto|wuste|deserto|woestijn|pustyn/],
  ["leopard_gecko", /leopard.?gecko|gecko leopard|leopardgecko|eublepharis|gecko leo/],
  ["crested_gecko", /crested|gecko a crete|kronengecko|correlophus|rhacodactylus|gargoyle|geco crestato/],
  ["chameleon", /chamel|camaleon|camaleont|kameleon|chamaleon|хамелеон/],
  ["ball_python", /python|pyth|boa|snake|serpent|schlange|serpiente|serpente|slang|waz|corn snake|regius|змея|змія/],
  ["tarantula", /tarantul|mygale|vogelspinne|spider|araign|arana|ragno|vogelspin|ptasznik|brachypelma|паук|павук/],
  ["insects", /phasm|stick insect|mantis|mante|gottesanbeter|insect|insekt|insetti|insecto|cricket|grillon|stabschreck/],
  ["hermit_crab", /hermit|bernard|einsiedler|ermitan|paguro|heremiet|coenobita|pustelnik/],
  ["paludarium", /paludar/],
  ["rainforest", /dendrobat|dart frog|poison frog|pfeilgift|rainforest|rain forest|foret tropicale|regenwald|selva|foresta pluviale|regenwoud|frog|grenouille|frosch|rana|kikker|vivarium/],
  ["iwagumi", /iwagumi|aquascap|nature aquarium/],
  ["blackwater", /black.?water|eau noire|schwarzwasser|aguas negras|acque nere|zwartwater|amazon(as|ien|ian|ia)/],
  ["malawi", /malawi|mbuna/],
  ["tanganyika", /tanganyika|tanganika|tanganjika|tanganica/],
  ["shrimp", /shrimp|crevette|garnele|gamba|camaron|gamberett|garnal|krewet|neocaridina|caridina/],
  ["betta", W("betta|combattant|kampffisch\\w*|bojownik\\w*")],
  ["goldfish", /goldfish|goldfisch|poissons? rouges?|pesci rossi|peces dorados|goudvis|ranchu|oranda/],
  ["mangrove", /mangrove|mangle|mangrov|brackish|saumatre|brackwasser|salobre|salmastr|brak/],
  ["pond", W("pond|bassin|etang|teich|koi|estanque|laghetto|vijver|oczko")],
  ["sps", W("sps|acropora|acro")],
  ["soft_coral", /soft.?coral|coraux mous|weichkorall|corales blandos|coralli molli|zachte koralen/],
  ["nano_reef", W("nano\\w*|pico")],
  ["seahorse", /seahorse|hippocampe|seepferd|caballito|cavallucc|zeepaard|hippocampus/],
  ["jellyfish", /jelly.?fish|meduse|qualle|medusa|kwal|kreisel/],
  ["predator", /predator|predateur|rauber|depredador|predatori|lionfish|rascasse|shark|requin|moray|murene/],
  ["wreck", /wreck|epave|wrack|pecio|relitto|treasure|tresor|schatz/],
  ["abyss", /abyss|abysse|abismo|abisso|deep.?sea|tiefsee|diepzee/],
  ["arctic", /arctic|arctique|banquise|packeis|polar|kaltwasser|eau froide|cold.?water/],
];

// The names that describe a tank, the most telling first: the title, the area, then its devices and integrations.
export const namesOf = (hass, config, setup) => [
  norm(config.title),
  norm(setup.area?.name),
  norm(
    setup.ids
      .slice(0, 200)
      .map((id) => {
        const e = hass.entities?.[id];
        const d = hass.devices?.[e?.device_id];
        return `${e?.platform || ""} ${deviceName(d)} ${d?.manufacturer || ""} ${d?.model || ""}`;
      })
      .join(" "),
  ),
];
// The theme the names call for, from the first name that calls for one (`kind` given: only a theme of that kind).
export const hintOf = (names, kind) => {
  for (const text of names) {
    const hit = SCENE_HINTS.find(([key, re]) => (!kind || SCENES[key] === kind) && re.test(text));
    if (hit) return hit[0];
  }
  return "";
};
export const explicitScene = (config) => (config.scene && config.scene !== "auto" && SCENES[config.scene] ? config.scene : "");

// The roles of a tank in water, and those of a terrarium's air.
export const WATER_ROLES = ["filter", "co2", "wave_pump", "return_pump", "skimmer", "air_pump", "ato", "ph", "ammonia", "nitrite", "nitrate", "kh", "gh", "salinity"];
export const AIR_ROLES = ["hot_spot", "cold_spot", "basking", "heat_mat", "mister", "uv_index"];
export const TERRA_RE = /terrari|vivari|reptil|exo.?terra|zoo.?med|lucky.?reptile|habistat|herpstat|microclimate|arcadia|repti.?zoo/;

// Reef (salt water), freshwater, terrarium (air: reptiles, amphibians, invertebrates) or turtle tank (water and a
// basking spot): the option, else the kind of the scene chosen, else a salinity or reef equipment (skimmer,
// calcium…), else an animal or a theme named by the tank, else a terrarium's equipment (basking lamp, heat mat,
// mister, hot and cool sides; with a filter: a turtle tank), else a reef or terrarium brand in the names.
export const kindOf = (hass, config, setup) => {
  if (KINDS.includes(config.kind)) return config.kind;
  if (explicitScene(config)) return SCENES[config.scene];
  const r = setup.roles;
  if (r.salinity || r.skimmer || r.calcium || r.magnesium || r.return_pump) return "reef";
  const names = namesOf(hass, config, setup);
  const text = names.join(" ");
  const hint = hintOf(names);
  if (hint) return SCENES[hint];
  const watery = WATER_ROLES.some((k) => r[k]);
  if (AIR_ROLES.some((k) => r[k]) || (r.humidity && !watery)) return watery ? "turtle" : "terrarium";
  if (TERRA_RE.test(text)) return "terrarium";
  return REEF_RE.test(text) ? "reef" : "freshwater";
};

// The scene of the header: the option, else a theme of the right kind that the names call for, else the reef, the
// planted tank, the turtle tank, or a desert or a rainforest terrarium after its humidity.
export const sceneOf = (hass, config, setup, kind) => {
  const scene = explicitScene(config) || hintOf(namesOf(hass, config, setup), kind);
  if (scene) return scene;
  if (kind === "terrarium") {
    const h = num(hass.states?.[setup.roles.humidity]);
    return h !== null && h < 50 ? "desert" : "rainforest";
  }
  return { reef: "reef", freshwater: "planted", turtle: "turtle" }[kind];
};
