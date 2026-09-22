import type { Metadata } from "next";
import { UXPortfolioWorkspace } from "@/components/ux-portfolio-workspace";
import { uxPortfolioWorkspaceStages } from "@/data/ux-portfolio";

export const metadata: Metadata = {
  title: "UX Portfolio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function UXPortfolioPage() {
  return (
    <UXPortfolioWorkspace
      stages={uxPortfolioWorkspaceStages}
      backHref="/portfolio"
      backLabel="Portfolio"
    />
  );
}
