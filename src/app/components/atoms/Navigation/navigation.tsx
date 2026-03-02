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
      <div className="field is-mobile is-grouped is-grouped-centered mt-6">
        {/* Previous Button */}
        <p className="control ">
          {prevRace ? (
            <Link
              href={`/race/${prevRace.race.sessions.race.round}`}
              className="button is-fullwidth"
            >
              <span>←</span>
              {/* Shows race name on Desktop, hides on Mobile */}
              <span className="is-hidden-mobile ml-1">
                {prevRace.race.name}
              </span>
              {/* Shows 'Prev' on Mobile, hides on Desktop */}
              <span className="is-hidden-tablet ml-1">Prev</span>
            </Link>
          ) : (
            <button className="button is-fullwidth" disabled>
              ← Prev
            </button>
          )}
        </p>

        {/* Current Status */}
        <p className="control ">
          <span className="button is-static">
            <span className="is-hidden-mobile"></span> {roundNumber}
            <span className="is-hidden-mobile">&nbsp;of&nbsp;</span>
            <span className="is-hidden-tablet">/</span>
            {data.customRaceData.length}
          </span>
        </p>

        {/* Next Button */}
        <p className="control ">
          {nextRace ? (
            <Link
              href={`/race/${nextRace.race.sessions.race.round}`}
              className="button "
            >
              <span className="is-hidden-mobile mr-1">
                {nextRace.race.name}
              </span>
              <span className="is-hidden-tablet mr-1">Next</span>
              <span>→</span>
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
