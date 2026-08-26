
import ProjectStart from "@/components/ProjectStart";

import CapabilitiesHeading from "@/components/CapabilitiesHeading";
import FounderHeading from "@/components/FounderHeading";
import CapabilitiesSection from "@/components/CapabilitiesSection";


export default function Home() {
  return (
    <main className="lumen-home">

      {/* HERO */}
      <section className="hero">
       <div className="hero-brand">
  <span className="brand-letter brand-l">
    L
    <span className="brand-dot dot-l" />
  </span>

  <span>U</span>

  <span className="brand-letter brand-m">
    M
    <span className="brand-dot dot-m" />
  </span>

  <span>E</span>

  <span className="brand-letter brand-n">
    N
    <span className="brand-dot dot-n" />
  </span>
</div>

        <div className="hero-content">
          <h1 className="hero-title">
            Ideas deserve
            <br />
            more than
            <br />
            a template.
          </h1>

          
        </div>

       <div className="hero-footer">
  <span>DESIGN · DEVELOPMENT · COMMERCE · AI</span>

  <a
  href="https://www.linkedin.com/company/lumen-studio-design/"
  target="_blank"
  rel="noopener noreferrer"
>
  LINKEDIN
</a>
</div>
      </section>


      {/* PROJECTS */}
      <section className="projects-section">
        <div className="projects-grid">

          <article className="project-card">
            <div className="project-media">
              <div className="project-placeholder">
                PROJECT 01
              </div>
            </div>

            <div className="project-meta">
              <div>
                <h2 className="project-title">
                  Alice Salvetz
                </h2>

                <p className="project-category">
                  Artist · Commerce
                </p>
              </div>

              <span className="project-year">
                2026
              </span>
            </div>
          </article>


          <article className="project-card">
            <div className="project-media">
              <div className="project-placeholder">
                PROJECT 02
              </div>
            </div>

            <div className="project-meta">
              <div>
                <h2 className="project-title">
                  Project Two
                </h2>

                <p className="project-category">
                  Digital · Web
                </p>
              </div>

              <span className="project-year">
                2026
              </span>
            </div>
          </article>


          <article className="project-card">
            <div className="project-media">
              <div className="project-placeholder">
                PROJECT 03
              </div>
            </div>

            <div className="project-meta">
              <div>
                <h2 className="project-title">
                  Project Three
                </h2>

                <p className="project-category">
                  Brand · Web
                </p>
              </div>

              <span className="project-year">
                2026
              </span>
            </div>
          </article>

        </div>
      </section>


      {/* CAPABILITIES / APPROACH */}
<section className="capabilities-section">

  <div className="capabilities-intro">
  <CapabilitiesHeading
    firstLine="Thoughtfully designed."
    secondLine="Seriously engineered."
  />
</div>

  <CapabilitiesSection />

</section>


      {/* HUMAN APPROACH */}
      <section className="approach-section">

        <div className="approach-heading">
  <CapabilitiesHeading
    firstLine="Built with you."
    secondLine="Not just for you."
  />
</div>

      <div className="approach-process">

  <div className="process-line" />

  <div className="process-item process-item-left">
    <span className="process-label">LISTEN</span>

    <div className="process-dot" />

    <p className="process-description">
      We understand before we design.
    </p>
  </div>

  <div className="process-item process-item-center">
    <span className="process-label">SHAPE</span>

    <div className="process-dot" />

    <p className="process-description">
      We turn the idea into something clear.
    </p>
  </div>

  <div className="process-item process-item-right">
    <span className="process-label">BUILD</span>

    <div className="process-dot" />

    <p className="process-description">
      We engineer it to actually work.
    </p>
  </div>

</div>

      </section>

      {/* FOUNDER */}
<section className="founder-section">

  <div className="founder-label">
    THE PERSON BEHIND LUMEN
  </div>

  <div className="founder-content">

    <FounderHeading />

 <div className="founder-bio">
  <p>
    My background is in software engineering, but I’ve always been drawn to
    the space where technology, design and human experience meet.
  </p>

  <p>
    Years spent working across digital experience at Netcentric and Adobe,
    and later building complex systems in the pharmaceutical world, shaped
    the way I think about technology: not just how things look, but how they
    work, scale and last.
  </p>

  <p>
    But I’ve always been a creator at heart. There’s something remarkable
    about taking an idea that exists only in someone’s mind and giving it
    form, making something that didn’t exist before and could only belong
    to that person.
  </p>

  <p>
    I created Lumen to bring those two worlds together: the freedom of
    creating something unique and the discipline of engineering it well.
  </p>

  <p>
    Thoughtful design. Serious engineering.
  </p>
</div>

  </div>

  <div className="founder-footer">
    <span>PAULA BANCIU</span>
    <span>FOUNDER · DESIGNER · ENGINEER</span>
  </div>

</section>

{/* CONTACT */}
<section className="contact-section">

  <div className="contact-heading">
  <CapabilitiesHeading
    firstLine="Have an idea?"
    secondLine="Let's give it form."
  />
</div>

 <div className="contact-copy">
  <p>
    Tell us what you&apos;re thinking.
    <br />
    It doesn&apos;t need to be figured out yet.
  </p>
</div>

  <div className="contact-actions">

  <ProjectStart />

  <div className="contact-secondary">
    <span>OR JUST SAY HELLO</span>

    <a href="mailto:hello@lumenstudio.com">
      HELLO@LUMENSTUDIO.COM
    </a>
  </div>

</div>

  <div className="contact-footer">
    <a
      href="https://www.linkedin.com/company/lumen-studio-design/"
      target="_blank"
      rel="noopener noreferrer"
    >
      
    </a>
  </div>

</section>

      {/* FINAL LUMEN REVEAL */}
      <section className="final-reveal">

        <div className="final-wordmark">
          LUMEN
        </div>

        <div className="final-studio">
          STUDIO
        </div>

      </section>

    </main>
  );
}