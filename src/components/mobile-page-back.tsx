import { HistoryBackLink } from "@/components/history-back-link";

export function MobilePageBack({
  href,
  ariaLabel,
  className,
}: {
  href: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <HistoryBackLink
      href={href}
      className={["mobile-page-back", className].filter(Boolean).join(" ")}
      ariaLabel={ariaLabel}
    >
      <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
        <path
          d="M12 6H1m0 0 4.5-4.5M1 6l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Back</span>
    </HistoryBackLink>
  );
}
