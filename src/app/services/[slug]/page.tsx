import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
      <div className="service-detail-page">
        <div className="website-detail-top">
          <Link href="/services" className="website-detail-back">
            <span className="website-detail-back__arrow" aria-hidden="true" />
            <span>Back</span>
          </Link>

          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">{service.detailTitle}</h1>
              </div>
              <div className="website-detail-heading__column" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </SplitShell>
  );
}
