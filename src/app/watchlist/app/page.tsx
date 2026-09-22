import type { Metadata } from "next";
import {
  WatchlistApplication,
  type WatchlistView,
} from "@/components/watchlist-application";

export const metadata: Metadata = {
  title: "Watchlist application",
  description:
    "A working web application for saving shows, tracking progress and understanding upcoming releases.",
};

const watchlistViews: WatchlistView[] = ["home", "discover", "shows", "calendar", "account"];

export default async function WatchlistApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[]; mode?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedView = params.view;
  const requestedMode = params.mode;
  const initialView = typeof requestedView === "string" && watchlistViews.includes(requestedView as WatchlistView)
    ? requestedView as WatchlistView
    : "home";

  const initialCalendarMode: "Upcoming" | "Week" | "Planner" = requestedMode === "planner" ? "Planner" : requestedMode === "week" ? "Week" : "Upcoming";
  return <div className="watchlist-application-page"><WatchlistApplication initialView={initialView} initialCalendarMode={initialCalendarMode} /></div>;
}
