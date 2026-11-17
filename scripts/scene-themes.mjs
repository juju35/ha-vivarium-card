// The themed scenes of the header, their English names (the titles of their README captures) and their kind.
export const SCENE_THEMES = [
  ["iwagumi", "Iwagumi", "freshwater"],
  ["blackwater", "Amazon blackwater", "freshwater"],
  ["malawi", "Lake Malawi", "freshwater"],
  ["tanganyika", "Lake Tanganyika", "freshwater"],
  ["shrimp", "Shrimp tank", "freshwater"],
  ["betta", "Betta tank", "freshwater"],
  ["goldfish", "Goldfish", "freshwater"],
  ["mangrove", "Brackish mangrove", "freshwater"],
  ["pond", "Garden pond", "freshwater"],
  ["sps", "SPS reef", "reef"],
  ["soft_coral", "Soft corals", "reef"],
  ["nano_reef", "Nano reef", "reef"],
  ["seahorse", "Seahorses", "reef"],
  ["jellyfish", "Jellyfish", "reef"],
  ["predator", "Predator lagoon", "reef"],
  ["wreck", "Wreck and treasure", "reef"],
  ["abyss", "Abyss", "reef"],
  ["arctic", "Arctic ice", "reef"],
];

// The terrarium and turtle scenes, with measures that suit their animal (overrides of the mock states).
const T = (id, v) => ({ [`sensor.terrarium_${id}`]: { state: String(v) } });
const terra = (hot, cool, air, rh, uvi) => ({ ...T("hot_spot_temperature", hot), ...T("cool_side_temperature", cool), ...T("air_temperature", air), ...T("humidity", rh), ...T("uv_index", uvi) });
export const VIV_THEMES = [
  ["desert", "Bearded dragon", "terrarium", terra(41, 26, 30, 34, 4.2)],
  ["rainforest", "Dart frogs", "terrarium", terra(26, 21, 24, 90, 1)],
  ["leopard_gecko", "Leopard gecko", "terrarium", terra(32, 24, 26, 35, 1)],
  ["chameleon", "Panther chameleon", "terrarium", terra(32, 22, 26, 65, 2.5)],
  ["ball_python", "Ball python", "terrarium", terra(32, 25.5, 28, 62, 1)],
  ["tarantula", "Tarantula", "terrarium", terra(26, 23, 24.5, 68, 0.2)],
  ["insects", "Insectarium", "terrarium", terra(25, 21, 23, 60, 0.5)],
  ["crested_gecko", "Crested gecko", "terrarium", terra(27, 21, 24, 70, 1)],
  ["paludarium", "Paludarium", "terrarium", terra(27, 22, 24.5, 80, 1)],
  ["hermit_crab", "Hermit crabs", "terrarium", terra(29, 25, 26.5, 75, 1)],
  ["tortoise", "Hermann's tortoise", "terrarium", terra(35, 21, 26, 60, 3.5)],
  ["axolotl", "Axolotls", "freshwater", { "climate.thermocontrol": { attributes: { current_temperature: 17.5, temperature: 17, hvac_action: "idle", hvac_modes: ["auto", "heat"], friendly_name: "thermocontrol+e" } } }],
  ["turtle", "Red-eared sliders", "turtle", {}],
  ["musk_turtle", "Musk turtle", "turtle", { "sensor.turtle_tank_basking_temperature": { state: "30" } }],
];
