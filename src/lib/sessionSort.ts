import { RaceData } from "@/types/session_detail";

const sessionNameMap: Record<string, string> = {
  fp1: "Free Practice 1",
  fp2: "Free Practice 2 ",
  fp3: "Free Practice 3",
  qualifying: "Qualifying",
  race: "Grand Prix",
  sprint: "Sprint Race",
  sprint_qualifying: "Sprint Qualifying",
  sprint_shootout: "Sprint Shootout",
};

// Session type mapping for styling
const sessionTypeMap: Record<string, string> = {
  fp1: "practice",
  fp2: "practice",
  fp3: "practice",
  qualifying: "qualifying",
  race: "race",
  sprint: "sprint",
  sprint_shootout: "sprint_qualifying",
  sprint_qualifying: "sprint_qualifying",
};

interface Session {
  id: string;
  key: string;
  name: string;
  sessionType: string;
  date: string;
  time: string;
  isRace?: boolean;
}

export function sortSessions(RaceData: RaceData) {
  const race = RaceData.race.sessions.race;

  // Dynamically build sessions array based on available data
  const allSessions: Session[] = [];

  // Check for different session types in the data
  if (race.FirstPractice) {
    allSessions.push({
      id: "fp1",
      key: "fp1",
      name: sessionNameMap.fp1,
      sessionType: sessionTypeMap.fp1,
      date: race.FirstPractice.date,
      time: race.FirstPractice.time,
    });
  }

  // Check if this is a sprint quali or not
  if (race.SecondPractice) {
    const isSprintWeekend = race.Sprint || race.SprintQualifying;
    const key = isSprintWeekend ? "sprint" : "fp2";
    allSessions.push({
      id: key,
      key,
      name: isSprintWeekend ? sessionNameMap.sprint : sessionNameMap.fp2,
      sessionType: isSprintWeekend ? sessionTypeMap.sprint : sessionTypeMap.fp2,
      date: race.SecondPractice.date,
      time: race.SecondPractice.time,
    });
  }

  // Check if this is a sprint race or not
  if (race.ThirdPractice) {
    const isSprintWeekend = race.Sprint || race.SprintQualifying;
    const key = isSprintWeekend ? "sprint_qualifying" : "fp3";
    allSessions.push({
      id: key,
      key,
      name: isSprintWeekend
        ? sessionNameMap.sprint_qualifying
        : sessionNameMap.fp3,
      sessionType: isSprintWeekend
        ? sessionTypeMap.sprint_qualifying
        : sessionTypeMap.fp3,
      date: race.ThirdPractice.date,
      time: race.ThirdPractice.time,
    });
  }

  if (race.Qualifying) {
    allSessions.push({
      id: "qualifying",
      key: "qualifying",
      name: sessionNameMap.qualifying,
      sessionType: sessionTypeMap.qualifying,
      date: race.Qualifying.date,
      time: race.Qualifying.time,
    });
  }

  // Always include the race
  allSessions.push({
    id: "race",
    key: "race",
    name: sessionNameMap.race,
    sessionType: sessionTypeMap.race,
    date: race.date,
    time: race.time,
    isRace: true,
  });

  const sortedSessions = allSessions.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return sortedSessions;
}
