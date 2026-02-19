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
  let currentYear = new Date().getFullYear();

  // First of all, need to fetch the count for the total number of files
  const baseUrl = `http://api.jolpi.ca/ergast/f1/${currentYear}`;
  // Get the total count of the races for the year
  const Races = await fetch(baseUrl, { method: "GET" })
    .then((res) => res.json())
    .then((data) => data.MRData.RaceTable.Races);
  let customRaceData = [];

  const nextRace = getNextRace();

  try {
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

      // Check which event is the next race and add a true flag to the one, needed for the site
      const isNextRace =
        sessions.race.Circuit.circuitName === nextRace.race.circuit;
      // Processed Data for each race round
      // console.log(isNextRace);
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
      `year_schedule.json`,
    );

    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    // return data;
  } catch (error) {
    // If we hit an error when reaching the endpoint, just exit the application
    console.error("Error fetching F1 schedule:", error.message);
    process.exit(1);
  }
}

// Run the main thing
getYearSchedule();
