import Link from "next/link";
import { AdaptiveIntroParagraph } from "@/components/adaptive-intro-paragraph";

export function ServiceDetailHeader({
  title,
  services,
  intro,
  ariaLabel,
}: {
  title: string;
  services: readonly string[];
  intro: string;
  ariaLabel: string;
}) {
  return (
    <div className="website-detail-top">
      <div className="website-detail-nav">
        <Link href="/services" className="website-detail-back">
          <span className="website-detail-back__arrow" aria-hidden="true" />
          <span>Back</span>
        </Link>

        <Link href="/contact" className="website-detail-contact">
          <span>Get in touch</span>
        </Link>
      </div>

      <div className="website-detail-content">
        <div className="website-detail-heading">
          <div className="website-detail-heading__column">
            <h1 className="website-detail-title">{title}</h1>
          </div>
          <div className="website-detail-heading__column" aria-hidden="true" />
        </div>

        <section className="website-detail-services" aria-label={ariaLabel}>
          <div className="website-detail-services__row">
            {services.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <hr className="website-detail-services__rule" />
          <AdaptiveIntroParagraph className="website-detail-subtitle">
            {intro}
          </AdaptiveIntroParagraph>
        </section>
      </div>
    </div>
  );
}
