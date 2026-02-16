import React from "react";
import Link from "next/link";

const NavigationBar = ({ data, currentIndex }: any) => {
  // Need to do some work for this
  const prevRace = data.customRaceData[currentIndex - 1];
  const nextRace = data.customRaceData[currentIndex + 1];

  return (
    <>
      {/* Navigation Controls */}
      <div className="container has-text-centered">
        {prevRace ? (
          <Link
            href={`/race/${prevRace.race.sessions.race.round}`}
            className="button is-link mr-2"
          >
            ← Previous Race
          </Link>
        ) : (
          <div />
        )}
        {/* <div className="md-1" /> */}
        {nextRace ? (
          <Link
            href={`/race/${nextRace.race.sessions.race.round}`}
            className="button is-link ml-2"
          >
            Next Race →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default NavigationBar;
