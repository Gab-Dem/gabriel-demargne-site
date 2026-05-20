import type { Metadata } from "next";

const fontOptions = [
  {
    name: "Arial",
    stack: "Arial, sans-serif",
    note: "Reliable baseline. Usually normal and bold only.",
  },
  {
    name: "Helvetica Neue",
    stack: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    note: "Often exposes lighter weights on macOS.",
  },
  {
    name: "Avenir Next",
    stack: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif',
    note: "Useful if installed locally. Wide weight range when available.",
  },
  {
    name: "SF Pro / System",
    stack:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif',
    note: "Apple system stack. Good range and clean rendering on Mac.",
  },
  {
    name: "Helvetica",
    stack: "Helvetica, Arial, sans-serif",
    note: "Classic fallback if Helvetica is present locally.",
  },
  {
    name: "Gill Sans",
    stack: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
    note: "More characterful, but depends on local availability.",
  },
] as const;

const weights = [200, 300, 400, 500, 600, 700] as const;
const sampleTitle = "Creative Consulting";
const sampleBody =
  "Position and strategy consulting for creative businesses, with emphasis on clarity, structure, and how the offer is presented.";

export const metadata: Metadata = {
  title: "Font Reference",
  description: "Reference page for comparing non-serif font stacks and weights.",
};

export default function FontReferencePage() {
  return (
    <main className="font-reference-page">
      <header className="font-reference-page__header">
        <p className="font-reference-page__eyebrow">Reference</p>
        <h1>Font options</h1>
        <p>
          Each block uses a local non-serif font stack. If a font is not
          installed, the browser falls through to the next family in the stack.
        </p>
      </header>

      <div className="font-reference-list">
        {fontOptions.map((option) => (
          <section key={option.name} className="font-reference-card">
            <div className="font-reference-card__meta">
              <h2>{option.name}</h2>
              <p>{option.note}</p>
              <code>{option.stack}</code>
            </div>

            <div
              className="font-reference-card__samples"
              style={{ fontFamily: option.stack }}
            >
              {weights.map((weight) => (
                <article key={weight} className="font-reference-sample">
                  <p className="font-reference-sample__weight">{weight}</p>
                  <p
                    className="font-reference-sample__title"
                    style={{ fontWeight: weight }}
                  >
                    {sampleTitle}
                  </p>
                  <p className="font-reference-sample__body">{sampleBody}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
