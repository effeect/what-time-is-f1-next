import { RaceData } from "@/types/session_detail";
import { sortSessions } from "@/lib/sessionSort";
import TimeDisplay from "./atoms/Time/TimeDisplay";

interface RaceTimetableProps {
  RaceData: RaceData;
}

interface Session {
  id: string;
  key: string;
  name: string;
  sessionType: string;
  date: string;
  time: string;
  isRace?: boolean;
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

  const formatTime = (timeString: string) => {
    // Remove trailing Z if present and format
    const time = timeString.endsWith("Z")
      ? timeString.substring(0, 5)
      : timeString.substring(0, 5);

    // Convert to local time if needed
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatTimeUTC = (timeString: string) => {
    // Remove trailing Z if present and format
    const time = timeString.endsWith("Z")
      ? timeString.substring(0, 5)
      : timeString.substring(0, 5);

    // Convert to local time if needed
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toUTCString();
  };

  return (
    <div className="container my-2">
      <div>
        <div className="columns is-vcentered has-text-centered">
          <div className="column">
            <h1 className="title is-2 mb-2">
              Next race is the {raceData.race.name}
            </h1>
            <div className="subtitle">
              <span className="icon">
                <i className="fas fa-flag-checkered"></i>
              </span>
              <span className="ml-2">{raceData.race.circuit}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="columns is-multiline">
          {sessions.map((session, index) => (
            <div key={session.id} className="column is-full">
              <div className="level is-mobile">
                {/* Left hand side of the container */}
                <div className="level-left">
                  <div>
                    <p className="heading mb-1">{session.name}</p>
                    <p className="title is-5">
                      {new Date(session.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
                {/* Right hand side of the container */}
                <div className="level-right">
                  <div>
                    <p className="title is-4">
                      <TimeDisplay dateTimeString={`${session.time}`} />
                    </p>
                  </div>
                  {/* <p className="title is-4">{formatTimeUTC(session.time)}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
