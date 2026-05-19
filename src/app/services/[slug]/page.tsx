import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotographyServicePage } from "@/components/photography-service-page";
import { SmallBusinessConsultingPage } from "@/components/small-business-consulting-page";
import { SplitShell } from "@/components/split-shell";
import { UXUIConsultingPage } from "@/components/ux-ui-consulting-page";
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

  if (service.slug === "ux-ui-consulting") {
    return (
      <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
        <UXUIConsultingPage service={service} />
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

  if (service.slug === "small-business-consulting") {
    return (
      <SplitShell activePath="/services" rightPanelClassName="split-page__right--detail">
        <SmallBusinessConsultingPage service={service} />
      </SplitShell>
    );
  }

  notFound();
}
