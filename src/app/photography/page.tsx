import Link from "next/link";
import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Gabriel Demargne.",
};

export default function PhotographyPage() {
  const contactHref = "/contact?returnTo=%2Fphotography";

  return (
    <SplitShell mobileMode="detail" contactHref={contactHref}>
      <div className="right-content">
        <div className="website-detail-top">
          <div className="website-detail-content">
            <div className="website-detail-heading">
              <div className="website-detail-heading__column">
                <h1 className="website-detail-title">Photography</h1>
              </div>
              <div className="website-detail-heading__column website-detail-heading__column--contact">
                <Link href={contactHref} className="desktop-detail-contact-link">
                  Get in touch
                  <span className="desktop-detail-contact-link__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
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
