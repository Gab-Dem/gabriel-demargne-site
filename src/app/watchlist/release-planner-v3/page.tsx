import type { Metadata } from "next";
import { WatchlistReleasePlanner } from "@/components/watchlist-release-planner";

export const metadata: Metadata = {
  title: "Release planner V3",
  description: "The next iteration of the zoomable television release planner, beginning from the V2 baseline.",
};

export default function WatchlistReleasePlannerV3Page() {
  return <WatchlistReleasePlanner version="v3" />;
}
