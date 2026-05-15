import type { Metadata } from "next";

const arrows = [
  "→",
  "➔",
  "➜",
  "➝",
  "➞",
  "➟",
  "➠",
  "➢",
  "➣",
  "➤",
  "➥",
  "➦",
  "➧",
  "➨",
  "➩",
  "➪",
  "➫",
  "➬",
  "➭",
  "➮",
  "➯",
  "⇢",
  "⇢",
  "⇨",
  "⟶",
  "⟹",
  "⟿",
  "↝",
  "↠",
  "☞",
  "☛",
  "☞",
  "☚",
];

export const metadata: Metadata = {
  title: "Arrow Reference",
  description: "Numbered arrow reference for navigation marker selection.",
};

export default function ArrowReferencePage() {
  return (
    <main className="arrow-page">
      <header className="arrow-page__header">
        <p className="arrow-page__eyebrow">Reference</p>
        <h1>Arrow options</h1>
        <p>Pick a number and I’ll swap the active navigation marker.</p>
      </header>

      <div className="arrow-grid">
        {arrows.map((arrow, index) => (
          <div key={`${arrow}-${index + 1}`} className="arrow-swatch">
            <p className="arrow-swatch__index">{index + 1}</p>
            <p className="arrow-swatch__glyph" aria-label={`Arrow ${index + 1}`}>
              {arrow}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
