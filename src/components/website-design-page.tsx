"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const offers = [
  {
    title: "New Builds",
    copy:
      "Designing and building new websites from the ground up, with attention to structure, content, visual direction, and practical implementation.",
  },
  {
    title: "Redesigns",
    copy:
      "Reworking an existing site when the offer, content, structure, or overall presentation no longer reflects the business clearly enough.",
  },
  {
    title: "Maintenance",
    copy:
      "Ongoing support for sites that need updates, refinements, additions, or a reliable person to keep things moving properly.",
  },
  {
    title: "System Improvements",
    copy:
      "Improving navigation, page structure, content hierarchy, or frontend behavior where the current site works, but not well enough.",
  },
  {
    title: "Analysis",
    copy:
      "Reviewing an existing website to identify what is unclear, where friction appears, and what should be changed before more time is spent building.",
  },
] as const;

export function WebsiteDesignPage({
  service,
  contactHref,
}: {
  service: WebsiteDesignService;
  contactHref: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [overlayBottomInset, setOverlayBottomInset] = useState(0);
  const dragStartYRef = useRef<number | null>(null);
  const dragMovedRef = useRef(false);

  useEffect(() => {
    function updateOverlayInset() {
      const viewport = window.visualViewport;

      if (!viewport) {
        setOverlayBottomInset(0);
        return;
      }

      const chromeInset = Math.max(
        0,
        Math.round(window.innerHeight - (viewport.height + viewport.offsetTop)),
      );

      setOverlayBottomInset(chromeInset);
    }

    updateOverlayInset();

    const viewport = window.visualViewport;

    if (!viewport) {
      return;
    }

    viewport.addEventListener("resize", updateOverlayInset);
    viewport.addEventListener("scroll", updateOverlayInset);
    window.addEventListener("resize", updateOverlayInset);

    return () => {
      viewport.removeEventListener("resize", updateOverlayInset);
      viewport.removeEventListener("scroll", updateOverlayInset);
      window.removeEventListener("resize", updateOverlayInset);
    };
  }, []);

  function handleTriggerPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse") {
      return;
    }

    dragStartYRef.current = event.clientY;
    dragMovedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleTriggerPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (dragStartYRef.current === null) {
      return;
    }

    const deltaY = event.clientY - dragStartYRef.current;
    const nextOffset = isOpen ? Math.max(0, deltaY) : Math.min(0, deltaY);

    if (Math.abs(nextOffset) > 6) {
      dragMovedRef.current = true;
    }

    setDragOffset(nextOffset);
  }

  function handleTriggerPointerEnd() {
    if (dragStartYRef.current === null) {
      return;
    }

    if (!isOpen && dragOffset < -40) {
      setIsOpen(true);
    } else if (isOpen && dragOffset > 40) {
      setIsOpen(false);
    }

    dragStartYRef.current = null;
    setDragOffset(0);

    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 0);
  }

  function handleTriggerClick() {
    if (dragMovedRef.current) {
      return;
    }

    setIsOpen((open) => !open);
  }

  return (
    <div className="right-content right-content--website">
      <div className="website-detail-shell">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro={service.intro}
          ariaLabel="Website design services"
          contactHref={contactHref}
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

          {offers.length ? (
            <section className="ux-research-section ux-research-section--methods">
              <h2 className="ux-research-section__title">Types of Work</h2>
              <div className="ux-research-methods" role="list">
                {offers.map((item) => (
                  <article
                    key={item.title}
                    className="ux-research-method"
                    role="listitem"
                  >
                    <div className="ux-research-method__summary">
                      <div className="ux-research-method__icon" aria-hidden="true">
                        <MethodIcon />
                      </div>
                      <div className="ux-research-method__body">
                        <h3 className="ux-research-method__title">{item.title}</h3>
                        <p className="ux-research-method__copy">{item.copy}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <div
        id="example-websites-overlay"
        className={`website-overlay ${isOpen ? "is-open" : ""}`}
        style={
          {
            "--website-overlay-drag-offset": `${dragOffset}px`,
            "--website-overlay-bottom-offset": `calc(56px + ${overlayBottomInset}px)`,
            "--website-overlay-trigger-safe-area": `${overlayBottomInset}px`,
          } as React.CSSProperties
        }
      >
        <button
          type="button"
          className="website-overlay-trigger"
          onClick={handleTriggerClick}
          onPointerDown={handleTriggerPointerDown}
          onPointerMove={handleTriggerPointerMove}
          onPointerUp={handleTriggerPointerEnd}
          onPointerCancel={handleTriggerPointerEnd}
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
                      <a
                        href={example.href}
                        target="_blank"
                        rel="noreferrer"
                        className="service-example-card__text-link"
                      >
                        View Site
                      </a>
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
      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m23 32 6 6 12-14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}

function MethodIcon() {
  return (
    <IconFrame>
      <rect
        x="13"
        y="14"
        width="38"
        height="36"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M13 24h38" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 33h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 41h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="19" r="1.8" fill="currentColor" />
      <circle cx="27" cy="19" r="1.8" fill="currentColor" />
    </IconFrame>
  );
}
