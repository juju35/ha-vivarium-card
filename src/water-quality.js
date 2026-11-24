// ---------------------------------------------------------------------------
// Water quality: ideal ranges, levels and advice
// ---------------------------------------------------------------------------
import { c2f, clamp } from "./helpers.js";
import { TEMP_ROLES } from "./entity-roles-discovery.js";

// Gauge scale, ideal range and the margins below and above it that are a warning (beyond: critical), per measure
// and per kind of tank. Usual hobby values: tropical community tank (24–27 °C, pH 6.5–7.5, free ammonia under
// 0.02 mg/L as Seneye reads it, nitrite under 0.1, nitrate under 25 mg/L, KH 3–8 and GH 4–12 °dH) and reef tank
// (25–26.5 °C, pH 7.9–8.4, salinity 34–35.5 ppt / SG 1.024–1.026, alkalinity 7–11 dKH, calcium 400–450, magnesium
// 1250–1400, nitrate 1–10 and phosphate 0.02–0.1 mg/L).
export const BASE_RANGES = {
  freshwater: {
    water_temperature: { scale: [18, 32], ideal: [24, 27], margin: [1.5, 2], digits: 1, unit: "°C" },
    ph: { scale: [5.5, 8.5], ideal: [6.5, 7.5], margin: [0.3, 0.3], digits: 1 },
    ammonia: { scale: [0, 0.1], ideal: [0, 0.02], margin: [0, 0.03], digits: 3, unit: "mg/L" },
    nitrite: { scale: [0, 1], ideal: [0, 0.1], margin: [0, 0.2], digits: 2, unit: "mg/L" },
    nitrate: { scale: [0, 100], ideal: [0, 25], margin: [0, 25], digits: 0, unit: "mg/L" },
    phosphate: { scale: [0, 2], ideal: [0, 0.5], margin: [0, 0.5], digits: 2, unit: "mg/L" },
    kh: { scale: [0, 15], ideal: [3, 8], margin: [1, 4], digits: 1, unit: "°dH" },
    gh: { scale: [0, 25], ideal: [4, 12], margin: [2, 6], digits: 1, unit: "°dH" },
    calcium: { scale: [0, 150], ideal: [20, 80], margin: [10, 40], digits: 0, unit: "mg/L" },
    magnesium: { scale: [0, 50], ideal: [5, 30], margin: [3, 15], digits: 0, unit: "mg/L" },
    salinity: { scale: [0, 10], ideal: [0, 1], margin: [0, 2], digits: 1, unit: "ppt" },
    orp: { scale: [0, 500], ideal: [200, 350], margin: [50, 100], digits: 0, unit: "mV" },
    conductivity: { scale: [0, 1500], ideal: [150, 600], margin: [100, 300], digits: 0, unit: "µS/cm" },
    tds: { scale: [0, 800], ideal: [100, 300], margin: [50, 150], digits: 0, unit: "ppm" },
    oxygen: { scale: [0, 12], ideal: [6, 9], margin: [1, 3], digits: 1, unit: "mg/L" },
  },
  reef: {
    water_temperature: { scale: [22, 30], ideal: [25, 26.5], margin: [1, 1], digits: 1, unit: "°C" },
    ph: { scale: [7.4, 8.8], ideal: [7.9, 8.4], margin: [0.2, 0.2], digits: 2 },
    ammonia: { scale: [0, 0.05], ideal: [0, 0.01], margin: [0, 0.02], digits: 3, unit: "mg/L" },
    nitrite: { scale: [0, 0.5], ideal: [0, 0.05], margin: [0, 0.15], digits: 2, unit: "mg/L" },
    nitrate: { scale: [0, 50], ideal: [1, 10], margin: [1, 15], digits: 1, unit: "mg/L" },
    phosphate: { scale: [0, 0.3], ideal: [0.02, 0.1], margin: [0.02, 0.1], digits: 2, unit: "mg/L" },
    kh: { scale: [5, 14], ideal: [7, 11], margin: [1, 1.5], digits: 1, unit: "dKH" },
    gh: { scale: [0, 25], ideal: [4, 12], margin: [2, 6], digits: 1, unit: "°dH" },
    calcium: { scale: [350, 500], ideal: [400, 450], margin: [30, 30], digits: 0, unit: "mg/L" },
    magnesium: { scale: [1100, 1500], ideal: [1250, 1400], margin: [100, 80], digits: 0, unit: "mg/L" },
    salinity: { scale: [30, 38], ideal: [34, 35.5], margin: [1, 1], digits: 1, unit: "ppt" },
    orp: { scale: [150, 500], ideal: [300, 450], margin: [50, 50], digits: 0, unit: "mV" },
    conductivity: { scale: [45, 60], ideal: [51.5, 54], margin: [1.5, 1.5], digits: 1, unit: "mS/cm" },
    tds: { scale: [0, 50], ideal: [0, 5], margin: [0, 10], digits: 0, unit: "ppm" },
    oxygen: { scale: [0, 10], ideal: [6, 8], margin: [1, 2], digits: 1, unit: "mg/L" },
  },
};
// A terrarium (a tropical one unless its scene says otherwise) and a turtle tank (red-eared slider: water 24–27 °C,
// basking spot 30–35 °C).
BASE_RANGES.terrarium = {
  air_temperature: { scale: [15, 38], ideal: [22, 28], margin: [2, 3], digits: 1, unit: "°C" },
  hot_spot: { scale: [20, 50], ideal: [30, 35], margin: [3, 4], digits: 1, unit: "°C" },
  cold_spot: { scale: [12, 35], ideal: [22, 26], margin: [2, 3], digits: 1, unit: "°C" },
  humidity: { scale: [0, 100], ideal: [60, 80], margin: [10, 15], digits: 0, unit: "%" },
  uv_index: { scale: [0, 8], ideal: [1, 3], margin: [0.5, 2], digits: 1 },
  water_temperature: { scale: [15, 32], ideal: [22, 27], margin: [2, 2], digits: 1, unit: "°C" },
  ph: BASE_RANGES.freshwater.ph,
};
BASE_RANGES.turtle = {
  ...BASE_RANGES.freshwater,
  water_temperature: { scale: [15, 32], ideal: [24, 27], margin: [2, 2], digits: 1, unit: "°C" },
  nitrate: { scale: [0, 120], ideal: [0, 40], margin: [0, 30], digits: 0, unit: "mg/L" },
  air_temperature: { scale: [15, 38], ideal: [25, 30], margin: [2, 3], digits: 1, unit: "°C" },
  hot_spot: { scale: [20, 45], ideal: [30, 35], margin: [3, 4], digits: 1, unit: "°C" },
  humidity: { scale: [0, 100], ideal: [50, 80], margin: [15, 15], digits: 0, unit: "%" },
  uv_index: { scale: [0, 8], ideal: [2, 4], margin: [1, 2], digits: 1 },
};
// The needs of each animal (usual keeping guidelines), over the ranges of its kind: [ideal low, high, margin low,
// high] per measure.
export const PROFILES = {
  desert: { air_temperature: [26, 32, 3, 4], hot_spot: [38, 45, 4, 5], cold_spot: [24, 28, 3, 3], humidity: [25, 40, 10, 15], uv_index: [3, 6, 1, 2] },
  rainforest: { hot_spot: [24, 28, 2, 2], air_temperature: [22, 26, 2, 2], cold_spot: [20, 23, 2, 2], humidity: [80, 100, 10, 0], uv_index: [0.5, 2, 0.5, 1] },
  leopard_gecko: { air_temperature: [24, 29, 2, 3], hot_spot: [30, 34, 3, 3], cold_spot: [22, 26, 2, 3], humidity: [30, 40, 10, 15], uv_index: [0.5, 2, 0.5, 1] },
  chameleon: { air_temperature: [24, 28, 3, 2], hot_spot: [30, 35, 3, 3], cold_spot: [20, 24, 3, 3], humidity: [50, 80, 10, 10], uv_index: [1.5, 3.5, 1, 1.5] },
  ball_python: { air_temperature: [26, 30, 2, 2], hot_spot: [31, 33, 2, 2], cold_spot: [24, 27, 2, 2], humidity: [55, 70, 10, 10], uv_index: [0, 2, 0, 1] },
  tarantula: { cold_spot: [21, 25, 2, 2], hot_spot: [25, 29, 2, 2], air_temperature: [22, 27, 3, 3], humidity: [60, 75, 10, 10], uv_index: [0, 0.5, 0, 1] },
  insects: { cold_spot: [18, 23, 2, 2], uv_index: [0, 2, 0, 1], hot_spot: [24, 28, 2, 2], air_temperature: [20, 26, 3, 3], humidity: [50, 70, 10, 15] },
  crested_gecko: { air_temperature: [22, 26, 3, 1.5], hot_spot: [26, 28, 2, 1.5], cold_spot: [20, 23, 2, 2], humidity: [60, 80, 10, 15], uv_index: [0, 2, 0, 1] },
  paludarium: { cold_spot: [20, 24, 2, 2], uv_index: [0, 2, 0, 1], hot_spot: [26, 30, 2, 2], air_temperature: [22, 27, 2, 2], humidity: [70, 90, 10, 10], water_temperature: [22, 26, 2, 2] },
  hermit_crab: { cold_spot: [23, 27, 2, 2], uv_index: [0, 2, 0, 1], hot_spot: [27, 31, 2, 2], air_temperature: [24, 29, 2, 2], humidity: [70, 80, 10, 10], water_temperature: [24, 28, 2, 2] },
  tortoise: { air_temperature: [22, 30, 3, 3], hot_spot: [32, 38, 3, 4], cold_spot: [18, 24, 3, 3], humidity: [50, 70, 15, 15], uv_index: [2, 5, 1, 2] },
  axolotl: { water_temperature: [14, 20, 3, 2] },
  musk_turtle: { water_temperature: [22, 26, 2, 2], hot_spot: [28, 32, 3, 3] },
};
export const SG_RANGE = { scale: [1.02, 1.03], ideal: [1.024, 1.0265], margin: [0.002, 0.002], digits: 3, unit: "SG" };

