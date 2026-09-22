import type { Metadata } from "next";
import Link from "next/link";
import { PhotographyReviewBoard } from "@/components/photography-review-board";
import { getPhotographyRemovals, getPhotographyReviewItems } from "@/lib/photography-review";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photography review",
  robots: { index: false, follow: false },
};

export default function PhotographyReviewPage() {
  const photos = getPhotographyReviewItems();
  const removed = getPhotographyRemovals();

  return (
    <main className="photography-review-page">
      <header className="photography-review-header">
        <Link href="/photography" className="photography-review-header__back">
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
            <path d="M12 6H1m0 0 4.5-4.5M1 6l4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Photography</span>
        </Link>
        <div>
          <h1>Photo review</h1>
          <p>Click a photograph to mark it. A red overlay confirms it is recorded for removal; click it again to keep it.</p>
        </div>
      </header>

      <PhotographyReviewBoard photos={photos} initialRemoved={removed} />
    </main>
  );
}
