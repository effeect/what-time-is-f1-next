// For each individual session
type Session = {
  date: string;
  time: string;
};

export type RaceData = {
  lastUpdated: string;
  race: {
    name: string;
    circuit: string;
    date: string;
    time: string;
    sessions: {
      fp1: Session;
      fp2: Session;
      fp3: Session;
      qualifying: Session;
      race: Session;
    };
  };
};
