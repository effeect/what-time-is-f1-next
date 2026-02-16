import Footer from "@/app/components/atoms/Footer/Footer";
import Navbar from "@/app/components/atoms/Navbar/navbar";
import RaceTimetable from "@/app/components/RaceTimetable";
import { getYearRaceData } from "@/lib/data_year";
import { notFound } from "next/navigation";
import Link from "next/link";
import NavigationBar from "@/app/components/atoms/Navigation/navigation";

// Grab the static params for each round from the year schedule data
export async function generateStaticParams() {
  const yearRaceData = await getYearRaceData();
  console.log(yearRaceData.customRaceData);
  return yearRaceData.customRaceData.map((item: any) => ({
    round: item.race.sessions.race.round,
  }));
}

export default async function RoundPage({
  params,
}: {
  params: Promise<{ round: string }>;
}) {
  const { round } = await params;
  const data = await getYearRaceData();
  const currentIndex = data.customRaceData.findIndex(
    (item: any) => item.race.sessions.race.round === round,
  );
  const prevRace = data.customRaceData[currentIndex - 1];
  const nextRace = data.customRaceData[currentIndex + 1];
  console.log(prevRace);
  console.log(nextRace);
  const raceEntry = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === round,
  );

  if (!raceEntry) {
    notFound();
  }
  const race = raceEntry;
  console.log(race);
  return (
    <>
      <Navbar />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <RaceTimetable RaceData={race} />
        </div>
        <NavigationBar data={data} currentIndex={currentIndex} />

        <Footer />
      </section>
    </>
  );
}
