import Link from "next/link";
import { contactEmailHref, services } from "@/data/site";

export function ServiceGlobalNav({
  selectedSlug,
  selectedPath,
}: {
  selectedSlug?: string;
  selectedPath?: string;
}) {
  const isContactActive = selectedPath === "/contact";

  return (
    <nav className="left-service-nav" aria-label="Services">
      <div className="left-service-nav__main">
        <h2 className="left-service-nav__title">Services</h2>
        <div className="left-service-nav__list">
          {services.map((service) => {
            const isActive = service.slug === selectedSlug;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`left-service-nav__item${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <h3 className="left-service-nav__item-title">{service.title}</h3>
                <p className="left-service-nav__item-copy">{service.copy}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <a
        href={contactEmailHref}
        className={`left-service-nav__contact${isContactActive ? " is-active" : ""}`}
        aria-current={isContactActive ? "page" : undefined}
      >
        <span className="left-service-nav__contact-title">
          <span>Get in touch</span>
          <span className="left-service-nav__contact-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </a>
    </nav>
  );
}
