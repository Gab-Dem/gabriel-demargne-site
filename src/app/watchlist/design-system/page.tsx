import type { Metadata } from "next";
import { WatchlistDesignBoard } from "@/components/watchlist-design-board";

export const metadata: Metadata = {
  title: "Watchlist design system",
  description: "A pan-able working board of the Watchlist visual system and interface building blocks.",
};

export default function WatchlistDesignSystemPage() {
  return <WatchlistDesignBoard />;
}
