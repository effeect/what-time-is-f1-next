import Footer from "@/app/components/atoms/Footer/Footer";
import Navbar from "@/app/components/atoms/Navbar/navbar";
import RaceTimetable from "@/app/components/organisms/RaceTimetable";
import { getYearRaceData } from "@/lib/data_year";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
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
    metadataBase: new URL("https://oliverdimes.dev"), // TODO: replace with your custom domain
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
  params: Promise<{ round: number }>;
}) {
  const { round } = await params;
  const data = await getYearRaceData();
  const raceEntry = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === round,
  );
  if (!raceEntry) {
    notFound();
  }
  const race = raceEntry;

  return (
    <>
      <Navbar />
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", py: 6 }}>
          <RaceTimetable RaceData={race} />
        </Box>
        <NavigationBar data={data} round={round} />
        <Footer />
      </Box>
    </>
  );
}