export const scaleRange = (r, f, unit) => ({ ...r, scale: r.scale.map(f), ideal: r.ideal.map(f), margin: r.margin.map((m) => f(m) - f(0)), unit });

// The range of a measure in the unit of its entity (°F, SG, meq/L, µS/cm…), with the ideal range of the options
// (`ranges`) when set.
export const rangeOf = (role, unit, kind, value, ranges = {}, scene = "") => {
  let r = BASE_RANGES[kind][role] || BASE_RANGES.freshwater[role];
  const p = PROFILES[scene]?.[role];
  if (p) r = { ...r, scale: [Math.min(r.scale[0], p[0] - 2 * p[2]), Math.max(r.scale[1], p[1] + 2 * p[3])], ideal: [p[0], p[1]], margin: [p[2], p[3]] };
  const u = String(unit || "").toLowerCase().replace(/\s/g, "");
  if (TEMP_ROLES.has(role) && /f/.test(u)) r = { ...scaleRange(r, c2f, "°F"), digits: 1 };
  else if (role === "salinity" && (u === "sg" || (!u && value !== null && value > 0.9 && value < 1.2))) r = SG_RANGE;
  else if (role === "kh" && /meq|mmol/.test(u)) r = { ...scaleRange(r, (x) => x / 2.8, unit), digits: 2 };
  else if (role === "conductivity" && /^(µ|u)s/.test(u) && r.unit === "mS/cm") r = { ...scaleRange(r, (x) => x * 1000, unit), digits: 0 };
  else if (role === "conductivity" && /^ms/.test(u) && r.unit === "µS/cm") r = { ...scaleRange(r, (x) => x / 1000, unit), digits: 2 };
  const min = parseFloat(ranges[`${role}_min`]);
  const max = parseFloat(ranges[`${role}_max`]);
  const ideal = [Number.isFinite(min) ? min : r.ideal[0], Number.isFinite(max) ? max : r.ideal[1]];
  if (ideal[0] > ideal[1]) ideal.reverse();
  return { ...r, ideal, unit: unit || r.unit || "" };
};

