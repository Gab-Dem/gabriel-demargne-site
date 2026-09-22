"use client";

import { useEffect, useState } from "react";

type ChapterLink = {
  id: string;
  title: string;
};

export function PhotographyChapterNav({
  chapters,
  label,
}: {
  chapters: readonly ChapterLink[];
  label: string;
}) {
  const [activeId, setActiveId] = useState(chapters[0]?.id);

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.45;
      let currentId = chapters[0]?.id;

      for (const chapter of chapters) {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= threshold) {
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

  return (
    <nav aria-label={label}>
      {chapters.map((chapter) => (
        <a
          className={activeId === chapter.id ? "is-active" : undefined}
          href={`#${chapter.id}`}
          aria-current={activeId === chapter.id ? "location" : undefined}
          key={chapter.id}
        >
          {chapter.title}
        </a>
      ))}
    </nav>
  );
}
