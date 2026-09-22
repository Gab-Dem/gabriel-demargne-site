import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobilePageBack } from "@/components/mobile-page-back";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { SiteDesktopIdentity } from "@/components/site-desktop-identity";
import { ServicesScrollGrid } from "@/components/services-scroll-grid";
import { contactEmailHref } from "@/data/site";

const websiteServices = [
  {
    title: "New Builds",
    copy: "Designing and building new websites from the ground up, with attention to structure, content, visual direction, and practical implementation.",
  },
  {
    title: "Redesigns",
    copy: "Reworking an existing site when the offer, content, structure, or overall presentation no longer reflects the business clearly enough.",
  },
  {
    title: "Maintenance",
    copy: "Ongoing support for sites that need updates, refinements, additions, or a reliable person to keep things moving properly.",
  },
  {
    title: "System Improvements",
    copy: "Improving navigation, page structure, content hierarchy, or frontend behaviour where the current site works, but not well enough.",
  },
  {
    title: "Analysis",
    copy: "Reviewing an existing website to identify what is unclear, where friction appears, and what should be changed before more time is spent building.",
  },
] as const;

const photographySections = [
  {
    title: "Outdoors Editorial",
    copy: "Editorial outdoor photography focused on place, atmosphere, landscape, travel, and the quiet traces of human presence.",
    href: "/photography",
  },
  {
    title: "Sports",
    copy: "Editorial sport photography focused on movement, competition, live events, cycling culture, and event atmosphere.",
    href: "/photography/projects/road-race",
  },
  {
    title: "Wedding Photography",
    copy: "Outdoor, natural-light wedding photography focused on candid moments, documentary atmosphere, and the feeling of the day.",
    href: "/photography/projects/wedding-photography",
  },
  {
    title: "Studio Editorial",
    copy: "Studio photography focused on controlled light, composition, styling, portraiture, performance, and image-led storytelling.",
    href: "/photography/projects/olivia",
  },
] as const;

const photographyServices = [
  "Editorial photography for places, projects, and publications",
  "Sports and live event photography",
  "Wedding photography with a documentary focus",
  "Studio editorial portraiture and movement-based image work",
  "Commissioned photography for creative businesses and service-led brands",
  "Passport and ID photos in Kew",
] as const;

const consultingFocus = [
  {
    title: "Clarify the offer",
    copy: "Define what you do, who it is for, why it matters, and what needs to be easier for people to understand.",
  },
  {
    title: "Sharpen positioning",
    copy: "Identify how the business should be framed in relation to its audience, competitors, category, and real strengths.",
  },
  {
    title: "Shape the message",
    copy: "Turn loose ideas into clearer language, page priorities, service descriptions, and supporting proof.",
  },
  {
    title: "Connect strategy to action",
    copy: "Translate the thinking into practical decisions for websites, content, service structure, and next steps.",
  },
] as const;

const consultingProcess = [
  {
    title: "Offer Review",
    copy: "Reviewing the current service, proposition, website, and customer-facing material to identify what is unclear or underused.",
  },
  {
    title: "Positioning Direction",
    copy: "Defining a clearer point of view for how the business should present itself and what should be emphasised.",
  },
  {
    title: "Competitive Analysis",
    copy: "Reviewing comparable businesses, services, messaging, and website structures to understand expectations and opportunities to stand out.",
  },
  {
    title: "Messaging Structure",
    copy: "Organising the language, page sections, and service explanations so the offer becomes easier to scan and evaluate.",
  },
  {
    title: "Website Strategy",
    copy: "Connecting the business direction to practical website decisions, from navigation and content hierarchy to calls to action.",
  },
] as const;

