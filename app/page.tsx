
import CapabilitiesHeading from "@/components/CapabilitiesHeading";
import ProjectStart from "@/components/ProjectStart";
import FounderHeading from "@/components/FounderHeading";
import ApproachStatement from "@/components/ApproachStatement";
import FinalReveal from "@/components/FinalReveal";
import ContactMotion from "../components/ContactMotion";
import LumenOpening from "@/components/LumenOpening";
import HeroProjectsStage from "@/components/HeroProjectsStage";


export default function Home() {
  return (
    <main className="lumen-home">

      {/* LUMEN OPENING */}
      <LumenOpening />

      {/* HERO / PROJECTS / CAPABILITIES */}
      <HeroProjectsStage />

      {/* APPROACH */}
      <section className="approach-section">
        <ApproachStatement />
      </section>

      {/* FOUNDER */}
      <section className="founder-section">

        <div className="founder-label">
          THE PERSON BEHIND LUMEN
        </div>

        <div className="founder-content">
          <FounderHeading />

          {/* restul conținutului founder pe care îl ai deja */}
        </div>

      </section>

{/* CONTACT */}
<section className="contact-section">

  <ContactMotion />

  <div className="contact-heading">
    <CapabilitiesHeading
      firstLine="Have an idea?"
      secondLine="Let's give it form."
    />
  </div>

  <div className="contact-primary">
    <ProjectStart />

    <p className="contact-copy">
      Tell us what you&apos;re thinking.
      <br />
      It doesn&apos;t need to be figured out yet.
    </p>
  </div>

  <div className="contact-secondary">
    <span>OR JUST SAY HELLO</span>

    <a href="mailto:hello@lumenstudio.com">
      HELLO@LUMENSTUDIO.COM
    </a>
  </div>

</section>

{/* FINAL LUMEN REVEAL */}
<FinalReveal />

    </main>
  );
}