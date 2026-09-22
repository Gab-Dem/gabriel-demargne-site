"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ServicesScrollGrid({ children }: { children: ReactNode }) {
  const [scrollOffsets, setScrollOffsets] = useState([0, 0, 0]);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const columns = Array.from(grid.querySelectorAll<HTMLElement>(".services-index__column"));
    const handleScroll = (index: number) => (event: Event) => {
      const column = event.currentTarget as HTMLElement;
      setScrollOffsets((current) => {
        if (current[index] === column.scrollTop) {
          return current;
        }

        const next = [...current];
        next[index] = column.scrollTop;
        return next;
      });
    };

    const listeners = columns.map((column, index) => {
      const onScroll = handleScroll(index);
      column.addEventListener("scroll", onScroll);
      return { column, onScroll };
    });

    return () => {
      listeners.forEach(({ column, onScroll }) => {
        column.removeEventListener("scroll", onScroll);
      });
    };
  }, []);

  useEffect(() => {
    const navOpacity = Math.max(0, 1 - scrollOffsets[2] / 96);
    const identityOpacity = Math.max(0, 1 - scrollOffsets[0] / 96);
    document.documentElement.style.setProperty("--services-nav-opacity", String(navOpacity));
    document.documentElement.style.setProperty("--services-identity-opacity", String(identityOpacity));

    return () => {
      document.documentElement.style.removeProperty("--services-nav-opacity");
      document.documentElement.style.removeProperty("--services-identity-opacity");
    };
  }, [scrollOffsets]);

  const dividerOffsets = [
    scrollOffsets[0],
    Math.max(scrollOffsets[0], scrollOffsets[1]),
    Math.max(scrollOffsets[1], scrollOffsets[2]),
    scrollOffsets[2],
  ];

  return (
    <section
      ref={gridRef}
      className="services-index__grid"
      aria-label="Services"
    >
      {children}
      {dividerOffsets.map((offset, index) => (
        <span
          aria-hidden="true"
          className={`services-index__divider services-index__divider--${index + 1}`}
          key={index}
          style={{ transform: `translateY(-${offset}px)` }}
        />
      ))}
    </section>
  );
}
