import Image from "next/image";
import styles from "./page.module.css";
import { GetStaticProps } from "next";
import { getRaceData } from "@/lib/data";
import RaceTimetable from "./components/RaceTimetable";
import Navbar from "./components/atoms/Navbar/navbar";
import Footer from "./components/atoms/Footer/Footer";

export default async function Home() {
  // Quick way to reformat date to an iso string
  const raceData = await getRaceData();
  // console.log(raceData);
  const formatDateTime = (date: string, time: string) => {
    return new Date(`${date}T${time}`).toLocaleString();
  };

  return (
    <>
      <Navbar />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <RaceTimetable RaceData={raceData} />{" "}
        </div>
        <Footer />
      </section>
    </>
  );
}
