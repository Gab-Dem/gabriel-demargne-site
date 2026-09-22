"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MobilePageBack } from "@/components/mobile-page-back";
import type { DesignPortfolioChapter } from "@/data/design-portfolio";
import { DesignPortfolioChapterVisual } from "@/components/design-portfolio-visuals";

const projectNavigationTitles: Partial<Record<DesignPortfolioChapter["project"], string>> = {
  Spaces: "Spaces Project",
  Watchlist: "Watchlist Investigation",
  "Product Finder": "Product Finder Exploration",
  "Design practice": "Design Practices",
};

export function DesignPortfolioPlan({
  chapters,
  projectOrder,
}: {
  chapters: readonly DesignPortfolioChapter[];
  projectOrder: readonly DesignPortfolioChapter["project"][];
}) {
  const [activeSlug, setActiveSlug] = useState(chapters[0]?.slug ?? "");
  const [mobileMenu, setMobileMenu] = useState<"site" | "contents" | null>(null);
  const [showMobileContents, setShowMobileContents] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileShellRef = useRef<HTMLDivElement>(null);
  const activeChapter = chapters.find((chapter) => chapter.slug === activeSlug) ?? chapters[0];
  const activeMobileLabel = activeSlug === "design-practice-ai"
    ? "Design Practices · Appropriate use of AI"
    : activeChapter?.project === "Portfolio"
      ? "Design Portfolio"
      : activeChapter?.project === "Design practice"
        ? "Design Practices"
        : activeChapter
          ? `${projectNavigationTitles[activeChapter.project] ?? activeChapter.project} · ${activeChapter.navLabel}`
          : "Design Portfolio";
  const groupedChapters = useMemo(
    () =>
      projectOrder
        .map((project) => ({
          project,
          chapters: chapters.filter((chapter) => chapter.project === project),
        }))
        .filter((group) => group.chapters.length),
    [chapters, projectOrder],
  );

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const sections = chapters
      .map((chapter) => document.getElementById(chapter.slug))
      .concat([
        document.getElementById("design-practice-ai"),
      ])
      .filter((section): section is HTMLElement => Boolean(section));

    const mobileQuery = window.matchMedia("(max-width: 800px)");
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const updateMobileActive = () => {
      let current = sections[0];
      let closestTop = -Infinity;

      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= 144 && top > closestTop) {
          current = section;
          closestTop = top;
        }
      }

      if (current) setActiveSlug(current.id);
    };

    const scheduleMobileUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateMobileActive();
      });
    };

    const setupTracking = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener("scroll", scheduleMobileUpdate);

      if (mobileQuery.matches) {
        window.addEventListener("scroll", scheduleMobileUpdate, { passive: true });
        scheduleMobileUpdate();
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

            if (visible) setActiveSlug(visible.target.id);
          },
          { root, rootMargin: "-12% 0px -70% 0px", threshold: 0 },
        );
        sections.forEach((section) => observer?.observe(section));
      }
    };

    setupTracking();
    mobileQuery.addEventListener("change", setupTracking);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleMobileUpdate);
      mobileQuery.removeEventListener("change", setupTracking);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    const introduction = document.getElementById("portfolio-direction");
    const siteBar = mobileShellRef.current?.querySelector<HTMLElement>(".design-portfolio-plan__mobile-site-bar");
    const mobileQuery = window.matchMedia("(max-width: 800px)");
    if (!introduction || !siteBar) return;

    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      const visible = mobileQuery.matches && introduction.getBoundingClientRect().bottom <= siteBar.getBoundingClientRect().bottom;
      setShowMobileContents(visible);
      if (!visible) setMobileMenu((current) => current === "contents" ? null : current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenu(null);
    };
    const closeOutside = (event: PointerEvent) => {
      if (!mobileShellRef.current?.contains(event.target as Node)) setMobileMenu(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [mobileMenu]);

  const goToChapter = (slug: string) => {
    setActiveSlug(slug);
    setMobileMenu(null);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSection = (id: string) => {
    setActiveSlug(id);
    setMobileMenu(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="ux-portfolio-workspace design-portfolio-plan">
      <header className="ux-portfolio-workspace__header">
        <Link href="/" className="ux-portfolio-workspace__back-link">
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
            <path
              d="M12 6H1m0 0 4.5-4.5M1 6l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Home</span>
        </Link>
        <span className="design-portfolio-plan__header-name">Gabriel Demargne</span>
      </header>

      <div className="design-portfolio-plan__mobile-shell" ref={mobileShellRef}>
        <div className="design-portfolio-plan__mobile-site-bar">
          <Link href="/" className="design-portfolio-plan__mobile-name">Gabriel Demargne</Link>
          <button
            type="button"
            className="design-portfolio-plan__mobile-menu-button"
            aria-label={mobileMenu === "site" ? "Close site menu" : "Open site menu"}
            aria-expanded={mobileMenu === "site"}
            aria-controls="design-portfolio-mobile-site-menu"
            onClick={() => setMobileMenu(mobileMenu === "site" ? null : "site")}
          >
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
              <path
                d={mobileMenu === "site" ? "M3 2l18 16M21 2L3 18" : "M1 2h22M1 10h22M1 18h22"}
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="design-portfolio-plan__mobile-contents-button"
          hidden={!showMobileContents || mobileMenu === "site"}
          aria-expanded={mobileMenu === "contents"}
          aria-controls="design-portfolio-mobile-contents-menu"
          onClick={() => setMobileMenu(mobileMenu === "contents" ? null : "contents")}
        >
          <span>{activeMobileLabel}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="m1 1 8 8 8-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <nav
          id="design-portfolio-mobile-site-menu"
          className="design-portfolio-plan__mobile-panel design-portfolio-plan__mobile-site-menu"
          aria-label="Site navigation"
          hidden={mobileMenu !== "site"}
        >
          <Link href="/">Home</Link>
          <span aria-current="page">Portfolio</span>
          <Link href="/photography">Photography</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav
          id="design-portfolio-mobile-contents-menu"
          className="design-portfolio-plan__mobile-panel design-portfolio-plan__mobile-contents-menu"
          aria-label="Portfolio contents"
          hidden={mobileMenu !== "contents" || !showMobileContents}
        >
          {groupedChapters.map((group) => (
            <div className="design-portfolio-plan__mobile-nav-group" data-project={group.project} key={group.project}>
              {group.project !== "Portfolio" ? <p>{projectNavigationTitles[group.project] ?? group.project}</p> : null}
              {group.project === "Design practice" ? (
                <button type="button" aria-current={activeSlug === "design-practice-ai" ? "location" : undefined} onClick={() => goToSection("design-practice-ai")}>Appropriate use of AI</button>
              ) : group.chapters.map((chapter) => (
                <button
                  type="button"
                  key={chapter.slug}
                  aria-current={activeSlug === chapter.slug ? "location" : undefined}
                  onClick={() => goToChapter(chapter.slug)}
                >
                  {chapter.navLabel}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="ux-portfolio-workspace__body">
        <aside className="ux-portfolio-workspace__column ux-portfolio-workspace__column--index">
          <h2 className="ux-portfolio-workspace__column-title ux-portfolio-workspace__column-title--index">
            Content
          </h2>
          <nav className="design-portfolio-plan__nav" aria-label="Design portfolio content">
            {groupedChapters.map((group) => (
              <section
                className="design-portfolio-plan__nav-group"
                data-project={group.project}
                key={group.project}
              >
                <h3>{projectNavigationTitles[group.project] ?? group.project}</h3>
                {group.project === "Design practice" ? (
                  <button
                    type="button"
                    className={activeSlug === "design-practice-ai" ? "is-active" : undefined}
                    aria-current={activeSlug === "design-practice-ai" ? "location" : undefined}
                    onClick={() => goToSection("design-practice-ai")}
                  >
                    <span>Appropriate use of AI </span>
                    <span className="design-portfolio-plan__nav-tag">[AI Practice]</span>
                  </button>
                ) : group.chapters.map((chapter) => {
                  const isActive = chapter.slug === activeChapter?.slug;

                  return (
                    <button
                      type="button"
                      className={isActive ? "is-active" : undefined}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => goToChapter(chapter.slug)}
                      key={chapter.slug}
                    >
                      <span>{chapter.navLabel} </span>
                      <span className="design-portfolio-plan__nav-tag">[{chapter.navTag}]</span>
                    </button>
                  );
                })}
              </section>
            ))}
          </nav>
        </aside>

        <section className="ux-portfolio-workspace__column ux-portfolio-workspace__column--main design-portfolio-plan__main">
          <div className="design-portfolio-plan__scroll" ref={scrollRef}>
            {chapters.map((chapter, index) => {
              const isProjectStart = index === 0 || chapters[index - 1]?.project !== chapter.project;
              const isProjectEnd = index === chapters.length - 1 || chapters[index + 1]?.project !== chapter.project;

              return <article
                className={[
                  "design-portfolio-plan__chapter",
                  chapter.slug === "portfolio-direction" ? "is-introduction" : "",
                  isProjectStart ? "is-project-start" : "",
                  isProjectEnd ? "is-project-end" : "",
                ].filter(Boolean).join(" ")}
                id={chapter.slug}
                key={chapter.slug}
              >
                {index === 0 ? <MobilePageBack href="/" ariaLabel="Back to home" /> : null}
                <header className="design-portfolio-plan__chapter-header">
                  <div className="design-portfolio-plan__chapter-heading">
                    {isProjectStart && chapter.project !== "Design practice" && projectNavigationTitles[chapter.project] ? (
                      <p className="design-portfolio-plan__project-name">
                        {projectNavigationTitles[chapter.project]}
                      </p>
                    ) : null}
                    {index === 0 ? <h1>{chapter.title}</h1> : <h2>{chapter.title}</h2>}
                  </div>
                  {chapter.slug === "portfolio-direction" || chapter.project === "Design practice" ? null : (
                    <div className="design-portfolio-plan__chapter-summary">{chapter.summary}</div>
                  )}
                </header>

                <DesignPortfolioChapterVisual chapter={chapter} />
                {index === 0 && chapters[1] ? (
                  <button
                  type="button"
                  className="design-portfolio-plan__scroll-cue"
                  aria-label="Scroll to the first project"
                    onClick={() => goToChapter(chapters[1].slug)}
                  >
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                      <path
                        d="M10 1v20m0 0 8-8M10 21l-8-8"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : null}
              </article>;
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
