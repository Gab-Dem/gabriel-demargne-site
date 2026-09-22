"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PhotographyReviewItem } from "@/lib/photography-review";

type SaveState = "saved" | "saving" | "error";

export function PhotographyReviewBoard({
  photos,
  initialRemoved,
}: {
  photos: readonly PhotographyReviewItem[];
  initialRemoved: readonly string[];
}) {
  const [removed, setRemoved] = useState(() => new Set(initialRemoved));
  const [selectedOnly, setSelectedOnly] = useState(false);
  const [collection, setCollection] = useState("all");
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const initialRender = useRef(true);

  const collections = useMemo(
    () => [...new Set(photos.map((photo) => photo.collection))],
    [photos],
  );
  const visiblePhotos = photos.filter((photo) => {
    if (collection !== "all" && photo.collection !== collection) return false;
    return !selectedOnly || removed.has(photo.src);
  });
  const visibleSections = (["Places", "Projects"] as const).map((section) => ({
    section,
    collections: collections
      .map((name) => ({
        name,
        photos: visiblePhotos.filter((photo) => photo.section === section && photo.collection === name),
      }))
      .filter((group) => group.photos.length),
  })).filter((group) => group.collections.length);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setSaveState("saving");
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/photography-review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ removed: [...removed] }),
        });
        setSaveState(response.ok ? "saved" : "error");
      } catch {
        setSaveState("error");
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [removed]);

  const togglePhoto = (src: string) => {
    setRemoved((current) => {
      const next = new Set(current);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  };

  const copyList = async () => {
    await navigator.clipboard.writeText([...removed].sort().join("\n"));
  };

  return (
    <div className="photography-review-board">
      <div className="photography-review-toolbar">
        <div>
          <strong>{removed.size} marked for removal</strong>
          <span aria-live="polite">
            {saveState === "saving" ? "Saving…" : saveState === "error" ? "Could not save" : "Saved"}
          </span>
        </div>

        <label>
          <span>Collection</span>
          <select value={collection} onChange={(event) => setCollection(event.target.value)}>
            <option value="all">All collections</option>
            {collections.map((name) => <option value={name} key={name}>{name}</option>)}
          </select>
        </label>

        <button type="button" aria-pressed={selectedOnly} onClick={() => setSelectedOnly((value) => !value)}>
          {selectedOnly ? "Show all" : "Show marked only"}
        </button>
        <button type="button" disabled={!removed.size} onClick={copyList}>Copy list</button>
        <button type="button" disabled={!removed.size} onClick={() => setRemoved(new Set())}>Clear</button>
      </div>

      <p className="photography-review-count">Showing {visiblePhotos.length} of {photos.length} photographs</p>

      <div className="photography-review-sections">
        {visibleSections.map(({ section, collections: sectionCollections }) => (
          <section className="photography-review-section" key={section}>
            <h2>{section}</h2>
            {sectionCollections.map((group) => (
              <section className="photography-review-collection" key={group.name}>
                <h3>{group.name}</h3>
                <div className="photography-review-grid">
                  {group.photos.map((photo) => {
                    const isRemoved = removed.has(photo.src);
                    return (
                      <button
                        type="button"
                        className={`photography-review-card${isRemoved ? " is-removed" : ""}`}
                        aria-pressed={isRemoved}
                        aria-label={`${isRemoved ? "Keep" : "Mark for removal"}: ${photo.filename}`}
                        onClick={() => togglePhoto(photo.src)}
                        key={photo.src}
                      >
                        <span className="photography-review-card__image">
                          {/* Native lazy loading keeps the 166-image review page responsive. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.src} alt="" loading="lazy" />
                          <span className="photography-review-card__overlay" aria-hidden="true" />
                          <span className="photography-review-card__state">
                            {isRemoved ? "✓ Marked for removal" : ""}
                          </span>
                        </span>
                        <span className="photography-review-card__caption">
                          <small>{photo.filename}</small>
                          <strong>{isRemoved ? "Marked for removal — click to keep" : "Mark for removal"}</strong>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
