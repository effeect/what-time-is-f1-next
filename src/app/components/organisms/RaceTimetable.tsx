import { RaceData } from "@/types/session_detail";
import { sortSessions } from "@/lib/sessionSort";
import TimeDisplay from "../atoms/Time/TimeDisplay";
import RaceHeader from "../atoms/Header/Header";
import { Session } from "inspector/promises";
import SessionRow from "../atoms/SessionRow/SessionRow";
import Link from "next/link";
interface RaceTimetableProps {
  RaceData: RaceData;
}

export default function RaceTimetable({ RaceData }: RaceTimetableProps) {
  const raceData = RaceData;
  const sessionData = RaceData.race.sessions.race;
  const sessions = sortSessions(RaceData);
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="container my-2">
      {/* Header Section, note that all the varaibles are string based */}
      {/* Could be a bit tidier but this works for the moment */}
      {!raceData.race.isNextRace ? (
        <Link href="/" className="buttons is-link mb-4 is-centered">
          ← Back to Next Race Schedule
        </Link>
      ) : null}

      <RaceHeader
        RaceName={
          raceData.race.isNextRace
            ? "Next race is " + (raceData.race.name || "Unknown Race")
            : "Race Timetable for the " + (raceData.race.name || "Unknown Race")
        }
        CircuitName={raceData.race.circuit || "Unknown Circuit"}
        Date={formatDate(sessionData.date) || "Unknown Date"}
      />
      <hr />
      <div className="columns is-multiline">
        {sessions.map((session) => (
          <div key={session.id} className="column is-full">
            <SessionRow session={session} />
          </div>
        ))}
      </div>
    </div>
  );
}
