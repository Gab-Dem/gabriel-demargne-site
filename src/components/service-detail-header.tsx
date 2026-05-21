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
      <div className="website-detail-content">
        <div className="website-detail-heading">
          <div className="website-detail-heading__column">
            <h1 className="website-detail-title">{title}</h1>
          </div>
          <div className="website-detail-heading__column website-detail-heading__column--contact">
            <Link href="/contact" className="desktop-detail-contact-link">
              Get in touch
              <span className="desktop-detail-contact-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
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
