"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { UxPortfolioWorkspaceStage } from "@/data/ux-portfolio";

export function UXPortfolioWorkspace({
  stages,
}: {
  stages: readonly UxPortfolioWorkspaceStage[];
}) {
  const [selectedSlug, setSelectedSlug] = useState(stages[0]?.slug ?? "");
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const selectedIndex = stages.findIndex((stage) => stage.slug === selectedSlug);
  const resolvedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const selectedStage = stages[resolvedIndex] ?? null;
  const previousStage = resolvedIndex > 0 ? stages[resolvedIndex - 1] : null;
  const nextStage = resolvedIndex < stages.length - 1 ? stages[resolvedIndex + 1] : null;
  const canExpandImage = selectedStage?.allowExpand !== false;

  if (!selectedStage) {
    return null;
  }

  return (
    <main className="ux-portfolio-workspace">
      <header className="ux-portfolio-workspace__header">
        <Link href="/" className="ux-portfolio-workspace__back-link">
          <span aria-hidden="true">←</span>
          <span>Home</span>
        </Link>
        <h1 className="ux-portfolio-workspace__title">UX Portfolio</h1>
        <div aria-hidden="true" className="ux-portfolio-workspace__header-spacer" />
      </header>

      <div className="ux-portfolio-workspace__body">
        <aside className="ux-portfolio-workspace__column ux-portfolio-workspace__column--index">
          <h2 className="ux-portfolio-workspace__column-title ux-portfolio-workspace__column-title--index">
            Index
          </h2>
          <div className="ux-portfolio-workspace__index-block">
            <nav aria-label="Portfolio stages" className="ux-portfolio-workspace__index">
              {stages.map((stage) => {
                const isActive = stage.slug === selectedStage.slug;

                return (
                  <button
                    key={stage.slug}
                    type="button"
                    className={
                      isActive
                        ? "ux-portfolio-workspace__index-item ux-portfolio-workspace__index-item--active"
                        : "ux-portfolio-workspace__index-item"
                    }
                    onClick={() => setSelectedSlug(stage.slug)}
                  >
                    <StageLabel label={stage.label} />
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="ux-portfolio-workspace__column ux-portfolio-workspace__column--main">
          <div className="ux-portfolio-workspace__image-nav" aria-label="Stage navigation">
            <button
              type="button"
              className="ux-portfolio-workspace__image-nav-button"
              onClick={() => previousStage && setSelectedSlug(previousStage.slug)}
              disabled={!previousStage}
              aria-label={previousStage ? `Previous: ${previousStage.title}` : "Previous stage unavailable"}
            >
              ←
            </button>
            <div className="ux-portfolio-workspace__image-nav-title">
              {getNavTitle(selectedStage.label)}
            </div>
            <button
              type="button"
              className="ux-portfolio-workspace__image-nav-button"
              onClick={() => nextStage && setSelectedSlug(nextStage.slug)}
              disabled={!nextStage}
              aria-label={nextStage ? `Next: ${nextStage.title}` : "Next stage unavailable"}
            >
              →
            </button>
          </div>
          {canExpandImage ? (
            <button
              type="button"
              className="ux-portfolio-workspace__image-stage"
              onClick={() => setIsImageExpanded(true)}
              aria-label={`Expand image for ${selectedStage.title}`}
            >
              <Image
                src={selectedStage.imageSrc}
                alt={selectedStage.imageAlt}
                width={1600}
                height={900}
                sizes="(max-width: 800px) 100vw, 60vw"
                className="ux-portfolio-workspace__image"
              />
            </button>
          ) : (
            <div className="ux-portfolio-workspace__image-stage">
              <Image
                src={selectedStage.imageSrc}
                alt={selectedStage.imageAlt}
                width={1600}
                height={900}
                sizes="(max-width: 800px) 100vw, 60vw"
                className="ux-portfolio-workspace__image"
              />
            </div>
          )}
          <div className="ux-portfolio-workspace__image-divider" aria-hidden="true" />
          <div className="ux-portfolio-workspace__critical">
            <h2 className="ux-portfolio-workspace__critical-title">{selectedStage.title}</h2>
            <div className="ux-portfolio-workspace__critical-copy-wrap">
              <StageCopy text={selectedStage.criticalText} />
            </div>
          </div>
        </section>

        <aside className="ux-portfolio-workspace__column ux-portfolio-workspace__column--notes">
          <h2 className="ux-portfolio-workspace__column-title ux-portfolio-workspace__column-title--notes">
            Notes
          </h2>
          <div className="ux-portfolio-workspace__notes">
            {selectedStage.notes.map((note) => (
              <p key={note} className="ux-portfolio-workspace__note">
                {note}
              </p>
            ))}
          </div>
        </aside>
      </div>

      {isImageExpanded && canExpandImage ? (
        <div
          className="ux-portfolio-workspace__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedStage.title} expanded image`}
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            type="button"
            className="ux-portfolio-workspace__lightbox-close"
            onClick={() => setIsImageExpanded(false)}
            aria-label="Close expanded image"
          >
            Close
          </button>
          <div
            className="ux-portfolio-workspace__lightbox-image-wrap"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedStage.imageSrc}
              alt={selectedStage.imageAlt}
              width={2400}
              height={1600}
              sizes="100vw"
              className="ux-portfolio-workspace__lightbox-image"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

function StageLabel({ label }: { label: string }) {
  const match = label.match(/^(.*?)(\s*(\[[^\]]+\]))$/);

  if (!match) {
    return <span className="ux-portfolio-workspace__index-main">{label}</span>;
  }

  const main = match[1].trimEnd();
  const tag = match[3];

  return (
    <>
      <span className="ux-portfolio-workspace__index-main">{main} </span>
      <span className="ux-portfolio-workspace__index-tag">{tag}</span>
    </>
  );
}

function getNavTitle(label: string) {
  return label.replace(/\s*\[[^\]]+\]\s*$/, "").trim();
}

function StageCopy({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return <p className="ux-portfolio-workspace__critical-copy">{text}</p>;
  }

  return (
    <div className="ux-portfolio-workspace__critical-copy-group">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="ux-portfolio-workspace__critical-copy"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
