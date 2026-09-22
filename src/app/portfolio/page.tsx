import type { Metadata } from "next";
import { PortfolioDirectory } from "@/components/portfolio-directory";
import {
  portfolioAdditionalProjects,
  portfolioOverview,
  portfolioProjects,
} from "@/data/ux-portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Public UX case studies and representative project work by Gabriel Demargne.",
};

export default function PortfolioPage() {
  return (
    <PortfolioDirectory
      intro={portfolioOverview.intro}
      secondaryProjects={portfolioAdditionalProjects}
      projects={portfolioProjects}
    />
  );
}
