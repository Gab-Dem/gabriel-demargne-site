"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ServiceDetailHeader } from "@/components/service-detail-header";

type WebsiteDesignService = {
  detailTitle: string;
  detailServices: readonly string[];
  intro: string;
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
    <div className="right-content right-content--website">
      <div className="website-detail-shell">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro={service.intro}
          ariaLabel="Website design services"
        />

        <div className="website-detail-content website-detail-content--body">
          <section className="website-detail-section">
            <h2 className="website-detail-section__title">Design Objectives</h2>
            <div className="website-focus-list">
              <article className="website-focus-item">
                <h2 className="website-focus-item__title">Clarity</h2>
                <div className="website-focus-item__copy">
                  <p>
                    Making offers easier to understand through clearer
                    structure, hierarchy, navigation, and content direction.
                  </p>
                </div>
              </article>

              <article className="website-focus-item">
                <h2 className="website-focus-item__title">Credibility</h2>
                <div className="website-focus-item__copy">
                  <p>
                    Building trust through design direction, visual restraint,
                    image use, and the placement of proof.
                  </p>
                </div>
              </article>

              <article className="website-focus-item">
                <h2 className="website-focus-item__title">Usability</h2>
                <div className="website-focus-item__copy">
                  <p>
                    Making information easier to find and actions easier to
                    take across desktop and mobile.
                  </p>
                </div>
              </article>

              <article className="website-focus-item">
                <h2 className="website-focus-item__title">Delivery</h2>
                <div className="website-focus-item__copy">
                  <p>
                    Designing, building, and refining sites as practical
                    working tools.
                  </p>
                </div>
              </article>
            </div>
            <Link href="/contact" className="website-detail-cta">
              <h2 className="website-detail-cta__label">Start an enquiry</h2>
              <span aria-hidden="true">→</span>
            </Link>
          </section>
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
          <h2 className="website-overlay__title">Example Projects</h2>
          <div className="website-overlay__examples">
            <div className="service-example-grid">
              {service.examples?.map((example) => (
                <article
                  key={example.title}
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
                  <a
                    href={example.href}
                    target="_blank"
                    rel="noreferrer"
                    className="service-example-card__link"
                  >
                    Visit
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
