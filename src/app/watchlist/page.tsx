import type { Metadata } from "next";
import { UXPortfolioWorkspace } from "@/components/ux-portfolio-workspace";
import { watchlistWorkspaceStages } from "@/data/ux-portfolio";

export const metadata: Metadata = {
  title: "Watchlist",
  description:
    "An interaction design study exploring visual hierarchy, information presentation and small interactions through television tracking.",
};

export default function WatchlistPage() {
  return (
    <UXPortfolioWorkspace
      stages={watchlistWorkspaceStages}
      title="Watchlist"
      backHref="/portfolio"
      backLabel="Portfolio"
    />
  );
}
