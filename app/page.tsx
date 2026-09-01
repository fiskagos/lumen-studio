import FinalReveal from "@/components/FinalReveal";
import LumenOpening from "@/components/LumenOpening";
import HeroProjectsStage from "@/components/HeroProjectsStage";

export default function Home() {
  return (
    <main className="lumen-home">
      {/* LUMEN OPENING */}
      <LumenOpening />

      {/* HORIZONTAL EXPERIENCE */}
      <HeroProjectsStage />

      {/* FINAL LUMEN REVEAL */}
      <FinalReveal />
    </main>
  );
}