import type { Metadata } from "next";
import Image from "next/image";
import { MobileHomeNav } from "@/components/mobile-home-nav";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SplitShell } from "@/components/split-shell";
import { site } from "@/data/site";

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
                <p className="services-home__site-name">{site.name}</p>
                <h1 className="website-detail-title">Creative Consulting</h1>
                <p className="services-home__intro">
                  Website Design, UX / UI, Research, Strategy, and Photography,
                  offered through one independent practice.
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
