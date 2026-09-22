import type { Metadata } from "next";
import { DesignPortfolioPlan } from "@/components/design-portfolio-plan";
import {
  designPortfolioChapters,
  designPortfolioProjectOrder,
} from "@/data/design-portfolio";

export const metadata: Metadata = {
  title: "Design portfolio",
  description:
    "Three independent UX and product-design explorations by Gabriel Demargne.",
};

export default function DesignPortfolioPage() {
  return (
    <DesignPortfolioPlan
      chapters={designPortfolioChapters}
      projectOrder={designPortfolioProjectOrder}
    />
  );
}
