import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "01",
    title: "Alice Salvetz",
    image: "/projects/alice-salvetz-01.jpg",
    href: "/projects/alice-salvetz",
  },
  {
    id: "02",
    title: "Northbound",
    image: "/projects/alice-salvetz-02.jpg",
    href: "/projects/northbound",
  },
  {
    id: "03",
    title: "Halden Press",
    image: "/projects/alice-salvetz-03.jpg",
    href: "/projects/halden-press",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-clean-section">
      <div className="projects-clean-inner">

        <div className="projects-clean-label">
          SELECTED WORK
        </div>

        <div className="projects-clean-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className="projects-clean-card"
            >
              <Link
                href={project.href}
                className="projects-clean-link"
                aria-label={`View ${project.title}`}
              >
                <div className="projects-clean-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 900px) 31vw, 92vw"
                    style={{objectFit: "cover"}}
                  />
                </div>

                <div className="projects-clean-name">
                  {project.title}
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}