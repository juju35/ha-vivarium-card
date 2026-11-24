// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
import { STRINGS } from "./i18n/strings.js";

export const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const lang = (hass, config) => {
  const l = config?.language || (hass && (hass.locale?.language || hass.language)) || "en";
  return STRINGS[l] ? l : STRINGS[l.split("-")[0]] ? l.split("-")[0] : "en";
};

// Locale for Intl: the card's language, keeping HA's region when its base matches (pt-BR, de-CH); a bare "pt"
// (European Portuguese) becomes "pt-PT", otherwise Intl formats it the Brazilian way.
export const intlLocale = (hass, config) => {
  const l = lang(hass, config);
  const src = config?.language || (hass && (hass.locale?.language || hass.language)) || "";
  const out = src && src.split("-")[0] === l.split("-")[0] ? src : l;
  return out === "pt" ? "pt-PT" : out;
};

export const t = (hass, config, key, vars = {}) =>
  String(STRINGS[lang(hass, config)][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

export const valid = (s) => !!s && !["unknown", "unavailable", ""].includes(s.state);
export const num = (s) => {
  if (!valid(s)) return null;
  const v = parseFloat(s.state);
  return Number.isFinite(v) ? v : null;
};
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const svgIcon = (path, cls = "") => `<svg class="icon${cls ? ` ${cls}` : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
export const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
export const domainOf = (id) => String(id || "").split(".")[0];
export const fmtNum = (v, digits, locale) =>
  v === null || v === undefined ? "—" : Number(v).toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const c2f = (c) => (c * 9) / 5 + 32;
export const UNIT_FMT = {};
export const fmtUnit = (v, unit, locale) => (UNIT_FMT[`${locale}|${unit}`] ??= new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short" })).format(v);
// A duration as "12 min", "3 hr" or "2 days" (Intl units in the card's language).
export const fmtDuration = (ms, locale) => {
  const min = Math.max(0, Math.round(ms / 60000));
  if (min < 60) return fmtUnit(min, "minute", locale);
  const h = Math.round(min / 60);
  if (h < 48) return fmtUnit(h, "hour", locale);
  return fmtUnit(Math.round(h / 24), "day", locale);
};
// A value with its unit, as the sensor gives it (a percentage without decimals).
export const fmtState = (s, locale, digits) => {
  const v = num(s);
  const unit = s?.attributes?.unit_of_measurement || "";
  if (v === null) return valid(s) ? String(s.state) : "—";
  const d = digits ?? (unit === "%" || Number.isInteger(v) ? 0 : 1);
  return `${fmtNum(v, d, locale)}${unit ? ` ${unit}` : ""}`;
};
