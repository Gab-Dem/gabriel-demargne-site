import type { Metadata } from "next";
import { WatchlistReleasePlanner } from "@/components/watchlist-release-planner";

export const metadata: Metadata = {
  title: "Release planner",
  description: "A zoomable Gantt-style television release planner exploration.",
};

export default function WatchlistReleasePlannerPage() {
  return <WatchlistReleasePlanner />;
}
