import type { Metadata } from "next";
import { WatchlistReleasePlanner } from "@/components/watchlist-release-planner";

export const metadata: Metadata = {
  title: "Release planner V2",
  description: "The second working version of the zoomable television release planner.",
};

export default function WatchlistReleasePlannerV2Page() {
  return <WatchlistReleasePlanner version="v2" />;
}
