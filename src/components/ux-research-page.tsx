import type { ReactNode } from "react";
import { ServiceDetailHeader } from "@/components/service-detail-header";

type UXResearchService = {
  detailTitle: string;
  detailServices: readonly string[];
};

type Objective = {
  title: string;
  copy: string;
  icon: ReactNode;
};

type Method = {
  title: string;
  copy: string;
  icon: ReactNode;
};

const objectives: readonly Objective[] = [
  {
    title: "Understand your users",
    copy:
      "Identify who your users are, what they need, what they are trying to achieve, and where friction appears in their experience.",
    icon: <UserIcon />,
  },
  {
    title: "Reduce friction",
    copy:
      "Identify the points where users hesitate, get confused, or drop off so the experience can be made clearer and easier to move through.",
    icon: <SpeechIcon />,
  },
  {
    title: "Map the market",
    copy:
      "Identify who your competitors are, how they position themselves, and what expectations already exist in your category.",
    icon: <ChartIcon />,
  },
  {
    title: "Find opportunities to stand out",
    copy:
      "Analyse competitor UX decisions, target audiences, positioning, and service gaps to define where your offer can be clearer or more distinct.",
    icon: <TargetIcon />,
  },
];

const methods: readonly Method[] = [
  {
    title: "User / Product Testing",
    copy:
      "Testing websites, products, or prototypes to identify usability issues and decision barriers.",
    icon: <ScreenIcon />,
  },
  {
    title: "User Interviews",
    copy:
      "Individual interviews or focus groups for deeper insight into needs, motivations, pain points, and expectations.",
    icon: <PeopleIcon />,
  },
  {
    title: "Surveys & Questionnaires",
    copy:
      "Online research to gather structured feedback from a broader audience.",
    icon: <SurveyIcon />,
  },
  {
    title: "Benchmarking",
    copy:
      "Mapping existing services, patterns, and standards to understand what users already encounter.",
    icon: <BenchmarkIcon />,
  },
  {
    title: "Competitor Analysis",
    copy:
      "Reviewing competitor positioning, UX decisions, content, structure, and service presentation.",
    icon: <SearchIcon />,
  },
];

export function UXResearchPage({
  service,
}: {
  service: UXResearchService;
}) {
  return (
    <div className="right-content right-content--detail-topless">
      <div className="ux-research-page">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro="UX research helps clarify how people experience your service, what they need, where they struggle, and how your offer compares within the wider market. Good research allows you to make informed product and service decisions."
          ariaLabel="UX research services"
        />

        <div className="website-detail-content website-detail-content--body">
          <section className="ux-research-section">
            <h2 className="ux-research-section__title">Research Objectives</h2>
            <div className="ux-research-objectives">
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

          <section className="ux-research-section ux-research-section--methods">
            <h2 className="ux-research-section__title">Research Methods</h2>
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

function UserIcon() {
  return (
    <IconFrame>
      <circle cx="32" cy="18" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M15 48c0-8.837 7.163-16 16-16h2c8.837 0 16 7.163 16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </IconFrame>
  );
}

function SpeechIcon() {
  return (
    <IconFrame>
      <path
        d="M17 17h24c8.284 0 15 6.716 15 15s-6.716 15-15 15H29l-10 8 2.834-8H21c-7.732 0-14-6.268-14-14V31c0-7.732 6.268-14 14-14Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="31" r="2.2" fill="currentColor" />
      <circle cx="32" cy="31" r="2.2" fill="currentColor" />
      <circle cx="40" cy="31" r="2.2" fill="currentColor" />
    </IconFrame>
  );
}

function ChartIcon() {
  return (
    <IconFrame>
      <circle cx="30" cy="31" r="18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M30 31V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M30 31h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M30 31 43 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function TargetIcon() {
  return (
    <IconFrame>
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1.8" />
      <path d="M32 9v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 45v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 32h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M45 32h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function PeopleIcon() {
  return (
    <IconFrame>
      <circle cx="24" cy="22" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 46c0-7.18 5.82-13 13-13h2c7.18 0 13 5.82 13 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="45" cy="24" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M39 46c0-4.418 3.582-8 8-8h1c2.762 0 5 2.238 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </IconFrame>
  );
}

function SurveyIcon() {
  return (
    <IconFrame>
      <rect
        x="16"
        y="10"
        width="30"
        height="44"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M24 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 32h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 43h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m20 20 1.8 1.8L25 18.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m20 31 1.8 1.8L25 29.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m20 42 1.8 1.8L25 40.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}

function BenchmarkIcon() {
  return (
    <IconFrame>
      <rect
        x="15"
        y="12"
        width="34"
        height="40"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M22 22h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 32h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 42h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M27 18v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36 28v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 38v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconFrame>
  );
}

function SearchIcon() {
  return (
    <IconFrame>
      <circle cx="28" cy="28" r="13" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m38 38 11 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </IconFrame>
  );
}
