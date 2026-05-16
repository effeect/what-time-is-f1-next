// Get the schedule and saves it to a public.json for use
const fs = require("fs");
const path = require("path");

function getNextRace() {
  const filePath = path.join(process.cwd(), "public", "data", "schedule.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

// Get the full year schedule and save it to a custom json file for rendering in next.js
async function getYearSchedule() {
  try {
    const currentYear = new Date().getFullYear();
    const baseUrl = `http://api.jolpi.ca/ergast/f1/${currentYear}`;

    const yearResponse = await fetch(baseUrl, { method: "GET" });
    if (!yearResponse.ok) {
      throw new Error(`API returned ${yearResponse.status} ${yearResponse.statusText}`);
    }
    const Races = await yearResponse.json().then((data) => data.MRData.RaceTable.Races);

    const nextRace = getNextRace();
    let customRaceData = [];

    for (let i = 0; i < Races.length; i++) {
      let sessions = {};
      // Checking if this is a sprint weekend or not
      if (!Races[i].SecondPractice) {
        sessions = {
          fp1: Races[i].FirstPractice,
          sprintqualifying: Races[i].SprintQualifying,
          sprint: Races[i].Sprint,
          qualifying: Races[i].Qualifying,
          race: Races[i],
        };
      } else {
        sessions = {
          fp1: Races[i].FirstPractice,
          fp2: Races[i].SecondPractice,
          fp3: Races[i].ThirdPractice,
          qualifying: Races[i].Qualifying,
          race: Races[i],
        };
      }

      const isNextRace =
        sessions.race.Circuit.circuitName === nextRace.race.circuit;
      const customRaceDataItem = {
        race: {
          name: Races[i].raceName,
          circuit: Races[i].Circuit.circuitName,
          date: Races[i].date,
          time: Races[i].time,
          sessions,
          isNextRace,
        },
      };
      customRaceData.push(customRaceDataItem);
    }

    const processedData = {
      lastUpdated: new Date().toISOString(),
      customRaceData,
    };

    const outputPath = path.join(
      process.cwd(),
      "public",
      "data",
      "year_schedule.json",
    );

    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
  } catch (error) {
    // If we hit an error when reaching the endpoint, just exit the application
    console.error("Error fetching F1 schedule:", error.message);
    process.exit(1);
  }
}

// Run the main thing
getYearSchedule();
