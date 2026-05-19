import Link from "next/link";

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
      <Link href="/services" className="website-detail-back">
        <span className="website-detail-back__arrow" aria-hidden="true" />
        <span>Back</span>
      </Link>

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
          <p className="website-detail-subtitle">{intro}</p>
        </section>
      </div>
    </div>
  );
}
