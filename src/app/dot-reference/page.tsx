import type { Metadata } from "next";

const dots = [
  "•",
  "●",
  "⬤",
  "◉",
  "⦿",
  "∙",
  "⋅",
  "・",
  "◌",
  "○",
  "◍",
  "◎",
];

export const metadata: Metadata = {
  title: "Dot Reference",
  description: "Numbered dot reference for navigation marker selection.",
};

export default function DotReferencePage() {
  return (
    <main className="arrow-page">
      <header className="arrow-page__header">
        <p className="arrow-page__eyebrow">Reference</p>
        <h1>Dot options</h1>
        <p>Each option is shown at the actual navigation scale.</p>
      </header>

      <div className="dot-reference-list">
        {dots.map((dot, index) => (
          <div key={`${dot}-${index + 1}`} className="dot-reference-row">
            <p className="dot-reference-row__index">{index + 1}</p>
            <div className="dot-reference-nav">
              <span className="left-nav__arrow left-nav__arrow--preview">{dot}</span>
              <span className="dot-reference-nav__label">Services</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
