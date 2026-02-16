import { getRaceData } from "@/lib/data";
import { permanentRedirect } from "next/navigation";

export default async function Home() {
  // Quick way to reformat date to an iso string
  const raceData = await getRaceData();
  const roundNum = raceData.race.sessions.race.round;
  // Redirecting to the round number!
  return permanentRedirect(`/race/${roundNum}`);
}
