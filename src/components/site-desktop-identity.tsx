import Link from "next/link";
import { HistoryBackLink } from "@/components/history-back-link";

export function SiteDesktopIdentity({
  identityClassName,
  backHref = "/",
}: {
  identityClassName: string;
  backHref?: string;
}) {
  return (
    <div className="site-desktop-identity">
      <Link href="/" className={identityClassName} aria-label="Home">
        <span>Gabriel</span>
        <span>Demargne</span>
      </Link>
      <HistoryBackLink href={backHref} className="site-desktop-back" ariaLabel={backHref === "/" ? "Back to home" : "Back to photography"}>
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
          <path
            d="M12 6H1m0 0 4.5-4.5M1 6l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </HistoryBackLink>
    </div>
  );
}
