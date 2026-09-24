import { HistoryBackLink } from "@/components/history-back-link";

export function PhotographyReturnLink() {
  return (
    <HistoryBackLink href="/photography" className="photography-detail__return" ariaLabel="Back to photography">
      <svg
        className="photography-detail__return-arrow"
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        aria-hidden="true"
      >
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
