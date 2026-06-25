import Link from "next/link";
import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";
import { contactEmailHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Gabriel Demargne.",
};

export default function PhotographyPage() {
  const contactHref = contactEmailHref;

  return (
    <SplitShell
      mobileMode="detail"
      rightPanelClassName="split-page__right--detail"
      contactHref={contactHref}
    >
      <div className="right-content right-content--detail-topless">
        <div className="website-detail-top">
          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">Photography</h1>
              </div>
              <div className="website-detail-heading__column website-detail-heading__column--contact">
                <a href={contactHref} className="desktop-detail-contact-link">
                  Get in touch
                  <span className="desktop-detail-contact-link__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="placeholder-copy">
          <p>Photography content to be developed.</p>
        </div>
      </div>
    </SplitShell>
  );
}
