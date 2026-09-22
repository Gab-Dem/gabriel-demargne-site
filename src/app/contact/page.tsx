import type { Metadata } from "next";
import Link from "next/link";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { SiteDesktopIdentity } from "@/components/site-desktop-identity";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Gabriel Demargne.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <PhotographyMobileNav activePage="contact" />

      <header className="photography-index__header contact-page__header">
        <SiteDesktopIdentity identityClassName="photography-index__identity contact-page__identity" />

        <nav className="photography-index__nav contact-page__nav" aria-label="Primary navigation">
          <span className="site-top-contact contact-page__contact-placeholder" aria-hidden="true">Contact me</span>
          <Link href="/photography">Photography</Link>
          <Link href="/design-portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
        </nav>
      </header>

      <section className="contact-page__content" aria-labelledby="contact-title">
        <h1 id="contact-title">Contact Me</h1>

        <dl className="contact-page__details">
          <div>
            <dt aria-label="Mobile">M</dt>
            <dd><a href="tel:+447495935834">+44 7495935834</a></dd>
          </div>
          <div>
            <dt aria-label="LinkedIn">L</dt>
            <dd>
              <a href="https://www.linkedin.com/in/gabriel-demargne" target="_blank" rel="noreferrer">
                www.linkedin.com/in/gabriel-demargne
              </a>
            </dd>
          </div>
          <div>
            <dt aria-label="Email">E</dt>
            <dd><a href="mailto:gabriel@demargne.com">gabriel@demargne.com</a></dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
