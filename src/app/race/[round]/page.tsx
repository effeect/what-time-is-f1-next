import Footer from "@/app/components/atoms/Footer/Footer";
import Navbar from "@/app/components/atoms/Navbar/navbar";
import RaceTimetable from "@/app/components/RaceTimetable";
import { getYearRaceData } from "@/lib/data_year";
import { notFound } from "next/navigation";
import NavigationBar from "@/app/components/atoms/Navigation/navigation";

// Grab the static params for each round from the year schedule data
export async function generateStaticParams() {
  const yearRaceData = await getYearRaceData();
  return yearRaceData.customRaceData.map((item: any) => ({
    round: item.race.sessions.race.round,
  }));
}
// For metadata stuff
export async function generateMetadata(props: {
  params: Promise<{ round: string }>;
}) {
  const params = await props.params;
  const data = await getYearRaceData();
  const raceEntry = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === params.round,
  );

  return {
    metadataBase: new URL("https://oliverdimes.dev"),
    alternates: {
      canonical: "/",
    },
    title: `What time is F1? - ${raceEntry?.race.name} Schedule`,
    description: `The schedule for the ${params.round} race`,
    keywords: "Formula 1, F1, Race Schedule",
    openGraph: {
      images: ["/default-preview.png"],
    },
  };
}

export default async function RoundPage({
  params,
}: {
  params: Promise<{ round: string }>;
}) {
  const { round } = await params;
  const data = await getYearRaceData();
  console.log(data);
  const currentIndex = data.customRaceData.findIndex(
    (item: any) => item.race.sessions.race.round === round,
  );
  const raceEntry = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === round,
  );
  console.log(raceEntry);
  if (!raceEntry) {
    notFound();
  }
  const race = raceEntry;

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
