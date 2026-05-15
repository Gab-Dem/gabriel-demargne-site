"use client";

import Image from "next/image";
import { useState } from "react";

type WebsiteDesignService = {
  detailTitle: string;
  intro: string;
  functions?: readonly {
    title: string;
    copy: string;
    service: string;
  }[];
  examples?: readonly {
    title: string;
    copy: string;
    href: string;
    image: string;
    imagePosition?: string;
    imageFit?: "cover" | "contain";
  }[];
};

export function WebsiteDesignPage({
  service,
}: {
  service: WebsiteDesignService;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="right-content right-content--bottom right-content--website">
      <div className="website-detail-shell">
        <div className="website-detail-content">
          <div className="service-detail service-detail--website">
            <p className="service-detail__intro">{service.intro}</p>

            <section className="service-function-list">
              {service.functions?.map((item) => (
                <article key={item.title} className="service-function">
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                  <p>{item.service}</p>
                </article>
              ))}
            </section>
          </div>
        </div>
      </div>

      <div
        id="example-websites-overlay"
        className={`website-overlay ${isOpen ? "is-open" : ""}`}
      >
        <button
          type="button"
          className="website-overlay-trigger"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="example-websites-overlay"
          aria-label={isOpen ? "Close examples overlay" : "Open examples overlay"}
        >
          {isOpen ? (
            <span className="website-overlay-trigger__label">
              <span>Close</span>
              <span className="website-overlay-trigger__chevron" aria-hidden="true">
                ﹀
              </span>
            </span>
          ) : (
            <span className="website-overlay-trigger__label">
              <span className="website-overlay-trigger__chevron" aria-hidden="true">
                ︿
              </span>
              <span>View Examples</span>
            </span>
          )}
        </button>

        <div className="website-overlay__inner">
          <div className="service-example-grid">
            {service.examples?.map((example) => (
              <a
                key={example.title}
                href={example.href}
                target="_blank"
                rel="noreferrer"
                className="service-example-card service-card--hover-full"
              >
                <div className="service-example-card__media">
                  <Image
                    src={example.image}
                    alt=""
                    fill
                    className="service-example-card__image"
                    style={{
                      objectFit: example.imageFit ?? "cover",
                      ...(example.imagePosition ? { objectPosition: example.imagePosition } : {}),
                    }}
                  />
                </div>
                <div className="service-example-card__body">
                  <div className="service-example-card__content">
                    <h3>{example.title}</h3>
                  </div>
                  <p className="service-example-card__copy">{example.copy}</p>
                </div>
                <span className="service-example-card__link">View site</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
