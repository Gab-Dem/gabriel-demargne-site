import type { Metadata } from "next";
import { MobileHomeNav } from "@/components/mobile-home-nav";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SplitShell } from "@/components/split-shell";
import { contactEmailHref, homeProfile } from "@/data/site";

export const metadata: Metadata = {
  title: "Creative Consulting",
  description: "Services offered by Gabriel Demargne.",
};

export default function HomePage() {
  return (
    <SplitShell
      leftLowerContent={
        <>
          <div className="mobile-home-nav-shell">
            <MobileHomeNav />
          </div>
          <div className="desktop-service-nav-shell">
            <ServiceGlobalNav />
          </div>
        </>
      }
      mobileMode="home"
      rightPanelClassName="split-page__right--detail"
    >
      <div className="right-content right-content--detail-topless services-home-layout">
        <div className="website-detail-top">
          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">Experiences</h1>
              </div>
              <div className="website-detail-heading__column website-detail-heading__column--contact">
                <a
                  href={`${contactEmailHref}?subject=Request%20CV&body=Hi%20Gabriel%2C%0A%0AI%27d%20like%20to%20request%20your%20CV.%0A%0AThanks%2C`}
                  className="desktop-detail-contact-link"
                >
                  Request CV
                  <span className="desktop-detail-contact-link__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="website-detail-content website-detail-content--body">
          <section className="home-cv" aria-label="Gabriel Demargne profile">
            <div className="home-cv__sheet">
              <div className="home-cv__experience">
              {homeProfile.experience.map((item) => (
                <article key={`${item.period}-${item.title}`} className="home-cv__experience-item">
                  <div className="home-cv__experience-side">
                    <h3 className="home-cv__experience-title">{item.title}</h3>
                    <p className="home-cv__experience-period">{item.period}</p>
                  </div>
                  <div className="home-cv__experience-body">
                    <div className="home-cv__experience-meta">
                      <p className="home-cv__experience-organisation">{item.organisation}</p>
                    </div>
                    <p className="home-cv__experience-copy">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-cv__languages-inline">
              <p className="home-cv__languages-label">Languages</p>
              <p className="home-cv__languages-copy">{homeProfile.languages.join(", ")}</p>
            </div>
            </div>
          </section>
        </div>
      </div>
    </SplitShell>
  );
}
