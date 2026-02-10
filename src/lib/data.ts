import fs from "fs";
import path from "path";

import { RaceData } from "@/types/session_detail";

export function getRaceData(): RaceData {
  try {
    if (typeof window === "undefined") {
      const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        "schedule.json",
      );
      const jsonData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(jsonData);
    }

    throw new Error("Client-side: use props");
  } catch (error) {
    // Fallback data if file doesn't exist
    return {
      lastUpdated: new Date().toISOString(),
      raceName: "Loading...",
      circuitName: "Loading...",
      country: "",
      location: "",
      raceDate: "",
      raceTime: "",
      sessions: {
        qualifying: { date: "", time: "" },
        race: { date: "", time: "" },
      },
      round: 0,
    };
  }
}
