# Changelog

## 1.0.3 - 2026-11-20

### Fixes
- Illustrated header: the status pill sits on the title's row, right after the title, as on the other ha-* cards (it was in the top right corner with the detail button); when the whole title and the pill's whole label do not fit side by side, it takes its own line under the subtitle, or shows its dot alone (measured, in every language, also once Home Assistant's card has rendered).
- Detection: `led`, `prime` and `hydra` are recognized as light words only as whole words — a switch named "… enabled", "… scheduled" or "… primed" is no longer taken for the light.
- Auto mode no longer throws when Home Assistant gives no entity registry.

### Performance
- Cards set by `area`: the entities of the area are gathered once per registry change, not on every state change of Home Assistant (the whole entity registry was scanned each time).

## 1.0.2 - 2026-11-18

### Fixes
- Editor: the `auto` illustration theme label no longer mentions the sun.

## 1.0.1 - 2026-11-18

### Fixes
- Illustrated header: `auto` now follows the Home Assistant theme alone — a light theme keeps the day picture after sunset, a dark theme still shows the night one.

## 1.0.0 - 2026-11-17

### Features
- First release: **Vivarium Card** (`custom:vivarium-card`) and **Vivarium Mini Card** (`custom:vivarium-mini-card`) for a reef or freshwater aquarium, a terrarium or a turtle tank (`kind`).
- Animated tank as the illustrated header (90 px on its substrate strip): reef fish and corals or a planted freshwater tank, following the light (night when off, moonlight when dimmed, fluorescent corals in a reef), the filter and air pump (bubbles, drift), CO₂, the heater, the wave pump and the feeder (falling flakes); still fish and clouded water when the tank is in trouble.
- Terrariums: air, hot spot, cool side, humidity and UV index gauges with the ideal ranges of each animal; basking lamp, UVB lamp, heat mat and mister as tiles and buttons; 11 animated habitats (desert with a bearded dragon, rainforest with dart frogs, leopard gecko, panther chameleon, ball python, tarantula, stick insects and mantises, crested gecko, paludarium, hermit crabs, Hermann's tortoise) where the basking spot, the UVB tube, the mist and the heat mat follow the equipment.
- Turtle tanks (red-eared sliders, musk turtle) with their water and basking spot, and the axolotl's cold freshwater tank.
- Detailed animals that move: fish beat their tail and flutter their fins, lizards, tarantula, crabs and tortoises walk, the chameleon creeps and shoots its tongue, frogs hop, the python breathes.
- 18 themed aquarium scenes besides the reef and the planted tank (`scene`): iwagumi, Amazon blackwater, Lake Malawi, Lake Tanganyika, shrimp, betta, goldfish, brackish mangrove, garden pond, SPS reef, soft corals, nano reef, seahorses, jellyfish, predator lagoon, wreck and treasure, abyss and arctic ice, chosen in the options or from the name of the tank.
- Entities discovered from an area, from devices or from the aquarium integrations (EHEIM Digital, Red Sea ReefBeat, Neptune Apex, Chihiros, Seneye, Reef-Pi, Juwel HeliaLux, Mobius, ESPHome…), whatever their language; each one can be set in the options.
- Equipment tiles, water quality gauges with reef and freshwater ideal ranges (units converted), advice, feed / light / filter / CO₂ / air pump buttons with a confirmation before stopping the filter, collapsible sections, detail button on the mini card, visual editor and 22 languages.
