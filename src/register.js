// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
import { pickerDefine } from "./card-picker.js";
import { VERSION } from "./core.js";
import { VivariumCard, VivariumMiniCard } from "./cards.js";
import { VivariumCardEditor, VivariumMiniCardEditor } from "./visual-editors.js";

export const define = (name, cls) => {
  if (!customElements.get(name)) pickerDefine(name, cls);
};
define("vivarium-card", VivariumCard);
define("vivarium-mini-card", VivariumMiniCard);
define("vivarium-card-editor", VivariumCardEditor);
define("vivarium-mini-card-editor", VivariumMiniCardEditor);

window.customCards = window.customCards || [];
for (const card of [
  {
    type: "vivarium-card",
    name: "Vivarium Card",
    description: "Aquarium (reef or freshwater), terrarium or turtle tank: its animated habitat as header, the equipment as tiles, water quality or climate gauges with ideal ranges and advice, and buttons to feed and switch the lamps, the filter and the mister.",
  },
  {
    type: "vivarium-mini-card",
    name: "Vivarium Mini Card",
    description: "Compact summary of an aquarium, terrarium or turtle tank under its animated habitat: temperature and key values, filter and feeding, quick feed and light buttons.",
  },
]) {
  if (!window.customCards.some((c) => c.type === card.type))
    window.customCards.push({ ...card, preview: true, documentationURL: "https://github.com/juju35/ha-vivarium-card" });
}

console.info(`%c AQUARIUM-CARD %c v${VERSION} `, "color: white; background: #0288d1; font-weight: 700;", "color: #0288d1; background: white; font-weight: 700;");
