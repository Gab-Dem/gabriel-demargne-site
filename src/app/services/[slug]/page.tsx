import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotographyServicePage } from "@/components/photography-service-page";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SmallBusinessConsultingPage } from "@/components/small-business-consulting-page";
import { SplitShell } from "@/components/split-shell";
import { UXUIConsultingPage } from "@/components/ux-ui-consulting-page";
import { UXResearchPage } from "@/components/ux-research-page";
import { WebsiteDesignPage } from "@/components/website-design-page";
import { contactEmailHref, getServiceBySlug, services } from "@/data/site";

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
  const contactHref = contactEmailHref;

  if (!service) {
    notFound();
  }

  if (service.slug === "website-design") {
    return (
      <SplitShell
        leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
        mobileMode="detail"
        rightPanelClassName="split-page__right--website"
        contactHref={contactHref}
      >
        <WebsiteDesignPage service={service} contactHref={contactHref} />
      </SplitShell>
    );
  }

  if (service.slug === "ux-research") {
    return (
      <SplitShell
        leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
        mobileMode="detail"
        rightPanelClassName="split-page__right--detail"
        contactHref={contactHref}
      >
        <UXResearchPage service={service} contactHref={contactHref} />
      </SplitShell>
    );
  }

  if (service.slug === "ux-ui-consulting") {
    return (
      <SplitShell
        leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
        mobileMode="detail"
        rightPanelClassName="split-page__right--detail"
        contactHref={contactHref}
      >
        <UXUIConsultingPage service={service} contactHref={contactHref} />
      </SplitShell>
    );
  }

  if (service.slug === "photography") {
    return (
      <SplitShell
        leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
        mobileMode="detail"
        rightPanelClassName="split-page__right--detail"
        contactHref={contactHref}
      >
        <PhotographyServicePage service={service} contactHref={contactHref} />
      </SplitShell>
    );
  }

  if (service.slug === "small-business-consulting") {
    return (
      <SplitShell
        leftLowerContent={<ServiceGlobalNav selectedSlug={service.slug} />}
        mobileMode="detail"
        rightPanelClassName="split-page__right--detail"
        contactHref={contactHref}
      >
        <SmallBusinessConsultingPage service={service} contactHref={contactHref} />
      </SplitShell>
    );
  }

  notFound();
}
