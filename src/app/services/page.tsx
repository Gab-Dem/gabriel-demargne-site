import type { Metadata } from "next";
import Image from "next/image";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by Gabriel Demargne.",
};

export default function ServicesPage() {
  return (
    <SplitShell
      leftLowerContent={<ServiceGlobalNav />}
      rightPanelClassName="split-page__right--detail"
    >
      <div className="right-content right-content--detail-topless services-home-layout">
        <div className="website-detail-top">
          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">Creative Consulting</h1>
                <p className="services-home__intro">
                  Websites, UX, research, strategy, and photography brought together
                  as a focused creative consulting offer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="services-home" aria-label="Creative consulting portrait">
          <div className="services-home__portrait">
            <Image
              src="/me-v3.jpeg"
              alt="Gabriel Demargne portrait"
              fill
              className="services-home__portrait-image"
              sizes="(max-width: 960px) 70vw, 28vw"
              priority
            />
          </div>
        </section>
      </div>
    </SplitShell>
  );
}
