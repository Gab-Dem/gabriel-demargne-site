import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceDetailHeader } from "@/components/service-detail-header";

type SmallBusinessConsultingService = {
  detailTitle: string;
  detailServices: readonly string[];
  intro: string;
};

type ConsultingFocus = {
  title: string;
  copy: string;
  icon: ReactNode;
};

type ConsultingStep = {
  title: string;
  copy: string;
  icon: ReactNode;
};

const focusAreas: readonly ConsultingFocus[] = [
  {
    title: "Clarify the offer",
    copy:
      "Define what you do, who it is for, why it matters, and what needs to be easier for people to understand.",
    icon: <OfferIcon />,
  },
  {
    title: "Sharpen positioning",
    copy:
      "Identify how the business should be framed in relation to its audience, competitors, category, and real strengths.",
    icon: <PositionIcon />,
  },
  {
    title: "Shape the message",
    copy:
      "Turn loose ideas into clearer language, page priorities, service descriptions, and supporting proof.",
    icon: <MessageIcon />,
  },
  {
    title: "Connect strategy to action",
    copy:
      "Translate the thinking into practical decisions for websites, content, service structure, and next steps.",
    icon: <ActionIcon />,
  },
];

const steps: readonly ConsultingStep[] = [
  {
    title: "Offer Review",
    copy:
      "Reviewing the current service, proposition, website, and customer-facing material to identify what is unclear or underused.",
    icon: <ReviewIcon />,
  },
  {
    title: "Positioning Direction",
    copy:
      "Defining a clearer point of view for how the business should present itself and what should be emphasized.",
    icon: <CompassIcon />,
  },
  {
    title: "Competitive Analysis",
    copy:
      "Reviewing comparable businesses, services, messaging, and website structures to understand expectations and opportunities to stand out.",
    icon: <CompetitiveIcon />,
  },
  {
    title: "Messaging Structure",
    copy:
      "Organising the language, page sections, and service explanations so the offer becomes easier to scan and evaluate.",
    icon: <StructureIcon />,
  },
  {
    title: "Website Strategy",
    copy:
      "Connecting the business direction to practical website decisions, from navigation and content hierarchy to calls to action.",
    icon: <WebsiteIcon />,
  },
];

export function SmallBusinessConsultingPage({
  service,
}: {
  service: SmallBusinessConsultingService;
}) {
  return (
    <div className="right-content right-content--detail-topless">
      <div className="ux-research-page">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro={service.intro}
          ariaLabel="Small-business consulting services"
        />

        <div className="website-detail-content website-detail-content--body">
          <section className="ux-research-section">
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
            <h2 className="ux-research-section__title">How This Works</h2>
            <div className="ux-research-methods" role="list">
              {steps.map((step) => (
                <article
                  key={step.title}
                  className="ux-research-method"
                  role="listitem"
                >
                  <div className="ux-research-method__summary">
                    <div className="ux-research-method__icon" aria-hidden="true">
                      {step.icon}
                    </div>
                    <div className="ux-research-method__body">
                      <h3 className="ux-research-method__title">{step.title}</h3>
                      <p className="ux-research-method__copy">{step.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <Link href="/contact" className="ux-research-cta">
              <span className="ux-research-cta__content">
                <span className="ux-research-cta__label">Get in touch</span>
              </span>
            </Link>
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

function OfferIcon() {
  return (
    <IconFrame>
      <rect
        x="13"
        y="16"
        width="38"
        height="32"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M13 27h38" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 37h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 16v-4h14v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function PositionIcon() {
  return (
    <IconFrame>
      <circle cx="32" cy="32" r="17" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M32 9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 46v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 32h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M46 32h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function MessageIcon() {
  return (
    <IconFrame>
      <path
        d="M14 15h36v28H29l-11 8 3-8h-7V15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M23 25h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M23 33h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function ActionIcon() {
  return (
    <IconFrame>
      <path
        d="M15 47 49 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M32 13h17v17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 47h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function ReviewIcon() {
  return (
    <IconFrame>
      <rect
        x="17"
        y="10"
        width="30"
        height="44"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M24 22h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 31h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 40h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function CompassIcon() {
  return (
    <IconFrame>
      <circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m39 22-4 14-10 6 4-14 10-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="1.8" fill="currentColor" />
    </IconFrame>
  );
}

function CompetitiveIcon() {
  return (
    <IconFrame>
      <circle cx="27" cy="27" r="13" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m37 37 13 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M20 27h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M27 20v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M42 16h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
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
      <path d="M31 34h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 41h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function WebsiteIcon() {
  return (
    <IconFrame>
      <rect
        x="12"
        y="16"
        width="40"
        height="29"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M12 25h40" stroke="currentColor" strokeWidth="1.8" />
      <path d="M23 36h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 52h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 45v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}
