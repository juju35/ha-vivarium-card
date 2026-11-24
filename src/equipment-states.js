// ---------------------------------------------------------------------------
// Equipment states
// ---------------------------------------------------------------------------
import { domainOf, norm, num, valid } from "./helpers.js";

export const OFF_STATES = /^(off|stop|stopped|arret|aus|apagado|spento|0|none|idle|closed)$/;
export const isOn = (s) => valid(s) && !OFF_STATES.test(norm(s.state));
export const heating = (s) => {
  if (!valid(s)) return false;
  const d = domainOf(s.entity_id);
  if (d === "climate") return s.attributes?.hvac_action ? s.attributes.hvac_action === "heating" : s.state === "heat";
  if (d === "water_heater") return s.state !== "off" && (s.attributes?.operation_mode !== "off");
  return s.state === "on";
};
export const targetOf = (s) => {
  const v = s?.attributes?.temperature;
  return Number.isFinite(v) ? v : null;
};
export const brightnessPct = (s) => {
  const b = s?.attributes?.brightness;
  return isOn(s) && Number.isFinite(b) ? Math.round((b / 255) * 100) : null;
};
// A light dimmed to a moonlight: its effect or name says so, or it is on below 15 %.
export const MOON_RE = /moon|lune|mond|luna|maan|night|nuit|nacht|noche|notte|actinic|aktinisch/;
export const isMoon = (s) => {
  if (!isOn(s)) return false;
  if (MOON_RE.test(norm(s.attributes?.effect || "")) || MOON_RE.test(norm(s.attributes?.preset_mode || ""))) return true;
  const b = brightnessPct(s);
  return (b !== null && b <= 15) || MOON_RE.test(norm(s.entity_id));
};
// When a feeder was last used: a button's state is the time it was last pressed; a timestamp sensor, its value; a
// switch, when it was last turned on.
export const fedAt = (s) => {
  if (!valid(s)) return null;
  const d = domainOf(s.entity_id);
  const raw = d === "button" || d === "sensor" ? s.state : d === "script" ? s.attributes?.last_triggered : s.state === "on" ? s.last_changed : s.last_changed;
  const at = Date.parse(raw);
  return Number.isFinite(at) ? at : null;
};
export const FEEDING_MS = 3 * 60000;
// A water level binary sensor: "on" is a problem for the problem / safety ones and those named low / alarm,
// else "on" is the water at its level (a float switch closed). `invert_level` turns it round.
export const levelLow = (s, invert) => {
  if (!valid(s)) return false;
  const dc = s.attributes?.device_class;
  const bad = ["problem", "safety", "moisture"].includes(dc) || /low|bas|niedrig|bajo|basso|alarm|empty|vide|leer/.test(norm(s.entity_id));
  const on = s.state === "on";
  return (bad ? on : !on) !== !!invert;
};
// Hours or days until a service (EHEIM "remaining hours until service"), in ms; a timestamp is a due date.
export const serviceMs = (s) => {
  if (!valid(s)) return null;
  if (s.attributes?.device_class === "timestamp") {
    const at = Date.parse(s.state);
    return Number.isFinite(at) ? at - Date.now() : null;
  }
  const v = num(s);
  if (v === null) return null;
  const unit = norm(s.attributes?.unit_of_measurement || "h");
  const f = unit.startsWith("d") ? 864e5 : unit === "min" ? 6e4 : unit === "s" ? 1e3 : 36e5;
  return v * f;
};
