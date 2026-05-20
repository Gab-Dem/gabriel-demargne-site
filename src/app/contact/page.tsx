import type { Metadata } from "next";
import { ServiceGlobalNav } from "@/components/service-global-nav";
import { SplitShell } from "@/components/split-shell";

const contactLinks = [
  {
    title: "Email Me",
    href: "mailto:gabriel@demargne.com",
  },
  {
    title: "View Gallery",
    href: "https://gabrieldemargne.com",
  },
] as const;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Gabriel Demargne.",
};

export default function ContactPage() {
  return (
    <SplitShell
      leftLowerContent={<ServiceGlobalNav selectedPath="/contact" />}
      rightPanelClassName="split-page__right--detail"
    >
      <div className="right-content right-content--detail-topless">
        <div className="ux-research-page">
          <div className="website-detail-top">
            <div className="website-detail-content">
              <div className="website-detail-heading">
                <div className="website-detail-heading__column">
                  <h1 className="website-detail-title">Get in Touch</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="website-detail-content website-detail-content--body">
            <section className="contact-page__links" aria-label="Contact links">
              {contactLinks.map((link) => (
                <a
                key={link.title}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="contact-page__link-block"
              >
                  <h2 className="contact-page__link-title">{link.title}</h2>
                </a>
              ))}
            </section>
          </div>
        </div>
      </div>
    </SplitShell>
  );
}
