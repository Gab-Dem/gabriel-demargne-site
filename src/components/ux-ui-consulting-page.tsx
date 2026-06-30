import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceDetailHeader } from "@/components/service-detail-header";

type UXUIConsultingService = {
  detailTitle: string;
  detailServices: readonly string[];
  intro: string;
};

type ConsultingFocus = {
  title: string;
  copy: string;
  icon: ReactNode;
};

type ConsultingMethod = {
  title: string;
  copy: string;
  icon: ReactNode;
};

const focusAreas: readonly ConsultingFocus[] = [
  {
    title: "Clarify the journey",
    copy:
      "Map how people move through a product or website, where decisions happen, and what each stage needs to communicate clearly.",
    icon: <FlowIcon />,
  },
  {
    title: "Structure the interface",
    copy:
      "Define layout, hierarchy, navigation, and interaction patterns so the experience feels coherent and easy to use.",
    icon: <InterfaceIcon />,
  },
  {
    title: "Connect design and build",
    copy:
      "Translate UX decisions into practical frontend direction that can be implemented, tested, and maintained.",
    icon: <BuildIcon />,
  },
  {
    title: "Test through prototypes",
    copy:
      "Create or refine prototypes that make interaction decisions tangible enough to review before committing to a full build.",
    icon: <PrototypeIcon />,
  },
];

const methods: readonly ConsultingMethod[] = [
  {
    title: "User Flows",
    copy:
      "Structuring routes, states, decision points, and key actions so the experience has a clear path through it.",
    icon: <RouteIcon />,
  },
  {
    title: "Information Architecture",
    copy:
      "Organising content, navigation, and decision paths so important screens are easier to understand.",
    icon: <ScreenIcon />,
  },
  {
    title: "Frontend Collaboration",
    copy:
      "Working close to implementation so design decisions remain practical, consistent, and grounded in the real system.",
    icon: <CollaborationIcon />,
  },
  {
    title: "Prototype Review",
    copy:
      "Reviewing early builds or prototypes to identify friction, missing states, and opportunities to simplify the experience.",
    icon: <ReviewIcon />,
  },
];

export function UXUIConsultingPage({
  service,
  contactHref,
  showPortfolioLink = true,
  introLink,
}: {
  service: UXUIConsultingService;
  contactHref: string;
  showPortfolioLink?: boolean;
  introLink?: {
    href: string;
    title: string;
  };
}) {
  const resolvedIntroLink = introLink ?? (
    showPortfolioLink
      ? {
          href: "/ux-portfolio",
          title: "UX Portfolio",
        }
      : undefined
  );

  return (
    <div className="right-content right-content--detail-topless">
      <div className="ux-research-page">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro={service.intro}
          ariaLabel="UX design services"
          contactHref={contactHref}
        />

        <div className="website-detail-content website-detail-content--body">
          {resolvedIntroLink ? (
            <div className="contact-page__links ux-ui-consulting-page__portfolio-link">
              <Link href={resolvedIntroLink.href} className="contact-page__link-block">
                <h2 className="contact-page__link-title ux-ui-consulting-page__portfolio-title">
                  <span>{resolvedIntroLink.title}</span>
                  <span className="ux-ui-consulting-page__portfolio-arrow" aria-hidden="true">
                    →
                  </span>
                </h2>
              </Link>
            </div>
          ) : null}

          <section className="ux-research-section" id="consulting-focus">
            <h2 className="ux-research-section__title">Consulting Focus</h2>
            <div className="ux-research-objectives">
              {focusAreas.map((area) => (
                <article key={area.title} className="ux-research-card">
                  <div className="ux-research-card__icon" aria-hidden="true">
                    {area.icon}
                  </div>
                  <div className="ux-research-card__body">
                    <h3 className="ux-research-card__title">{area.title}</h3>
                    <p className="ux-research-card__copy">{area.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="ux-research-section ux-research-section--methods">
            <h2 className="ux-research-section__title">Design Methods</h2>
            <div className="ux-research-methods" role="list">
              {methods.map((method) => (
                <article
                  key={method.title}
                  className="ux-research-method"
                  role="listitem"
                >
                  <div className="ux-research-method__summary">
                    <div className="ux-research-method__icon" aria-hidden="true">
                      {method.icon}
                    </div>
                    <div className="ux-research-method__body">
                      <h3 className="ux-research-method__title">{method.title}</h3>
                      <p className="ux-research-method__copy">{method.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
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

function FlowIcon() {
  return (
    <IconFrame>
      <circle cx="15" cy="32" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="17" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="49" cy="32" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="48" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19 29 28 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36 20 45 29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M45 35 36 45" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 45 19 35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function InterfaceIcon() {
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
      <path d="M31 34h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 41h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function BuildIcon() {
  return (
    <IconFrame>
      <path
        d="m24 21-11 11 11 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m40 21 11 11-11 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M35 15 29 49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function PrototypeIcon() {
  return (
    <IconFrame>
      <rect
        x="16"
        y="10"
        width="32"
        height="44"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M24 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 29h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="24" y="38" width="16" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </IconFrame>
  );
}

function RouteIcon() {
  return (
    <IconFrame>
      <path
        d="M14 18h13c6 0 10 4 10 10s-4 10-10 10h-2c-5 0-8 3-8 7s3 7 8 7h25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="50" cy="52" r="4" stroke="currentColor" strokeWidth="1.8" />
    </IconFrame>
  );
}

function ScreenIcon() {
  return (
    <IconFrame>
      <rect
        x="12"
        y="16"
        width="40"
        height="25"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M24 49h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 41v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function CollaborationIcon() {
  return (
    <IconFrame>
      <circle cx="23" cy="23" r="7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="43" cy="25" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 49c0-7.18 5.82-13 13-13h1c7.18 0 13 5.82 13 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M38 48c0-4.418 3.582-8 8-8h1c3.314 0 6 2.686 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </IconFrame>
  );
}

function ReviewIcon() {
  return (
    <IconFrame>
      <rect
        x="13"
        y="13"
        width="38"
        height="38"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m23 33 6 6 13-15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}
