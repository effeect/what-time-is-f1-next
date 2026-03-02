import Link from "next/link";

const NavigationBar = ({ data, round }: { data: any; round: number }) => {
  const roundNumber = Number(round);
  const nextRace = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === String(roundNumber + 1),
  );

  const prevRace = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === String(roundNumber - 1),
  );

  return (
    <>
      {/* Navigation Controls */}
      <div className="field is-grouped is-grouped-centered mt-6">
        {/* Previous Button */}
        <p className="control">
          {prevRace ? (
            <Link
              href={`/race/${prevRace.race.sessions.race.round}`}
              className="button"
            >
              ← {prevRace.race.name}
            </Link>
          ) : (
            <button className="button" disabled>
              ← Previous
            </button>
          )}
        </p>

        {/* Current Status */}
        <p className="control">
          <span className="button is-static">
            Race {roundNumber} of {data.customRaceData.length}
          </span>
        </p>

        {/* Next Button */}
        <p className="control">
          {nextRace ? (
            <Link
              href={`/race/${nextRace.race.sessions.race.round}`}
              className="button"
            >
              {nextRace.race.name} →
            </Link>
          ) : (
            <button className="button" disabled>
              Next →
            </button>
          )}
        </p>
      </div>
    </>
  );
};

export default NavigationBar;
