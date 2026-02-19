// For each individual session
export type Session = {
  date: string;
  time: string;
};

export interface Sessions {
  id: string;
  key: string;
  name: string;
  sessionType: string;
  date: string;
  time: string;
  isRace?: boolean;
}

export type RaceData = {
  lastUpdated: string;
  race: {
    name: string;
    circuit: string;
    date: string;
    time: string;
    sessions: {
      race: RaceSessions;
    };
    isNextRace: boolean;
  };
};

export interface RaceSessions {
  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying?: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
  date: string; // The main race date
  time: string; // The main race time
}
