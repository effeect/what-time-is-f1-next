import fs from "fs";
import path from "path";
import { CIRCUIT_TRACK_MAPS } from "@/data/circuitTrackMaps";

export interface TrackMapCredit {
  title: string;
  sourceUrl: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
}

// Returns the local track-map asset path for a circuitId, or null if the
// circuit isn't in the mapping table. Doesn't check that the file was
// actually downloaded — the <img onError> fallback in the UI handles that.
export function trackMapPath(circuitId?: string): string | null {
  if (!circuitId || !CIRCUIT_TRACK_MAPS[circuitId]) return null;
  return `/track-maps/${circuitId}.svg`;
}

export function getTrackMapCredits(): Record<string, TrackMapCredit> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "track_map_credits.json",
    );
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData).credits ?? {};
  } catch {
    return {};
  }
}
