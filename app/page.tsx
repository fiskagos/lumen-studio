import CapabilityRow from "@/components/CapabilityRow";

export default function Home() {
  return (
    <main className="lumen-home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-brand">
          LUMEN
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Ideas deserve
            <br />
            more than
            <br />
            a template.
          </h1>

          <div className="hero-project">
            <div className="hero-project-placeholder">
              PROJECT 01
            </div>

            <div className="hero-project-info">
              <span>Alice Salvetz</span>
              <span>2026</span>
            </div>
          </div>
        </div>

        <div className="hero-footer">
          <span>DESIGN · DEVELOPMENT · COMMERCE · AI</span>
          <span>ALICANTE · SPAIN</span>
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
          <h2>
            Thoughtfully designed.
            <br />
            Seriously engineered.
          </h2>
        </div>

      <div className="capabilities-list">

  <CapabilityRow
    title="DESIGN"
    description="UX/UI · CREATIVE DIRECTION · RESPONSIVE DESIGN · PROTOTYPING"
  />

  <CapabilityRow
    title="COMMERCE"
    description="SHOPIFY · HEADLESS COMMERCE · STOREFRONTS · PAYMENTS"
  />

  <CapabilityRow
    title="AI INTEGRATION"
    description="AI EXPERIENCES · AUTOMATION · INTELLIGENT SEARCH · CUSTOM AI"
  />

  <CapabilityRow
    title="ENGINEERING"
    description="FRONTEND · CUSTOM DEVELOPMENT · APIs · INTEGRATIONS · CLOUD"
  />

</div>
      </section>
      {/* HUMAN APPROACH */}
      <section className="approach-section">

        <div className="approach-heading">
          <h2>
            Built with you.
            <br />
            Not just for you.
          </h2>
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