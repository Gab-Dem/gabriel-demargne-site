import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function SplitShell({
  rightTitle,
  rightPanelClassName,
  leftLowerContent,
  mobileMode,
  children,
}: {
  rightTitle?: string;
  rightPanelClassName?: string;
  leftLowerContent?: React.ReactNode;
  mobileMode?: "default" | "home" | "detail";
  children: React.ReactNode;
}) {
  const shellClassName = [
    "split-page",
    mobileMode ? `split-page--mobile-${mobileMode}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={shellClassName}>
      <section className="split-page__left">
        <div className="left-image-wrap">
          <Image
            src="/df5.png"
            alt=""
            width={1913}
            height={899}
            className="left-image"
            priority
          />
          <Link href="/services" className="left-title left-title--overlay">
            {site.name}
          </Link>
        </div>

        {leftLowerContent ? <div className="left-lower">{leftLowerContent}</div> : null}
      </section>

      <section
        className={rightPanelClassName ? `split-page__right ${rightPanelClassName}` : "split-page__right"}
      >
        {mobileMode === "detail" ? (
          <div className="mobile-back-strip">
            <Link href="/services" className="mobile-back-strip__link">
              <span aria-hidden="true">←</span>
              <span>Back</span>
            </Link>
          </div>
        ) : null}
        {rightTitle ? <h1 className="right-title">{rightTitle}</h1> : null}
        {children}
      </section>
    </main>
  );
}
