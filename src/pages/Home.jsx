import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Values from "../components/home/Values";
import Sectors from "../components/home/Sectors";
import History from "../components/home/History";

export default function Home() {
  return (
    <div className="relative pt-24 overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Values />
      <Sectors />
      <History />
    </div>
  );
}
