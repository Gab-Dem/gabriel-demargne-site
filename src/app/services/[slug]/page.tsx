import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MobilePageBack } from "@/components/mobile-page-back";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { contactEmailHref } from "@/data/site";

const details = {
  "website-design": { title: "Website Design", items: [["New Builds", "Designing and building new websites from the ground up, with attention to structure, content, visual direction, and practical implementation."], ["Redesigns", "Reworking an existing site when the offer, content, structure, or overall presentation no longer reflects the business clearly enough."], ["Maintenance", "Ongoing support for sites that need updates, refinements, additions, or a reliable person to keep things moving properly."], ["System Improvements", "Improving navigation, page structure, content hierarchy, or frontend behaviour where the current site works, but not well enough."], ["Analysis", "Reviewing an existing website to identify what is unclear, where friction appears, and what should be changed before more time is spent building."]] },
  photography: { title: "Photography", items: [["Outdoors Editorial", "Editorial outdoor photography focused on place, atmosphere, landscape, travel, and the quiet traces of human presence."], ["Sports", "Editorial sport photography focused on movement, competition, live events, cycling culture, and event atmosphere."], ["Wedding Photography", "Outdoor, natural-light wedding photography focused on candid moments, documentary atmosphere, and the feeling of the day."], ["Studio Editorial", "Studio photography focused on controlled light, composition, styling, portraiture, performance, and image-led storytelling."]] },
  "small-business-consulting": { title: "Small-Business Consulting", items: [["Clarify the offer", "Define what you do, who it is for, why it matters, and what needs to be easier for people to understand."], ["Sharpen positioning", "Identify how the business should be framed in relation to its audience, competitors, category, and real strengths."], ["Shape the message", "Turn loose ideas into clearer language, page priorities, service descriptions, and supporting proof."], ["Connect strategy to action", "Translate the thinking into practical decisions for websites, content, service structure, and next steps."]] },
} as const;

type Slug = keyof typeof details;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: details[slug as Slug]?.title ?? "Services" };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = details[slug as Slug];
  if (!detail) notFound();

  return <main className="photography-index services-detail-page">
    <PhotographyMobileNav activePage="services" />
    <header className="photography-index__header">
      <Link href="/" className="photography-index__identity" aria-label="Home"><span>Gabriel</span><span>Demargne</span></Link>
      <nav className="photography-index__nav" aria-label="Primary navigation"><Link className="site-top-contact" href="/contact">Contact me</Link><Link href="/photography">Photography</Link><Link href="/design-portfolio">Portfolio</Link><span aria-current="page">Services</span></nav>
    </header>
    <div className="photography-index__mobile-back"><MobilePageBack href="/services" ariaLabel="Back to services" /></div>
    <section className="services-detail-page__content">
      <h1>{detail.title}</h1>
      <a className="services-index__contact-link" href={contactEmailHref}>
        <span>Contact me</span>
        <svg className="services-index__contact-arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
          <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="services-index__list">{detail.items.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div>
    </section>
  </main>;
}
