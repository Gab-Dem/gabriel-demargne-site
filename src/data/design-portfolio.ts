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
      "Using a structured design process, I developed the project through research planning, user and owner journey mapping, opportunity qualification, product requirements, task flows, information architecture, interaction design and responsive implementation. The work demonstrates how I connect early product thinking to a coherent, functioning service.",
  },
  {
    slug: "spaces-two-sided-service",
    project: "Spaces",
    navLabel: "Two-sided service",
    navTag: "Service Design",
    title: "Mapping a service across user and owner needs",
    summary:
      "I used service-design methods to plan research, structure synthesis and map separate journeys for people using and operating the spaces. This made both sides’ needs and constraints visible for clearer service and product decisions.",
  },
  {
    slug: "spaces-product-scope",
    project: "Spaces",
    navLabel: "Product scope",
    navTag: "Product Strategy",
    title: "Turning opportunities into a focused product scope",
    summary:
      "I translated user stories and opportunities into prioritised requirements, qualified How Might We questions and defined primary flows for a focused first release.",
  },
  {
    slug: "spaces-experience-model",
    project: "Spaces",
    navLabel: "Experience model",
    navTag: "Interaction Design",
    title: "Modelling two connected experiences",
    summary:
      "I developed separate information architectures and task flows for users and space owners, then explored the key journeys through wireframes for discovery, comparison, evaluation and operational overview.",
  },
  {
    slug: "spaces-live-product",
    project: "Spaces",
    navLabel: "Live product",
    navTag: "Implementation",
    title: "Taking a design system into a responsive product",
    summary:
      "I carried the service model into a working responsive product, applying a design system, structured content and interaction logic across directory, location detail and feedback flows.",
  },
  {
    slug: "watchlist-introduction",
    project: "Watchlist",
    navLabel: "Introduction",
    navTag: "Product Design",
    title: "Framing a connected product experience",
    summary:
      "I defined a product direction through framing, comparative investigation and early interaction modelling, connecting saving, progress and release planning into one experience.",
  },
  {
    slug: "watchlist-benchmark",
    project: "Watchlist",
    navLabel: "Product landscape",
    navTag: "Benchmarking",
    title: "Understanding the existing landscape",
    summary:
      "I analysed comparable products and synthesised the findings into research outcomes, working requirements and How Might We prompts. This gave the later product work a grounded basis.",
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
    title: "Developing interactions through sketches and wireframes",
    summary:
      "Early interactions were sketched, annotated and refined before being expanded into connected wireframes and focused working prototypes across the product.",
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
      "I mapped an existing process, translated it into decision logic and iterated the model through matching, fallback and revision rules. This demonstrates systems design and prototyping for complex search behaviour.",
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
