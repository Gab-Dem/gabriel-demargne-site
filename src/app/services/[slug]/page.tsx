import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotographyServicePage } from "@/components/photography-service-page";
import { ServiceDetailHeader } from "@/components/service-detail-header";
import { SplitShell } from "@/components/split-shell";
import { UXResearchPage } from "@/components/ux-research-page";
import { WebsiteDesignPage } from "@/components/website-design-page";
import { getServiceBySlug, services } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.detailTitle,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  if (service.slug === "website-design") {
    return (
      <SplitShell
        activePath="/services"
        rightPanelClassName="split-page__right--website"
      >
        <WebsiteDesignPage service={service} />
      </SplitShell>
    );
  }

  if (service.slug === "ux-research") {
    return (
      <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
        <UXResearchPage service={service} />
      </SplitShell>
    );
  }

  if (service.slug === "photography") {
    return (
      <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
        <PhotographyServicePage service={service} />
      </SplitShell>
    );
  }

  return (
    <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
      <div className="right-content right-content--detail-topless">
        <div className="service-detail-page">
          <ServiceDetailHeader
            title={service.detailTitle}
            services={service.detailServices}
            intro={service.intro}
            ariaLabel={`${service.detailTitle} services`}
          />

          <div className="service-detail">
            <section className="service-detail__section service-detail__section--benefits">
              <div className="service-detail__section-header">
                <h2 className="service-detail__label">What this includes</h2>
              </div>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="service-detail__section service-detail__section--benefits">
              <div className="service-detail__section-header">
                <h2 className="service-detail__label">Relevant experience</h2>
              </div>
              <ul>
                {service.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </SplitShell>
  );
}
