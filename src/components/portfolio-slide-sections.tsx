import Image from "next/image";
import type { UxPortfolioSlideSection } from "@/data/ux-portfolio";

export function PortfolioSlideSections({
  sections,
}: {
  sections: readonly UxPortfolioSlideSection[];
}) {
  return (
    <section
      className="watchlist-artifact watchlist-artifact--template"
      aria-label="Portfolio visual sequence"
    >
      {sections.map((section) => {
        const assets = section.assets ?? [];
        const columnCount = Math.min(Math.max(assets.length, 1), 3);

        return (
          <section className="watchlist-template__section" key={section.title}>
            {assets.length ? (
              <div
                className={`watchlist-template__artifacts watchlist-template__artifacts--${columnCount}`}
                aria-label={`${section.title} visual${assets.length > 1 ? "s" : ""}`}
              >
                {assets.map((asset, index) =>
                  asset.src && asset.alt ? (
                    <div
                      className="watchlist-template__artifact-media"
                      key={`${asset.src}-${index}`}
                    >
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        width={asset.width ?? 1600}
                        height={asset.height ?? 900}
                        sizes={
                          assets.length === 1
                            ? "(max-width: 800px) 100vw, 60vw"
                            : `(max-width: 800px) 100vw, ${Math.round(60 / assets.length)}vw`
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className="watchlist-template__artifact watchlist-template__artifact--planned"
                      key={`${asset.placeholder ?? "Planned visual"}-${index}`}
                    >
                      <span>{asset.placeholder ?? "Planned visual"}</span>
                    </div>
                  ),
                )}
              </div>
            ) : null}
            <div className="watchlist-template__caption">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          </section>
        );
      })}
    </section>
  );
}
