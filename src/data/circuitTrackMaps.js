// Maps Ergast/Jolpica circuitIds to a Wikimedia Commons file title containing
// a circuit layout diagram (SVG). Resolved to an actual file URL + attribution
// at generation time by src/api/get-track-maps.js — see that script for how
// this table is consumed.
//
// Add an entry here whenever a new circuit joins the calendar; the next
// scheduled run of get-track-maps.js will pick it up automatically.

/** @type {Record<string, { commonsFile: string }>} */
module.exports.CIRCUIT_TRACK_MAPS = {
  albert_park: { commonsFile: "File:2023 F1 CourseLayout Australia.svg" },
  shanghai: { commonsFile: "File:Circuit Shanghai.svg" },
  suzuka: { commonsFile: "File:2022 F1 CourseLayout Japan.svg" },
  miami: { commonsFile: "File:2022 F1 CourseLayout Miami.svg" },
  villeneuve: { commonsFile: "File:2022 F1 CourseLayout Canada.svg" },
  monaco: { commonsFile: "File:2022 F1 CourseLayout Monaco.svg" },
  catalunya: { commonsFile: "File:2023 F1 CourseLayout Spain.svg" },
  red_bull_ring: { commonsFile: "File:2022 F1 CourseLayout Austria.svg" },
  silverstone: { commonsFile: "File:2022 F1 CourseLayout Britain.svg" },
  spa: { commonsFile: "File:2022 F1 CourseLayout Belgium.svg" },
  hungaroring: { commonsFile: "File:2022 F1 CourseLayout Hungary.svg" },
  zandvoort: { commonsFile: "File:2022 F1 CourseLayout Netherlands.svg" },
  monza: { commonsFile: "File:2022 F1 CourseLayout Italia.svg" },
  madring: { commonsFile: "File:Madring (2026).svg" },
  baku: { commonsFile: "File:2023 F1 CourseLayout Azerbaijan.svg" },
  sepang: { commonsFile: "File:Circuit Sepang.svg" },
  marina_bay: { commonsFile: "File:2022 F1 CourseLayout Singapore.svg" },
  americas: { commonsFile: "File:2022 F1 CourseLayout COTA.svg" },
  rodriguez: { commonsFile: "File:Autódromo Hermanos Rodríguez.svg" },
  interlagos: { commonsFile: "File:2022 F1 CourseLayout São Paulo.svg" },
  vegas: { commonsFile: "File:2023 Las Vegas street circuit.svg" },
  losail: { commonsFile: "File:2023 F1 CourseLayout Qatar.svg" },
  yas_marina: { commonsFile: "File:2022 F1 CourseLayout Abu Dhabi.svg" },
};
