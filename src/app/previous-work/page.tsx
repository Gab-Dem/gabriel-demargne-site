import type { Metadata } from "next";
import { UXPortfolioWorkspace } from "@/components/ux-portfolio-workspace";
import { previousWorkWorkspaceStages } from "@/data/ux-portfolio";

export const metadata: Metadata = {
  title: "Previous UX Work",
  description: "Selected previous UX work, beginning with representative Carmignac artefacts and interface examples.",
};

export const dynamic = "force-dynamic";

export default function PreviousWorkPage() {
  return (
    <UXPortfolioWorkspace
      stages={previousWorkWorkspaceStages}
      title="Previous UX Work"
      backHref="/portfolio"
      backLabel="Portfolio"
    />
  );
}
