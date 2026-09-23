export type DesignPortfolioChapter = {
  slug: string;
  project:
    | "Portfolio"
    | "Spaces"
    | "Watchlist"
    | "Product Finder"
    | "Design practice";
  navLabel: string;
  navTag: string;
  title: string;
  summary: string;
};

export const designPortfolioChapters: readonly DesignPortfolioChapter[] = [
  {
    slug: "portfolio-direction",
    project: "Portfolio",
    navLabel: "Introduction",
    navTag: "Profile",
    title: "Design Portfolio",
    summary:
      "Product and UX work spanning research, product definition, information architecture, interaction design, prototyping and implementation.",
  },
  {
    slug: "spaces-problem",
    project: "Spaces",
    navLabel: "End-to-end process",
    navTag: "Product Design",
    title: "Helping people find spaces that meet their needs",
    summary:
      "The project moved through research planning, user and owner journey mapping, opportunity qualification, product requirements, task flows, information architecture and interaction design before the service model became a working product.",
  },
  {
    slug: "spaces-two-sided-service",
    project: "Spaces",
    navLabel: "Two-sided service",
    navTag: "Service Design",
    title: "Mapping a service across user and owner needs",
    summary:
      "Service-design methods shaped research planning, synthesis and separate journeys for people using and operating the spaces. This made both sides’ needs and constraints visible for clearer service and product decisions.",
  },
  {
    slug: "spaces-product-scope",
    project: "Spaces",
    navLabel: "Product scope",
    navTag: "Product Strategy",
    title: "Turning opportunities into a focused product scope",
    summary:
      "User stories and opportunities became prioritised requirements. Qualified How Might We questions and primary flows then defined a focused first release.",
  },
  {
    slug: "spaces-experience-model",
    project: "Spaces",
    navLabel: "Experience model",
    navTag: "Interaction Design",
    title: "Modelling two connected experiences",
    summary:
      "Separate information architectures and task flows for users and space owners informed wireframes for discovery, comparison, evaluation and operational overview.",
  },
  {
    slug: "spaces-live-product",
    project: "Spaces",
    navLabel: "Live product",
    navTag: "Implementation",
    title: "From wireframes to a functioning model",
    summary:
      "The wireframes informed a functioning model of the user experience, carrying content structure and interaction logic into the directory, location detail and feedback flows.",
  },
  {
    slug: "watchlist-introduction",
    project: "Watchlist",
    navLabel: "Introduction",
    navTag: "Product Design",
    title: "Supporting content tracking & building excitement for releases",
    summary:
      "Watchlist brings saved shows, viewing progress and upcoming releases into one tracker. Product framing, comparative investigation and early interaction modelling shaped how those parts work together.",
  },
  {
    slug: "watchlist-benchmark",
    project: "Watchlist",
    navLabel: "Product landscape",
    navTag: "Benchmarking",
    title: "Understanding the existing landscape",
    summary:
      "A comparison of existing products informed research outcomes, working requirements and How Might We prompts, grounding later product decisions.",
  },
  {
    slug: "watchlist-structure",
    project: "Watchlist",
    navLabel: "Product structure",
    navTag: "Information Architecture",
    title: "Turning the investigation into a product structure",
    summary:
      "Structure ideation organised the identified requirements and design opportunities before they were developed into an information architecture for the wider product.",
  },
  {
    slug: "watchlist-connected-product",
    project: "Watchlist",
    navLabel: "Interaction model",
    navTag: "Interaction Design",
    title: "Developing interactions through sketches and prototypes",
    summary:
      "Early interactions were sketched, annotated and refined, with focused working prototypes used to explore behaviours that needed deeper iteration.",
  },
  {
    slug: "watchlist-review",
    project: "Watchlist",
    navLabel: "Developed application",
    navTag: "Implementation",
    title: "Developing the product as a working application",
    summary:
      "The selected direction was developed into a responsive application, allowing the connected model to be experienced across its principal desktop and mobile views.",
  },
  {
    slug: "finder-problem",
    project: "Product Finder",
    navLabel: "Adaptive search logic",
    navTag: "Systems Design",
    title: "Modelling adaptive search and fallback logic",
    summary:
      "Process mapping established the decision logic; systems design and prototyping refined the matching, fallback and revision rules, making the search behaviour explicit and testable.",
  },
  {
    slug: "ai-supported-design-practice",
    project: "Design practice",
    navLabel: "Design Practices",
    navTag: "Ways of Working",
    title: "Design Practices",
    summary:
      "Principles for using AI in design thinking.",
  },
] as const;

export const designPortfolioProjectOrder = [
  "Portfolio",
  "Spaces",
  "Watchlist",
  "Product Finder",
  "Design practice",
] as const;
