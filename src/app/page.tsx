import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gabriel Demargne Design",
  description:
    "Portfolio, photography, and design services by Gabriel Demargne.",
};

export default function HomePage() {
  return (
    <main className="home-landing">
      <div className="home-landing__center">
        <h1 className="home-landing__title">
          <span>Gabriel</span>
          <span>Demargne</span>
        </h1>
        <nav className="home-landing__nav" aria-label="Primary navigation">
          <Link href="/design-portfolio">
            <span>Portfolio</span>
            <svg className="home-landing__arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
              <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/photography">
            <span>Photography</span>
            <svg className="home-landing__arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
              <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/services">
            <span>Services</span>
            <svg className="home-landing__arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
              <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact">
            <span>Contact</span>
            <svg className="home-landing__arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
              <path d="M1 6h11m0 0-4.5-4.5M12 6 7.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </nav>
      </div>
    </main>
  );
}