// Level of a value: ok in the ideal range, warn within the margin around it, crit beyond. side: "low" or "high".
export const levelOf = (range, v) => {
  if (v === null) return { cls: "idle", side: null };
  const [lo, hi] = range.ideal;
  const [mLo, mHi] = range.margin;
  if (v < lo) return { cls: v < lo - mLo ? "crit" : "warn", side: "low" };
  if (v > hi) return { cls: v > hi + mHi ? "crit" : "warn", side: "high" };
  return { cls: "ok", side: null };
};

export const RANK = { crit: 3, warn: 2, ok: 1, idle: 0 };
export const worst = (levels) => levels.reduce((w, l) => ((RANK[l] ?? 0) > (RANK[w] ?? 0) ? l : w), "idle");

// Gauge scale: the measure's scale, widened to show the margins around the ideal range and the value itself.
export const scaleOf = (range, v) => {
  const [lo, hi] = range.ideal;
  const [mLo, mHi] = range.margin;
  let min = Math.min(range.scale[0], lo - 2 * mLo);
  let max = Math.max(range.scale[1], hi + 2 * mHi);
  if (range.scale[0] >= 0) min = Math.max(0, min);
  if (v !== null && v < min) min = v;
  if (v !== null && v > max) max = v;
  return [min, max];
};

// The track of a gauge: critical, warning, ideal, warning, critical zones as hard color stops.
export const trackOf = (range, [min, max]) => {
  const p = (x) => `${clamp(((x - min) / (max - min || 1)) * 100, 0, 100).toFixed(2)}%`;
  const [lo, hi] = range.ideal;
  const [mLo, mHi] = range.margin;
  return `linear-gradient(90deg, var(--aq-crit-z) 0 ${p(lo - mLo)}, var(--aq-warn-z) ${p(lo - mLo)} ${p(lo)}, var(--aq-ok-z) ${p(lo)} ${p(hi)}, var(--aq-warn-z) ${p(hi)} ${p(hi + mHi)}, var(--aq-crit-z) ${p(hi + mHi)} 100%)`;
};

// The advice of a measure out of its range (a specific one when there is, else the generic one).
export const TIP_KEYS = new Set([
  "water_temperature_high",
  "water_temperature_low",
  "ph_high",
  "ph_low",
  "ammonia_high",
  "nitrite_high",
  "nitrate_high",
  "phosphate_high",
  "kh_low",
  "salinity_high",
  "salinity_low",
  "oxygen_low",
  "air_temperature_high",
  "air_temperature_low",
  "hot_spot_high",
  "hot_spot_low",
  "cold_spot_high",
  "cold_spot_low",
  "humidity_high",
  "humidity_low",
  "uv_index_low",
  "uv_index_high",
]);
