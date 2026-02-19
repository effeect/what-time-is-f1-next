import React from "react";
import Link from "next/link";

const NavigationBar = ({
  data,
  currentIndex,
}: {
  data: any;
  currentIndex: number;
}) => {
  console.log(currentIndex);
  // Need to do some work for this
  const prevRace = data.customRaceData[Number(currentIndex) - 1];
  const nextRace = data.customRaceData[Number(currentIndex) + 1];
  console.log(nextRace);
  return (
    <>
      {/* Navigation Controls */}
      {/* Previous Button */}
      <div className="buttons is-centered mt-4">
        {prevRace ? (
          <Link
            href={`/race/${prevRace.race.sessions.race.round}`}
            className="button is-link mr-2"
          >
            ← {prevRace.race.name}
          </Link>
        ) : (
          <button className="button is-link mr-2" disabled>
            Previous Race
          </button>
        )}
        {/* Next Button*/}
        {nextRace ? (
          <Link
            href={`/race/${nextRace.race.sessions.race.round}`}
            className="button is-link ml-2"
          >
            {nextRace.race.name} →
          </Link>
        ) : (
          <button className="button is-link mr-2" disabled>
            Next Race →
          </button>
        )}
      </div>
      <div className="my-4"></div>
    </>
  );
};

export default NavigationBar;
