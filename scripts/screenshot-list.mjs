// The README screenshots (PNG) and animations (GIF) rendered by scripts/screenshots.mjs.
// Every capture has a twin in the other theme ("-dark" for a light capture, "-light" for a dark one)
// that shows exactly the same state: only the theme differs (checked by test/screenshots.test.mjs).
import { SCENE_THEMES, VIV_THEMES } from "./scene-themes.mjs";
import { feeding, freshConfig, freshNight, reefConfig, reefNight, reefProblems, terraConfig, turtleConfig } from "./mock-states.mjs";

const pair = (base, other = "dark") => [
  { ...base, theme: other === "dark" ? "light" : "dark" },
  { ...base, file: `${base.file}-${other}`, theme: other === "dark" ? "dark" : "light" },
];

export const shots = [
  ...pair({ file: "card", type: "vivarium-card", width: 460, config: reefConfig }),
  ...pair({ file: "mini-card", type: "vivarium-mini-card", width: 380, config: reefConfig }),
  ...pair({ file: "mini-card-zoom", type: "vivarium-mini-card", width: 460, config: reefConfig, clicks: [".zoom"] }),
  ...pair({ file: "card-freshwater", type: "vivarium-card", width: 460, config: freshConfig }, "light"),
  ...pair({ file: "mini-card-freshwater", type: "vivarium-mini-card", width: 380, config: freshConfig }, "light"),
  ...pair({ file: "card-night", type: "vivarium-card", width: 460, config: { ...reefConfig, collapsed: ["quality", "advice"] }, overrides: reefNight }, "light"),
  ...pair({ file: "card-problems", type: "vivarium-card", width: 460, config: { ...reefConfig, collapsed: ["quality"] }, overrides: reefProblems }),
  // A desert terrarium (climate gauges, basking and UVB lamps) and a turtle tank (water and basking spot).
  ...pair({ file: "card-terrarium", type: "vivarium-card", width: 460, config: { ...terraConfig, collapsed: ["advice"] } }),
  ...pair({ file: "mini-card-terrarium", type: "vivarium-mini-card", width: 380, config: terraConfig }),
  ...pair({ file: "card-turtle", type: "vivarium-card", width: 460, config: turtleConfig }, "light"),
  ...pair({ file: "mini-card-turtle", type: "vivarium-mini-card", width: 380, config: turtleConfig }, "light"),
  // Stopping the filter asks first (popup at the top of the card).
  ...pair({ file: "card-confirm", type: "vivarium-card", width: 460, config: freshConfig, clicks: ['[data-action="filter"]'] }),
  // Narrow cards: the full card at 6 of 12 columns of a phone's Sections view and the mini card at 170 px.
  ...pair({ file: "card-narrow", type: "vivarium-card", width: 238, config: freshConfig }),
  ...pair({ file: "mini-card-narrow", type: "vivarium-mini-card", width: 170, config: reefConfig }),
];

// One looping GIF per distinct animation of the tank (each plays different parts):
//   reef            — daylight: the fish swim, the clownfish nestle in their anemone, the wave pump sways the corals
//   reef-night      — moonlight: the corals fluoresce and pulse, the fish keep swimming under the moon
//   reef-feeding    — just fed: food flakes fall through the water
//   reef-problems   — too warm, return pump stopped: the fish stand still, the water clouds
//   freshwater      — planted tank: neon tetras, discus and angelfish, the heater glows, CO2 bubbles rise
//   freshwater-night — lights off: the planted tank at night, the filter still running
export const gifs = [
  ...pair({ file: "reef", type: "vivarium-card", width: 460, config: reefConfig, scene: true }),
  ...pair({ file: "reef-night", type: "vivarium-card", width: 460, config: reefConfig, overrides: reefNight, scene: true }, "light"),
  ...pair({ file: "reef-feeding", type: "vivarium-card", width: 460, config: reefConfig, overrides: feeding, scene: true }),
  ...pair({ file: "reef-problems", type: "vivarium-card", width: 460, config: reefConfig, overrides: reefProblems, scene: true }),
  ...pair({ file: "freshwater", type: "vivarium-card", width: 460, config: freshConfig, scene: true }, "light"),
  ...pair({ file: "freshwater-night", type: "vivarium-card", width: 460, config: freshConfig, overrides: freshNight, scene: true }, "light"),
];

// One looping GIF per themed scene (option `scene`), on the reef or the planted tank of the mock data: each theme
// draws its own decor and animals.
export const sceneGifs = SCENE_THEMES.flatMap(([scene, title, kind]) =>
  pair({ file: `scene-${scene.replaceAll("_", "-")}`, type: "vivarium-card", width: 460, config: { ...(kind === "reef" ? reefConfig : freshConfig), title, scene }, scene: true }),
);
gifs.push(...sceneGifs);

// One looping GIF per terrarium and turtle scene, with measures that suit its animal: the basking spot's light, the
// UVB tube, the mist, the animals.
const VIV_CONFIG = { terrarium: terraConfig, turtle: turtleConfig, freshwater: freshConfig };
gifs.push(
  ...VIV_THEMES.flatMap(([scene, title, kind, overrides]) =>
    pair({ file: `scene-${scene.replaceAll("_", "-")}`, type: "vivarium-card", width: 460, config: { ...VIV_CONFIG[kind], title, scene }, overrides, scene: true }),
  ),
);
