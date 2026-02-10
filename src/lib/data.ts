import fs from "fs";
import path from "path";

export function getRaceData() {
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
      race: {
        name: "string",
        circuit: "string",
        date: "Date",
        time: "",
        sessions: {
          fp1: { date: "", time: "" },
          fp2: { date: "", time: "" },
          fp3: { date: "", time: "" },
          qualifying: { date: "", time: "" },
          race: { date: "", time: "" },
        },
      },
    };
  }
}
