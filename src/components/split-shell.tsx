import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function SplitShell({
  rightTitle,
  rightPanelClassName,
  leftLowerContent,
  children,
}: {
  rightTitle?: string;
  rightPanelClassName?: string;
  leftLowerContent?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="split-page">
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
        {rightTitle ? <h1 className="right-title">{rightTitle}</h1> : null}
        {children}
      </section>
    </main>
  );
}
