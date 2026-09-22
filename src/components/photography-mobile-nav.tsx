"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Chapter = {
  id: string;
  title: string;
};

export function PhotographyMobileNav({
  title,
  chapters,
  activePage = "photography",
}: {
  title?: string;
  chapters?: readonly Chapter[];
  activePage?: "photography" | "services";
}) {
  const [openMenu, setOpenMenu] = useState<"site" | "chapters" | null>(null);
  const [activeId, setActiveId] = useState(chapters?.[0]?.id);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chapters?.length) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let currentId = chapters[0].id;

      for (const chapter of chapters) {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= 144) {
          currentId = chapter.id;
        }
      }

      setActiveId(currentId);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    if (!openMenu) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const closeOutside = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [openMenu]);

  const goToChapter = (id: string) => {
    setActiveId(id);
    setOpenMenu(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  const activeChapter = chapters?.find((chapter) => chapter.id === activeId) ?? chapters?.[0];

  return (
    <div className="photography-mobile-nav" ref={shellRef}>
      <div className="photography-mobile-nav__site-bar">
        <Link href="/" className="photography-mobile-nav__name">Gabriel Demargne</Link>
        <button
          type="button"
          className="photography-mobile-nav__menu-button"
          aria-label={openMenu === "site" ? "Close site menu" : "Open site menu"}
          aria-expanded={openMenu === "site"}
          aria-controls="photography-mobile-site-menu"
          onClick={() => setOpenMenu(openMenu === "site" ? null : "site")}
        >
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
            <path
              d={openMenu === "site" ? "M3 2l18 16M21 2L3 18" : "M1 2h22M1 10h22M1 18h22"}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {chapters?.length ? (
        <button
          type="button"
          className="photography-mobile-nav__chapters-button"
          aria-expanded={openMenu === "chapters"}
          aria-controls="photography-mobile-chapters-menu"
          onClick={() => setOpenMenu(openMenu === "chapters" ? null : "chapters")}
        >
          <span>{title} · {activeChapter?.title}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="m1 1 8 8 8-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      <nav
        id="photography-mobile-site-menu"
        className="photography-mobile-nav__panel photography-mobile-nav__site-menu"
        aria-label="Site navigation"
        hidden={openMenu !== "site"}
      >
        <Link href="/">Home</Link>
        <Link href="/design-portfolio">Portfolio</Link>
        <Link href="/photography" aria-current={activePage === "photography" ? "page" : undefined}>Photography</Link>
        <Link href="/services" aria-current={activePage === "services" ? "page" : undefined}>Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {chapters?.length ? (
        <nav
          id="photography-mobile-chapters-menu"
          className="photography-mobile-nav__panel photography-mobile-nav__chapters-menu"
          aria-label={`${title} chapters`}
          hidden={openMenu !== "chapters"}
        >
          <div className="photography-mobile-nav__chapter-group">
            {chapters.map((chapter) => (
              <button
                type="button"
                key={chapter.id}
                aria-current={activeId === chapter.id ? "location" : undefined}
                onClick={() => goToChapter(chapter.id)}
              >
                {chapter.title}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
