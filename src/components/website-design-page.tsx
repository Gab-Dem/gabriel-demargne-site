"use client";

import type { ReactNode } from "react";
import Image from "next/image";
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

type WebsiteObjective = {
  title: string;
  copy: string;
  icon: ReactNode;
};

const objectives: readonly WebsiteObjective[] = [
  {
    title: "Clarity",
    copy:
      "Making offers easier to understand through clearer structure, hierarchy, navigation, and content direction.",
    icon: <StructureIcon />,
  },
  {
    title: "Credibility",
    copy:
      "Building trust through design direction, visual restraint, image use, and the placement of proof.",
    icon: <CredibilityIcon />,
  },
  {
    title: "Usability",
    copy:
      "Making information easier to find and actions easier to take across desktop and mobile.",
    icon: <UsabilityIcon />,
  },
  {
    title: "Delivery",
    copy:
      "Designing, building, and refining sites as practical working tools.",
    icon: <DeliveryIcon />,
  },
];

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
          <section className="ux-research-section website-objectives-section">
            <h2 className="ux-research-section__title">Design Objectives</h2>
            <div className="ux-research-objectives website-objectives">
              {objectives.map((objective) => (
                <article key={objective.title} className="ux-research-card">
                  <div className="ux-research-card__icon" aria-hidden="true">
                    {objective.icon}
                  </div>
                  <div className="ux-research-card__body">
                    <h3 className="ux-research-card__title">{objective.title}</h3>
                    <p className="ux-research-card__copy">{objective.copy}</p>
                  </div>
                </article>
              ))}
            </div>
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

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function StructureIcon() {
  return (
    <IconFrame>
      <rect
        x="12"
        y="14"
        width="40"
        height="36"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M12 25h40" stroke="currentColor" strokeWidth="1.8" />
      <path d="M25 25v25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18 20h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 34h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 41h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function CredibilityIcon() {
  return (
    <IconFrame>
      <path
        d="M32 9 50 17v13c0 12.5-7.3 20.7-18 25-10.7-4.3-18-12.5-18-25V17l18-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m24 32 5 5 12-13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}

function UsabilityIcon() {
  return (
    <IconFrame>
      <rect
        x="13"
        y="11"
        width="38"
        height="42"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M22 22h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 31h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m38 40 6 3-4 2 3 6-3 1-3-6-4 4v-11l5 1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}

function DeliveryIcon() {
  return (
    <IconFrame>
      <path
        d="M13 38 32 12l19 26"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 38h22v13H21V38Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M27 44h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}
