import { notFound } from "next/navigation";
import Link from "next/link";
import { ServiceDetailHeader } from "@/components/service-detail-header";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SplitShell } from "@/components/split-shell";
import { getServiceBySlug } from "@/data/site";
import { uxPortfolioIntro } from "@/data/ux-portfolio";

export const dynamic = "force-dynamic";

export default function PortfolioLabPage() {
  const service = getServiceBySlug("ux-ui-consulting");

  if (!service) {
    notFound();
  }

  return (
    <SplitShell
      leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
      mobileMode="detail"
      rightPanelClassName="split-page__right--detail"
      contactHref="/contact?returnTo=%2Fportfolio-lab"
    >
      <div className="right-content right-content--detail-topless">
        <div className="ux-research-page">
          <ServiceDetailHeader
            title={uxPortfolioIntro.title}
            services={service.detailServices}
            intro={uxPortfolioIntro.description}
            ariaLabel="Portfolio lab workspace"
            contactHref="/contact?returnTo=%2Fportfolio-lab"
          />

          <div className="website-detail-content website-detail-content--body">
            <section className="portfolio-lab__panel">
              <div className="portfolio-lab__project-intro">
                <p className="portfolio-lab__eyebrow">{uxPortfolioIntro.eyebrow}</p>
                <p className="portfolio-lab__section-copy">
                  This route is intentionally stripped back so you can direct the structure
                  before any visual treatment is added.
                </p>
                <div className="portfolio-lab__prompt-list">
                  {uxPortfolioIntro.prompts.map((prompt) => (
                    <p key={prompt} className="portfolio-lab__prompt">
                      {prompt}
                    </p>
                  ))}
                </div>
                <p className="portfolio-lab__link">
                  <Link href="/portfolio-lab/ux-portfolio">Open the UX portfolio workspace</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </SplitShell>
  );
}
