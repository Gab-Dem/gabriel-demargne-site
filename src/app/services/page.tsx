import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by Gabriel Demargne.",
};

export default function ServicesPage() {
  return (
    <SplitShell activePath="/services" rightTitle="Services">
      <div className="right-content right-content--bottom">
        <div className="service-stack">
          {services.map((service) => (
            <a
              key={service.title}
              href={`/services/${service.slug}`}
              className="service-card service-card--hover-full"
            >
              <h2 className="service-card__title">{service.title}</h2>
              <p className="service-card__copy">{service.copy}</p>
              <span className="service-card__link">
                Learn More
                <span className="service-card__link-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </SplitShell>
  );
}
