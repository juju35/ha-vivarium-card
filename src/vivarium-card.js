/*
 * Vivarium Card for Home Assistant
 * https://github.com/juju35/ha-vivarium-card
 *
 * Lovelace cards for a vivarium, whatever the integration: an aquarium (reef or freshwater), a terrarium (reptiles,
 * amphibians, invertebrates) or a turtle tank. Its animated habitat is the header (reef, planted tank or one of 32
 * themes, lit or at night as its lamps are), its measures are gauges with ideal ranges and advice (water: Seneye,
 * Neptune Apex, Reef-Pi, ESPHome probes…; air: hot and cool sides, humidity, UV index), and the equipment around
 * them are tiles: light, basking and UVB lamps, heater, heat mat, mister, filter and its speed, wave and return
 * pumps, skimmer, CO2, air pump, UV sterilizer, feeder, top-off and its reservoir, water level, leak, dosing, service
 * and power. Entities are discovered from an area, from devices or from the aquarium and terrarium integrations
 * through the entity registry (whatever the language of their ids) and can all be set one by one.
 */

const VERSION = "__VERSION__";

const ICONS = {
  turtle: "M8.47,5.95C8.95,5.67 9.47,5.44 10,5.28V4C10,2.9 10.87,2 11.97,1.97C13.13,2 14,2.9 14,4V5.28C14.53,5.45 15.05,5.67 15.53,5.95L13.93,8.07H10.07L8.47,5.95M19,12C19,12.5 18.95,12.95 18.86,13.4L16.33,12.62L15.14,8.96L16.74,6.85C17.17,7.25 17.55,7.7 17.88,8.2C18.67,8.13 19.43,8.25 20.11,8.59C21.14,9.12 21.84,10.13 22,11.28L19,11.64C19,11.76 19,11.88 19,12M5,12C5,11.88 5,11.76 5,11.65L2,11.28C2.16,10.13 2.86,9.12 3.89,8.59C4.57,8.25 5.34,8.13 6.08,8.26C6.41,7.75 6.79,7.28 7.24,6.87L8.86,8.95L7.67,12.62L5.14,13.4C5.05,12.95 5,12.5 5,12M10.24,9.57H13.76L14.85,12.93L12,15L9.15,12.93L10.24,9.57M8.13,14.05L11.25,16.31V18.96C10.68,18.9 10.13,18.77 9.62,18.58L8.39,21.34C7.33,20.87 6.57,19.9 6.37,18.76C6.23,18 6.35,17.24 6.69,16.56C6.24,16.04 5.87,15.46 5.59,14.82L8.13,14.05M15.87,14.05L18.41,14.82C18.13,15.46 17.76,16.04 17.31,16.56C17.65,17.24 17.77,18 17.64,18.76C17.43,19.9 16.67,20.87 15.61,21.34L14.39,18.58C13.86,18.77 13.33,18.94 12.75,19V16.31L15.87,14.05Z",
  tortoise: "M19.31,5.6C18.09,5.56 16.88,6.5 16.5,8C16,10 16,10 15,11C13,13 10,14 4,15C3,15.16 2.5,15.5 2,16C4,16 6,16 4.5,17.5L3,19H6L8,17C10,18 11.33,18 13.33,17L14,19H17L16,16C16,16 17,12 18,11C19,10 19,11 20,11C21,11 22,10 22,8.5C22,8 22,7 20.5,6C20.15,5.76 19.74,5.62 19.31,5.6M9,6A6,6 0 0,0 3,12C3,12.6 3.13,13.08 3.23,13.6C9.15,12.62 12.29,11.59 13.93,9.94L14.43,9.44C13.44,7.34 11.32,6 9,6Z",
  snake: "M19.5 17H18C19.1 17 20 16.1 20 15S19.1 13 18 13V9C18 8 18 7 16.92 6.14C16.97 5.93 17 5.72 17 5.5C17 3.57 15 2 12.5 2C10.24 2 8.38 3.31 8.07 5H6L3.71 2.79L3 3.5L5 5.5L3 7.5L3.71 8.21L6 6H8.07C8.38 7.69 10.24 9 12.5 9C13 9 13.5 8.92 13.93 8.8C13.97 8.87 14 8.94 14 9V13H8C6.9 13 6 13.9 6 15S6.9 17 8 17H6.5C5.12 17 4 18.12 4 19.5C4 19.67 4 19.84 4.05 20H4C2.9 20 2 20.9 2 22H19.5C20.88 22 22 20.88 22 19.5S20.88 17 19.5 17M12 5C11.45 5 11 4.55 11 4S11.45 3 12 3 13 3.45 13 4 12.55 5 12 5Z",
  spider: "M21.29 16.71L22.71 15.29L19.5 12.11L16.5 11.26L18.41 11L22.6 7.8L21.4 6.2L17.59 9.05L14.91 9.5L18.11 6.31L17 1.76L15 2.24L15.86 5.69L14.76 6.83A3 3 0 0 0 9.24 6.83L8.11 5.69L9 2.24L7 1.76L5.89 6.31L9.09 9.5L6.4 9.05L2.6 6.2L1.4 7.8L5.6 11L7.46 11.31L4.46 12.16L1.29 15.29L2.71 16.71L5.5 13.89L7.87 13.22L4 16.54V22H6V17.46L7.56 16.12A4.5 4.5 0 0 0 16.44 16.12L18 17.46V22H20V16.54L16.13 13.22L18.5 13.89Z",
  ladybug: "M12,5C12.74,5 13.47,5.1 14.15,5.29L15.78,2.46C16.06,2 16.67,1.82 17.15,2.1C17.63,2.37 17.79,3 17.5,3.46L16,6.07C17.22,6.78 18.23,7.79 18.93,9H5.07C5.77,7.79 6.78,6.78 8,6.07L6.5,3.46C6.21,3 6.37,2.37 6.85,2.1C7.33,1.82 7.94,2 8.22,2.46L9.85,5.29C10.53,5.1 11.26,5 12,5M20,13C20,17.17 16.82,20.59 12.75,20.97V10.5H19.6C19.86,11.29 20,12.13 20,13M4,13C4,12.13 4.14,11.29 4.4,10.5H11.25V20.97C7.18,20.59 4,17.17 4,13Z",
  cactus: "M14,16V21H10V18H9A3,3 0 0,1 6,15V12A1,1 0 0,1 7,11A1,1 0 0,1 8,12V15C8,15.56 8.45,16 9,16H10V6A2,2 0 0,1 12,4A2,2 0 0,1 14,6V14H15A1,1 0 0,0 16,13V11A1,1 0 0,1 17,10A1,1 0 0,1 18,11V13A3,3 0 0,1 15,16H14Z",
  leaf: "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",
  humidity: "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",
  hot_spot: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5H11A1 1 0 0 1 12 4Z",
  cold_spot: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V12H11V5A1 1 0 0 1 12 4Z",
  air_temp: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  uv_index: "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
  basking: "M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z",
  heat_mat: "M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4",
  mister: "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z",
  terrarium: "M23,4.1V2.3L21.2,2.1C21.1,2.1 20.5,2 19.5,2C15.4,2 12.4,3.2 10.7,5.3C9.4,4.5 7.6,4 5.5,4C4.5,4 3.8,4.1 3.8,4.1L1.9,4.4L2,6.1C2.1,9.1 3.6,14.8 8.8,14.8C8.9,14.8 8.9,14.8 9,14.8V18.2C5.2,18.7 2,20 2,20V22H22V20C22,20 18.8,18.7 15,18.2V15C21.3,14.9 23,7.8 23,4.1M12,18C11.7,18 11.3,18 11,18V12.4C11,12.4 10.8,9 8,9C8,9 9.5,9.8 9.9,12.7C9.5,12.8 9.1,12.8 8.8,12.8C4.2,12.8 4,6.1 4,6.1C4,6.1 4.6,6 5.5,6C7.4,6 10.5,6.4 11.4,9.1C11.9,4.6 17,4 19.5,4C20.4,4 21,4.1 21,4.1C21,4.1 21,13.1 14.7,13.1C14.5,13.1 14.2,13.1 14,13.1C14,11.1 16,8.1 16,8.1C13,9.1 13,13 13,13V18C12.7,18 12.3,18 12,18Z",
  shell: "M20.31 8.03L21.24 4.95C21.67 4.85 22 4.47 22 4C22 3.45 21.55 3 21 3S20 3.45 20 4C20 4.26 20.11 4.5 20.27 4.68L19.5 7.26L18.73 4.68C18.89 4.5 19 4.26 19 4C19 3.45 18.55 3 18 3S17 3.45 17 4C17 4.47 17.33 4.85 17.76 4.95L18.69 8.03C17.73 8.18 17 9 17 10V12.25C15.65 9.16 12.63 7 9.11 7C5.19 7 2 10.26 2 14.26C2 16.1 2.82 17.75 4.1 18.85L2.88 19C2.38 19.06 2 19.5 2 20C2 20.55 2.45 21 3 21L19.12 21C20.16 21 21 20.16 21 19.12V11.72C21.6 11.38 22 10.74 22 10C22 9 21.27 8.18 20.31 8.03M15.6 17.41L12.07 17.86C12.5 17.1 12.8 16.21 12.8 15.26C12.8 12.94 10.95 11.06 8.67 11.06C8.14 11.06 7.62 11.18 7.14 11.41C6.65 11.66 6.44 12.26 6.69 12.75C6.93 13.25 7.53 13.45 8.03 13.21C8.23 13.11 8.45 13.06 8.67 13.06C9.85 13.06 10.8 14.04 10.8 15.26C10.8 16.92 9.5 18.27 7.89 18.27C5.75 18.27 4 16.47 4 14.26C4 11.36 6.29 9 9.11 9C12.77 9 15.75 12.06 15.75 15.82C15.75 16.36 15.69 16.89 15.6 17.41Z",

  fish: "M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z",
  temperature: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  ph: "M13 7V17H15V13H17V17H19V7H17V11H15V7H13M11 15V13C11 11.9 10.11 11 9 11H5V21H7V17H9C10.11 17 11 16.11 11 15M9 15H7V13H9V15Z",
  light: "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z",
  light_on: "M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z",
  moon: "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",
  filter: "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z",
  wave: "M20,12H22V14H20C18.62,14 17.26,13.65 16,13C13.5,14.3 10.5,14.3 8,13C6.74,13.65 5.37,14 4,14H2V12H4C5.39,12 6.78,11.53 8,10.67C10.44,12.38 13.56,12.38 16,10.67C17.22,11.53 18.61,12 20,12M20,6H22V8H20C18.62,8 17.26,7.65 16,7C13.5,8.3 10.5,8.3 8,7C6.74,7.65 5.37,8 4,8H2V6H4C5.39,6 6.78,5.53 8,4.67C10.44,6.38 13.56,6.38 16,4.67C17.22,5.53 18.61,6 20,6M20,18H22V20H20C18.62,20 17.26,19.65 16,19C13.5,20.3 10.5,20.3 8,19C6.74,19.65 5.37,20 4,20H2V18H4C5.39,18 6.78,17.53 8,16.67C10.44,18.38 13.56,18.38 16,16.67C17.22,17.53 18.61,18 20,18Z",
  return_pump: "M19,14.5C19,14.5 21,16.67 21,18A2,2 0 0,1 19,20A2,2 0 0,1 17,18C17,16.67 19,14.5 19,14.5M5,18V9A2,2 0 0,1 3,7A2,2 0 0,1 5,5V4A2,2 0 0,1 7,2H9A2,2 0 0,1 11,4V5H19A2,2 0 0,1 21,7V9L21,11A1,1 0 0,1 22,12A1,1 0 0,1 21,13H17A1,1 0 0,1 16,12A1,1 0 0,1 17,11V9H11V18H12A2,2 0 0,1 14,20V22H2V20A2,2 0 0,1 4,18H5Z",
  skimmer: "M18.32,8H5.67L5.23,4H18.77M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z",
  co2: "M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z",
  air: "M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z",
  uv: "M7.05 2.81L6.5 3.34L5.11 1.92L3.87 3.16L5.28 4.58L4.58 5.28L3.16 3.87L1.92 5.11L3.34 6.5L2.81 7.05L16.95 21.19L17.5 20.66L18.89 22.08L20.13 20.84L18.72 19.43L19.42 18.72L20.84 20.13L22.08 18.9L20.66 17.5L21.19 16.95L7.05 2.81Z",
  feeder: "M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z",
  ato: "M12 18C12 18.7 12.12 19.36 12.34 20C12.23 20 12.12 20 12 20C8.69 20 6 17.31 6 14C6 10 12 3.25 12 3.25S16.31 8.1 17.62 12C14.5 12.22 12 14.82 12 18M19 17V14H17V17H14V19H17V22H19V19H22V17H19Z",
  reservoir: "M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z",
  level: "M20 14H22V16H20C18.62 16 17.26 15.65 16 15C13.5 16.3 10.5 16.3 8 15C6.74 15.65 5.37 16 4 16H2V14H4C5.39 14 6.78 13.53 8 12.67C10.44 14.38 13.56 14.38 16 12.67C17.22 13.53 18.61 14 20 14M20 20H22V22H20C18.62 22 17.26 21.65 16 21C13.5 22.3 10.5 22.3 8 21C6.74 21.65 5.37 22 4 22H2V20H4C5.39 20 6.78 19.53 8 18.67C10.44 20.38 13.56 20.38 16 18.67C17.22 19.53 18.61 20 20 20M7 2L3 6H6V11H8V6H11M17 2L13 6H16V11H18V6H21",
  leak: "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z",
  service: "M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z",
  power: "M7,2V13H10V22L17,10H13L17,2H7Z",
  dosing: "M19.35,11.72L17.22,13.85L15.81,12.43L8.1,20.14L3.5,22L2,20.5L3.86,15.9L11.57,8.19L10.15,6.78L12.28,4.65L19.35,11.72M16.76,3C17.93,1.83 19.83,1.83 21,3C22.17,4.17 22.17,6.07 21,7.24L19.08,9.16L14.84,4.92L16.76,3M5.56,17.03L4.5,19.5L6.97,18.44L14.4,11L13,9.6L5.56,17.03Z",
  heater: "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z",
  chevron: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  expand: "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
  collapse: "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
  alert: "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  info: "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  check: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
  water: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  flask: "M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L16.53,14.47L14,17L8.93,11.93L5.18,18.43C5.07,18.59 5,18.79 5,19M13,10A1,1 0 0,0 12,11A1,1 0 0,0 13,12A1,1 0 0,0 14,11A1,1 0 0,0 13,10Z",
  advice: "M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z",
  tools: "M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z",
  minus: "M19,13H5V11H19V13Z",
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  salt: "M7 16C7 16.55 6.55 17 6 17S5 16.55 5 16C5 15.45 5.45 15 6 15S7 15.45 7 16M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18 10 17.55 10 17 9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20 5 19.55 5 19 4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21 8 20.55 8 20 7.55 19 7 19M15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.46 1.75 16.09 1.82 15.33 2.72M8.39 12.5L10.5 14.6C10.9 15 11.54 15 11.93 14.6L12.63 13.9L9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5Z",
  orp: "M12 2L1 21H23L12 2M10 15V10H14L12.5 13.5H14.5L11.5 19V15H10Z",
  conductivity: "M9,7V17H15V15H11V13H15V11H11V9H15V7H9Z",
  tds: "M14,8.5A1.5,1.5 0 0,0 12.5,10A1.5,1.5 0 0,0 14,11.5A1.5,1.5 0 0,0 15.5,10A1.5,1.5 0 0,0 14,8.5M14,12.5A1.5,1.5 0 0,0 12.5,14A1.5,1.5 0 0,0 14,15.5A1.5,1.5 0 0,0 15.5,14A1.5,1.5 0 0,0 14,12.5M10,17A1,1 0 0,0 9,18A1,1 0 0,0 10,19A1,1 0 0,0 11,18A1,1 0 0,0 10,17M10,8.5A1.5,1.5 0 0,0 8.5,10A1.5,1.5 0 0,0 10,11.5A1.5,1.5 0 0,0 11.5,10A1.5,1.5 0 0,0 10,8.5M14,20.5A0.5,0.5 0 0,0 13.5,21A0.5,0.5 0 0,0 14,21.5A0.5,0.5 0 0,0 14.5,21A0.5,0.5 0 0,0 14,20.5M14,17A1,1 0 0,0 13,18A1,1 0 0,0 14,19A1,1 0 0,0 15,18A1,1 0 0,0 14,17M21,13.5A0.5,0.5 0 0,0 20.5,14A0.5,0.5 0 0,0 21,14.5A0.5,0.5 0 0,0 21.5,14A0.5,0.5 0 0,0 21,13.5M18,5A1,1 0 0,0 17,6A1,1 0 0,0 18,7A1,1 0 0,0 19,6A1,1 0 0,0 18,5M18,9A1,1 0 0,0 17,10A1,1 0 0,0 18,11A1,1 0 0,0 19,10A1,1 0 0,0 18,9M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17M18,13A1,1 0 0,0 17,14A1,1 0 0,0 18,15A1,1 0 0,0 19,14A1,1 0 0,0 18,13M10,12.5A1.5,1.5 0 0,0 8.5,14A1.5,1.5 0 0,0 10,15.5A1.5,1.5 0 0,0 11.5,14A1.5,1.5 0 0,0 10,12.5M10,7A1,1 0 0,0 11,6A1,1 0 0,0 10,5A1,1 0 0,0 9,6A1,1 0 0,0 10,7M10,3.5A0.5,0.5 0 0,0 10.5,3A0.5,0.5 0 0,0 10,2.5A0.5,0.5 0 0,0 9.5,3A0.5,0.5 0 0,0 10,3.5M10,20.5A0.5,0.5 0 0,0 9.5,21A0.5,0.5 0 0,0 10,21.5A0.5,0.5 0 0,0 10.5,21A0.5,0.5 0 0,0 10,20.5M3,13.5A0.5,0.5 0 0,0 2.5,14A0.5,0.5 0 0,0 3,14.5A0.5,0.5 0 0,0 3.5,14A0.5,0.5 0 0,0 3,13.5M14,3.5A0.5,0.5 0 0,0 14.5,3A0.5,0.5 0 0,0 14,2.5A0.5,0.5 0 0,0 13.5,3A0.5,0.5 0 0,0 14,3.5M14,7A1,1 0 0,0 15,6A1,1 0 0,0 14,5A1,1 0 0,0 13,6A1,1 0 0,0 14,7M21,10.5A0.5,0.5 0 0,0 21.5,10A0.5,0.5 0 0,0 21,9.5A0.5,0.5 0 0,0 20.5,10A0.5,0.5 0 0,0 21,10.5M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M3,9.5A0.5,0.5 0 0,0 2.5,10A0.5,0.5 0 0,0 3,10.5A0.5,0.5 0 0,0 3.5,10A0.5,0.5 0 0,0 3,9.5M6,9A1,1 0 0,0 5,10A1,1 0 0,0 6,11A1,1 0 0,0 7,10A1,1 0 0,0 6,9M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M6,13A1,1 0 0,0 5,14A1,1 0 0,0 6,15A1,1 0 0,0 7,14A1,1 0 0,0 6,13Z",
  oxygen: "M7.2,11.2C8.97,11.2 10.4,12.63 10.4,14.4C10.4,16.17 8.97,17.6 7.2,17.6C5.43,17.6 4,16.17 4,14.4C4,12.63 5.43,11.2 7.2,11.2M14.8,16A2,2 0 0,1 16.8,18A2,2 0 0,1 14.8,20A2,2 0 0,1 12.8,18A2,2 0 0,1 14.8,16M15.2,4A4.8,4.8 0 0,1 20,8.8C20,11.45 17.85,13.6 15.2,13.6A4.8,4.8 0 0,1 10.4,8.8C10.4,6.15 12.55,4 15.2,4Z",
  kh: "M9,7V17H11V13.67L13,17H15L12,12L15,7H13L11,10.33V7H9M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z",
  gh: "M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V11H13V15H11V9H15V7H11M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z",
  ca: "M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L13,8.35V4H11V8.35L5.18,18.43C5.07,18.59 5,18.79 5,19M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M13,16L14.34,14.66L16.27,18H7.73L10.39,13.39L13,16M12.5,12A0.5,0.5 0 0,1 13,12.5A0.5,0.5 0 0,1 12.5,13A0.5,0.5 0 0,1 12,12.5A0.5,0.5 0 0,1 12.5,12Z",
  ammonia: "M23,16.06C23,16.29 23,16.5 22.96,16.7C22.78,14.14 20.64,12.11 18,12.11C17.63,12.11 17.27,12.16 16.92,12.23C16.96,12.5 17,12.73 17,13C17,15.35 15.31,17.32 13.07,17.81C13.42,20.05 15.31,21.79 17.65,21.96C17.43,22 17.22,22 17,22C14.92,22 13.07,20.94 12,19.34C10.93,20.94 9.09,22 7,22C6.78,22 6.57,22 6.35,21.96C8.69,21.79 10.57,20.06 10.93,17.81C8.68,17.32 7,15.35 7,13C7,12.73 7.04,12.5 7.07,12.23C6.73,12.16 6.37,12.11 6,12.11C3.36,12.11 1.22,14.14 1.03,16.7C1,16.5 1,16.29 1,16.06C1,12.85 3.59,10.24 6.81,10.14C6.3,9.27 6,8.25 6,7.17C6,4.94 7.23,3 9.06,2C7.81,2.9 7,4.34 7,6C7,7.35 7.56,8.59 8.47,9.5C9.38,8.59 10.62,8.04 12,8.04C13.37,8.04 14.62,8.59 15.5,9.5C16.43,8.59 17,7.35 17,6C17,4.34 16.18,2.9 14.94,2C16.77,3 18,4.94 18,7.17C18,8.25 17.7,9.27 17.19,10.14C20.42,10.24 23,12.85 23,16.06M9.27,10.11C10.05,10.62 11,10.92 12,10.92C13,10.92 13.95,10.62 14.73,10.11C14,9.45 13.06,9.03 12,9.03C10.94,9.03 10,9.45 9.27,10.11M12,14.47C12.82,14.47 13.5,13.8 13.5,13A1.5,1.5 0 0,0 12,11.5A1.5,1.5 0 0,0 10.5,13C10.5,13.8 11.17,14.47 12,14.47M10.97,16.79C10.87,14.9 9.71,13.29 8.05,12.55C8.03,12.7 8,12.84 8,13C8,14.82 9.27,16.34 10.97,16.79M15.96,12.55C14.29,13.29 13.12,14.9 13,16.79C14.73,16.34 16,14.82 16,13C16,12.84 15.97,12.7 15.96,12.55Z",
  nitrite: "M19 15C19 18.87 15.87 22 12 22C8.13 22 5 18.87 5 15C5 12.21 6.64 9.8 9 8.67V5C9 4.45 9.45 4 10 4H10.5L9.5 2H14.5L13.5 4H14C14.55 4 15 4.45 15 5V8.67C17.36 9.8 19 12.21 19 15M11 6V10.1C8.72 10.56 7 12.58 7 15L7.08 15.91L9 13.93L13.07 18L16.93 14.14C16.58 12.12 15 10.5 13 10.1V6H11M13.07 12C13.62 12 14.07 12.45 14.07 13C14.07 13.55 13.62 14 13.07 14C12.5 14 12.07 13.55 12.07 13C12.07 12.45 12.5 12 13.07 12Z",
  nitrate: "M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6Z",
  phosphate: "M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L13,8.35V4H11V8.35L5.18,18.43C5.07,18.59 5,18.79 5,19M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6Z",
  fishbowl: "M19.11,5H21V3H3V5H4.89C3.11,6.8 2,9.27 2,12C2,15.97 4.31,19.39 7.66,21H16.34C19.69,19.39 22,15.97 22,12C22,9.27 20.89,6.8 19.11,5M13.25,17C12.09,17 11.06,16.64 10.33,16.17C9.67,17 8.33,17 7,17C8.1,17 8.5,15.88 8.5,14.5C8.5,13.12 8.1,12 7,12C8.33,12 9.67,12 10.37,12.91C11.06,12.36 12.09,12 13.25,12C15.32,12 17,13.12 17,14.5C17,15.88 15.32,17 13.25,17M16,7C13.56,8.71 10.44,8.71 8,7C7.06,7.66 6,8.09 4.95,8.25C5.31,7.58 5.77,6.96 6.32,6.41L7.7,5H16.3L17.68,6.41C18.23,6.96 18.69,7.58 19.05,8.25C18,8.09 16.94,7.66 16,7Z",
  coral: "M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z",
  speed: "M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z",
  pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
  play: "M8,5.14V19.14L19,12.14L8,5.14Z",
  mg: "M18 14H20V17H23V19H20V22H18V19H15V17H18V14M6 22C4.34 22 3 20.66 3 19C3 18.4 3.18 17.84 3.5 17.36L9 7.81V6C8.45 6 8 5.55 8 5V4C8 2.9 8.9 2 10 2H14C15.11 2 16 2.9 16 4V5C16 5.55 15.55 6 15 6V7.81L17.5 12.18C15.5 12.7 13.86 14.26 13.26 16.26L8.93 11.93L5.18 18.43C5.07 18.59 5 18.79 5 19C5 19.55 5.45 20 6 20H13.34C13.61 20.75 14 21.42 14.53 22H6M13 10C12.45 10 12 10.45 12 11C12 11.55 12.45 12 13 12C13.55 12 14 11.55 14 11C14 10.45 13.55 10 13 10Z",
  jellyfish: "M19.5,14.5C18.92,14.43 18.43,14.92 18.5,15.5C18.5,16.17 17.5,16.17 17.5,15.5V13.2L19.2,12.7C19.92,12.36 20.41,11.68 20.5,10.9C20.5,5.5 16.7,2 12,2C7.3,2 3.5,5.5 3.5,10.9C3.56,11.7 4.06,12.4 4.8,12.7L6.5,13.2V15.5A0.5,0.5 0 0,1 6,16A0.5,0.5 0 0,1 5.5,15.5C5.57,14.92 5.08,14.43 4.5,14.5C3.92,14.43 3.43,14.92 3.5,15.5C3.44,16.91 4.59,18.06 6,18C7.41,18.06 8.56,16.91 8.5,15.5V13.7H9.5V19.4C9.5,20.07 8.5,20.07 8.5,19.4C8.57,18.82 8.08,18.33 7.5,18.4C6.92,18.33 6.43,18.82 6.5,19.4C6.38,20.84 7.55,22.07 9,22C10.41,22.06 11.56,20.91 11.5,19.5V14H12.5V19.5C12.44,20.91 13.59,22.06 15,22C16.41,22.06 17.56,20.91 17.5,19.5C17.5,18.17 15.5,18.17 15.5,19.5C15.5,20.17 14.5,20.17 14.5,19.5V13.8H15.5V15.6C15.5,16.96 16.63,18.06 18,18C19.41,18.06 20.56,16.91 20.5,15.5C20.57,14.92 20.08,14.43 19.5,14.5M10.6,4.7C9.09,5.03 7.79,5.97 7,7.3C6.83,7.5 6.5,7.57 6.3,7.4C6.08,7.23 6.04,6.92 6.2,6.7C7.16,5.19 8.67,4.12 10.4,3.7C10.67,3.68 10.91,3.85 11,4.1C11.06,4.37 10.88,4.65 10.6,4.7Z",
  water_temp: "M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19S22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M8 20C4.69 20 2 17.31 2 14C2 10 8 3.25 8 3.25S14 10 14 14C14 17.31 11.31 20 8 20Z",
  filter_off: "M22.1 21.5L2.4 1.7L1.1 3L4.8 6.7C3.7 8.2 3 10 3 12C3 13 3.2 14.1 3.5 15H2V21H12C14 21 15.8 20.3 17.3 19.2L20.8 22.7L22.1 21.5M5.9 15.5C5.3 14.5 5 13.3 5 12C5 10.6 5.5 9.2 6.2 8.1L9.2 11.1C9.1 11.3 9 11.7 9 12C9 12.5 9.2 13.1 9.4 13.5L5.9 15.5M12 19H11.3L11.7 15H12C12.3 15 12.6 14.9 12.9 14.8L15.9 17.8C14.8 18.5 13.4 19 12 19M12 8.8L7.4 4.2C8.8 3.5 10.3 3 12 3H22V9H20.5C20.8 9.9 21 11 21 12C21 13.7 20.5 15.2 19.8 16.6L12.2 9C13.3 9.1 14.3 9.8 14.7 10.7L18.3 9C17.3 6.7 14.8 5 12 5V8.8Z",
};

const STRINGS = {
  en: {
    reef: "Reef tank",
    freshwater: "Freshwater tank",
    status_ok: "All good",
    status_warn: "Check the tank",
    status_crit: "Action needed",
    status_idle: "No data",
    water_quality: "Water quality",
    advice: "Advice",
    all_good: "Water and equipment OK",
    water_temperature: "Water temperature",
    ph: "pH",
    ammonia: "Ammonia",
    nitrite: "Nitrite",
    nitrate: "Nitrate",
    phosphate: "Phosphate",
    kh: "Carbonate hardness",
    gh: "General hardness",
    calcium: "Calcium",
    magnesium: "Magnesium",
    salinity: "Salinity",
    orp: "Redox (ORP)",
    conductivity: "Conductivity",
    tds: "TDS",
    oxygen: "Dissolved oxygen",
    light: "Light",
    heater: "Heater",
    filter: "Filter",
    filter_speed: "Filter speed",
    wave_pump: "Wave pump",
    return_pump: "Return pump",
    skimmer: "Skimmer",
    co2: "CO₂",
    air_pump: "Air pump",
    uv: "UV sterilizer",
    feeder: "Feeder",
    ato: "Top-off",
    reservoir: "Reservoir",
    water_level: "Water level",
    leak: "Leak",
    dosing: "Dosing",
    service: "Service",
    power: "Power",
    on: "On",
    off: "Off",
    unavailable: "Unavailable",
    heating: "Heating",
    idle: "Idle",
    running: "Running",
    stopped: "Stopped",
    daylight: "Daylight",
    moonlight: "Moonlight",
    lights_off: "Lights off",
    in_range: "In range",
    too_high: "Too high",
    too_low: "Too low",
    target: "Target {t}",
    feeding: "Feeding…",
    fed_ago: "Fed {time} ago",
    ready: "Ready",
    topping_off: "Topping off",
    standby: "Standby",
    level_ok: "Level OK",
    level_low: "Level low",
    leak_detected: "Leak!",
    dry: "Dry",
    service_due: "Due now",
    service_in: "In {time}",
    ideal: "Ideal {range}",
    max: "Max {v}",
    feed: "Feed",
    confirm_filter_off: "Stop the filter? Without its flow the water loses oxygen and the fish can suffer.",
    stop: "Stop",
    cancel: "Cancel",
    zoom_in: "Show details",
    zoom_out: "Show less",
    water_temperature_high: "Water too warm: check the heater, add surface agitation and cool the room if needed",
    water_temperature_low: "Water too cold: check the heater and its setting",
    ph_high: "pH too high: check the KH and the CO₂, and do a partial water change",
    ph_low: "pH too low: check the KH, aerate the water and do a partial water change",
    ammonia_high: "Ammonia detected, toxic for the fish: change a quarter of the water and feed less",
    nitrite_high: "Nitrite detected, the filter is not keeping up: change some water and leave the filter media as is",
    nitrate_high: "Nitrate high: do a partial water change and feed less",
    phosphate_high: "Phosphate high, risk of algae: feed less and use a phosphate remover",
    kh_low: "Carbonate hardness low, the pH may swing: raise the alkalinity",
    salinity_high: "Salinity too high: top off with fresh osmosis water",
    salinity_low: "Salinity too low: check the top-off and add salt water",
    oxygen_low: "Oxygen low: add aeration and surface movement",
    generic_high: "{name} above its ideal range",
    generic_low: "{name} below its ideal range",
    leak_tip: "Water leak detected under the tank!",
    filter_stopped: "The filter is stopped",
    return_stopped: "The return pump is stopped",
    level_tip: "Water level low: check the top-off and the sump",
    reservoir_low: "Top-off reservoir almost empty: refill it",
    service_tip: "Equipment service due",
    no_entities: "No aquarium entity found: pick an area or a device, or set the entities",
    unknown_device: "Unknown device",
    unknown_area: "Unknown area",
    area: "Area",
    device: "Device",
    area_helper: "Every device of the aquarium in this area",
    device_helper: "A device of the aquarium (several with `devices` in YAML)",
    title: "Title",
    kind: "Tank",
    kind_auto: "Automatic",
    kind_reef: "Reef (salt water)",
    kind_freshwater: "Freshwater",
    volume: "Volume",
    entities: "Entities",
    show_title: "Title",
    show_subtitle: "Subtitle",
    illustration: "Illustration",
    show_equipment: "Equipment",
    show_quality: "Water quality",
    show_advice: "Advice",
    show_controls: "Buttons",
    invert_level: "Invert the water level",
    invert_level_helper: "For a float switch that is on when the water is low",
    zoom: "Detail button",
    zoom_helper: "Switches the mini card to the full card and back",
    illustration_theme: "Illustration theme",
    theme_auto: "Automatic (follows the theme)",
    theme_day: "Day",
    theme_night: "Night",
    collapsed: "Folded sections",
    ranges: "Ideal ranges",
    min_l: "min",
    max_l: "max",
    language: "Language",
    lang_auto: "Automatic (Home Assistant)",
    scene: "Scene",
    scene_auto: "Automatic",
    scene_reef: "Reef",
    scene_planted: "Planted tank",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazon blackwater",
    scene_malawi: "Lake Malawi",
    scene_tanganyika: "Lake Tanganyika",
    scene_shrimp: "Shrimp tank",
    scene_betta: "Betta tank",
    scene_goldfish: "Goldfish",
    scene_mangrove: "Brackish mangrove",
    scene_pond: "Garden pond",
    scene_sps: "SPS reef",
    scene_soft_coral: "Soft corals",
    scene_nano_reef: "Nano reef",
    scene_seahorse: "Seahorses",
    scene_jellyfish: "Jellyfish",
    scene_predator: "Predator lagoon",
    scene_wreck: "Wreck and treasure",
    scene_abyss: "Abyss",
    scene_arctic: "Arctic ice",
    terrarium: "Terrarium",
    turtle_tank: "Turtle tank",
    kind_terrarium: "Terrarium",
    kind_turtle: "Turtle tank",
    climate: "Climate",
    air_temperature: "Air temperature",
    hot_spot: "Hot spot",
    cold_spot: "Cool side",
    humidity: "Humidity",
    uv_index: "UV index",
    basking: "Basking lamp",
    heat_mat: "Heat mat",
    mister: "Mister",
    uvb: "UVB lamp",
    air_temperature_high: "Air too warm: check the thermostat and air the enclosure.",
    air_temperature_low: "Air too cold: check the heating and its thermostat.",
    hot_spot_high: "Hot spot too hot: raise the basking lamp or lower its power.",
    hot_spot_low: "Hot spot too cool: check the basking lamp, it may be worn.",
    cold_spot_high: "Cool side too warm: move the heat source so the animal can cool down.",
    cold_spot_low: "Cool side too cold: check the room temperature and the heat mat.",
    humidity_high: "Too humid: air the enclosure and mist less to avoid mould.",
    humidity_low: "Too dry: mist more or add a humid hide for the shedding.",
    uv_index_low: "UV too weak: replace the UVB tube (every 6–12 months) or bring it closer.",
    uv_index_high: "UV too strong: raise the UVB lamp and keep a shaded area.",
    scene_desert: "Desert",
    scene_rainforest: "Rainforest",
    scene_leopard_gecko: "Leopard gecko",
    scene_chameleon: "Chameleon",
    scene_ball_python: "Ball python",
    scene_tarantula: "Tarantula",
    scene_insects: "Stick insects and mantises",
    scene_crested_gecko: "Crested gecko",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Hermit crabs",
    scene_axolotl: "Axolotl",
    scene_turtle: "Aquatic turtles",
    scene_tortoise: "Tortoise",
    scene_musk_turtle: "Musk turtle",
    all_good_terra: "Climate and equipment OK",
  },
  fr: {
    reef: "Aquarium récifal",
    freshwater: "Aquarium d'eau douce",
    status_ok: "Tout va bien",
    status_warn: "À vérifier",
    status_crit: "Action requise",
    status_idle: "Pas de données",
    water_quality: "Qualité de l'eau",
    advice: "Conseils",
    all_good: "Eau et équipements OK",
    water_temperature: "Température de l'eau",
    ph: "pH",
    ammonia: "Ammoniac",
    nitrite: "Nitrites",
    nitrate: "Nitrates",
    phosphate: "Phosphates",
    kh: "Dureté carbonatée",
    gh: "Dureté totale",
    calcium: "Calcium",
    magnesium: "Magnésium",
    salinity: "Salinité",
    orp: "Redox (ORP)",
    conductivity: "Conductivité",
    tds: "TDS",
    oxygen: "Oxygène dissous",
    light: "Éclairage",
    heater: "Chauffage",
    filter: "Filtre",
    filter_speed: "Vitesse du filtre",
    wave_pump: "Pompe de brassage",
    return_pump: "Pompe de remontée",
    skimmer: "Écumeur",
    co2: "CO₂",
    air_pump: "Pompe à air",
    uv: "Stérilisateur UV",
    feeder: "Distributeur",
    ato: "Osmolateur",
    reservoir: "Réserve",
    water_level: "Niveau d'eau",
    leak: "Fuite",
    dosing: "Dosage",
    service: "Entretien",
    power: "Puissance",
    on: "Allumé",
    off: "Éteint",
    unavailable: "Indisponible",
    heating: "Chauffe",
    idle: "En veille",
    running: "En marche",
    stopped: "Arrêté",
    daylight: "Jour",
    moonlight: "Clair de lune",
    lights_off: "Lumières éteintes",
    in_range: "Dans la plage",
    too_high: "Trop haut",
    too_low: "Trop bas",
    target: "Consigne {t}",
    feeding: "Nourrissage…",
    fed_ago: "Nourri il y a {time}",
    ready: "Prêt",
    topping_off: "Remplissage",
    standby: "En attente",
    level_ok: "Niveau OK",
    level_low: "Niveau bas",
    leak_detected: "Fuite !",
    dry: "Sec",
    service_due: "À faire",
    service_in: "Dans {time}",
    ideal: "Idéal {range}",
    max: "Max {v}",
    feed: "Nourrir",
    confirm_filter_off: "Arrêter le filtre ? Sans son débit, l'eau perd de l'oxygène et les poissons peuvent en souffrir.",
    stop: "Arrêter",
    cancel: "Annuler",
    zoom_in: "Afficher le détail",
    zoom_out: "Réduire",
    water_temperature_high: "Eau trop chaude : vérifiez le chauffage, brassez la surface et rafraîchissez la pièce si besoin",
    water_temperature_low: "Eau trop froide : vérifiez le chauffage et sa consigne",
    ph_high: "pH trop haut : vérifiez le KH et le CO₂, et faites un changement d'eau partiel",
    ph_low: "pH trop bas : vérifiez le KH, aérez l'eau et faites un changement d'eau partiel",
    ammonia_high: "Ammoniac détecté, toxique pour les poissons : changez un quart de l'eau et nourrissez moins",
    nitrite_high: "Nitrites détectés, le filtre ne suit pas : changez un peu d'eau sans nettoyer les masses filtrantes",
    nitrate_high: "Nitrates élevés : faites un changement d'eau partiel et nourrissez moins",
    phosphate_high: "Phosphates élevés, risque d'algues : nourrissez moins et utilisez un anti-phosphates",
    kh_low: "Dureté carbonatée basse, le pH risque de varier : remontez l'alcalinité",
    salinity_high: "Salinité trop haute : complétez avec de l'eau osmosée",
    salinity_low: "Salinité trop basse : vérifiez l'osmolateur et ajoutez de l'eau salée",
    oxygen_low: "Oxygène bas : ajoutez de l'aération et du mouvement en surface",
    generic_high: "{name} au-dessus de sa plage idéale",
    generic_low: "{name} sous sa plage idéale",
    leak_tip: "Fuite d'eau détectée sous l'aquarium !",
    filter_stopped: "Le filtre est arrêté",
    return_stopped: "La pompe de remontée est arrêtée",
    level_tip: "Niveau d'eau bas : vérifiez l'osmolateur et la décantation",
    reservoir_low: "Réserve de l'osmolateur presque vide : remplissez-la",
    service_tip: "Entretien d'un équipement à faire",
    no_entities: "Aucune entité d'aquarium trouvée : choisissez une pièce ou un appareil, ou renseignez les entités",
    unknown_device: "Appareil inconnu",
    unknown_area: "Pièce inconnue",
    area: "Pièce",
    device: "Appareil",
    area_helper: "Tous les appareils de l'aquarium de cette pièce",
    device_helper: "Un appareil de l'aquarium (plusieurs avec `devices` en YAML)",
    title: "Titre",
    kind: "Bac",
    kind_auto: "Automatique",
    kind_reef: "Récifal (eau de mer)",
    kind_freshwater: "Eau douce",
    volume: "Volume",
    entities: "Entités",
    show_title: "Titre",
    show_subtitle: "Sous-titre",
    illustration: "Illustration",
    show_equipment: "Équipements",
    show_quality: "Qualité de l'eau",
    show_advice: "Conseils",
    show_controls: "Boutons",
    invert_level: "Inverser le niveau d'eau",
    invert_level_helper: "Pour un flotteur allumé quand l'eau est basse",
    zoom: "Bouton détail",
    zoom_helper: "Bascule la mini-carte vers la carte complète et inversement",
    illustration_theme: "Thème de l'illustration",
    theme_auto: "Automatique (suit le thème)",
    theme_day: "Jour",
    theme_night: "Nuit",
    collapsed: "Sections repliées",
    ranges: "Plages idéales",
    min_l: "min",
    max_l: "max",
    language: "Langue",
    lang_auto: "Automatique (Home Assistant)",
    scene: "Scène",
    scene_auto: "Automatique",
    scene_reef: "Récif",
    scene_planted: "Bac planté",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonien blackwater",
    scene_malawi: "Lac Malawi",
    scene_tanganyika: "Lac Tanganyika",
    scene_shrimp: "Bac à crevettes",
    scene_betta: "Bac à combattant",
    scene_goldfish: "Poissons rouges",
    scene_mangrove: "Mangrove saumâtre",
    scene_pond: "Bassin de jardin",
    scene_sps: "Récif SPS",
    scene_soft_coral: "Coraux mous",
    scene_nano_reef: "Nano-récif",
    scene_seahorse: "Hippocampes",
    scene_jellyfish: "Méduses",
    scene_predator: "Lagon prédateurs",
    scene_wreck: "Épave et trésor",
    scene_abyss: "Abysses",
    scene_arctic: "Banquise",
    terrarium: "Terrarium",
    turtle_tank: "Aquaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Aquaterrarium (tortues)",
    climate: "Climat",
    air_temperature: "Température de l'air",
    hot_spot: "Point chaud",
    cold_spot: "Zone froide",
    humidity: "Humidité",
    uv_index: "Indice UV",
    basking: "Lampe chauffante",
    heat_mat: "Tapis chauffant",
    mister: "Brumisateur",
    uvb: "Lampe UVB",
    air_temperature_high: "Air trop chaud : vérifiez le thermostat et aérez le terrarium.",
    air_temperature_low: "Air trop froid : vérifiez le chauffage et son thermostat.",
    hot_spot_high: "Point chaud trop chaud : remontez la lampe chauffante ou baissez sa puissance.",
    hot_spot_low: "Point chaud trop froid : vérifiez la lampe chauffante, elle est peut-être usée.",
    cold_spot_high: "Zone froide trop chaude : déplacez la source de chaleur pour que l'animal puisse se rafraîchir.",
    cold_spot_low: "Zone froide trop froide : vérifiez la température de la pièce et le tapis chauffant.",
    humidity_high: "Trop humide : aérez et brumisez moins pour éviter les moisissures.",
    humidity_low: "Trop sec : brumisez davantage ou ajoutez une cachette humide pour la mue.",
    uv_index_low: "UV trop faibles : remplacez le tube UVB (tous les 6 à 12 mois) ou rapprochez-le.",
    uv_index_high: "UV trop forts : remontez la lampe UVB et gardez une zone d'ombre.",
    scene_desert: "Désert",
    scene_rainforest: "Forêt tropicale",
    scene_leopard_gecko: "Gecko léopard",
    scene_chameleon: "Caméléon",
    scene_ball_python: "Python royal",
    scene_tarantula: "Mygale",
    scene_insects: "Phasmes et mantes",
    scene_crested_gecko: "Gecko à crête",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Bernard-l'ermite",
    scene_axolotl: "Axolotl",
    scene_turtle: "Tortues aquatiques",
    scene_tortoise: "Tortue terrestre",
    scene_musk_turtle: "Tortue musquée",
    all_good_terra: "Climat et équipements OK",
  },
  de: {
    reef: "Meerwasseraquarium",
    freshwater: "Süßwasseraquarium",
    status_ok: "Alles gut",
    status_warn: "Becken prüfen",
    status_crit: "Handeln nötig",
    status_idle: "Keine Daten",
    water_quality: "Wasserqualität",
    advice: "Tipps",
    all_good: "Wasser und Technik OK",
    water_temperature: "Wassertemperatur",
    ph: "pH",
    ammonia: "Ammoniak",
    nitrite: "Nitrit",
    nitrate: "Nitrat",
    phosphate: "Phosphat",
    kh: "Karbonathärte",
    gh: "Gesamthärte",
    calcium: "Calcium",
    magnesium: "Magnesium",
    salinity: "Salzgehalt",
    orp: "Redox (ORP)",
    conductivity: "Leitwert",
    tds: "TDS",
    oxygen: "Gelöster Sauerstoff",
    light: "Beleuchtung",
    heater: "Heizer",
    filter: "Filter",
    filter_speed: "Filterleistung",
    wave_pump: "Strömungspumpe",
    return_pump: "Rückförderpumpe",
    skimmer: "Abschäumer",
    co2: "CO₂",
    air_pump: "Luftpumpe",
    uv: "UV-Klärer",
    feeder: "Futterautomat",
    ato: "Nachfüllanlage",
    reservoir: "Vorrat",
    water_level: "Wasserstand",
    leak: "Leck",
    dosing: "Dosierung",
    service: "Wartung",
    power: "Leistung",
    on: "An",
    off: "Aus",
    unavailable: "Nicht verfügbar",
    heating: "Heizt",
    idle: "Bereit",
    running: "Läuft",
    stopped: "Gestoppt",
    daylight: "Tageslicht",
    moonlight: "Mondlicht",
    lights_off: "Licht aus",
    in_range: "Im Bereich",
    too_high: "Zu hoch",
    too_low: "Zu niedrig",
    target: "Soll {t}",
    feeding: "Fütterung…",
    fed_ago: "Gefüttert vor {time}",
    ready: "Bereit",
    topping_off: "Füllt nach",
    standby: "Standby",
    level_ok: "Stand OK",
    level_low: "Stand niedrig",
    leak_detected: "Leck!",
    dry: "Trocken",
    service_due: "Jetzt fällig",
    service_in: "In {time}",
    ideal: "Ideal {range}",
    max: "Max. {v}",
    feed: "Füttern",
    confirm_filter_off: "Filter stoppen? Ohne Strömung verliert das Wasser Sauerstoff und die Fische können leiden.",
    stop: "Stoppen",
    cancel: "Abbrechen",
    zoom_in: "Details anzeigen",
    zoom_out: "Weniger anzeigen",
    water_temperature_high: "Wasser zu warm: Heizer prüfen, Oberfläche bewegen und den Raum bei Bedarf kühlen",
    water_temperature_low: "Wasser zu kalt: Heizer und seine Einstellung prüfen",
    ph_high: "pH zu hoch: KH und CO₂ prüfen und einen Teilwasserwechsel machen",
    ph_low: "pH zu niedrig: KH prüfen, belüften und einen Teilwasserwechsel machen",
    ammonia_high: "Ammoniak gemessen, giftig für die Fische: ein Viertel des Wassers wechseln und weniger füttern",
    nitrite_high: "Nitrit gemessen, der Filter kommt nicht nach: etwas Wasser wechseln, Filtermaterial nicht reinigen",
    nitrate_high: "Nitrat hoch: Teilwasserwechsel machen und weniger füttern",
    phosphate_high: "Phosphat hoch, Algengefahr: weniger füttern und einen Phosphatentferner nutzen",
    kh_low: "Karbonathärte niedrig, der pH kann schwanken: Alkalinität anheben",
    salinity_high: "Salzgehalt zu hoch: mit frischem Osmosewasser auffüllen",
    salinity_low: "Salzgehalt zu niedrig: Nachfüllanlage prüfen und Salzwasser zugeben",
    oxygen_low: "Sauerstoff niedrig: belüften und die Oberfläche bewegen",
    generic_high: "{name} über dem Idealbereich",
    generic_low: "{name} unter dem Idealbereich",
    leak_tip: "Wasserleck unter dem Becken erkannt!",
    filter_stopped: "Der Filter ist gestoppt",
    return_stopped: "Die Rückförderpumpe ist gestoppt",
    level_tip: "Wasserstand niedrig: Nachfüllanlage und Technikbecken prüfen",
    reservoir_low: "Vorrat der Nachfüllanlage fast leer: auffüllen",
    service_tip: "Wartung eines Geräts fällig",
    no_entities: "Keine Aquarium-Entität gefunden: Bereich oder Gerät wählen oder die Entitäten angeben",
    unknown_device: "Unbekanntes Gerät",
    unknown_area: "Unbekannter Bereich",
    area: "Bereich",
    device: "Gerät",
    area_helper: "Alle Geräte des Aquariums in diesem Bereich",
    device_helper: "Ein Gerät des Aquariums (mehrere mit `devices` in YAML)",
    title: "Titel",
    kind: "Becken",
    kind_auto: "Automatisch",
    kind_reef: "Riff (Meerwasser)",
    kind_freshwater: "Süßwasser",
    volume: "Volumen",
    entities: "Entitäten",
    show_title: "Titel",
    show_subtitle: "Untertitel",
    illustration: "Illustration",
    show_equipment: "Technik",
    show_quality: "Wasserqualität",
    show_advice: "Tipps",
    show_controls: "Schaltflächen",
    invert_level: "Wasserstand umkehren",
    invert_level_helper: "Für einen Schwimmerschalter, der bei niedrigem Wasser an ist",
    zoom: "Detail-Schaltfläche",
    zoom_helper: "Schaltet die Mini-Karte auf die volle Karte und zurück",
    illustration_theme: "Thema der Illustration",
    theme_auto: "Automatisch (folgt dem Thema)",
    theme_day: "Tag",
    theme_night: "Nacht",
    collapsed: "Eingeklappte Bereiche",
    ranges: "Idealbereiche",
    min_l: "min.",
    max_l: "max.",
    language: "Sprache",
    lang_auto: "Automatisch (Home Assistant)",
    scene: "Szene",
    scene_auto: "Automatisch",
    scene_reef: "Riff",
    scene_planted: "Pflanzenaquarium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonas-Schwarzwasser",
    scene_malawi: "Malawisee",
    scene_tanganyika: "Tanganjikasee",
    scene_shrimp: "Garnelenbecken",
    scene_betta: "Kampffischbecken",
    scene_goldfish: "Goldfische",
    scene_mangrove: "Brackwasser-Mangrove",
    scene_pond: "Gartenteich",
    scene_sps: "SPS-Riff",
    scene_soft_coral: "Weichkorallen",
    scene_nano_reef: "Nano-Riff",
    scene_seahorse: "Seepferdchen",
    scene_jellyfish: "Quallen",
    scene_predator: "Räuberlagune",
    scene_wreck: "Wrack und Schatz",
    scene_abyss: "Tiefsee",
    scene_arctic: "Packeis",
    terrarium: "Terrarium",
    turtle_tank: "Aquaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Aquaterrarium (Schildkröten)",
    climate: "Klima",
    air_temperature: "Lufttemperatur",
    hot_spot: "Sonnenplatz",
    cold_spot: "Kühle Seite",
    humidity: "Luftfeuchtigkeit",
    uv_index: "UV-Index",
    basking: "Wärmelampe",
    heat_mat: "Heizmatte",
    mister: "Beregnungsanlage",
    uvb: "UVB-Lampe",
    air_temperature_high: "Luft zu warm: Thermostat prüfen und das Terrarium lüften.",
    air_temperature_low: "Luft zu kalt: Heizung und Thermostat prüfen.",
    hot_spot_high: "Sonnenplatz zu heiß: Wärmelampe höher hängen oder schwächer stellen.",
    hot_spot_low: "Sonnenplatz zu kühl: Wärmelampe prüfen, sie ist vielleicht verbraucht.",
    cold_spot_high: "Kühle Seite zu warm: Wärmequelle versetzen, damit sich das Tier abkühlen kann.",
    cold_spot_low: "Kühle Seite zu kalt: Raumtemperatur und Heizmatte prüfen.",
    humidity_high: "Zu feucht: lüften und weniger sprühen, um Schimmel zu vermeiden.",
    humidity_low: "Zu trocken: mehr sprühen oder ein feuchtes Versteck für die Häutung anbieten.",
    uv_index_low: "UV zu schwach: UVB-Röhre ersetzen (alle 6–12 Monate) oder näher anbringen.",
    uv_index_high: "UV zu stark: UVB-Lampe höher hängen und einen Schattenbereich lassen.",
    scene_desert: "Wüste",
    scene_rainforest: "Regenwald",
    scene_leopard_gecko: "Leopardgecko",
    scene_chameleon: "Chamäleon",
    scene_ball_python: "Königspython",
    scene_tarantula: "Vogelspinne",
    scene_insects: "Stabschrecken und Gottesanbeterinnen",
    scene_crested_gecko: "Kronengecko",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Einsiedlerkrebse",
    scene_axolotl: "Axolotl",
    scene_turtle: "Wasserschildkröten",
    scene_tortoise: "Landschildkröte",
    scene_musk_turtle: "Moschusschildkröte",
    all_good_terra: "Klima und Technik OK",
  },
  es: {
    reef: "Acuario de arrecife",
    freshwater: "Acuario de agua dulce",
    status_ok: "Todo bien",
    status_warn: "Revisar el acuario",
    status_crit: "Acción necesaria",
    status_idle: "Sin datos",
    water_quality: "Calidad del agua",
    advice: "Consejos",
    all_good: "Agua y equipos OK",
    water_temperature: "Temperatura del agua",
    ph: "pH",
    ammonia: "Amoníaco",
    nitrite: "Nitritos",
    nitrate: "Nitratos",
    phosphate: "Fosfatos",
    kh: "Dureza de carbonatos",
    gh: "Dureza general",
    calcium: "Calcio",
    magnesium: "Magnesio",
    salinity: "Salinidad",
    orp: "Redox (ORP)",
    conductivity: "Conductividad",
    tds: "TDS",
    oxygen: "Oxígeno disuelto",
    light: "Iluminación",
    heater: "Calentador",
    filter: "Filtro",
    filter_speed: "Velocidad del filtro",
    wave_pump: "Bomba de olas",
    return_pump: "Bomba de retorno",
    skimmer: "Skimmer",
    co2: "CO₂",
    air_pump: "Bomba de aire",
    uv: "Esterilizador UV",
    feeder: "Comedero",
    ato: "Rellenado",
    reservoir: "Depósito",
    water_level: "Nivel de agua",
    leak: "Fuga",
    dosing: "Dosificación",
    service: "Mantenimiento",
    power: "Potencia",
    on: "Encendido",
    off: "Apagado",
    unavailable: "No disponible",
    heating: "Calentando",
    idle: "En reposo",
    running: "Funcionando",
    stopped: "Parado",
    daylight: "Luz de día",
    moonlight: "Luz de luna",
    lights_off: "Luces apagadas",
    in_range: "En rango",
    too_high: "Demasiado alto",
    too_low: "Demasiado bajo",
    target: "Objetivo {t}",
    feeding: "Alimentando…",
    fed_ago: "Alimentado hace {time}",
    ready: "Listo",
    topping_off: "Rellenando",
    standby: "En espera",
    level_ok: "Nivel OK",
    level_low: "Nivel bajo",
    leak_detected: "¡Fuga!",
    dry: "Seco",
    service_due: "Pendiente",
    service_in: "En {time}",
    ideal: "Ideal {range}",
    max: "Máx. {v}",
    feed: "Alimentar",
    confirm_filter_off: "¿Parar el filtro? Sin su caudal el agua pierde oxígeno y los peces pueden sufrir.",
    stop: "Parar",
    cancel: "Cancelar",
    zoom_in: "Ver detalles",
    zoom_out: "Ver menos",
    water_temperature_high: "Agua demasiado caliente: revisa el calentador, agita la superficie y refresca la habitación si hace falta",
    water_temperature_low: "Agua demasiado fría: revisa el calentador y su ajuste",
    ph_high: "pH demasiado alto: revisa el KH y el CO₂ y haz un cambio parcial de agua",
    ph_low: "pH demasiado bajo: revisa el KH, airea el agua y haz un cambio parcial de agua",
    ammonia_high: "Amoníaco detectado, tóxico para los peces: cambia una cuarta parte del agua y da menos comida",
    nitrite_high: "Nitritos detectados, el filtro no da abasto: cambia algo de agua sin limpiar los materiales filtrantes",
    nitrate_high: "Nitratos altos: haz un cambio parcial de agua y da menos comida",
    phosphate_high: "Fosfatos altos, riesgo de algas: da menos comida y usa un antifosfatos",
    kh_low: "Dureza de carbonatos baja, el pH puede variar: sube la alcalinidad",
    salinity_high: "Salinidad demasiado alta: rellena con agua de ósmosis",
    salinity_low: "Salinidad demasiado baja: revisa el rellenado y añade agua salada",
    oxygen_low: "Oxígeno bajo: añade aireación y movimiento en la superficie",
    generic_high: "{name} por encima de su rango ideal",
    generic_low: "{name} por debajo de su rango ideal",
    leak_tip: "¡Fuga de agua detectada bajo el acuario!",
    filter_stopped: "El filtro está parado",
    return_stopped: "La bomba de retorno está parada",
    level_tip: "Nivel de agua bajo: revisa el rellenado y el sump",
    reservoir_low: "Depósito de rellenado casi vacío: llénalo",
    service_tip: "Mantenimiento de un equipo pendiente",
    no_entities: "No se encontró ninguna entidad de acuario: elige un área o un dispositivo, o indica las entidades",
    unknown_device: "Dispositivo desconocido",
    unknown_area: "Área desconocida",
    area: "Área",
    device: "Dispositivo",
    area_helper: "Todos los dispositivos del acuario en esta área",
    device_helper: "Un dispositivo del acuario (varios con `devices` en YAML)",
    title: "Título",
    kind: "Acuario",
    kind_auto: "Automático",
    kind_reef: "Arrecife (agua salada)",
    kind_freshwater: "Agua dulce",
    volume: "Volumen",
    entities: "Entidades",
    show_title: "Título",
    show_subtitle: "Subtítulo",
    illustration: "Ilustración",
    show_equipment: "Equipos",
    show_quality: "Calidad del agua",
    show_advice: "Consejos",
    show_controls: "Botones",
    invert_level: "Invertir el nivel de agua",
    invert_level_helper: "Para un flotador que se enciende cuando el agua está baja",
    zoom: "Botón de detalle",
    zoom_helper: "Cambia la minitarjeta a la tarjeta completa y viceversa",
    illustration_theme: "Tema de la ilustración",
    theme_auto: "Automático (sigue el tema)",
    theme_day: "Día",
    theme_night: "Noche",
    collapsed: "Secciones plegadas",
    ranges: "Rangos ideales",
    min_l: "mín.",
    max_l: "máx.",
    language: "Idioma",
    lang_auto: "Automático (Home Assistant)",
    scene: "Escena",
    scene_auto: "Automático",
    scene_reef: "Arrecife",
    scene_planted: "Acuario plantado",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonas de aguas negras",
    scene_malawi: "Lago Malawi",
    scene_tanganyika: "Lago Tanganica",
    scene_shrimp: "Acuario de gambas",
    scene_betta: "Acuario de betta",
    scene_goldfish: "Peces dorados",
    scene_mangrove: "Manglar salobre",
    scene_pond: "Estanque de jardín",
    scene_sps: "Arrecife SPS",
    scene_soft_coral: "Corales blandos",
    scene_nano_reef: "Nano arrecife",
    scene_seahorse: "Caballitos de mar",
    scene_jellyfish: "Medusas",
    scene_predator: "Laguna de depredadores",
    scene_wreck: "Pecio y tesoro",
    scene_abyss: "Abismo",
    scene_arctic: "Banquisa",
    terrarium: "Terrario",
    turtle_tank: "Acuaterrario",
    kind_terrarium: "Terrario",
    kind_turtle: "Acuaterrario (tortugas)",
    climate: "Clima",
    air_temperature: "Temperatura del aire",
    hot_spot: "Punto caliente",
    cold_spot: "Zona fría",
    humidity: "Humedad",
    uv_index: "Índice UV",
    basking: "Lámpara de calor",
    heat_mat: "Manta térmica",
    mister: "Nebulizador",
    uvb: "Lámpara UVB",
    air_temperature_high: "Aire demasiado caliente: revise el termostato y ventile el terrario.",
    air_temperature_low: "Aire demasiado frío: revise la calefacción y su termostato.",
    hot_spot_high: "Punto caliente excesivo: suba la lámpara de calor o baje su potencia.",
    hot_spot_low: "Punto caliente insuficiente: revise la lámpara de calor, puede estar gastada.",
    cold_spot_high: "Zona fría demasiado caliente: mueva la fuente de calor para que el animal pueda refrescarse.",
    cold_spot_low: "Zona fría demasiado fría: revise la temperatura de la habitación y la manta térmica.",
    humidity_high: "Demasiada humedad: ventile y pulverice menos para evitar el moho.",
    humidity_low: "Demasiado seco: pulverice más o añada un refugio húmedo para la muda.",
    uv_index_low: "UV demasiado débil: cambie el tubo UVB (cada 6–12 meses) o acérquelo.",
    uv_index_high: "UV demasiado fuerte: suba la lámpara UVB y deje una zona de sombra.",
    scene_desert: "Desierto",
    scene_rainforest: "Selva tropical",
    scene_leopard_gecko: "Gecko leopardo",
    scene_chameleon: "Camaleón",
    scene_ball_python: "Pitón real",
    scene_tarantula: "Tarántula",
    scene_insects: "Insectos palo y mantis",
    scene_crested_gecko: "Gecko crestado",
    scene_paludarium: "Paludario",
    scene_hermit_crab: "Cangrejos ermitaños",
    scene_axolotl: "Ajolote",
    scene_turtle: "Tortugas acuáticas",
    scene_tortoise: "Tortuga terrestre",
    scene_musk_turtle: "Tortuga almizclera",
    all_good_terra: "Clima y equipos OK",
  },
  sr: {
    reef: "Морски акваријум",
    freshwater: "Слатководни акваријум",
    status_ok: "Све је у реду",
    status_warn: "Проверите акваријум",
    status_crit: "Потребна је акција",
    status_idle: "Нема података",
    water_quality: "Квалитет воде",
    advice: "Савети",
    all_good: "Вода и опрема су у реду",
    water_temperature: "Температура воде",
    ph: "pH",
    ammonia: "Амонијак",
    nitrite: "Нитрити",
    nitrate: "Нитрати",
    phosphate: "Фосфати",
    kh: "Карбонатна тврдоћа",
    gh: "Укупна тврдоћа",
    calcium: "Калцијум",
    magnesium: "Магнезијум",
    salinity: "Салинитет",
    orp: "Редокс (ORP)",
    conductivity: "Проводљивост",
    tds: "TDS",
    oxygen: "Растворени кисеоник",
    light: "Осветљење",
    heater: "Грејач",
    filter: "Филтер",
    filter_speed: "Брзина филтера",
    wave_pump: "Пумпа за струјање",
    return_pump: "Повратна пумпа",
    skimmer: "Скимер",
    co2: "CO₂",
    air_pump: "Ваздушна пумпа",
    uv: "UV стерилизатор",
    feeder: "Хранилица",
    ato: "Допуна воде",
    reservoir: "Резервоар",
    water_level: "Ниво воде",
    leak: "Цурење",
    dosing: "Дозирање",
    service: "Одржавање",
    power: "Снага",
    on: "Укључено",
    off: "Искључено",
    unavailable: "Недоступно",
    heating: "Греје",
    idle: "Мирује",
    running: "Ради",
    stopped: "Заустављен",
    daylight: "Дневно светло",
    moonlight: "Месечина",
    lights_off: "Светла угашена",
    in_range: "У опсегу",
    too_high: "Превисоко",
    too_low: "Прениско",
    target: "Циљ {t}",
    feeding: "Храњење…",
    fed_ago: "Нахрањено пре {time}",
    ready: "Спремно",
    topping_off: "Допуњава",
    standby: "Приправност",
    level_ok: "Ниво OK",
    level_low: "Низак ниво",
    leak_detected: "Цурење!",
    dry: "Суво",
    service_due: "Потребно сада",
    service_in: "За {time}",
    ideal: "Идеално {range}",
    max: "Макс. {v}",
    feed: "Нахрани",
    confirm_filter_off: "Зауставити филтер? Без протока вода губи кисеоник и рибе могу да пате.",
    stop: "Заустави",
    cancel: "Откажи",
    zoom_in: "Прикажи детаље",
    zoom_out: "Прикажи мање",
    water_temperature_high: "Вода је претопла: проверите грејач, покрените површину и по потреби расхладите просторију",
    water_temperature_low: "Вода је прехладна: проверите грејач и његово подешавање",
    ph_high: "pH је превисок: проверите KH и CO₂ и делимично замените воду",
    ph_low: "pH је пренизак: проверите KH, аеришите воду и делимично замените воду",
    ammonia_high: "Откривен амонијак, отрован за рибе: замените четвртину воде и храните мање",
    nitrite_high: "Откривени нитрити, филтер не стиже: замените мало воде и не чистите филтерске материјале",
    nitrate_high: "Високи нитрати: делимично замените воду и храните мање",
    phosphate_high: "Високи фосфати, ризик од алги: храните мање и користите уклањач фосфата",
    kh_low: "Ниска карбонатна тврдоћа, pH може да варира: повећајте алкалност",
    salinity_high: "Салинитет је превисок: допуните свежом осмозном водом",
    salinity_low: "Салинитет је пренизак: проверите допуну и додајте слану воду",
    oxygen_low: "Мало кисеоника: додајте аерацију и покрет површине",
    generic_high: "{name} изнад идеалног опсега",
    generic_low: "{name} испод идеалног опсега",
    leak_tip: "Откривено цурење воде испод акваријума!",
    filter_stopped: "Филтер је заустављен",
    return_stopped: "Повратна пумпа је заустављена",
    level_tip: "Низак ниво воде: проверите допуну и самп",
    reservoir_low: "Резервоар за допуну је скоро празан: напуните га",
    service_tip: "Потребно је одржавање опреме",
    no_entities: "Није пронађен ниједан ентитет акваријума: изаберите област или уређај, или наведите ентитете",
    unknown_device: "Непознат уређај",
    unknown_area: "Непозната област",
    area: "Област",
    device: "Уређај",
    area_helper: "Сви уређаји акваријума у овој области",
    device_helper: "Уређај акваријума (више њих са `devices` у YAML-у)",
    title: "Наслов",
    kind: "Акваријум",
    kind_auto: "Аутоматски",
    kind_reef: "Гребен (слана вода)",
    kind_freshwater: "Слатка вода",
    volume: "Запремина",
    entities: "Ентитети",
    show_title: "Наслов",
    show_subtitle: "Поднаслов",
    illustration: "Илустрација",
    show_equipment: "Опрема",
    show_quality: "Квалитет воде",
    show_advice: "Савети",
    show_controls: "Дугмад",
    invert_level: "Обрни ниво воде",
    invert_level_helper: "За пловак који је укључен када је вода ниска",
    zoom: "Дугме за детаље",
    zoom_helper: "Пребацује мини картицу на пуну картицу и назад",
    illustration_theme: "Тема илустрације",
    theme_auto: "Аутоматски (прати тему)",
    theme_day: "Дан",
    theme_night: "Ноћ",
    collapsed: "Скупљени одељци",
    ranges: "Идеални опсези",
    min_l: "мин.",
    max_l: "макс.",
    language: "Језик",
    lang_auto: "Аутоматски (Home Assistant)",
    scene: "Сцена",
    scene_auto: "Аутоматски",
    scene_reef: "Гребен",
    scene_planted: "Акваријум са биљкама",
    scene_iwagumi: "Ивагуми",
    scene_blackwater: "Амазонска црна вода",
    scene_malawi: "Језеро Малави",
    scene_tanganyika: "Језеро Тангањика",
    scene_shrimp: "Акваријум за шкампе",
    scene_betta: "Акваријум за бета рибе",
    scene_goldfish: "Златне рибице",
    scene_mangrove: "Бракична мангрова",
    scene_pond: "Баштенско језерце",
    scene_sps: "СПС гребен",
    scene_soft_coral: "Меки корали",
    scene_nano_reef: "Нано гребен",
    scene_seahorse: "Морски коњици",
    scene_jellyfish: "Медузе",
    scene_predator: "Лагуна грабљивица",
    scene_wreck: "Олупина и благо",
    scene_abyss: "Понор",
    scene_arctic: "Ледени покривач",
    terrarium: "Тераријум",
    turtle_tank: "Акватераријум",
    kind_terrarium: "Тераријум",
    kind_turtle: "Акватераријум (корњаче)",
    climate: "Клима",
    air_temperature: "Температура ваздуха",
    hot_spot: "Топла тачка",
    cold_spot: "Хладна страна",
    humidity: "Влажност",
    uv_index: "UV индекс",
    basking: "Грејна лампа",
    heat_mat: "Грејна подлога",
    mister: "Распршивач",
    uvb: "UVБ лампа",
    air_temperature_high: "Ваздух претопао: проверите термостат и проветрите тераријум.",
    air_temperature_low: "Ваздух прехладан: проверите грејање и термостат.",
    hot_spot_high: "Топла тачка претопла: подигните грејну лампу или смањите снагу.",
    hot_spot_low: "Топла тачка прехладна: проверите грејну лампу, можда је истрошена.",
    cold_spot_high: "Хладна страна претопла: померите извор топлоте да би се животиња расхладила.",
    cold_spot_low: "Хладна страна прехладна: проверите температуру просторије и грејну подлогу.",
    humidity_high: "Превише влажно: проветрите и мање прскајте да бисте избегли буђ.",
    humidity_low: "Превише суво: више прскајте или додајте влажно скровиште за пресвлачење.",
    uv_index_low: "UV преслаб: замените UVБ цев (сваких 6–12 месеци) или је приближите.",
    uv_index_high: "UV прејак: подигните UVБ лампу и оставите сеновит део.",
    scene_desert: "Пустиња",
    scene_rainforest: "Прашума",
    scene_leopard_gecko: "Леопард гекон",
    scene_chameleon: "Камелеон",
    scene_ball_python: "Краљевски питон",
    scene_tarantula: "Тарантула",
    scene_insects: "Штапићасти инсекти и богомољке",
    scene_crested_gecko: "Крестасти гекон",
    scene_paludarium: "Палударијум",
    scene_hermit_crab: "Ракови самци",
    scene_axolotl: "Аксолотл",
    scene_turtle: "Водене корњаче",
    scene_tortoise: "Копнена корњача",
    scene_musk_turtle: "Мошусна корњача",
    all_good_terra: "Клима и опрема OK",
  },
  "sr-Latn": {
    reef: "Morski akvarijum",
    freshwater: "Slatkovodni akvarijum",
    status_ok: "Sve je u redu",
    status_warn: "Proverite akvarijum",
    status_crit: "Potrebna je akcija",
    status_idle: "Nema podataka",
    water_quality: "Kvalitet vode",
    advice: "Saveti",
    all_good: "Voda i oprema su u redu",
    water_temperature: "Temperatura vode",
    ph: "pH",
    ammonia: "Amonijak",
    nitrite: "Nitriti",
    nitrate: "Nitrati",
    phosphate: "Fosfati",
    kh: "Karbonatna tvrdoća",
    gh: "Ukupna tvrdoća",
    calcium: "Kalcijum",
    magnesium: "Magnezijum",
    salinity: "Salinitet",
    orp: "Redoks (ORP)",
    conductivity: "Provodljivost",
    tds: "TDS",
    oxygen: "Rastvoreni kiseonik",
    light: "Osvetljenje",
    heater: "Grejač",
    filter: "Filter",
    filter_speed: "Brzina filtera",
    wave_pump: "Pumpa za strujanje",
    return_pump: "Povratna pumpa",
    skimmer: "Skimer",
    co2: "CO₂",
    air_pump: "Vazdušna pumpa",
    uv: "UV sterilizator",
    feeder: "Hranilica",
    ato: "Dopuna vode",
    reservoir: "Rezervoar",
    water_level: "Nivo vode",
    leak: "Curenje",
    dosing: "Doziranje",
    service: "Održavanje",
    power: "Snaga",
    on: "Uključeno",
    off: "Isključeno",
    unavailable: "Nedostupno",
    heating: "Greje",
    idle: "Miruje",
    running: "Radi",
    stopped: "Zaustavljen",
    daylight: "Dnevno svetlo",
    moonlight: "Mesečina",
    lights_off: "Svetla ugašena",
    in_range: "U opsegu",
    too_high: "Previsoko",
    too_low: "Prenisko",
    target: "Cilj {t}",
    feeding: "Hranjenje…",
    fed_ago: "Nahranjeno pre {time}",
    ready: "Spremno",
    topping_off: "Dopunjava",
    standby: "Pripravnost",
    level_ok: "Nivo OK",
    level_low: "Nizak nivo",
    leak_detected: "Curenje!",
    dry: "Suvo",
    service_due: "Potrebno sada",
    service_in: "Za {time}",
    ideal: "Idealno {range}",
    max: "Maks. {v}",
    feed: "Nahrani",
    confirm_filter_off: "Zaustaviti filter? Bez protoka voda gubi kiseonik i ribe mogu da pate.",
    stop: "Zaustavi",
    cancel: "Otkaži",
    zoom_in: "Prikaži detalje",
    zoom_out: "Prikaži manje",
    water_temperature_high: "Voda je pretopla: proverite grejač, pokrenite površinu i po potrebi rashladite prostoriju",
    water_temperature_low: "Voda je prehladna: proverite grejač i njegovo podešavanje",
    ph_high: "pH je previsok: proverite KH i CO₂ i delimično zamenite vodu",
    ph_low: "pH je prenizak: proverite KH, aerišite vodu i delimično zamenite vodu",
    ammonia_high: "Otkriven amonijak, otrovan za ribe: zamenite četvrtinu vode i hranite manje",
    nitrite_high: "Otkriveni nitriti, filter ne stiže: zamenite malo vode i ne čistite filterske materijale",
    nitrate_high: "Visoki nitrati: delimično zamenite vodu i hranite manje",
    phosphate_high: "Visoki fosfati, rizik od algi: hranite manje i koristite uklanjač fosfata",
    kh_low: "Niska karbonatna tvrdoća, pH može da varira: povećajte alkalnost",
    salinity_high: "Salinitet je previsok: dopunite svežom osmoznom vodom",
    salinity_low: "Salinitet je prenizak: proverite dopunu i dodajte slanu vodu",
    oxygen_low: "Malo kiseonika: dodajte aeraciju i pokret površine",
    generic_high: "{name} iznad idealnog opsega",
    generic_low: "{name} ispod idealnog opsega",
    leak_tip: "Otkriveno curenje vode ispod akvarijuma!",
    filter_stopped: "Filter je zaustavljen",
    return_stopped: "Povratna pumpa je zaustavljena",
    level_tip: "Nizak nivo vode: proverite dopunu i samp",
    reservoir_low: "Rezervoar za dopunu je skoro prazan: napunite ga",
    service_tip: "Potrebno je održavanje opreme",
    no_entities: "Nije pronađen nijedan entitet akvarijuma: izaberite oblast ili uređaj, ili navedite entitete",
    unknown_device: "Nepoznat uređaj",
    unknown_area: "Nepoznata oblast",
    area: "Oblast",
    device: "Uređaj",
    area_helper: "Svi uređaji akvarijuma u ovoj oblasti",
    device_helper: "Uređaj akvarijuma (više njih sa `devices` u YAML-u)",
    title: "Naslov",
    kind: "Akvarijum",
    kind_auto: "Automatski",
    kind_reef: "Greben (slana voda)",
    kind_freshwater: "Slatka voda",
    volume: "Zapremina",
    entities: "Entiteti",
    show_title: "Naslov",
    show_subtitle: "Podnaslov",
    illustration: "Ilustracija",
    show_equipment: "Oprema",
    show_quality: "Kvalitet vode",
    show_advice: "Saveti",
    show_controls: "Dugmad",
    invert_level: "Obrni nivo vode",
    invert_level_helper: "Za plovak koji je uključen kada je voda niska",
    zoom: "Dugme za detalje",
    zoom_helper: "Prebacuje mini karticu na punu karticu i nazad",
    illustration_theme: "Tema ilustracije",
    theme_auto: "Automatski (prati temu)",
    theme_day: "Dan",
    theme_night: "Noć",
    collapsed: "Skupljeni odeljci",
    ranges: "Idealni opsezi",
    min_l: "min.",
    max_l: "maks.",
    language: "Jezik",
    lang_auto: "Automatski (Home Assistant)",
    scene: "Scena",
    scene_auto: "Automatski",
    scene_reef: "Greben",
    scene_planted: "Akvarijum sa biljkama",
    scene_iwagumi: "Ivagumi",
    scene_blackwater: "Amazonska crna voda",
    scene_malawi: "Jezero Malavi",
    scene_tanganyika: "Jezero Tanganjika",
    scene_shrimp: "Akvarijum za škampe",
    scene_betta: "Akvarijum za beta ribe",
    scene_goldfish: "Zlatne ribice",
    scene_mangrove: "Brakična mangrova",
    scene_pond: "Baštensko jezerce",
    scene_sps: "SPS greben",
    scene_soft_coral: "Meki korali",
    scene_nano_reef: "Nano greben",
    scene_seahorse: "Morski konjici",
    scene_jellyfish: "Meduze",
    scene_predator: "Laguna grabljivica",
    scene_wreck: "Olupina i blago",
    scene_abyss: "Ponor",
    scene_arctic: "Ledeni pokrivač",
    terrarium: "Terarijum",
    turtle_tank: "Akvaterarijum",
    kind_terrarium: "Terarijum",
    kind_turtle: "Akvaterarijum (kornjače)",
    climate: "Klima",
    air_temperature: "Temperatura vazduha",
    hot_spot: "Topla tačka",
    cold_spot: "Hladna strana",
    humidity: "Vlažnost",
    uv_index: "UV indeks",
    basking: "Grejna lampa",
    heat_mat: "Grejna podloga",
    mister: "Raspršivač",
    uvb: "UVB lampa",
    air_temperature_high: "Vazduh pretopao: proverite termostat i provetrite terarijum.",
    air_temperature_low: "Vazduh prehladan: proverite grejanje i termostat.",
    hot_spot_high: "Topla tačka pretopla: podignite grejnu lampu ili smanjite snagu.",
    hot_spot_low: "Topla tačka prehladna: proverite grejnu lampu, možda je istrošena.",
    cold_spot_high: "Hladna strana pretopla: pomerite izvor toplote da bi se životinja rashladila.",
    cold_spot_low: "Hladna strana prehladna: proverite temperaturu prostorije i grejnu podlogu.",
    humidity_high: "Previše vlažno: provetrite i manje prskajte da biste izbegli buđ.",
    humidity_low: "Previše suvo: više prskajte ili dodajte vlažno skrovište za presvlačenje.",
    uv_index_low: "UV preslab: zamenite UVB cev (svakih 6–12 meseci) ili je približite.",
    uv_index_high: "UV prejak: podignite UVB lampu i ostavite senovit deo.",
    scene_desert: "Pustinja",
    scene_rainforest: "Prašuma",
    scene_leopard_gecko: "Leopard gekon",
    scene_chameleon: "Kameleon",
    scene_ball_python: "Kraljevski piton",
    scene_tarantula: "Tarantula",
    scene_insects: "Štapićasti insekti i bogomoljke",
    scene_crested_gecko: "Krestasti gekon",
    scene_paludarium: "Paludarijum",
    scene_hermit_crab: "Rakovi samci",
    scene_axolotl: "Aksolotl",
    scene_turtle: "Vodene kornjače",
    scene_tortoise: "Kopnena kornjača",
    scene_musk_turtle: "Mošusna kornjača",
    all_good_terra: "Klima i oprema OK",
  },
  it: {
    reef: "Acquario marino",
    freshwater: "Acquario d'acqua dolce",
    status_ok: "Tutto bene",
    status_warn: "Controlla la vasca",
    status_crit: "Intervento necessario",
    status_idle: "Nessun dato",
    water_quality: "Qualità dell'acqua",
    advice: "Consigli",
    all_good: "Acqua e attrezzatura OK",
    water_temperature: "Temperatura dell'acqua",
    ph: "pH",
    ammonia: "Ammoniaca",
    nitrite: "Nitriti",
    nitrate: "Nitrati",
    phosphate: "Fosfati",
    kh: "Durezza carbonatica",
    gh: "Durezza totale",
    calcium: "Calcio",
    magnesium: "Magnesio",
    salinity: "Salinità",
    orp: "Redox (ORP)",
    conductivity: "Conducibilità",
    tds: "TDS",
    oxygen: "Ossigeno disciolto",
    light: "Illuminazione",
    heater: "Riscaldatore",
    filter: "Filtro",
    filter_speed: "Velocità del filtro",
    wave_pump: "Pompa di movimento",
    return_pump: "Pompa di risalita",
    skimmer: "Schiumatoio",
    co2: "CO₂",
    air_pump: "Pompa d'aria",
    uv: "Sterilizzatore UV",
    feeder: "Mangiatoia",
    ato: "Rabbocco",
    reservoir: "Serbatoio",
    water_level: "Livello dell'acqua",
    leak: "Perdita",
    dosing: "Dosaggio",
    service: "Manutenzione",
    power: "Potenza",
    on: "Acceso",
    off: "Spento",
    unavailable: "Non disponibile",
    heating: "Riscalda",
    idle: "In attesa",
    running: "In funzione",
    stopped: "Fermo",
    daylight: "Luce diurna",
    moonlight: "Luce lunare",
    lights_off: "Luci spente",
    in_range: "Nei valori",
    too_high: "Troppo alto",
    too_low: "Troppo basso",
    target: "Obiettivo {t}",
    feeding: "Alimentazione…",
    fed_ago: "Nutriti {time} fa",
    ready: "Pronto",
    topping_off: "Rabbocco in corso",
    standby: "In standby",
    level_ok: "Livello OK",
    level_low: "Livello basso",
    leak_detected: "Perdita!",
    dry: "Asciutto",
    service_due: "Da fare",
    service_in: "Tra {time}",
    ideal: "Ideale {range}",
    max: "Max {v}",
    feed: "Nutri",
    confirm_filter_off: "Fermare il filtro? Senza il suo flusso l'acqua perde ossigeno e i pesci possono soffrire.",
    stop: "Ferma",
    cancel: "Annulla",
    zoom_in: "Mostra dettagli",
    zoom_out: "Mostra meno",
    water_temperature_high: "Acqua troppo calda: controlla il riscaldatore, muovi la superficie e rinfresca la stanza se serve",
    water_temperature_low: "Acqua troppo fredda: controlla il riscaldatore e la sua impostazione",
    ph_high: "pH troppo alto: controlla KH e CO₂ e fai un cambio d'acqua parziale",
    ph_low: "pH troppo basso: controlla il KH, aera l'acqua e fai un cambio d'acqua parziale",
    ammonia_high: "Ammoniaca rilevata, tossica per i pesci: cambia un quarto dell'acqua e nutri di meno",
    nitrite_high: "Nitriti rilevati, il filtro non regge: cambia un po' d'acqua senza pulire i materiali filtranti",
    nitrate_high: "Nitrati alti: fai un cambio d'acqua parziale e nutri di meno",
    phosphate_high: "Fosfati alti, rischio di alghe: nutri di meno e usa un antifosfati",
    kh_low: "Durezza carbonatica bassa, il pH può oscillare: alza l'alcalinità",
    salinity_high: "Salinità troppo alta: rabbocca con acqua d'osmosi",
    salinity_low: "Salinità troppo bassa: controlla il rabbocco e aggiungi acqua salata",
    oxygen_low: "Ossigeno basso: aggiungi aerazione e movimento in superficie",
    generic_high: "{name} sopra il suo intervallo ideale",
    generic_low: "{name} sotto il suo intervallo ideale",
    leak_tip: "Perdita d'acqua rilevata sotto la vasca!",
    filter_stopped: "Il filtro è fermo",
    return_stopped: "La pompa di risalita è ferma",
    level_tip: "Livello dell'acqua basso: controlla il rabbocco e la sump",
    reservoir_low: "Serbatoio del rabbocco quasi vuoto: riempilo",
    service_tip: "Manutenzione di un'attrezzatura da fare",
    no_entities: "Nessuna entità d'acquario trovata: scegli un'area o un dispositivo, o indica le entità",
    unknown_device: "Dispositivo sconosciuto",
    unknown_area: "Area sconosciuta",
    area: "Area",
    device: "Dispositivo",
    area_helper: "Tutti i dispositivi dell'acquario in quest'area",
    device_helper: "Un dispositivo dell'acquario (più di uno con `devices` in YAML)",
    title: "Titolo",
    kind: "Vasca",
    kind_auto: "Automatico",
    kind_reef: "Marino (acqua salata)",
    kind_freshwater: "Acqua dolce",
    volume: "Volume",
    entities: "Entità",
    show_title: "Titolo",
    show_subtitle: "Sottotitolo",
    illustration: "Illustrazione",
    show_equipment: "Attrezzatura",
    show_quality: "Qualità dell'acqua",
    show_advice: "Consigli",
    show_controls: "Pulsanti",
    invert_level: "Inverti il livello dell'acqua",
    invert_level_helper: "Per un galleggiante acceso quando l'acqua è bassa",
    zoom: "Pulsante dettagli",
    zoom_helper: "Passa dalla mini scheda alla scheda completa e viceversa",
    illustration_theme: "Tema dell'illustrazione",
    theme_auto: "Automatico (segue il tema)",
    theme_day: "Giorno",
    theme_night: "Notte",
    collapsed: "Sezioni chiuse",
    ranges: "Intervalli ideali",
    min_l: "min",
    max_l: "max",
    language: "Lingua",
    lang_auto: "Automatica (Home Assistant)",
    scene: "Scena",
    scene_auto: "Automatica",
    scene_reef: "Barriera",
    scene_planted: "Acquario piantumato",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazzonia acque nere",
    scene_malawi: "Lago Malawi",
    scene_tanganyika: "Lago Tanganica",
    scene_shrimp: "Vasca per gamberetti",
    scene_betta: "Vasca per betta",
    scene_goldfish: "Pesci rossi",
    scene_mangrove: "Mangrovia salmastra",
    scene_pond: "Laghetto da giardino",
    scene_sps: "Barriera SPS",
    scene_soft_coral: "Coralli molli",
    scene_nano_reef: "Nano reef",
    scene_seahorse: "Cavallucci marini",
    scene_jellyfish: "Meduse",
    scene_predator: "Laguna dei predatori",
    scene_wreck: "Relitto e tesoro",
    scene_abyss: "Abisso",
    scene_arctic: "Banchisa",
    terrarium: "Terrario",
    turtle_tank: "Acquaterrario",
    kind_terrarium: "Terrario",
    kind_turtle: "Acquaterrario (tartarughe)",
    climate: "Clima",
    air_temperature: "Temperatura dell'aria",
    hot_spot: "Punto caldo",
    cold_spot: "Lato freddo",
    humidity: "Umidità",
    uv_index: "Indice UV",
    basking: "Lampada riscaldante",
    heat_mat: "Tappetino riscaldante",
    mister: "Nebulizzatore",
    uvb: "Lampada UVB",
    air_temperature_high: "Aria troppo calda: controllate il termostato e arieggiate il terrario.",
    air_temperature_low: "Aria troppo fredda: controllate il riscaldamento e il termostato.",
    hot_spot_high: "Punto caldo troppo caldo: alzate la lampada riscaldante o riducetene la potenza.",
    hot_spot_low: "Punto caldo troppo freddo: controllate la lampada riscaldante, potrebbe essere esaurita.",
    cold_spot_high: "Lato freddo troppo caldo: spostate la fonte di calore perché l'animale possa rinfrescarsi.",
    cold_spot_low: "Lato freddo troppo freddo: controllate la temperatura della stanza e il tappetino.",
    humidity_high: "Troppo umido: arieggiate e nebulizzate meno per evitare la muffa.",
    humidity_low: "Troppo secco: nebulizzate di più o aggiungete un rifugio umido per la muta.",
    uv_index_low: "UV troppo debole: sostituite il tubo UVB (ogni 6–12 mesi) o avvicinatelo.",
    uv_index_high: "UV troppo forte: alzate la lampada UVB e lasciate una zona d'ombra.",
    scene_desert: "Deserto",
    scene_rainforest: "Foresta pluviale",
    scene_leopard_gecko: "Geco leopardino",
    scene_chameleon: "Camaleonte",
    scene_ball_python: "Pitone reale",
    scene_tarantula: "Tarantola",
    scene_insects: "Insetti stecco e mantidi",
    scene_crested_gecko: "Geco crestato",
    scene_paludarium: "Paludario",
    scene_hermit_crab: "Paguri",
    scene_axolotl: "Axolotl",
    scene_turtle: "Tartarughe acquatiche",
    scene_tortoise: "Tartaruga di terra",
    scene_musk_turtle: "Tartaruga muschiata",
    all_good_terra: "Clima e attrezzature OK",
  },
  nl: {
    reef: "Zeewateraquarium",
    freshwater: "Zoetwateraquarium",
    status_ok: "Alles goed",
    status_warn: "Bak controleren",
    status_crit: "Actie nodig",
    status_idle: "Geen gegevens",
    water_quality: "Waterkwaliteit",
    advice: "Advies",
    all_good: "Water en techniek OK",
    water_temperature: "Watertemperatuur",
    ph: "pH",
    ammonia: "Ammoniak",
    nitrite: "Nitriet",
    nitrate: "Nitraat",
    phosphate: "Fosfaat",
    kh: "Carbonaathardheid",
    gh: "Algemene hardheid",
    calcium: "Calcium",
    magnesium: "Magnesium",
    salinity: "Zoutgehalte",
    orp: "Redox (ORP)",
    conductivity: "Geleidbaarheid",
    tds: "TDS",
    oxygen: "Opgeloste zuurstof",
    light: "Verlichting",
    heater: "Verwarming",
    filter: "Filter",
    filter_speed: "Filtersnelheid",
    wave_pump: "Stromingspomp",
    return_pump: "Opvoerpomp",
    skimmer: "Eiwitafschuimer",
    co2: "CO₂",
    air_pump: "Luchtpomp",
    uv: "UV-filter",
    feeder: "Voerautomaat",
    ato: "Bijvulsysteem",
    reservoir: "Voorraad",
    water_level: "Waterpeil",
    leak: "Lek",
    dosing: "Dosering",
    service: "Onderhoud",
    power: "Vermogen",
    on: "Aan",
    off: "Uit",
    unavailable: "Niet beschikbaar",
    heating: "Verwarmt",
    idle: "Stand-by",
    running: "Draait",
    stopped: "Gestopt",
    daylight: "Daglicht",
    moonlight: "Maanlicht",
    lights_off: "Licht uit",
    in_range: "Binnen bereik",
    too_high: "Te hoog",
    too_low: "Te laag",
    target: "Doel {t}",
    feeding: "Voeren…",
    fed_ago: "{time} geleden gevoerd",
    ready: "Klaar",
    topping_off: "Vult bij",
    standby: "Stand-by",
    level_ok: "Peil OK",
    level_low: "Peil laag",
    leak_detected: "Lek!",
    dry: "Droog",
    service_due: "Nu nodig",
    service_in: "Over {time}",
    ideal: "Ideaal {range}",
    max: "Max. {v}",
    feed: "Voeren",
    confirm_filter_off: "Filter stoppen? Zonder stroming verliest het water zuurstof en kunnen de vissen lijden.",
    stop: "Stoppen",
    cancel: "Annuleren",
    zoom_in: "Details tonen",
    zoom_out: "Minder tonen",
    water_temperature_high: "Water te warm: controleer de verwarming, beweeg het oppervlak en koel de ruimte zo nodig",
    water_temperature_low: "Water te koud: controleer de verwarming en de instelling",
    ph_high: "pH te hoog: controleer KH en CO₂ en ververs een deel van het water",
    ph_low: "pH te laag: controleer de KH, belucht het water en ververs een deel van het water",
    ammonia_high: "Ammoniak gemeten, giftig voor de vissen: ververs een kwart van het water en voer minder",
    nitrite_high: "Nitriet gemeten, het filter kan het niet bijhouden: ververs wat water en laat het filtermateriaal met rust",
    nitrate_high: "Nitraat hoog: ververs een deel van het water en voer minder",
    phosphate_high: "Fosfaat hoog, kans op algen: voer minder en gebruik een fosfaatverwijderaar",
    kh_low: "Carbonaathardheid laag, de pH kan schommelen: verhoog de alkaliteit",
    salinity_high: "Zoutgehalte te hoog: vul bij met vers osmosewater",
    salinity_low: "Zoutgehalte te laag: controleer het bijvulsysteem en voeg zout water toe",
    oxygen_low: "Zuurstof laag: zorg voor beluchting en beweging aan het oppervlak",
    generic_high: "{name} boven het ideale bereik",
    generic_low: "{name} onder het ideale bereik",
    leak_tip: "Waterlek onder de bak gedetecteerd!",
    filter_stopped: "Het filter is gestopt",
    return_stopped: "De opvoerpomp is gestopt",
    level_tip: "Waterpeil laag: controleer het bijvulsysteem en de sump",
    reservoir_low: "Voorraad van het bijvulsysteem bijna leeg: vul hem bij",
    service_tip: "Onderhoud van een apparaat nodig",
    no_entities: "Geen aquariumentiteit gevonden: kies een ruimte of een apparaat, of stel de entiteiten in",
    unknown_device: "Onbekend apparaat",
    unknown_area: "Onbekende ruimte",
    area: "Ruimte",
    device: "Apparaat",
    area_helper: "Alle apparaten van het aquarium in deze ruimte",
    device_helper: "Een apparaat van het aquarium (meerdere met `devices` in YAML)",
    title: "Titel",
    kind: "Bak",
    kind_auto: "Automatisch",
    kind_reef: "Rif (zeewater)",
    kind_freshwater: "Zoetwater",
    volume: "Volume",
    entities: "Entiteiten",
    show_title: "Titel",
    show_subtitle: "Ondertitel",
    illustration: "Illustratie",
    show_equipment: "Techniek",
    show_quality: "Waterkwaliteit",
    show_advice: "Advies",
    show_controls: "Knoppen",
    invert_level: "Waterpeil omkeren",
    invert_level_helper: "Voor een vlotter die aan is bij laag water",
    zoom: "Detailknop",
    zoom_helper: "Schakelt de minikaart naar de volledige kaart en terug",
    illustration_theme: "Thema van de illustratie",
    theme_auto: "Automatisch (volgt het thema)",
    theme_day: "Dag",
    theme_night: "Nacht",
    collapsed: "Ingeklapte secties",
    ranges: "Ideale bereiken",
    min_l: "min.",
    max_l: "max.",
    language: "Taal",
    lang_auto: "Automatisch (Home Assistant)",
    scene: "Scène",
    scene_auto: "Automatisch",
    scene_reef: "Rif",
    scene_planted: "Plantenaquarium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazone-zwartwater",
    scene_malawi: "Malawimeer",
    scene_tanganyika: "Tanganyikameer",
    scene_shrimp: "Garnalenbak",
    scene_betta: "Kempvisbak",
    scene_goldfish: "Goudvissen",
    scene_mangrove: "Brakke mangrove",
    scene_pond: "Tuinvijver",
    scene_sps: "SPS-rif",
    scene_soft_coral: "Zachte koralen",
    scene_nano_reef: "Nanorif",
    scene_seahorse: "Zeepaardjes",
    scene_jellyfish: "Kwallen",
    scene_predator: "Roofvissenlagune",
    scene_wreck: "Wrak en schat",
    scene_abyss: "Diepzee",
    scene_arctic: "Pakijs",
    terrarium: "Terrarium",
    turtle_tank: "Aquaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Aquaterrarium (schildpadden)",
    climate: "Klimaat",
    air_temperature: "Luchttemperatuur",
    hot_spot: "Warme plek",
    cold_spot: "Koele kant",
    humidity: "Luchtvochtigheid",
    uv_index: "UV-index",
    basking: "Warmtelamp",
    heat_mat: "Warmtemat",
    mister: "Beregeningssysteem",
    uvb: "UVB-lamp",
    air_temperature_high: "Lucht te warm: controleer de thermostaat en lucht het terrarium.",
    air_temperature_low: "Lucht te koud: controleer de verwarming en de thermostaat.",
    hot_spot_high: "Warme plek te heet: hang de warmtelamp hoger of verlaag het vermogen.",
    hot_spot_low: "Warme plek te koel: controleer de warmtelamp, die kan versleten zijn.",
    cold_spot_high: "Koele kant te warm: verplaats de warmtebron zodat het dier kan afkoelen.",
    cold_spot_low: "Koele kant te koud: controleer de kamertemperatuur en de warmtemat.",
    humidity_high: "Te vochtig: lucht het terrarium en sproei minder om schimmel te voorkomen.",
    humidity_low: "Te droog: sproei meer of voeg een vochtige schuilplaats toe voor de vervelling.",
    uv_index_low: "UV te zwak: vervang de UVB-buis (elke 6–12 maanden) of hang hem dichterbij.",
    uv_index_high: "UV te sterk: hang de UVB-lamp hoger en houd een schaduwplek.",
    scene_desert: "Woestijn",
    scene_rainforest: "Regenwoud",
    scene_leopard_gecko: "Luipaardgekko",
    scene_chameleon: "Kameleon",
    scene_ball_python: "Koningspython",
    scene_tarantula: "Vogelspin",
    scene_insects: "Wandelende takken en bidsprinkhanen",
    scene_crested_gecko: "Wimpergekko",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Heremietkreeften",
    scene_axolotl: "Axolotl",
    scene_turtle: "Waterschildpadden",
    scene_tortoise: "Landschildpad",
    scene_musk_turtle: "Muskusschildpad",
    all_good_terra: "Klimaat en apparatuur OK",
  },
  pt: {
    reef: "Aquário de recife",
    freshwater: "Aquário de água doce",
    status_ok: "Tudo bem",
    status_warn: "Verificar o aquário",
    status_crit: "Ação necessária",
    status_idle: "Sem dados",
    water_quality: "Qualidade da água",
    advice: "Conselhos",
    all_good: "Água e equipamento OK",
    water_temperature: "Temperatura da água",
    ph: "pH",
    ammonia: "Amoníaco",
    nitrite: "Nitritos",
    nitrate: "Nitratos",
    phosphate: "Fosfatos",
    kh: "Dureza carbonatada",
    gh: "Dureza total",
    calcium: "Cálcio",
    magnesium: "Magnésio",
    salinity: "Salinidade",
    orp: "Redox (ORP)",
    conductivity: "Condutividade",
    tds: "TDS",
    oxygen: "Oxigénio dissolvido",
    light: "Iluminação",
    heater: "Aquecedor",
    filter: "Filtro",
    filter_speed: "Velocidade do filtro",
    wave_pump: "Bomba de circulação",
    return_pump: "Bomba de retorno",
    skimmer: "Escumador",
    co2: "CO₂",
    air_pump: "Bomba de ar",
    uv: "Esterilizador UV",
    feeder: "Alimentador",
    ato: "Reposição",
    reservoir: "Reservatório",
    water_level: "Nível da água",
    leak: "Fuga",
    dosing: "Doseamento",
    service: "Manutenção",
    power: "Potência",
    on: "Ligado",
    off: "Desligado",
    unavailable: "Indisponível",
    heating: "A aquecer",
    idle: "Em repouso",
    running: "A funcionar",
    stopped: "Parado",
    daylight: "Luz do dia",
    moonlight: "Luz lunar",
    lights_off: "Luzes apagadas",
    in_range: "No intervalo",
    too_high: "Demasiado alto",
    too_low: "Demasiado baixo",
    target: "Alvo {t}",
    feeding: "A alimentar…",
    fed_ago: "Alimentado há {time}",
    ready: "Pronto",
    topping_off: "A repor",
    standby: "Em espera",
    level_ok: "Nível OK",
    level_low: "Nível baixo",
    leak_detected: "Fuga!",
    dry: "Seco",
    service_due: "Em atraso",
    service_in: "Daqui a {time}",
    ideal: "Ideal {range}",
    max: "Máx. {v}",
    feed: "Alimentar",
    confirm_filter_off: "Parar o filtro? Sem o seu caudal a água perde oxigénio e os peixes podem sofrer.",
    stop: "Parar",
    cancel: "Cancelar",
    zoom_in: "Ver detalhes",
    zoom_out: "Ver menos",
    water_temperature_high: "Água demasiado quente: verifique o aquecedor, agite a superfície e refresque a divisão se necessário",
    water_temperature_low: "Água demasiado fria: verifique o aquecedor e a sua regulação",
    ph_high: "pH demasiado alto: verifique o KH e o CO₂ e faça uma mudança parcial de água",
    ph_low: "pH demasiado baixo: verifique o KH, areje a água e faça uma mudança parcial de água",
    ammonia_high: "Amoníaco detetado, tóxico para os peixes: mude um quarto da água e alimente menos",
    nitrite_high: "Nitritos detetados, o filtro não acompanha: mude alguma água sem limpar os materiais filtrantes",
    nitrate_high: "Nitratos altos: faça uma mudança parcial de água e alimente menos",
    phosphate_high: "Fosfatos altos, risco de algas: alimente menos e use um removedor de fosfatos",
    kh_low: "Dureza carbonatada baixa, o pH pode oscilar: aumente a alcalinidade",
    salinity_high: "Salinidade demasiado alta: reponha com água de osmose",
    salinity_low: "Salinidade demasiado baixa: verifique a reposição e adicione água salgada",
    oxygen_low: "Oxigénio baixo: adicione arejamento e movimento à superfície",
    generic_high: "{name} acima do intervalo ideal",
    generic_low: "{name} abaixo do intervalo ideal",
    leak_tip: "Fuga de água detetada debaixo do aquário!",
    filter_stopped: "O filtro está parado",
    return_stopped: "A bomba de retorno está parada",
    level_tip: "Nível da água baixo: verifique a reposição e a sump",
    reservoir_low: "Reservatório de reposição quase vazio: encha-o",
    service_tip: "Manutenção de um equipamento em atraso",
    no_entities: "Nenhuma entidade de aquário encontrada: escolha uma divisão ou um dispositivo, ou indique as entidades",
    unknown_device: "Dispositivo desconhecido",
    unknown_area: "Divisão desconhecida",
    area: "Divisão",
    device: "Dispositivo",
    area_helper: "Todos os dispositivos do aquário nesta divisão",
    device_helper: "Um dispositivo do aquário (vários com `devices` em YAML)",
    title: "Título",
    kind: "Aquário",
    kind_auto: "Automático",
    kind_reef: "Recife (água salgada)",
    kind_freshwater: "Água doce",
    volume: "Volume",
    entities: "Entidades",
    show_title: "Título",
    show_subtitle: "Subtítulo",
    illustration: "Ilustração",
    show_equipment: "Equipamento",
    show_quality: "Qualidade da água",
    show_advice: "Conselhos",
    show_controls: "Botões",
    invert_level: "Inverter o nível da água",
    invert_level_helper: "Para uma boia que liga quando a água está baixa",
    zoom: "Botão de detalhe",
    zoom_helper: "Alterna o mini cartão para o cartão completo e vice-versa",
    illustration_theme: "Tema da ilustração",
    theme_auto: "Automático (segue o tema)",
    theme_day: "Dia",
    theme_night: "Noite",
    collapsed: "Secções recolhidas",
    ranges: "Intervalos ideais",
    min_l: "mín.",
    max_l: "máx.",
    language: "Idioma",
    lang_auto: "Automático (Home Assistant)",
    scene: "Cena",
    scene_auto: "Automático",
    scene_reef: "Recife",
    scene_planted: "Aquário plantado",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazónia de águas negras",
    scene_malawi: "Lago Malawi",
    scene_tanganyika: "Lago Tanganica",
    scene_shrimp: "Aquário de camarões",
    scene_betta: "Aquário de betta",
    scene_goldfish: "Peixes-dourados",
    scene_mangrove: "Mangal salobro",
    scene_pond: "Lago de jardim",
    scene_sps: "Recife SPS",
    scene_soft_coral: "Corais moles",
    scene_nano_reef: "Nano recife",
    scene_seahorse: "Cavalos-marinhos",
    scene_jellyfish: "Medusas",
    scene_predator: "Lagoa de predadores",
    scene_wreck: "Naufrágio e tesouro",
    scene_abyss: "Abismo",
    scene_arctic: "Banquisa",
    terrarium: "Terrário",
    turtle_tank: "Aquaterrário",
    kind_terrarium: "Terrário",
    kind_turtle: "Aquaterrário (tartarugas)",
    climate: "Clima",
    air_temperature: "Temperatura do ar",
    hot_spot: "Ponto quente",
    cold_spot: "Lado frio",
    humidity: "Humidade",
    uv_index: "Índice UV",
    basking: "Lâmpada de aquecimento",
    heat_mat: "Tapete térmico",
    mister: "Nebulizador",
    uvb: "Lâmpada UVB",
    air_temperature_high: "Ar demasiado quente: verifique o termóstato e areje o terrário.",
    air_temperature_low: "Ar demasiado frio: verifique o aquecimento e o termóstato.",
    hot_spot_high: "Ponto quente demasiado quente: suba a lâmpada de aquecimento ou reduza a potência.",
    hot_spot_low: "Ponto quente demasiado frio: verifique a lâmpada de aquecimento, pode estar gasta.",
    cold_spot_high: "Lado frio demasiado quente: mude a fonte de calor para o animal se poder refrescar.",
    cold_spot_low: "Lado frio demasiado frio: verifique a temperatura da divisão e o tapete térmico.",
    humidity_high: "Demasiado húmido: areje e pulverize menos para evitar bolor.",
    humidity_low: "Demasiado seco: pulverize mais ou junte um esconderijo húmido para a muda.",
    uv_index_low: "UV demasiado fraco: substitua o tubo UVB (a cada 6–12 meses) ou aproxime-o.",
    uv_index_high: "UV demasiado forte: suba a lâmpada UVB e mantenha uma zona de sombra.",
    scene_desert: "Deserto",
    scene_rainforest: "Floresta tropical",
    scene_leopard_gecko: "Osga-leopardo",
    scene_chameleon: "Camaleão",
    scene_ball_python: "Pitão-real",
    scene_tarantula: "Tarântula",
    scene_insects: "Bichos-pau e louva-a-deus",
    scene_crested_gecko: "Osga-de-crista",
    scene_paludarium: "Paludário",
    scene_hermit_crab: "Caranguejos-eremitas",
    scene_axolotl: "Axolote",
    scene_turtle: "Tartarugas aquáticas",
    scene_tortoise: "Tartaruga terrestre",
    scene_musk_turtle: "Tartaruga-almiscarada",
    all_good_terra: "Clima e equipamentos OK",
  },
  pl: {
    reef: "Akwarium rafowe",
    freshwater: "Akwarium słodkowodne",
    status_ok: "Wszystko dobrze",
    status_warn: "Sprawdź akwarium",
    status_crit: "Wymagane działanie",
    status_idle: "Brak danych",
    water_quality: "Jakość wody",
    advice: "Porady",
    all_good: "Woda i sprzęt OK",
    water_temperature: "Temperatura wody",
    ph: "pH",
    ammonia: "Amoniak",
    nitrite: "Azotyny",
    nitrate: "Azotany",
    phosphate: "Fosforany",
    kh: "Twardość węglanowa",
    gh: "Twardość ogólna",
    calcium: "Wapń",
    magnesium: "Magnez",
    salinity: "Zasolenie",
    orp: "Redoks (ORP)",
    conductivity: "Przewodność",
    tds: "TDS",
    oxygen: "Tlen rozpuszczony",
    light: "Oświetlenie",
    heater: "Grzałka",
    filter: "Filtr",
    filter_speed: "Prędkość filtra",
    wave_pump: "Pompa cyrkulacyjna",
    return_pump: "Pompa obiegowa",
    skimmer: "Odpieniacz",
    co2: "CO₂",
    air_pump: "Napowietrzacz",
    uv: "Sterylizator UV",
    feeder: "Karmnik",
    ato: "Dolewka",
    reservoir: "Zbiornik",
    water_level: "Poziom wody",
    leak: "Wyciek",
    dosing: "Dozowanie",
    service: "Konserwacja",
    power: "Moc",
    on: "Włączone",
    off: "Wyłączone",
    unavailable: "Niedostępne",
    heating: "Grzeje",
    idle: "Bezczynne",
    running: "Pracuje",
    stopped: "Zatrzymany",
    daylight: "Światło dzienne",
    moonlight: "Światło księżyca",
    lights_off: "Światła zgaszone",
    in_range: "W normie",
    too_high: "Za wysoko",
    too_low: "Za nisko",
    target: "Cel {t}",
    feeding: "Karmienie…",
    fed_ago: "Nakarmione {time} temu",
    ready: "Gotowy",
    topping_off: "Dolewa",
    standby: "Czuwanie",
    level_ok: "Poziom OK",
    level_low: "Niski poziom",
    leak_detected: "Wyciek!",
    dry: "Sucho",
    service_due: "Do zrobienia",
    service_in: "Za {time}",
    ideal: "Idealnie {range}",
    max: "Maks. {v}",
    feed: "Nakarm",
    confirm_filter_off: "Zatrzymać filtr? Bez przepływu woda traci tlen i ryby mogą cierpieć.",
    stop: "Zatrzymaj",
    cancel: "Anuluj",
    zoom_in: "Pokaż szczegóły",
    zoom_out: "Pokaż mniej",
    water_temperature_high: "Woda za ciepła: sprawdź grzałkę, porusz powierzchnię i w razie potrzeby schłodź pokój",
    water_temperature_low: "Woda za zimna: sprawdź grzałkę i jej ustawienie",
    ph_high: "pH za wysokie: sprawdź KH i CO₂ i zrób częściową podmianę wody",
    ph_low: "pH za niskie: sprawdź KH, napowietrz wodę i zrób częściową podmianę wody",
    ammonia_high: "Wykryto amoniak, toksyczny dla ryb: podmień jedną czwartą wody i karm mniej",
    nitrite_high: "Wykryto azotyny, filtr nie nadąża: podmień trochę wody i nie czyść wkładów filtra",
    nitrate_high: "Wysokie azotany: zrób częściową podmianę wody i karm mniej",
    phosphate_high: "Wysokie fosforany, ryzyko glonów: karm mniej i użyj środka usuwającego fosforany",
    kh_low: "Niska twardość węglanowa, pH może się wahać: podnieś alkaliczność",
    salinity_high: "Zasolenie za wysokie: dolej świeżej wody z osmozy",
    salinity_low: "Zasolenie za niskie: sprawdź dolewkę i dodaj słonej wody",
    oxygen_low: "Mało tlenu: dodaj napowietrzanie i ruch na powierzchni",
    generic_high: "{name} powyżej idealnego zakresu",
    generic_low: "{name} poniżej idealnego zakresu",
    leak_tip: "Wykryto wyciek wody pod akwarium!",
    filter_stopped: "Filtr jest zatrzymany",
    return_stopped: "Pompa obiegowa jest zatrzymana",
    level_tip: "Niski poziom wody: sprawdź dolewkę i sump",
    reservoir_low: "Zbiornik dolewki prawie pusty: napełnij go",
    service_tip: "Wymagana konserwacja sprzętu",
    no_entities: "Nie znaleziono encji akwarium: wybierz obszar lub urządzenie albo podaj encje",
    unknown_device: "Nieznane urządzenie",
    unknown_area: "Nieznany obszar",
    area: "Obszar",
    device: "Urządzenie",
    area_helper: "Wszystkie urządzenia akwarium w tym obszarze",
    device_helper: "Urządzenie akwarium (kilka przez `devices` w YAML)",
    title: "Tytuł",
    kind: "Zbiornik",
    kind_auto: "Automatycznie",
    kind_reef: "Rafa (woda słona)",
    kind_freshwater: "Słodkowodne",
    volume: "Pojemność",
    entities: "Encje",
    show_title: "Tytuł",
    show_subtitle: "Podtytuł",
    illustration: "Ilustracja",
    show_equipment: "Sprzęt",
    show_quality: "Jakość wody",
    show_advice: "Porady",
    show_controls: "Przyciski",
    invert_level: "Odwróć poziom wody",
    invert_level_helper: "Dla pływaka włączonego przy niskim poziomie wody",
    zoom: "Przycisk szczegółów",
    zoom_helper: "Przełącza minikartę na pełną kartę i z powrotem",
    illustration_theme: "Motyw ilustracji",
    theme_auto: "Automatycznie (według motywu)",
    theme_day: "Dzień",
    theme_night: "Noc",
    collapsed: "Zwinięte sekcje",
    ranges: "Idealne zakresy",
    min_l: "min.",
    max_l: "maks.",
    language: "Język",
    lang_auto: "Automatycznie (Home Assistant)",
    scene: "Scena",
    scene_auto: "Automatycznie",
    scene_reef: "Rafa",
    scene_planted: "Akwarium roślinne",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazońska czarna woda",
    scene_malawi: "Jezioro Malawi",
    scene_tanganyika: "Jezioro Tanganika",
    scene_shrimp: "Akwarium krewetkowe",
    scene_betta: "Akwarium z bojownikiem",
    scene_goldfish: "Złote rybki",
    scene_mangrove: "Słonawe namorzyny",
    scene_pond: "Oczko wodne",
    scene_sps: "Rafa SPS",
    scene_soft_coral: "Korale miękkie",
    scene_nano_reef: "Nanorafa",
    scene_seahorse: "Koniki morskie",
    scene_jellyfish: "Meduzy",
    scene_predator: "Laguna drapieżników",
    scene_wreck: "Wrak i skarb",
    scene_abyss: "Głębiny",
    scene_arctic: "Kra lodowa",
    terrarium: "Terrarium",
    turtle_tank: "Akwaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Akwaterrarium (żółwie)",
    climate: "Klimat",
    air_temperature: "Temperatura powietrza",
    hot_spot: "Strefa wygrzewania",
    cold_spot: "Chłodna strona",
    humidity: "Wilgotność",
    uv_index: "Indeks UV",
    basking: "Lampa grzewcza",
    heat_mat: "Mata grzewcza",
    mister: "Zraszacz",
    uvb: "Lampa UVB",
    air_temperature_high: "Powietrze za ciepłe: sprawdź termostat i przewietrz terrarium.",
    air_temperature_low: "Powietrze za zimne: sprawdź ogrzewanie i termostat.",
    hot_spot_high: "Strefa wygrzewania za gorąca: podnieś lampę grzewczą lub zmniejsz jej moc.",
    hot_spot_low: "Strefa wygrzewania za chłodna: sprawdź lampę grzewczą, może być zużyta.",
    cold_spot_high: "Chłodna strona za ciepła: przesuń źródło ciepła, aby zwierzę mogło się schłodzić.",
    cold_spot_low: "Chłodna strona za zimna: sprawdź temperaturę pomieszczenia i matę grzewczą.",
    humidity_high: "Za wilgotno: przewietrz i zraszaj rzadziej, aby uniknąć pleśni.",
    humidity_low: "Za sucho: zraszaj częściej lub dodaj wilgotną kryjówkę na wylinkę.",
    uv_index_low: "UV za słabe: wymień świetlówkę UVB (co 6–12 miesięcy) lub przybliż ją.",
    uv_index_high: "UV za mocne: podnieś lampę UVB i zostaw zacienione miejsce.",
    scene_desert: "Pustynia",
    scene_rainforest: "Las deszczowy",
    scene_leopard_gecko: "Gekon lamparci",
    scene_chameleon: "Kameleon",
    scene_ball_python: "Pyton królewski",
    scene_tarantula: "Ptasznik",
    scene_insects: "Patyczaki i modliszki",
    scene_crested_gecko: "Gekon orzęsiony",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Pustelniki",
    scene_axolotl: "Aksolotl",
    scene_turtle: "Żółwie wodne",
    scene_tortoise: "Żółw lądowy",
    scene_musk_turtle: "Żółw piżmowy",
    all_good_terra: "Klimat i sprzęt OK",
  },
  ro: {
    reef: "Acvariu marin",
    freshwater: "Acvariu cu apă dulce",
    status_ok: "Totul e bine",
    status_warn: "Verifică acvariul",
    status_crit: "Acțiune necesară",
    status_idle: "Fără date",
    water_quality: "Calitatea apei",
    advice: "Sfaturi",
    all_good: "Apă și echipamente OK",
    water_temperature: "Temperatura apei",
    ph: "pH",
    ammonia: "Amoniac",
    nitrite: "Nitriți",
    nitrate: "Nitrați",
    phosphate: "Fosfați",
    kh: "Duritate carbonatică",
    gh: "Duritate totală",
    calcium: "Calciu",
    magnesium: "Magneziu",
    salinity: "Salinitate",
    orp: "Redox (ORP)",
    conductivity: "Conductivitate",
    tds: "TDS",
    oxygen: "Oxigen dizolvat",
    light: "Iluminare",
    heater: "Încălzitor",
    filter: "Filtru",
    filter_speed: "Viteza filtrului",
    wave_pump: "Pompă de curent",
    return_pump: "Pompă de retur",
    skimmer: "Skimmer",
    co2: "CO₂",
    air_pump: "Pompă de aer",
    uv: "Sterilizator UV",
    feeder: "Hrănitor",
    ato: "Completare automată",
    reservoir: "Rezervor",
    water_level: "Nivelul apei",
    leak: "Scurgere",
    dosing: "Dozare",
    service: "Întreținere",
    power: "Putere",
    on: "Pornit",
    off: "Oprit",
    unavailable: "Indisponibil",
    heating: "Încălzește",
    idle: "Inactiv",
    running: "Funcționează",
    stopped: "Oprit",
    daylight: "Lumină de zi",
    moonlight: "Lumină de lună",
    lights_off: "Lumini stinse",
    in_range: "În interval",
    too_high: "Prea mare",
    too_low: "Prea mic",
    target: "Țintă {t}",
    feeding: "Hrănire…",
    fed_ago: "Hrănit acum {time}",
    ready: "Pregătit",
    topping_off: "Completează",
    standby: "În așteptare",
    level_ok: "Nivel OK",
    level_low: "Nivel scăzut",
    leak_detected: "Scurgere!",
    dry: "Uscat",
    service_due: "De făcut",
    service_in: "Peste {time}",
    ideal: "Ideal {range}",
    max: "Max. {v}",
    feed: "Hrănește",
    confirm_filter_off: "Oprești filtrul? Fără debitul lui apa pierde oxigen și peștii pot suferi.",
    stop: "Oprește",
    cancel: "Anulează",
    zoom_in: "Arată detalii",
    zoom_out: "Arată mai puțin",
    water_temperature_high: "Apă prea caldă: verifică încălzitorul, agită suprafața și răcorește camera dacă e nevoie",
    water_temperature_low: "Apă prea rece: verifică încălzitorul și setarea lui",
    ph_high: "pH prea mare: verifică KH și CO₂ și fă o schimbare parțială de apă",
    ph_low: "pH prea mic: verifică KH, aerează apa și fă o schimbare parțială de apă",
    ammonia_high: "Amoniac detectat, toxic pentru pești: schimbă un sfert din apă și hrănește mai puțin",
    nitrite_high: "Nitriți detectați, filtrul nu face față: schimbă puțină apă și nu curăța materialele filtrante",
    nitrate_high: "Nitrați mari: fă o schimbare parțială de apă și hrănește mai puțin",
    phosphate_high: "Fosfați mari, risc de alge: hrănește mai puțin și folosește un absorbant de fosfați",
    kh_low: "Duritate carbonatică mică, pH-ul poate varia: crește alcalinitatea",
    salinity_high: "Salinitate prea mare: completează cu apă de osmoză",
    salinity_low: "Salinitate prea mică: verifică completarea și adaugă apă sărată",
    oxygen_low: "Oxigen scăzut: adaugă aerare și mișcare la suprafață",
    generic_high: "{name} peste intervalul ideal",
    generic_low: "{name} sub intervalul ideal",
    leak_tip: "Scurgere de apă detectată sub acvariu!",
    filter_stopped: "Filtrul este oprit",
    return_stopped: "Pompa de retur este oprită",
    level_tip: "Nivelul apei scăzut: verifică completarea și sump-ul",
    reservoir_low: "Rezervorul de completare aproape gol: umple-l",
    service_tip: "Întreținerea unui echipament e necesară",
    no_entities: "Nicio entitate de acvariu găsită: alege o zonă sau un dispozitiv ori indică entitățile",
    unknown_device: "Dispozitiv necunoscut",
    unknown_area: "Zonă necunoscută",
    area: "Zonă",
    device: "Dispozitiv",
    area_helper: "Toate dispozitivele acvariului din această zonă",
    device_helper: "Un dispozitiv al acvariului (mai multe cu `devices` în YAML)",
    title: "Titlu",
    kind: "Acvariu",
    kind_auto: "Automat",
    kind_reef: "Recif (apă sărată)",
    kind_freshwater: "Apă dulce",
    volume: "Volum",
    entities: "Entități",
    show_title: "Titlu",
    show_subtitle: "Subtitlu",
    illustration: "Ilustrație",
    show_equipment: "Echipamente",
    show_quality: "Calitatea apei",
    show_advice: "Sfaturi",
    show_controls: "Butoane",
    invert_level: "Inversează nivelul apei",
    invert_level_helper: "Pentru un plutitor pornit când apa e scăzută",
    zoom: "Buton de detalii",
    zoom_helper: "Comută mini-cardul la cardul complet și înapoi",
    illustration_theme: "Tema ilustrației",
    theme_auto: "Automat (urmează tema)",
    theme_day: "Zi",
    theme_night: "Noapte",
    collapsed: "Secțiuni pliate",
    ranges: "Intervale ideale",
    min_l: "min.",
    max_l: "max.",
    language: "Limbă",
    lang_auto: "Automat (Home Assistant)",
    scene: "Scenă",
    scene_auto: "Automat",
    scene_reef: "Recif",
    scene_planted: "Acvariu plantat",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazon ape negre",
    scene_malawi: "Lacul Malawi",
    scene_tanganyika: "Lacul Tanganyika",
    scene_shrimp: "Acvariu cu creveți",
    scene_betta: "Acvariu cu betta",
    scene_goldfish: "Peștișori aurii",
    scene_mangrove: "Mangrove salmastre",
    scene_pond: "Iaz de grădină",
    scene_sps: "Recif SPS",
    scene_soft_coral: "Corali moi",
    scene_nano_reef: "Nano recif",
    scene_seahorse: "Căluți de mare",
    scene_jellyfish: "Meduze",
    scene_predator: "Laguna prădătorilor",
    scene_wreck: "Epavă și comoară",
    scene_abyss: "Abis",
    scene_arctic: "Banchiză",
    terrarium: "Terariu",
    turtle_tank: "Acvaterariu",
    kind_terrarium: "Terariu",
    kind_turtle: "Acvaterariu (broaște țestoase)",
    climate: "Climat",
    air_temperature: "Temperatura aerului",
    hot_spot: "Punct cald",
    cold_spot: "Zona rece",
    humidity: "Umiditate",
    uv_index: "Indice UV",
    basking: "Lampă de încălzire",
    heat_mat: "Covoraș încălzitor",
    mister: "Pulverizator",
    uvb: "Lampă UVB",
    air_temperature_high: "Aer prea cald: verificați termostatul și aerisiți terariul.",
    air_temperature_low: "Aer prea rece: verificați încălzirea și termostatul.",
    hot_spot_high: "Punct cald prea fierbinte: ridicați lampa de încălzire sau reduceți puterea.",
    hot_spot_low: "Punct cald prea rece: verificați lampa de încălzire, poate fi uzată.",
    cold_spot_high: "Zona rece prea caldă: mutați sursa de căldură ca animalul să se poată răcori.",
    cold_spot_low: "Zona rece prea rece: verificați temperatura camerei și covorașul încălzitor.",
    humidity_high: "Prea umed: aerisiți și pulverizați mai puțin pentru a evita mucegaiul.",
    humidity_low: "Prea uscat: pulverizați mai mult sau adăugați o ascunzătoare umedă pentru năpârlire.",
    uv_index_low: "UV prea slab: înlocuiți tubul UVB (la 6–12 luni) sau apropiați-l.",
    uv_index_high: "UV prea puternic: ridicați lampa UVB și lăsați o zonă de umbră.",
    scene_desert: "Deșert",
    scene_rainforest: "Pădure tropicală",
    scene_leopard_gecko: "Gecko leopard",
    scene_chameleon: "Cameleon",
    scene_ball_python: "Piton regal",
    scene_tarantula: "Tarantulă",
    scene_insects: "Insecte-băț și călugărițe",
    scene_crested_gecko: "Gecko cu creastă",
    scene_paludarium: "Paludariu",
    scene_hermit_crab: "Crabi pustnici",
    scene_axolotl: "Axolotl",
    scene_turtle: "Broaște țestoase acvatice",
    scene_tortoise: "Broască țestoasă de uscat",
    scene_musk_turtle: "Broască țestoasă moscată",
    all_good_terra: "Climat și echipamente OK",
  },
  da: {
    reef: "Saltvandsakvarium",
    freshwater: "Ferskvandsakvarium",
    status_ok: "Alt i orden",
    status_warn: "Tjek akvariet",
    status_crit: "Handling nødvendig",
    status_idle: "Ingen data",
    water_quality: "Vandkvalitet",
    advice: "Råd",
    all_good: "Vand og udstyr OK",
    water_temperature: "Vandtemperatur",
    ph: "pH",
    ammonia: "Ammoniak",
    nitrite: "Nitrit",
    nitrate: "Nitrat",
    phosphate: "Fosfat",
    kh: "Karbonathårdhed",
    gh: "Totalhårdhed",
    calcium: "Calcium",
    magnesium: "Magnesium",
    salinity: "Saltholdighed",
    orp: "Redox (ORP)",
    conductivity: "Ledningsevne",
    tds: "TDS",
    oxygen: "Opløst ilt",
    light: "Lys",
    heater: "Varmelegeme",
    filter: "Filter",
    filter_speed: "Filterhastighed",
    wave_pump: "Strømpumpe",
    return_pump: "Returpumpe",
    skimmer: "Proteinskimmer",
    co2: "CO₂",
    air_pump: "Luftpumpe",
    uv: "UV-filter",
    feeder: "Foderautomat",
    ato: "Efterfyldning",
    reservoir: "Beholder",
    water_level: "Vandstand",
    leak: "Lækage",
    dosing: "Dosering",
    service: "Vedligehold",
    power: "Effekt",
    on: "Tændt",
    off: "Slukket",
    unavailable: "Ikke tilgængelig",
    heating: "Varmer",
    idle: "Venter",
    running: "Kører",
    stopped: "Stoppet",
    daylight: "Dagslys",
    moonlight: "Månelys",
    lights_off: "Lys slukket",
    in_range: "I intervallet",
    too_high: "For høj",
    too_low: "For lav",
    target: "Mål {t}",
    feeding: "Fodrer…",
    fed_ago: "Fodret for {time} siden",
    ready: "Klar",
    topping_off: "Efterfylder",
    standby: "Standby",
    level_ok: "Stand OK",
    level_low: "Lav stand",
    leak_detected: "Lækage!",
    dry: "Tørt",
    service_due: "Nu",
    service_in: "Om {time}",
    ideal: "Ideelt {range}",
    max: "Maks. {v}",
    feed: "Fodr",
    confirm_filter_off: "Stop filteret? Uden strømmen mister vandet ilt, og fiskene kan lide.",
    stop: "Stop",
    cancel: "Annuller",
    zoom_in: "Vis detaljer",
    zoom_out: "Vis mindre",
    water_temperature_high: "Vandet er for varmt: tjek varmelegemet, bevæg overfladen og køl rummet om nødvendigt",
    water_temperature_low: "Vandet er for koldt: tjek varmelegemet og dets indstilling",
    ph_high: "pH for høj: tjek KH og CO₂, og lav et delvist vandskift",
    ph_low: "pH for lav: tjek KH, ilt vandet og lav et delvist vandskift",
    ammonia_high: "Ammoniak målt, giftigt for fiskene: skift en fjerdedel af vandet og fodr mindre",
    nitrite_high: "Nitrit målt, filteret kan ikke følge med: skift lidt vand og lad filtermaterialet være",
    nitrate_high: "Nitrat højt: lav et delvist vandskift og fodr mindre",
    phosphate_high: "Fosfat højt, risiko for alger: fodr mindre og brug en fosfatfjerner",
    kh_low: "Karbonathårdhed lav, pH kan svinge: hæv alkaliniteten",
    salinity_high: "Saltholdighed for høj: efterfyld med frisk osmosevand",
    salinity_low: "Saltholdighed for lav: tjek efterfyldningen og tilsæt saltvand",
    oxygen_low: "Lavt iltindhold: tilfør luft og bevægelse i overfladen",
    generic_high: "{name} over det ideelle interval",
    generic_low: "{name} under det ideelle interval",
    leak_tip: "Vandlækage registreret under akvariet!",
    filter_stopped: "Filteret er stoppet",
    return_stopped: "Returpumpen er stoppet",
    level_tip: "Lav vandstand: tjek efterfyldningen og sumpen",
    reservoir_low: "Efterfyldningsbeholderen er næsten tom: fyld den op",
    service_tip: "Vedligehold af udstyr er påkrævet",
    no_entities: "Ingen akvarieentitet fundet: vælg et område eller en enhed, eller angiv entiteterne",
    unknown_device: "Ukendt enhed",
    unknown_area: "Ukendt område",
    area: "Område",
    device: "Enhed",
    area_helper: "Alle akvariets enheder i dette område",
    device_helper: "En enhed i akvariet (flere med `devices` i YAML)",
    title: "Titel",
    kind: "Akvarium",
    kind_auto: "Automatisk",
    kind_reef: "Rev (saltvand)",
    kind_freshwater: "Ferskvand",
    volume: "Volumen",
    entities: "Entiteter",
    show_title: "Titel",
    show_subtitle: "Undertitel",
    illustration: "Illustration",
    show_equipment: "Udstyr",
    show_quality: "Vandkvalitet",
    show_advice: "Råd",
    show_controls: "Knapper",
    invert_level: "Vend vandstanden om",
    invert_level_helper: "Til en svømmer, der er tændt ved lav vandstand",
    zoom: "Detaljeknap",
    zoom_helper: "Skifter minikortet til det fulde kort og tilbage",
    illustration_theme: "Illustrationstema",
    theme_auto: "Automatisk (følger temaet)",
    theme_day: "Dag",
    theme_night: "Nat",
    collapsed: "Foldede sektioner",
    ranges: "Ideelle intervaller",
    min_l: "min.",
    max_l: "maks.",
    language: "Sprog",
    lang_auto: "Automatisk (Home Assistant)",
    scene: "Scene",
    scene_auto: "Automatisk",
    scene_reef: "Rev",
    scene_planted: "Planteakvarium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonas-sortvand",
    scene_malawi: "Malawisøen",
    scene_tanganyika: "Tanganyikasøen",
    scene_shrimp: "Rejeakvarium",
    scene_betta: "Kampfiskeakvarium",
    scene_goldfish: "Guldfisk",
    scene_mangrove: "Brakvandsmangrove",
    scene_pond: "Havedam",
    scene_sps: "SPS-rev",
    scene_soft_coral: "Bløde koraller",
    scene_nano_reef: "Nanorev",
    scene_seahorse: "Søheste",
    scene_jellyfish: "Vandmænd",
    scene_predator: "Rovfiskelagune",
    scene_wreck: "Vrag og skat",
    scene_abyss: "Dybhav",
    scene_arctic: "Pakis",
    terrarium: "Terrarium",
    turtle_tank: "Akvaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Akvaterrarium (skildpadder)",
    climate: "Klima",
    air_temperature: "Lufttemperatur",
    hot_spot: "Varmeplads",
    cold_spot: "Kølig side",
    humidity: "Luftfugtighed",
    uv_index: "UV-indeks",
    basking: "Varmelampe",
    heat_mat: "Varmemåtte",
    mister: "Forstøver",
    uvb: "UVB-lampe",
    air_temperature_high: "Luften er for varm: tjek termostaten og luft ud i terrariet.",
    air_temperature_low: "Luften er for kold: tjek varmen og termostaten.",
    hot_spot_high: "Varmepladsen er for varm: hæng varmelampen højere eller skru ned for den.",
    hot_spot_low: "Varmepladsen er for kølig: tjek varmelampen, den kan være slidt.",
    cold_spot_high: "Den kølige side er for varm: flyt varmekilden, så dyret kan køle af.",
    cold_spot_low: "Den kølige side er for kold: tjek rumtemperaturen og varmemåtten.",
    humidity_high: "For fugtigt: luft ud og forstøv mindre for at undgå skimmel.",
    humidity_low: "For tørt: forstøv mere eller tilføj et fugtigt skjul til hudskiftet.",
    uv_index_low: "For svag UV: udskift UVB-røret (hver 6.–12. måned) eller flyt det tættere på.",
    uv_index_high: "For stærk UV: hæng UVB-lampen højere og bevar et skyggeområde.",
    scene_desert: "Ørken",
    scene_rainforest: "Regnskov",
    scene_leopard_gecko: "Leopardgekko",
    scene_chameleon: "Kamæleon",
    scene_ball_python: "Kongepython",
    scene_tarantula: "Fugleedderkop",
    scene_insects: "Vandrende pinde og knælere",
    scene_crested_gecko: "Kamgekko",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Eremitkrebs",
    scene_axolotl: "Axolotl",
    scene_turtle: "Vandskildpadder",
    scene_tortoise: "Landskildpadde",
    scene_musk_turtle: "Moskusskildpadde",
    all_good_terra: "Klima og udstyr OK",
  },
  sv: {
    reef: "Saltvattensakvarium",
    freshwater: "Sötvattensakvarium",
    status_ok: "Allt bra",
    status_warn: "Kontrollera akvariet",
    status_crit: "Åtgärd krävs",
    status_idle: "Inga data",
    water_quality: "Vattenkvalitet",
    advice: "Råd",
    all_good: "Vatten och utrustning OK",
    water_temperature: "Vattentemperatur",
    ph: "pH",
    ammonia: "Ammoniak",
    nitrite: "Nitrit",
    nitrate: "Nitrat",
    phosphate: "Fosfat",
    kh: "Karbonathårdhet",
    gh: "Totalhårdhet",
    calcium: "Kalcium",
    magnesium: "Magnesium",
    salinity: "Salthalt",
    orp: "Redox (ORP)",
    conductivity: "Konduktivitet",
    tds: "TDS",
    oxygen: "Löst syre",
    light: "Belysning",
    heater: "Värmare",
    filter: "Filter",
    filter_speed: "Filterhastighet",
    wave_pump: "Strömpump",
    return_pump: "Returpump",
    skimmer: "Proteinskimmer",
    co2: "CO₂",
    air_pump: "Luftpump",
    uv: "UV-filter",
    feeder: "Foderautomat",
    ato: "Påfyllning",
    reservoir: "Behållare",
    water_level: "Vattennivå",
    leak: "Läcka",
    dosing: "Dosering",
    service: "Underhåll",
    power: "Effekt",
    on: "På",
    off: "Av",
    unavailable: "Inte tillgänglig",
    heating: "Värmer",
    idle: "Vilar",
    running: "Går",
    stopped: "Stoppad",
    daylight: "Dagsljus",
    moonlight: "Månljus",
    lights_off: "Belysning av",
    in_range: "Inom intervallet",
    too_high: "För högt",
    too_low: "För lågt",
    target: "Mål {t}",
    feeding: "Matar…",
    fed_ago: "Matade för {time} sedan",
    ready: "Redo",
    topping_off: "Fyller på",
    standby: "Vänteläge",
    level_ok: "Nivå OK",
    level_low: "Låg nivå",
    leak_detected: "Läcka!",
    dry: "Torrt",
    service_due: "Nu",
    service_in: "Om {time}",
    ideal: "Idealt {range}",
    max: "Max {v}",
    feed: "Mata",
    confirm_filter_off: "Stoppa filtret? Utan flödet förlorar vattnet syre och fiskarna kan må dåligt.",
    stop: "Stoppa",
    cancel: "Avbryt",
    zoom_in: "Visa detaljer",
    zoom_out: "Visa mindre",
    water_temperature_high: "Vattnet är för varmt: kontrollera värmaren, rör om ytan och kyl rummet vid behov",
    water_temperature_low: "Vattnet är för kallt: kontrollera värmaren och dess inställning",
    ph_high: "pH för högt: kontrollera KH och CO₂ och gör ett delvattenbyte",
    ph_low: "pH för lågt: kontrollera KH, lufta vattnet och gör ett delvattenbyte",
    ammonia_high: "Ammoniak uppmätt, giftigt för fiskarna: byt en fjärdedel av vattnet och mata mindre",
    nitrite_high: "Nitrit uppmätt, filtret hinner inte med: byt lite vatten och låt filtermaterialet vara",
    nitrate_high: "Högt nitrat: gör ett delvattenbyte och mata mindre",
    phosphate_high: "Högt fosfat, risk för alger: mata mindre och använd en fosfatborttagare",
    kh_low: "Låg karbonathårdhet, pH kan svänga: höj alkaliniteten",
    salinity_high: "För hög salthalt: fyll på med färskt osmosvatten",
    salinity_low: "För låg salthalt: kontrollera påfyllningen och tillsätt saltvatten",
    oxygen_low: "Lågt syre: tillför luftning och rörelse i ytan",
    generic_high: "{name} över idealintervallet",
    generic_low: "{name} under idealintervallet",
    leak_tip: "Vattenläcka upptäckt under akvariet!",
    filter_stopped: "Filtret är stoppat",
    return_stopped: "Returpumpen är stoppad",
    level_tip: "Låg vattennivå: kontrollera påfyllningen och sumpen",
    reservoir_low: "Påfyllningsbehållaren är nästan tom: fyll den",
    service_tip: "Underhåll av utrustning krävs",
    no_entities: "Ingen akvarieentitet hittades: välj ett område eller en enhet, eller ange entiteterna",
    unknown_device: "Okänd enhet",
    unknown_area: "Okänt område",
    area: "Område",
    device: "Enhet",
    area_helper: "Alla akvariets enheter i det här området",
    device_helper: "En enhet i akvariet (flera med `devices` i YAML)",
    title: "Titel",
    kind: "Akvarium",
    kind_auto: "Automatiskt",
    kind_reef: "Rev (saltvatten)",
    kind_freshwater: "Sötvatten",
    volume: "Volym",
    entities: "Entiteter",
    show_title: "Titel",
    show_subtitle: "Undertitel",
    illustration: "Illustration",
    show_equipment: "Utrustning",
    show_quality: "Vattenkvalitet",
    show_advice: "Råd",
    show_controls: "Knappar",
    invert_level: "Vänd på vattennivån",
    invert_level_helper: "För en flottör som är på när vattnet är lågt",
    zoom: "Detaljknapp",
    zoom_helper: "Växlar minikortet till hela kortet och tillbaka",
    illustration_theme: "Illustrationstema",
    theme_auto: "Automatiskt (följer temat)",
    theme_day: "Dag",
    theme_night: "Natt",
    collapsed: "Hopfällda avsnitt",
    ranges: "Idealintervall",
    min_l: "min",
    max_l: "max",
    language: "Språk",
    lang_auto: "Automatiskt (Home Assistant)",
    scene: "Scen",
    scene_auto: "Automatiskt",
    scene_reef: "Rev",
    scene_planted: "Växtakvarium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonas svartvatten",
    scene_malawi: "Malawisjön",
    scene_tanganyika: "Tanganyikasjön",
    scene_shrimp: "Räkakvarium",
    scene_betta: "Kampfiskakvarium",
    scene_goldfish: "Guldfiskar",
    scene_mangrove: "Bräckt mangrove",
    scene_pond: "Trädgårdsdamm",
    scene_sps: "SPS-rev",
    scene_soft_coral: "Mjukkoraller",
    scene_nano_reef: "Nanorev",
    scene_seahorse: "Sjöhästar",
    scene_jellyfish: "Maneter",
    scene_predator: "Rovfisklagun",
    scene_wreck: "Vrak och skatt",
    scene_abyss: "Djuphav",
    scene_arctic: "Packis",
    terrarium: "Terrarium",
    turtle_tank: "Akvaterrarium",
    kind_terrarium: "Terrarium",
    kind_turtle: "Akvaterrarium (sköldpaddor)",
    climate: "Klimat",
    air_temperature: "Lufttemperatur",
    hot_spot: "Värmeplats",
    cold_spot: "Sval sida",
    humidity: "Luftfuktighet",
    uv_index: "UV-index",
    basking: "Värmelampa",
    heat_mat: "Värmematta",
    mister: "Dimsystem",
    uvb: "UVB-lampa",
    air_temperature_high: "För varm luft: kontrollera termostaten och vädra terrariet.",
    air_temperature_low: "För kall luft: kontrollera värmen och termostaten.",
    hot_spot_high: "Värmeplatsen för het: häng värmelampan högre eller sänk effekten.",
    hot_spot_low: "Värmeplatsen för sval: kontrollera värmelampan, den kan vara sliten.",
    cold_spot_high: "Den svala sidan för varm: flytta värmekällan så att djuret kan svalka sig.",
    cold_spot_low: "Den svala sidan för kall: kontrollera rumstemperaturen och värmemattan.",
    humidity_high: "För fuktigt: vädra och dimma mindre för att undvika mögel.",
    humidity_low: "För torrt: dimma mer eller lägg till ett fuktigt gömställe för ömsningen.",
    uv_index_low: "För svag UV: byt UVB-röret (var 6–12:e månad) eller flytta det närmare.",
    uv_index_high: "För stark UV: häng UVB-lampan högre och behåll en skuggig del.",
    scene_desert: "Öken",
    scene_rainforest: "Regnskog",
    scene_leopard_gecko: "Leopardgecko",
    scene_chameleon: "Kameleont",
    scene_ball_python: "Kungspyton",
    scene_tarantula: "Fågelspindel",
    scene_insects: "Vandrande pinnar och bönsyrsor",
    scene_crested_gecko: "Krongecko",
    scene_paludarium: "Paludarium",
    scene_hermit_crab: "Eremitkräftor",
    scene_axolotl: "Axolotl",
    scene_turtle: "Vattensköldpaddor",
    scene_tortoise: "Landsköldpadda",
    scene_musk_turtle: "Myskssköldpadda",
    all_good_terra: "Klimat och utrustning OK",
  },
  bg: {
    reef: "Морски аквариум",
    freshwater: "Сладководен аквариум",
    status_ok: "Всичко е наред",
    status_warn: "Проверете аквариума",
    status_crit: "Нужни са действия",
    status_idle: "Няма данни",
    water_quality: "Качество на водата",
    advice: "Съвети",
    all_good: "Водата и оборудването са наред",
    water_temperature: "Температура на водата",
    ph: "pH",
    ammonia: "Амоняк",
    nitrite: "Нитрити",
    nitrate: "Нитрати",
    phosphate: "Фосфати",
    kh: "Карбонатна твърдост",
    gh: "Обща твърдост",
    calcium: "Калций",
    magnesium: "Магнезий",
    salinity: "Соленост",
    orp: "Редокс (ORP)",
    conductivity: "Проводимост",
    tds: "TDS",
    oxygen: "Разтворен кислород",
    light: "Осветление",
    heater: "Нагревател",
    filter: "Филтър",
    filter_speed: "Скорост на филтъра",
    wave_pump: "Помпа за течение",
    return_pump: "Възвратна помпа",
    skimmer: "Скимер",
    co2: "CO₂",
    air_pump: "Въздушна помпа",
    uv: "UV стерилизатор",
    feeder: "Хранилка",
    ato: "Доливане",
    reservoir: "Резервоар",
    water_level: "Ниво на водата",
    leak: "Теч",
    dosing: "Дозиране",
    service: "Поддръжка",
    power: "Мощност",
    on: "Вкл.",
    off: "Изкл.",
    unavailable: "Недостъпно",
    heating: "Загрява",
    idle: "В покой",
    running: "Работи",
    stopped: "Спрян",
    daylight: "Дневна светлина",
    moonlight: "Лунна светлина",
    lights_off: "Светлините са изгасени",
    in_range: "В диапазона",
    too_high: "Твърде високо",
    too_low: "Твърде ниско",
    target: "Цел {t}",
    feeding: "Хранене…",
    fed_ago: "Нахранени преди {time}",
    ready: "Готово",
    topping_off: "Долива",
    standby: "Режим на готовност",
    level_ok: "Ниво OK",
    level_low: "Ниско ниво",
    leak_detected: "Теч!",
    dry: "Сухо",
    service_due: "Наложително",
    service_in: "След {time}",
    ideal: "Идеално {range}",
    max: "Макс. {v}",
    feed: "Нахрани",
    confirm_filter_off: "Да се спре ли филтърът? Без поток водата губи кислород и рибите може да страдат.",
    stop: "Спри",
    cancel: "Отказ",
    zoom_in: "Покажи подробности",
    zoom_out: "Покажи по-малко",
    water_temperature_high: "Водата е твърде топла: проверете нагревателя, раздвижете повърхността и охладете стаята при нужда",
    water_temperature_low: "Водата е твърде студена: проверете нагревателя и настройката му",
    ph_high: "pH е твърде високо: проверете KH и CO₂ и направете частична смяна на водата",
    ph_low: "pH е твърде ниско: проверете KH, аерирайте водата и направете частична смяна на водата",
    ammonia_high: "Открит е амоняк, отровен за рибите: сменете една четвърт от водата и хранете по-малко",
    nitrite_high: "Открити са нитрити, филтърът не смогва: сменете малко вода и не почиствайте филтърните материали",
    nitrate_high: "Високи нитрати: направете частична смяна на водата и хранете по-малко",
    phosphate_high: "Високи фосфати, риск от водорасли: хранете по-малко и използвайте средство против фосфати",
    kh_low: "Ниска карбонатна твърдост, pH може да се колебае: повишете алкалността",
    salinity_high: "Солеността е твърде висока: долейте прясна осмозна вода",
    salinity_low: "Солеността е твърде ниска: проверете доливането и добавете солена вода",
    oxygen_low: "Малко кислород: добавете аерация и движение на повърхността",
    generic_high: "{name} над идеалния диапазон",
    generic_low: "{name} под идеалния диапазон",
    leak_tip: "Открит е теч на вода под аквариума!",
    filter_stopped: "Филтърът е спрян",
    return_stopped: "Възвратната помпа е спряна",
    level_tip: "Ниско ниво на водата: проверете доливането и сумпа",
    reservoir_low: "Резервоарът за доливане е почти празен: напълнете го",
    service_tip: "Нужна е поддръжка на оборудване",
    no_entities: "Не е намерен обект на аквариум: изберете зона или устройство или посочете обектите",
    unknown_device: "Неизвестно устройство",
    unknown_area: "Неизвестна зона",
    area: "Зона",
    device: "Устройство",
    area_helper: "Всички устройства на аквариума в тази зона",
    device_helper: "Устройство на аквариума (няколко с `devices` в YAML)",
    title: "Заглавие",
    kind: "Аквариум",
    kind_auto: "Автоматично",
    kind_reef: "Риф (солена вода)",
    kind_freshwater: "Сладка вода",
    volume: "Обем",
    entities: "Обекти",
    show_title: "Заглавие",
    show_subtitle: "Подзаглавие",
    illustration: "Илюстрация",
    show_equipment: "Оборудване",
    show_quality: "Качество на водата",
    show_advice: "Съвети",
    show_controls: "Бутони",
    invert_level: "Обърни нивото на водата",
    invert_level_helper: "За поплавък, който е включен при ниска вода",
    zoom: "Бутон за подробности",
    zoom_helper: "Превключва мини картата към пълната карта и обратно",
    illustration_theme: "Тема на илюстрацията",
    theme_auto: "Автоматично (следва темата)",
    theme_day: "Ден",
    theme_night: "Нощ",
    collapsed: "Свити секции",
    ranges: "Идеални диапазони",
    min_l: "мин.",
    max_l: "макс.",
    language: "Език",
    lang_auto: "Автоматично (Home Assistant)",
    scene: "Сцена",
    scene_auto: "Автоматично",
    scene_reef: "Риф",
    scene_planted: "Растителен аквариум",
    scene_iwagumi: "Ивагуми",
    scene_blackwater: "Амазонска черна вода",
    scene_malawi: "Езеро Малави",
    scene_tanganyika: "Езеро Танганайка",
    scene_shrimp: "Аквариум за скариди",
    scene_betta: "Аквариум за бета",
    scene_goldfish: "Златни рибки",
    scene_mangrove: "Солено мангрово",
    scene_pond: "Градинско езерце",
    scene_sps: "SPS риф",
    scene_soft_coral: "Меки корали",
    scene_nano_reef: "Нано риф",
    scene_seahorse: "Морски кончета",
    scene_jellyfish: "Медузи",
    scene_predator: "Лагуна на хищниците",
    scene_wreck: "Корабокрушение и съкровище",
    scene_abyss: "Бездна",
    scene_arctic: "Ледена покривка",
    terrarium: "Терариум",
    turtle_tank: "Акватерариум",
    kind_terrarium: "Терариум",
    kind_turtle: "Акватерариум (костенурки)",
    climate: "Климат",
    air_temperature: "Температура на въздуха",
    hot_spot: "Топла точка",
    cold_spot: "Хладна страна",
    humidity: "Влажност",
    uv_index: "UV индекс",
    basking: "Нагревателна лампа",
    heat_mat: "Нагревателна постелка",
    mister: "Пулверизатор",
    uvb: "UVB лампа",
    air_temperature_high: "Въздухът е твърде топъл: проверете термостата и проветрете терариума.",
    air_temperature_low: "Въздухът е твърде студен: проверете отоплението и термостата.",
    hot_spot_high: "Топлата точка е твърде гореща: вдигнете нагревателната лампа или намалете мощността.",
    hot_spot_low: "Топлата точка е твърде хладна: проверете нагревателната лампа, може да е износена.",
    cold_spot_high: "Хладната страна е твърде топла: преместете източника на топлина, за да може животното да се охлажда.",
    cold_spot_low: "Хладната страна е твърде студена: проверете температурата в стаята и постелката.",
    humidity_high: "Твърде влажно: проветрете и пръскайте по-малко, за да избегнете мухъл.",
    humidity_low: "Твърде сухо: пръскайте повече или добавете влажно скривалище за смяната на кожата.",
    uv_index_low: "UV е твърде слаб: сменете UVB тръбата (на 6–12 месеца) или я приближете.",
    uv_index_high: "UV е твърде силен: вдигнете UVB лампата и оставете сенчеста зона.",
    scene_desert: "Пустиня",
    scene_rainforest: "Тропическа гора",
    scene_leopard_gecko: "Леопардов гекон",
    scene_chameleon: "Хамелеон",
    scene_ball_python: "Кралски питон",
    scene_tarantula: "Тарантула",
    scene_insects: "Пръчици и богомолки",
    scene_crested_gecko: "Гребенест гекон",
    scene_paludarium: "Палудариум",
    scene_hermit_crab: "Раци отшелници",
    scene_axolotl: "Аксолотъл",
    scene_turtle: "Водни костенурки",
    scene_tortoise: "Сухоземна костенурка",
    scene_musk_turtle: "Мускусна костенурка",
    all_good_terra: "Климат и оборудване OK",
  },
  ru: {
    reef: "Морской аквариум",
    freshwater: "Пресноводный аквариум",
    status_ok: "Всё в порядке",
    status_warn: "Проверьте аквариум",
    status_crit: "Нужны действия",
    status_idle: "Нет данных",
    water_quality: "Качество воды",
    advice: "Советы",
    all_good: "Вода и оборудование в норме",
    water_temperature: "Температура воды",
    ph: "pH",
    ammonia: "Аммиак",
    nitrite: "Нитриты",
    nitrate: "Нитраты",
    phosphate: "Фосфаты",
    kh: "Карбонатная жёсткость",
    gh: "Общая жёсткость",
    calcium: "Кальций",
    magnesium: "Магний",
    salinity: "Солёность",
    orp: "Редокс (ORP)",
    conductivity: "Проводимость",
    tds: "TDS",
    oxygen: "Растворённый кислород",
    light: "Освещение",
    heater: "Нагреватель",
    filter: "Фильтр",
    filter_speed: "Скорость фильтра",
    wave_pump: "Помпа течения",
    return_pump: "Возвратная помпа",
    skimmer: "Флотатор",
    co2: "CO₂",
    air_pump: "Компрессор",
    uv: "УФ-стерилизатор",
    feeder: "Кормушка",
    ato: "Долив",
    reservoir: "Резервуар",
    water_level: "Уровень воды",
    leak: "Протечка",
    dosing: "Дозирование",
    service: "Обслуживание",
    power: "Мощность",
    on: "Вкл.",
    off: "Выкл.",
    unavailable: "Недоступно",
    heating: "Нагрев",
    idle: "Ожидание",
    running: "Работает",
    stopped: "Остановлен",
    daylight: "Дневной свет",
    moonlight: "Лунный свет",
    lights_off: "Свет выключен",
    in_range: "В норме",
    too_high: "Слишком высоко",
    too_low: "Слишком низко",
    target: "Цель {t}",
    feeding: "Кормление…",
    fed_ago: "Покормлены {time} назад",
    ready: "Готово",
    topping_off: "Доливает",
    standby: "Ожидание",
    level_ok: "Уровень OK",
    level_low: "Низкий уровень",
    leak_detected: "Протечка!",
    dry: "Сухо",
    service_due: "Пора",
    service_in: "Через {time}",
    ideal: "Норма {range}",
    max: "Макс. {v}",
    feed: "Покормить",
    confirm_filter_off: "Остановить фильтр? Без потока вода теряет кислород, и рыбы могут пострадать.",
    stop: "Остановить",
    cancel: "Отмена",
    zoom_in: "Показать подробности",
    zoom_out: "Показать меньше",
    water_temperature_high: "Вода слишком тёплая: проверьте нагреватель, усильте движение поверхности и при необходимости охладите комнату",
    water_temperature_low: "Вода слишком холодная: проверьте нагреватель и его настройку",
    ph_high: "pH слишком высокий: проверьте KH и CO₂ и сделайте частичную подмену воды",
    ph_low: "pH слишком низкий: проверьте KH, аэрируйте воду и сделайте частичную подмену воды",
    ammonia_high: "Обнаружен аммиак, ядовитый для рыб: подмените четверть воды и кормите меньше",
    nitrite_high: "Обнаружены нитриты, фильтр не справляется: подмените немного воды и не промывайте наполнители",
    nitrate_high: "Высокие нитраты: сделайте частичную подмену воды и кормите меньше",
    phosphate_high: "Высокие фосфаты, риск водорослей: кормите меньше и используйте средство от фосфатов",
    kh_low: "Низкая карбонатная жёсткость, pH может колебаться: повысьте щёлочность",
    salinity_high: "Солёность слишком высокая: долейте свежую осмотическую воду",
    salinity_low: "Солёность слишком низкая: проверьте долив и добавьте солёную воду",
    oxygen_low: "Мало кислорода: добавьте аэрацию и движение поверхности",
    generic_high: "{name} выше идеального диапазона",
    generic_low: "{name} ниже идеального диапазона",
    leak_tip: "Под аквариумом обнаружена протечка воды!",
    filter_stopped: "Фильтр остановлен",
    return_stopped: "Возвратная помпа остановлена",
    level_tip: "Низкий уровень воды: проверьте долив и самп",
    reservoir_low: "Резервуар долива почти пуст: наполните его",
    service_tip: "Требуется обслуживание оборудования",
    no_entities: "Объекты аквариума не найдены: выберите пространство или устройство либо укажите объекты",
    unknown_device: "Неизвестное устройство",
    unknown_area: "Неизвестное пространство",
    area: "Пространство",
    device: "Устройство",
    area_helper: "Все устройства аквариума в этом пространстве",
    device_helper: "Устройство аквариума (несколько через `devices` в YAML)",
    title: "Заголовок",
    kind: "Аквариум",
    kind_auto: "Автоматически",
    kind_reef: "Риф (морская вода)",
    kind_freshwater: "Пресная вода",
    volume: "Объём",
    entities: "Объекты",
    show_title: "Заголовок",
    show_subtitle: "Подзаголовок",
    illustration: "Иллюстрация",
    show_equipment: "Оборудование",
    show_quality: "Качество воды",
    show_advice: "Советы",
    show_controls: "Кнопки",
    invert_level: "Инвертировать уровень воды",
    invert_level_helper: "Для поплавка, который включён при низкой воде",
    zoom: "Кнопка подробностей",
    zoom_helper: "Переключает мини-карточку на полную и обратно",
    illustration_theme: "Тема иллюстрации",
    theme_auto: "Автоматически (по теме)",
    theme_day: "День",
    theme_night: "Ночь",
    collapsed: "Свёрнутые разделы",
    ranges: "Идеальные диапазоны",
    min_l: "мин.",
    max_l: "макс.",
    language: "Язык",
    lang_auto: "Автоматически (Home Assistant)",
    scene: "Сцена",
    scene_auto: "Автоматически",
    scene_reef: "Риф",
    scene_planted: "Травник",
    scene_iwagumi: "Ивагуми",
    scene_blackwater: "Амазонская чёрная вода",
    scene_malawi: "Озеро Малави",
    scene_tanganyika: "Озеро Танганьика",
    scene_shrimp: "Креветочник",
    scene_betta: "Аквариум с петушком",
    scene_goldfish: "Золотые рыбки",
    scene_mangrove: "Солоноватая мангровая",
    scene_pond: "Садовый пруд",
    scene_sps: "SPS-риф",
    scene_soft_coral: "Мягкие кораллы",
    scene_nano_reef: "Нанориф",
    scene_seahorse: "Морские коньки",
    scene_jellyfish: "Медузы",
    scene_predator: "Лагуна хищников",
    scene_wreck: "Затонувший корабль и клад",
    scene_abyss: "Бездна",
    scene_arctic: "Арктические льды",
    terrarium: "Террариум",
    turtle_tank: "Акватеррариум",
    kind_terrarium: "Террариум",
    kind_turtle: "Акватеррариум (черепахи)",
    climate: "Климат",
    air_temperature: "Температура воздуха",
    hot_spot: "Точка обогрева",
    cold_spot: "Прохладная зона",
    humidity: "Влажность",
    uv_index: "УФ-индекс",
    basking: "Лампа обогрева",
    heat_mat: "Термоковрик",
    mister: "Система туманообразования",
    uvb: "Лампа UVB",
    air_temperature_high: "Воздух слишком тёплый: проверьте термостат и проветрите террариум.",
    air_temperature_low: "Воздух слишком холодный: проверьте обогрев и термостат.",
    hot_spot_high: "Точка обогрева слишком горячая: поднимите лампу или уменьшите её мощность.",
    hot_spot_low: "Точка обогрева слишком холодная: проверьте лампу обогрева, она может быть изношена.",
    cold_spot_high: "Прохладная зона слишком тёплая: переставьте источник тепла, чтобы животное могло остыть.",
    cold_spot_low: "Прохладная зона слишком холодная: проверьте температуру в комнате и термоковрик.",
    humidity_high: "Слишком влажно: проветрите и опрыскивайте реже, чтобы избежать плесени.",
    humidity_low: "Слишком сухо: опрыскивайте чаще или добавьте влажное укрытие для линьки.",
    uv_index_low: "УФ слишком слабый: замените лампу UVB (каждые 6–12 месяцев) или опустите её.",
    uv_index_high: "УФ слишком сильный: поднимите лампу UVB и оставьте затенённую зону.",
    scene_desert: "Пустыня",
    scene_rainforest: "Тропический лес",
    scene_leopard_gecko: "Леопардовый эублефар",
    scene_chameleon: "Хамелеон",
    scene_ball_python: "Королевский питон",
    scene_tarantula: "Птицеед",
    scene_insects: "Палочники и богомолы",
    scene_crested_gecko: "Реснитчатый геккон",
    scene_paludarium: "Палюдариум",
    scene_hermit_crab: "Раки-отшельники",
    scene_axolotl: "Аксолотль",
    scene_turtle: "Водные черепахи",
    scene_tortoise: "Сухопутная черепаха",
    scene_musk_turtle: "Мускусная черепаха",
    all_good_terra: "Климат и оборудование в порядке",
  },
  uk: {
    reef: "Морський акваріум",
    freshwater: "Прісноводний акваріум",
    status_ok: "Усе гаразд",
    status_warn: "Перевірте акваріум",
    status_crit: "Потрібні дії",
    status_idle: "Немає даних",
    water_quality: "Якість води",
    advice: "Поради",
    all_good: "Вода й обладнання в нормі",
    water_temperature: "Температура води",
    ph: "pH",
    ammonia: "Аміак",
    nitrite: "Нітрити",
    nitrate: "Нітрати",
    phosphate: "Фосфати",
    kh: "Карбонатна жорсткість",
    gh: "Загальна жорсткість",
    calcium: "Кальцій",
    magnesium: "Магній",
    salinity: "Солоність",
    orp: "Редокс (ORP)",
    conductivity: "Провідність",
    tds: "TDS",
    oxygen: "Розчинений кисень",
    light: "Освітлення",
    heater: "Нагрівач",
    filter: "Фільтр",
    filter_speed: "Швидкість фільтра",
    wave_pump: "Помпа течії",
    return_pump: "Зворотна помпа",
    skimmer: "Флотатор",
    co2: "CO₂",
    air_pump: "Компресор",
    uv: "УФ-стерилізатор",
    feeder: "Годівниця",
    ato: "Долив",
    reservoir: "Резервуар",
    water_level: "Рівень води",
    leak: "Протікання",
    dosing: "Дозування",
    service: "Обслуговування",
    power: "Потужність",
    on: "Увімк.",
    off: "Вимк.",
    unavailable: "Недоступно",
    heating: "Нагрів",
    idle: "Очікування",
    running: "Працює",
    stopped: "Зупинено",
    daylight: "Денне світло",
    moonlight: "Місячне світло",
    lights_off: "Світло вимкнено",
    in_range: "У нормі",
    too_high: "Занадто високо",
    too_low: "Занадто низько",
    target: "Ціль {t}",
    feeding: "Годування…",
    fed_ago: "Нагодовано {time} тому",
    ready: "Готово",
    topping_off: "Доливає",
    standby: "Очікування",
    level_ok: "Рівень OK",
    level_low: "Низький рівень",
    leak_detected: "Протікання!",
    dry: "Сухо",
    service_due: "Час",
    service_in: "Через {time}",
    ideal: "Норма {range}",
    max: "Макс. {v}",
    feed: "Нагодувати",
    confirm_filter_off: "Зупинити фільтр? Без потоку вода втрачає кисень, і риби можуть постраждати.",
    stop: "Зупинити",
    cancel: "Скасувати",
    zoom_in: "Показати подробиці",
    zoom_out: "Показати менше",
    water_temperature_high: "Вода занадто тепла: перевірте нагрівач, посильте рух поверхні та за потреби охолодіть кімнату",
    water_temperature_low: "Вода занадто холодна: перевірте нагрівач і його налаштування",
    ph_high: "pH занадто високий: перевірте KH і CO₂ та зробіть часткову підміну води",
    ph_low: "pH занадто низький: перевірте KH, аеруйте воду та зробіть часткову підміну води",
    ammonia_high: "Виявлено аміак, отруйний для риб: підмініть чверть води та годуйте менше",
    nitrite_high: "Виявлено нітрити, фільтр не встигає: підмініть трохи води й не промивайте наповнювачі",
    nitrate_high: "Високі нітрати: зробіть часткову підміну води та годуйте менше",
    phosphate_high: "Високі фосфати, ризик водоростей: годуйте менше й використовуйте засіб від фосфатів",
    kh_low: "Низька карбонатна жорсткість, pH може коливатися: підвищте лужність",
    salinity_high: "Солоність занадто висока: долийте свіжу осмотичну воду",
    salinity_low: "Солоність занадто низька: перевірте долив і додайте солону воду",
    oxygen_low: "Мало кисню: додайте аерацію та рух поверхні",
    generic_high: "{name} вище ідеального діапазону",
    generic_low: "{name} нижче ідеального діапазону",
    leak_tip: "Під акваріумом виявлено протікання води!",
    filter_stopped: "Фільтр зупинено",
    return_stopped: "Зворотну помпу зупинено",
    level_tip: "Низький рівень води: перевірте долив і самп",
    reservoir_low: "Резервуар доливу майже порожній: наповніть його",
    service_tip: "Потрібне обслуговування обладнання",
    no_entities: "Об'єктів акваріума не знайдено: виберіть простір або пристрій чи вкажіть об'єкти",
    unknown_device: "Невідомий пристрій",
    unknown_area: "Невідомий простір",
    area: "Простір",
    device: "Пристрій",
    area_helper: "Усі пристрої акваріума в цьому просторі",
    device_helper: "Пристрій акваріума (кілька через `devices` у YAML)",
    title: "Заголовок",
    kind: "Акваріум",
    kind_auto: "Автоматично",
    kind_reef: "Риф (морська вода)",
    kind_freshwater: "Прісна вода",
    volume: "Об'єм",
    entities: "Об'єкти",
    show_title: "Заголовок",
    show_subtitle: "Підзаголовок",
    illustration: "Ілюстрація",
    show_equipment: "Обладнання",
    show_quality: "Якість води",
    show_advice: "Поради",
    show_controls: "Кнопки",
    invert_level: "Інвертувати рівень води",
    invert_level_helper: "Для поплавця, увімкненого при низькій воді",
    zoom: "Кнопка подробиць",
    zoom_helper: "Перемикає міні-картку на повну й назад",
    illustration_theme: "Тема ілюстрації",
    theme_auto: "Автоматично (за темою)",
    theme_day: "День",
    theme_night: "Ніч",
    collapsed: "Згорнуті розділи",
    ranges: "Ідеальні діапазони",
    min_l: "мін.",
    max_l: "макс.",
    language: "Мова",
    lang_auto: "Автоматично (Home Assistant)",
    scene: "Сцена",
    scene_auto: "Автоматично",
    scene_reef: "Риф",
    scene_planted: "Травник",
    scene_iwagumi: "Івагумі",
    scene_blackwater: "Амазонська чорна вода",
    scene_malawi: "Озеро Малаві",
    scene_tanganyika: "Озеро Танганьїка",
    scene_shrimp: "Креветкарій",
    scene_betta: "Акваріум із півником",
    scene_goldfish: "Золоті рибки",
    scene_mangrove: "Солонувата мангрова",
    scene_pond: "Садовий ставок",
    scene_sps: "SPS-риф",
    scene_soft_coral: "М'які корали",
    scene_nano_reef: "Нанориф",
    scene_seahorse: "Морські коники",
    scene_jellyfish: "Медузи",
    scene_predator: "Лагуна хижаків",
    scene_wreck: "Уламки корабля і скарб",
    scene_abyss: "Безодня",
    scene_arctic: "Арктична крига",
    terrarium: "Тераріум",
    turtle_tank: "Акватераріум",
    kind_terrarium: "Тераріум",
    kind_turtle: "Акватераріум (черепахи)",
    climate: "Клімат",
    air_temperature: "Температура повітря",
    hot_spot: "Точка обігріву",
    cold_spot: "Прохолодна зона",
    humidity: "Вологість",
    uv_index: "УФ-індекс",
    basking: "Лампа обігріву",
    heat_mat: "Термокилимок",
    mister: "Система туману",
    uvb: "Лампа UVB",
    air_temperature_high: "Повітря надто тепле: перевірте термостат і провітріть тераріум.",
    air_temperature_low: "Повітря надто холодне: перевірте обігрів і термостат.",
    hot_spot_high: "Точка обігріву надто гаряча: підніміть лампу або зменште її потужність.",
    hot_spot_low: "Точка обігріву надто холодна: перевірте лампу обігріву, вона може бути зношена.",
    cold_spot_high: "Прохолодна зона надто тепла: перемістіть джерело тепла, щоб тварина могла охолонути.",
    cold_spot_low: "Прохолодна зона надто холодна: перевірте температуру в кімнаті й термокилимок.",
    humidity_high: "Надто волого: провітрюйте й обприскуйте рідше, щоб уникнути цвілі.",
    humidity_low: "Надто сухо: обприскуйте частіше або додайте вологе укриття для линьки.",
    uv_index_low: "УФ надто слабкий: замініть лампу UVB (кожні 6–12 місяців) або наблизьте її.",
    uv_index_high: "УФ надто сильний: підніміть лампу UVB і залиште затінену зону.",
    scene_desert: "Пустеля",
    scene_rainforest: "Тропічний ліс",
    scene_leopard_gecko: "Леопардовий еублефар",
    scene_chameleon: "Хамелеон",
    scene_ball_python: "Королівський пітон",
    scene_tarantula: "Птахоїд",
    scene_insects: "Паличники й богомоли",
    scene_crested_gecko: "Війчастий гекон",
    scene_paludarium: "Палюдаріум",
    scene_hermit_crab: "Раки-самітники",
    scene_axolotl: "Аксолотль",
    scene_turtle: "Водні черепахи",
    scene_tortoise: "Суходільна черепаха",
    scene_musk_turtle: "Мускусна черепаха",
    all_good_terra: "Клімат і обладнання в нормі",
  },
  hu: {
    reef: "Tengeri akvárium",
    freshwater: "Édesvízi akvárium",
    status_ok: "Minden rendben",
    status_warn: "Ellenőrizd az akváriumot",
    status_crit: "Beavatkozás szükséges",
    status_idle: "Nincs adat",
    water_quality: "Vízminőség",
    advice: "Tanácsok",
    all_good: "Víz és berendezések rendben",
    water_temperature: "Vízhőmérséklet",
    ph: "pH",
    ammonia: "Ammónia",
    nitrite: "Nitrit",
    nitrate: "Nitrát",
    phosphate: "Foszfát",
    kh: "Karbonátkeménység",
    gh: "Összkeménység",
    calcium: "Kalcium",
    magnesium: "Magnézium",
    salinity: "Sótartalom",
    orp: "Redox (ORP)",
    conductivity: "Vezetőképesség",
    tds: "TDS",
    oxygen: "Oldott oxigén",
    light: "Világítás",
    heater: "Fűtő",
    filter: "Szűrő",
    filter_speed: "Szűrő sebessége",
    wave_pump: "Áramoltató",
    return_pump: "Visszanyomó szivattyú",
    skimmer: "Fehérjefölöző",
    co2: "CO₂",
    air_pump: "Légpumpa",
    uv: "UV-sterilizáló",
    feeder: "Etető",
    ato: "Utántöltő",
    reservoir: "Tartály",
    water_level: "Vízszint",
    leak: "Szivárgás",
    dosing: "Adagolás",
    service: "Karbantartás",
    power: "Teljesítmény",
    on: "Be",
    off: "Ki",
    unavailable: "Nem elérhető",
    heating: "Fűt",
    idle: "Készenlét",
    running: "Működik",
    stopped: "Leállítva",
    daylight: "Nappali fény",
    moonlight: "Holdfény",
    lights_off: "Fények lekapcsolva",
    in_range: "Tartományban",
    too_high: "Túl magas",
    too_low: "Túl alacsony",
    target: "Cél {t}",
    feeding: "Etetés…",
    fed_ago: "Etetve {time} ezelőtt",
    ready: "Kész",
    topping_off: "Tölt",
    standby: "Készenlét",
    level_ok: "Szint OK",
    level_low: "Alacsony szint",
    leak_detected: "Szivárgás!",
    dry: "Száraz",
    service_due: "Esedékes",
    service_in: "{time} múlva",
    ideal: "Ideális {range}",
    max: "Max. {v}",
    feed: "Etetés",
    confirm_filter_off: "Leállítod a szűrőt? Áramlás nélkül a víz oxigént veszít, és a halak szenvedhetnek.",
    stop: "Leállítás",
    cancel: "Mégse",
    zoom_in: "Részletek",
    zoom_out: "Kevesebb",
    water_temperature_high: "Túl meleg a víz: ellenőrizd a fűtőt, mozgasd a felszínt, és szükség esetén hűtsd a szobát",
    water_temperature_low: "Túl hideg a víz: ellenőrizd a fűtőt és a beállítását",
    ph_high: "Túl magas pH: ellenőrizd a KH-t és a CO₂-t, és végezz részleges vízcserét",
    ph_low: "Túl alacsony pH: ellenőrizd a KH-t, levegőztesd a vizet és végezz részleges vízcserét",
    ammonia_high: "Ammónia mérhető, mérgező a halaknak: cseréld le a víz negyedét és etess kevesebbet",
    nitrite_high: "Nitrit mérhető, a szűrő nem bírja: cserélj egy kis vizet, a szűrőanyagot ne tisztítsd",
    nitrate_high: "Magas nitrát: végezz részleges vízcserét és etess kevesebbet",
    phosphate_high: "Magas foszfát, algaveszély: etess kevesebbet és használj foszfátmegkötőt",
    kh_low: "Alacsony karbonátkeménység, a pH ingadozhat: emeld a lúgosságot",
    salinity_high: "Túl magas sótartalom: tölts utána friss ozmózisvizet",
    salinity_low: "Túl alacsony sótartalom: ellenőrizd az utántöltőt és adj hozzá sós vizet",
    oxygen_low: "Kevés az oxigén: levegőztess és mozgasd a felszínt",
    generic_high: "{name} az ideális tartomány felett",
    generic_low: "{name} az ideális tartomány alatt",
    leak_tip: "Vízszivárgás az akvárium alatt!",
    filter_stopped: "A szűrő leállt",
    return_stopped: "A visszanyomó szivattyú leállt",
    level_tip: "Alacsony vízszint: ellenőrizd az utántöltőt és a sumpot",
    reservoir_low: "Az utántöltő tartálya majdnem üres: töltsd fel",
    service_tip: "Egy berendezés karbantartása esedékes",
    no_entities: "Nem található akvárium-entitás: válassz területet vagy eszközt, vagy add meg az entitásokat",
    unknown_device: "Ismeretlen eszköz",
    unknown_area: "Ismeretlen terület",
    area: "Terület",
    device: "Eszköz",
    area_helper: "Az akvárium összes eszköze ezen a területen",
    device_helper: "Az akvárium egy eszköze (több a `devices` kulccsal YAML-ben)",
    title: "Cím",
    kind: "Akvárium",
    kind_auto: "Automatikus",
    kind_reef: "Zátony (tengervíz)",
    kind_freshwater: "Édesvíz",
    volume: "Térfogat",
    entities: "Entitások",
    show_title: "Cím",
    show_subtitle: "Alcím",
    illustration: "Illusztráció",
    show_equipment: "Berendezések",
    show_quality: "Vízminőség",
    show_advice: "Tanácsok",
    show_controls: "Gombok",
    invert_level: "Vízszint megfordítása",
    invert_level_helper: "Úszókapcsolóhoz, amely alacsony víznél bekapcsol",
    zoom: "Részletek gomb",
    zoom_helper: "A minikártyát a teljes kártyára váltja és vissza",
    illustration_theme: "Az illusztráció témája",
    theme_auto: "Automatikus (a témát követi)",
    theme_day: "Nappal",
    theme_night: "Éjszaka",
    collapsed: "Összecsukott szakaszok",
    ranges: "Ideális tartományok",
    min_l: "min.",
    max_l: "max.",
    language: "Nyelv",
    lang_auto: "Automatikus (Home Assistant)",
    scene: "Jelenet",
    scene_auto: "Automatikus",
    scene_reef: "Zátony",
    scene_planted: "Növényes akvárium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazóniai feketevíz",
    scene_malawi: "Malawi-tó",
    scene_tanganyika: "Tanganyika-tó",
    scene_shrimp: "Garnélás akvárium",
    scene_betta: "Harcoshal-akvárium",
    scene_goldfish: "Aranyhalak",
    scene_mangrove: "Brakkvizes mangrove",
    scene_pond: "Kerti tó",
    scene_sps: "SPS-zátony",
    scene_soft_coral: "Lágykorallok",
    scene_nano_reef: "Nanozátony",
    scene_seahorse: "Csikóhalak",
    scene_jellyfish: "Medúzák",
    scene_predator: "Ragadozók lagúnája",
    scene_wreck: "Hajóroncs és kincs",
    scene_abyss: "Mélytenger",
    scene_arctic: "Sarki jég",
    terrarium: "Terrárium",
    turtle_tank: "Akvaterrárium",
    kind_terrarium: "Terrárium",
    kind_turtle: "Akvaterrárium (teknősök)",
    climate: "Klíma",
    air_temperature: "Levegő hőmérséklete",
    hot_spot: "Sütkérező pont",
    cold_spot: "Hűvös oldal",
    humidity: "Páratartalom",
    uv_index: "UV-index",
    basking: "Melegítő lámpa",
    heat_mat: "Fűtőszőnyeg",
    mister: "Párásító",
    uvb: "UVB-lámpa",
    air_temperature_high: "Túl meleg a levegő: ellenőrizze a termosztátot és szellőztessen.",
    air_temperature_low: "Túl hideg a levegő: ellenőrizze a fűtést és a termosztátot.",
    hot_spot_high: "Túl forró a sütkérező pont: emelje feljebb a lámpát vagy csökkentse a teljesítményét.",
    hot_spot_low: "Túl hűvös a sütkérező pont: ellenőrizze a melegítő lámpát, elhasználódhatott.",
    cold_spot_high: "Túl meleg a hűvös oldal: helyezze át a hőforrást, hogy az állat lehűlhessen.",
    cold_spot_low: "Túl hideg a hűvös oldal: ellenőrizze a szoba hőmérsékletét és a fűtőszőnyeget.",
    humidity_high: "Túl párás: szellőztessen és párásítson kevesebbet a penész ellen.",
    humidity_low: "Túl száraz: párásítson többet, vagy tegyen be nedves búvóhelyet a vedléshez.",
    uv_index_low: "Túl gyenge UV: cserélje az UVB-csövet (6–12 havonta), vagy tegye közelebb.",
    uv_index_high: "Túl erős UV: emelje feljebb az UVB-lámpát, és hagyjon árnyékos részt.",
    scene_desert: "Sivatag",
    scene_rainforest: "Esőerdő",
    scene_leopard_gecko: "Leopárdgekkó",
    scene_chameleon: "Kaméleon",
    scene_ball_python: "Királypiton",
    scene_tarantula: "Madárpók",
    scene_insects: "Botsáskák és imádkozó sáskák",
    scene_crested_gecko: "Pillásgekkó",
    scene_paludarium: "Paludárium",
    scene_hermit_crab: "Remeterákok",
    scene_axolotl: "Axolotl",
    scene_turtle: "Vízi teknősök",
    scene_tortoise: "Szárazföldi teknős",
    scene_musk_turtle: "Pézsmateknős",
    all_good_terra: "Klíma és berendezések rendben",
  },
  sk: {
    reef: "Morské akvárium",
    freshwater: "Sladkovodné akvárium",
    status_ok: "Všetko v poriadku",
    status_warn: "Skontrolujte akvárium",
    status_crit: "Treba zasiahnuť",
    status_idle: "Žiadne údaje",
    water_quality: "Kvalita vody",
    advice: "Rady",
    all_good: "Voda a vybavenie v poriadku",
    water_temperature: "Teplota vody",
    ph: "pH",
    ammonia: "Amoniak",
    nitrite: "Dusitany",
    nitrate: "Dusičnany",
    phosphate: "Fosforečnany",
    kh: "Uhličitanová tvrdosť",
    gh: "Celková tvrdosť",
    calcium: "Vápnik",
    magnesium: "Horčík",
    salinity: "Salinita",
    orp: "Redox (ORP)",
    conductivity: "Vodivosť",
    tds: "TDS",
    oxygen: "Rozpustený kyslík",
    light: "Osvetlenie",
    heater: "Ohrievač",
    filter: "Filter",
    filter_speed: "Rýchlosť filtra",
    wave_pump: "Prúdové čerpadlo",
    return_pump: "Vratné čerpadlo",
    skimmer: "Odpeňovač",
    co2: "CO₂",
    air_pump: "Vzduchovací motorček",
    uv: "UV sterilizátor",
    feeder: "Kŕmidlo",
    ato: "Dopĺňanie",
    reservoir: "Zásobník",
    water_level: "Hladina vody",
    leak: "Únik",
    dosing: "Dávkovanie",
    service: "Údržba",
    power: "Výkon",
    on: "Zapnuté",
    off: "Vypnuté",
    unavailable: "Nedostupné",
    heating: "Ohrieva",
    idle: "Nečinné",
    running: "Beží",
    stopped: "Zastavený",
    daylight: "Denné svetlo",
    moonlight: "Mesačné svetlo",
    lights_off: "Svetlá zhasnuté",
    in_range: "V rozsahu",
    too_high: "Príliš vysoko",
    too_low: "Príliš nízko",
    target: "Cieľ {t}",
    feeding: "Kŕmenie…",
    fed_ago: "Nakŕmené pred {time}",
    ready: "Pripravené",
    topping_off: "Dopĺňa",
    standby: "Pohotovosť",
    level_ok: "Hladina OK",
    level_low: "Nízka hladina",
    leak_detected: "Únik!",
    dry: "Sucho",
    service_due: "Teraz",
    service_in: "O {time}",
    ideal: "Ideálne {range}",
    max: "Max. {v}",
    feed: "Nakŕmiť",
    confirm_filter_off: "Zastaviť filter? Bez prúdenia voda stráca kyslík a ryby môžu trpieť.",
    stop: "Zastaviť",
    cancel: "Zrušiť",
    zoom_in: "Zobraziť podrobnosti",
    zoom_out: "Zobraziť menej",
    water_temperature_high: "Voda je príliš teplá: skontrolujte ohrievač, rozhýbte hladinu a podľa potreby ochlaďte miestnosť",
    water_temperature_low: "Voda je príliš studená: skontrolujte ohrievač a jeho nastavenie",
    ph_high: "pH je príliš vysoké: skontrolujte KH a CO₂ a urobte čiastočnú výmenu vody",
    ph_low: "pH je príliš nízke: skontrolujte KH, prevzdušnite vodu a urobte čiastočnú výmenu vody",
    ammonia_high: "Zistený amoniak, jedovatý pre ryby: vymeňte štvrtinu vody a kŕmte menej",
    nitrite_high: "Zistené dusitany, filter nestíha: vymeňte trochu vody a nečistite filtračné náplne",
    nitrate_high: "Vysoké dusičnany: urobte čiastočnú výmenu vody a kŕmte menej",
    phosphate_high: "Vysoké fosforečnany, riziko rias: kŕmte menej a použite odstraňovač fosforečnanov",
    kh_low: "Nízka uhličitanová tvrdosť, pH môže kolísať: zvýšte alkalitu",
    salinity_high: "Salinita je príliš vysoká: doplňte čerstvou osmotickou vodou",
    salinity_low: "Salinita je príliš nízka: skontrolujte dopĺňanie a pridajte slanú vodu",
    oxygen_low: "Málo kyslíka: pridajte prevzdušňovanie a pohyb hladiny",
    generic_high: "{name} nad ideálnym rozsahom",
    generic_low: "{name} pod ideálnym rozsahom",
    leak_tip: "Pod akváriom bol zistený únik vody!",
    filter_stopped: "Filter je zastavený",
    return_stopped: "Vratné čerpadlo je zastavené",
    level_tip: "Nízka hladina vody: skontrolujte dopĺňanie a sump",
    reservoir_low: "Zásobník dopĺňania je takmer prázdny: naplňte ho",
    service_tip: "Je potrebná údržba vybavenia",
    no_entities: "Nenašla sa žiadna entita akvária: vyberte oblasť alebo zariadenie, alebo zadajte entity",
    unknown_device: "Neznáme zariadenie",
    unknown_area: "Neznáma oblasť",
    area: "Oblasť",
    device: "Zariadenie",
    area_helper: "Všetky zariadenia akvária v tejto oblasti",
    device_helper: "Zariadenie akvária (viac cez `devices` v YAML)",
    title: "Názov",
    kind: "Akvárium",
    kind_auto: "Automaticky",
    kind_reef: "Útes (slaná voda)",
    kind_freshwater: "Sladká voda",
    volume: "Objem",
    entities: "Entity",
    show_title: "Názov",
    show_subtitle: "Podnadpis",
    illustration: "Ilustrácia",
    show_equipment: "Vybavenie",
    show_quality: "Kvalita vody",
    show_advice: "Rady",
    show_controls: "Tlačidlá",
    invert_level: "Obrátiť hladinu vody",
    invert_level_helper: "Pre plavák, ktorý je zapnutý pri nízkej vode",
    zoom: "Tlačidlo podrobností",
    zoom_helper: "Prepína minikartu na plnú kartu a späť",
    illustration_theme: "Téma ilustrácie",
    theme_auto: "Automaticky (podľa témy)",
    theme_day: "Deň",
    theme_night: "Noc",
    collapsed: "Zbalené sekcie",
    ranges: "Ideálne rozsahy",
    min_l: "min.",
    max_l: "max.",
    language: "Jazyk",
    lang_auto: "Automaticky (Home Assistant)",
    scene: "Scéna",
    scene_auto: "Automaticky",
    scene_reef: "Útes",
    scene_planted: "Rastlinné akvárium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonská čierna voda",
    scene_malawi: "Jazero Malawi",
    scene_tanganyika: "Jazero Tanganika",
    scene_shrimp: "Krevetárium",
    scene_betta: "Akvárium s bojovnicou",
    scene_goldfish: "Zlaté rybky",
    scene_mangrove: "Brakické mangrovy",
    scene_pond: "Záhradné jazierko",
    scene_sps: "Útes SPS",
    scene_soft_coral: "Mäkké koraly",
    scene_nano_reef: "Nano útes",
    scene_seahorse: "Koníky morské",
    scene_jellyfish: "Medúzy",
    scene_predator: "Lagúna predátorov",
    scene_wreck: "Vrak a poklad",
    scene_abyss: "Hlbiny",
    scene_arctic: "Polárny ľad",
    terrarium: "Terárium",
    turtle_tank: "Akvaterárium",
    kind_terrarium: "Terárium",
    kind_turtle: "Akvaterárium (korytnačky)",
    climate: "Klíma",
    air_temperature: "Teplota vzduchu",
    hot_spot: "Teplé miesto",
    cold_spot: "Chladná strana",
    humidity: "Vlhkosť",
    uv_index: "UV index",
    basking: "Vyhrievacia lampa",
    heat_mat: "Vyhrievacia podložka",
    mister: "Rosiaci systém",
    uvb: "UVB lampa",
    air_temperature_high: "Vzduch je príliš teplý: skontrolujte termostat a vyvetrajte terárium.",
    air_temperature_low: "Vzduch je príliš studený: skontrolujte kúrenie a termostat.",
    hot_spot_high: "Teplé miesto je príliš horúce: zdvihnite vyhrievaciu lampu alebo znížte výkon.",
    hot_spot_low: "Teplé miesto je príliš chladné: skontrolujte vyhrievaciu lampu, môže byť opotrebovaná.",
    cold_spot_high: "Chladná strana je príliš teplá: presuňte zdroj tepla, aby sa zviera mohlo ochladiť.",
    cold_spot_low: "Chladná strana je príliš studená: skontrolujte teplotu miestnosti a podložku.",
    humidity_high: "Príliš vlhko: vyvetrajte a menej rosiť, aby ste predišli plesni.",
    humidity_low: "Príliš sucho: viac rosiť alebo pridajte vlhký úkryt na zvliekanie.",
    uv_index_low: "UV je príliš slabé: vymeňte trubicu UVB (každých 6–12 mesiacov) alebo ju priblížte.",
    uv_index_high: "UV je príliš silné: zdvihnite lampu UVB a nechajte tienistú časť.",
    scene_desert: "Púšť",
    scene_rainforest: "Dažďový prales",
    scene_leopard_gecko: "Gekón leopardí",
    scene_chameleon: "Chameleón",
    scene_ball_python: "Pytón kráľovský",
    scene_tarantula: "Sklípkan",
    scene_insects: "Paličkovce a modlivky",
    scene_crested_gecko: "Pagekon riasnatý",
    scene_paludarium: "Paludárium",
    scene_hermit_crab: "Krabi pustovníci",
    scene_axolotl: "Axolotl",
    scene_turtle: "Vodné korytnačky",
    scene_tortoise: "Suchozemská korytnačka",
    scene_musk_turtle: "Pižmová korytnačka",
    all_good_terra: "Klíma a vybavenie v poriadku",
  },
  cs: {
    reef: "Mořské akvárium",
    freshwater: "Sladkovodní akvárium",
    status_ok: "Vše v pořádku",
    status_warn: "Zkontrolujte akvárium",
    status_crit: "Je třeba zasáhnout",
    status_idle: "Žádná data",
    water_quality: "Kvalita vody",
    advice: "Rady",
    all_good: "Voda a vybavení v pořádku",
    water_temperature: "Teplota vody",
    ph: "pH",
    ammonia: "Amoniak",
    nitrite: "Dusitany",
    nitrate: "Dusičnany",
    phosphate: "Fosforečnany",
    kh: "Uhličitanová tvrdost",
    gh: "Celková tvrdost",
    calcium: "Vápník",
    magnesium: "Hořčík",
    salinity: "Salinita",
    orp: "Redox (ORP)",
    conductivity: "Vodivost",
    tds: "TDS",
    oxygen: "Rozpuštěný kyslík",
    light: "Osvětlení",
    heater: "Topítko",
    filter: "Filtr",
    filter_speed: "Rychlost filtru",
    wave_pump: "Proudové čerpadlo",
    return_pump: "Vratné čerpadlo",
    skimmer: "Odpěňovač",
    co2: "CO₂",
    air_pump: "Vzduchovací motorek",
    uv: "UV sterilizátor",
    feeder: "Krmítko",
    ato: "Dolévání",
    reservoir: "Zásobník",
    water_level: "Hladina vody",
    leak: "Únik",
    dosing: "Dávkování",
    service: "Údržba",
    power: "Výkon",
    on: "Zapnuto",
    off: "Vypnuto",
    unavailable: "Nedostupné",
    heating: "Topí",
    idle: "Nečinné",
    running: "Běží",
    stopped: "Zastaveno",
    daylight: "Denní světlo",
    moonlight: "Měsíční světlo",
    lights_off: "Světla zhasnutá",
    in_range: "V rozsahu",
    too_high: "Příliš vysoko",
    too_low: "Příliš nízko",
    target: "Cíl {t}",
    feeding: "Krmení…",
    fed_ago: "Nakrmeno před {time}",
    ready: "Připraveno",
    topping_off: "Dolévá",
    standby: "Pohotovost",
    level_ok: "Hladina OK",
    level_low: "Nízká hladina",
    leak_detected: "Únik!",
    dry: "Sucho",
    service_due: "Nyní",
    service_in: "Za {time}",
    ideal: "Ideálně {range}",
    max: "Max. {v}",
    feed: "Nakrmit",
    confirm_filter_off: "Zastavit filtr? Bez proudění voda ztrácí kyslík a ryby mohou trpět.",
    stop: "Zastavit",
    cancel: "Zrušit",
    zoom_in: "Zobrazit podrobnosti",
    zoom_out: "Zobrazit méně",
    water_temperature_high: "Voda je příliš teplá: zkontrolujte topítko, rozpohybujte hladinu a podle potřeby ochlaďte místnost",
    water_temperature_low: "Voda je příliš studená: zkontrolujte topítko a jeho nastavení",
    ph_high: "pH je příliš vysoké: zkontrolujte KH a CO₂ a proveďte částečnou výměnu vody",
    ph_low: "pH je příliš nízké: zkontrolujte KH, provzdušněte vodu a proveďte částečnou výměnu vody",
    ammonia_high: "Zjištěn amoniak, jedovatý pro ryby: vyměňte čtvrtinu vody a krmte méně",
    nitrite_high: "Zjištěny dusitany, filtr nestíhá: vyměňte trochu vody a nečistěte filtrační náplně",
    nitrate_high: "Vysoké dusičnany: proveďte částečnou výměnu vody a krmte méně",
    phosphate_high: "Vysoké fosforečnany, riziko řas: krmte méně a použijte odstraňovač fosforečnanů",
    kh_low: "Nízká uhličitanová tvrdost, pH může kolísat: zvyšte alkalitu",
    salinity_high: "Salinita je příliš vysoká: dolijte čerstvou osmotickou vodu",
    salinity_low: "Salinita je příliš nízká: zkontrolujte dolévání a přidejte slanou vodu",
    oxygen_low: "Málo kyslíku: přidejte provzdušňování a pohyb hladiny",
    generic_high: "{name} nad ideálním rozsahem",
    generic_low: "{name} pod ideálním rozsahem",
    leak_tip: "Pod akváriem zjištěn únik vody!",
    filter_stopped: "Filtr je zastavený",
    return_stopped: "Vratné čerpadlo je zastavené",
    level_tip: "Nízká hladina vody: zkontrolujte dolévání a sump",
    reservoir_low: "Zásobník dolévání je téměř prázdný: naplňte ho",
    service_tip: "Je potřeba údržba vybavení",
    no_entities: "Nebyla nalezena žádná entita akvária: vyberte oblast nebo zařízení, nebo zadejte entity",
    unknown_device: "Neznámé zařízení",
    unknown_area: "Neznámá oblast",
    area: "Oblast",
    device: "Zařízení",
    area_helper: "Všechna zařízení akvária v této oblasti",
    device_helper: "Zařízení akvária (více přes `devices` v YAML)",
    title: "Název",
    kind: "Akvárium",
    kind_auto: "Automaticky",
    kind_reef: "Útes (slaná voda)",
    kind_freshwater: "Sladká voda",
    volume: "Objem",
    entities: "Entity",
    show_title: "Název",
    show_subtitle: "Podtitul",
    illustration: "Ilustrace",
    show_equipment: "Vybavení",
    show_quality: "Kvalita vody",
    show_advice: "Rady",
    show_controls: "Tlačítka",
    invert_level: "Obrátit hladinu vody",
    invert_level_helper: "Pro plovák, který je zapnutý při nízké vodě",
    zoom: "Tlačítko podrobností",
    zoom_helper: "Přepíná minikartu na plnou kartu a zpět",
    illustration_theme: "Motiv ilustrace",
    theme_auto: "Automaticky (podle motivu)",
    theme_day: "Den",
    theme_night: "Noc",
    collapsed: "Sbalené sekce",
    ranges: "Ideální rozsahy",
    min_l: "min.",
    max_l: "max.",
    language: "Jazyk",
    lang_auto: "Automaticky (Home Assistant)",
    scene: "Scéna",
    scene_auto: "Automaticky",
    scene_reef: "Útes",
    scene_planted: "Rostlinné akvárium",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonská černá voda",
    scene_malawi: "Jezero Malawi",
    scene_tanganyika: "Jezero Tanganika",
    scene_shrimp: "Krevetárium",
    scene_betta: "Akvárium s bojovnicí",
    scene_goldfish: "Závojnatky",
    scene_mangrove: "Brakické mangrovy",
    scene_pond: "Zahradní jezírko",
    scene_sps: "Útes SPS",
    scene_soft_coral: "Měkké korály",
    scene_nano_reef: "Nano útes",
    scene_seahorse: "Mořští koníci",
    scene_jellyfish: "Medúzy",
    scene_predator: "Laguna predátorů",
    scene_wreck: "Vrak a poklad",
    scene_abyss: "Hlubiny",
    scene_arctic: "Polární led",
    terrarium: "Terárium",
    turtle_tank: "Akvaterárium",
    kind_terrarium: "Terárium",
    kind_turtle: "Akvaterárium (želvy)",
    climate: "Klima",
    air_temperature: "Teplota vzduchu",
    hot_spot: "Výhřevné místo",
    cold_spot: "Chladná strana",
    humidity: "Vlhkost",
    uv_index: "UV index",
    basking: "Výhřevná lampa",
    heat_mat: "Topná podložka",
    mister: "Mlžení",
    uvb: "UVB lampa",
    air_temperature_high: "Vzduch je příliš teplý: zkontrolujte termostat a vyvětrejte terárium.",
    air_temperature_low: "Vzduch je příliš studený: zkontrolujte topení a termostat.",
    hot_spot_high: "Výhřevné místo je příliš horké: zvedněte výhřevnou lampu nebo snižte výkon.",
    hot_spot_low: "Výhřevné místo je příliš chladné: zkontrolujte výhřevnou lampu, může být opotřebovaná.",
    cold_spot_high: "Chladná strana je příliš teplá: přesuňte zdroj tepla, aby se zvíře mohlo ochladit.",
    cold_spot_low: "Chladná strana je příliš studená: zkontrolujte teplotu místnosti a topnou podložku.",
    humidity_high: "Příliš vlhko: vyvětrejte a méně mlžte, abyste předešli plísni.",
    humidity_low: "Příliš sucho: více mlžte nebo přidejte vlhký úkryt na svlékání.",
    uv_index_low: "UV je příliš slabé: vyměňte trubici UVB (každých 6–12 měsíců) nebo ji přibližte.",
    uv_index_high: "UV je příliš silné: zvedněte lampu UVB a nechte stinnou část.",
    scene_desert: "Poušť",
    scene_rainforest: "Deštný prales",
    scene_leopard_gecko: "Gekon leopardí",
    scene_chameleon: "Chameleon",
    scene_ball_python: "Krajta královská",
    scene_tarantula: "Sklípkan",
    scene_insects: "Strašilky a kudlanky",
    scene_crested_gecko: "Pagekon řasnatý",
    scene_paludarium: "Paludárium",
    scene_hermit_crab: "Krabi poustevníci",
    scene_axolotl: "Axolotl",
    scene_turtle: "Vodní želvy",
    scene_tortoise: "Suchozemská želva",
    scene_musk_turtle: "Pižmová želva",
    all_good_terra: "Klima a vybavení v pořádku",
  },
  sl: {
    reef: "Morski akvarij",
    freshwater: "Sladkovodni akvarij",
    status_ok: "Vse je v redu",
    status_warn: "Preverite akvarij",
    status_crit: "Potrebno je ukrepati",
    status_idle: "Ni podatkov",
    water_quality: "Kakovost vode",
    advice: "Nasveti",
    all_good: "Voda in oprema v redu",
    water_temperature: "Temperatura vode",
    ph: "pH",
    ammonia: "Amoniak",
    nitrite: "Nitriti",
    nitrate: "Nitrati",
    phosphate: "Fosfati",
    kh: "Karbonatna trdota",
    gh: "Skupna trdota",
    calcium: "Kalcij",
    magnesium: "Magnezij",
    salinity: "Slanost",
    orp: "Redoks (ORP)",
    conductivity: "Prevodnost",
    tds: "TDS",
    oxygen: "Raztopljeni kisik",
    light: "Osvetlitev",
    heater: "Grelec",
    filter: "Filter",
    filter_speed: "Hitrost filtra",
    wave_pump: "Tokovna črpalka",
    return_pump: "Povratna črpalka",
    skimmer: "Posnemalnik",
    co2: "CO₂",
    air_pump: "Zračna črpalka",
    uv: "UV sterilizator",
    feeder: "Hranilnik",
    ato: "Dolivanje",
    reservoir: "Rezervoar",
    water_level: "Gladina vode",
    leak: "Puščanje",
    dosing: "Doziranje",
    service: "Vzdrževanje",
    power: "Moč",
    on: "Vklopljeno",
    off: "Izklopljeno",
    unavailable: "Ni na voljo",
    heating: "Greje",
    idle: "Miruje",
    running: "Deluje",
    stopped: "Ustavljen",
    daylight: "Dnevna svetloba",
    moonlight: "Mesečina",
    lights_off: "Luči ugasnjene",
    in_range: "V območju",
    too_high: "Previsoko",
    too_low: "Prenizko",
    target: "Cilj {t}",
    feeding: "Hranjenje…",
    fed_ago: "Nahranjeno pred {time}",
    ready: "Pripravljeno",
    topping_off: "Doliva",
    standby: "Pripravljenost",
    level_ok: "Gladina OK",
    level_low: "Nizka gladina",
    leak_detected: "Puščanje!",
    dry: "Suho",
    service_due: "Zdaj",
    service_in: "Čez {time}",
    ideal: "Idealno {range}",
    max: "Najv. {v}",
    feed: "Nahrani",
    confirm_filter_off: "Ustavim filter? Brez pretoka voda izgublja kisik in ribe lahko trpijo.",
    stop: "Ustavi",
    cancel: "Prekliči",
    zoom_in: "Pokaži podrobnosti",
    zoom_out: "Pokaži manj",
    water_temperature_high: "Voda je pretopla: preverite grelec, razgibajte gladino in po potrebi ohladite prostor",
    water_temperature_low: "Voda je premrzla: preverite grelec in njegovo nastavitev",
    ph_high: "pH je previsok: preverite KH in CO₂ ter delno zamenjajte vodo",
    ph_low: "pH je prenizek: preverite KH, prezračite vodo in delno zamenjajte vodo",
    ammonia_high: "Zaznan amoniak, strupen za ribe: zamenjajte četrtino vode in hranite manj",
    nitrite_high: "Zaznani nitriti, filter ne dohaja: zamenjajte nekaj vode in ne čistite filtrirnih materialov",
    nitrate_high: "Visoki nitrati: delno zamenjajte vodo in hranite manj",
    phosphate_high: "Visoki fosfati, nevarnost alg: hranite manj in uporabite odstranjevalec fosfatov",
    kh_low: "Nizka karbonatna trdota, pH lahko niha: povečajte alkalnost",
    salinity_high: "Slanost je previsoka: dolijte svežo osmozno vodo",
    salinity_low: "Slanost je prenizka: preverite dolivanje in dodajte slano vodo",
    oxygen_low: "Malo kisika: dodajte prezračevanje in gibanje gladine",
    generic_high: "{name} nad idealnim območjem",
    generic_low: "{name} pod idealnim območjem",
    leak_tip: "Pod akvarijem je zaznano puščanje vode!",
    filter_stopped: "Filter je ustavljen",
    return_stopped: "Povratna črpalka je ustavljena",
    level_tip: "Nizka gladina vode: preverite dolivanje in samp",
    reservoir_low: "Rezervoar za dolivanje je skoraj prazen: napolnite ga",
    service_tip: "Potrebno je vzdrževanje opreme",
    no_entities: "Ni najdene entitete akvarija: izberite območje ali napravo ali navedite entitete",
    unknown_device: "Neznana naprava",
    unknown_area: "Neznano območje",
    area: "Območje",
    device: "Naprava",
    area_helper: "Vse naprave akvarija v tem območju",
    device_helper: "Naprava akvarija (več z `devices` v YAML)",
    title: "Naslov",
    kind: "Akvarij",
    kind_auto: "Samodejno",
    kind_reef: "Greben (slana voda)",
    kind_freshwater: "Sladka voda",
    volume: "Prostornina",
    entities: "Entitete",
    show_title: "Naslov",
    show_subtitle: "Podnaslov",
    illustration: "Ilustracija",
    show_equipment: "Oprema",
    show_quality: "Kakovost vode",
    show_advice: "Nasveti",
    show_controls: "Gumbi",
    invert_level: "Obrni gladino vode",
    invert_level_helper: "Za plovec, ki je vklopljen pri nizki vodi",
    zoom: "Gumb za podrobnosti",
    zoom_helper: "Preklopi mini kartico na polno kartico in nazaj",
    illustration_theme: "Tema ilustracije",
    theme_auto: "Samodejno (sledi temi)",
    theme_day: "Dan",
    theme_night: "Noč",
    collapsed: "Strnjeni razdelki",
    ranges: "Idealna območja",
    min_l: "najm.",
    max_l: "najv.",
    language: "Jezik",
    lang_auto: "Samodejno (Home Assistant)",
    scene: "Prizor",
    scene_auto: "Samodejno",
    scene_reef: "Greben",
    scene_planted: "Rastlinski akvarij",
    scene_iwagumi: "Iwagumi",
    scene_blackwater: "Amazonska črna voda",
    scene_malawi: "Jezero Malavi",
    scene_tanganyika: "Jezero Tanganjika",
    scene_shrimp: "Akvarij s kozicami",
    scene_betta: "Akvarij z bojevnico",
    scene_goldfish: "Zlate ribice",
    scene_mangrove: "Brakična mangrova",
    scene_pond: "Vrtni ribnik",
    scene_sps: "Greben SPS",
    scene_soft_coral: "Mehke korale",
    scene_nano_reef: "Nano greben",
    scene_seahorse: "Morski konjički",
    scene_jellyfish: "Meduze",
    scene_predator: "Laguna plenilcev",
    scene_wreck: "Razbitina in zaklad",
    scene_abyss: "Brezno",
    scene_arctic: "Polarni led",
    terrarium: "Terarij",
    turtle_tank: "Akvaterarij",
    kind_terrarium: "Terarij",
    kind_turtle: "Akvaterarij (želve)",
    climate: "Klima",
    air_temperature: "Temperatura zraka",
    hot_spot: "Topla točka",
    cold_spot: "Hladna stran",
    humidity: "Vlažnost",
    uv_index: "UV-indeks",
    basking: "Grelna svetilka",
    heat_mat: "Grelna podloga",
    mister: "Razpršilnik",
    uvb: "UVB-svetilka",
    air_temperature_high: "Zrak je pretopel: preverite termostat in prezračite terarij.",
    air_temperature_low: "Zrak je premrzel: preverite ogrevanje in termostat.",
    hot_spot_high: "Topla točka je prevroča: dvignite grelno svetilko ali zmanjšajte moč.",
    hot_spot_low: "Topla točka je prehladna: preverite grelno svetilko, morda je izrabljena.",
    cold_spot_high: "Hladna stran je pretopla: premaknite vir toplote, da se žival lahko ohladi.",
    cold_spot_low: "Hladna stran je premrzla: preverite temperaturo prostora in grelno podlogo.",
    humidity_high: "Prevlažno: prezračite in manj pršite, da preprečite plesen.",
    humidity_low: "Presuho: več pršite ali dodajte vlažno skrivališče za levitev.",
    uv_index_low: "UV je prešibak: zamenjajte cev UVB (na 6–12 mesecev) ali jo približajte.",
    uv_index_high: "UV je premočan: dvignite svetilko UVB in pustite senčen del.",
    scene_desert: "Puščava",
    scene_rainforest: "Deževni gozd",
    scene_leopard_gecko: "Leopardji gekon",
    scene_chameleon: "Kameleon",
    scene_ball_python: "Kraljevi piton",
    scene_tarantula: "Ptičjejeda pajek",
    scene_insects: "Paličnjaki in bogomolke",
    scene_crested_gecko: "Čopasti gekon",
    scene_paludarium: "Paludarij",
    scene_hermit_crab: "Raki samotarji",
    scene_axolotl: "Aksolotl",
    scene_turtle: "Vodne želve",
    scene_tortoise: "Kopenska želva",
    scene_musk_turtle: "Mošusna želva",
    all_good_terra: "Klima in oprema v redu",
  },
  lv: {
    reef: "Jūras akvārijs",
    freshwater: "Saldūdens akvārijs",
    status_ok: "Viss kārtībā",
    status_warn: "Pārbaudiet akvāriju",
    status_crit: "Jārīkojas",
    status_idle: "Nav datu",
    water_quality: "Ūdens kvalitāte",
    advice: "Padomi",
    all_good: "Ūdens un aprīkojums kārtībā",
    water_temperature: "Ūdens temperatūra",
    ph: "pH",
    ammonia: "Amonjaks",
    nitrite: "Nitrīti",
    nitrate: "Nitrāti",
    phosphate: "Fosfāti",
    kh: "Karbonātu cietība",
    gh: "Kopējā cietība",
    calcium: "Kalcijs",
    magnesium: "Magnijs",
    salinity: "Sāļums",
    orp: "Redokss (ORP)",
    conductivity: "Vadītspēja",
    tds: "TDS",
    oxygen: "Izšķīdušais skābeklis",
    light: "Apgaismojums",
    heater: "Sildītājs",
    filter: "Filtrs",
    filter_speed: "Filtra ātrums",
    wave_pump: "Straumes sūknis",
    return_pump: "Atgriezes sūknis",
    skimmer: "Putu atdalītājs",
    co2: "CO₂",
    air_pump: "Gaisa sūknis",
    uv: "UV sterilizators",
    feeder: "Barotava",
    ato: "Papildināšana",
    reservoir: "Rezervuārs",
    water_level: "Ūdens līmenis",
    leak: "Noplūde",
    dosing: "Dozēšana",
    service: "Apkope",
    power: "Jauda",
    on: "Ieslēgts",
    off: "Izslēgts",
    unavailable: "Nav pieejams",
    heating: "Silda",
    idle: "Gaida",
    running: "Darbojas",
    stopped: "Apturēts",
    daylight: "Dienasgaisma",
    moonlight: "Mēnesgaisma",
    lights_off: "Gaismas izslēgtas",
    in_range: "Diapazonā",
    too_high: "Pārāk augsts",
    too_low: "Pārāk zems",
    target: "Mērķis {t}",
    feeding: "Barošana…",
    fed_ago: "Pabarots pirms {time}",
    ready: "Gatavs",
    topping_off: "Papildina",
    standby: "Gaidstāve",
    level_ok: "Līmenis OK",
    level_low: "Zems līmenis",
    leak_detected: "Noplūde!",
    dry: "Sauss",
    service_due: "Jāveic tagad",
    service_in: "Pēc {time}",
    ideal: "Ideāli {range}",
    max: "Maks. {v}",
    feed: "Pabarot",
    confirm_filter_off: "Apturēt filtru? Bez plūsmas ūdens zaudē skābekli, un zivis var ciest.",
    stop: "Apturēt",
    cancel: "Atcelt",
    zoom_in: "Rādīt detaļas",
    zoom_out: "Rādīt mazāk",
    water_temperature_high: "Ūdens pārāk silts: pārbaudiet sildītāju, kustiniet virsmu un vajadzības gadījumā atvēsiniet telpu",
    water_temperature_low: "Ūdens pārāk auksts: pārbaudiet sildītāju un tā iestatījumu",
    ph_high: "pH pārāk augsts: pārbaudiet KH un CO₂ un veiciet daļēju ūdens maiņu",
    ph_low: "pH pārāk zems: pārbaudiet KH, aerējiet ūdeni un veiciet daļēju ūdens maiņu",
    ammonia_high: "Konstatēts amonjaks, toksisks zivīm: nomainiet ceturto daļu ūdens un barojiet mazāk",
    nitrite_high: "Konstatēti nitrīti, filtrs netiek galā: nomainiet nedaudz ūdens un netīriet filtra materiālus",
    nitrate_high: "Augsts nitrātu līmenis: veiciet daļēju ūdens maiņu un barojiet mazāk",
    phosphate_high: "Augsts fosfātu līmenis, aļģu risks: barojiet mazāk un izmantojiet fosfātu absorbentu",
    kh_low: "Zema karbonātu cietība, pH var svārstīties: paaugstiniet sārmainību",
    salinity_high: "Pārāk augsts sāļums: papildiniet ar svaigu osmozes ūdeni",
    salinity_low: "Pārāk zems sāļums: pārbaudiet papildināšanu un pievienojiet sālsūdeni",
    oxygen_low: "Maz skābekļa: pievienojiet aerāciju un virsmas kustību",
    generic_high: "{name} virs ideālā diapazona",
    generic_low: "{name} zem ideālā diapazona",
    leak_tip: "Zem akvārija konstatēta ūdens noplūde!",
    filter_stopped: "Filtrs ir apturēts",
    return_stopped: "Atgriezes sūknis ir apturēts",
    level_tip: "Zems ūdens līmenis: pārbaudiet papildināšanu un sampu",
    reservoir_low: "Papildināšanas rezervuārs gandrīz tukšs: piepildiet to",
    service_tip: "Nepieciešama aprīkojuma apkope",
    no_entities: "Nav atrasta neviena akvārija entītija: izvēlieties apgabalu vai ierīci vai norādiet entītijas",
    unknown_device: "Nezināma ierīce",
    unknown_area: "Nezināms apgabals",
    area: "Apgabals",
    device: "Ierīce",
    area_helper: "Visas akvārija ierīces šajā apgabalā",
    device_helper: "Akvārija ierīce (vairākas ar `devices` YAML)",
    title: "Virsraksts",
    kind: "Akvārijs",
    kind_auto: "Automātiski",
    kind_reef: "Rifs (sālsūdens)",
    kind_freshwater: "Saldūdens",
    volume: "Tilpums",
    entities: "Entītijas",
    show_title: "Virsraksts",
    show_subtitle: "Apakšvirsraksts",
    illustration: "Ilustrācija",
    show_equipment: "Aprīkojums",
    show_quality: "Ūdens kvalitāte",
    show_advice: "Padomi",
    show_controls: "Pogas",
    invert_level: "Apgriezt ūdens līmeni",
    invert_level_helper: "Pludiņam, kas ieslēdzas zemā ūdenī",
    zoom: "Detaļu poga",
    zoom_helper: "Pārslēdz mini karti uz pilno karti un atpakaļ",
    illustration_theme: "Ilustrācijas tēma",
    theme_auto: "Automātiski (seko tēmai)",
    theme_day: "Diena",
    theme_night: "Nakts",
    collapsed: "Sakļautās sadaļas",
    ranges: "Ideālie diapazoni",
    min_l: "min.",
    max_l: "maks.",
    language: "Valoda",
    lang_auto: "Automātiski (Home Assistant)",
    scene: "Aina",
    scene_auto: "Automātiski",
    scene_reef: "Rifs",
    scene_planted: "Augu akvārijs",
    scene_iwagumi: "Ivagumi",
    scene_blackwater: "Amazones melnais ūdens",
    scene_malawi: "Malāvi ezers",
    scene_tanganyika: "Tanganikas ezers",
    scene_shrimp: "Garneļu akvārijs",
    scene_betta: "Cīņas zivtiņu akvārijs",
    scene_goldfish: "Zelta zivtiņas",
    scene_mangrove: "Iesāļa mangrove",
    scene_pond: "Dārza dīķis",
    scene_sps: "SPS rifs",
    scene_soft_coral: "Mīkstie koraļļi",
    scene_nano_reef: "Nano rifs",
    scene_seahorse: "Jūras zirdziņi",
    scene_jellyfish: "Medūzas",
    scene_predator: "Plēsēju lagūna",
    scene_wreck: "Vraks un dārgums",
    scene_abyss: "Dzīles",
    scene_arctic: "Polārais ledus",
    terrarium: "Terārijs",
    turtle_tank: "Akvaterārijs",
    kind_terrarium: "Terārijs",
    kind_turtle: "Akvaterārijs (bruņurupuči)",
    climate: "Klimats",
    air_temperature: "Gaisa temperatūra",
    hot_spot: "Sildīšanās vieta",
    cold_spot: "Vēsā puse",
    humidity: "Mitrums",
    uv_index: "UV indekss",
    basking: "Sildlampa",
    heat_mat: "Sildpaklājs",
    mister: "Smidzinātājs",
    uvb: "UVB lampa",
    air_temperature_high: "Gaiss par siltu: pārbaudiet termostatu un izvēdiniet terāriju.",
    air_temperature_low: "Gaiss par aukstu: pārbaudiet apkuri un termostatu.",
    hot_spot_high: "Sildīšanās vieta par karstu: paceliet sildlampu vai samaziniet jaudu.",
    hot_spot_low: "Sildīšanās vieta par vēsu: pārbaudiet sildlampu, tā var būt nolietojusies.",
    cold_spot_high: "Vēsā puse par siltu: pārvietojiet siltuma avotu, lai dzīvnieks varētu atvēsināties.",
    cold_spot_low: "Vēsā puse par aukstu: pārbaudiet telpas temperatūru un sildpaklāju.",
    humidity_high: "Par mitru: izvēdiniet un smidziniet mazāk, lai novērstu pelējumu.",
    humidity_low: "Par sausu: smidziniet vairāk vai pievienojiet mitru slēptuvi ādas maiņai.",
    uv_index_low: "UV par vāju: nomainiet UVB cauruli (ik pēc 6–12 mēnešiem) vai pietuviniet to.",
    uv_index_high: "UV par stipru: paceliet UVB lampu un atstājiet ēnainu vietu.",
    scene_desert: "Tuksnesis",
    scene_rainforest: "Lietusmežs",
    scene_leopard_gecko: "Leoparda gekons",
    scene_chameleon: "Hameleons",
    scene_ball_python: "Karaliskais pitons",
    scene_tarantula: "Tarantula",
    scene_insects: "Spoku sienāži un dievlūdzēji",
    scene_crested_gecko: "Skropstainais gekons",
    scene_paludarium: "Paludārijs",
    scene_hermit_crab: "Vientuļnieku vēži",
    scene_axolotl: "Aksolotls",
    scene_turtle: "Ūdens bruņurupuči",
    scene_tortoise: "Sauszemes bruņurupucis",
    scene_musk_turtle: "Muskusa bruņurupucis",
    all_good_terra: "Klimats un aprīkojums kārtībā",
  },
  el: {
    reef: "Θαλασσινό ενυδρείο",
    freshwater: "Ενυδρείο γλυκού νερού",
    status_ok: "Όλα καλά",
    status_warn: "Ελέγξτε το ενυδρείο",
    status_crit: "Απαιτείται ενέργεια",
    status_idle: "Χωρίς δεδομένα",
    water_quality: "Ποιότητα νερού",
    advice: "Συμβουλές",
    all_good: "Νερό και εξοπλισμός εντάξει",
    water_temperature: "Θερμοκρασία νερού",
    ph: "pH",
    ammonia: "Αμμωνία",
    nitrite: "Νιτρώδη",
    nitrate: "Νιτρικά",
    phosphate: "Φωσφορικά",
    kh: "Ανθρακική σκληρότητα",
    gh: "Ολική σκληρότητα",
    calcium: "Ασβέστιο",
    magnesium: "Μαγνήσιο",
    salinity: "Αλατότητα",
    orp: "Redox (ORP)",
    conductivity: "Αγωγιμότητα",
    tds: "TDS",
    oxygen: "Διαλυμένο οξυγόνο",
    light: "Φωτισμός",
    heater: "Θερμαντήρας",
    filter: "Φίλτρο",
    filter_speed: "Ταχύτητα φίλτρου",
    wave_pump: "Αντλία ρεύματος",
    return_pump: "Αντλία επιστροφής",
    skimmer: "Αφρίστρα",
    co2: "CO₂",
    air_pump: "Αντλία αέρα",
    uv: "Αποστειρωτής UV",
    feeder: "Ταΐστρα",
    ato: "Αναπλήρωση",
    reservoir: "Δεξαμενή",
    water_level: "Στάθμη νερού",
    leak: "Διαρροή",
    dosing: "Δοσομέτρηση",
    service: "Συντήρηση",
    power: "Ισχύς",
    on: "Ενεργό",
    off: "Ανενεργό",
    unavailable: "Μη διαθέσιμο",
    heating: "Θερμαίνει",
    idle: "Σε αναμονή",
    running: "Λειτουργεί",
    stopped: "Σταματημένο",
    daylight: "Φως ημέρας",
    moonlight: "Σεληνόφως",
    lights_off: "Φώτα σβηστά",
    in_range: "Εντός ορίων",
    too_high: "Πολύ υψηλό",
    too_low: "Πολύ χαμηλό",
    target: "Στόχος {t}",
    feeding: "Τάισμα…",
    fed_ago: "Ταΐστηκαν πριν από {time}",
    ready: "Έτοιμο",
    topping_off: "Αναπληρώνει",
    standby: "Αναμονή",
    level_ok: "Στάθμη OK",
    level_low: "Χαμηλή στάθμη",
    leak_detected: "Διαρροή!",
    dry: "Στεγνό",
    service_due: "Τώρα",
    service_in: "Σε {time}",
    ideal: "Ιδανικά {range}",
    max: "Μέγ. {v}",
    feed: "Τάισμα",
    confirm_filter_off: "Διακοπή του φίλτρου; Χωρίς ροή το νερό χάνει οξυγόνο και τα ψάρια μπορεί να υποφέρουν.",
    stop: "Διακοπή",
    cancel: "Ακύρωση",
    zoom_in: "Εμφάνιση λεπτομερειών",
    zoom_out: "Εμφάνιση λιγότερων",
    water_temperature_high: "Το νερό είναι πολύ ζεστό: ελέγξτε τον θερμαντήρα, κινήστε την επιφάνεια και δροσίστε το δωμάτιο αν χρειάζεται",
    water_temperature_low: "Το νερό είναι πολύ κρύο: ελέγξτε τον θερμαντήρα και τη ρύθμισή του",
    ph_high: "Πολύ υψηλό pH: ελέγξτε το KH και το CO₂ και κάντε μερική αλλαγή νερού",
    ph_low: "Πολύ χαμηλό pH: ελέγξτε το KH, οξυγονώστε το νερό και κάντε μερική αλλαγή νερού",
    ammonia_high: "Εντοπίστηκε αμμωνία, τοξική για τα ψάρια: αλλάξτε το ένα τέταρτο του νερού και ταΐστε λιγότερο",
    nitrite_high: "Εντοπίστηκαν νιτρώδη, το φίλτρο δεν προλαβαίνει: αλλάξτε λίγο νερό χωρίς να καθαρίσετε τα υλικά φίλτρου",
    nitrate_high: "Υψηλά νιτρικά: κάντε μερική αλλαγή νερού και ταΐστε λιγότερο",
    phosphate_high: "Υψηλά φωσφορικά, κίνδυνος για φύκια: ταΐστε λιγότερο και χρησιμοποιήστε απορροφητικό φωσφορικών",
    kh_low: "Χαμηλή ανθρακική σκληρότητα, το pH μπορεί να κυμαίνεται: αυξήστε την αλκαλικότητα",
    salinity_high: "Πολύ υψηλή αλατότητα: αναπληρώστε με φρέσκο νερό αντίστροφης όσμωσης",
    salinity_low: "Πολύ χαμηλή αλατότητα: ελέγξτε την αναπλήρωση και προσθέστε αλμυρό νερό",
    oxygen_low: "Χαμηλό οξυγόνο: προσθέστε αερισμό και κίνηση στην επιφάνεια",
    generic_high: "{name} πάνω από το ιδανικό εύρος",
    generic_low: "{name} κάτω από το ιδανικό εύρος",
    leak_tip: "Εντοπίστηκε διαρροή νερού κάτω από το ενυδρείο!",
    filter_stopped: "Το φίλτρο είναι σταματημένο",
    return_stopped: "Η αντλία επιστροφής είναι σταματημένη",
    level_tip: "Χαμηλή στάθμη νερού: ελέγξτε την αναπλήρωση και το sump",
    reservoir_low: "Η δεξαμενή αναπλήρωσης είναι σχεδόν άδεια: γεμίστε την",
    service_tip: "Απαιτείται συντήρηση εξοπλισμού",
    no_entities: "Δεν βρέθηκε οντότητα ενυδρείου: επιλέξτε περιοχή ή συσκευή ή ορίστε τις οντότητες",
    unknown_device: "Άγνωστη συσκευή",
    unknown_area: "Άγνωστη περιοχή",
    area: "Περιοχή",
    device: "Συσκευή",
    area_helper: "Όλες οι συσκευές του ενυδρείου σε αυτήν την περιοχή",
    device_helper: "Μια συσκευή του ενυδρείου (περισσότερες με `devices` σε YAML)",
    title: "Τίτλος",
    kind: "Ενυδρείο",
    kind_auto: "Αυτόματα",
    kind_reef: "Ύφαλος (αλμυρό νερό)",
    kind_freshwater: "Γλυκό νερό",
    volume: "Όγκος",
    entities: "Οντότητες",
    show_title: "Τίτλος",
    show_subtitle: "Υπότιτλος",
    illustration: "Εικονογράφηση",
    show_equipment: "Εξοπλισμός",
    show_quality: "Ποιότητα νερού",
    show_advice: "Συμβουλές",
    show_controls: "Κουμπιά",
    invert_level: "Αντιστροφή στάθμης νερού",
    invert_level_helper: "Για φλοτέρ που είναι ενεργό όταν το νερό είναι χαμηλά",
    zoom: "Κουμπί λεπτομερειών",
    zoom_helper: "Εναλλάσσει τη μίνι κάρτα με την πλήρη κάρτα",
    illustration_theme: "Θέμα εικονογράφησης",
    theme_auto: "Αυτόματο (ακολουθεί το θέμα)",
    theme_day: "Ημέρα",
    theme_night: "Νύχτα",
    collapsed: "Συμπτυγμένες ενότητες",
    ranges: "Ιδανικά εύρη",
    min_l: "ελάχ.",
    max_l: "μέγ.",
    language: "Γλώσσα",
    lang_auto: "Αυτόματα (Home Assistant)",
    scene: "Σκηνή",
    scene_auto: "Αυτόματα",
    scene_reef: "Ύφαλος",
    scene_planted: "Φυτεμένο ενυδρείο",
    scene_iwagumi: "Ιουαγκούμι",
    scene_blackwater: "Αμαζόνιο μαύρα νερά",
    scene_malawi: "Λίμνη Μαλάουι",
    scene_tanganyika: "Λίμνη Τανγκανίκα",
    scene_shrimp: "Ενυδρείο γαρίδων",
    scene_betta: "Ενυδρείο betta",
    scene_goldfish: "Χρυσόψαρα",
    scene_mangrove: "Υφάλμυρο μαγκρόβιο",
    scene_pond: "Λιμνούλα κήπου",
    scene_sps: "Ύφαλος SPS",
    scene_soft_coral: "Μαλακά κοράλλια",
    scene_nano_reef: "Νάνο ύφαλος",
    scene_seahorse: "Ιππόκαμποι",
    scene_jellyfish: "Μέδουσες",
    scene_predator: "Λιμνοθάλασσα θηρευτών",
    scene_wreck: "Ναυάγιο και θησαυρός",
    scene_abyss: "Άβυσσος",
    scene_arctic: "Αρκτικός πάγος",
    terrarium: "Τεράριουμ",
    turtle_tank: "Ακουατεράριουμ",
    kind_terrarium: "Τεράριουμ",
    kind_turtle: "Ακουατεράριουμ (χελώνες)",
    climate: "Κλίμα",
    air_temperature: "Θερμοκρασία αέρα",
    hot_spot: "Θερμό σημείο",
    cold_spot: "Δροσερή πλευρά",
    humidity: "Υγρασία",
    uv_index: "Δείκτης UV",
    basking: "Λάμπα θέρμανσης",
    heat_mat: "Θερμαντικό στρώμα",
    mister: "Ψεκαστήρας",
    uvb: "Λάμπα UVB",
    air_temperature_high: "Ο αέρας είναι πολύ ζεστός: ελέγξτε τον θερμοστάτη και αερίστε το τεράριουμ.",
    air_temperature_low: "Ο αέρας είναι πολύ κρύος: ελέγξτε τη θέρμανση και τον θερμοστάτη.",
    hot_spot_high: "Το θερμό σημείο είναι πολύ καυτό: ανεβάστε τη λάμπα θέρμανσης ή μειώστε την ισχύ της.",
    hot_spot_low: "Το θερμό σημείο είναι πολύ δροσερό: ελέγξτε τη λάμπα θέρμανσης, μπορεί να έχει φθαρεί.",
    cold_spot_high: "Η δροσερή πλευρά είναι πολύ ζεστή: μετακινήστε την πηγή θερμότητας ώστε το ζώο να δροσίζεται.",
    cold_spot_low: "Η δροσερή πλευρά είναι πολύ κρύα: ελέγξτε τη θερμοκρασία του δωματίου και το στρώμα.",
    humidity_high: "Πολύ υγρό: αερίστε και ψεκάζετε λιγότερο για να αποφύγετε τη μούχλα.",
    humidity_low: "Πολύ ξηρό: ψεκάζετε περισσότερο ή προσθέστε υγρή κρυψώνα για την έκδυση.",
    uv_index_low: "Πολύ αδύναμη UV: αντικαταστήστε τον σωλήνα UVB (κάθε 6–12 μήνες) ή φέρτε τον πιο κοντά.",
    uv_index_high: "Πολύ ισχυρή UV: ανεβάστε τη λάμπα UVB και αφήστε σκιερό σημείο.",
    scene_desert: "Έρημος",
    scene_rainforest: "Τροπικό δάσος",
    scene_leopard_gecko: "Γκέκο λεοπάρδαλη",
    scene_chameleon: "Χαμαιλέοντας",
    scene_ball_python: "Βασιλικός πύθωνας",
    scene_tarantula: "Ταραντούλα",
    scene_insects: "Ραβδόμορφα έντομα και αλογάκια της Παναγίας",
    scene_crested_gecko: "Γκέκο με λοφίο",
    scene_paludarium: "Παλουδάριουμ",
    scene_hermit_crab: "Ερημίτες κάβουρες",
    scene_axolotl: "Αξόλοτλ",
    scene_turtle: "Υδρόβιες χελώνες",
    scene_tortoise: "Χερσαία χελώνα",
    scene_musk_turtle: "Χελώνα μόσχου",
    all_good_terra: "Κλίμα και εξοπλισμός OK",
  },
};

const LANGUAGES = [
  ["en", "English"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["es", "Español"],
  ["sr", "Српски"],
  ["sr-Latn", "Srpski (latinica)"],
  ["it", "Italiano"],
  ["nl", "Nederlands"],
  ["pt", "Português (Portugal)"],
  ["pl", "Polski"],
  ["ro", "Română"],
  ["da", "Dansk"],
  ["sv", "Svenska"],
  ["bg", "Български"],
  ["ru", "Русский"],
  ["uk", "Українська"],
  ["hu", "Magyar"],
  ["sk", "Slovenčina"],
  ["cs", "Čeština"],
  ["sl", "Slovenščina"],
  ["lv", "Latviešu"],
  ["el", "Ελληνικά"],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const lang = (hass, config) => {
  const l = config?.language || (hass && (hass.locale?.language || hass.language)) || "en";
  return STRINGS[l] ? l : STRINGS[l.split("-")[0]] ? l.split("-")[0] : "en";
};

// Locale for Intl: the card's language, keeping HA's region when its base matches (pt-BR, de-CH); a bare "pt"
// (European Portuguese) becomes "pt-PT", otherwise Intl formats it the Brazilian way.
const intlLocale = (hass, config) => {
  const l = lang(hass, config);
  const src = config?.language || (hass && (hass.locale?.language || hass.language)) || "";
  const out = src && src.split("-")[0] === l.split("-")[0] ? src : l;
  return out === "pt" ? "pt-PT" : out;
};

const t = (hass, config, key, vars = {}) =>
  String(STRINGS[lang(hass, config)][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const valid = (s) => !!s && !["unknown", "unavailable", ""].includes(s.state);
const num = (s) => {
  if (!valid(s)) return null;
  const v = parseFloat(s.state);
  return Number.isFinite(v) ? v : null;
};
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const svgIcon = (path, cls = "") => `<svg class="icon${cls ? ` ${cls}` : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
const domainOf = (id) => String(id || "").split(".")[0];
const fmtNum = (v, digits, locale) =>
  v === null || v === undefined ? "—" : Number(v).toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
const c2f = (c) => (c * 9) / 5 + 32;
const UNIT_FMT = {};
const fmtUnit = (v, unit, locale) => (UNIT_FMT[`${locale}|${unit}`] ??= new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "short" })).format(v);
// A duration as "12 min", "3 hr" or "2 days" (Intl units in the card's language).
const fmtDuration = (ms, locale) => {
  const min = Math.max(0, Math.round(ms / 60000));
  if (min < 60) return fmtUnit(min, "minute", locale);
  const h = Math.round(min / 60);
  if (h < 48) return fmtUnit(h, "hour", locale);
  return fmtUnit(Math.round(h / 24), "day", locale);
};
// A value with its unit, as the sensor gives it (a percentage without decimals).
const fmtState = (s, locale, digits) => {
  const v = num(s);
  const unit = s?.attributes?.unit_of_measurement || "";
  if (v === null) return valid(s) ? String(s.state) : "—";
  const d = digits ?? (unit === "%" || Number.isInteger(v) ? 0 : 1);
  return `${fmtNum(v, d, locale)}${unit ? ` ${unit}` : ""}`;
};

// ---------------------------------------------------------------------------
// Shadow DOM patching (kept nodes keep their focus, hover and running animations)
// ---------------------------------------------------------------------------

// The tank is animated: rewriting the whole card on every update of Home Assistant would restart every fish and
// every bubble several times a second. The new HTML is patched into the old one instead, node by node.
const patchAttrs = (cur, next) => {
  for (const { name } of [...cur.attributes]) if (!next.hasAttribute(name)) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
};
const keyOf = (n) => (n.nodeType === 1 ? n.getAttribute("data-key") : null);
const sameNode = (a, b) => !!a && a.nodeType === b.nodeType && a.nodeName === b.nodeName;
const patchChildren = (cur, next) => {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = keyOf(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = keyOf(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!sameNode(o, n) || used.has(o) || (k === null && keyOf(o) !== null) || (k !== null && keyOf(o) !== k)) o = null;
    const ref = cur.childNodes[i] ?? null;
    if (!o) {
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType === 1) {
      patchAttrs(o, n);
      patchChildren(o, n);
    } else if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
};
// Patches the shadow root with `html`; without a DOM (unit tests), the HTML is set as is.
const morph = (root, html) => {
  const tpl = typeof document !== "undefined" ? document.createElement("template") : null;
  if (!tpl?.content || !root.childNodes) {
    root.innerHTML = html;
    return;
  }
  tpl.innerHTML = html;
  patchChildren(root, tpl.content);
};

// ---------------------------------------------------------------------------
// Entity roles and discovery
// ---------------------------------------------------------------------------

// What the card can show, one entity each. The water measures first: they are the gauges, in this order.
const METRIC_ROLES = [
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
const EQUIPMENT_ROLES = [
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
const ROLES = [...METRIC_ROLES, ...EQUIPMENT_ROLES];
const SECTIONS = ["quality", "advice"];
const DEFAULT_COLLAPSED = ["advice"];
// Short labels of the measures (chemical symbols, the same in every language) for the mini card's pills.
const SHORT = {
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
const AQUA_METRICS = METRIC_ROLES.slice(0, 15);
const KIND_METRICS = {
  reef: AQUA_METRICS,
  freshwater: AQUA_METRICS,
  terrarium: ["air_temperature", "hot_spot", "cold_spot", "humidity", "uv_index", "water_temperature", "ph"],
  turtle: ["water_temperature", "hot_spot", "air_temperature", "humidity", "uv_index", "ph", "ammonia", "nitrite", "nitrate", "kh", "gh", "conductivity", "tds", "oxygen"],
};
const KINDS = Object.keys(KIND_METRICS);
const TEMP_ROLES = new Set(["water_temperature", "air_temperature", "hot_spot", "cold_spot"]);
const WATER_KINDS = new Set(["reef", "freshwater", "turtle"]);

// Words of the entity ids and names, in the languages of the integrations and of ESPHome / template entities.
const W = (words) => new RegExp(`(^|[^a-z0-9])(${words})([^a-z0-9]|$)`);
const LEAK_RE = /leak|fuite|leck|fuga|perdita|lekk|wasser.?alarm|water.?alarm/;
const LEVEL_RE = /level|niveau|pegel|nivel|livello|float|flotteur|schwimmer|sump.?low/;
const ATO_RE = W("ato|auto.?top.?off|top.?off|topoff|osmo\\w*|nachfull\\w*|refill|rabbocco|rellenado|remplissage|reefato\\+?|ato\\+");
const RESERVOIR_RE = /reservoir|reserv|tank.?level|container|vorrat|deposito|serbatoio|bidon/;
const FEED_RE = /feed|feeder|futter|nourri|aliment|comedero|mangiatoia|voer|food|fuetter/;
const SERVICE_RE = /service|maintenance|entretien|wartung|mantenimiento|manutenzione|onderhoud|filter.?change|clean/;
const DOSING_RE = /dos(e|ing|age|er|eur|ier|ierung|ificador)|remaining|restant|verbleib|container|daily.?volume|supplement/;
const HEAT_RE = /heat|heater|chauff|heiz|calent|riscald|verwarm|thermo/;
const CO2_RE = W("co2|co₂|kohlendioxid|carbon.?dioxide");
const UV_RE = W("uv|uvc|uv.?c|uvb|uva|uv.?b|uv.?a|sterili[sz]er|steriliser|klarer|clarifier|reeflex\\w*");
const SKIMMER_RE = /skimmer|abschaum|ecumeur|espumador|schiumatoio/;
const WAVE_RE = /wave|vortech|stream|circulat|powerhead|gyre|stromung|stroemung|brassage|courant|onda|nero|mp\d\d/;
const RETURN_RE = /return|retour|ruckfoerder|ruckforder|rucklauf|reefrun|vectra|remontee|riflusso/;
const AIR_RE = /air.?pump|airpump|air.?stone|bulleur|aerat|luftpumpe|sauerstoffpumpe|aireador|oxygen.?pump|diffuser.?air/;
// Short brand words and "led" as whole words only: "enabled", "scheduled" or "primed" are no lights.
const LIGHT_RE = /light|lamp|lumi|eclair|licht|beleucht|luz|luce|verlicht|helialux|radion|reefled|(^|[^a-z])(hydra|prime|leds?)([^a-z]|$)/;
const FILTER_RE = /filter|filtre|filtro|pump|pompe|pumpe|bomba|canister|vario|professionel/;
const SPEED_RE = /speed|vitesse|drehzahl|velocidad|velocita|snelheid|rpm|flow|debit/;
const ROOM_RE = W("air|room|ambient|ambiance|outdoor|outside|exterieur|ambiante|piece|raum|aussen|luft|aria|aire|lucht|powietrz\\w*|vzduch\\w*");
// The temperature of a controller's chip is never the tank's.
const CHIP_RE = W("cpu|chip|board|internal|interne|controller|esp32|esp8266|soc|processor");
// A terrarium's warm and cool sides.
const HOT_RE = /hot|warm|bask|spot|chaud|sonnen|heiss|caliente|caldo|calda|heet|goracy|gorac|horuc|toply|топл|горяч|θερμ/;
const COLD_RE = /cold|cool|froid|frais|fraiche|kalt|kuhl|frio|freddo|fredda|koud|koel|zimn|chlad|холод|ψυχρ/;
const HUMID_RE = /humid|hygro|feucht|umid|vochtig|wilgot|vlhk|влажн|вологіст|υγρασ|fuktig|fugtig|nedvesség|nedvesseg|mitrums|vlaga|vlažn/;
const UVI_RE = /uv.?index|uvi([^a-z]|$)|indice uv|uv.?indeks|uv.?wert/;
// Terrarium equipment: the basking lamp, the heat mat or cable and the mister (rain system, fogger).
const BASK_RE = /bask|spot.?lamp|sun.?spot|hot.?spot|sonnenplatz|spotstrahler|halogen|heat.?lamp|lampe chauffante|spot chauffant|warmelampe|warmestrahler|lampada riscaldante|lampara de calor|warmtelamp/;
const MAT_RE = /heat.?mat|heat.?pad|heat.?cable|heat.?tape|heizmatte|heizkabel|tapis chauffant|cable chauffant|esterilla|tappetino|warmtemat|mata grzew/;
const MIST_RE = /mist|brumi|nebel|fogger|rain.?system|raining|pluie|beregn|monsoon|sprinkl|nebuli|humidifier|befeucht|umidific|humidificador|bevochtig|zraszacz|rocio|nebbia/;
// A set point, a target, an alarm threshold or a calibration is never a measure.
const NOT_MEASURE_RE = /setpoint|set.?point|consigne|target|cible|sollwert|desired|offset|calibrat|alarm|threshold|seuil|limit|_min([^a-z]|$)|_max([^a-z]|$)/;
// Integrations and brands of aquarium equipment (integration domains, device names and manufacturers), for the card
// that has no option at all.
const AQUA_RE =
  /aquari|aquarium|terrari|vivari|paludari|reptil|exo.?terra|zoo.?med|lucky.?reptile|habistat|herpstat|microclimate|arcadia|repti.?zoo|axolotl|reef|redsea|red sea|reefbeat|eheim|apex|neptune|chihiros|aquable|mobius|ecotech|radion|vortech|aquaillumination|nyos|kessil|seneye|reef.?pi|aquatlantis|juwel|helialux|aquael|hydros|tunze|fluval|oase|dennerle|sera|tetra|bac a poissons|fish.?tank/;
// A probe that says it is in the water.
const WATER_WORD_RE = /water|wasser|(^|[^a-z])eau|agua|acqua|vann|vatten|voda|wody|apa |vesi|νερο|вод|bassin|pond|teich/;
const REEF_RE = /reef|marine|salt.?water|saltwater|eau de mer|meerwasser|red ?sea|reefbeat|ecotech|radion|vortech|aquaillumination|nyos|kessil|tunze|skimmer|ecumeur/;
const unitIs = (unit, list) => list.includes(String(unit || "").toLowerCase().replace(/\s/g, ""));

// The text a role is read from: entity id, translation key and names, accents and case dropped.
const textOf = (id, hass) => {
  const e = hass.entities?.[id] || {};
  const s = hass.states?.[id];
  return norm([id.split(".")[1], e.translation_key, e.original_name, e.name, s?.attributes?.friendly_name].filter(Boolean).join(" ")).replace(/[_\-.]+/g, " ");
};

// The role of an entity, from its domain, device class, unit and names; null when it is none of them.
const roleOf = (id, hass) => {
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
const DIAGNOSTIC_ROLES = new Set([...METRIC_ROLES, "service", "filter_speed", "reservoir", "power"]);
// Which entity wins when a role has several: a better domain first, then a name that says it is the tank's.
const DOMAIN_RANK = {
  heater: { climate: 4, water_heater: 3, switch: 2, input_boolean: 1 },
  light: { light: 4, switch: 2, input_boolean: 1 },
  feeder: { button: 4, script: 3, switch: 2, input_boolean: 1, sensor: 0 },
  filter: { switch: 4, fan: 3, input_boolean: 1 },
  filter_speed: { sensor: 3, number: 2 },
};
const TANK_RE = /water|wasser|eau|agua|acqua|aquari|tank|bac|probe|sonde/;
const rankOf = (role, id, hass, diagnostic) => {
  let r = (DOMAIN_RANK[role]?.[domainOf(id)] ?? 2) * 10;
  if (!diagnostic) r += 2;
  if (role === "water_temperature" && TANK_RE.test(textOf(id, hass))) r += 5;
  // A moonlight is the second light of a fixture: the daylight one first.
  if (role === "light" && /moon|lune|mond|luna|maan/.test(textOf(id, hass))) r -= 5;
  return r;
};

const _byDevice = new WeakMap();
const devicesOf = (hass) => {
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

const deviceName = (d) => d?.name_by_user || d?.name || "";
const findDeviceId = (hass, device) => {
  if (!device || !hass.devices) return null;
  if (hass.devices[device]) return device;
  const d = Object.values(hass.devices).find((x) => deviceName(x) === device || x.name === device);
  return d ? d.id : undefined;
};
const findAreaId = (hass, area) => {
  const areas = hass.areas || {};
  if (areas[area]) return area;
  const found = Object.values(areas).find((a) => a.name === area || norm(a.name) === norm(area));
  return found ? found.area_id : undefined;
};
const usable = (hass, id) => {
  const e = hass.entities?.[id];
  return !!hass.states?.[id] && !e?.hidden && !e?.disabled_by && e?.entity_category !== "config";
};

// The best entity of each role among `ids` (see rankOf).
const rolesAmong = (hass, ids) => {
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
const _auto = new WeakMap();
const autoIds = (hass) => {
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
const _byArea = new WeakMap();
const areaIdsOf = (hass, areaId) => {
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
const setupOf = (hass, config) => {
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
const SCENES = {
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
const SCENE_HINTS = [
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
const namesOf = (hass, config, setup) => [
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
const hintOf = (names, kind) => {
  for (const text of names) {
    const hit = SCENE_HINTS.find(([key, re]) => (!kind || SCENES[key] === kind) && re.test(text));
    if (hit) return hit[0];
  }
  return "";
};
const explicitScene = (config) => (config.scene && config.scene !== "auto" && SCENES[config.scene] ? config.scene : "");

// The roles of a tank in water, and those of a terrarium's air.
const WATER_ROLES = ["filter", "co2", "wave_pump", "return_pump", "skimmer", "air_pump", "ato", "ph", "ammonia", "nitrite", "nitrate", "kh", "gh", "salinity"];
const AIR_ROLES = ["hot_spot", "cold_spot", "basking", "heat_mat", "mister", "uv_index"];
const TERRA_RE = /terrari|vivari|reptil|exo.?terra|zoo.?med|lucky.?reptile|habistat|herpstat|microclimate|arcadia|repti.?zoo/;

// Reef (salt water), freshwater, terrarium (air: reptiles, amphibians, invertebrates) or turtle tank (water and a
// basking spot): the option, else the kind of the scene chosen, else a salinity or reef equipment (skimmer,
// calcium…), else an animal or a theme named by the tank, else a terrarium's equipment (basking lamp, heat mat,
// mister, hot and cool sides; with a filter: a turtle tank), else a reef or terrarium brand in the names.
const kindOf = (hass, config, setup) => {
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
const sceneOf = (hass, config, setup, kind) => {
  const scene = explicitScene(config) || hintOf(namesOf(hass, config, setup), kind);
  if (scene) return scene;
  if (kind === "terrarium") {
    const h = num(hass.states?.[setup.roles.humidity]);
    return h !== null && h < 50 ? "desert" : "rainforest";
  }
  return { reef: "reef", freshwater: "planted", turtle: "turtle" }[kind];
};

// ---------------------------------------------------------------------------
// Water quality: ideal ranges, levels and advice
// ---------------------------------------------------------------------------

// Gauge scale, ideal range and the margins below and above it that are a warning (beyond: critical), per measure
// and per kind of tank. Usual hobby values: tropical community tank (24–27 °C, pH 6.5–7.5, free ammonia under
// 0.02 mg/L as Seneye reads it, nitrite under 0.1, nitrate under 25 mg/L, KH 3–8 and GH 4–12 °dH) and reef tank
// (25–26.5 °C, pH 7.9–8.4, salinity 34–35.5 ppt / SG 1.024–1.026, alkalinity 7–11 dKH, calcium 400–450, magnesium
// 1250–1400, nitrate 1–10 and phosphate 0.02–0.1 mg/L).
const BASE_RANGES = {
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
const PROFILES = {
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
const SG_RANGE = { scale: [1.02, 1.03], ideal: [1.024, 1.0265], margin: [0.002, 0.002], digits: 3, unit: "SG" };

const scaleRange = (r, f, unit) => ({ ...r, scale: r.scale.map(f), ideal: r.ideal.map(f), margin: r.margin.map((m) => f(m) - f(0)), unit });

// The range of a measure in the unit of its entity (°F, SG, meq/L, µS/cm…), with the ideal range of the options
// (`ranges`) when set.
const rangeOf = (role, unit, kind, value, ranges = {}, scene = "") => {
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
const levelOf = (range, v) => {
  if (v === null) return { cls: "idle", side: null };
  const [lo, hi] = range.ideal;
  const [mLo, mHi] = range.margin;
  if (v < lo) return { cls: v < lo - mLo ? "crit" : "warn", side: "low" };
  if (v > hi) return { cls: v > hi + mHi ? "crit" : "warn", side: "high" };
  return { cls: "ok", side: null };
};

const RANK = { crit: 3, warn: 2, ok: 1, idle: 0 };
const worst = (levels) => levels.reduce((w, l) => ((RANK[l] ?? 0) > (RANK[w] ?? 0) ? l : w), "idle");

// Gauge scale: the measure's scale, widened to show the margins around the ideal range and the value itself.
const scaleOf = (range, v) => {
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
const trackOf = (range, [min, max]) => {
  const p = (x) => `${clamp(((x - min) / (max - min || 1)) * 100, 0, 100).toFixed(2)}%`;
  const [lo, hi] = range.ideal;
  const [mLo, mHi] = range.margin;
  return `linear-gradient(90deg, var(--aq-crit-z) 0 ${p(lo - mLo)}, var(--aq-warn-z) ${p(lo - mLo)} ${p(lo)}, var(--aq-ok-z) ${p(lo)} ${p(hi)}, var(--aq-warn-z) ${p(hi)} ${p(hi + mHi)}, var(--aq-crit-z) ${p(hi + mHi)} 100%)`;
};

// The advice of a measure out of its range (a specific one when there is, else the generic one).
const TIP_KEYS = new Set([
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

// ---------------------------------------------------------------------------
// Equipment states
// ---------------------------------------------------------------------------

const OFF_STATES = /^(off|stop|stopped|arret|aus|apagado|spento|0|none|idle|closed)$/;
const isOn = (s) => valid(s) && !OFF_STATES.test(norm(s.state));
const heating = (s) => {
  if (!valid(s)) return false;
  const d = domainOf(s.entity_id);
  if (d === "climate") return s.attributes?.hvac_action ? s.attributes.hvac_action === "heating" : s.state === "heat";
  if (d === "water_heater") return s.state !== "off" && (s.attributes?.operation_mode !== "off");
  return s.state === "on";
};
const targetOf = (s) => {
  const v = s?.attributes?.temperature;
  return Number.isFinite(v) ? v : null;
};
const brightnessPct = (s) => {
  const b = s?.attributes?.brightness;
  return isOn(s) && Number.isFinite(b) ? Math.round((b / 255) * 100) : null;
};
// A light dimmed to a moonlight: its effect or name says so, or it is on below 15 %.
const MOON_RE = /moon|lune|mond|luna|maan|night|nuit|nacht|noche|notte|actinic|aktinisch/;
const isMoon = (s) => {
  if (!isOn(s)) return false;
  if (MOON_RE.test(norm(s.attributes?.effect || "")) || MOON_RE.test(norm(s.attributes?.preset_mode || ""))) return true;
  const b = brightnessPct(s);
  return (b !== null && b <= 15) || MOON_RE.test(norm(s.entity_id));
};
// When a feeder was last used: a button's state is the time it was last pressed; a timestamp sensor, its value; a
// switch, when it was last turned on.
const fedAt = (s) => {
  if (!valid(s)) return null;
  const d = domainOf(s.entity_id);
  const raw = d === "button" || d === "sensor" ? s.state : d === "script" ? s.attributes?.last_triggered : s.state === "on" ? s.last_changed : s.last_changed;
  const at = Date.parse(raw);
  return Number.isFinite(at) ? at : null;
};
const FEEDING_MS = 3 * 60000;
// A water level binary sensor: "on" is a problem for the problem / safety ones and those named low / alarm,
// else "on" is the water at its level (a float switch closed). `invert_level` turns it round.
const levelLow = (s, invert) => {
  if (!valid(s)) return false;
  const dc = s.attributes?.device_class;
  const bad = ["problem", "safety", "moisture"].includes(dc) || /low|bas|niedrig|bajo|basso|alarm|empty|vide|leer/.test(norm(s.entity_id));
  const on = s.state === "on";
  return (bad ? on : !on) !== !!invert;
};
// Hours or days until a service (EHEIM "remaining hours until service"), in ms; a timestamp is a due date.
const serviceMs = (s) => {
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

// ---------------------------------------------------------------------------
// The tank: an animated reef or planted freshwater scene, the card's illustrated header
// ---------------------------------------------------------------------------

// Drawn in a 400 × 80 box anchored to the right of the header and standing on its substrate strip; a wider card
// shows more water on the left, a narrower one crops the left part (the texts sit there). Every animation lasts a
// divisor of 8 s, so that a recording of 8 s loops.

// A fish facing right around (0, 0), drawn the same way for every species: a countershaded body (dark back, pale
// belly) with scales, a lateral line, a gill cover and a glint, translucent rayed fins, an eye with its iris and
// highlight. `pattern` is drawn clipped to the body (bars, stripes, spots). The tail (class tf) beats and the
// pectoral fin (class pf) flutters while it swims.
const FISH_TAILS = {
  fork: (b, p, L, H) => `M${b} ${-p} L${-L / 2} ${-H * 0.46} Q${-L * 0.4} 0 ${-L / 2} ${H * 0.46} L${b} ${p}Z`,
  lyre: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.46} ${-H * 0.3} ${-L * 0.62} ${-H * 0.62} Q${-L * 0.44} 0 ${-L * 0.62} ${H * 0.62} Q${-L * 0.46} ${H * 0.3} ${b} ${p}Z`,
  round: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.52} ${-H * 0.5} ${-L * 0.53} 0 Q${-L * 0.52} ${H * 0.5} ${b} ${p}Z`,
  square: (b, p, L, H) => `M${b} ${-p} L${-L * 0.5} ${-H * 0.4} Q${-L * 0.47} 0 ${-L * 0.5} ${H * 0.4} L${b} ${p}Z`,
  veil: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.55} ${-H * 1.1} ${-L * 0.95} ${-H * 0.5} Q${-L * 0.78} 0 ${-L * 1.0} ${H * 0.7} Q${-L * 0.55} ${H * 1.2} ${b} ${p}Z`,
};
const f2 = (n) => Math.round(n * 100) / 100;
const fishArt = ({ id, L = 20, H = 8, top, mid, bot = "#f4f4f0", fin, finOp = 0.75, tail = "fork", dorsal = "low", anal = "low", pattern = "", extra = "", eye = 0.11, iris = "#d9c27a", mouth = 0 }) => {
  const nose = L * 0.5;
  const b = -L * 0.32;
  const p = H * 0.14;
  const hT = H / 2;
  const hB = H * 0.46;
  const body = `M${f2(nose)} ${f2(H * 0.06)} C${f2(nose)} ${f2(-hT * 0.75)} ${f2(L * 0.24)} ${f2(-hT)} ${f2(L * 0.02)} ${f2(-hT)} C${f2(-L * 0.18)} ${f2(-hT)} ${f2(b + L * 0.05)} ${f2(-p * 1.7)} ${f2(b)} ${f2(-p)} L${f2(b)} ${f2(p)} C${f2(b + L * 0.05)} ${f2(p * 1.7)} ${f2(-L * 0.18)} ${f2(hB)} ${f2(L * 0.02)} ${f2(hB)} C${f2(L * 0.24)} ${f2(hB)} ${f2(nose)} ${f2(hB * 0.65)} ${f2(nose)} ${f2(H * 0.06)}Z`;
  const t = FISH_TAILS[tail](f2(b + 0.6), f2(p), L, H);
  const rays = (x0, y0, xs, ys, n) => Array.from({ length: n }, (_, i) => `M${f2(x0)} ${f2(y0)} L${f2(xs[0] + ((xs[1] - xs[0]) * i) / (n - 1))} ${f2(ys[0] + ((ys[1] - ys[0]) * i) / (n - 1))}`).join(" ");
  const dh = { low: 0.28, high: 0.65, sail: 1.1, none: 0, spiny: 0.42 }[dorsal] * H;
  const dorsalFin = dh
    ? dorsal === "spiny"
      ? `<path d="M${f2(L * 0.14)} ${f2(-hT * 0.92)} ${Array.from({ length: 7 }, (_, i) => `L${f2(L * 0.12 - i * L * 0.055)} ${f2(-hT - dh * (0.7 + (i % 2) * 0.3))} L${f2(L * 0.1 - i * L * 0.055)} ${f2(-hT * 0.98)}`).join(" ")} L${f2(-L * 0.28)} ${f2(-p * 2)}Z" fill="${fin}" opacity="${finOp}"/>`
      : `<path d="M${f2(L * 0.1)} ${f2(-hT * 0.96)} Q${f2(-L * 0.02)} ${f2(-hT - dh * 1.1)} ${f2(-L * 0.22)} ${f2(-hT - dh * 0.4)} L${f2(-L * 0.26)} ${f2(-p * 2.4)}Z" fill="${fin}" opacity="${finOp}"/><path d="${rays(-L * 0.02, -hT * 0.9, [L * 0.06, -L * 0.22], [-hT - dh * 0.8, -hT - dh * 0.3], 5)}" stroke="#000" stroke-width=".2" opacity=".25"/>`
    : "";
  const ah = { low: 0.22, high: 0.5, sail: 0.9, none: 0, spiny: 0.3 }[anal] * H;
  const analFin = ah ? `<path d="M${f2(-L * 0.04)} ${f2(hB * 0.94)} Q${f2(-L * 0.14)} ${f2(hB + ah)} ${f2(-L * 0.26)} ${f2(hB * 0.4 + ah * 0.5)} L${f2(-L * 0.27)} ${f2(p * 2)}Z" fill="${fin}" opacity="${finOp}"/>` : "";
  const ex = L * 0.34;
  const ey = -H * 0.1;
  const er = Math.max(0.55, H * eye);
  const g = `fa-${id}`;
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".5" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient><clipPath id="${g}-c"><path d="${body}"/></clipPath><pattern id="${g}-s" width="${f2(H * 0.22)}" height="${f2(H * 0.16)}" patternUnits="userSpaceOnUse"><path d="M0 ${f2(H * 0.16)} Q${f2(H * 0.11)} 0 ${f2(H * 0.22)} ${f2(H * 0.16)}" stroke="#000" stroke-width=".14" fill="none" opacity=".12"/></pattern></defs>
<g class="tf"><path d="${t}" fill="${fin}" opacity="${finOp}"/><path d="${rays(b + 0.6, 0, [-L * 0.5, -L * 0.5], [-H * 0.4, H * 0.4], 7)}" stroke="#000" stroke-width=".18" opacity=".25"/></g>
${dorsalFin}${analFin}
<path d="${body}" fill="url(#${g})"/>
<g clip-path="url(#${g}-c)">${pattern}<path d="${body}" fill="url(#${g}-s)"/><ellipse cx="${f2(L * 0.12)}" cy="${f2(-hT * 0.55)}" rx="${f2(L * 0.26)}" ry="${f2(H * 0.12)}" fill="#fff" opacity=".22"/></g>
<path d="M${f2(L * 0.27)} ${f2(-hT * 0.62)} Q${f2(L * 0.21)} 0 ${f2(L * 0.27)} ${f2(hB * 0.62)}" stroke="#000" stroke-width=".3" fill="none" opacity=".3"/>
<path d="M${f2(L * 0.25)} ${f2(-H * 0.18)} Q${f2(0)} ${f2(-H * 0.24)} ${f2(b + 1)} ${f2(-H * 0.02)}" stroke="#fff" stroke-width=".22" fill="none" opacity=".35"/>
<g class="pf"><path d="M${f2(L * 0.2)} ${f2(H * 0.12)} Q${f2(L * 0.06)} ${f2(H * 0.22)} ${f2(L * 0.04)} ${f2(H * 0.38)} Q${f2(L * 0.14)} ${f2(H * 0.34)} ${f2(L * 0.2)} ${f2(H * 0.18)}Z" fill="${fin}" opacity="${finOp * 0.85}"/></g>
${extra}
<circle cx="${f2(ex)}" cy="${f2(ey)}" r="${f2(er)}" fill="${iris}"/><circle cx="${f2(ex + er * 0.12)}" cy="${f2(ey)}" r="${f2(er * 0.68)}" fill="#0b0b0b"/><circle cx="${f2(ex + er * 0.38)}" cy="${f2(ey - er * 0.35)}" r="${f2(er * 0.3)}" fill="#fff"/>
${mouth ? `<path d="M${f2(nose - 0.2)} ${f2(H * 0.08)} l${f2(-L * 0.05)} ${f2(H * 0.04)}" stroke="#000" stroke-width=".3" opacity=".5"/>` : ""}`;
};

// The species of every scene, facing right around (0, 0): fish (fishArt) and the other animals of the water.
const bars = (L, H, xs, w, c, op = 1) => xs.map((x) => `<rect x="${f2(L * x - (L * w) / 2)}" y="${f2(-H)}" width="${f2(L * w)}" height="${f2(H * 2)}" fill="${c}" opacity="${op}"/>`).join("");
const FISH_T={
tetra:(red="#E8423B",str="#22B8FF",body="#dfe8f2")=>fishArt({id:`tetra${red.slice(1)}${str.slice(1)}`,L:15,H:4.6,top:"#6f7f86",mid:body,bot:"#f5f7f8",fin:body,finOp:.45,
 pattern:`<path d="M${f2(15*-.3)} 1.5 L${f2(15*.12)} .9 L${f2(15*.12)} 2.6 L${f2(15*-.3)} 2.6Z" fill="${red}"/><rect x="${f2(15*-.3)}" y="-.75" width="${f2(15*.62)}" height=".9" fill="${str}"/><rect x="${f2(15*-.3)}" y="-.75" width="${f2(15*.62)}" height=".35" fill="#fff" opacity=".5"/>`}),
rasbora:fishArt({id:"rasbora",L:16,H:6,top:"#c97b5b",mid:"#f2a07e",bot:"#fde3d6",fin:"#f6a887",finOp:.6,pattern:`<path d="M-1 -3 L4 -3 L-3.4 2 L-5.4 .6Z" fill="#1d1d1d"/>`}),
cich:(b,bar,fin,belly="#ffffff55")=>fishArt({id:`cich${b.slice(1)}`,L:26,H:10,top:bar,mid:b,bot:b,fin,dorsal:"spiny",anal:"spiny",tail:"square",mouth:1,
 pattern:`${bars(26,10,[-.22,-.1,.02,.14,.26],.055,bar,.55)}<ellipse cx="2" cy="4" rx="10" ry="2.4" fill="${belly}"/>`,extra:`<g fill="#ffd54f">${[[-6.6,5.8],[-8.2,6.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>`}),
betta:(c1,c2,c3)=>{const id=`betta${c1.slice(1)}`;return `<defs><linearGradient id="${id}-f" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient></defs>
<g class="tf"><path d="M-4 -1.6 Q-14 -14 -24 -9 Q-30 -2 -22 4 Q-28 10 -20 14 Q-12 14 -4 2Z" fill="url(#${id}-f)" opacity=".9"/><path d="M-4 0 L-22 -8 M-4 0 L-26 -2 M-4 0 L-24 6 M-4 0 L-18 12" stroke="#000" stroke-width=".25" opacity=".25"/></g>
<path d="M2 -3 Q-4 -12 -12 -11 Q-8 -5 -3 -2.6Z" fill="url(#${id}-f)" opacity=".85"/><path d="M2 2.4 Q-2 12 -12 13 Q-8 6 -3 2.4Z" fill="url(#${id}-f)" opacity=".85"/>`+fishArt({id,L:16,H:6,top:c1,mid:c2,bot:c2,fin:c3,finOp:.8,tail:"round",dorsal:"none",anal:"none",extra:`<path d="M3 2.6 Q2 7 0 9" stroke="${c3}" stroke-width=".8" fill="none"/>`});},
gold:(c="#f7871b",t="#ffb347",hl="#ffd08a")=>fishArt({id:`gold${c.slice(1)}`,L:20,H:12,top:c,mid:c,bot:hl,fin:t,finOp:.75,tail:"veil",dorsal:"high",anal:"low",iris:"#e0a040",
 extra:`<path d="M6 -5 Q10 -8 11 -3 Q9.6 -1 6.4 -2Z" fill="${hl}" opacity=".9"/><g fill="${t}" opacity=".5">${[[6.4,-4.6],[8,-5.2],[9.2,-4],[7.4,-3.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9"/>`).join("")}</g>`}),
koi:(p="#e8442e",b="#fafafa")=>fishArt({id:`koi${p.slice(1)}${b.slice(1)}`,L:28,H:7.4,top:b,mid:b,bot:b,fin:b,finOp:.7,tail:"fork",dorsal:"low",mouth:1,iris:"#bdbdbd",
 pattern:`<path d="M-6 -4 Q-2 -1 4 -4 Q8 -2 6 1 Q0 0 -6 -1Z" fill="${p}"/><ellipse cx="11" cy="-1.6" rx="3" ry="1.8" fill="${p}"/><ellipse cx="-4" cy="-1" rx="2" ry="1.2" fill="#212121" opacity="${b===p?0:.7}"/>`,
 extra:`<path d="M13.8 .6 q1.4 .8 1.4 2 M13.4 1 q.6 1 .2 1.8" stroke="${b}" stroke-width=".4" fill="none"/>`}),
archer:fishArt({id:"archer",L:20,H:9,top:"#8fa3a8",mid:"#e3ebe8",bot:"#ffffff",fin:"#cfd8dc",finOp:.6,tail:"square",dorsal:"low",mouth:1,iris:"#c8e6c9",
 pattern:`<g fill="#1d1d1d">${[[-4.4,-4.6,2.4],[0,-4.2,2.2],[4.2,-4.4,2],[-7.2,-3.8,1.6]].map(([x,y,w])=>`<path d="M${x} ${y} l${w} 0 l-.8 3.6 l-${w-1.4} 0Z"/>`).join("")}</g>`}),
mud:fishArt({id:"mud",L:20,H:6,top:"#6d5a3c",mid:"#8a7552",bot:"#cbb999",fin:"#7a6644",finOp:.85,tail:"round",dorsal:"high",anal:"low",iris:"#a5d6a7",eye:.16,
 pattern:`<g fill="#5bc0eb">${[[-3,-1.2],[0,-.4],[3,-1.6],[-5.6,.2],[1.6,1]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".45"/>`).join("")}</g><g fill="#3f3220" opacity=".5">${[[-1.6,-2.2],[2,-2.6],[5,-1],[-4,-2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>`,
 extra:`<path d="M3 2 Q1 5 -1.6 6 Q2 6 4 3" fill="#7a6644"/>`}),
anthias:fishArt({id:"anthias",L:18,H:7,top:"#f06a6a",mid:"#ff8a65",bot:"#ffccbc",fin:"#ff6e9a",finOp:.85,tail:"lyre",dorsal:"low",iris:"#ff8a80",
 pattern:`<path d="M9 -1 L1 1.4" stroke="#7e57c2" stroke-width=".7"/>`,extra:`<path d="M2.4 -3.6 L2 -7.6" stroke="#ff4081" stroke-width=".6"/>`}),
wrasse:fishArt({id:"wrasse",L:18,H:5,top:"#7e57c2",mid:"#e53935",bot:"#ffcdd2",fin:"#ffd54f",finOp:.8,tail:"round",dorsal:"low",iris:"#ffcc80",
 pattern:`<path d="M-7 -3 L9 -3 L9 -.8 Q2 -1.6 -7 -.4Z" fill="#7e57c2"/><path d="M-7 1.2 Q2 .6 9 1.4" stroke="#ffeb3b" stroke-width=".5" fill="none"/>`}),
goby:fishArt({id:"goby",L:14,H:4.8,top:"#f2c200",mid:"#ffd740",bot:"#fff3b0",fin:"#ffd740",finOp:.85,tail:"round",dorsal:"high",anal:"low",eye:.15,iris:"#ffe082",
 pattern:`<g fill="#29b6f6">${[[-3,-1.2],[0,-.6],[2.6,-1.4],[-1.4,1],[1.6,.8],[4.6,-.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".38"/>`).join("")}</g>`}),
cleaner:`<defs><linearGradient id="an-cl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e53935"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#e53935"/></linearGradient></defs>
<g class="lg-a"><path d="M-2 2 l-1 4 M2 2 l1 4.2 M5 1.6 l2 3.6" stroke="#ef9a9a" stroke-width=".5"/></g><g class="lg-b"><path d="M0 2 l0 4.2 M3.6 1.8 l1.4 4" stroke="#ef9a9a" stroke-width=".5"/></g>
<path d="M-12 1 Q-11 -3.6 -3 -4 Q6 -4.4 10 -1 Q8 2.4 0 2.6 Q-8 2.8 -12 1Z" fill="url(#an-cl)"/><path d="M-8 -3 v5 M-4 -3.6 v6 M0 -3.8 v6 M4 -3.4 v5.4" stroke="#b71c1c" stroke-width=".3" opacity=".5"/>
<path d="M-12 1 l-3 -2.6 l1 2.6 l-1 2.6Z" fill="#e53935"/><g fill="#fff"><circle cx="-13.4" cy="-.6" r=".5"/><circle cx="-13.4" cy="2.6" r=".5"/></g>
<path d="M9.4 -1.6 Q16 -10 24 -12 M9.6 -1.2 Q18 -6 26 -5" stroke="#fff" stroke-width=".35" fill="none" class="sway"/><circle cx="8.6" cy="-2" r=".6" fill="#111"/>`,
shrimp:(c,s="#ffffff55")=>`<g class="lg-a"><path d="M-2 1.4 l-.6 2.4 M1 1.4 l.4 2.6" stroke="${c}" stroke-width=".35" opacity=".8"/></g><g class="lg-b"><path d="M-.6 1.4 l0 2.6 M2.4 1.2 l.8 2.2" stroke="${c}" stroke-width=".35" opacity=".8"/></g>
<path d="M-6 .8 Q-5.6 -2.4 -1 -2.6 Q3.6 -2.6 5 -.6 Q4 1.4 0 1.6 Q-4 1.8 -6 .8Z" fill="${c}"/><path d="M-4 -2 v3.2 M-1.6 -2.4 v3.8 M.8 -2.4 v3.8" stroke="${s}" stroke-width=".35"/>
<path d="M-6 .8 l-2.2 -1.6 l.6 1.6 l-.6 1.6Z" fill="${c}"/><path d="M4.4 -1 Q8 -6 11 -6 M4.6 -.8 Q9 -3.6 12 -2.6" stroke="${c}" stroke-width=".25" fill="none" opacity=".8"/><circle cx="4" cy="-1.2" r=".4" fill="#111"/><path d="M-3 -2.4 Q0 -3.2 3 -2.2" stroke="#fff" stroke-width=".35" fill="none" opacity=".5"/>`,
snail:(sc="#8d6e63",bd="#d7ccc8")=>`<path d="M-6 3 Q-2 1.6 5 2 Q8 2.4 9 3.6 Q2 4.6 -6 4Z" fill="${bd}"/><path d="M6.4 2 Q7.4 -1 8.6 -1.6 M7.4 2.2 Q9 0 10 -.2" stroke="${bd}" stroke-width=".55" fill="none" stroke-linecap="round"/>
<circle cx="-.6" cy="-1" r="4.6" fill="${sc}"/><path d="M-.6 -5.6 A4.6 4.6 0 0 1 4 -1 A3.4 3.4 0 0 1 .6 2.4 A2.4 2.4 0 0 1 -1.8 0 A1.4 1.4 0 0 1 -.4 -1.4" stroke="#000" stroke-width=".5" fill="none" opacity=".35"/><path d="M-4 -3 Q-1.6 -5.4 1.4 -5" stroke="#fff" stroke-width=".6" fill="none" opacity=".35"/>`,
horse:(c="#f9a825",d="#f57f17")=>`<path d="M0 -12 Q5 -14 7 -10 Q5.6 -8.6 3.4 -9.2 Q4.4 -6 2.6 -3 Q4.6 2 2 7 Q0 10.4 -2 12 Q-4 14 -2.6 15.4 Q-.6 15.6 -1 14 Q.4 12.6 1 10.6 Q-2 8 -2 3 Q-2.4 -2 -1 -6 Q-2 -9 0 -12Z" fill="${c}"/>
<g stroke="${d}" stroke-width=".55" fill="none">${[-8,-5.4,-2.6,0,2.6,5.2,7.8].map(y=>`<path d="M-1.8 ${y} q2.4 .8 4 -.2"/>`).join("")}</g>
<path d="M7 -10 L10.4 -9.6 L10.4 -8.4 L7 -8.8" fill="${d}"/><path d="M-.4 -12.4 l-.6 -2 l1.2 1 l.4 -1.8 l.8 1.6 l1 -1.4 l.2 1.8" fill="${d}"/>
<path class="pf" d="M-1.6 -1 Q-6 0 -5 3 Q-3 2 -1.8 1Z" fill="${c}" opacity=".7"/><circle cx="3.6" cy="-11" r=".9" fill="#111"/><circle cx="3.9" cy="-11.3" r=".3" fill="#fff"/><path d="M-1 -10 Q1 -12 3 -11" stroke="#fff" stroke-width=".4" fill="none" opacity=".4"/>`,
jelly:(c="#c5cae9",c2="#fff")=>{const id=`jl${c.slice(1)}`;return `<defs><radialGradient id="${id}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="${c2}" stop-opacity=".95"/><stop offset=".6" stop-color="${c}" stop-opacity=".75"/><stop offset="1" stop-color="${c}" stop-opacity=".35"/></radialGradient></defs>
<g class="hang">${[-6,-3,0,3,6].map((x,i)=>`<path d="M${x} 1 Q${x+2} 8 ${x-1} 14 T${x+1} ${22+i%2*3}" stroke="${c}" stroke-width=".4" fill="none" opacity=".7"/>`).join("")}<path d="M-2 1 Q-3 7 -1 12 Q1 7 2 1" fill="${c}" opacity=".5"/></g>
<path d="M-9 1 Q-9 -9 0 -9 Q9 -9 9 1 Q6 2.6 4.6 1 Q2.6 2.8 0 1 Q-2.6 2.8 -4.6 1 Q-6 2.6 -9 1Z" fill="url(#${id})"/><g fill="none" stroke="${c2}" stroke-width=".5" opacity=".7"><circle cx="-3" cy="-4" r="1.6"/><circle cx="3" cy="-4" r="1.6"/><circle cx="0" cy="-6.2" r="1.4"/></g><path d="M-6 -5 Q-3 -8 1 -8" stroke="#fff" stroke-width=".6" fill="none" opacity=".6"/>`},
lion:fishArt({id:"lion",L:22,H:9,top:"#8d2a1a",mid:"#f3e1d2",bot:"#f6e8dc",fin:"#f3d7c6",finOp:.7,tail:"round",dorsal:"none",anal:"low",iris:"#ffab91",
 pattern:bars(22,9,[-.25,-.16,-.07,.02,.11,.2,.3],.04,"#a52714",.9),
 extra:`<g stroke="#a52714" stroke-width=".7" stroke-linecap="round">${Array.from({length:11},(_,i)=>`<path d="M${f2(5-i*1.4)} -4 L${f2(4-i*1.9)} ${f2(-11-Math.sin(i)*2)}"/>`).join("")}</g><g stroke="#f6e8dc" stroke-width=".3" stroke-dasharray="1 1">${Array.from({length:11},(_,i)=>`<path d="M${f2(5-i*1.4)} -4 L${f2(4-i*1.9)} ${f2(-11-Math.sin(i)*2)}"/>`).join("")}</g>
<g class="pf">${Array.from({length:8},(_,i)=>`<path d="M4 2 Q${f2(-1-i*.5)} ${f2(4+i*.9)} ${f2(-4-i*.9)} ${f2(5+i*1.1)}" stroke="${i%2?"#a52714":"#f3d7c6"}" stroke-width="1" fill="none" opacity=".85"/>`).join("")}</g>`}),
moray:`<defs><linearGradient id="an-mo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d7d1f"/><stop offset="1" stop-color="#9ccc65"/></linearGradient></defs>
<path class="tail" d="M-18 8 Q-12 0 -4 -1.6 Q4 -3.4 12 -3.6 Q16 -2.6 16 .4 Q12 2.4 4 2.4 Q-6 4 -12 10Z" fill="url(#an-mo)"/>
<path d="M-18 8 Q-12 0 -4 -1.6 Q4 -3.4 12 -3.6" stroke="#4e6b1a" stroke-width=".9" fill="none"/><g fill="#33461a" opacity=".55">${[[-10,3],[-6,.6],[-2,-.4],[2,-1.8],[6,-2],[-8,5],[0,1],[5,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>
<path d="M12.6 .4 L16.6 1.6 L12.6 2.4" fill="#2e3b12"/><g fill="#fff"><path d="M13.4 .6 l.3 .6 l.3 -.6 M14.4 .9 l.3 .6 l.3 -.6"/></g><circle cx="12.4" cy="-1.8" r=".7" fill="#ffe082"/><circle cx="12.5" cy="-1.8" r=".35" fill="#111"/>`,
stingray:`<defs><radialGradient id="an-st" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#a1887f"/><stop offset="1" stop-color="#6d5a4f"/></radialGradient></defs>
<path class="tail" d="M-10 0 Q-22 -1 -34 2" stroke="#6d5a4f" stroke-width=".8" fill="none"/><path d="M-10 0 Q-6 -4.6 4 -4.4 Q14 -3 15 0 Q12 2.4 4 2.8 Q-6 2.6 -10 0Z" fill="url(#an-st)"/>
<g fill="#4fc3f7">${[[-4,-1.6],[0,-2.6],[4,-1.8],[8,-1.2],[-1,.4],[3,.6],[7,.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g><path class="pf" d="M-8 1 Q0 4 12 1" stroke="#5d4a3f" stroke-width=".8" fill="none"/><circle cx="10.2" cy="-1.8" r=".6" fill="#111"/><circle cx="11.6" cy="-1.4" r=".5" fill="#111"/>`,
angler:`<defs><radialGradient id="an-ag" cx=".55" cy=".35" r=".7"><stop offset="0" stop-color="#4a5061"/><stop offset="1" stop-color="#16181f"/></radialGradient><radialGradient id="an-lu" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f4ff81"/><stop offset=".4" stop-color="#c6ff00" stop-opacity=".7"/><stop offset="1" stop-color="#c6ff00" stop-opacity="0"/></radialGradient></defs>
<g class="tf"><path d="M-9 0 L-15 -5 Q-13 0 -15 5Z" fill="#2a2e38"/></g><path d="M-10 0 Q-9 -9 1 -9.4 Q10 -9 11 -1 Q10 6 0 7 Q-8 6.6 -10 0Z" fill="url(#an-ag)"/>
<path d="M2 -9 Q6 -16 12 -14.6" stroke="#2a2e38" stroke-width=".7" fill="none"/><circle cx="12.6" cy="-14.4" r="4.4" fill="url(#an-lu)" class="gl"/><circle cx="12.6" cy="-14.4" r="1.2" fill="#f4ff81"/>
<path d="M11 -1 Q6 1 2 4 Q7 3 11 2Z" fill="#0b0c10"/><path d="M3.6 3.4 l.6 -1.6 l.6 1.2 l.7 -1.6 l.6 1.4 l.7 -1.6 l.6 1.4 l.6 -1.4" stroke="#eceff1" stroke-width=".45" fill="none"/>
<circle cx="5" cy="-4" r="1.3" fill="#cfd8dc"/><circle cx="5.2" cy="-4" r=".7" fill="#111"/><path class="pf" d="M-2 3 Q-6 6 -5 8 Q-2 6 -1 4Z" fill="#2a2e38"/>`,
lantern:fishArt({id:"lantern",L:14,H:4,top:"#1a2a44",mid:"#37507a",bot:"#8aa0c0",fin:"#4b6488",finOp:.6,tail:"fork",dorsal:"low",eye:.2,iris:"#90caf9",
 extra:`<g class="gl" fill="#80d8ff">${[-3.6,-2.2,-.8,.6,2,3.4].map(x=>`<circle cx="${x}" cy="1.3" r=".35"/>`).join("")}<circle cx="5.6" cy="-.2" r=".45"/></g>`}),
cod:fishArt({id:"cod",L:22,H:6,top:"#6b6252",mid:"#c9c3b4",bot:"#f2efe8",fin:"#9b917e",finOp:.75,tail:"square",dorsal:"low",anal:"low",mouth:1,iris:"#cfd8dc",
 pattern:`<g fill="#5d5546" opacity=".5">${[[-4,-2],[-1,-2.4],[2,-2],[5,-2.2],[-6,-1.4],[0,-1.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".4"/>`).join("")}</g>`,extra:`<path d="M-2 -3 L-3 -5 L-6 -3.2Z M-6.6 -2.6 L-7.4 -4 L-9.4 -2Z" fill="#9b917e" opacity=".8"/><path d="M10.4 1.6 l.4 1.6" stroke="#6b6252" stroke-width=".3"/>`}),
seal:`<defs><linearGradient id="an-se" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f6d78"/><stop offset=".6" stop-color="#8c9aa5"/><stop offset="1" stop-color="#c4ccd3"/></linearGradient></defs>
<g class="tf"><path d="M-17 0 L-24 -4.4 Q-21 0 -24 4.4Z" fill="#4d5a64"/></g><path d="M-17 0 Q-12 -5 0 -5.4 Q10 -5.6 15 -2 Q17 0 15 2 Q8 4.6 -2 4.4 Q-12 3.6 -17 0Z" fill="url(#an-se)"/>
<g fill="#3f4a53" opacity=".5">${[[-10,-2],[-6,-3],[-2,-2],[2,-3.4],[5,-2],[-8,0],[0,0]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx=".9" ry=".6"/>`).join("")}</g>
<g class="pf"><path d="M4 2.4 Q2 6 -2 7.4 Q2 7.6 6 3.4Z" fill="#4d5a64"/></g><circle cx="11.4" cy="-2.2" r="1.1" fill="#111"/><circle cx="11.7" cy="-2.5" r=".35" fill="#fff"/><path d="M15 0 l3 -.6 M15 .6 l3 .4 M15 .2 l2.8 1.4" stroke="#cfd8dc" stroke-width=".25"/><ellipse cx="15.4" cy="-.4" rx=".6" ry=".4" fill="#222"/>`,
butterfly:fishArt({id:"butterfly",L:20,H:16,top:"#fdd835",mid:"#ffeb3b",bot:"#fff59d",fin:"#fbc02d",finOp:.9,tail:"square",dorsal:"low",anal:"low",iris:"#212121",
 pattern:`<rect x="5.4" y="-9" width="2" height="18" fill="#212121"/><rect x="5" y="-9" width=".6" height="18" fill="#fff"/><path d="M-6 -6 Q0 -4 6 -6 M-6 -2 Q0 0 6 -2 M-6 2 Q0 4 6 2" stroke="#f9a825" stroke-width=".5" fill="none"/>`,
 extra:`<circle cx="-4.4" cy="-4.4" r="1.4" fill="#212121"/><circle cx="-4.4" cy="-4.4" r="1.9" fill="none" stroke="#fff" stroke-width=".4"/><path d="M10 .8 l2.6 .2" stroke="#212121" stroke-width=".8"/>`}),
tang:fishArt({id:"tang",L:30,H:15,top:"#1d4fc0",mid:"#2b6fe8",bot:"#4b8af0",fin:"#1a3f9e",finOp:.95,tail:"square",dorsal:"low",anal:"low",iris:"#0b1f4d",
 pattern:`<path d="M-8 -2.4 Q0 -8.4 12 -3.6 Q5 -2.6 2 2 Q-3 3.4 -8 -2.4Z M-9.6 -1 Q-6 2.4 -2 3.6 Q-6 4.6 -10 1.6Z" fill="#0b1f4d"/>`,
 extra:`<g class="tf"><path d="M${f2(-30*.31)} -2 L-15.2 -6.6 Q-13.6 0 -15.2 6.6 L${f2(-30*.31)} 2Z" fill="#f5c518"/></g><path d="M-6 3.6 l-1.6 1.4 l2.6 -.4Z" fill="#f5c518"/>`}),
clown:fishArt({id:"clown",L:26,H:11,top:"#e8650f",mid:"#f57c1f",bot:"#ff9a3c",fin:"#f57c1f",finOp:.95,tail:"round",dorsal:"low",anal:"low",iris:"#e65100",
 pattern:bars(26,11,[-.25,.0,.22],.09,"#fff")+bars(26,11,[-.25,.0,.22],.09,"none")+["-.295","-.205","-.045",".045",".175",".265"].map(x=>`<rect x="${f2(26*x-.3)}" y="-12" width=".6" height="24" fill="#1e1e1e"/>`).join(""),
 extra:`<path d="M-11.4 -3.4 Q-13.8 0 -11.4 3.4" stroke="#1e1e1e" stroke-width=".6" fill="none"/>`}),
apisto:fishArt({id:"apisto",L:16,H:6,top:"#e6b800",mid:"#ffd54f",bot:"#fff3c4",fin:"#ff7043",finOp:.9,tail:"round",dorsal:"spiny",anal:"low",iris:"#ff8a65",
 pattern:`<path d="M-5 -.4 L7 -.4" stroke="#212121" stroke-width=".5"/><g stroke="#29b6f6" stroke-width=".35"><path d="M3 1.2 q2 -.4 3.4 0 M2.6 2 q2 -.2 3.4 .2"/></g>`}),
angel:`<defs><linearGradient id="an-an" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd2c8"/><stop offset=".5" stop-color="#f4f2ea"/><stop offset="1" stop-color="#e9e6da"/></linearGradient></defs>
<g class="tf"><path d="M-8 -1 L-14 -5.6 Q-12 0 -14 5.6 L-8 1Z" fill="#e9e6da" opacity=".7"/><path d="M-14 -5.6 l-1.6 -2 M-14 5.6 l-1.6 2" stroke="#e9e6da" stroke-width=".4"/></g>
<path d="M-2 -6 Q2 -18 -1 -26 Q6 -16 6 -6Z" fill="#e9e6da" opacity=".85"/><path d="M-2 6 Q2 18 -2 27 Q6 16 6 6Z" fill="#e9e6da" opacity=".85"/>
<path d="M-8 0 Q-4 -8 3 -7.6 Q10 -4 10.6 0 Q10 4 3 7.6 Q-4 8 -8 0Z" fill="url(#an-an)"/>
<path d="M-3 -22 Q-1 0 -3 23" stroke="#3a3328" stroke-width="1.2" fill="none" opacity=".85"/><path d="M3 -7.6 Q1.6 0 3 7.6" stroke="#3a3328" stroke-width="1.5" fill="none"/><path d="M7.6 -5 Q6.6 0 7.6 5" stroke="#3a3328" stroke-width="1" fill="none"/>
<g class="pf"><path d="M5 2 Q8 8 6 14 M5.4 2.4 Q7.6 9 4.6 15" stroke="#e9e6da" stroke-width=".6" fill="none"/></g><circle cx="7.4" cy="-1.6" r="1.1" fill="#b71c1c"/><circle cx="7.6" cy="-1.6" r=".55" fill="#111"/><circle cx="7.9" cy="-1.9" r=".2" fill="#fff"/>`,
ytang:fishArt({id:"ytang",L:28,H:21,top:"#f2c500",mid:"#ffdd2e",bot:"#ffe866",fin:"#f7d21e",finOp:.95,tail:"square",dorsal:"high",anal:"high",iris:"#3e2723",
 extra:`<circle cx="-7.6" cy="0" r=".9" fill="#fff"/><path d="M13.6 1 l2 .4" stroke="#e6b800" stroke-width="1.4" stroke-linecap="round"/>`}),
gramma:fishArt({id:"gramma",L:22,H:9,top:"#7b3fc9",mid:"#8b4fd6",bot:"#9c64e0",fin:"#f5c518",finOp:.9,tail:"fork",dorsal:"low",anal:"low",iris:"#ffd54f",
 pattern:`<path d="M-1 -6 Q-2 0 -1 6 L-12 6 L-12 -6Z" fill="#f5c518"/><path d="M-1 -6 Q-3 0 -1 6" stroke="#f5c518" stroke-width="1.6" fill="none" opacity=".5"/>`,extra:`<path d="M9.6 -1.4 L6 -.6" stroke="#212121" stroke-width=".5"/>`}),
chromis:fishArt({id:"chromis",L:12,H:5.2,top:"#26a69a",mid:"#4fd1c5",bot:"#b2f5ea",fin:"#4fd1c5",finOp:.7,tail:"lyre",dorsal:"low",iris:"#80cbc4"}),
discus:fishArt({id:"discus",L:22,H:19,top:"#c93f2e",mid:"#e2533d",bot:"#f07a5c",fin:"#c93f2e",finOp:.9,tail:"round",dorsal:"high",anal:"high",iris:"#b71c1c",
 pattern:`<path d="M-8 -6 Q-2 -8 2 -6 T10 -4 M-9 -2 Q-3 -4 1 -2 T10 0 M-9 2 Q-3 0 1 2 T10 4 M-8 6 Q-2 4 2 6 T9 6" stroke="#3fa9f5" stroke-width="1" fill="none"/>${bars(22,19,[-.2,.05,.24],.03,"#8e2a1e",.4)}`}),
cory:fishArt({id:"cory",L:16,H:6,top:"#a8977a",mid:"#d9caa9",bot:"#f2ead8",fin:"#cdbb9a",finOp:.8,tail:"fork",dorsal:"high",anal:"low",iris:"#bdbdbd",mouth:1,
 pattern:`<g fill="#5f523f">${[[-3,-1],[0,-1.6],[-1.5,.8],[2,0],[4,-1.2],[-5,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".6"/>`).join("")}</g>`,extra:`<path d="M7.4 1.6 l.6 1.4 M7 1.8 l0 1.4" stroke="#8d7a5a" stroke-width=".3"/>`}),
};

// The fish of the reef and of the planted tank, as symbols the scene places with <use>.
const symbols = (list) => list.map(([id, art]) => `<g id="aq-${id}">${art}</g>`).join("");
const REEF_FISH = symbols([
  ["clown", FISH_T.clown],
  ["tang", FISH_T.tang],
  ["ytang", FISH_T.ytang],
  ["gramma", FISH_T.gramma],
  ["chromis", FISH_T.chromis],
]);
const FRESH_FISH = symbols([
  ["neon", FISH_T.tetra()],
  ["angel", FISH_T.angel],
  ["discus", FISH_T.discus],
  ["cory", FISH_T.cory],
]);

// Bubbles, food flakes and the light rays (fixed places).
const BUBBLES = [
  [0, 2.2, 0],
  [3, 1.5, -0.7],
  [-3, 1.8, -1.3],
  [1.5, 1.2, -1.8],
];
const FLAKES = [
  [150, -0.3],
  [166, -2.5],
  [178, -1.9],
  [204, -1.1],
  [218, -3.4],
  [232, -2.7],
  [262, -0.6],
  [276, -3.0],
  [290, -2.2],
  [318, -1.4],
  [332, -0.2],
  [346, -3.1],
];
const CO2 = [
  [0, 0],
  [2, -0.5],
  [-1.5, -1],
  [1, -1.5],
];

const lamp = `<rect class="lamp" x="-400" width="800" height="2.5"/>`;
const rays = (cls) => `<g class="rays${cls}"><path d="M120 0 L150 0 L190 80 L135 80Z"/><path d="M230 0 L250 0 L290 80 L250 80Z"/><path d="M330 0 L345 0 L380 80 L345 80Z"/></g>
  <g class="caustics"><path d="M-400 5 ${"q10 -4 20 0 t20 0 ".repeat(21)}"/></g>`;
const moon = `<g class="moon"><circle cx="250" cy="12" r="9" class="halo"/><circle cx="250" cy="12" r="5.5" class="disc"/></g>`;
const bubbles = (x) =>
  `<g class="bubbles">${BUBBLES.map(([dx, r, d]) => `<circle cx="${x + dx}" cy="76" r="${r}" style="animation-delay:${d}s"/>`).join("")}</g>`;
const co2Bubbles = (x) =>
  `<g class="co2"><rect x="${x - 2.5}" y="64" width="5" height="9" rx="2" class="glass"/>${CO2.map(([dx, d]) => `<circle cx="${x + dx}" cy="64" r=".8" style="animation-delay:${d}s"/>`).join("")}</g>`;
const flakes = () => `<g class="flakes">${FLAKES.map(([x, d]) => `<rect x="${x}" y="3" width="3.4" height="2.4" rx=".6" style="animation-delay:${d}s"/>`).join("")}</g>`;
const heater = (x) => `<g class="heater"><rect x="${x}" y="12" width="4.5" height="44" rx="2.2" class="tube"/><rect x="${x + 1}" y="38" width="2.5" height="15" rx="1.2" class="coil"/><rect x="${x - 0.5}" y="9" width="5.5" height="4" rx="1.4" class="cap"/></g>`;
// A fish group: placed at (x, y), pacing (back and forth, turning at each end) with the `pace` animation, and
// bobbing up and down.
const swim = (href, x, y, pace, bob = "", scale = "") =>
  `<g transform="translate(${x} ${y})"><g class="${bob}"><g class="fish ${pace}"><use href="#${href}"${scale ? ` transform="scale(${scale})"` : ""}/></g></g></g>`;

const reefScene = () => `<g class="decor">
  <path class="rk2" d="M194 78 Q204 56 229 58 Q249 50 266 60 Q284 52 306 64 Q334 48 362 54 Q389 50 400 56 V78Z"/>
  <path class="rk" d="M204 78 Q216 64 236 66 Q254 60 272 68 L284 78Z"/>
  <path class="rk" d="M44 78 Q52 62 70 64 Q88 58 102 70 L110 78Z"/>
  <g class="rk2"><circle cx="64" cy="70" r="2"/><circle cx="84" cy="66" r="1.6"/></g>
  <g class="sway slow"><path class="fan" d="M384 78 Q382 54 388 34 M384 64 Q376 50 378 38 M386 56 Q394 46 394 36 M380 70 Q370 62 370 52"/><path class="fan thin" d="M378 44 L392 44 M375 52 L392 54 M378 60 L388 62"/></g>
  <g class="glow"><path class="acro" d="M362 78 L362 60 M362 66 L352 52 M362 64 L370 48 M352 52 L346 42 M352 52 L356 40 M370 48 L366 36 M370 48 L378 38 M362 60 L360 44"/>
    <g class="acro-tip"><circle cx="346" cy="42" r="2"/><circle cx="356" cy="40" r="2"/><circle cx="366" cy="36" r="2"/><circle cx="378" cy="38" r="2"/><circle cx="360" cy="44" r="2"/></g></g>
  <g class="glow"><path class="brain" d="M254 78 Q254 60 272 60 Q290 60 290 78Z"/><path class="brain-l" d="M258 74 q4 -6 8 -2 t8 -2 t8 2 M259 68 q5 -5 9 -1 t9 -1 t7 2 M263 63 q4 -3 9 -1 t9 0"/></g>
  <g class="glow"><path class="leather" d="M230 78 Q228 68 222 64 Q230 60 236 66 Q240 58 248 60 Q244 68 242 78Z"/>
    <g class="leather-p"><circle cx="226" cy="64" r=".9"/><circle cx="232" cy="64" r=".9"/><circle cx="241" cy="62" r=".9"/><circle cx="245" cy="61" r=".9"/></g></g>
  <g class="glow zoa"><circle cx="74" cy="62" r="2.6"/><circle cx="80" cy="60" r="2.6"/><circle cx="86" cy="62" r="2.6"/><circle cx="68" cy="64" r="2.4"/><circle cx="92" cy="65" r="2.4"/></g>
  <g class="zoa-c"><circle cx="74" cy="62" r="1"/><circle cx="80" cy="60" r="1"/><circle cx="86" cy="62" r="1"/><circle cx="68" cy="64" r="1"/><circle cx="92" cy="65" r="1"/></g>
  <g class="swimmers">
    ${swim("aq-chromis", 130, 66, "pace-c")}
    ${swim("aq-chromis", 139, 65, "pace-c")}
    ${swim("aq-chromis", 137, 71, "pace-c")}
    ${swim("aq-tang", 250, 46, "pace-a")}
    ${swim("aq-ytang", 382, 38, "pace-b", "bob slow")}
    ${swim("aq-gramma", 276, 52, "", "bob", "-1,1")}
  </g>
  <g class="sway fast-ish glow"><path class="anem" d="M306 78 Q302 68 300 60 M310 78 Q308 66 306 57 M314 78 Q314 66 314 56 M318 78 Q320 66 322 57 M322 78 Q326 68 328 60 M304 78 Q296 72 294 64 M326 78 Q334 72 336 64"/>
    <g class="anem-tip"><circle cx="300" cy="60" r="1.6"/><circle cx="306" cy="57" r="1.6"/><circle cx="314" cy="56" r="1.6"/><circle cx="322" cy="57" r="1.6"/><circle cx="328" cy="60" r="1.6"/><circle cx="294" cy="64" r="1.6"/><circle cx="336" cy="64" r="1.6"/></g></g>
  <g class="swimmers">
    ${swim("aq-clown", 314, 58, "", "bob quick", ".85")}
    ${swim("aq-clown", 296, 68, "", "bob", "-.7,.7")}
  </g></g>
  <path class="sd" d="M-400 76 Q-300 73 -200 75 T0 76 Q50 72 110 75 T230 74 T400 75 V80 H-400Z"/>
  <g class="sd2"><circle cx="134" cy="78" r="1.2"/><circle cx="184" cy="79" r="1"/><circle cx="244" cy="78" r="1.2"/><circle cx="344" cy="79" r="1"/></g>
  <g class="decor"><path class="star" d="M156 75 l2 -3 l2 3 l3 0 l-2 2 l1 3 l-4 -1.5 l-4 1.5 l1 -3 l-2 -2z"/><path class="shell" d="M210 78 q3 -4 6 0z"/></g>`;

const freshScene = () => `<g class="decor">
  <g class="sway slow"><path class="val" d="M384 78 Q378 50 386 24 Q390 12 385 2 M390 78 Q386 46 392 22 Q396 10 392 0 M396 78 Q392 52 398 30 Q402 18 398 6 M379 78 Q374 56 378 36 Q380 24 376 14"/></g>
  <path class="wood" d="M298 78 Q310 62 332 54 Q348 48 370 32 M330 55 Q326 42 316 32 M350 47 Q362 50 376 52"/>
  <path class="wood2" d="M304 74 Q314 62 332 56 M352 46 Q362 40 370 33"/>
  <g class="sway"><path class="fern" d="M332 52 Q326 44 330 38 Q336 44 332 52Z M336 50 Q338 40 344 38 Q344 46 336 50Z M326 54 Q318 50 316 44 Q324 46 326 54Z"/></g>
  <ellipse class="rk" cx="290" cy="77" rx="16" ry="7"/><ellipse class="rk2" cx="300" cy="78" rx="8" ry="4"/>
  <ellipse class="rk" cx="196" cy="78" rx="10" ry="4.5"/>
  <g class="sway"><path class="sword" d="M262 78 Q248 62 252 44 Q262 58 262 78Z M264 78 Q262 56 270 40 Q274 58 264 78Z M266 78 Q278 62 288 54 Q282 70 266 78Z M260 78 Q246 72 238 62 Q252 64 260 78Z"/>
    <path class="sword-v" d="M262 78 Q254 62 252 46 M264 78 Q266 58 270 42 M266 78 Q276 66 286 56"/></g>
  <g class="sway slow"><path class="lud" d="M222 78 Q220 60 224 40 M228 78 Q230 58 228 44 M234 78 Q236 64 240 50"/>
    <g class="lud-l"><ellipse cx="221" cy="62" rx="3" ry="1.4" transform="rotate(-30 221 62)"/><ellipse cx="226" cy="54" rx="3" ry="1.4" transform="rotate(25 226 54)"/><ellipse cx="222" cy="46" rx="3" ry="1.4" transform="rotate(-25 222 46)"/><ellipse cx="231" cy="60" rx="3" ry="1.4" transform="rotate(30 231 60)"/><ellipse cx="226" cy="50" rx="2.6" ry="1.2" transform="rotate(-30 226 50)"/><ellipse cx="238" cy="58" rx="3" ry="1.4" transform="rotate(-20 238 58)"/><ellipse cx="241" cy="52" rx="2.6" ry="1.2" transform="rotate(30 241 52)"/><ellipse cx="224" cy="42" rx="2.4" ry="1.2" transform="rotate(20 224 42)"/></g></g>
  <g class="anubias"><path d="M66 78 Q58 70 62 64 Q70 66 66 78Z M70 78 Q72 66 80 64 Q80 72 70 78Z M68 78 Q64 70 70 62 Q74 70 68 78Z"/></g>
  <path class="moss" d="M110 78 ${"q4 -4 8 0 ".repeat(17)}"/>
  <g class="swimmers">
    ${swim("aq-neon", 120, 66, "pace-c")}
    ${swim("aq-neon", 132, 63, "pace-c")}
    ${swim("aq-neon", 129, 69, "pace-c")}
    ${swim("aq-neon", 141, 66, "pace-c")}
    ${swim("aq-neon", 113, 62, "pace-c")}
    ${swim("aq-discus", 282, 48, "pace-d", "bob slow")}
    ${swim("aq-angel", 380, 44, "pace-b", "bob", ".85")}
    ${swim("aq-cory", 170, 72, "pace-e")}
  </g></g>
  <path class="sd" d="M-400 76 Q-300 73 -200 75 T0 76 Q50 73 110 75 T230 74 T400 75 V80 H-400Z"/>
  <g class="sd2"><ellipse cx="124" cy="78" rx="2" ry="1.2"/><ellipse cx="160" cy="79" rx="1.6" ry="1"/><ellipse cx="214" cy="78" rx="2" ry="1.2"/><ellipse cx="256" cy="79" rx="1.6" ry="1"/><ellipse cx="336" cy="78" rx="2" ry="1.2"/></g>`;


// ---------------------------------------------------------------------------
// Themed tanks: 18 scenes beyond the reef and the planted tank, drawn once per theme (a seeded random generator
// places their plants, stones and corals the same way every time) and cached
// ---------------------------------------------------------------------------

const THEME_ART = (() => {
  // What a scene sets while it is drawn: its water colours and light, and its substrate strip.
  let CUR = {};
let seed=1;const R=()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const rr=(a,b)=>a+R()*(b-a);const ri=(a,b)=>Math.floor(rr(a,b+1));const pick=(a)=>a[Math.floor(R()*a.length)];
const f1=(n)=>Math.round(n*10)/10;
let gid=0;const uid=(p)=>p+(++gid);
const lin=(stops,v=1)=>{const id=uid("l");return{id,def:`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</linearGradient>`}};
const rad=(stops)=>{const id=uid("r");return{id,def:`<radialGradient id="${id}">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</radialGradient>`}};
/* water: background gradient, surface line, caustic net, rays, suspended particles */
const water=(top,mid,bot,{rays:rc="#ffffff",ro=.28,lampC="#fff3c4",caus=.35,parts="#ffffff",surface=1}={})=>{
 CUR.water=[top,mid,bot];CUR.opts={rc,ro,lampC,caus,surface};
 return parts?`<g class="part" fill="${parts}">${Array.from({length:22},()=>`<circle cx="${f1(rr(100,400))}" cy="${f1(rr(8,74))}" r="${f1(rr(.3,.8))}" opacity="${f1(rr(.25,.7))}" style="animation-delay:${f1(-rr(0,8))}s"/>`).join("")}</g>`:"";};
/* distant silhouettes for depth */
const backdrop=(kind,c,o=.35)=>{let s=`<g opacity="${o}" fill="${c}" stroke="${c}">`;
 if(kind==="rock"){s+=`<path d="M100 82 Q130 58 160 64 Q190 48 220 60 Q260 40 300 56 Q340 44 370 52 Q392 46 400 50 V82Z" stroke="none"/>`;}
 if(kind==="plant"){for(let i=0;i<26;i++){const x=rr(110,400),h=rr(30,62);s+=`<path d="M${f1(x)} 82 Q${f1(x+rr(-8,8))} ${f1(82-h/2)} ${f1(x+rr(-6,6))} ${f1(82-h)}" stroke-width="${f1(rr(1.5,3))}" fill="none" stroke-linecap="round"/>`;}}
 if(kind==="coral"){for(let i=0;i<10;i++){const x=rr(140,400),y=rr(56,70);s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rr(10,22))}" ry="${f1(rr(8,14))}" stroke="none"/>`;}s+=`<rect x="100" y="66" width="300" height="16" stroke="none"/>`;}
 return s+"</g>";};
/* substrate: dune, ripples, pebbles, ground strip */
const sandBed=(c,c2,dots=["#e0c58e","#f7e7c4"],strip)=>{let s=`<path d="M-400 76 Q-200 72 0 75 Q60 71 120 74 T240 73 T400 74 V82 H-400Z" fill="${c}"/>`;
 s+=`<g stroke="${c2}" stroke-width=".6" fill="none" opacity=".7">${Array.from({length:8},(_,i)=>`<path d="M${f1(110+i*38)} ${f1(78+(i%2))} q6 -1.5 12 0 t12 0"/>`).join("")}</g>`;
 s+=`<g>${Array.from({length:40},()=>`<circle cx="${f1(rr(0,400))}" cy="${f1(rr(75,81))}" r="${f1(rr(.4,1.2))}" fill="${pick(dots)}"/>`).join("")}</g>`;
 return s+groundStrip(strip||c2,dots);};
const gravelBed=(cols,strip)=>{let s=`<path d="M-400 76 Q0 72 120 74 T400 74 V82 H-400Z" fill="${cols[0]}"/>`;
 s+=Array.from({length:110},()=>`<ellipse cx="${f1(rr(-60,400))}" cy="${f1(rr(73.5,81))}" rx="${f1(rr(1,2.4))}" ry="${f1(rr(.7,1.5))}" fill="${pick(cols)}"/>`).join("");
 return s+groundStrip(strip,cols);};
const groundStrip=(c,dots)=>{CUR.ground={c,dots};return "";};
/* rock with highlight, shadow, cracks */
const rock=(x,y,w,h,[c1,c2,c3])=>{const n=7,pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push([x-w/2+w*t,y-h*Math.sin(Math.PI*t) ** .7*rr(.75,1)]);}
 pts[0][1]=y;pts[n][1]=y;const P=pts.map(p=>p.map(f1).join(" ")).join(" L");
 const pk=pts.reduce((a,b)=>b[1]<a[1]?b:a);const right=pts.filter(p=>p[0]>=pk[0]);
 const hl=pts.filter(p=>p[0]<=pk[0]+w*.1).map(([a,b])=>[a+(pk[0]-a)*.25,b+(y-b)*.12]);
 return `<path d="M${P}Z" fill="${c1}"/><path d="M${right.map(p=>p.map(f1).join(" ")).join(" L")} L${f1(pk[0]+w*.05)} ${y}Z" fill="${c3}" opacity=".55"/><path d="M${hl.map(p=>p.map(f1).join(" ")).join(" L")} L${f1(pk[0])} ${f1(pk[1]+h*.45)}Z" fill="${c2}" opacity=".55"/><g stroke="${c3}" stroke-width=".6" fill="none" opacity=".6"><path d="M${f1(x-w*.15)} ${f1(y-h*.55)} l${f1(rr(3,6))} ${f1(rr(4,8))} l${f1(rr(-2,3))} ${f1(rr(3,6))}"/><path d="M${f1(x+w*.2)} ${f1(y-h*.4)} l${f1(rr(-5,-2))} ${f1(rr(3,6))}"/></g>`;};
/* plants */
const blades=(x0,x1,n,hmin,hmax,cols,w=2.2,cls="sway")=>`<g class="${cls}">${Array.from({length:n},()=>{const x=rr(x0,x1),h=rr(hmin,hmax),b=rr(-10,10);return `<path d="M${f1(x)} 80 Q${f1(x+b*.3)} ${f1(80-h*.5)} ${f1(x+b)} ${f1(80-h)}" stroke="${pick(cols)}" stroke-width="${f1(rr(w*.7,w*1.2))}" fill="none" stroke-linecap="round"/>`;}).join("")}</g>`;
const carpet=(x0,x1,y,cols,dens=3)=>{const by={};for(let i=0;i<Math.round((x1-x0)*dens);i++){const x=rr(x0,x1),h=rr(3,7.5),c=pick(cols);by[c]=(by[c]||"")+`M${f1(x)} ${y} q${f1(rr(-1.5,1.5))} ${f1(-h/2)} ${f1(rr(-2,2))} ${f1(-h)}`;}return `<g>${Object.entries(by).map(([c,d])=>`<path d="${d}" stroke="${c}" stroke-width=".9" fill="none" stroke-linecap="round"/>`).join("")}</g>`;};
const stem=(x,y,h,sc,lc,n=7,lw=3.2)=>{let s=`<path d="M${x} ${y} Q${f1(x+rr(-4,4))} ${f1(y-h/2)} ${f1(x+rr(-3,3))} ${f1(y-h)}" stroke="${sc}" stroke-width="1.2" fill="none"/>`;
 for(let i=1;i<=n;i++){const yy=y-h*i/(n+1),xx=x+rr(-1.5,1.5);s+=`<ellipse cx="${f1(xx-lw*.8)}" cy="${f1(yy)}" rx="${lw}" ry="${f1(lw*.38)}" transform="rotate(${f1(rr(-35,-15))} ${f1(xx)} ${f1(yy)})" fill="${lc}"/><ellipse cx="${f1(xx+lw*.8)}" cy="${f1(yy-1)}" rx="${lw}" ry="${f1(lw*.38)}" transform="rotate(${f1(rr(15,35))} ${f1(xx)} ${f1(yy)})" fill="${lc}"/>`;}
 return `<g class="sway" style="animation-duration:${pick([4,8])}s">${s}</g>`;};
const rosette=(x,y,s,c1,c2,n=7,len=22)=>`<g class="sway slow">${Array.from({length:n},(_,i)=>{const a=-80+i*(160/(n-1))+rr(-8,8),L=len*rr(.75,1.1)*s,rad=a*Math.PI/180,ex=x+Math.sin(rad)*L,ey=y-Math.cos(rad)*L,mx=x+Math.sin(rad)*L*.5,my=y-Math.cos(rad)*L*.5,px=Math.cos(rad)*3.2*s,py=Math.sin(rad)*3.2*s;return `<path d="M${x} ${y} Q${f1(mx-px)} ${f1(my-py)} ${f1(ex)} ${f1(ey)} Q${f1(mx+px)} ${f1(my+py)} ${x} ${y}Z" fill="${i%2?c1:c2}"/><path d="M${x} ${y} L${f1(ex)} ${f1(ey)}" stroke="#00000030" stroke-width=".5"/>`;}).join("")}</g>`;
const moss=(x,y,r,n,cols)=>`<g>${Array.from({length:n},()=>`<circle cx="${f1(x+rr(-r,r))}" cy="${f1(y+rr(-r*.45,r*.45))}" r="${f1(rr(1,2.2))}" fill="${pick(cols)}"/>`).join("")}</g>`;
const branch=(d,c,w,hl)=>`<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${hl}" stroke-width="${f1(w*.25)}" fill="none" stroke-linecap="round" transform="translate(-${f1(w*.2)} -${f1(w*.2)})" opacity=".6"/>`;
/* corals */
const acro=(x,y,s,c,tip,depth=3)=>{let out="";const go=(x0,y0,a,l,d)=>{const r=a*Math.PI/180,x1=x0+Math.sin(r)*l,y1=y0-Math.cos(r)*l;out+=`<path d="M${f1(x0)} ${f1(y0)} L${f1(x1)} ${f1(y1)}" stroke="${c}" stroke-width="${f1((d+1.2)*1.1*s)}" stroke-linecap="round"/>`;if(d>0){go(x1,y1,a-rr(18,32),l*.72,d-1);go(x1,y1,a+rr(18,32),l*.72,d-1);if(R()>.5)go(x1,y1,a+rr(-6,6),l*.6,d-1);}else out+=`<circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(1.4*s)}" fill="${tip}"/>`;};
 go(x,y,rr(-8,8),12*s,depth);return `<g>${out}</g>`;};
const table=(x,y,w,c,c2)=>`<path d="M${x-2} ${y} L${x-2} ${y-8} L${x+2} ${y-8} L${x+2} ${y}Z" fill="${c2}"/><path d="M${x-w/2} ${y-8} Q${x} ${y-15} ${x+w/2} ${y-8} Q${x} ${y-10} ${x-w/2} ${y-8}Z" fill="${c}"/><g stroke="${c2}" stroke-width=".5" opacity=".7">${Array.from({length:9},(_,i)=>`<path d="M${x} ${y-11} L${f1(x-w/2+i*w/8)} ${f1(y-8.5-Math.sin(Math.PI*i/8)*3.5)}"/>`).join("")}</g>`;
const brain=(x,y,r,c,l)=>`<path d="M${x-r} ${y} Q${x-r} ${y-r*1.1} ${x} ${y-r*1.1} Q${x+r} ${y-r*1.1} ${x+r} ${y}Z" fill="${c}"/><g stroke="${l}" stroke-width=".9" fill="none">${Array.from({length:Math.round(r/3)},(_,i)=>{const yy=y-2-i*2.8;const ww=r*Math.sqrt(Math.max(0,1-((y-yy)/(r*1.1)) ** 2))*.9;return `<path d="M${f1(x-ww)} ${f1(yy)} ${`q2 -2 4 0 t4 0 `.repeat(Math.max(1,Math.round(ww/4)))}"/>`;}).join("")}</g>`;
const fan=(x,y,h,c)=>{let o="";const go=(x0,y0,a,l,d)=>{const r=a*Math.PI/180,x1=x0+Math.sin(r)*l,y1=y0-Math.cos(r)*l;o+=`<path d="M${f1(x0)} ${f1(y0)} Q${f1((x0+x1)/2+rr(-2,2))} ${f1((y0+y1)/2)} ${f1(x1)} ${f1(y1)}" stroke="${c}" stroke-width="${f1(.4+d*.45)}" fill="none" stroke-linecap="round"/>`;if(d>0){go(x1,y1,a-rr(14,26),l*.75,d-1);go(x1,y1,a+rr(14,26),l*.75,d-1);}};go(x,y,0,h*.32,4);return `<g class="sway slow">${o}</g>`;};
const zoas=(x,y,n,c,ring,cen)=>`<g>${Array.from({length:n},()=>{const cx=x+rr(-9,9),cy=y+rr(-3,3);return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" fill="${ring}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="1.8" fill="${c}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r=".7" fill="${cen}"/>`;}).join("")}</g>`;
const anemone=(x,y,s,c,tip,n=14)=>`<g class="sway">${Array.from({length:n},(_,i)=>{const a=-70+i*140/(n-1)+rr(-5,5),r=a*Math.PI/180,L=rr(10,15)*s,ex=x+Math.sin(r)*L,ey=y-Math.cos(r)*L;return `<path d="M${x+rr(-4,4)*s} ${y} Q${f1(x+Math.sin(r)*L*.4+rr(-3,3))} ${f1(y-Math.cos(r)*L*.5)} ${f1(ex)} ${f1(ey)}" stroke="${c}" stroke-width="${f1(2.4*s)}" fill="none" stroke-linecap="round"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="${f1(1.3*s)}" fill="${tip}"/>`;}).join("")}</g>`;
/* animation wrappers */
const F=(sh,x,y,s=1,a="pa",d=8,dl=0,flip=false,extra="")=>`<g transform="translate(${x} ${y})"><g class="${extra}"><g class="fish t-${a}" style="animation-delay:${dl}s"><g transform="scale(${flip?-s:s} ${s})">${sh}</g></g></g></g>`;
const S=(sh,x,y,s=1,cls="bob",dl=0,flip=false)=>`<g transform="translate(${x} ${y})"><g class="${cls}" style="animation-delay:${dl}s"><g transform="scale(${flip?-s:s} ${s})">${sh}</g></g></g>`;
const school=(sh,x,y,n,s,a,d,flip)=>Array.from({length:n},(_,i)=>F(sh,f1(x+(i%4)*8.5-(i>3?4:0)+rr(-2,2)),f1(y+((i*7)%12)-6),s,a,d,f1(-rr(0,.4)),flip)).join("");
const bub=(x,y=76,n=5)=>`<g class="bub">${Array.from({length:n},(_,i)=>`<circle cx="${f1(x+rr(-3,3))}" cy="${y}" r="${f1(rr(.8,2.2))}" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width=".4" style="animation-delay:${f1(-i*.45)}s"/>`).join("")}</g>`;
/* fish (facing right, around 0,0): fins, gill, belly light, eye with highlight */
const eye=(x,y,r=1.2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#111"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.35)}" r="${f1(r*.35)}" fill="#fff"/>`;
const gill=(x,r=3,c="#00000033")=>`<path d="M${x} ${-r} Q${x+1.4} 0 ${x} ${r}" stroke="${c}" stroke-width=".55" fill="none"/>`;
const T=FISH_T;


  const TH = [];
TH.push(
{seed:3,svg:()=>water("#dcf3ec","#a9dccb","#7dbfa9")+backdrop("rock","#6f9c8f",.3)+
 rock(258,79,44,36,["#9aa1a6","#c3c8cb","#6c7378"])+rock(318,79,58,50,["#8f969b","#bcc2c6","#62696e"])+rock(372,79,34,26,["#9aa1a6","#c3c8cb","#6c7378"])+rock(222,79,18,10,["#a3a9ad","#c9cdd0","#757b80"])+
 `<path d="M110 80 Q200 74 300 76 T400 75 V80Z" fill="#4f9a2e"/>`+carpet(110,400,79,["#5fae3a","#78c24f","#4b9a2e","#8fd062"],4)+carpet(140,400,76.5,["#6bbf45","#8fd062","#9ade6e"],2.4)+
 school(T.rasbora,262,30,8,.95,"pb",8,true)+S(T.shrimp("#e3efe9","#ffffff88"),200,76,1.1)+sandBed("#ddd3bb","#cbbf9f",["#c2b591","#efe7d2","#b0a27e"],"#cfc4a6")},
{dark:1,seed:5,svg:()=>water("#b98a42","#7a531f","#432a0e",{rays:"#ffe2a6",ro:.22,lampC:"#ffd27a",caus:.18,parts:"#ffe9c2"})+backdrop("plant","#2f1d0b",.4)+
 branch("M296 0 Q298 28 286 56 Q280 70 288 80","#3b2414",6,"#6b4423")+branch("M332 0 Q338 26 356 46 Q368 60 364 80","#3b2414",5,"#6b4423")+branch("M298 22 Q318 30 328 52","#4a2e18",3,"#6b4423")+branch("M352 42 Q374 40 396 30","#4a2e18",2.6,"#6b4423")+branch("M310 8 Q300 14 286 12","#4a2e18",2,"#6b4423")+
 `<g class="hang">${[[300,30],[320,46],[360,44],[388,32]].map(([x,y])=>`<path d="M${x} ${y} q-3 8 0 16 M${x} ${y} q4 6 2 12" stroke="#5a3a1c" stroke-width=".6" fill="none"/>`).join("")}</g>`+
 `<g>${Array.from({length:16},(_,i)=>{const x=rr(110,400),y=rr(76,80),a=rr(-30,30);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path d="M-7 0 Q0 -3.4 7 0 Q0 3 -7 0Z" fill="${pick(["#6b3e17","#8a5426","#5a3313","#a0632e"])}"/><path d="M-6 0 L6 0" stroke="#3a210b" stroke-width=".4"/></g>`;}).join("")}</g>`+
 rosette(232,79,.8,"#3f6b2a","#4f7f34",6,18)+
 school(T.tetra("#e53935","#40c4ff","#e53935"),252,40,7,1,"pb",8,true)+F(T.apisto,200,66,1,"pc",10)+F(T.angel,366,36,.85,"",8,0,true,"bob")+
 sandBed("#4a2f14","#3a240f",["#5c3a1c","#2e1c0a","#6b4423"],"#2e1c0a")},
{seed:9,svg:()=>water("#95d4f3","#4ea6dd","#2c7cbe")+backdrop("rock","#2a6aa0",.35)+
 rock(300,79,70,30,["#8f8a83","#b5b0a8","#68635d"])+rock(352,79,52,42,["#99938b","#bdb7ae","#6f6a63"])+rock(390,79,40,32,["#8f8a83","#b5b0a8","#68635d"])+rock(326,52,34,20,["#a39d95","#c6c1b9","#77726b"])+rock(250,79,34,14,["#99938b","#bdb7ae","#6f6a63"])+rock(372,46,22,14,["#a39d95","#c6c1b9","#77726b"])+
 `<g fill="#6a8f3a" opacity=".55">${[[310,50],[340,40],[360,62],[385,48]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="1.3"/>`).join("")}</g>`+
 F(T.cich("#3d6fe0","#122a66","#5aa0ff"),220,36,1,"pa",8)+F(T.cich("#ffd21f","#e0b000","#ffe066","#fff6c255"),372,28,1,"pb",8,-2,true)+F(T.cich("#ff8c42","#c45a1a","#ffb27a"),262,58,.9,"pc",10,-1)+F(T.cich("#3d6fe0","#122a66","#5aa0ff"),300,20,.8,"pc",10,-4,true)+F(T.cich("#7e57c2","#4527a0","#b39ddb"),214,58,.75,"pa",8,-5)+
 sandBed("#f3ead6","#e2d6b8",["#e9dcc0","#ffffff","#d8c9a6"])},
{seed:11,svg:()=>water("#93d8f2","#55b0de","#2f82c0")+backdrop("rock","#2a77a8",.3)+
 rock(382,79,44,36,["#8f8a83","#b5b0a8","#68635d"])+rock(344,79,26,16,["#99938b","#bdb7ae","#6f6a63"])+
 `<g>${Array.from({length:14},(_,i)=>{const x=rr(150,330),y=rr(74,79),a=rr(-60,60),s=rr(.8,1.3);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${f1(s)})"><path d="M-5 0 Q-5.4 -6 0 -7 Q6 -6 6 0 Q3 3 0 3 Q-4 3 -5 0Z" fill="${pick(["#c9ad84","#b59a72","#d8c3a0"])}" stroke="#8a714f" stroke-width=".6"/><path d="M-2.6 -1 Q0 -5 2.6 -1 M-1.2 -.6 Q0 -2.8 1.2 -.6" stroke="#8a714f" stroke-width=".5" fill="none"/><ellipse cx="0" cy="1.4" rx="2" ry="1" fill="#5d4a33"/></g>`;}).join("")}</g>`+
 S(T.cich("#e8dcc2","#a8987a","#f3ead7"),232,71,.42,"bob",-.5)+S(T.cich("#e8dcc2","#a8987a","#f3ead7"),296,70,.42,"bob",-1.2,true)+S(T.cich("#e8dcc2","#a8987a","#f3ead7"),262,72,.4,"bob",-2)+
 school(T.cich("#efe4cc","#c4b392","#ffeccf"),262,34,5,.6,"pa",8)+F(T.cich("#f7d26a","#c9a23b","#fff1a8"),380,26,.7,"pb",8,0,true)+
 sandBed("#efe3c8","#dfd0ae",["#e2d3b2","#fff8e8","#cdbb93"])},
{seed:13,svg:()=>water("#dff4e8","#ade0c7","#83c4a6")+backdrop("plant","#4f8f6f",.3)+
 `<g transform="translate(0 0)"><path d="M240 80 Q256 54 300 48 Q340 44 374 26 L380 30 Q346 50 302 54 Q262 60 250 80Z" fill="#b39a7d"/>${Array.from({length:10},(_,i)=>`<ellipse cx="${f1(258+i*12)}" cy="${f1(66-i*3.4)}" rx="1.8" ry="1.1" fill="#6d5a45"/>`).join("")}</g>`+
 moss(270,60,12,40,["#4f8f34","#6aa84f","#3d7a28"])+moss(320,50,14,46,["#4f8f34","#6aa84f","#3d7a28"])+moss(362,36,10,30,["#4f8f34","#6aa84f"])+
 rosette(388,79,.7,"#2f6f2a","#3f8a35",5,16)+carpet(110,240,79,["#4f8f34","#6aa84f","#3d7a28"],1.6)+
 F(T.shrimp("#e53935"),234,76,1.3,"pc",10)+F(T.shrimp("#e53935"),318,46,1.2,"pc",10,-3)+F(T.shrimp("#1e88e5","#bbdefb88"),368,74,1.2,"pc",10,-6,true)+F(T.shrimp("#e53935"),286,76,1.1,"pc",10,-2,true)+F(T.shrimp("#ffb300"),350,30,1,"pc",10,-7,true)+
 S(T.snail("#5d4037"),206,76,1)+S(T.snail("#e0a96d","#f3e0c5"),340,62,.8,"bob",-1)+gravelBed(["#4b3b2c","#3a2d22","#5a4836","#2e241b"],"#3a2d22")},
{seed:17,svg:()=>water("#d3ece2","#a0d0bd","#79b49e",{ro:.22})+backdrop("plant","#3f7a5f",.25)+
 `<g>${[[196,4,9],[222,3,8],[250,5,10],[292,3,8],[344,4,9],[376,3,8],[150,4,7]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="2.6" fill="#6aa84f"/><ellipse cx="${x-2}" cy="${y-.6}" rx="${f1(r*.5)}" ry="1" fill="#8bc34a"/>`).join("")}</g>`+
 `<g class="hang" stroke="#4c7f35" stroke-width=".45">${[196,250,344].map(x=>`<path d="M${x} 6 v10 M${x-2} 6 v8 M${x+2} 6 v9 M${x+1} 6 v12"/>`).join("")}</g>`+
 `<g transform="translate(318 5) rotate(12)"><path d="M-12 0 Q0 -5 12 0 Q0 4 -12 0Z" fill="#a0522d"/><path d="M-11 0 L11 0 M-6 0 l3 -2 M-2 0 l3 -2.4 M2 0 l3 -2 M-6 0 l3 2 M-2 0 l3 2.2" stroke="#6d3a1c" stroke-width=".5"/></g>`+
 rosette(378,79,.9,"#2e7d32","#388e3c",7,20)+stem(214,79,40,"#5d8a3a","#7cb342",6,2.6)+
 F(T.betta("#b71c1c","#e53935","#ff8a80"),280,42,1.3,"pc",10,0,false,"bob")+S(T.snail("#3e2723","#bcaaa4"),234,76,1)+
 gravelBed(["#5a4a3a","#47392c","#6b5846","#3a2e23"],"#47392c")},
{seed:19,svg:()=>water("#c4e8f8","#86c8ec","#58a7da")+
 `<g transform="translate(346 80)"><rect x="-18" y="-26" width="36" height="26" fill="#b0bec5"/><rect x="-22" y="-34" width="10" height="34" fill="#a7b6bd"/><rect x="12" y="-34" width="10" height="34" fill="#a7b6bd"/><rect x="-7" y="-46" width="14" height="22" fill="#b8c6cc"/><path d="M-22 -34 h2.5 v-3 h2.5 v3 h2.5 v-3 h2.5 v3 M12 -34 h2.5 v-3 h2.5 v3 h2.5 v-3 h2.5 v3" stroke="#90a4ae" stroke-width="1" fill="none"/><path d="M-7 -46 L0 -56 L7 -46Z" fill="#e57373"/><path d="M0 -56 v-4 l4 1.4 l-4 1.4" fill="#ffca28" stroke="#ffca28" stroke-width=".4"/><rect x="-4" y="-14" width="8" height="14" rx="4" fill="#455a64"/><rect x="-3" y="-38" width="6" height="7" rx="3" fill="#455a64"/><g stroke="#90a4ae" stroke-width=".4">${[-10,-4,4,10].map(y=>`<path d="M-18 ${y-12} h36"/>`).join("")}</g><g fill="#6aa84f">${Array.from({length:8},(_,i)=>`<circle cx="${-20+i*5.6}" cy="${-2-(i%2)*2}" r="1.6"/>`).join("")}</g></g>`+
 `<rect x="226" y="75" width="12" height="4" rx="2" fill="#78909c"/><path d="M232 75 Q240 60 236 40" stroke="#ffffff55" stroke-width=".4" fill="none"/>`+bub(232,74,7)+
 stem(398,79,46,"#4f8a2a","#7cb342",7,2.8)+stem(200,79,34,"#4f8a2a","#8bc34a",5,2.6)+
 F(T.gold(),262,40,1.1,"pa",8)+F(T.gold("#fafafa","#ff7043","#ffffff"),382,30,1,"pb",8,-3,true)+F(T.gold("#212121","#424242","#616161"),300,60,.8,"pc",10,-5)+
 `<path d="M-400 76 Q0 72 120 74 T400 74 V82 H-400Z" fill="#7e57c2"/>${Array.from({length:120},()=>`<ellipse cx="${f1(rr(-60,400))}" cy="${f1(rr(73.5,81))}" rx="${f1(rr(1.2,2.4))}" ry="${f1(rr(.9,1.6))}" fill="${pick(["#ef5350","#42a5f5","#ffee58","#66bb6a","#ab47bc","#ff7043"])}"/>`).join("")}`+groundStrip("#5e35b1",["#ef5350","#42a5f5","#ffee58","#66bb6a"])},
{seed:23,svg:()=>water("#b2cdac","#7da37e","#4f7356",{ro:.2,parts:"#e8f0d8"})+backdrop("plant","#3f5f44",.3)+
 [["M262 0 Q264 28 252 80",4],["M264 18 Q282 40 288 80",3],["M264 18 Q240 44 230 80",3],["M264 30 Q270 50 266 80",2],["M352 0 Q356 30 346 80",4],["M354 24 Q376 44 384 80",3],["M354 24 Q332 50 318 80",3],["M354 40 Q362 60 360 80",2]].map(([d,w])=>branch(d,"#5d4037",w,"#8d6e63")).join("")+
 `<g fill="#6d8f3a">${[[262,4],[352,6],[300,3]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="14" ry="3"/>`).join("")}</g>`+
 `<path d="M286 80 Q300 64 326 68 Q344 70 358 80Z" fill="#6d5c45"/><path d="M292 76 Q310 68 330 71" stroke="#8a7658" stroke-width="1" fill="none"/>`+
 `<g fill="#7a6a4c">${Array.from({length:6},()=>`<circle cx="${f1(rr(296,350))}" cy="${f1(rr(72,78))}" r="${f1(rr(.5,1.1))}"/>`).join("")}</g>`+
 F(T.archer,302,12,1.1,"pc",10)+F(T.archer,374,18,.9,"pc",10,-4,true)+S(T.mud,318,66,1.15)+school(T.tetra("#c0ca33","#9e9d24","#e6ee9c"),190,56,4,.8,"pc",10,false)+
 sandBed("#5b4a35","#4a3b29",["#6b5a42","#3e3020","#7a6a4c"],"#3e3020")},
{dark:1,seed:29,svg:()=>water("#2f6b62","#255a52","#1a463f",{ro:0,caus:.22,parts:"#cfe8e0",surface:0})+
 `<g opacity=".35" fill="#123a33">${Array.from({length:12},()=>`<ellipse cx="${f1(rr(120,400))}" cy="${f1(rr(10,76))}" rx="${f1(rr(6,16))}" ry="${f1(rr(3,7))}"/>`).join("")}</g>`+
 [[232,20,11],[304,62,13],[374,22,12],[182,68,8],[394,68,10],[340,44,7]].map(([x,y,r])=>`<path d="M${x} ${y} L${f1(x+r*.98)} ${f1(y-r*.2)} A${r} ${r} 0 1 1 ${f1(x+r*.6)} ${f1(y-r*.8)}Z" fill="#3f8f4a"/><path d="M${x} ${y} L${f1(x+r*.98)} ${f1(y-r*.2)} A${r} ${r} 0 0 1 ${f1(x+r*.4)} ${f1(y+r*.9)}Z" fill="#4caf50" opacity=".6"/><g stroke="#2e6b36" stroke-width=".4">${[30,90,150,210,270].map(a=>`<path d="M${x} ${y} l${f1(Math.cos(a*Math.PI/180)*r*.85)} ${f1(Math.sin(a*Math.PI/180)*r*.85)}"/>`).join("")}</g>`).join("")+
 `<g transform="translate(304 62)">${[0,60,120,180,240,300].map(a=>`<path d="M0 0 Q${f1(Math.cos(a*Math.PI/180)*4-2)} ${f1(Math.sin(a*Math.PI/180)*4-2)} ${f1(Math.cos(a*Math.PI/180)*7)} ${f1(Math.sin(a*Math.PI/180)*7)} Q${f1(Math.cos(a*Math.PI/180)*4+2)} ${f1(Math.sin(a*Math.PI/180)*4+2)} 0 0Z" fill="#f8bbd0"/>`).join("")}${[30,90,150,210,270,330].map(a=>`<path d="M0 0 L${f1(Math.cos(a*Math.PI/180)*4.6)} ${f1(Math.sin(a*Math.PI/180)*4.6)}" stroke="#f06292" stroke-width="2.2" stroke-linecap="round"/>`).join("")}<circle r="1.8" fill="#ffee58"/></g>`+
 F(T.koi(),236,44,1.05,"pa",8)+F(T.koi("#f57c00","#fff8e1"),372,50,.95,"pb",8,-3,true)+F(T.koi("#212121","#e0e0e0"),292,30,.85,"pc",10,-5)+F(T.koi("#ffd54f","#ffd54f"),210,24,.7,"pc",10,-2)+
 `<g>${Array.from({length:44},(_,i)=>`<ellipse cx="${f1(-110+i*12+rr(-2,2))}" cy="${f1(86+rr(-1.5,1.5))}" rx="${f1(rr(5,8))}" ry="${f1(rr(3,4.6))}" fill="${pick(["#8d8a80","#a19e94","#77746b","#b6b2a7"])}" stroke="#5f5c54" stroke-width=".4"/>`).join("")}</g>`},
);
const rockReef=(x,y,w,h)=>rock(x,y,w,h,["#8a8178","#ada39a","#665e57"]);
TH.push(
{seed:31,svg:()=>water("#86d6f7","#3ea0e0","#2272c0",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.35)+
 rockReef(300,79,200,26)+rockReef(380,79,50,36)+
 acro(214,70,.9,"#ab47bc","#f48fb1")+acro(250,64,1.05,"#26c6da","#e0f7fa")+acro(282,62,.95,"#66bb6a","#c5e1a5")+acro(388,52,.9,"#7e57c2","#80deea")+acro(232,72,.6,"#ec407a","#fff59d")+
 table(334,58,44,"#ff8a65","#e0603a")+table(362,70,26,"#26a69a","#00796b")+
 `<g>${Array.from({length:6},(_,i)=>`<path d="M${300+i*5} 72 q4 -6 8 0" fill="${pick(["#ffca28","#ff7043","#ab47bc"])}" opacity=".9"/>`).join("")}</g>`+
 zoas(270,74,8,"#ff7043","#00e5ff","#ffee58")+
 school(T.anthias,262,22,6,.9,"pa",8)+F(T.wrasse,372,34,.95,"pb",8,-2,true)+F(T.anthias,224,44,.8,"pc",10,-3)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:37,svg:()=>water("#8dcdef","#4d9ed6","#2c78ba",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.3)+
 rockReef(312,79,190,24)+rockReef(388,79,40,34)+
 [[236,64],[258,66],[352,58],[380,46],[274,62]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><path d="M0 0 L0 -13" stroke="#f3e5f5" stroke-width="2.4" stroke-linecap="round"/>${[-12,-9].map(sy=>`<path d="M0 ${sy} l${i%2?-3:3} -2" stroke="#f3e5f5" stroke-width="1.4"/>`).join("")}<g class="pulse" style="animation-delay:${f1(-i*.55)}s;animation-duration:2s">${[-60,-35,-12,12,35,60].map(a=>`<g transform="translate(0 -13) rotate(${a})"><path d="M0 0 L0 -6" stroke="#e1bee7" stroke-width="1.8" stroke-linecap="round"/><g stroke="#f8bbd0" stroke-width=".5">${[-2,-3.6,-5].map(t=>`<path d="M0 ${t} l-1.2 -.8 M0 ${t} l1.2 -.8"/>`).join("")}</g></g>`).join("")}</g></g>`).join("")+
 `<g transform="translate(306 66)"><path d="M-4 0 Q-5 -8 -3 -11 L3 -11 Q5 -8 4 0Z" fill="#ffe0b2"/><path d="M-16 -11 Q-14 -17 0 -18 Q14 -17 16 -11 Q8 -9 0 -9.6 Q-8 -9 -16 -11Z" fill="#ffcc80"/><g fill="#fff3e0">${Array.from({length:22},()=>`<circle cx="${f1(rr(-13,13))}" cy="${f1(rr(-16.5,-11))}" r=".75"/>`).join("")}</g></g>`+
 [[380,74,"#43a047","#2e7d32"],[220,77,"#ef5350","#c62828"],[338,76,"#5c6bc0","#3949ab"]].map(([x,y,c,c2])=>`<ellipse cx="${x}" cy="${y}" rx="7.4" ry="2.8" fill="${c}"/><g stroke="${c2}" stroke-width=".4">${[0,30,60,90,120,150].map(a=>`<path d="M${x} ${y} l${f1(Math.cos(a*Math.PI/180)*7)} ${f1(Math.sin(a*Math.PI/180)*2.6)} M${x} ${y} l${f1(-Math.cos(a*Math.PI/180)*7)} ${f1(-Math.sin(a*Math.PI/180)*2.6)}"/>`).join("")}</g><circle cx="${x}" cy="${y}" r="1" fill="${c2}"/>`).join("")+
 zoas(250,74,9,"#00e676","#ff4081","#ffeb3b")+
 F(T.clown,332,42,.85,"pc",10)+F(T.clown,346,48,.7,"pc",10,-.6)+S(T.goby,200,75,1)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:41,svg:()=>water("#90d2f1","#56a8dc","#307fc2",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.25)+
 rockReef(318,79,96,34)+rockReef(374,79,46,46)+rockReef(260,79,30,14)+
 `<g transform="translate(300 52)">${[[-8,-10],[-3,-14],[3,-13],[9,-9],[0,-8]].map(([dx,dy])=>`<path d="M0 0 L${dx} ${dy}" stroke="#a1887f" stroke-width="1.8" stroke-linecap="round"/><g class="sway" style="animation-duration:2s"><circle cx="${dx}" cy="${dy}" r="3.4" fill="#80deea"/><circle cx="${dx-1.2}" cy="${dy-1.4}" r="1.4" fill="#b2ebf2"/><circle cx="${dx}" cy="${dy}" r="1.2" fill="#00838f"/></g>`).join("")}</g>`+
 anemone(352,48,.8,"#f7b3c9","#f06a9b",12)+zoas(232,74,6,"#ff7043","#7c4dff","#ffee58")+acro(392,34,.6,"#ab47bc","#f48fb1",2)+
 S(T.cleaner,330,30,1)+F(T.clown,248,40,.9,"pc",10)+F(T.clown,262,46,.75,"pc",10,-.6)+S(T.goby,214,75,1,"bob",-1)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:43,svg:()=>water("#a0d9ea","#5fb2cf","#3889b0",{lampC:"#fff8e1"})+backdrop("plant","#2c6e8a",.3)+
 blades(200,400,26,30,74,["#6b8e23","#7cb342","#558b2f","#8bc34a"],2.4)+
 fan(284,79,58,"#ef6c00")+fan(372,79,48,"#d84315")+fan(232,79,36,"#fbc02d")+
 S(T.horse(),250,44,1.25)+S(T.horse("#ef6c00","#bf360c"),352,38,1.15,"bob",-1.5,true)+S(T.horse("#fdd835","#f9a825"),306,58,.8,"bob",-.8)+
 `<g>${Array.from({length:5},()=>`<path d="M${f1(rr(210,390))} 79 q2 -2 4 0" fill="${pick(["#fff3e0","#ffe0b2"])}"/>`).join("")}</g>`+
 sandBed("#efe0bd","#dfc99c")},
{dark:1,seed:47,svg:()=>water("#2a3584","#161e58","#0b0f33",{ro:0,caus:0,lampC:"#7c4dff",parts:"#b39ddb"})+
 (()=>{const a=rad([[0,"#ce93d8",.45],[1,"#ce93d8",0]]),b=rad([[0,"#4dd0e1",.4],[1,"#4dd0e1",0]]),c=rad([[0,"#ffb74d",.35],[1,"#ffb74d",0]]);return `<defs>${a.def}${b.def}${c.def}</defs><g class="gl"><circle cx="268" cy="30" r="40" fill="url(#${a.id})"/><circle cx="360" cy="56" r="34" fill="url(#${b.id})"/><circle cx="214" cy="60" r="26" fill="url(#${c.id})"/></g>`;})()+
 [[250,26,"#f8bbd0",0,1],[300,52,"#80deea",-1,1.1],[350,20,"#ce93d8",-2,.9],[388,58,"#f8bbd0",-3,.8],[212,58,"#ffcc80",-4,.75],[330,70,"#b2ebf2",-5,.6]].map(([x,y,c,d,s])=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="rise" style="animation-delay:${d}s"><g class="pulse" style="animation-delay:${d/2}s">${T.jelly(c)}</g></g></g>`).join("")+
 `<rect x="-400" y="84" width="800" height="6" fill="#07091c"/><rect x="-400" y="84" width="800" height=".6" fill="#7c4dff" opacity=".5"/>`},
{seed:53,svg:()=>water("#86cbe9","#4a9cc8","#2c74a5",{lampC:"#fff8e1"})+backdrop("rock","#255f86",.35)+
 `<path d="M326 80 Q330 40 366 34 Q400 32 400 46 V80Z" fill="#7d746b"/><path d="M326 80 Q330 40 366 34 L370 40 Q340 46 336 80Z" fill="#a0968c" opacity=".6"/><ellipse cx="358" cy="62" rx="13" ry="10" fill="#2a2522"/><ellipse cx="358" cy="62" rx="9" ry="6.4" fill="#1a1715"/>`+
 rockReef(214,79,52,18)+fan(244,66,26,"#ad1457")+acro(392,32,.55,"#ab47bc","#f48fb1",2)+
 S(T.moray,350,62,1.05,"bob",0,true)+F(T.lion,282,34,1.15,"pc",10,0,false,"bob")+F(T.stingray,280,76,1,"pc",10,-3)+school(T.anthias,220,26,3,.6,"pa",8)+
 sandBed("#efe0bd","#dfc99c")},
);
TH.push(
{seed:61,svg:()=>water("#74c1e6","#3c90c8","#236aa6",{ro:.24,lampC:"#fff8e1"})+backdrop("rock","#1e5a8c",.3)+
 `<g transform="rotate(-9 330 72)"><path d="M262 80 L276 50 L388 47 L404 76Z" fill="#6d4c33"/>${[0,1,2,3].map(i=>`<path d="M${268+i*2} ${66-i*5} L${396-i*1} ${62-i*5}" stroke="#4e3423" stroke-width=".8"/>`).join("")}<path d="M276 50 L388 47 L384 54 L278 57Z" fill="#8d6748"/><path d="M276 50 L388 47" stroke="#a1795a" stroke-width="1.2"/>${[296,318,340,362].map(x=>`<rect x="${x}" y="58" width="7" height="5" rx="1" fill="#2e1f14"/>`).join("")}<path d="M312 74 Q318 66 326 74Z" fill="#1d140d"/><path d="M330 48 L328 10" stroke="#5d4037" stroke-width="3"/><path d="M314 22 L344 22" stroke="#5d4037" stroke-width="2"/><path d="M330 14 Q348 20 340 34 L330 32Z" fill="#d7ccc8" opacity=".75"/><path d="M330 14 Q348 20 340 34" stroke="#a1887f" stroke-width=".5" fill="none"/><path d="M372 48 L380 30" stroke="#5d4037" stroke-width="2"/></g>`+
 `<g class="sway">${blades(270,320,6,10,22,["#7cb342","#558b2f"],1.6,"")}</g>`+zoas(300,74,5,"#ff7043","#7c4dff","#ffee58")+
 (()=>{const g=rad([[0,"#ffd54f",.85],[1,"#ffd54f",0]]);return `<defs>${g.def}</defs><g transform="translate(226 75)"><circle class="gl" cx="0" cy="-8" r="16" fill="url(#${g.id})"/><rect x="-10" y="-6" width="20" height="11" rx="1.5" fill="#8d5524"/><path d="M-10 -6 Q0 -18 10 -6Z" fill="#a0632e"/><path d="M-10 -1 h20 M-10 3 h20" stroke="#5d3a17" stroke-width=".8"/><rect x="-2" y="-4" width="4" height="4" fill="#ffca28"/><g fill="#ffca28"><circle cx="-5" cy="-7" r="1.8"/><circle cx="-1" cy="-8.4" r="1.8"/><circle cx="3.4" cy="-7.4" r="1.8"/><circle cx="6" cy="-6" r="1.4"/></g><path d="M-6 -9 l1 -2 M2 -10 l1 -2" stroke="#fff59d" stroke-width=".6"/><g fill="#ffca28">${[[-14,4],[13,4],[16,5]].map(([a,b])=>`<ellipse cx="${a}" cy="${b}" rx="1.8" ry=".8"/>`).join("")}</g></g>`;})()+bub(230,62,5)+
 F(T.butterfly,256,34,1,"pa",8)+F(T.tang,384,26,.8,"pb",8,-3,true)+F(T.butterfly,300,20,.7,"pc",10,-4,true)+
 sandBed("#efe0bd","#dfc99c")},
{dark:1,seed:67,svg:()=>water("#0e1628","#070b17","#02040a",{ro:0,caus:0,surface:0,parts:"#90a4ae"})+
 `<g class="snow" fill="#cfd8dc">${Array.from({length:22},(_,i)=>`<circle cx="${f1(rr(110,400))}" cy="${f1(rr(0,30))}" r="${f1(rr(.5,1.1))}" style="animation-delay:${f1(-i*.37)}s"/>`).join("")}</g>`+
 `<g opacity=".7"><path d="M330 80 Q334 60 340 58 Q346 60 350 80Z" fill="#1b1f2a"/><g class="gl"><path d="M340 58 Q336 46 342 36 Q346 46 340 58" fill="#263238" opacity=".8"/></g><g fill="#ff7043" class="gl">${[[336,74],[344,70],[348,76]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".8"/>`).join("")}</g></g>`+
 `<g>${Array.from({length:5},()=>{const x=rr(200,390);return `<path d="M${f1(x)} 80 L${f1(x)} 72" stroke="#cfd8dc" stroke-width=".5" opacity=".6"/><circle cx="${f1(x)}" cy="71.5" r="1" fill="#e57373" opacity=".7"/>`;}).join("")}</g>`+
 F(T.angler,296,46,1.25,"pc",10)+F(T.lantern,232,22,1,"pa",8)+F(T.lantern,384,62,.9,"pb",8,-3,true)+F(T.lantern,254,64,.8,"pa",8,-5)+F(T.lantern,360,26,.7,"pb",8,-1,true)+
 `<path d="M-400 78 Q0 75 200 77 T400 76 V82 H-400Z" fill="#0b0e17"/><rect x="-400" y="82" width="800" height="8" fill="#05070d"/>`},
{seed:71,svg:()=>water("#e3f3f9","#a9d3e8","#73a8ce",{rays:"#ffffff",ro:.35,caus:.3,lampC:"#ffffff"})+
 `<path d="M-400 0 H400 V12 Q384 18 368 11 Q350 20 330 10 Q312 16 292 9 Q270 18 250 10 Q228 15 206 9 Q180 14 160 9 Q140 16 120 10 Q96 16 72 10 Q40 15 0 10 L-400 10Z" fill="#fafdff"/><path d="M160 8 Q180 14 206 9 Q228 15 250 10 Q270 18 292 9 Q312 16 330 10 Q350 20 368 11 Q384 18 400 12" stroke="#b3d9ec" stroke-width="1.2" fill="none"/><g fill="#e1f2fb">${[[214,11,9],[262,15,12],[300,11,7],[354,17,13],[388,15,8]].map(([x,y,h])=>`<path d="M${x-2.4} ${y-2} l2.4 ${h} l2.4 ${-h}Z"/>`).join("")}</g>`+
 `<g fill="#cfe7f3" opacity=".7"><path d="M300 30 l6 -4 l8 2 l-2 6 l-9 1Z"/><path d="M220 40 l5 -3 l6 2 l-2 4 l-7 1Z"/></g>`+
 F(T.seal,300,36,1.15,"pc",10)+school(T.cod,246,56,6,.9,"pa",8)+S(T.jelly("#e1f5fe","#ffffff"),382,40,.65)+
 rock(352,79,60,14,["#90a4ae","#b0bec5","#607d8b"])+rock(222,79,30,8,["#9eb0b9","#c5d1d7","#6d828c"])+
 `<g>${Array.from({length:9},()=>`<circle cx="${f1(rr(200,400))}" cy="${f1(rr(76,79))}" r="${f1(rr(.6,1.2))}" fill="#ffffff"/>`).join("")}</g>`+
 sandBed("#cfd8dc","#b0bec5",["#b0bec5","#eceff1","#90a4ae"])},
);

// Terrariums, vivariums and turtle tanks.
/* air (terrarium): its colours and lamp, and the parts that follow the equipment, drawn by the card: the basking
   spot's cone and glow, the UVB tube and the mist */
const air=(top,mid,bot,{lamp="#fff3c4",spot=null,mist=0,uv=0}={})=>{CUR.water=[top,mid,bot];CUR.opts={ro:0,caus:0,lampC:lamp,surface:1};
 const live={mist,uv,spot:"",tube:`<rect x="140" y="3" width="260" height="2.2" rx="1" fill="#f3eeff"/><rect x="140" y="5" width="260" height="1" fill="#b39ddb" opacity=".6"/>`};
 if(spot){const[x,y]=spot;const c=lin([[0,"#ffcc66",.55],[1,"#ffcc66",0]]),r=rad([[0,"#ffd27a",.65],[1,"#ffb74d",0]]);live.spot=`<defs>${c.def}${r.def}</defs><path d="M${x-7} 6 L${x+7} 6 L${x+34} ${y} L${x-34} ${y}Z" fill="url(#${c.id})" class="gl slow"/><ellipse cx="${x}" cy="${y}" rx="36" ry="10" fill="url(#${r.id})" class="gl slow"/>`;live.fixture=`<path d="M${x-9} 0 L${x+9} 0 L${x+7} 6 L${x-7} 6Z" fill="#455a64"/><rect x="${x-6}" y="5.4" width="12" height="1.6" rx=".8" class="bulb"/>`;}
 live.fog=`<g class="mist" fill="#ffffff">${Array.from({length:7},(_,i)=>`<ellipse cx="${140+i*42+((i*37)%17)-8}" cy="${12+((i*53)%19)}" rx="${18+((i*29)%15)}" ry="${4+((i*7)%5)}" opacity="${f1(.12+((i*31)%13)/100)}" style="animation-delay:${f1(-i*1.1)}s"/>`).join("")}</g>`;
 CUR.air=live;return "";};
const glass=()=>`<path d="M392 6 L398 6 L398 80 L392 80Z" fill="#ffffff" opacity=".08"/><path d="M150 8 L170 8 L120 80 L100 80Z" fill="#ffffff" opacity=".05"/>`;
const soil=(c,dots,ground)=>{CUR.ground={c:ground,dots};return `<path d="M-400 76 Q-200 72 0 75 Q80 70 160 74 T300 72 T400 74 V82 H-400Z" fill="${c}"/>${Array.from({length:70},()=>`<ellipse cx="${f1(rr(-40,400))}" cy="${f1(rr(73,81))}" rx="${f1(rr(.6,1.6))}" ry="${f1(rr(.4,1))}" fill="${pick(dots)}"/>`).join("")}`;};
const cactus=(x,y,h,c="#5b8c3a",c2="#3f6b28")=>`<g><path d="M${x-4} ${y} L${x-4} ${y-h+4} Q${x} ${y-h-2} ${x+4} ${y-h+4} L${x+4} ${y}Z" fill="${c}"/><path d="M${x-4} ${y-h*.45} L${x-10} ${y-h*.45} L${x-10} ${y-h*.75} Q${x-7} ${y-h*.85} ${x-6} ${y-h*.75} L${x-6} ${y-h*.55} L${x-4} ${y-h*.55}Z" fill="${c}"/><path d="M${x+4} ${y-h*.6} L${x+9} ${y-h*.6} L${x+9} ${y-h*.85} Q${x+11.5} ${y-h*.95} ${x+12} ${y-h*.85} L${x+12} ${y-h*.52} L${x+4} ${y-h*.52}Z" fill="${c}"/><path d="M${x} ${y} L${x} ${y-h+2} M${x-2} ${y} L${x-2} ${y-h+4} M${x+2} ${y} L${x+2} ${y-h+4}" stroke="${c2}" stroke-width=".5"/><g stroke="#f1f8e9" stroke-width=".4">${Array.from({length:Math.round(h/3)},(_,i)=>`<path d="M${x-4} ${y-2-i*3} l-1.4 -.6 M${x+4} ${y-3-i*3} l1.4 -.6"/>`).join("")}</g><circle cx="${x}" cy="${y-h-1}" r="1.8" fill="#f06292"/></g>`;
const brom=(x,y,s,c,c2)=>`<g class="sway slow">${Array.from({length:9},(_,i)=>{const a=-75+i*150/8,r=a*Math.PI/180,L=(i%2?14:18)*s;return `<path d="M${x} ${y} Q${f1(x+Math.sin(r)*L*.6-1)} ${f1(y-Math.cos(r)*L*.6)} ${f1(x+Math.sin(r)*L)} ${f1(y-Math.cos(r)*L)} Q${f1(x+Math.sin(r)*L*.6+1.6)} ${f1(y-Math.cos(r)*L*.5)} ${x} ${y}Z" fill="${Math.abs(a)<30?c2:c}"/>`;}).join("")}</g>`;
const vine=(x,y,len,c="#4caf50")=>`<g class="hang"><path d="M${x} ${y} Q${x+4} ${y+len/2} ${x-2} ${y+len}" stroke="#5d4037" stroke-width=".8" fill="none"/>${Array.from({length:Math.round(len/5)},(_,i)=>`<ellipse cx="${f1(x+(i%2?2.4:-2.4)+Math.sin(i)*1.5)}" cy="${f1(y+4+i*5)}" rx="2.4" ry="1.3" transform="rotate(${i%2?30:-30} ${f1(x)} ${f1(y+4+i*5)})" fill="${c}"/>`).join("")}</g>`;
const hide=(x,y,w,c="#6d4c33",c2="#4e3423")=>`<path d="M${x-w/2} ${y} Q${x-w/2} ${y-w*.55} ${x} ${y-w*.6} Q${x+w/2} ${y-w*.55} ${x+w/2} ${y}Z" fill="${c}"/><path d="M${x-w*.25} ${y} Q${x-w*.25} ${y-w*.3} ${x} ${y-w*.3} Q${x+w*.25} ${y-w*.3} ${x+w*.25} ${y}Z" fill="#1d140d"/><g stroke="${c2}" stroke-width=".6" fill="none">${[.15,.3,.45].map(k=>`<path d="M${f1(x-w/2+w*k)} ${f1(y-w*.4)} q4 -2 8 0"/>`).join("")}</g>`;
const bowl=(x,y,w=22,water="#7ec8e3")=>`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="3.6" fill="#78909c"/><ellipse cx="${x}" cy="${y-1.4}" rx="${w/2-2}" ry="2.4" fill="${water}"/><path d="M${x-w/2+4} ${y-1.6} q3 -1 6 0" stroke="#fff" stroke-width=".5" fill="none" opacity=".7"/>`;
const drip=(x,y)=>`<g class="drip"><circle cx="${x}" cy="${y}" r="1" fill="#b3e5fc"/></g>`;
const leaf=(x,y,s,a,c="#2e7d32",v="#1b5e20")=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0 Q8 -6 20 0 Q8 6 0 0Z" fill="${c}"/><path d="M0 0 L19 0 M6 0 l3 -2 M10 0 l3 -2 M6 0 l3 2 M10 0 l3 2" stroke="${v}" stroke-width=".5"/></g>`;
const waterPart=(x0,x1,y,c1,c2)=>{CUR.wet=1;const g=lin([[0,c1,.85],[1,c2,.95]]);return `<defs>${g.def}</defs><rect x="${x0}" y="${y}" width="${x1-x0}" height="${80-y}" fill="url(#${g.id})"/><path d="M${x0} ${y} ${`q4 -1.4 8 0 t8 0 `.repeat(Math.ceil((x1-x0)/16))}" stroke="#ffffff" stroke-width=".7" fill="none" opacity=".7" class="caus"/><rect x="${x0}" y="${y}" width="${x1-x0}" height="1" fill="#fff" opacity=".35"/>`;};
const A={
/* Bearded dragon: sprawled on the basking rock, spiny beard and flanks, banded tail. */
dragon:`<defs><linearGradient id="an-dr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6be86"/><stop offset=".55" stop-color="#cf9658"/><stop offset="1" stop-color="#a06a35"/></linearGradient></defs>
<g class="tail"><path d="M-12 1.5 Q-24 1 -44 5.4 Q-26 5.8 -12 5Z" fill="url(#an-dr)"/><path d="M-18 1.6 v3.6 M-24 1.8 v3.4 M-30 2.4 v2.8 M-36 3.4 v2" stroke="#9a6532" stroke-width="1.1" opacity=".6"/></g>
<g class="lg-b"><path d="M-8 3 Q-11 6 -15 8.4" stroke="#9a6532" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-15 8.4 l-2.2 .2 M-15 8.4 l-1.6 1.4 M-15 8.4 l-.4 1.6" stroke="#7d5129" stroke-width=".6"/></g>
<g class="lg-b"><path d="M8 3 Q10 6 13 8.4" stroke="#9a6532" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M13 8.4 l2 .4 M13 8.4 l1.4 1.4 M13 8.4 l0 1.7" stroke="#7d5129" stroke-width=".6"/></g>
<path d="M-14 1.6 Q-13 -5.6 -3 -7 Q8 -8.4 13 -4.4 Q15.4 -.4 11 3.6 Q0 6.6 -12.4 4.8Z" fill="url(#an-dr)"/>
<path d="M-11 4.6 Q0 6.2 10 3.6 Q0 4.6 -11 3.2Z" fill="#f0d3a3" opacity=".7"/>
<g fill="#b47b40">${[-11,-8,-5,-2,1,4,7].map(x=>`<path d="M${x} 4.4 l1.3 2.4 l1.2 -2.2Z"/>`).join("")}</g>
<g fill="#f3d7a6">${[-9,-5,-1,3,7].map((x,i)=>`<path d="M${x} -6.2 l1 -1.8 l1 1.8Z M${x+1.4} -3.6 l.8 -1.4 l.8 1.4Z"/>`).join("")}</g>
<g fill="#b98048" opacity=".55">${[-8,-3,2,6].map(x=>`<ellipse cx="${x}" cy="-1.6" rx="2.2" ry="1.4"/>`).join("")}</g>
<g class="lg-a"><path d="M-6 3.4 Q-8 7 -11.6 8.8" stroke="#b47b40" stroke-width="2.9" fill="none" stroke-linecap="round"/><path d="M-11.6 8.8 l-2.4 .2 M-11.6 8.8 l-1.8 1.5 M-11.6 8.8 l-.5 1.8 M-11.6 8.8 l.8 1.4" stroke="#8d5c2c" stroke-width=".7"/></g>
<g class="head"><path d="M9.6 -4.2 Q14 -8.6 20.4 -5.8 Q24.4 -3.6 23.6 -.6 Q21 2.8 12 3.2Z" fill="url(#an-dr)"/>
<path d="M11 3 l1.2 2.4 l1 -2 l1.3 2.6 l1 -2.4 l1.3 2.4 l1 -2.2 l1.3 2 l.8 -2" stroke="#7d5129" stroke-width=".8" fill="#a06a35"/>
<path d="M12 -6 l.8 -1.6 l.6 1.6 M15 -7 l.8 -1.6 l.6 1.6 M18 -6.6 l.8 -1.4 l.6 1.4" fill="#f3d7a6"/>
<path d="M17 .4 Q20.6 1.4 23.4 -.4" stroke="#6d4524" stroke-width=".5" fill="none"/>
<circle cx="18.6" cy="-3.2" r="1.25" fill="#2b1a0e"/><circle cx="19" cy="-3.6" r=".38" fill="#fff"/><circle cx="22.4" cy="-2.6" r=".3" fill="#4e2f16"/><ellipse cx="14.6" cy="-2" rx=".7" ry=".9" fill="#5c3a1d"/></g>
<g class="lg-a"><path d="M9 3.4 Q12 7 15 8.8" stroke="#b47b40" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M15 8.8 l2.2 .5 M15 8.8 l1.6 1.6 M15 8.8 l.2 1.9 M15 8.8 l-.9 1.4" stroke="#8d5c2c" stroke-width=".7"/></g>`,
/* Leopard gecko: plump spotted body, fat ringed tail, big lidded eyes, pale belly. */
leo:`<defs><linearGradient id="an-lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d65a"/><stop offset=".7" stop-color="#eebb36"/><stop offset="1" stop-color="#fff1c9"/></linearGradient><linearGradient id="an-lgt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c3e6"/><stop offset="1" stop-color="#f4ead0"/></linearGradient></defs>
<g class="tail"><path d="M-9 -1.4 Q-16 -3.6 -23 -2 Q-29 -.4 -28.6 2 Q-24 4.4 -9 4.2Z" fill="url(#an-lg)"/><path d="M-14 -2.4 Q-13 1 -14 4 M-19.4 -2.6 Q-18.4 1 -19.4 3.8 M-24.4 -1.6 Q-23.4 1 -24.4 3.4" stroke="#c9b3e0" stroke-width="2" fill="none" opacity=".75"/><g fill="#3d2b1f">${[[-16.4,-.6],[-21.6,.8],[-26.4,.6],[-17,2.4],[-11.6,.8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g></g>
<g class="lg-b"><path d="M-7 2.6 Q-10 5 -12 6.6" stroke="#d9a531" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M6 2.6 Q8 5 10 6.6" stroke="#d9a531" stroke-width="1.9" fill="none" stroke-linecap="round"/></g>
<path d="M-11 1 Q-10 -4.6 -2 -5 Q6 -5.4 9 -3 Q10.6 0 8 3 Q0 5 -10 4Z" fill="url(#an-lg)"/>
<g fill="#3d2b1f">${[[-8,-3],[-5,-1.2],[-2,-3.6],[1,-1.6],[4,-3.4],[6.4,-1],[-7,.6],[-1,.2],[3,.8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${(.55+((x*7+y*3)%3+3)%3*.12).toFixed(2)}"/>`).join("")}</g>
<path d="M-9 3.6 Q0 4.8 8 2.6" stroke="#fff6dc" stroke-width="1" fill="none" opacity=".8"/>
<g class="lg-a"><path d="M-5 2.8 Q-7 5.6 -9.6 7" stroke="#eebb36" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M-9.6 7 l-1.8 .2 M-9.6 7 l-1.2 1.2 M-9.6 7 l-.2 1.4" stroke="#c99a2a" stroke-width=".55"/></g>
<g class="head"><path d="M7.6 -3 Q11 -6.2 16 -4.6 Q19.2 -3 18.6 -.4 Q17 2.4 9 2.8Z" fill="url(#an-lg)"/><g fill="#3d2b1f"><circle cx="12" cy="-4.4" r=".5"/><circle cx="14.6" cy="-4.6" r=".45"/><circle cx="10.4" cy="-2" r=".5"/></g>
<ellipse cx="14.4" cy="-2" rx="1.6" ry="1.3" fill="#e6d4a8"/><ellipse cx="14.4" cy="-2" rx="1.3" ry="1.05" fill="#4a3a2c"/><path d="M14.4 -3 v2" stroke="#111" stroke-width=".4"/><circle cx="14.8" cy="-2.5" r=".3" fill="#fff"/>
<path d="M12 1 Q15.6 1.6 18.4 -.2" stroke="#8a6a2a" stroke-width=".45" fill="none"/><circle cx="18" cy="-1.6" r=".25" fill="#3d2b1f"/></g>
<g class="lg-a"><path d="M7 2.8 Q9.6 5.6 12.2 7" stroke="#eebb36" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12.2 7 l1.8 .4 M12.2 7 l1.2 1.3 M12.2 7 l.1 1.5" stroke="#c99a2a" stroke-width=".55"/></g>`,
/* Crested gecko: tan-orange, eyelash crests, fringed back, round toe pads, curled tail tip. */
crested:`<defs><linearGradient id="an-cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a14a"/><stop offset=".6" stop-color="#d27c2a"/><stop offset="1" stop-color="#f4c58c"/></linearGradient></defs>
<g class="tail"><path d="M-9 .4 Q-18 2 -21 7 Q-23 10.4 -20 11 Q-18 11 -18.6 9.4 Q-18 6 -9 3.6Z" fill="url(#an-cg)"/></g>
<g class="lg-b"><path d="M-6 2 Q-9 4.4 -11 6.4" stroke="#b9661f" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="-11.4" cy="6.8" r=".9" fill="#b9661f"/></g>
<g class="lg-b"><path d="M5 2 Q7 4.4 9 6.4" stroke="#b9661f" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="9.4" cy="6.8" r=".85" fill="#b9661f"/></g>
<path d="M-10 .6 Q-8 -4 0 -4.2 Q6 -4.4 8 -2 Q9 1 6 2.8 Q-2 4 -9.6 3.4Z" fill="url(#an-cg)"/>
<path d="M-9 -1.2 ${Array.from({length:9},(_,i)=>`l1 -1.3 l1 1.3`).join(" ")}" stroke="#f7d7a6" stroke-width=".6" fill="none"/>
<path d="M-8 1 Q-1 2.4 6 1" stroke="#a8561a" stroke-width=".8" fill="none" opacity=".5"/>
<g class="lg-a"><path d="M-4 2.4 Q-6 5 -8.4 6.8" stroke="#d27c2a" stroke-width="1.8" fill="none" stroke-linecap="round"/><g fill="#d27c2a"><circle cx="-9.4" cy="7" r=".7"/><circle cx="-8.6" cy="7.8" r=".7"/><circle cx="-7.6" cy="7.4" r=".65"/></g></g>
<g class="head"><path d="M6.6 -2.4 Q9 -5.6 13.6 -4.6 Q17.6 -3.2 17 -.4 Q15.4 2.4 8 2.6Z" fill="url(#an-cg)"/>
<path d="M9.6 -5 l.8 -1.6 l.8 1.2 l.8 -1.6 l.8 1.2 l.8 -1.6 l.8 1.4" stroke="#f7d7a6" stroke-width=".55" fill="none"/>
<ellipse cx="13" cy="-2.3" rx="1.55" ry="1.35" fill="#c07a2c"/><ellipse cx="13" cy="-2.3" rx=".35" ry="1.1" fill="#111"/><circle cx="13.5" cy="-2.9" r=".3" fill="#fff"/>
<path d="M10.6 1 Q14 1.8 16.8 -.2" stroke="#8a4510" stroke-width=".45" fill="none"/></g>
<g class="lg-a"><path d="M6 2.4 Q8.4 5 10.6 6.8" stroke="#d27c2a" stroke-width="1.7" fill="none" stroke-linecap="round"/><g fill="#d27c2a"><circle cx="11.6" cy="7.2" r=".7"/><circle cx="10.8" cy="7.9" r=".7"/><circle cx="9.8" cy="7.5" r=".65"/></g></g>`,
/* Panther chameleon: tall flat body, casque, turret eye, gripping feet, curled tail; its colours shift. */
cham:`<defs><linearGradient id="an-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fa36b"/><stop offset=".55" stop-color="#43b97a"/><stop offset="1" stop-color="#9be3b5"/></linearGradient></defs>
<g class="tail"><path d="M-10 3 Q-17 5 -16 11 Q-15 15.4 -11.2 14.4 Q-9 13.4 -10 11.4 Q-11 10 -12.4 11 Q-12.8 8 -9 6Z" fill="#2f9a5f"/><path d="M-13.6 7 l2 .8 M-15 9.4 l2 .4 M-14.6 12.4 l1.8 -.4" stroke="#1d7044" stroke-width=".8"/></g>
<g class="lg-b"><path d="M-6 4 L-8 9 L-9.6 9.6" stroke="#278553" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M5 4 L7 9 L8.6 9.6" stroke="#278553" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
<path class="cham" d="M-11 3.6 Q-12 -5.6 -1 -7.4 Q9 -8 12 -1.4 Q11 4.4 2 6 Q-6 6.6 -11 3.6Z" fill="url(#an-ch)"/>
<path d="M-11 3.6 Q-12 -5.6 -1 -7.4 Q9 -8 12 -1.4" stroke="#1d7044" stroke-width=".9" fill="none" stroke-dasharray="1 .9"/>
<g fill="#2a8fd6" opacity=".55">${[-7,-3,1,5].map(x=>`<path d="M${x} -5.6 q1.6 4 0 9.4 q2.4 -4.4 1.4 -9.6Z"/>`).join("")}</g>
<path d="M-9 2.6 Q0 4 9 .6" stroke="#f4fff6" stroke-width="1.1" fill="none" opacity=".85"/>
<g class="lg-a"><path d="M-4 4.6 L-6 9.2" stroke="#36a86a" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-6 9.2 l-1.6 .8 M-6 9.2 l1.2 .9" stroke="#36a86a" stroke-width="1.3" stroke-linecap="round"/></g>
<g class="head"><path d="M9.4 -3.4 Q10 -10 15 -9.6 Q19.4 -7.6 20 -2.4 Q19.6 1.6 15 2.6 Q10.6 3 9.4 -3.4Z" fill="url(#an-ch)" class="cham"/>
<path d="M11 -8.6 Q13 -11.4 16 -9.8" stroke="#1d7044" stroke-width=".8" fill="none"/>
<path d="M14 1.2 Q17.4 1.6 19.8 -1" stroke="#e8553c" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<circle cx="15.4" cy="-3.6" r="2.4" fill="#5fc184" stroke="#1d7044" stroke-width=".4"/><circle cx="15.4" cy="-3.6" r="1.6" fill="#8fd6a6"/><circle cx="16" cy="-3.6" r=".8" fill="#111" class="eyeroll"/>
<path class="tongue" d="M20 -1.6 Q26 -2.4 30 -2" stroke="#f48fb1" stroke-width=".9" fill="none"/></g>
<g class="lg-a"><path d="M6 4.6 L8.4 9.2" stroke="#36a86a" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M8.4 9.2 l1.6 .8 M8.4 9.2 l-1.2 .9" stroke="#36a86a" stroke-width="1.3" stroke-linecap="round"/></g>`,
/* Ball python: thick coils with the brown and tan saddles of the species, the head raised, its tongue flicking. */
python:`${[[0,6,24,6.6],[1,.6,18,5.4]].map(([dx,dy,rx,ry],i)=>`<ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#2b1c12" stroke-width="7.6"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#5a3b22" stroke-width="6.4"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#c9a06a" stroke-width="5.2" stroke-dasharray="${i?"5 4.2":"6.4 5"}" stroke-dashoffset="${i*3}"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#e8cfa2" stroke-width="1.2" stroke-dasharray="${i?"2 7.2":"2.6 8.8"}" stroke-dashoffset="${i*3-1.6}" opacity=".9"/><ellipse cx="${dx}" cy="${dy-1.6}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width=".7" opacity=".18"/>`).join("")}
<path d="M14 0 Q20 -6 18 -12 Q17 -16 21 -17" stroke="#2b1c12" stroke-width="6.6" fill="none" stroke-linecap="round"/><path d="M14 0 Q20 -6 18 -12 Q17 -16 21 -17" stroke="#5a3b22" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M15.6 -3 Q19.4 -7 18.2 -11.4" stroke="#c9a06a" stroke-width="4" fill="none" stroke-dasharray="3 3"/>
<g class="head"><path d="M19 -18.6 Q24 -21.4 29.4 -19 Q31 -17.6 29.6 -16 Q24.6 -14 19.6 -15.4Z" fill="#5a3b22"/><path d="M20 -18.6 Q24.4 -20.6 28.6 -18.8 L26 -17.6 Q23 -17 20.4 -17.6Z" fill="#c9a06a" opacity=".8"/><path d="M22 -17.2 L29 -17.6" stroke="#2b1c12" stroke-width=".7"/>
<circle cx="25.6" cy="-18.4" r=".85" fill="#111"/><circle cx="25.9" cy="-18.7" r=".25" fill="#fff"/>
<path class="tongue" d="M29.6 -16.6 l3 .2 l1.2 -.9 M32.6 -16.4 l1.2 .7" stroke="#d81b60" stroke-width=".5" fill="none"/></g>`,
/* Red-knee tarantula: hairy abdomen and legs, orange knee bands; walks on alternate legs. */
spider:`${[[1,"#241812",1.4,2.6,1],[0,"#3a2a20",1.8,0,0]].map(([far,col,w,dx,dy])=>[[-1,-9,-18],[1,-3.6,-9],[3,6,10.4],[5,12,19]].map(([ax,kx,tx],i)=>`<g class="${(i+far)%2?"lg-a":"lg-b"}"><path d="M${ax+dx} ${-1+dy} L${kx+dx} ${-9+dy} L${tx+dx} ${8.6}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${kx+dx} ${-9+dy} L${(kx+(tx-kx)*.18+dx).toFixed(1)} ${(-9+17.6*.18+dy).toFixed(1)}" stroke="#ff7a1a" stroke-width="${w*.85}" stroke-linecap="round"/><path d="M${ax+dx} ${-1+dy} L${kx+dx} ${-9+dy} L${tx+dx} ${8.6}" stroke="#a08870" stroke-width=".3" stroke-dasharray=".3 .7" fill="none"/></g>`).join("")).join("")}
<ellipse cx="-9" cy="-1" rx="7.4" ry="6" fill="#2b1d16"/><ellipse cx="-9.4" cy="-2.4" rx="5.6" ry="3.8" fill="#3e2a1f"/>
<g stroke="#b0907a" stroke-width=".35" opacity=".85">${Array.from({length:30},(_,i)=>{const t=i/30*Math.PI*2;return `<path d="M${(-9+Math.cos(t)*7).toFixed(1)} ${(-1+Math.sin(t)*5.6).toFixed(1)} l${(Math.cos(t)*1.5).toFixed(1)} ${(Math.sin(t)*1.5).toFixed(1)}"/>`}).join("")}</g>
<ellipse cx="2.6" cy="-1.4" rx="4.8" ry="3.6" fill="#2b1d16"/><path d="M-.6 -3.2 Q2.6 -5.4 5.8 -3.2" stroke="#e8a35a" stroke-width=".8" fill="none"/><circle cx="3.2" cy="-3.6" r=".6" fill="#111"/><circle cx="3.4" cy="-3.8" r=".18" fill="#fff"/>
<path d="M6.4 -.2 q2.6 1 3.4 3.4 M6.6 -1.6 q3 -.2 4.4 2" stroke="#2b1d16" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
/* Dart frog: glossy, spotted, folded legs, big dark eye; its throat pulses. */
dart:(c="#1e5bd8",spot="#0b1a3a",leg="#163f9e")=>`<path d="M-6 3 Q-11 3 -12.4 6.6 L-9 6.8 M-12.4 6.6 l-1.6 .6 M-12.4 6.6 l-.6 1.2" stroke="${leg}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
<path d="M-8 2.4 Q-9 -4.4 -1 -5 Q6 -5.6 8 -1 Q9 2.4 6 4.6 Q-2 5.6 -8 2.4Z" fill="${c}"/>
<path d="M-6 -2.6 Q-1 -5.4 5 -3.4" stroke="#ffffff" stroke-width="1.2" fill="none" opacity=".35" stroke-linecap="round"/>
<g fill="${spot}">${[[-5,-1],[-1,-2.8],[2.6,-1.6],[-3,1.6],[1,1.4],[4.6,1.2],[-6.2,1.4]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${(.9+i%3*.3).toFixed(1)}" ry="${(.7+i%2*.3).toFixed(1)}"/>`).join("")}</g>
<ellipse class="throat" cx="5" cy="3.8" rx="2.2" ry="1.2" fill="${c}" opacity=".9"/>
<circle cx="5.2" cy="-3" r="1.9" fill="#0b0b0b"/><circle cx="5.8" cy="-3.6" r=".55" fill="#fff"/>
<path d="M3 2.8 L4.6 6.6 l1.8 .2 M4.6 6.6 l.8 1" stroke="${leg}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
/* Red-eyed tree frog: bright green, red eyes with a slit pupil, blue flanks barred yellow, orange sticky toes. */
treefrog:`<path d="M-6 3 Q-12 3.4 -13 7.6 L-10 8" stroke="#3c9a3c" stroke-width="2" fill="none" stroke-linecap="round"/><g fill="#ff7a2a"><circle cx="-13.6" cy="8.2" r=".9"/><circle cx="-11.8" cy="8.8" r=".9"/><circle cx="-10" cy="8.6" r=".85"/></g>
<path d="M-8 2.6 Q-8.6 -4.4 0 -5 Q7 -5.4 9 -1.6 Q10 2 7 4 Q-1 5.6 -8 2.6Z" fill="#4cbf4a"/>
<path d="M-7 2.4 Q-1 4.4 6 3" stroke="#2f7ad1" stroke-width="2" fill="none"/><path d="M-5 1.8 l.4 2 M-2 2.4 l.3 2 M1 2.6 l.2 1.8 M4 2.4 l0 1.6" stroke="#ffd54f" stroke-width=".7"/>
<path d="M-6 -2.8 Q0 -5.6 6 -3.6" stroke="#b9f6a6" stroke-width=".9" fill="none" opacity=".6"/>
<ellipse class="throat" cx="6" cy="3.4" rx="2" ry="1" fill="#e9f7d9"/>
<circle cx="5" cy="-4.4" r="2.4" fill="#e3261f"/><circle cx="5" cy="-4.4" r="2.4" fill="none" stroke="#3c9a3c" stroke-width=".4"/><ellipse cx="5" cy="-4.4" rx=".45" ry="1.6" fill="#111"/><circle cx="5.7" cy="-5.2" r=".45" fill="#fff"/>
<path d="M3 2.8 Q4.6 5.4 6.6 7" stroke="#3c9a3c" stroke-width="1.6" fill="none" stroke-linecap="round"/><g fill="#ff7a2a"><circle cx="7.4" cy="7.4" r=".85"/><circle cx="6.2" cy="8" r=".85"/><circle cx="5" cy="7.6" r=".8"/></g>`,
/* Stick insect: a twig body with joints, long angled legs and antennae. */
stick:`<g stroke-linecap="round" fill="none"><path d="M-6 0 L-10 7 L-12 8 M-2 0 L-4 7.6 L-6 8.6 M4 0 L7 7.4 L9 8.4 M-12 0 L-16 6 M8 0 L13 6.6 L15 7.2" stroke="#7a5a3a" stroke-width=".7"/><path d="M-24 .4 Q-6 -.6 16 0 L21 -.6" stroke="#8d6a46" stroke-width="2.4"/><path d="M-24 .4 Q-6 -.6 16 0" stroke="#b08a60" stroke-width=".7"/><path d="M-12 -.4 v1 M-4 -.4 v1 M4 -.3 v1 M10 -.2 v1" stroke="#5d4430" stroke-width=".6"/><path d="M21 -.6 l7 -4 M21 -.6 l8 -1.4" stroke="#7a5a3a" stroke-width=".45"/><path d="M14 0 L18 -5 L22 -6 M10 0 L14 -4.6" stroke="#7a5a3a" stroke-width=".7"/><circle cx="20.4" cy="-.8" r=".4" fill="#2b1d16"/></g>`,
/* Praying mantis: raptorial forelegs folded, long prothorax, wings over the abdomen, triangular head. */
mantis:`<defs><linearGradient id="an-mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ccc65"/><stop offset="1" stop-color="#558b2f"/></linearGradient></defs>
<g stroke="#558b2f" stroke-linecap="round" fill="none"><path d="M-6 1 l-5 7.6 M-3 1 l-2 8.6 M-1 1 l5 7.4" stroke-width=".8"/></g>
<path d="M-20 2.6 Q-12 -2.4 -1 -.4 Q-9 4.4 -20 2.6Z" fill="url(#an-mt)"/><path d="M-18 1.6 Q-10 -1.4 -2 -.2" stroke="#c5e1a5" stroke-width=".5" fill="none"/><path d="M-19 2.4 Q-10 1.6 -2 0" stroke="#33691e" stroke-width=".4" fill="none"/>
<path d="M-1 -.4 L8 -7.6" stroke="#7cb342" stroke-width="1.6" stroke-linecap="round"/>
<g class="head"><path d="M7.4 -8.4 L12.4 -9.6 L10 -6 Z" fill="#8bc34a"/><circle cx="11.8" cy="-9.4" r=".9" fill="#c0ca33"/><circle cx="12" cy="-9.5" r=".3" fill="#33691e"/><path d="M8.6 -9 l2 -5 M9.6 -8.8 l4.6 -4" stroke="#558b2f" stroke-width=".35"/></g>
<path d="M6 -6 L9 -1.4 L7 -3.6 L10 -6 L12.4 -4.2" stroke="#7cb342" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M9 -1.4 l.6 -1 M8.4 -2.4 l.8 -.6" stroke="#33691e" stroke-width=".4"/>`,
/* Hermit crab: a spiralled shell, eyestalks, a big purple claw and red walking legs. */
hermit:(sc="#d9b38c",sl="#a47a50",body="#c2185b")=>`<g class="lg-b"><path d="M2 2 L6 6.4 L7.6 6.6 M0 2.4 L2.6 7 L4 7.4" stroke="${body}" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M-14 3 Q-15 -10 -3 -11.4 Q8 -11 8.6 -2 Q9 4 0 5.6 Q-11 6 -14 3Z" fill="${sc}"/>
<path d="M-3 -11.4 Q-12 -9.4 -11 -2 Q-10 3.6 -3 3.4 Q3 3 2.6 -2.6 Q2.2 -7 -2 -6.6 Q-5.6 -6 -5 -2.6 Q-4.4 .2 -2 -.2" stroke="${sl}" stroke-width="1.1" fill="none"/>
<path d="M-12 -3 Q-6 -10 3 -9" stroke="#fff" stroke-width=".8" fill="none" opacity=".35"/><path d="M-13 2.4 Q-2 6.4 8 1" stroke="#000" stroke-width=".8" fill="none" opacity=".15"/>
<path d="M4 1.6 Q8 0 10 2.4 Q9.6 5 6 5Z" fill="${body}"/>
<path d="M8 1 L9 -6 M9.6 1.4 L11.6 -5.2" stroke="${body}" stroke-width=".8"/><circle cx="9" cy="-6.4" r=".9" fill="#111"/><circle cx="11.7" cy="-5.6" r=".85" fill="#111"/>
<path d="M10 0 Q14 -6 17 -4 M10.4 .6 Q15 -3 18 -.6" stroke="#ff8a65" stroke-width=".35" fill="none"/>
<g class="lg-a"><path d="M5 3.6 L8 7.4 L9.8 7.6 M7 3.6 L11 7 L12.6 7" stroke="${body}" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M8.4 2.6 Q12.6 1.4 14 4 Q13.4 6.6 9.6 6 Z" fill="#7b1fa2"/><path d="M13.4 3.6 L15.6 4.2 L13.6 5.4" fill="#6a1b9a"/><g fill="#e1bee7" opacity=".7"><circle cx="11" cy="3.6" r=".4"/><circle cx="12.4" cy="4.4" r=".35"/></g>`,
/* Axolotl: wide smiling head, three pairs of feathery gills, small eyes, a finned tail and stubby limbs. */
axolotl:(c="#f8bbd0",g="#ec407a")=>`<g class="tail"><path d="M-10 -1 Q-20 -4 -32 0 Q-20 3 -10 3.4Z" fill="${c}"/><path d="M-10 -1.4 Q-20 -6.4 -32 0 Q-20 4.6 -10 4" fill="${c}" opacity=".45"/></g>
<g class="lg-b"><path d="M-7 3 L-9 6 M-9 6 l-1.2 .4 M-9 6 l-.4 1" stroke="${c}" stroke-width="1.4" fill="none" stroke-linecap="round" filter="brightness(.9)"/></g>
<path d="M-12 1 Q-11 -4 -2 -4.2 Q6 -4.4 9 -2.6 Q10 1.6 6 3.6 Q-2 4.6 -12 3.4Z" fill="${c}"/>
<path d="M-10 -2.6 Q-1 -4.2 7 -3" stroke="#fff" stroke-width=".8" fill="none" opacity=".45"/>
<g class="lg-a"><path d="M-4 3 L-6.4 6.6 M-6.4 6.6 l-1.3 .3 M-6.4 6.6 l-.6 1.1 M-6.4 6.6 l.4 1" stroke="${c}" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>
<g class="head"><path d="M7 -3.6 Q12 -6 17 -3.4 Q19 0 17 2.4 Q12 4.6 6.4 3.2Z" fill="${c}"/>
<g class="gills">${[[-2.6,-150],[-3.6,-118],[-2.8,-85]].flatMap(([dy,ang])=>[[0,ang],[1,-ang-180+360]].slice(0,1).map(()=>[dy,ang])).map(([dy,ang])=>`<g transform="translate(9.6 ${dy}) rotate(${ang})"><path d="M0 0 L7 0" stroke="${g}" stroke-width="1.1" stroke-linecap="round"/>${[1.6,3,4.4,5.8].map(t=>`<path d="M${t} 0 l.9 -1.7 M${t} 0 l.9 1.7" stroke="${g}" stroke-width=".6" stroke-linecap="round"/>`).join("")}</g>`).join("")}</g>
<circle cx="14.6" cy="-1.6" r=".75" fill="#2b1d22"/><circle cx="14.8" cy="-1.8" r=".22" fill="#fff"/><path d="M13.6 1.4 Q16 2.4 18 .8" stroke="#c2185b" stroke-width=".45" fill="none"/></g>
<g class="lg-a"><path d="M8 3 L10.4 6.4 M10.4 6.4 l1.3 .2 M10.4 6.4 l.5 1.1 M10.4 6.4 l-.5 1" stroke="${c}" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`,
/* Red-eared slider: olive scutes with yellow lines, a yellow-rimmed shell, striped head with the red ear patch. */
slider:`<defs><linearGradient id="an-sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b8e3a"/><stop offset="1" stop-color="#3f5f22"/></linearGradient></defs>
<g class="lg-b"><path d="M-8 2 Q-12 4 -14 6.8 l-1.6 .4" stroke="#4e6b2a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M6 2 Q10 3.6 12 6.4 l1.6 .2" stroke="#4e6b2a" stroke-width="2.3" fill="none" stroke-linecap="round"/></g>
<path d="M-13 2.6 Q-12.4 -9.4 0 -9.8 Q12 -9.4 13 2.6Z" fill="url(#an-sl)"/>
<path d="M-6 -8.8 Q-7 -3 -6 2.4 M0 -9.8 V2.6 M6 -8.8 Q7 -3 6 2.4 M-12.4 -2 Q0 -4 12.4 -2" stroke="#2d4416" stroke-width=".7" fill="none"/>
<g stroke="#f2d64b" stroke-width=".5" fill="none" opacity=".8"><path d="M-9 -4 q1 2 0 4 M-3 -7 q1 3 0 6 M3 -7 q-1 3 0 6 M9 -4 q-1 2 0 4"/></g>
<path d="M-13 2.6 Q0 4.6 13 2.6" stroke="#e6c84a" stroke-width="1.6" fill="none"/>
<path d="M-12 -4 Q-6 -9 4 -9.2" stroke="#fff" stroke-width=".8" fill="none" opacity=".25"/>
<g class="lg-a"><path d="M-6 3 Q-8 6 -11 7.6 l-1.4 .2" stroke="#5d7d32" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-7 4.4 l-2 2" stroke="#e6c84a" stroke-width=".4"/></g>
<g class="head"><path d="M11 -1 Q14 -4.4 19 -3.6 Q22 -2.4 21.4 0 Q19 2.2 12 2Z" fill="#5d7d32"/><path d="M13 -2.6 Q17 -3.6 20 -2 M12.6 .6 Q16.6 1.6 20.8 .4 M14 -1 Q17 -1 19.6 -.6" stroke="#f2d64b" stroke-width=".5" fill="none"/><ellipse cx="15.6" cy="-1.2" rx="1.8" ry=".8" fill="#e53935"/><circle cx="18.4" cy="-2.2" r=".75" fill="#111"/><circle cx="18.6" cy="-2.4" r=".22" fill="#fff"/></g>
<g class="lg-a"><path d="M8 3 Q11 5.6 13.6 7.4 l1.4 .2" stroke="#5d7d32" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M10 5 l2 1.6" stroke="#e6c84a" stroke-width=".4"/></g>`,
/* Hermann's tortoise: high dome of yellow scutes bordered black, scaly pillar legs, beaked head. */
tortoise:`<defs><radialGradient id="an-tt" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#e8c56a"/><stop offset="1" stop-color="#b48a3a"/></radialGradient></defs>
<g class="lg-b"><path d="M-8 1 L-9.6 7.4" stroke="#8d7552" stroke-width="3" stroke-linecap="round"/></g><g class="lg-b"><path d="M6 1 L7.4 7.4" stroke="#8d7552" stroke-width="3" stroke-linecap="round"/></g>
<g class="tail"><path d="M-14 1.6 l-3 1.4 l3 .2Z" fill="#a08a64"/></g>
<path d="M-14.4 3 Q-14 -13 0 -13.4 Q14 -13 14.4 3Z" fill="url(#an-tt)"/>
<g stroke="#2b1f12" stroke-width=".9" fill="none" stroke-linejoin="round"><path d="M-4.4 -12.8 L-5 -6 L5 -6 L4.4 -12.8 M-5 -6 L-7 -.6 L7 -.6 L5 -6 M-7 -.6 L-8 2.8 M7 -.6 L8 2.8 M-13.6 -2 L-7 -.6 M13.6 -2 L7 -.6 M-11.4 -8.6 L-5 -6 M11.4 -8.6 L5 -6"/></g>
<g fill="#2b1f12" opacity=".75"><path d="M-2.6 -11 h5.2 l-.6 3.4 h-4Z M-3.2 -4.4 h6.4 l-.8 2.6 h-4.8Z M-11 -5.6 l3.4 -1.4 l.4 3.6 l-3.6 .4Z M11 -5.6 l-3.4 -1.4 l-.4 3.6 l3.6 .4Z"/></g>
<path d="M-14.4 3 Q0 5.2 14.4 3" stroke="#6b5126" stroke-width="1.2" fill="none"/><path d="M-10 -9 Q-4 -13 4 -12.4" stroke="#fff3c4" stroke-width="1" fill="none" opacity=".4"/>
<g class="lg-a"><path d="M-6 2 L-7 8" stroke="#a08a64" stroke-width="3.4" stroke-linecap="round"/><path d="M-8.4 8.4 h3" stroke="#6b5a40" stroke-width=".8"/><path d="M-6.6 3.6 l1 .6 M-6.8 5.4 l1 .6" stroke="#7d6a4a" stroke-width=".5"/></g>
<g class="head"><path d="M12 -1.6 Q16 -4.8 20.6 -2.6 Q22.2 -.6 20.6 1.4 Q16 2.6 12.4 1.6Z" fill="#a08a64"/><path d="M19.6 -.4 L22 .4 L20.4 1.2" fill="#6b5a40"/><circle cx="18" cy="-1.6" r=".8" fill="#111"/><circle cx="18.2" cy="-1.8" r=".22" fill="#fff"/><path d="M14 0 Q16 .8 18 0" stroke="#7d6a4a" stroke-width=".4" fill="none"/></g>
<g class="lg-a"><path d="M8 2 L9.4 8" stroke="#a08a64" stroke-width="3.4" stroke-linecap="round"/><path d="M8 8.4 h3" stroke="#6b5a40" stroke-width=".8"/></g>`,
/* Musk turtle: small high dark shell with a keel, long neck, two yellow stripes on the head. */
musk:`<g class="lg-b"><path d="M-6 1.6 l-3 4.6" stroke="#3e3a33" stroke-width="1.8" stroke-linecap="round"/></g><g class="lg-b"><path d="M5 1.6 l3 4.4" stroke="#3e3a33" stroke-width="1.8" stroke-linecap="round"/></g>
<path d="M-10 2.4 Q-9.4 -7.6 0 -8 Q9.4 -7.6 10 2.4Z" fill="#3b3730"/><path d="M-6 -6.4 Q0 -9 6 -6.4" stroke="#57514a" stroke-width="1.2" fill="none"/><path d="M0 -8 V2" stroke="#26231e" stroke-width=".6"/><path d="M-9 -2 Q0 -4 9 -2" stroke="#26231e" stroke-width=".5" fill="none"/>
<path d="M-10 2.4 Q0 3.8 10 2.4" stroke="#6d6458" stroke-width="1" fill="none"/>
<g class="lg-a"><path d="M-4 2.4 l-2.6 4.4" stroke="#4a453c" stroke-width="2" stroke-linecap="round"/></g>
<g class="head"><path d="M8.4 0 Q12 -3 15.4 -2 Q17 -.6 15.6 1 Q12 2.2 8.6 1.8Z" fill="#4a453c"/><path d="M10 -1.6 Q13 -2.8 16 -1.2 M10 .6 Q13 1.4 15.8 .4" stroke="#e6c84a" stroke-width=".45" fill="none"/><circle cx="13.6" cy="-1.1" r=".55" fill="#111"/><path d="M15.4 1 l.6 .8 M14.8 1.2 l.3 .9" stroke="#4a453c" stroke-width=".4"/></g>
<g class="lg-a"><path d="M6 2.4 l2.6 4.2" stroke="#4a453c" stroke-width="2" stroke-linecap="round"/></g>`,
};
TH.push(
{seed:101,svg:()=>air("#fbe9c8","#f3d59a","#e7bd73",{lamp:"#fff3c4",spot:[318,62]})+glass()+
 `<path d="M100 82 Q160 60 230 66 Q300 56 400 62 V82Z" fill="#e4b46c" opacity=".6"/>`+rock(320,79,64,26,["#b98a5a","#d7aa78","#8d6440"])+rock(366,79,40,18,["#c49a6c","#ddb88a","#97704c"])+rock(232,79,22,10,["#c49a6c","#ddb88a","#97704c"])+
 cactus(388,78,30)+cactus(206,78,18,"#6a9a45","#4a7a2c")+`<path d="M262 79 q6 -10 10 0 M266 79 q2 -8 6 -2 M270 79 q-2 -6 2 -9" stroke="#a5a35a" stroke-width=".9" fill="none"/>`+
 S(A.dragon,306,44,1.45,"nod")+F(A.leo,246,71,1.2,"pd",8,-2,true)+
 soil("#f0cc8a",["#d9ae64","#fbe2b3","#c79b54"],"#d9ae64")},
{seed:103,svg:()=>air("#cfe9d6","#8fc7a2","#4f8f68",{lamp:"#f1f8e9",mist:1.2})+glass()+
 backdrop("plant","#2e6b44",.4)+`<path d="M330 6 L352 6 L350 80 L334 80Z" fill="#5d4c3e"/><path d="M336 10 L346 10 L344 78 L338 78Z" fill="#a7d8ef" opacity=".8" class="caus"/><g fill="#e1f5fe" opacity=".8">${[20,34,48,62].map(y=>`<path d="M338 ${y} q3 4 6 0" stroke="#fff" stroke-width=".5" fill="none"/>`).join("")}</g>`+bowl(342,79,28,"#81d4fa")+
 branch("M220 80 Q240 50 290 40 Q320 34 360 20","#5d4037",4,"#8d6e63")+moss(270,46,14,40,["#558b2f","#7cb342","#33691e"])+moss(318,34,12,30,["#558b2f","#7cb342"])+
 brom(244,79,1,"#2e7d32","#e53935")+brom(372,79,.9,"#388e3c","#ff7043")+brom(300,40,.6,"#43a047","#d81b60")+vine(380,6,40)+vine(226,6,30,"#66bb6a")+
 leaf(196,70,1,-40)+leaf(392,58,.9,-150,"#388e3c")+carpet(110,400,79,["#33691e","#558b2f","#7cb342"],2)+
 S(A.dart(),262,70,1.4,"hop")+S(A.dart("#fdd835","#111","#212121"),298,32,1.2,"hop",-1)+S(A.dart("#1e5bd8","#0b1a3a","#163f9e"),366,70,1.2,"hop",-2,true)+
 soil("#3e2a1c",["#5d4037","#2b1d14","#6d4c33"],"#2b1d14")},
{seed:107,svg:()=>air("#f4e6cf","#e6cfa6","#cdae7c",{spot:[352,60]})+glass()+
 rock(352,79,70,18,["#7d7a76","#a19e99","#5b5955"])+rock(352,62,46,10,["#8a8782","#adaaa5","#666460"])+hide(392,79,26)+bowl(220,79,20)+
 `<g fill="#9e8a5a" stroke="#7a6a44" stroke-width=".5">${Array.from({length:4},()=>{const x=rr(280,320);return `<path d="M${f1(x)} 79 l${f1(rr(-2,2))} -6 l2 0Z"/>`;}).join("")}</g>`+
 F(A.leo,272,70,1.8,"pc",8)+F(A.leo,350,52,1.35,"",8,-4,true,"breathe")+
 soil("#d8b77f",["#c29e62","#e8cfa1","#a88550"],"#b8955a")},
{seed:109,svg:()=>air("#e2f2e6","#b9dfc4","#86c39b",{lamp:"#fff3c4",spot:[300,40],mist:.6})+glass()+
 branch("M200 80 Q230 56 280 52 Q330 48 380 30 Q394 24 400 26","#6d4c33",4.4,"#a1795a")+branch("M290 52 Q300 36 318 26","#6d4c33",2.6,"#a1795a")+branch("M250 54 Q246 40 236 30","#6d4c33",2,"#a1795a")+
 leaf(236,30,1.1,-120)+leaf(318,26,1,-40,"#388e3c")+leaf(330,40,.9,20)+leaf(372,30,1.2,-20,"#43a047")+leaf(262,46,.8,160)+leaf(210,70,1,-100,"#2e7d32")+leaf(390,22,.8,-80)+
 `<path d="M260 4 L260 10" stroke="#90a4ae" stroke-width="1.6"/><rect x="256" y="0" width="8" height="5" rx="1.4" fill="#cfd8dc"/>`+drip(260,12)+
 F(A.cham,300,38,1.7,"pe",8)+rosette(388,79,.9,"#2e7d32","#43a047",7,20)+
 soil("#5d4632",["#7a5c42","#3e2c1e","#8d6e50"],"#3e2c1e")},
{seed:113,svg:()=>air("#efe2cf","#d9c2a0","#b99b72",{spot:[350,58]})+glass()+
 branch("M380 80 Q372 50 340 40 Q300 30 260 34","#7a5638",5,"#a1795a")+hide(232,79,36,"#5d4632","#3e2c1e")+bowl(392,79,26,"#80cbc4")+
 S(A.python,306,64,1,"breathe",0)+vine(300,6,24,"#6d8f3a")+
 `<g fill="#8d6e50">${Array.from({length:12},()=>`<path d="M${f1(rr(200,400))} ${f1(rr(75,79))} l2 -1.2 l1.6 1.2Z"/>`).join("")}</g>`+
 soil("#7a5a3c",["#94704c","#5d4430","#a8845a"],"#5d4430")},
{dark:1,seed:127,svg:()=>air("#5a4637","#3e2f24","#2a1f17",{lamp:"#ffe0b2"})+glass()+
 `<path d="M300 80 Q304 56 330 50 Q360 46 380 56 Q392 64 392 80Z" fill="#6d5644"/><g stroke="#4e3c2e" stroke-width=".8" fill="none">${Array.from({length:6},(_,i)=>`<path d="M${306+i*14} 78 q2 -12 6 -22"/>`).join("")}</g><ellipse cx="346" cy="70" rx="12" ry="8" fill="#1d140d"/>`+
 `<g stroke="#ffffff" stroke-width=".35" opacity=".45" fill="none"><path d="M330 50 Q346 60 360 52 M334 54 Q346 64 356 56 M338 46 L346 66 M354 48 L346 66 M346 66 L320 64"/></g>`+
 rosette(220,79,.6,"#3e6b2a","#4f7f34",5,16)+
 F(A.spider,262,70,1.9,"pd",8)+
 soil("#4e3a2a",["#6d5340","#3a2b1f","#7f644c"],"#2e2218")},
{seed:131,svg:()=>air("#eef5e4","#d5e8c3","#b3d39a",{lamp:"#fffde7"})+glass()+
 branch("M210 80 Q250 54 310 46 Q350 42 398 20","#7a5c3e",3,"#a1795a")+branch("M300 48 Q296 30 284 16","#7a5c3e",2,"#a1795a")+
 [[230,64,-130],[262,52,-40],[284,16,-110],[300,30,20],[330,40,-20],[356,34,-60],[378,26,10],[398,20,-150],[248,58,30]].map(([x,y,a])=>leaf(x,y,1,a,pick(["#689f38","#7cb342","#558b2f"]),"#33691e")).join("")+
 `<g fill="#c0ca33" opacity=".6">${[[268,54],[340,40]].map(([x,y])=>`<path d="M${x} ${y} q3 -2 6 0 q-3 2 -6 0Z"/>`).join("")}</g>`+
 S(A.stick,316,42,1.3,"rock",0)+S(A.mantis,368,20,1.6,"rock slow",-2,true)+
 soil("#8a6e4c",["#a3875f","#6d5438","#bfa57a"],"#6d5438")},
{seed:137,svg:()=>air("#dcefe2","#a9d7b8","#6fb38a",{mist:.8})+glass()+
 `<g><path d="M330 80 L338 20 L352 20 L346 80Z" fill="#8d6e50"/><path d="M338 20 L352 20" stroke="#5d4430" stroke-width="2"/><g stroke="#6d5340" stroke-width=".8">${[30,40,52,64].map(y=>`<path d="M${338} ${y} q4 2 8 0"/>`).join("")}</g></g>`+
 vine(260,6,52)+vine(300,6,40,"#4caf50")+vine(372,6,58,"#66bb6a")+rosette(240,79,1,"#2e7d32","#43a047",7,24)+rosette(376,79,.8,"#388e3c","#2e7d32",6,20)+
 `<g transform="translate(384 48)"><g class="climb"><g transform="rotate(-90) scale(1.4)">${A.crested}</g></g></g>`+F(A.crested,346,20,1.3,"pe",8,-3,true)+
 moss(320,79,16,30,["#558b2f","#7cb342"])+
 soil("#4a3a2c",["#6b5440","#33281e","#7f6650"],"#33281e")},
{seed:139,svg:()=>air("#d5ece0","#9fd0b5","#62a882",{mist:.7})+glass()+
 `<path d="M240 80 L240 40 Q270 30 300 38 L310 80Z" fill="#5d4632"/><path d="M240 40 Q270 30 300 38" stroke="#7a5c42" stroke-width="2" fill="none"/>`+moss(270,36,18,46,["#558b2f","#7cb342","#33691e"])+
 brom(262,34,.7,"#2e7d32","#e53935")+leaf(296,30,.9,-50)+
 waterPart(300,400,52,"#7ec8e3","#3d8ab3")+waterPart(100,240,62,"#7ec8e3","#3d8ab3")+
 `<path d="M300 38 L312 38 L314 52 L302 52Z" fill="#b3e5fc" opacity=".8"/>`+
 school(T.tetra(),330,64,4,.8,"pa",8)+S(A.treefrog,274,26,1.4,"hop")+F(T.tetra("#ff7043","#4fc3f7"),170,70,.8,"pc",8)+
 blades(320,400,10,10,24,["#43a047","#2e7d32"],1.6)+
 soil("#4e3a2a",["#6d5340","#3a2b1f"],"#3a2b1f")},
{seed:149,svg:()=>air("#fbeedd","#f1d9b6","#e0bd8c",{spot:[300,62]})+glass()+
 `<g transform="translate(352 79)"><path d="M-20 0 Q-20 -20 0 -22 Q20 -20 20 0Z" fill="#6d4c33"/><path d="M-12 0 Q-12 -10 0 -11 Q12 -10 12 0Z" fill="#2b1d14"/><g stroke="#4e3423" stroke-width=".7">${Array.from({length:8},(_,i)=>`<path d="M${-18+i*5} -6 l2 -8"/>`).join("")}</g></g>`+
 bowl(232,79,22,"#81d4fa")+bowl(262,79,22,"#b2ebf2")+
 [[296,77],[316,78],[388,78]].map(([x,y])=>`<g transform="translate(${x} ${y}) scale(.8)"><path d="M-6 0 Q-7 -7 0 -8 Q6 -7 6 0Z" fill="${pick(["#e0c3a0","#f5e1c5","#c9a27a"])}" stroke="#a47a50" stroke-width=".5"/><path d="M-3 -1 Q0 -5 3 -1" stroke="#a47a50" stroke-width=".5" fill="none"/></g>`).join("")+
 F(A.hermit(),284,72,1.7,"pc",8)+F(A.hermit("#f5e1c5","#c9a27a","#c62828"),340,73,1.5,"pc",8,-4,true)+
 soil("#f2d9a8",["#dfc08a","#fff2d6","#c9a46c"],"#dcbc84")},
{seed:151,svg:()=>water("#d5ecf3","#9ccde0","#6aa8c4",{ro:.22})+backdrop("plant","#4f8fa6",.3)+
 rock(360,79,46,20,["#8a9298","#aeb5ba","#666e74"])+rosette(250,79,.9,"#3f8a4a","#4f9a58",7,22)+blades(370,400,6,30,60,["#5aa05f","#3f8a4a"],2)+
 `<g transform="translate(210 79)"><path d="M-8 0 Q-8 -8 0 -9 Q8 -8 8 0Z" fill="#8d6e63"/><path d="M-4 0 Q-4 -4 0 -4.4 Q4 -4 4 0Z" fill="#3e2723"/></g>`+
 F(A.axolotl(),290,62,1.5,"pc",8)+F(A.axolotl("#f6d38a","#e6a23c"),362,42,1.25,"pc",8,-4,true)+
 sandBed("#e9e1cf","#d6cbb1",["#d6cbb1","#f6f0e2"])},
{seed:157,svg:()=>air("#e6f2f6","#c8e2ea","#a7d0dd",{uv:1,spot:[332,44]})+glass()+
 waterPart(100,400,46,"#7fb9cc","#3f7f96")+
 `<path d="M290 50 Q292 42 310 40 L372 38 Q384 40 382 48 L298 54Z" fill="#7a5638"/><path d="M296 46 L380 42" stroke="#a1795a" stroke-width="1.4"/><g stroke="#5d3f28" stroke-width=".6">${[310,330,350,368].map(x=>`<path d="M${x} 41 l2 8"/>`).join("")}</g><path d="M300 54 L296 80 M372 46 L378 80" stroke="#7a5638" stroke-width="2.4"/>`+
 rock(250,79,40,16,["#7d8a8f","#a3afb4","#5b666b"])+blades(200,240,8,14,32,["#4f8a3a","#3f7a2e"],1.6)+
 S(A.slider,338,30,1.3,"breathe",0)+F(A.slider,236,62,1.4,"pc",8)+F(A.slider,368,68,1.1,"pb",8,-3,true)+
 gravelBed(["#8a8a80","#6f6f66","#a3a399","#5b5b54"],"#5b5b54")},
{seed:163,svg:()=>air("#f6ead2","#e8d4ad","#d3b98a",{uv:1,spot:[320,64]})+glass()+
 hide(372,79,40,"#7a5638","#5d3f28")+bowl(220,79,22,"#90caf9")+
 `<g stroke="#c9b26a" stroke-width=".7" fill="none">${Array.from({length:40},()=>{const x=rr(180,400);return `<path d="M${f1(x)} 79 q${f1(rr(-6,6))} -${f1(rr(2,5))} ${f1(rr(-10,10))} -${f1(rr(0,2))}"/>`;}).join("")}</g>`+
 [[262,74],[282,76],[244,77]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0 0 l-6 -2 M0 0 l6 -3 M0 0 l-4 -5 M0 0 l3 -6" stroke="#558b2f" stroke-width="1.6" stroke-linecap="round"/><circle cy="-8" r="2.4" fill="#fdd835"/><circle cy="-8" r="1" fill="#f9a825"/></g>`).join("")+
 `<g fill="#9ccc65">${[[300,77],[306,76]].map(([x,y])=>`<path d="M${x} ${y} q4 -6 8 0 q-4 2 -8 0Z"/>`).join("")}</g>`+
 F(A.tortoise,290,66,1.9,"pc",8)+
 soil("#8a6a44",["#a3825a","#6d5234","#b89870"],"#6d5234")},
{seed:167,svg:()=>water("#cfe0c4","#94b08a","#5f7e5a",{rays:"#fff6d6",ro:.2,parts:"#e8f0d8"})+backdrop("plant","#3f5a3a",.35)+
 branch("M260 80 Q280 60 320 56 Q350 54 380 40","#4e3423",4,"#7a5638")+branch("M320 56 Q326 70 330 80","#4e3423",2.6,"#7a5638")+
 `<g>${Array.from({length:14},()=>{const x=rr(150,400),y=rr(76,80),a=rr(-30,30);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path d="M-6 0 Q0 -3 6 0 Q0 2.6 -6 0Z" fill="${pick(["#6b3e17","#8a5426","#5a3313"])}"/></g>`;}).join("")}</g>`+
 blades(360,400,6,20,46,["#6b8e23","#556b2f"],1.8)+
 F(A.musk,254,70,1.8,"pc",8)+F(A.musk,352,62,1.5,"pc",8,-4,true)+
 sandBed("#6b5440","#54412f",["#7a6248","#4a3828"],"#4a3828")},
);

  const KEYS = ["iwagumi", "blackwater", "malawi", "tanganyika", "shrimp", "betta", "goldfish", "mangrove", "pond", "sps", "soft_coral", "nano_reef", "seahorse", "jellyfish", "predator", "wreck", "abyss", "arctic", "desert", "rainforest", "leopard_gecko", "chameleon", "ball_python", "tarantula", "insects", "crested_gecko", "paludarium", "hermit_crab", "axolotl", "turtle", "tortoise", "musk_turtle"];
  const cache = new Map();
  return (key) => {
    const i = KEYS.indexOf(key);
    if (i < 0) return null;
    if (!cache.has(key)) {
      CUR = {};
      seed = TH[i].seed || 7;
      gid = 0;
      const art = TH[i].svg();
      cache.set(key, { art, water: CUR.water, opts: CUR.opts || {}, ground: CUR.ground, air: CUR.air, wet: !!CUR.wet, ink: TH[i].dark ? "light" : "dark" });
    }
    return cache.get(key);
  };
})();

// The svg of the scene, and what goes over the decor whatever the scene: the current (the filter running), the
// food and the clouded water.
const SVG_OPEN = '<svg class="scene" viewBox="0 0 400 80" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">';
const overlay = (st) =>
  `${st.filter ? `<g class="drift">${[18, 34, 52, 26, 44].map((y, i) => `<circle cx="400" cy="${y}" r=".9" style="animation-delay:${(-i * 1.6).toFixed(1)}s"/>`).join("")}</g>` : ""}
    ${st.feeding ? flakes() : ""}
    ${st.murky ? `<rect class="murk ${st.murky}" x="-400" width="800" height="80"/>` : ""}`;

// A themed tank: the light and the water of the theme, its decor and animals, then the parts that follow the
// equipment (heater, bubbles, CO₂, current, food) and the night.
const NIGHT_VEIL = { jellyfish: 0.15, abyss: 0 };
const themedRays = (o, color) =>
  `<g class="rays">${["M120 0 L150 0 L190 80 L135 80Z", "M230 0 L250 0 L290 80 L250 80Z", "M330 0 L345 0 L380 80 L345 80Z"]
    .map((d) => `<path d="${d}" style="fill:${color || o.rc || "#ffffff"};opacity:${o.ro ?? 0.28}"/>`)
    .join("")}</g>`;
const themedSvg = (st, th) => {
  if (th.air) return airSvg(st, th);
  const o = th.opts;
  const surface = o.surface !== 0;
  const pond = st.scene === "pond";
  const veil = NIGHT_VEIL[st.scene] ?? 0.5;
  return `${SVG_OPEN}
    ${!st.dark && (o.ro ?? 0.28) > 0 ? themedRays(o, st.color) : ""}
    ${surface && (o.caus ?? 0.35) > 0 && !st.dark ? `<g class="caustics"><path style="opacity:${o.caus ?? 0.35}" d="M-400 5 ${"q10 -4 20 0 t20 0 ".repeat(21)}"/></g>` : ""}
    ${surface ? `<rect class="lamp" x="-400" width="800" height="2.5"${st.dark ? "" : ` style="fill:${o.lampC || "#fff3c4"}"`}/>` : ""}
    <g class="decor">${th.art}</g>
    ${st.dark && veil ? `<rect class="veil" x="-400" width="800" height="80" style="opacity:${veil}"/>` : ""}
    ${st.dark && surface ? moon : ""}
    ${st.heat !== null && !pond ? heater(388) : ""}
    ${st.bubbles && !pond ? bubbles(206) : ""}
    ${st.co2 && !pond ? co2Bubbles(186) : ""}
    ${overlay(st)}
  </svg>`;
};
// A terrarium: its lamp bar and UVB tube, the basking spot's cone and glow while the lamp is on, the mist while the
// mister runs (else the theme's own mist in daytime), the night; the water parts of a paludarium or a turtle tank.
const airSvg = (st, th) => {
  const a = th.air;
  const veil = NIGHT_VEIL[st.scene] ?? 0.5;
  const mist = st.mist ?? (a.mist > 0 && !st.dark);
  return `${SVG_OPEN}
    <rect class="lamp" x="-400" width="800" height="3"${st.dark ? "" : ` style="fill:${th.opts.lampC}"`}/>
    ${st.uvb && !st.dark ? `<g class="uvb">${a.tube}</g>` : ""}
    <g class="decor">${th.art}</g>
    ${st.spot && a.spot ? `<g class="spot">${a.spot}</g>` : ""}
    ${a.fixture ? `<g class="fixture${st.spot ? " on" : ""}">${a.fixture}</g>` : ""}
    ${mist ? a.fog : ""}
    ${st.dark && veil ? `<rect class="veil" x="-400" width="800" height="80" style="opacity:${veil}"/>` : ""}
    ${st.dark ? moon : ""}
    ${th.wet ? overlay(st) : ""}
  </svg>`;
};
// The colours of a themed header: its water (darkened at night) and its substrate strip.
const GROUND_DEFAULTS = {
  pond: { c: "#8d8a80", dots: ["#a19e94", "#77746b", "#b6b2a7"] },
  jellyfish: { c: "#07091c" },
  abyss: { c: "#05070d" },
};
const themedStyle = (st, th) => {
  const night = (c) => (st.dark ? `color-mix(in srgb, ${c} 38%, #061026)` : c);
  const [w1, w2, w3] = th.water || ["#8ccdee", "#4ea2da", "#2f7fc0"];
  const g = th.ground || GROUND_DEFAULTS[st.scene] || { c: "#e2c28a" };
  const dots = g.dots?.length ? g.dots : [g.c, g.c];
  return {
    banner: `--aq-w1:${night(w1)};--aq-w2:${night(w2)};--aq-w3:${night(w3)}`,
    ground: `background-color:${night(g.c)};box-shadow:inset 0 1px 0 color-mix(in srgb, ${night(g.c)} 80%, #000);background-image:radial-gradient(circle, ${night(dots[0])} 0 .9px, transparent 1.3px), radial-gradient(circle, ${night(dots[1])} 0 .8px, transparent 1.2px)`,
  };
};

// The scene of a state: { kind, dark, moon, color, filter, bubbles, co2, heat, feeding, waves, still, murky }.
// `key` changes with the parts drawn, so that a part appearing gets fresh nodes (its animation starts at once).
const sceneSvg = (st) => {
  const th = st.scene && THEME_ART(st.scene);
  if (th) return themedSvg(st, th);
  const reef = st.kind === "reef";
  const rayStyle = st.color ? ` tinted" style="fill:${st.color}` : "";
  return `${SVG_OPEN}
    <defs>${reef ? REEF_FISH : FRESH_FISH}</defs>
    ${st.dark ? "" : rays(rayStyle)}
    ${lamp}
    ${st.dark ? moon : ""}
    ${st.heat !== null ? heater(388) : ""}
    ${reef ? reefScene() : freshScene()}
    ${st.bubbles ? bubbles(reef ? 200 : 206) : ""}
    ${st.co2 ? co2Bubbles(reef ? 186 : 248) : ""}
    ${overlay(st)}
  </svg>`;
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const BASE_STYLE = `
  :host { --aq-accent: #0288d1; --aq-ok: var(--success-color, #43a047); --aq-warn: var(--warning-color, #ffa600);
          --aq-crit: var(--error-color, #db4437); --aq-idle: var(--disabled-text-color, #9e9e9e); --aq-heat: #f59e0b;
          --aq-flow: #2f80ed; --aq-cold: #00acc1; --aq-moon: #7e57c2;
          --aq-ok-z: color-mix(in srgb, var(--aq-ok) 55%, transparent); --aq-warn-z: color-mix(in srgb, var(--aq-warn) 45%, transparent);
          --aq-crit-z: color-mix(in srgb, var(--aq-crit) 32%, transparent);
          /* Text in a state or accent color is mixed with the text color so that it reads at 4.5:1 at least. */
          --aq-accent-text: color-mix(in srgb, var(--aq-accent) 55%, var(--primary-text-color)); }
  ha-card { overflow: hidden; position: relative; container-type: inline-size; }
  /* A size container has no width of its own content: in a parent sized by its content the card would fall to a
     few pixels. This empty grid gives it a natural width without any minimum. */
  :host { display: block; min-width: 0; --aq-natural-width: 400px; }
  :host::before { content: ""; display: grid; grid-template-columns: minmax(0, var(--aq-natural-width)); height: 0; }
  .icon { width: 18px; height: 18px; fill: currentColor; flex: none; }
  .muted { color: var(--secondary-text-color); }
  .clickable { cursor: pointer; }
  [role="button"]:focus-visible, button:focus-visible { outline: 2px solid var(--primary-color, var(--aq-accent)); outline-offset: 2px; }
  .ok { --c: var(--aq-ok); } .warn { --c: var(--aq-warn); } .crit { --c: var(--aq-crit); } .idle { --c: var(--aq-idle); }
  .heat { --c: var(--aq-heat); } .flow { --c: var(--aq-flow); } .cold { --c: var(--aq-cold); } .moon { --c: var(--aq-moon); }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c, var(--aq-ok)); flex: none; display: inline-block; }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; white-space: nowrap;
          background: color-mix(in srgb, var(--c, var(--aq-ok)) 15%, transparent); color: color-mix(in srgb, var(--c, var(--aq-ok)) 50%, var(--primary-text-color));
          flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; line-height: 16px; }
  .chip-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .warning { padding: 16px; color: color-mix(in srgb, var(--aq-warn) 50%, var(--primary-text-color)); }
  /* Buttons as on the other ha-* cards: never filled, a light tint; the icon takes the accent color when on. */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; cursor: pointer; font: inherit; font-size: 13px;
         font-weight: 500; padding: 6px 12px; border-radius: 18px; min-width: 0; color: var(--primary-text-color);
         background: var(--secondary-background-color, rgba(127,127,127,.12)); }
  .btn span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .btn .icon { color: var(--secondary-text-color); }
  .btn.on { background: color-mix(in srgb, var(--aq-accent) 16%, transparent); color: var(--aq-accent-text); }
  .btn.on .icon { color: var(--aq-accent); }
  .btn:not(:disabled):hover { background: color-mix(in srgb, var(--aq-accent) 12%, var(--secondary-background-color, rgba(127,127,127,.12))); }
  .btn.on:not(:disabled):hover { background: color-mix(in srgb, var(--aq-accent) 24%, transparent); }
  .btn:disabled { opacity: .45; cursor: default; }
  .btn.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; flex: none; }

  /* ── Illustrated header: the tank ── */
  .banner { position: relative; height: var(--banner-h, 90px); overflow: hidden; --ground-h: 10px;
            --aq-w1: #8ccdee; --aq-w2: #4ea2da; --aq-w3: #2f7fc0; --aq-text: #0d2a45; --aq-muted: #24506e;
            background: linear-gradient(180deg, var(--aq-w1) 0%, var(--aq-w2) 58%, var(--aq-w3) 100%); }
  .banner.fresh { --aq-w1: #a8dccf; --aq-w2: #6cb6a8; --aq-w3: #4a978d; --aq-text: #0f3a35; --aq-muted: #24564f; }
  .banner.dark { --aq-w1: #0f3a6e; --aq-w2: #0b2b55; --aq-w3: #071d3c; --aq-text: #ffffff; --aq-muted: rgba(255,255,255,.78); }
  .banner.fresh.dark { --aq-w1: #143e4c; --aq-w2: #0e3040; --aq-w3: #0a2331; }
  .banner.ink { --aq-text: #ffffff; --aq-muted: rgba(255,255,255,.78); }
  .banner .scene { position: absolute; right: 0; bottom: var(--ground-h); width: 400px; height: calc(100% - var(--ground-h)); overflow: visible; }
  /* The substrate strip: the same height as the runway of the flight board, sand (reef) or gravel (freshwater). */
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--ground-h); background: #e2c28a;
            box-shadow: inset 0 1px 0 #cfab6d, inset 0 -1px 0 #c39d5f;
            background-image: radial-gradient(circle, #c9a468 0 .9px, transparent 1.3px), radial-gradient(circle, #f3dcae 0 .8px, transparent 1.2px);
            background-size: 11px 10px, 17px 10px; background-position: 2px 3px, 7px 6px; }
  .fresh .ground { background-color: #6f5d4b; box-shadow: inset 0 1px 0 #5c4c3c, inset 0 -1px 0 #4f4133;
                   background-image: radial-gradient(circle, #8d7a63 0 1.3px, transparent 1.7px), radial-gradient(circle, #4f4133 0 1px, transparent 1.4px); }
  .dark .ground { background-color: #2b3756; box-shadow: inset 0 1px 0 #222c46, inset 0 -1px 0 #1c253c;
                  background-image: radial-gradient(circle, #3a4768 0 .9px, transparent 1.3px), radial-gradient(circle, #1f2943 0 .8px, transparent 1.2px); }
  .fresh.dark .ground { background-color: #2c2a28; box-shadow: inset 0 1px 0 #24221f, inset 0 -1px 0 #1d1b19; }
  /* The texts keep to the left: the fish swim in the right part of the tank, under the status pill. */
  .head { position: absolute; z-index: 1; left: 0; top: 0; right: min(42%, 170px); bottom: var(--ground-h); box-sizing: border-box;
          display: flex; align-items: center; gap: 10px; padding: 8px 4px 8px 14px; min-width: 0; color: var(--aq-text); }
  /* The detail button: the top right corner, as on the other ha-* cards. */
  .corner { position: absolute; z-index: 2; top: 6px; right: 6px; display: flex; align-items: center; gap: 6px; }
  .badge { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; position: relative;
           --tint: var(--c, var(--aq-accent)); color: color-mix(in srgb, var(--tint) 75%, #0d2a45);
           background: rgba(255,255,255,.66); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tint) 30%, transparent); transition: color .3s ease; }
  .dark .badge, .ink .badge { background: rgba(255,255,255,.14); color: color-mix(in srgb, var(--tint) 60%, #ffffff); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
  .badge .icon { width: 24px; height: 24px; }
  .titles { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; }
  /* The status pill sits on the title's line, right after the title, with its whole label (placed by _fitPill). */
  .title-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .title-row > .chip { flex: none; max-width: none; }
  .name { flex: 0 1000 auto; min-width: 0; font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  :host([hide-title]) .name { visibility: hidden; }
  :host([hide-subtitle]) .sub { display: none; }
  /* The subtitle on two lines at most. */
  .sub { font-size: 12px; line-height: 16px; color: var(--aq-muted, var(--secondary-text-color)); display: -webkit-box; -webkit-line-clamp: 2;
         -webkit-box-orient: vertical; overflow: hidden; }
  /* The whole title and the whole pill do not fit side by side (measured, see _fitPill): the pill goes to its own
     line, under the subtitle kept to one line; if that does not fit above the substrate either, its dot alone. */
  .titles.below > .title-row { display: contents; }
  .titles.below > .title-row > .chip { order: 3; align-self: flex-start; max-width: 100%; margin-top: 3px; }
  .titles.below > .sub { order: 2; -webkit-line-clamp: 1; }
  .titles.dot-only > .title-row { display: flex; }
  .titles.dot-only > .title-row > .chip { order: 0; align-self: center; margin-top: 0; padding: 4px; }
  .titles.dot-only .chip-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  /* On the water, the pill gets a frosted base so that it reads over the fish. */
  .banner .chip { background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.86)); color: color-mix(in srgb, var(--c) 55%, #0d2a45); }
  .banner.dark .chip, .banner.ink .chip { background: color-mix(in srgb, var(--c) 30%, rgba(10,24,48,.72)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; border-radius: 50%;
          display: grid; place-items: center; color: #0d2a45; background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(13,42,69,.12); }
  .zoom .icon { width: 16px; height: 16px; }
  .dark .zoom, .ink .zoom { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
  .zoom:hover { background: rgba(255,255,255,.78); }
  .dark .zoom:hover, .ink .zoom:hover { background: rgba(255,255,255,.22); }
  .zoom.plain { position: absolute; color: var(--secondary-text-color); background: none; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); top: 14px; right: 12px; }
  /* Classic header (illustration: false). */
  .header { display: flex; align-items: center; gap: 10px; padding: 12px 12px 0 14px; position: relative; }
  .zoomable.header { padding-right: 44px; }
  .header .badge { background: color-mix(in srgb, var(--tint) 16%, transparent); box-shadow: none; color: color-mix(in srgb, var(--tint) 70%, var(--primary-text-color)); }
  .header .sub { color: var(--secondary-text-color); }

  /* ── Scene colours (reef, freshwater; day, night) ── */
  .scene .lamp { fill: #ffe7a0; } .dark .scene .lamp { fill: #3b3f8f; } .moonlit .scene .lamp { fill: #6c63ff; }
  .scene .rays path { fill: #ffffff; opacity: .3; } .scene .rays.tinted path { fill: inherit; opacity: .28; }
  .scene .caustics path { fill: none; stroke: #ffffff; stroke-width: 1.2; opacity: .5; }
  .scene .moon .halo { fill: #e8e6ff; opacity: .12; } .scene .moon .disc { fill: #efedff; }
  .scene .rk { fill: #9a8f82; } .scene .rk2 { fill: #7c7166; }
  .scene .sd { fill: #f2d6a2; } .scene .sd2 { fill: #d9b677; }
  .scene .fan { fill: none; stroke: #e0503c; stroke-width: 1.6; stroke-linecap: round; } .scene .fan.thin { stroke-width: .6; opacity: .7; }
  .scene .acro { fill: none; stroke: #b565d9; stroke-width: 4; stroke-linecap: round; } .scene .acro-tip { fill: #f0c8fa; }
  .scene .brain { fill: #9cc85a; } .scene .brain-l { fill: none; stroke: #5e8f2a; stroke-width: 1.3; }
  .scene .leather { fill: #e8c07a; } .scene .leather-p { fill: #f6e2b3; }
  .scene .zoa { fill: #2bb3a3; } .scene .zoa-c { fill: #f5a623; }
  .scene .anem { fill: none; stroke: #f7b3c9; stroke-width: 2.6; stroke-linecap: round; } .scene .anem-tip { fill: #f06a9b; }
  .scene .star { fill: #f0703c; } .scene .shell { fill: #f7e7ce; }
  .fresh .scene .sd { fill: #8a7560; } .fresh .scene .sd2 { fill: #5f4e3e; } .fresh .scene .rk { fill: #8e8e8a; } .fresh .scene .rk2 { fill: #6f6f6b; }
  .scene .val { fill: none; stroke: #4f9a3a; stroke-width: 2.4; stroke-linecap: round; }
  .scene .wood { fill: none; stroke: #7a5236; stroke-width: 6; stroke-linecap: round; } .scene .wood2 { fill: none; stroke: #9b6d4a; stroke-width: 1.6; stroke-linecap: round; }
  .scene .fern { fill: #3e7d32; } .scene .sword { fill: #5fae3e; } .scene .sword-v { fill: none; stroke: #3f8a2a; stroke-width: .7; }
  .scene .lud { fill: none; stroke: #9a4a2a; stroke-width: 1.4; } .scene .lud-l { fill: #e0603a; }
  .scene .anubias { fill: #2f6f2a; } .scene .moss { fill: none; stroke: #6fbf3e; stroke-width: 2.4; stroke-linecap: round; }
  .scene .bubbles circle { fill: #ffffff; fill-opacity: .55; stroke: #ffffff; stroke-opacity: .9; stroke-width: .5; }
  .scene .co2 .glass { fill: rgba(255,255,255,.35); stroke: rgba(255,255,255,.7); stroke-width: .5; } .scene .co2 circle { fill: #ffffff; opacity: .9; }
  .scene .drift circle { fill: #ffffff; opacity: .7; }
  .scene .flakes rect { fill: #f2a34a; } .scene .flakes rect:nth-child(3n) { fill: #e85d3a; } .scene .flakes rect:nth-child(3n+1) { fill: #f6d26a; }
  .scene .heater .tube { fill: rgba(255,255,255,.35); stroke: rgba(255,255,255,.75); stroke-width: .6; } .scene .heater .cap { fill: #78909c; }
  .scene .heater .coil { fill: #b0bec5; } .heating .scene .heater .coil { fill: #ff7043; }
  .scene .murk { fill: #6f8f5a; opacity: .28; } .scene .murk.crit { fill: #8a8466; opacity: .4; }
  /* Night: deep blue water; a reef's corals fluoresce under the actinic light. */
  .dark .scene .rk { fill: #33415e; } .dark .scene .rk2 { fill: #26314a; } .dark .scene .sd { fill: #2b3756; } .dark .scene .sd2 { fill: #1f2943; }
  .dark .scene .fan { stroke: #ff4f86; } .dark .scene .acro { stroke: #6e5cf0; } .dark .scene .acro-tip { fill: #8df3ff; }
  .dark .scene .brain { fill: #33d69a; } .dark .scene .brain-l { stroke: #14805a; } .dark .scene .leather { fill: #8d9bff; } .dark .scene .leather-p { fill: #c9d2ff; }
  .dark .scene .zoa { fill: #3bffb8; } .dark .scene .zoa-c { fill: #ffe45c; } .dark .scene .anem { stroke: #b66cff; } .dark .scene .anem-tip { fill: #ff8ceb; }
  .dark .scene .star { fill: #a0503a; } .dark .scene .shell { fill: #5a6680; }
  .fresh.dark .scene .val { stroke: #24502a; } .fresh.dark .scene .wood { stroke: #3a2a20; } .fresh.dark .scene .wood2 { stroke: #4a3628; }
  .fresh.dark .scene .fern, .fresh.dark .scene .anubias { fill: #1d3d22; } .fresh.dark .scene .sword { fill: #2c5a26; }
  .fresh.dark .scene .lud-l { fill: #7a3a28; } .fresh.dark .scene .moss { stroke: #2f5a2a; }
  .fresh.dark .scene .sd { fill: #3a342e; } .fresh.dark .scene .sd2 { fill: #2a2622; } .fresh.dark .scene .rk { fill: #474744; } .fresh.dark .scene .rk2 { fill: #383836; }
  .dark .scene .swimmers { opacity: .82; }

  /* ── Animations (each one a divisor of 8 s) ── */
  .scene .fish { transform-box: fill-box; transform-origin: center; }
  .scene .pace-a { animation: aq-pace-a 8s ease-in-out infinite; }
  .scene .pace-b { animation: aq-pace-b 8s ease-in-out infinite; }
  .scene .pace-c { animation: aq-pace-c 8s ease-in-out infinite; }
  .scene .pace-d { animation: aq-pace-d 8s ease-in-out infinite; }
  .scene .pace-e { animation: aq-pace-e 8s ease-in-out infinite; }
  .scene .bob { animation: aq-bob 2s ease-in-out infinite; } .scene .bob.slow { animation-duration: 4s; } .scene .bob.quick { animation-duration: 1s; }
  .scene .sway { transform-box: fill-box; transform-origin: 50% 100%; animation: aq-sway 4s ease-in-out infinite; }
  .scene .sway.slow { animation-duration: 8s; }
  .waves .scene .sway { animation-duration: 2s; } .waves .scene .sway.slow { animation-duration: 4s; }
  .scene .rays { animation: aq-rays 4s ease-in-out infinite; }
  .scene .caustics path { animation: aq-caustics 2s linear infinite; }
  .scene .bubbles circle { animation: aq-up 2s ease-in infinite; }
  .scene .co2 circle { animation: aq-co2 2s linear infinite; }
  .scene .drift circle { animation: aq-drift 8s linear infinite; }
  .scene .flakes rect { transform-box: fill-box; transform-origin: center; animation: aq-fall 4s linear infinite; }
  .heating .scene .heater .coil { animation: aq-glow 2s ease-in-out infinite; }
  .dark.reef .scene .glow { animation: aq-glow 4s ease-in-out infinite; }
  .scene .moon .halo { animation: aq-glow 4s ease-in-out infinite; }
  /* A tank in trouble: the fish stand still. */
  .still .scene .fish, .still .scene .bob { animation-play-state: paused; }
  @keyframes aq-pace-a { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(118px) scaleX(1); } 50% { transform: translateX(118px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-b { 0% { transform: translateX(0) scaleX(-1); } 47% { transform: translateX(-118px) scaleX(-1); } 50% { transform: translateX(-118px) scaleX(1); } 97% { transform: translateX(0) scaleX(1); } 100% { transform: translateX(0) scaleX(-1); } }
  @keyframes aq-pace-c { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(80px) scaleX(1); } 50% { transform: translateX(80px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-d { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(70px) scaleX(1); } 50% { transform: translateX(70px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-e { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(40px) scaleX(1); } 50% { transform: translateX(40px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-bob { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, -3px); } }
  @keyframes aq-sway { 0%, 100% { transform: skewX(-4deg); } 50% { transform: skewX(5deg); } }
  @keyframes aq-rays { 0%, 100% { opacity: .7; } 50% { opacity: 1; } }
  @keyframes aq-caustics { from { transform: translateX(0); } to { transform: translateX(-40px); } }
  @keyframes aq-up { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-68px); opacity: 0; } }
  @keyframes aq-co2 { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-58px) translateX(3px); opacity: 0; } }
  @keyframes aq-drift { from { transform: translateX(0); opacity: 0; } 10% { opacity: .8; } 90% { opacity: .8; } to { transform: translateX(-260px); opacity: 0; } }
  @keyframes aq-fall { 0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate(6px, 70px) rotate(220deg); opacity: 0; } }
  @keyframes aq-glow { 0%, 100% { opacity: .65; } 50% { opacity: 1; } }
  /* ── Themed tanks: their animals, plants and particles ── */
  .scene .t-pa { animation: aq-t-pa 8s ease-in-out infinite; }
  .scene .t-pb { animation: aq-t-pb 8s ease-in-out infinite; }
  .scene .t-pc { animation: aq-t-pc 8s ease-in-out infinite; }
  .scene .hang { transform-box: fill-box; transform-origin: 50% 0; animation: aq-sway 8s ease-in-out infinite; }
  .scene .pulse { transform-box: fill-box; transform-origin: 50% 0; animation: aq-pulse 2s ease-in-out infinite; }
  .scene .rise { animation: aq-rise 8s ease-in-out infinite; }
  .scene .gl { animation: aq-gl 2s ease-in-out infinite; }
  .scene .part circle { animation: aq-part 8s ease-in-out infinite; }
  .scene .bub circle { animation: aq-up 2s ease-in infinite; }
  .scene .snow circle { animation: aq-snow 8s linear infinite; }
  .scene .veil { fill: #061026; }
  .scene .gl.slow { animation-duration: 4s; }
  .scene .fixture .bulb { fill: #78909c; } .scene .fixture.on .bulb { fill: #ffe082; }
  .scene .uvb { animation: aq-glow 4s ease-in-out infinite; }
  .scene .mist ellipse { animation: aq-mist 8s ease-in-out infinite; }
  .scene .drip circle { animation: aq-drip 2s ease-in infinite; }
  .scene .hop { animation: aq-hop 4s ease-in-out infinite; }
  .scene .cham { animation: aq-cham 8s ease-in-out infinite; }
  .scene .eyeroll { animation: aq-eye 4s ease-in-out infinite; }
  .scene .tongue { animation: aq-tongue 2s steps(1) infinite; }
  /* The heat mat warms the substrate from below. */
  .mat .ground::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(255,112,67,.6), rgba(255,112,67,0)); animation: aq-glow 4s ease-in-out infinite; }
  .still .scene .hop, .still .scene .eyeroll { animation-play-state: paused; }
  /* Terrarium animals: a lizard or a spider walks a little way and turns, a chameleon creeps, a gecko climbs the
     glass, a snake or a basking turtle breathes, a bearded dragon bobs its head, stick insects rock. */
  .scene .t-pd { animation: aq-t-pd 8s ease-in-out infinite; }
  .scene .t-pe { animation: aq-t-pe 8s ease-in-out infinite; }
  .scene .climb { animation: aq-climb 8s ease-in-out infinite; }
  .scene .breathe { transform-box: fill-box; transform-origin: 50% 100%; animation: aq-breathe 4s ease-in-out infinite; }
  .scene .nod { transform-box: fill-box; transform-origin: 100% 100%; animation: aq-nod 2s ease-in-out infinite; }
  .scene .rock { transform-box: fill-box; transform-origin: 50% 50%; animation: aq-rock 4s ease-in-out infinite; }
  .scene .rock.slow { animation-duration: 8s; }
  .still .scene .climb, .still .scene .nod, .still .scene .breathe { animation-play-state: paused; }
  @keyframes aq-t-pd { 0%, 10% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(28px) scaleX(1); } 50%, 60% { transform: translateX(28px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pe { 0%, 15% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(12px) scaleX(1); } 50%, 65% { transform: translateX(12px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-climb { 0%, 100% { transform: translateY(0); } 40%, 55% { transform: translateY(-16px); } }
  @keyframes aq-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.03, 1.06); } }
  @keyframes aq-nod { 0%, 30%, 100% { transform: translateY(0) rotate(0deg); } 45% { transform: translateY(1.5px) rotate(2deg); } 60% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(1.5px) rotate(2deg); } }
  @keyframes aq-rock { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
  /* Their limbs: walking (or paddling) legs while the animal moves, a swaying tail, an axolotl's gills, a frog's throat. */
  .scene .lg-a, .scene .lg-b { transform-box: fill-box; transform-origin: 50% 0; }
  .scene [class*="t-p"] .lg-a { animation: aq-step 1s ease-in-out infinite; }
  .scene [class*="t-p"] .lg-b { animation: aq-step 1s ease-in-out -.5s infinite; }
  .scene .tail { transform-box: fill-box; transform-origin: 100% 50%; animation: aq-tail 2s ease-in-out infinite; }
  .scene .gills { transform-box: fill-box; transform-origin: 100% 100%; animation: aq-gills 2s ease-in-out infinite; }
  .scene .throat { transform-box: fill-box; transform-origin: 50% 0; animation: aq-throat 1s ease-in-out infinite; }
  .still .scene .lg-a, .still .scene .lg-b, .still .scene .tail { animation-play-state: paused; }
  @keyframes aq-step { 0%, 100% { transform: rotate(-16deg); } 50% { transform: rotate(16deg); } }
  @keyframes aq-tail { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
  @keyframes aq-gills { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(5deg); } }
  @keyframes aq-throat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.25, 1.5); } }
  /* Fish: the tail beats and the pectoral fin flutters. */
  .scene .tf { transform-box: fill-box; transform-origin: 100% 50%; animation: aq-tf .5s ease-in-out infinite alternate; }
  .scene .pf { transform-box: fill-box; transform-origin: 100% 0; animation: aq-pf 1s ease-in-out infinite; }
  .still .scene .tf, .still .scene .pf { animation-play-state: paused; }
  @keyframes aq-tf { from { transform: scaleX(1) skewY(-6deg); } to { transform: scaleX(.86) skewY(6deg); } }
  @keyframes aq-pf { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }
  @keyframes aq-mist { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-18px); } }
  @keyframes aq-drip { 0% { transform: translateY(0); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
  @keyframes aq-hop { 0%, 60%, 100% { transform: translate(0, 0); } 70% { transform: translate(6px, -8px); } 80% { transform: translate(12px, 0); } 90% { transform: translate(6px, -4px); } }
  @keyframes aq-cham { 0%, 100% { fill: #4caf50; } 50% { fill: #26a69a; } }
  @keyframes aq-eye { 0%, 100% { transform: translate(0, 0); } 40% { transform: translate(-1px, -.6px); } 70% { transform: translate(.6px, .6px); } }
  @keyframes aq-tongue { 0% { opacity: 0; } 80% { opacity: 1; } }
  .still .scene .hang, .still .scene .pulse, .still .scene .rise { animation-play-state: paused; }
  @keyframes aq-t-pa { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(90px) scaleX(1); } 50% { transform: translateX(90px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pb { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(-100px) scaleX(1); } 50% { transform: translateX(-100px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pc { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(45px) scaleX(1); } 50% { transform: translateX(45px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pulse { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.12, .86); } }
  @keyframes aq-rise { 0%, 100% { transform: translateY(8px); } 50% { transform: translateY(-8px); } }
  @keyframes aq-gl { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
  @keyframes aq-part { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-6px, 3px); } }
  @keyframes aq-snow { 0% { transform: translateY(-6px); opacity: 0; } 10% { opacity: .8; } 100% { transform: translateY(78px); opacity: 0; } }
  @keyframes aq-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  @media (prefers-reduced-motion: reduce) { .scene *, .dot { animation: none !important; } }
  /* The status dot blinks while something is wrong, as on the other ha-* cards. */
  .chip.crit .dot { animation: aq-blink 1.6s ease-in-out infinite; }

  /* ── Tiles (look "B" of the ha-* cards: neutral tile, tinted round icon, bold name, colored state, a badge) ── */
  .tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .tile { display: flex; gap: 8px; align-items: center; padding: 8px 18px 8px 8px; border-radius: 12px; min-width: 0; position: relative;
          background: var(--secondary-background-color, rgba(127,127,127,.08)); cursor: pointer; }
  .tile:hover { background: color-mix(in srgb, var(--c, var(--aq-idle)) 8%, var(--secondary-background-color, rgba(127,127,127,.08))); }
  .pi { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; flex: none;
        background: color-mix(in srgb, var(--c, var(--aq-idle)) 16%, transparent); color: color-mix(in srgb, var(--c, var(--aq-idle)) 70%, var(--primary-text-color)); }
  .pi .icon { width: 18px; height: 18px; }
  .tile .tx { min-width: 0; display: flex; flex-direction: column; }
  .tile .tn { font-size: 13px; font-weight: 500; line-height: 17px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
  .tile .ts { font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
              color: color-mix(in srgb, var(--c, var(--aq-idle)) 60%, var(--primary-text-color)); }
  .tile.idle .ts { color: var(--secondary-text-color); }
  .tile .tb { position: absolute; top: 8px; right: 8px; width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--aq-idle)); }

  /* ── Gauges ── */
  .gauges { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .gauge { display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; border-radius: 10px; min-width: 0;
           background: var(--secondary-background-color, rgba(127,127,127,.08)); }
  .g-head { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .g-head .icon { width: 16px; height: 16px; color: var(--c, var(--secondary-text-color)); }
  .g-label { flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .g-value { font-size: 15px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; }
  .g-value small { font-size: 11px; font-weight: 400; margin-left: 2px; color: var(--secondary-text-color); }
  .gauge:is(.warn, .crit) .g-value { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .g-track { position: relative; height: 6px; border-radius: 3px; }
  .g-mark { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; transform: translate(-50%, -50%); box-sizing: border-box;
            background: var(--card-background-color, #fff); border: 3px solid color-mix(in srgb, var(--c, var(--aq-idle)) 75%, var(--primary-text-color));
            transition: left .6s ease; }
  .g-range { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── In-card confirmation popup at the top of the card (not centered) ── */
  ha-card.dialog-open { min-height: 160px; }
  .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: flex-start; justify-content: center;
              padding-top: 12px; box-sizing: border-box; z-index: 9; border-radius: inherit; }
  .modal { background: var(--card-background-color, #1c1c1c); color: var(--primary-text-color); width: min(92%, 340px); box-sizing: border-box;
           border-radius: 14px; padding: 16px; box-shadow: 0 8px 30px rgba(0,0,0,.4); display: flex; flex-direction: column; gap: 12px; }
  .modal .msg { font-size: 14px; line-height: 1.4; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
  /* A narrow card keeps the water, the light and the substrate for its texts: no scenery, as on the flight board. */
  @container (max-width: 300px) {
    .banner .scene .decor { display: none; }
    .head { right: 64px; }
  }
  @container (max-width: 240px) {
    .chip { padding: 4px; flex: none; }
    .chip-text { display: none; }
    .head { gap: 8px; padding-left: 10px; }
  }
`;

const FULL_STYLE = `
  .content { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
  .controls { display: flex; flex-wrap: wrap; gap: 6px; }
  .controls .btn { flex: 1 1 auto; }
  .section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;
                   letter-spacing: .04em; color: var(--secondary-text-color); margin-bottom: 6px; cursor: pointer; user-select: none; }
  .section-title .icon { width: 16px; height: 16px; }
  .section-title span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .section-title[aria-expanded="false"] { margin-bottom: 0; }
  /* Chevron to the right when folded, down when unfolded. */
  .section-title .chevron { margin-left: auto; width: 16px; height: 16px; transition: transform .2s ease; }
  .section-title[aria-expanded="false"] .chevron { transform: rotate(-90deg); }
  .section-title .count { font-size: 11px; padding: 0 6px; border-radius: 8px; text-transform: none; letter-spacing: 0;
                          background: color-mix(in srgb, var(--c, var(--aq-idle)) 18%, transparent); color: color-mix(in srgb, var(--c, var(--aq-idle)) 55%, var(--primary-text-color)); }
  .advice { display: flex; flex-direction: column; gap: 6px; }
  .tip { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; line-height: 1.35; padding: 6px 10px; border-radius: 10px;
         background: color-mix(in srgb, var(--c, var(--aq-ok)) 10%, transparent); }
  .tip .icon { width: 18px; height: 18px; color: var(--c, var(--aq-ok)); }
  @container (max-width: 300px) {
    .gauges, .tiles { grid-template-columns: minmax(0, 1fr); }
  }
`;

const MINI_STYLE = `
  :host { --aq-natural-width: 320px; }
  .content { padding: 10px 12px 12px; display: flex; align-items: center; gap: 10px; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .pills { display: flex; flex-wrap: wrap; gap: 4px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; padding: 2px 8px; border-radius: 10px; white-space: nowrap;
          background: var(--secondary-background-color, rgba(127,127,127,.1)); }
  .pill .k { color: var(--secondary-text-color); }
  .pill .v { font-weight: 500; }
  .pill:is(.warn, .crit) .v { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .line .icon { width: 14px; height: 14px; color: var(--c, var(--secondary-text-color)); }
  .line span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line.tip-line { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .controls { display: flex; gap: 6px; flex: none; }
  @container (max-width: 260px) {
    .content { flex-wrap: wrap; row-gap: 8px; }
    .controls { flex-basis: 100%; justify-content: flex-end; }
  }
`;

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

// Home Assistant dialogs (more-info opened from the card): a click there is not a click elsewhere on the page.
const DIALOG_TAGS = new Set(["HA-MORE-INFO-DIALOG", "HA-DIALOG", "DIALOG"]);
// The width of an element's text as laid out (whole, even when its box cuts it with an ellipsis).
const textWidth = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width || el.scrollWidth;
};

const isOutside = (card, ev) => {
  const path = ev.composedPath();
  return !path.includes(card) && !path.some((n) => DIALOG_TAGS.has(n.tagName));
};
// After the popup closes, clicks are ignored this long (second click of a double click on OK).
const CONFIRM_GUARD_MS = 400;

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable sends no click to the page. The handler runs when the press and the
// release are both outside the card (a slider dragged out of the card does not count, and a scroll cancels the
// pointer); keyboard clicks (no click count) still go through the click event. `tap(ev)` is for the tests.
const watchOutside = (card, handler) => {
  let downOutside = false;
  const outside = (ev) => !ev.composedPath().includes(card);
  const onDown = (ev) => {
    downOutside = outside(ev);
  };
  const onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  const onClick = (ev) => {
    if (ev.detail === 0 && outside(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("pointerup", onUp, true);
      document.addEventListener("click", onClick, true);
    },
    off() {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
    },
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
  };
};

const METRIC_ICONS = {
  water_temperature: ICONS.water_temp,
  ph: ICONS.ph,
  ammonia: ICONS.ammonia,
  nitrite: ICONS.nitrite,
  nitrate: ICONS.nitrate,
  phosphate: ICONS.phosphate,
  kh: ICONS.kh,
  gh: ICONS.gh,
  calcium: ICONS.ca,
  magnesium: ICONS.mg,
  salinity: ICONS.salt,
  orp: ICONS.orp,
  conductivity: ICONS.conductivity,
  tds: ICONS.tds,
  oxygen: ICONS.oxygen,
  air_temperature: ICONS.air_temp,
  hot_spot: ICONS.hot_spot,
  cold_spot: ICONS.cold_spot,
  humidity: ICONS.humidity,
  uv_index: ICONS.uv_index,
};
// The default name of each kind of tank, and the icon of its badge (the animal of its scene when there is one).
const KIND_NAME = { reef: "reef", freshwater: "freshwater", terrarium: "terrarium", turtle: "turtle_tank" };
const SCENE_ICONS = {
  reef: "jellyfish",
  sps: "jellyfish",
  soft_coral: "jellyfish",
  nano_reef: "jellyfish",
  jellyfish: "jellyfish",
  abyss: "jellyfish",
  desert: "cactus",
  rainforest: "leaf",
  leopard_gecko: "cactus",
  chameleon: "leaf",
  ball_python: "snake",
  tarantula: "spider",
  insects: "ladybug",
  crested_gecko: "leaf",
  paludarium: "leaf",
  hermit_crab: "shell",
  tortoise: "tortoise",
  turtle: "turtle",
  musk_turtle: "turtle",
};
const badgeIcon = (m) => ICONS[SCENE_ICONS[m.scene] || (m.kind === "terrarium" ? "terrarium" : m.kind === "turtle" ? "turtle" : m.kind === "reef" ? "jellyfish" : "fish")];
const accentStyle = (hass) => `:host { --aq-accent: ${hass?.themes?.darkMode ? "#4fc3f7" : "#0288d1"}; }`;
// Switches the card can turn on and off.
const TOGGLE_DOMAINS = new Set(["switch", "input_boolean", "light", "fan", "valve"]);

class VivariumCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._html = "";
    this._toggled = new Map();
    this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
    // Enter / Space on an element with the button role acts as a click.
    this.shadowRoot.addEventListener("keydown", (ev) => {
      this._byPointer = false;
      if ((ev.key !== "Enter" && ev.key !== " ") || ev.target?.getAttribute?.("role") !== "button") return;
      ev.preventDefault();
      ev.target.click();
    });
    // No rewrite of the card between the press and the release: a rewrite under the pointer can replace the element
    // pressed, so that the click does nothing. The pending render is done once released.
    this.shadowRoot.addEventListener("pointerdown", () => {
      this._byPointer = true;
      this._pressing = true;
      window.addEventListener("pointerup", this._onPressEnd, true);
      window.addEventListener("pointercancel", this._onPressEnd, true);
    });
    this._onPressEnd = () => {
      window.removeEventListener("pointerup", this._onPressEnd, true);
      window.removeEventListener("pointercancel", this._onPressEnd, true);
      setTimeout(() => {
        if (!this._pressing) return;
        this._pressing = false;
        if (this._dirty) {
          this._dirty = false;
          this._update();
        }
      }, 0);
    };
    this._onKey = (ev) => {
      if (ev.key !== "Escape" || !this._confirm) return;
      ev.stopPropagation();
      this._closeConfirm();
    };
  }

  static getConfigElement() {
    return document.createElement("vivarium-card-editor");
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 7;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...config };
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    this._html = "";
    this._lastDeps = null;
    this._update();
  }

  // Home Assistant pushes a new hass on every state change: the card is only redrawn when something it shows changed.
  set hass(hass) {
    this._hass = hass;
    const deps = this._deps();
    const prev = this._lastDeps;
    if (deps && prev && deps.length === prev.length && deps.every((d, i) => d === prev[i])) return;
    this._lastDeps = deps;
    this._update();
  }

  get hass() {
    return this._hass;
  }

  _deps() {
    const h = this._hass;
    if (!h || !this._config) return null;
    const setup = setupOf(h, this._config);
    if (setup.error) return null;
    // The minute: the feeding scene and "fed 2 h ago" move on with time.
    return [h.entities, h.devices, h.areas, h.language, h.locale, h.themes?.darkMode, Math.floor(Date.now() / 60000), ...Object.values(setup.roles).map((id) => h.states[id])];
  }

  connectedCallback() {
    // A click elsewhere on the page folds the sections back to their defaults and closes the popup.
    this._onOutside ??= (ev) => {
      if ((!this._toggled.size && !this._confirm) || !isOutside(this, ev)) return;
      this._toggled = new Map();
      if (this._confirm) this._closeConfirm();
      else this._update();
    };
    (this._onOutsideWatch ??= watchOutside(this, (ev) => this._onOutside(ev))).on();
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === "function") {
      this._resize ??= new ResizeObserver((entries) => {
        const w = Math.round(entries.at(-1).contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._resize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._update?.();
    if (this._confirm) window.addEventListener("keydown", this._onKey);
    clearInterval(this._tick);
    this._tick = setInterval(() => {
      if (this._hass) this.hass = this._hass;
    }, 60000);
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._tick = null;
    this._resize?.disconnect();
    this._resize = null;
    this._fitWidth = null;
    if (this._fitFrame) cancelAnimationFrame(this._fitFrame);
    this._onOutsideWatch?.off();
    this._pressing = false;
    window.removeEventListener("pointerup", this._onPressEnd, true);
    window.removeEventListener("pointercancel", this._onPressEnd, true);
    // Left (another dashboard view, a conditional card hidden): back to the default state, folded, popup closed
    // without running anything.
    this._toggled = new Map();
    this._confirm = null;
    window.removeEventListener("keydown", this._onKey);
  }

  _t(key, vars) {
    return t(this._hass, this._config, key, vars);
  }

  _locale() {
    return intlLocale(this._hass, this._config);
  }

  _s(id) {
    return id ? this._hass.states[id] : undefined;
  }

  // Service call whose failure Home Assistant already reports (toast): handled so that it is not "Uncaught (in promise)".
  _call(domain, service, data) {
    return Promise.resolve(this._hass.callService(domain, service, data)).catch(() => {});
  }

  _update() {
    if (!this._hass || !this._config) return;
    if (this._pressing) {
      this._dirty = true;
      return;
    }
    this._dirty = false;
    let html = this._render();
    if (this._confirm) html = html.replace(/<ha-card([^>]*)>([\s\S]*)<\/ha-card>\s*$/, (_, attrs, inner) => `<ha-card${attrs.replace(/class="/, 'class="dialog-open ')}>${inner}${this._confirmHtml()}</ha-card>`);
    if (html === this._html) return;
    this._html = html;
    morph(this.shadowRoot, html);
    this._fitPill();
    // A new <ha-card> (first render) shows its content once Home Assistant has rendered it (Lit, a microtask
    // later): the pill measured on the empty card is measured again then, before the frame is painted.
    const card = this.shadowRoot.querySelector?.("ha-card");
    if (card && card !== this._fitCard) {
      this._fitCard = card;
      if (card.hasUpdated === false && card.updateComplete?.then) card.updateComplete.then(() => this._fitPill());
    }
    // The popup's safe choice (Cancel) gets the focus: Enter or Space right after the click does not stop anything.
    if (this._confirm) this.shadowRoot.querySelector?.('.modal [data-action="confirm_cancel"]')?.focus({ preventScroll: true });
  }

  // The header's status pill goes right after the title, on its row, only while the whole title and the pill's
  // whole label fit there; otherwise it takes a line of its own under the subtitle (.below, the subtitle on one
  // line). When that does not fit above the substrate strip, the pill keeps its dot alone (.dot-only, its label in
  // its tooltip and for screen readers). Measured after each render and on each new width, in every language.
  _fitPill() {
    if (!this.isConnected) return;
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const row = t.querySelector(":scope > .title-row");
      const chip = row?.querySelector(":scope > .chip");
      if (!chip?.getBoundingClientRect) continue;
      t.classList.remove("below", "dot-only");
      const name = row.querySelector(".name");
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const title = name && getComputedStyle(name).visibility !== "hidden" ? textWidth(name) + gap : 0;
      if (title + chip.getBoundingClientRect().width <= t.getBoundingClientRect().width + 0.5) continue;
      t.classList.add("below");
      const banner = t.closest(".banner");
      const ground = banner?.querySelector(".ground");
      const floor = ground ? ground.getBoundingClientRect().top : banner?.getBoundingClientRect().bottom;
      const box = t.getBoundingClientRect();
      const text = chip.querySelector(".chip-text");
      const whole = (!text || text.scrollWidth <= text.clientWidth + 0.5) && chip.getBoundingClientRect().right <= box.right + 0.5;
      if (whole && (floor === undefined || box.bottom <= floor + 0.5)) continue;
      t.classList.add("dot-only");
    }
  }

  // ----- Model -------------------------------------------------------------

  _model() {
    const setup = setupOf(this._hass, this._config);
    if (setup.error) return setup;
    const { roles } = setup;
    const c = this._config;
    const kind = kindOf(this._hass, c, setup);
    const scene = sceneOf(this._hass, c, setup, kind);
    const th = THEME_ART(scene);
    // In a dry terrarium a temperature probe with no word for air or water is the air's; the heater (a thermostat)
    // reads the air too.
    const src = { ...roles };
    const dry = kind === "terrarium" && !th?.wet && !PROFILES[scene]?.water_temperature;
    if (kind === "terrarium" && !src.air_temperature && src.water_temperature && dry) {
      src.air_temperature = src.water_temperature;
      delete src.water_temperature;
    }
    const mainTemp = kind === "terrarium" ? "air_temperature" : "water_temperature";
    const metrics = {};
    for (const role of KIND_METRICS[kind]) {
      let s = this._s(src[role]);
      // The main temperature: the heater's current temperature when there is no probe.
      if (!s && role === mainTemp) {
        const h = this._s(roles.heater);
        const v = h?.attributes?.current_temperature;
        if (Number.isFinite(v)) s = { entity_id: h.entity_id, state: String(v), attributes: { unit_of_measurement: this._hass.config?.unit_system?.temperature || "°C" } };
      }
      if (!s) continue;
      const unit = s.attributes?.unit_of_measurement || "";
      const v = num(s);
      const range = rangeOf(role, unit, kind, v, c.ranges || {}, scene);
      metrics[role] = { role, entity: s.entity_id, v, unit: range.unit, range, ...levelOf(range, v) };
    }
    const quality = KIND_METRICS[kind].filter((r) => metrics[r]);
    const tips = [];
    for (const r of quality) {
      const m = metrics[r];
      if (!m.side) continue;
      const key = `${r}_${m.side}`;
      tips.push(TIP_KEYS.has(key) ? { cls: m.cls, key } : { cls: m.cls, key: `generic_${m.side}`, vars: { name: this._t(r) } });
    }
    const s = (r) => this._s(roles[r]);
    const now = Date.now();
    if (s("leak")?.state === "on") tips.push({ cls: "crit", key: "leak_tip" });
    if (valid(s("filter")) && !isOn(s("filter"))) tips.push({ cls: "warn", key: "filter_stopped" });
    if (valid(s("return_pump")) && !isOn(s("return_pump"))) tips.push({ cls: "warn", key: "return_stopped" });
    if (levelLow(s("water_level"), c.invert_level) && domainOf(roles.water_level) === "binary_sensor") tips.push({ cls: "warn", key: "level_tip" });
    const res = num(s("reservoir"));
    if (res !== null && s("reservoir").attributes?.unit_of_measurement === "%" && res < 15) tips.push({ cls: "warn", key: "reservoir_low" });
    const svc = serviceMs(s("service"));
    if (svc !== null && svc <= 0) tips.push({ cls: "warn", key: "service_tip" });
    tips.sort((a, b) => RANK[b.cls] - RANK[a.cls]);
    const status = worst([...quality.map((r) => metrics[r].cls).filter((l) => l !== "idle"), ...tips.map((tip) => tip.cls)]);
    const name = c.title || setup.area?.name || (setup.devices.length === 1 ? deviceName(setup.devices[0]) : "") || this._t(KIND_NAME[kind]);
    const feeder = s("feeder");
    const at = fedAt(feeder);
    const feeding = at !== null && now - at >= 0 && now - at < FEEDING_MS;
    return { ...setup, name, kind, scene, mainTemp, metrics, quality, tips, status, feeding, fedAt: at, now };
  }

  // Night in the tank: the option, else the light (off: night, dimmed: moonlight), else Home Assistant's dark theme
  // alone when the tank has no light entity (a light theme keeps the day picture after sunset).
  _lighting(m) {
    const light = this._s(m.roles.light);
    const mode = this._config.illustration_theme;
    if (mode === "night") return { dark: true, moon: true };
    if (mode === "day") return { dark: false, moon: false };
    if (light && valid(light)) {
      if (!isOn(light)) return { dark: true, moon: false };
      return isMoon(light) ? { dark: true, moon: true } : { dark: false, moon: false };
    }
    const dark = !!this._hass.themes?.darkMode;
    return { dark, moon: dark };
  }

  // What the scene draws and animates.
  _scene(m) {
    const r = m.roles;
    const light = this._s(r.light);
    const { dark, moon } = this._lighting(m);
    const rgb = light?.attributes?.rgb_color;
    const color = !dark && isOn(light) && Array.isArray(rgb) && rgb.length === 3 ? `rgb(${rgb.map((x) => clamp(Math.round(x), 0, 255)).join(",")})` : "";
    const filter = this._s(r.filter);
    const ret = this._s(r.return_pump);
    const air = this._s(r.air_pump);
    // The water moves with the filter (else the return pump); with neither, the tank is drawn running.
    const flowing = filter ? isOn(filter) : ret ? isOn(ret) : true;
    const algae = ["nitrate", "phosphate"].some((k) => m.metrics[k] && m.metrics[k].side === "high");
    const toxic = ["ammonia", "nitrite"].some((k) => m.metrics[k]?.cls === "crit");
    const heater = this._s(r.heater);
    // A terrarium's lamps: the entity's state, else lit in daytime.
    const lit = (role) => (r[role] ? isOn(this._s(r[role])) : !dark);
    return {
      kind: m.kind,
      scene: m.scene,
      spot: lit("basking"),
      uvb: lit("uv"),
      mist: r.mister ? isOn(this._s(r.mister)) : null,
      mat: isOn(this._s(r.heat_mat)),
      dark,
      moon,
      color,
      filter: flowing,
      // Bubbles: the air pump when there is one, else the filter's outflow.
      bubbles: air ? isOn(air) : flowing,
      co2: isOn(this._s(r.co2)),
      heat: heater ? heating(heater) : null,
      waves: isOn(this._s(r.wave_pump)),
      feeding: m.feeding,
      still: m.status === "crit",
      murky: toxic ? "crit" : algae ? "algae" : "",
    };
  }

  _banner(m, inner) {
    const st = this._scene(m);
    const th = THEME_ART(st.scene);
    const look = th ? themedStyle(st, th) : null;
    const cls = [
      "banner",
      st.kind === "reef" ? "reef" : "fresh",
      th ? "themed" : "",
      st.mat ? "mat" : "",
      th && th.ink === "light" ? "ink" : "",
      st.dark ? "dark" : "",
      st.dark && st.moon ? "moonlit" : "",
      st.heat ? "heating" : "",
      st.waves ? "waves" : "",
      st.still ? "still" : "",
    ]
      .filter(Boolean)
      .join(" ");
    // The parts drawn are in the key: a part appearing gets new nodes, so that its animation starts at once.
    const key = [st.scene, st.spot, st.uvb, st.mist, st.kind, st.dark, st.moon, st.color, st.filter, st.bubbles, st.co2, st.heat, st.feeding, st.murky].join("|");
    return `<div class="${cls}"${look ? ` style="${look.banner}"` : ""}>
      <div class="tank" data-key="${esc(key)}">${sceneSvg(st)}</div>
      <div class="ground"${look ? ` style="${look.ground}"` : ""}></div>
      ${inner}
    </div>`;
  }

  _statusText(status) {
    return this._t(`status_${status}`);
  }

  _chip(m) {
    const label = this._statusText(m.status);
    return `<span class="chip ${m.status}" title="${esc(label)}" aria-label="${esc(label)}"><span class="dot"></span><span class="chip-text">${esc(label)}</span></span>`;
  }

  // The badge, the name and the subtitle; the status pill on the title's line, right after the title.
  _titleBlock(m, sub, chip = "") {
    return `<div class="badge ${m.status === "idle" ? "" : m.status}">${svgIcon(badgeIcon(m))}</div>
      <div class="titles">
        <div class="title-row">
          <div class="name">${esc(m.name)}</div>
          ${chip}
        </div>
        ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
      </div>`;
  }

  _header(m, sub) {
    if (this._config.illustration === false)
      return `<div class="header${this._zoomButton() ? " zoomable" : ""}">${this._titleBlock(m, sub, this._chip(m))}${this._zoomButton("plain")}</div>`;
    const zoom = this._zoomButton();
    return this._banner(m, `<div class="head">${this._titleBlock(m, sub, this._chip(m))}</div>${zoom ? `<div class="corner">${zoom}</div>` : ""}`);
  }

  _zoomButton() {
    return "";
  }

  _errorCard(m) {
    const text = m.error === "unknown_device" ? `${this._t(m.error)}: ${m.detail}` : m.error === "unknown_area" ? `${this._t(m.error)}: ${this._config.area}` : this._t(m.error);
    return `<style>${BASE_STYLE}</style><ha-card><div class="warning">${esc(text)}</div></ha-card>`;
  }

  _value(metric) {
    const unit = metric.role === "ph" || metric.role === "uv_index" || metric.unit === "SG" ? "" : metric.unit;
    return { v: fmtNum(metric.v, metric.range.digits, this._locale()), unit };
  }

  _lightText(m) {
    const light = this._s(m.roles.light);
    if (!light) return "";
    if (!valid(light)) return this._t("unavailable");
    if (!isOn(light)) return this._t("lights_off");
    const b = brightnessPct(light);
    const key = isMoon(light) ? "moonlight" : "daylight";
    return b === null ? this._t(key) : `${this._t(key)} · ${b} %`;
  }

  _subtitle(m) {
    const parts = [];
    const vol = parseFloat(this._config.volume);
    if (Number.isFinite(vol) && vol > 0) parts.push(fmtUnit(vol, "liter", this._locale()));
    const w = m.metrics[m.mainTemp];
    if (w && w.v !== null) parts.push(`${this._value(w).v} ${w.unit}`);
    const h = m.metrics.humidity;
    if (m.kind === "terrarium" && h && h.v !== null) parts.push(`${this._value(h).v} %`);
    const light = this._lightText(m);
    if (light) parts.push(light);
    if (!parts.length) parts.push(this._t(KIND_NAME[m.kind]));
    return parts.join(" · ");
  }

  // ----- Equipment tiles ---------------------------------------------------

  // One tile per piece of equipment: { role, entity, icon, label, text, cls }.
  _tiles(m) {
    const r = m.roles;
    const loc = this._locale();
    const out = [];
    const add = (role, icon, text, cls, entity = r[role]) => out.push({ role, entity, icon, label: this._t(role), text, cls });
    const s = (role) => this._s(r[role]);
    const onOff = (role, icon, onCls = "flow", offCls = "idle") => {
      const x = s(role);
      if (!x) return;
      if (!valid(x)) return add(role, icon, this._t("unavailable"), "idle");
      const on = isOn(x);
      add(role, icon, this._t(on ? "on" : "off"), on ? onCls : offCls);
    };
    // Temperature, with the heater's state and target under it.
    const w = m.metrics[m.mainTemp];
    const heater = s("heater");
    if (w) {
      const { v, unit } = this._value(w);
      const target = targetOf(heater);
      let text = this._t("in_range");
      let cls = w.cls === "ok" ? "ok" : w.cls;
      if (w.side) text = this._t(w.side === "high" ? "too_high" : "too_low");
      else if (heater && heating(heater)) {
        text = this._t("heating");
        cls = "heat";
      } else if (target !== null) text = this._t("target", { t: `${fmtNum(target, 1, loc)} ${w.unit}` });
      out.push({ role: m.mainTemp, entity: w.entity, icon: m.mainTemp === "air_temperature" ? ICONS.air_temp : ICONS.water_temp, label: `${v} ${unit}`, text, cls: w.v === null ? "idle" : cls });
    }
    if (heater && !(w && w.entity === heater.entity_id)) {
      if (!valid(heater)) add("heater", ICONS.heater, this._t("unavailable"), "idle");
      else if (heating(heater)) add("heater", ICONS.heater, this._t("heating"), "heat");
      else add("heater", ICONS.heater, heater.state === "off" ? this._t("off") : this._t("idle"), heater.state === "off" ? "idle" : "ok");
    }
    const light = s("light");
    if (light) {
      const on = isOn(light);
      add("light", on ? ICONS.light_on : ICONS.light, this._lightText(m), !valid(light) ? "idle" : !on ? "idle" : isMoon(light) ? "moon" : "heat");
    }
    const filter = s("filter");
    if (filter) {
      if (!valid(filter)) add("filter", ICONS.filter, this._t("unavailable"), "idle");
      else {
        const on = isOn(filter);
        const speed = s("filter_speed");
        const sp = on && valid(speed) ? ` · ${fmtState(speed, loc)}` : "";
        add("filter", on ? ICONS.filter : ICONS.filter_off, `${this._t(on ? "running" : "stopped")}${sp}`, on ? "flow" : "warn");
      }
    } else if (s("filter_speed")) add("filter_speed", ICONS.speed, fmtState(s("filter_speed"), loc), "flow");
    onOff("wave_pump", ICONS.wave);
    const ret = s("return_pump");
    if (ret) add("return_pump", ICONS.return_pump, !valid(ret) ? this._t("unavailable") : this._t(isOn(ret) ? "running" : "stopped"), !valid(ret) ? "idle" : isOn(ret) ? "flow" : "warn");
    onOff("skimmer", ICONS.skimmer);
    onOff("co2", ICONS.co2, "ok");
    onOff("air_pump", ICONS.air);
    // A terrarium's or a turtle tank's UV is its UVB lamp, not a sterilizer.
    const uv = s("uv");
    if (uv && WATER_KINDS.has(m.kind) && m.kind !== "turtle") onOff("uv", ICONS.uv, "moon");
    else if (uv) out.push({ role: "uv", entity: r.uv, icon: ICONS.uv_index, label: this._t("uvb"), text: this._t(!valid(uv) ? "unavailable" : isOn(uv) ? "on" : "off"), cls: !valid(uv) || !isOn(uv) ? "idle" : "heat" });
    onOff("basking", ICONS.basking, "heat");
    onOff("heat_mat", ICONS.heat_mat, "heat");
    onOff("mister", ICONS.mister);
    const feeder = s("feeder");
    if (feeder) {
      let text;
      if (!valid(feeder) && domainOf(feeder.entity_id) !== "button") text = this._t("unavailable");
      else if (m.feeding) text = this._t("feeding");
      else if (m.fedAt !== null) text = this._t("fed_ago", { time: fmtDuration(m.now - m.fedAt, loc) });
      else text = this._t("ready");
      add("feeder", ICONS.feeder, text, m.feeding ? "heat" : "ok");
    }
    // Top-off: the pump's state, with the reservoir's level when there is one.
    const ato = s("ato");
    const res = s("reservoir");
    if (ato || res) {
      const parts = [];
      let cls = "flow";
      if (ato) parts.push(!valid(ato) ? this._t("unavailable") : this._t(isOn(ato) ? "topping_off" : "standby"));
      if (res && valid(res)) {
        parts.push(`${this._t("reservoir")} ${fmtState(res, loc)}`);
        const v = num(res);
        if (v !== null && res.attributes?.unit_of_measurement === "%" && v < 15) cls = "warn";
      }
      if (ato && !isOn(ato) && cls !== "warn") cls = "idle";
      out.push({ role: "ato", entity: r.ato || r.reservoir, icon: ICONS.ato, label: this._t("ato"), text: parts.join(" · "), cls });
    }
    const level = s("water_level");
    if (level) {
      if (domainOf(level.entity_id) === "binary_sensor") {
        const low = levelLow(level, this._config.invert_level);
        add("water_level", ICONS.level, !valid(level) ? this._t("unavailable") : this._t(low ? "level_low" : "level_ok"), !valid(level) ? "idle" : low ? "warn" : "ok");
      } else add("water_level", ICONS.level, fmtState(level, loc), "flow");
    }
    const leak = s("leak");
    if (leak) add("leak", ICONS.leak, !valid(leak) ? this._t("unavailable") : this._t(leak.state === "on" ? "leak_detected" : "dry"), !valid(leak) ? "idle" : leak.state === "on" ? "crit" : "ok");
    const dosing = s("dosing");
    if (dosing) {
      const d = domainOf(dosing.entity_id);
      const text = TOGGLE_DOMAINS.has(d) ? this._t(isOn(dosing) ? "on" : "off") : fmtState(dosing, loc);
      add("dosing", ICONS.dosing, text, valid(dosing) ? "ok" : "idle");
    }
    const service = s("service");
    if (service) {
      const ms = serviceMs(service);
      const text = ms === null ? fmtState(service, loc) : ms <= 0 ? this._t("service_due") : this._t("service_in", { time: fmtDuration(ms, loc) });
      add("service", ICONS.service, text, ms !== null && ms <= 0 ? "warn" : ms !== null && ms < 3 * 864e5 ? "heat" : "ok");
    }
    const power = s("power");
    if (power) add("power", ICONS.power, fmtState(power, loc), valid(power) ? "heat" : "idle");
    return out;
  }

  _tileHtml(tile) {
    return `<div class="tile ${tile.cls}" role="button" tabindex="0" data-entity="${esc(tile.entity)}" title="${esc(`${tile.label} · ${tile.text}`)}">
        <div class="pi">${svgIcon(tile.icon)}</div>
        <div class="tx"><span class="tn">${esc(tile.label)}</span><span class="ts">${esc(tile.text)}</span></div>
        <span class="tb"></span>
      </div>`;
  }

  // Buttons: feed, light, filter, CO2, air pump (those that can be switched).
  _controls(m, round = false) {
    if (this._config.show_controls === false) return "";
    const r = m.roles;
    const list = [];
    const btn = (action, role, icon, label, on) => {
      const s = this._s(r[role]);
      const off = !s || (!valid(s) && domainOf(s.entity_id) !== "button");
      return `<button class="btn${round ? " round" : ""}${on ? " on" : ""}" data-action="${action}" data-entity="${esc(r[role])}" title="${esc(label)}" aria-label="${esc(label)}"${action === "feed" ? "" : ` aria-pressed="${on ? "true" : "false"}"`}${off ? " disabled" : ""}>${svgIcon(icon)}${round ? "" : `<span>${esc(label)}</span>`}</button>`;
    };
    const can = (role) => r[role] && (TOGGLE_DOMAINS.has(domainOf(r[role])) || (role === "feeder" && ["button", "script"].includes(domainOf(r[role]))));
    if (can("feeder")) list.push(btn("feed", "feeder", ICONS.feeder, this._t("feed"), m.feeding));
    if (can("light")) list.push(btn("toggle", "light", isOn(this._s(r.light)) ? ICONS.light_on : ICONS.light, this._t("light"), isOn(this._s(r.light))));
    if (round) return list.join("");
    if (can("filter")) list.push(btn("filter", "filter", ICONS.filter, this._t("filter"), isOn(this._s(r.filter))));
    if (can("co2")) list.push(btn("toggle", "co2", ICONS.co2, this._t("co2"), isOn(this._s(r.co2))));
    if (can("air_pump")) list.push(btn("toggle", "air_pump", ICONS.air, this._t("air_pump"), isOn(this._s(r.air_pump))));
    if (can("basking")) list.push(btn("toggle", "basking", ICONS.basking, this._t("basking"), isOn(this._s(r.basking))));
    if (can("uv") && !(WATER_KINDS.has(m.kind) && m.kind !== "turtle")) list.push(btn("toggle", "uv", ICONS.uv_index, this._t("uvb"), isOn(this._s(r.uv))));
    if (can("mister")) list.push(btn("toggle", "mister", ICONS.mister, this._t("mister"), isOn(this._s(r.mister))));
    return list.join("");
  }

  _isCollapsed(key) {
    if (this._toggled.has(key)) return this._toggled.get(key);
    const def = Array.isArray(this._config.collapsed) ? this._config.collapsed : DEFAULT_COLLAPSED;
    return def.includes(key);
  }

  _section(key, icon, title, body, extra = "") {
    const collapsed = this._isCollapsed(key);
    return `<div class="section">
        <div class="section-title" role="button" tabindex="0" data-action="toggle_section" data-section="${key}" aria-expanded="${collapsed ? "false" : "true"}">${svgIcon(icon)}<span>${esc(title)}</span>${extra}${svgIcon(ICONS.chevron, "chevron")}</div>
        ${collapsed ? "" : body}
      </div>`;
  }

  _gauge(metric) {
    const [min, max] = scaleOf(metric.range, metric.v);
    const { v, unit } = this._value(metric);
    const loc = this._locale();
    const d = metric.range.digits;
    const [lo, hi] = metric.range.ideal;
    const u = unit ? ` ${unit}` : "";
    const ideal = lo === 0 ? this._t("max", { v: `${fmtNum(hi, d, loc)}${u}` }) : this._t("ideal", { range: `${fmtNum(lo, d, loc)}–${fmtNum(hi, d, loc)}${u}` });
    const pos = metric.v === null ? null : clamp(((metric.v - min) / (max - min || 1)) * 100, 0, 100);
    const label = this._t(metric.role);
    return `<div class="gauge clickable ${metric.cls}" role="button" tabindex="0" data-entity="${esc(metric.entity)}" aria-label="${esc(`${label} ${v}${u}, ${ideal}`)}">
        <div class="g-head">${svgIcon(METRIC_ICONS[metric.role])}<span class="g-label">${esc(label)}</span><span class="g-value">${esc(v)}${unit ? `<small>${esc(unit)}</small>` : ""}</span></div>
        <div class="g-track" style="background:${trackOf(metric.range, [min, max])}">${pos === null ? "" : `<div class="g-mark" style="left:${pos.toFixed(2)}%"></div>`}</div>
        <div class="g-range">${esc(ideal)}</div>
      </div>`;
  }

  _tipText(tip) {
    return this._t(tip.key, tip.vars);
  }

  _advice(m) {
    const items = m.tips.length
      ? m.tips.map((tip) => `<div class="tip ${tip.cls}">${svgIcon(tip.cls === "crit" ? ICONS.alert : ICONS.info)}<span>${esc(this._tipText(tip))}</span></div>`)
      : [`<div class="tip ok">${svgIcon(ICONS.check)}<span>${esc(this._t(m.kind === "terrarium" ? "all_good_terra" : "all_good"))}</span></div>`];
    const count = m.tips.length ? `<span class="count ${worst(m.tips.map((tip) => tip.cls))}">${m.tips.length}</span>` : "";
    return this._section("advice", ICONS.advice, this._t("advice"), `<div class="advice">${items.join("")}</div>`, count);
  }

  _render() {
    const m = this._model();
    if (m.error) return this._errorCard(m);
    this._m = m;
    const c = this._config;
    const parts = [];
    const tiles = c.show_equipment === false ? [] : this._tiles(m);
    if (tiles.length) parts.push(`<div class="tiles">${tiles.map((x) => this._tileHtml(x)).join("")}</div>`);
    // The temperature is a tile: the gauges are the other measures (and the temperature when tiles are hidden).
    const gauges = m.quality.filter((r) => r !== m.mainTemp || !tiles.length);
    // A section of water measures, else of the air's (a terrarium, or a turtle tank that only measures its spot).
    const watery = gauges.some((r) => AQUA_METRICS.includes(r));
    if (c.show_quality !== false && gauges.length) {
      parts.push(this._section("quality", watery ? ICONS.flask : ICONS.air_temp, this._t(watery ? "water_quality" : "climate"), `<div class="gauges">${gauges.map((r) => this._gauge(m.metrics[r])).join("")}</div>`));
    }
    if (c.show_advice !== false) parts.push(this._advice(m));
    const controls = this._controls(m);
    if (controls) parts.push(`<div class="controls">${controls}</div>`);
    return `<style>${BASE_STYLE}${FULL_STYLE}${accentStyle(this._hass)}</style>
      <ha-card class="full">
        ${this._header(m, this._subtitle(m))}
        <div class="content">${parts.join("")}</div>
      </ha-card>`;
  }

  // ----- Actions -----------------------------------------------------------

  _onClick(ev) {
    this._pressing = false;
    if (ev.detail === 0) this._byPointer = false;
    const path = ev.composedPath();
    const el = path.find((n) => n?.dataset && (n.dataset.action || n.dataset.entity));
    if (this._confirm) {
      const action = el?.dataset?.action;
      if (action === "confirm_ok") {
        const run = this._confirm.run;
        this._closeConfirm();
        run();
      } else if (action === "confirm_cancel" || (action === "confirm_backdrop" && path[0] === el)) this._closeConfirm();
      return;
    }
    if (!el) return;
    if (this._confirmClosedAt && Date.now() - this._confirmClosedAt < CONFIRM_GUARD_MS) return;
    ev.stopPropagation();
    const { action, entity } = el.dataset;
    const s = this._s(entity);
    if (action === "zoom") return this._toggleZoom(ev);
    if (action === "toggle_section") {
      const key = el.dataset.section;
      this._toggled = new Map(this._toggled).set(key, !this._isCollapsed(key));
      return this._update();
    }
    if (action === "feed") {
      const d = domainOf(entity);
      if (d === "button") return this._call("button", "press", { entity_id: entity });
      if (d === "script") return this._call("script", "turn_on", { entity_id: entity });
      return this._call(d === "light" ? "light" : d, "turn_on", { entity_id: entity });
    }
    if (action && !valid(s)) return;
    if (action === "toggle") {
      const d = domainOf(entity);
      if (d === "valve") return this._call("valve", isOn(s) ? "close_valve" : "open_valve", { entity_id: entity });
      return this._call(d, isOn(s) ? "turn_off" : "turn_on", { entity_id: entity });
    }
    if (action === "filter") {
      const d = domainOf(entity);
      if (!isOn(s)) return this._call(d, "turn_on", { entity_id: entity });
      // Stopping the filter asks first: the fish need its flow and oxygen.
      return this._openConfirm({ text: this._t("confirm_filter_off"), ok: this._t("stop"), run: () => this._call(d, "turn_off", { entity_id: entity }) });
    }
    if (entity) this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  _openConfirm(confirm) {
    this._confirm = confirm;
    window.addEventListener("keydown", this._onKey);
    this._update();
  }

  _closeConfirm() {
    this._confirm = null;
    this._confirmClosedAt = Date.now();
    window.removeEventListener("keydown", this._onKey);
    this._update();
  }

  _confirmHtml() {
    const c = this._confirm;
    return `<div class="backdrop" data-action="confirm_backdrop"><div class="modal" role="alertdialog" aria-modal="true" aria-label="${esc(c.text)}">
        <div class="msg">${esc(c.text)}</div>
        <div class="modal-actions"><button class="btn" data-action="confirm_cancel"><span>${esc(this._t("cancel"))}</span></button><button class="btn on" data-action="confirm_ok"><span>${esc(c.ok)}</span></button></div>
      </div></div>`;
  }

  _toggleZoom() {}
}

// The mini card is the full card drawn compact: its detail button (top right, `zoom: false` removes it) switches it
// to the full card's content and back, and a click anywhere else on the page brings the compact view back.
class VivariumMiniCard extends VivariumCard {
  constructor() {
    super();
    this._onUnzoom = (ev) => {
      if (this._zoomed && isOutside(this, ev)) this._setZoom(false);
    };
  }

  static getConfigElement() {
    return document.createElement("vivarium-mini-card-editor");
  }

  connectedCallback() {
    super.connectedCallback();
    (this._onUnzoomWatch ??= watchOutside(this, (ev) => this._onUnzoom(ev))).on();
    this._update?.();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._onUnzoomWatch?.off();
    this._zoomed = false;
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 3;
  }

  getGridOptions() {
    return { ...(this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 }), rows: "auto" };
  }

  _zoomButton(extra = "") {
    if (this._config.zoom === false) return "";
    const label = esc(this._t(this._zoomed ? "zoom_out" : "zoom_in"));
    return `<button class="zoom${extra ? ` ${extra}` : ""}" data-action="zoom" title="${label}" aria-label="${label}" aria-expanded="${this._zoomed ? "true" : "false"}">${svgIcon(this._zoomed ? ICONS.collapse : ICONS.expand)}</button>`;
  }

  _setZoom(on) {
    this._zoomed = on;
    this._update();
    this.dispatchEvent(new CustomEvent("iron-resize", { bubbles: true, composed: true }));
  }

  _toggleZoom(ev) {
    this._setZoom(!this._zoomed);
    if (ev?.detail === 0) this.shadowRoot.querySelector?.(".zoom")?.focus({ preventScroll: true });
  }

  _render() {
    if (this._zoomed) return super._render();
    const m = this._model();
    if (m.error) return this._errorCard(m);
    this._m = m;
    const loc = this._locale();
    const pills = m.quality
      .slice(0, 4)
      .map((r) => {
        const x = m.metrics[r];
        const { v, unit } = this._value(x);
        const k = r === m.mainTemp ? "" : `<span class="k">${esc(SHORT[r])}</span>`;
        return `<span class="pill clickable ${x.cls}" role="button" tabindex="0" data-entity="${esc(x.entity)}" title="${esc(this._t(r))}"><span class="dot"></span>${k}<span class="v">${esc(v)}${unit ? ` ${esc(unit)}` : ""}</span></span>`;
      })
      .join("");
    const lines = [];
    const filter = this._s(m.roles.filter);
    if (filter) {
      const on = isOn(filter);
      lines.push(`<div class="line ${on ? "flow" : "warn"}">${svgIcon(on ? ICONS.filter : ICONS.filter_off)}<span>${esc(`${this._t("filter")} · ${this._t(!valid(filter) ? "unavailable" : on ? "running" : "stopped")}`)}</span></div>`);
    }
    if (m.roles.feeder && (m.feeding || m.fedAt !== null)) {
      const text = m.feeding ? this._t("feeding") : this._t("fed_ago", { time: fmtDuration(m.now - m.fedAt, loc) });
      lines.push(`<div class="line ${m.feeding ? "heat" : "ok"}">${svgIcon(ICONS.feeder)}<span>${esc(text)}</span></div>`);
    }
    const tip = m.tips[0];
    if (tip) lines.push(`<div class="line tip-line ${tip.cls}">${svgIcon(tip.cls === "crit" ? ICONS.alert : ICONS.info)}<span>${esc(this._tipText(tip))}</span></div>`);
    const controls = this._controls(m, true);
    return `<style>${BASE_STYLE}${MINI_STYLE}${accentStyle(this._hass)}</style>
      <ha-card class="mini">
        ${this._header(m, this._subtitle(m))}
        <div class="content">
          <div class="info">
            ${pills ? `<div class="pills">${pills}</div>` : ""}
            ${lines.join("")}
          </div>
          ${controls ? `<div class="controls">${controls}</div>` : ""}
        </div>
      </ha-card>`;
  }
}

// ---------------------------------------------------------------------------
// Visual editors (ha-form)
// ---------------------------------------------------------------------------

const ENTITY_DOMAINS = {
  water_temperature: ["sensor"],
  ph: ["sensor"],
  ammonia: ["sensor"],
  nitrite: ["sensor"],
  nitrate: ["sensor"],
  phosphate: ["sensor"],
  kh: ["sensor"],
  gh: ["sensor"],
  calcium: ["sensor"],
  magnesium: ["sensor"],
  salinity: ["sensor"],
  orp: ["sensor"],
  conductivity: ["sensor"],
  tds: ["sensor"],
  oxygen: ["sensor"],
  air_temperature: ["sensor"],
  hot_spot: ["sensor"],
  cold_spot: ["sensor"],
  humidity: ["sensor"],
  uv_index: ["sensor"],
  light: ["light", "switch", "input_boolean"],
  heater: ["climate", "water_heater", "switch", "input_boolean"],
  filter: ["switch", "fan", "input_boolean"],
  filter_speed: ["sensor", "number"],
  wave_pump: ["switch", "fan", "input_boolean"],
  return_pump: ["switch", "fan", "input_boolean"],
  skimmer: ["switch", "input_boolean"],
  co2: ["switch", "valve", "input_boolean"],
  air_pump: ["switch", "fan", "input_boolean"],
  uv: ["switch", "light", "input_boolean"],
  basking: ["switch", "light", "input_boolean"],
  heat_mat: ["switch", "climate", "input_boolean"],
  mister: ["switch", "fan", "valve", "input_boolean"],
  feeder: ["button", "script", "switch", "input_boolean", "sensor"],
  ato: ["switch", "binary_sensor", "input_boolean"],
  reservoir: ["sensor"],
  water_level: ["binary_sensor", "sensor"],
  leak: ["binary_sensor"],
  dosing: ["sensor", "switch"],
  service: ["sensor"],
  power: ["sensor"],
};

class VivariumEditorBase extends HTMLElement {
  static get toggles() {
    return [];
  }

  static extraFields() {
    return [];
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _schema() {
    const tr = (k) => t(this._hass, this._config, k);
    return [
      { name: "area", selector: { area: {} } },
      { name: "device", selector: { device: {} } },
      { name: "title", selector: { text: {} } },
      { type: "grid", name: "", schema: [
        { name: "kind", selector: { select: { mode: "dropdown", options: ["auto", ...KINDS].map((v) => ({ value: v, label: tr(`kind_${v}`) })) } } },
        { name: "volume", selector: { number: { min: 0, step: 1, mode: "box", unit_of_measurement: "L" } } },
      ] },
      {
        type: "expandable",
        name: "",
        flatten: true,
        title: tr("entities"),
        icon: "mdi:format-list-bulleted",
        schema: ROLES.map((name) => ({ name, selector: { entity: { domain: ENTITY_DOMAINS[name] } } })),
      },
      ...this.constructor.extraFields(tr),
      { type: "grid", name: "", schema: this.constructor.toggles.map(([name]) => ({ name, selector: { boolean: {} } })) },
      {
        name: "scene",
        selector: { select: { mode: "dropdown", options: ["auto", ...Object.keys(SCENES)].map((v) => ({ value: v, label: tr(`scene_${v}`) })) } },
      },
      {
        name: "illustration_theme",
        selector: { select: { mode: "dropdown", options: ["auto", "day", "night"].map((v) => ({ value: v, label: tr(`theme_${v}`) })) } },
      },
      {
        name: "language",
        selector: { select: { mode: "dropdown", options: [{ value: "", label: tr("lang_auto") }, ...LANGUAGES.map(([value, label]) => ({ value, label }))] } },
      },
    ];
  }

  _label(name) {
    const m = /^(.*)_(min|max)$/.exec(name);
    if (m && METRIC_ROLES.includes(m[1])) return `${t(this._hass, this._config, m[1])} · ${t(this._hass, this._config, `${m[2]}_l`)}`;
    return t(this._hass, this._config, name === "language" ? "language" : name);
  }

  _helper(name) {
    if (["area", "device", "zoom", "invert_level"].includes(name)) return t(this._hass, this._config, `${name}_helper`);
    return undefined;
  }

  // A change in the form: the YAML is kept minimal, empty values and options left at their default dropped.
  _changed(ev) {
    ev.stopPropagation();
    const config = { ...ev.detail.value };
    const defaults = { ...Object.fromEntries(this.constructor.toggles), kind: "auto", scene: "auto", illustration_theme: "auto", collapsed: DEFAULT_COLLAPSED };
    for (let [k, v] of Object.entries(config)) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        v = config[k] = { ...v };
        for (const [sk, sv] of Object.entries(v)) if (sv === "" || sv === undefined || sv === null) delete v[sk];
        if (!Object.keys(v).length) delete config[k];
      } else if (v === "" || v === undefined || v === null || (k in defaults && JSON.stringify(v) === JSON.stringify(defaults[k]))) delete config[k];
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._hass || !this._config) return;
    const toggles = this.constructor.toggles;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => this._label(s.name);
      this._form.computeHelper = (s) => this._helper(s.name);
      this._form.addEventListener("value-changed", (ev) => this._changed(ev));
      this.appendChild(this._form);
    }
    const data = { kind: "auto", scene: "auto", illustration_theme: "auto", collapsed: DEFAULT_COLLAPSED, ...this._config };
    for (const f of this.constructor.extraFields(() => "")) if (f.type === "expandable" && f.name) data[f.name] = { ...data[f.name] };
    for (const [name, def] of toggles) if (data[name] === undefined) data[name] = def;
    this._form.hass = this._hass;
    if (this._dataFor !== this._config) {
      this._dataFor = this._config;
      this._form.data = data;
    }
    const l = lang(this._hass, this._config);
    if (this._schemaLang !== l) {
      this._schemaLang = l;
      this._form.schema = this._schema();
    }
  }
}

class VivariumCardEditor extends VivariumEditorBase {
  static get toggles() {
    return [
      ["show_title", true],
      ["show_subtitle", true],
      ["illustration", true],
      ["show_equipment", true],
      ["show_quality", true],
      ["show_advice", true],
      ["show_controls", true],
      ["invert_level", false],
    ];
  }

  static extraFields(tr) {
    return [
      {
        name: "collapsed",
        selector: { select: { multiple: true, mode: "list", options: SECTIONS.map((value) => ({ value, label: tr(value === "quality" ? "water_quality" : value) })) } },
      },
      {
        type: "expandable",
        name: "ranges",
        title: tr("ranges"),
        icon: "mdi:tune-vertical",
        schema: METRIC_ROLES.flatMap((r) => ["min", "max"].map((b) => ({ name: `${r}_${b}`, selector: { number: { mode: "box", step: "any" } } }))),
      },
    ];
  }
}

// The detailed view of the mini card draws the full card: its editor offers the full card's options too, and the
// detail button.
class VivariumMiniCardEditor extends VivariumCardEditor {
  static get toggles() {
    return [...VivariumCardEditor.toggles, ["zoom", true]];
  }
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

const define = (name, cls) => {
  if (!customElements.get(name)) customElements.define(name, cls);
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
