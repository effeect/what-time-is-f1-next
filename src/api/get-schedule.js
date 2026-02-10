// Get the schedule and saves it to a public.json for use
const fs = require("fs");
const path = require("path");

async function getSchedule() {
  const url = "http://api.jolpi.ca/ergast/f1/current/next.json";
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const processedData = {
      lastUpdated: new Date().toISOString(),
      race: {
        name: data.MRData.RaceTable.Races[0].raceName,
        circuit: data.MRData.RaceTable.Races[0].Circuit.circuitName,
        date: data.MRData.RaceTable.Races[0].date,
        time: data.MRData.RaceTable.Races[0].time,
        sessions: {
          fp1: data.MRData.RaceTable.Races[0].FirstPractice,
          fp2: data.MRData.RaceTable.Races[0].SecondPractice,
          fp3: data.MRData.RaceTable.Races[0].ThirdPractice,
          qualifying: data.MRData.RaceTable.Races[0].Qualifying,
          race: data.MRData.RaceTable.Races[0],
        },
      },
    };
    const outputPath = path.join(
      process.cwd(),
      "public",
      "data",
      "schedule.json",
    );

    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    return data;
  } catch (error) {
    // If we hit an error when reaching the endpoint, just exit the application
    console.error("Error fetching F1 schedule:", error.message);
    process.exit(1);
  }
}

// Run the main thing
getSchedule();
