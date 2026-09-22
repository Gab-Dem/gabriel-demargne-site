import type { Metadata } from "next";
import { UXPortfolioWorkspace } from "@/components/ux-portfolio-workspace";
import { searchEngineWorkspaceStages } from "@/data/ux-portfolio";

export const metadata: Metadata = {
  title: "Product Finder",
  description: "A developing UX case study about physical product discovery.",
};

export const dynamic = "force-dynamic";

export default function SearchEnginePage() {
  return (
    <UXPortfolioWorkspace
      stages={searchEngineWorkspaceStages}
      title="Product Finder"
      backHref="/portfolio"
      backLabel="Portfolio"
    />
  );
}
