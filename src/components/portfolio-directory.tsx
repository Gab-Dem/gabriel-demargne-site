import Link from "next/link";
import type { PortfolioProjectCard } from "@/data/ux-portfolio";

export function PortfolioDirectory({
  intro,
  secondaryProjects,
  projects,
}: {
  intro: string;
  secondaryProjects: readonly PortfolioProjectCard[];
  projects: readonly PortfolioProjectCard[];
}) {
  const introParagraphs = intro
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const gridSlots = Array.from({ length: 6 }, (_, index) => {
    if (index < projects.length) {
      return projects[index];
    }

    const secondaryIndex = index - projects.length;

    if (secondaryIndex >= 0 && secondaryIndex < secondaryProjects.length) {
      return secondaryProjects[secondaryIndex];
    }

    return null;
  });

  return (
    <main className="portfolio-directory">
      <header className="portfolio-directory__header">
        <Link href="/" className="portfolio-directory__back-link">
          <span aria-hidden="true">←</span>
          <span>Home</span>
        </Link>
        <h1 className="portfolio-directory__title">Portfolio</h1>
        <div aria-hidden="true" className="portfolio-directory__header-spacer" />
      </header>
      <div className="portfolio-directory__body">
        <aside className="portfolio-directory__intro-column">
          <div className="portfolio-directory__intro-copy">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="portfolio-directory__intro-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </aside>
        <section className="portfolio-directory__grid" aria-label="Portfolio projects">
          {gridSlots.map((project, index) =>
            project ? (
              project.href ? (
                <Link
                  key={project.slug}
                  href={project.href}
                  className="portfolio-directory__tile portfolio-directory__tile--project"
                >
                  <p className="portfolio-directory__tile-eyebrow">{project.eyebrow}</p>
                  <h2 className="portfolio-directory__tile-title">{project.title}</h2>
                  <p className="portfolio-directory__tile-subtitle">{project.subtitle}</p>
                  <div className="portfolio-directory__tile-tags" aria-label="Included in this project">
                    {project.includes.map((item) => (
                      <span key={item} className="portfolio-directory__tile-tag" aria-hidden="true">
                        [{item}]
                      </span>
                    ))}
                  </div>
                </Link>
              ) : (
                <article
                  key={project.slug}
                  className="portfolio-directory__tile portfolio-directory__tile--project-static"
                >
                  <p className="portfolio-directory__tile-eyebrow">{project.eyebrow}</p>
                  <h2 className="portfolio-directory__tile-title">{project.title}</h2>
                  <p className="portfolio-directory__tile-subtitle">{project.subtitle}</p>
                  <div className="portfolio-directory__tile-tags" aria-label="Included in this project">
                    {project.includes.map((item) => (
                      <span key={item} className="portfolio-directory__tile-tag" aria-hidden="true">
                        [{item}]
                      </span>
                    ))}
                  </div>
                </article>
              )
            ) : (
              <div
                key={`empty-${index}`}
                aria-hidden="true"
                className="portfolio-directory__tile portfolio-directory__tile--empty"
              />
            )
          )}
        </section>
      </div>
    </main>
  );
}
