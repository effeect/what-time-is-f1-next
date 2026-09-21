import { RaceData } from "@/types/session_detail";
import { sortSessions } from "@/lib/sessionSort";
import RaceHeader from "../atoms/Header/Header";
import SessionRow from "../atoms/SessionRow/SessionRow";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import LinkButton from "../common/LinkButton";
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
    <Container maxWidth="md" sx={{ my: 1 }}>
      {/* Header Section, note that all the varaibles are string based */}
      {/* Could be a bit tidier but this works for the moment */}
      {!raceData.race.isNextRace ? (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LinkButton href="/">← Back to Next Race Schedule</LinkButton>
        </Box>
      ) : null}

      <RaceHeader
        RaceName={
          raceData.race.isNextRace
            ? "Next race is " + (raceData.race.name || "Unknown Race")
            : "Race Timetable for the " + (raceData.race.name || "Unknown Race")
        }
        CircuitName={raceData.race.circuit || "Unknown Circuit"}
        CircuitUrl={sessionData.Circuit?.url ?? "#"}
        Country={sessionData.Circuit?.Location.country}
        Date={formatDate(sessionData.date) || "Unknown Date"}
      />
      <Divider sx={{ my: 3 }} />
      <Stack spacing={3}>
        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </Stack>
    </Container>
  );
}
