import Link from "next/link";
import { site, services } from "@/data/site";

const secondaryLinks = [
  { href: "/photography", label: "Photography Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileHomeNav() {
  return (
    <div className="mobile-home-nav" aria-label="Mobile homepage navigation">
      <Link href="/services" className="mobile-home-nav__name">
        {site.name}
      </Link>

      <nav className="mobile-home-nav__section" aria-label="Services">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="mobile-home-nav__link"
          >
            {service.title}
          </Link>
        ))}
      </nav>

      <nav className="mobile-home-nav__section" aria-label="Secondary links">
        {secondaryLinks.map((item) => (
          <Link key={item.href} href={item.href} className="mobile-home-nav__link">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
