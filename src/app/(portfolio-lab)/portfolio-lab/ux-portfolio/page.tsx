import { UXPortfolioWorkspace } from "@/components/ux-portfolio-workspace";
import { uxPortfolioWorkspaceStages } from "@/data/ux-portfolio";

export const dynamic = "force-dynamic";

export default function PortfolioWorkspacePage() {
  return <UXPortfolioWorkspace stages={uxPortfolioWorkspaceStages} />;
}
