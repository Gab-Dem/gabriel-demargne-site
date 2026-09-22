"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ServicesScrollGrid({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const columns = Array.from(grid.querySelectorAll<HTMLElement>(".services-index__column"));
    const dividers = Array.from(grid.querySelectorAll<HTMLElement>(".services-index__divider"));
    const scrollOffsets = [0, 0, 0];
    const headerFadeDistance = 64;
    let frame = 0;

    const applyScrollState = () => {
      frame = 0;
      const navOpacity = Math.max(0, 1 - scrollOffsets[2] / headerFadeDistance);
      const identityOpacity = Math.max(0, 1 - scrollOffsets[0] / headerFadeDistance);
      document.documentElement.style.setProperty("--services-nav-opacity", String(navOpacity));
      document.documentElement.style.setProperty("--services-identity-opacity", String(identityOpacity));

      const dividerOffsets = [
        scrollOffsets[0],
        Math.max(scrollOffsets[0], scrollOffsets[1]),
        Math.max(scrollOffsets[1], scrollOffsets[2]),
        scrollOffsets[2],
      ];
      dividers.forEach((divider, index) => {
        divider.style.transform = `translateY(-${dividerOffsets[index]}px)`;
      });
    };

    const listeners = columns.map((column, index) => {
      const onScroll = (event: Event) => {
        scrollOffsets[index] = (event.currentTarget as HTMLElement).scrollTop;
        if (!frame) frame = window.requestAnimationFrame(applyScrollState);
      };
      column.addEventListener("scroll", onScroll);
      return { column, onScroll };
    });

    applyScrollState();

    return () => {
      listeners.forEach(({ column, onScroll }) => {
        column.removeEventListener("scroll", onScroll);
      });
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--services-nav-opacity");
      document.documentElement.style.removeProperty("--services-identity-opacity");
    };
  }, []);

  return (
    <section
      ref={gridRef}
      className="services-index__grid"
      aria-label="Services"
    >
      {children}
      {[0, 1, 2, 3].map((index) => (
        <span
          aria-hidden="true"
          className={`services-index__divider services-index__divider--${index + 1}`}
          key={index}
        />
      ))}
    </section>
  );
}
