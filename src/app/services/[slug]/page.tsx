import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SplitShell } from "@/components/split-shell";
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
        rightTitle={service.detailTitle}
        rightPanelClassName="split-page__right--website"
      >
        <WebsiteDesignPage service={service} />
      </SplitShell>
    );
  }

  return (
    <SplitShell activePath="/services" rightTitle={service.detailTitle}>
      <div className="right-content">
        <div className="service-detail">
          <p className="service-detail__intro">{service.intro}</p>

          <section className="service-detail__section">
            <h2>What this includes</h2>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="service-detail__section">
            <h2>Relevant experience</h2>
            <ul>
              {service.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SplitShell>
  );
}
