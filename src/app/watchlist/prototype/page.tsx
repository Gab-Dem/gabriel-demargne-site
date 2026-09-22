import type { Metadata } from "next";
import { WatchlistInteractionPrototype } from "@/components/watchlist-interaction-prototype";

export const metadata: Metadata = {
  title: "Watchlist prototype",
  description: "A fictional interaction prototype for saving and tracking shows.",
};

export default function WatchlistPrototypePage() {
  return <WatchlistInteractionPrototype />;
}
