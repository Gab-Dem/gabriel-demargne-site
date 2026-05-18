"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type WebsiteDesignService = {
  detailTitle: string;
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
        <div className="website-detail-top">
          <Link href="/services" className="website-detail-back">
            <span className="website-detail-back__arrow" aria-hidden="true" />
            <span>Back</span>
          </Link>

          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">{service.detailTitle}</h1>
                <p className="website-detail-subtitle">
                  Helping individuals, creatives and small businesses represent
                  themselves online, and making ideas, offers, and digital
                  experiences easier to understand, trust, and engage with,
                  including in more structured, complex, or multilingual
                  contexts.
                </p>
              </div>
              <div className="website-detail-heading__column" aria-hidden="true" />
            </div>

            <section className="website-detail-section">
              <div className="website-detail-section__grid">
                <div className="website-detail-section__column">
                  <h2 className="website-detail-section__title">Design Focus</h2>
                </div>
                <div className="website-detail-section__column website-detail-section__column--focus-list">
                  <div className="website-focus-list">
                    <article className="website-focus-item">
                      <h2 className="website-focus-item__title">Clarity</h2>
                      <div className="website-focus-item__copy">
                        <p>
                          Helping users understand what you offer, who it is
                          for, and what matters first through clear page
                          structure, hierarchy, navigation, and content
                          direction.
                        </p>
                      </div>
                    </article>

                    <article className="website-focus-item">
                      <h2 className="website-focus-item__title">Credibility</h2>
                      <div className="website-focus-item__copy">
                        <p>
                          Making a business feel more considered, trustworthy,
                          and easier to believe through design direction, visual
                          restraint, image use, and how proof is placed.
                        </p>
                      </div>
                    </article>

                    <article className="website-focus-item">
                      <h2 className="website-focus-item__title">Usability</h2>
                      <div className="website-focus-item__copy">
                        <p>
                          Making information easier to find and actions easier
                          to take across desktop and mobile through practical UX
                          decisions, page flow, and mobile behaviour.
                        </p>
                      </div>
                    </article>

                    <article className="website-focus-item">
                      <h2 className="website-focus-item__title">Delivery</h2>
                      <div className="website-focus-item__copy">
                        <p>
                          Designing, building, refining, and maintaining the
                          site as a real working tool, with room for
                          implementation, iteration, updates, and ongoing
                          refinement.
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
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