export const metadata: Metadata = {
  title: "Services",
  description: "Website, UX, research, photography and consulting services by Gabriel Demargne.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="photography-index services-index">
      <PhotographyMobileNav activePage="services" />

      <header className="photography-index__header">
        <SiteDesktopIdentity identityClassName="photography-index__identity" />
        <nav className="photography-index__nav" aria-label="Primary navigation">
          <Link className="site-top-contact" href="/contact">Contact me</Link>
          <Link href="/photography">Photography</Link>
          <Link href="/design-portfolio">Portfolio</Link>
          <span aria-current="page">Services</span>
        </nav>
      </header>

      <div className="photography-index__mobile-back">
        <MobilePageBack href="/" ariaLabel="Back to home" />
      </div>

      <h1 className="services-index__title">Services</h1>

      <nav className="services-index__mobile-selector" aria-label="Choose a service">
        <MobileServiceLink href="/services/website-design" title="Website Design" imageSrc="/services/website-design-cover-latest.png" />
        <MobileServiceLink href="/services/photography" title="Photography" imageSrc="/services/photography-cover.png" />
        <MobileServiceLink href="/services/small-business-consulting" title="Small-Business Consulting" imageSrc="/services/consulting-cover.png" />
      </nav>

      <ServicesScrollGrid>
        <ServiceColumn
          title="Website Design"
          image={{
            src: "/services/website-design-cover-latest.png",
            alt: "Website design shown on a laptop and phone",
          }}
        >
          <ServiceGroup>
            <ServiceList items={websiteServices} />
          </ServiceGroup>
          <ContactButton />
        </ServiceColumn>

        <ServiceColumn
          title="Photography"
          image={{
            src: "/services/photography-cover.png",
            alt: "Black-and-white studio portrait of a dancer in motion",
          }}
        >
          <div className="services-index__photography-sections">
            {photographySections.map((section) => (
              <Link className="services-index__photo-section" href={section.href} key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
                <span className="services-index__photo-section-action">
                  View samples
                  <svg width="18" height="18" viewBox="0 0 13 12" fill="none" aria-hidden="true">
                    <path d="M1 6h11m0 0-4.5-4.5M12 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <ServiceGroup title="Photography services">
            <ul className="services-index__plain-list">
              {photographyServices.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </ServiceGroup>
          <ContactButton />
        </ServiceColumn>

        <ServiceColumn
          title="Small-Business Consulting"
          image={{
            src: "/services/consulting-cover.png",
            alt: "Prioritisation board showing focus for an MVP and later work",
          }}
        >
          <ServiceGroup>
            <ServiceList items={consultingFocus} />
          </ServiceGroup>
          <ServiceGroup title="How This Works">
            <ServiceList items={consultingProcess} />
          </ServiceGroup>
          <ContactButton />
        </ServiceColumn>
      </ServicesScrollGrid>
    </main>
  );
}

function ServiceColumn({
  title,
  image,
  children,
}: {
  title: string;
  image?: { src: string; alt: string };
  children: React.ReactNode;
}) {
  return (
    <article className="services-index__column">
      <div className="services-index__column-spacer" aria-hidden="true" />
      <div className="services-index__column-surface">
        <div className="services-index__image-placeholder" aria-hidden={image ? undefined : "true"}>
          {image ? (
            <Image
              className="services-index__image"
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 800px) calc(100vw - 48px), 32vw"
            />
          ) : null}
        </div>
        <h2>{title}</h2>
        <div className="services-index__column-content">{children}</div>
      </div>
    </article>
  );
}

function ServiceGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="services-index__group">
      {title ? <h3>{title}</h3> : null}
      {children}
    </section>
  );
}

function ServiceList({ items }: { items: readonly { title: string; copy: string }[] }) {
  return (
    <div className="services-index__list">
      {items.map((item) => (
        <article key={item.title}>
          <h4>{item.title}</h4>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

function ContactButton() {
  return (
    <a className="services-index__contact-link" href={contactEmailHref}>
      <span>Contact me</span>
      <svg className="services-index__contact-arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
        <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function MobileServiceLink({ href, title, imageSrc }: { href: string; title: string; imageSrc: string }) {
  return (
    <Link href={href}>
      <span className="services-index__mobile-selector-image">
        <Image src={imageSrc} alt="" fill sizes="36vw" />
      </span>
      <span className="services-index__mobile-selector-title">{title}</span>
      <svg width="18" height="18" viewBox="0 0 13 12" fill="none" aria-hidden="true">
        <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
