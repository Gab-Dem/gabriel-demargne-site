export type UxPortfolioSection = {
  slug: string;
  title: string;
  notes: string[];
};

export type UxPortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  timeline: string;
  tags: string[];
  sections: UxPortfolioSection[];
};

export type UxPortfolioWorkspaceStage = {
  slug: string;
  label: string;
  title: string;
  hideTitle?: boolean;
  criticalText: string;
  notes: string[];
  contentLayout?: "stacked" | "split-media-right";
  contentOrder?: "critical-first" | "media-caption-first";
  imageTreatment?: "default" | "blurred";
  imagePresentation?: "default" | "compact-divider" | "framed";
  videoSrc?: string;
  videoType?: string;
  videoPoster?: string;
  videoAlt?: string;
  guideSections?: {
    title: string;
    hideTitle?: boolean;
    items: (
      | string
      | {
          text: string;
          suggestion?: string;
        }
    )[];
    imageSrc?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageGallery?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
  }[];
  overviewLinks?: {
    label: string;
    targetSlug: string;
    items: string[];
    description: string;
  }[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  galleryLayout?: "grid" | "full-width" | "landscape-pair";
  imageGallery?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  galleryItemDivider?: boolean;
  allowExpand?: boolean;
  evidenceItems?: {
    status: string;
    statement: string;
    implication?: string;
    sourceLabel?: string;
    sourceHref?: string;
  }[];
  evidenceTitle?: string;
  decisionLog?: {
    id: string;
    status: string;
    decision: string;
    reasoning: string;
    evidence: string;
    alternatives: string;
    uncertainty: string;
  }[];
  decisionLogTitle?: string;
  decisionLogCollapsible?: boolean;
  interactivePrototype?: "watchlist-planning-horizon" | "watchlist-release-planner-v3";
  prototypeHref?: string;
  caseStudyVisual?:
    | "benchmark-review"
    | "informal-research"
    | "benchmark-synthesis"
    | "design-prompts"
    | "task-object-mapping"
    | "direction-selection"
    | "calendar-exploration"
    | "calendar-direction"
    | "information-architecture"
    | "concept-comparison"
    | "core-flow"
    | "interaction-states"
    | "show-wireframe"
    | "wireframe-tensions"
    | "test-plan"
    | "reflection"
    | "slide-template";
  afterCriticalVisual?: "selection-interaction-context" | "planner-control-evolution";
  slideSections?: UxPortfolioSlideSection[];
};

export type UxPortfolioSlideSection = {
  title: string;
  description: string;
  assets?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    placeholder?: string;
  }[];
};

export type PortfolioProjectCard = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  includes: string[];
  summary: string;
  notes: string[];
  href?: string;
  ctaLabel?: string;
};

export const uxPortfolioIntro = {
  eyebrow: "Private workspace",
  title: "UX portfolio lab",
  description:
    "A separate working area for shaping case studies, sequencing images, and refining the UX portfolio before it appears anywhere public.",
  prompts: [
    "Add case studies one by one, each with its own image sequence and narrative.",
    "Test different page structures here without touching the public site navigation.",
    "Keep this route private by only opening it through the draft-mode link.",
  ],
} as const;

export const portfolioOverview = {
  title: "Portfolio",
  services: ["Public Case Studies", "UX Process", "Decision-Making"],
  intro:
    "A selection of public UX work, including personal projects and representative case studies.\n\nSome commercial projects cannot be shared directly because they were produced within confidential client or in-house contexts, however I have included personal projects to illustrate process, judgement, and design reasoning.",
  framing: [
    "Where a case study uses illustrative artefacts, that is stated clearly within the project. The intention is not to simulate delivery for its own sake, but to show how research, synthesis, structure, and interface decisions are approached when working through a UX problem.",
    "As more projects are added, this page will act as the portfolio index: a place to separate public case studies from the broader services site while still keeping the work connected to the rest of the practice.",
  ],
} as const;

export const portfolioAdditionalProjects: readonly PortfolioProjectCard[] = [
  {
    slug: "design-portfolio",
    eyebrow: "Portfolio project",
    title: "Design portfolio",
    subtitle:
      "Three independent project explorations and selected professional work, planned as one continuous visual narrative.",
    includes: ["Spaces", "Watchlist", "Product Finder", "Previous work", "AI practice"],
    summary:
      "A visual-first portfolio plan that brings together three independent projects and a selective chapter of earlier professional work.",
    notes: [],
    href: "/design-portfolio",
    ctaLabel: "Open design portfolio",
  },
  {
    slug: "watchlist",
    eyebrow: "Passion project",
    title: "Watchlist",
    subtitle:
      "How watchlist services can make saving, tracking and returning to a show clearer.",
    includes: ["Benchmarking", "Interaction Design", "Iteration"],
    summary:
      "A comparative review and interaction exploration across saving, viewing progress and release context.",
    notes: [],
    href: "/watchlist",
    ctaLabel: "Open case study",
  },
  {
    slug: "search-engine",
    eyebrow: "Personal project",
    title: "Product Finder",
    subtitle:
      "A product-discovery concept exploring how someone might find where they are able to physically see a product.",
    includes: ["Problem Framing", "Logic Sketch"],
    summary:
      "A personal problem being developed into a UX case study around uncertain physical product discovery.",
    notes: [],
    href: "/search-engine",
    ctaLabel: "Open case study",
  },
  {
    slug: "previous-work",
    eyebrow: "Previous work",
    title: "Previous UX work",
    subtitle:
      "A combined case study for selected past UX work, beginning with product and service design material from Carmignac.",
    includes: ["Information Architecture", "Benchmarking", "UX/UI", "Accessibility"],
    summary:
      "A combined previous-work case study intended to gather representative artefacts from prior roles without splitting them into several thin pages.",
    notes: [],
    href: "/previous-work",
    ctaLabel: "Open case study",
  },
] as const;

export const previousWorkWorkspaceStages: UxPortfolioWorkspaceStage[] = [
  {
    slug: "overview",
    label: "Overview",
    title: "Selected previous UX work",
    criticalText:
      "This page is structured as a selective overview of previous employment rather than a full career archive. The current material focuses on work completed at Carmignac Asset Management between 2021 and 2024, where the projects ranged from information architecture and benchmarking through to product UX, service design thinking, and accessibility review.\n\nAs more past-role material is added, this overview can continue to act as the entry point: showing what each role involved, what kinds of work were carried out, and where to jump for representative examples.",
    notes: [
      "This page is intentionally selective: the goal is to show representative judgement and range, not every artefact from every role.",
      "The first employment summary currently points to Carmignac sections because that is the only previous-work material loaded so far.",
    ],
    overviewLinks: [
      {
        label: "Carmignac Asset Management · UX Designer · 2021–2024",
        targetSlug: "site-map",
        description:
          "Work across regulated digital products including information architecture, simulator definition, interface design, service-support concepts, and accessibility review.",
        items: [
          "Information architecture",
          "Benchmarking and product definition",
          "Simulator UX and result communication",
          "Fund discovery and detail-page design",
          "Service design for events support",
          "Accessibility and colour-system testing",
        ],
      },
    ],
  },
  {
    slug: "site-map",
    label: "Professional Site Map [IA]",
    title: "Restructuring a complex information space",
    criticalText:
      "This site-map artefact shows the scale of structural thinking required across the professional site experience. It maps major sections, recurring calls to action, navigation patterns, and the relationships between product areas such as funds, insights, simulators, events, and account-related flows.\n\nThe value of this work was not only in listing pages, but in making dependencies visible. It helped clarify where journeys overlapped, where conversion points were being repeated, and where the architecture needed to support very different user intentions without becoming fragmented.",
    notes: [
      "The board reads as a synthesis artefact rather than a polished presentation slide, which is useful here because it shows working structure rather than just final UI.",
      "A repeated CTA logic is visible across the map, suggesting an effort to standardise key user actions across sections.",
    ],
    contentLayout: "split-media-right",
    videoSrc: "/carmignac-site-map-cycle.mp4?v=2",
    videoType: "video/mp4",
    videoPoster: "/carmignac-site-map.png",
    imageSrc: "/carmignac-site-map.png",
    imageAlt: "Site map for a professional investment website showing major sections and journey structure",
    allowExpand: false,
  },
  {
    slug: "simulator-benchmarking",
    label: "Simulator Benchmarking [Benchmarking]",
    title: "Defining what an investment simulator should do",
    criticalText:
      "The benchmark boards show a more strategic stage of the work: understanding the range of simulator patterns already in the market, then turning that research into design requirements. One board classifies different simulator types by capability, while another translates the benchmark into minimum requirements, expected features, and opportunity areas.\n\nThis is useful evidence because it shows that the simulator work did not begin at interface level. The product direction was first grounded in comparison, feature logic, and judgement about what would actually make the tool more useful to users.",
    notes: [
      "The capability framing suggests a deliberate distinction between simple calculators, past-performance simulators, and more guided profiling tools.",
      "The design-considerations board also shows product judgement: not just what competitors do, but which patterns are necessary versus merely possible.",
    ],
    imageSrc: "/carmignac-simulator-benchmark-composite.png",
    imageAlt: "Composite benchmark board combining simulator examples, problem framing, scope mapping, and design considerations",
    allowExpand: false,
  },
  {
    slug: "simulator-flow",
    label: "Simulator Flow [Product UX]",
    title: "From configuration to result",
    criticalText:
      "The simulator screenshots show two stages in a longer interaction: entering allocation information and reviewing the simulated outcome. This makes the work useful as a UX example because it captures both input design and result communication, rather than only the visual treatment of one state.\n\nThe first screen focuses on controlled allocation and user guidance. The result screen then shifts the interface into explanation and summary, surfacing total invested amount, projected value, and next-step actions such as comparison and export. Taken together, they show a more complete interaction flow and not just a static page design.",
    notes: [
      "The stepped structure in the right-hand rail suggests the broader flow was designed to keep users oriented across criteria, fund selection, and simulation output.",
      "The result state also appears to connect directly into conversion or follow-up actions, which is important in a commercial financial context.",
    ],
    imageGallery: [
      {
        src: "/carmignac-simulator-loading.png",
        alt: "Simulator loading state shown before results are returned",
        width: 2560,
        height: 1350,
      },
      {
        src: "/carmignac-simulator-input.png",
        alt: "Simulator interface where users define allocation between funds",
        width: 2560,
        height: 1352,
      },
      {
        src: "/carmignac-simulator-results.png",
        alt: "Simulator result screen showing projected returns and comparison options",
        width: 2560,
        height: 1351,
      },
      {
        src: "/carmignac-simulator-result-detail.png",
        alt: "Detailed simulator result view focusing on outcome presentation within the product",
        width: 807,
        height: 978,
      },
    ],
    galleryLayout: "full-width",
    allowExpand: false,
  },
  {
    slug: "fund-discovery",
    label: "Fund Discovery [UX/UI]",
    title: "Making fund exploration more legible",
    criticalText:
      "These interface screenshots show two linked parts of the experience: a fund-listing view designed for scanning and filtering, and a fund-detail view designed for evaluation. Together they suggest a pattern of progressive disclosure, where users first compare funds at list level and then move into a more explanatory detail page once a specific option becomes relevant.\n\nWhat stands out here is the balance between structured data and editorial hierarchy. The list view supports comparison across multiple attributes, while the detail page reduces density and gives more space to explanation, documents, indicators, and key performance information.",
    notes: [
      "This pairing is a strong example of moving between discovery and decision support without collapsing both jobs into one screen.",
      "The typography and layout are restrained, but the more important point is the clarity of information grouping and hierarchy.",
    ],
    imageGallery: [
      {
        src: "/carmignac-fund-list.png",
        alt: "Fund listing page showing searchable and filterable investment products",
        width: 2560,
        height: 1352,
      },
      {
        src: "/carmignac-fund-detail.png",
        alt: "Fund detail page showing overview, risk indicator, documents, and performance information",
        width: 2560,
        height: 1351,
      },
    ],
    galleryLayout: "landscape-pair",
    allowExpand: false,
  },
  {
    slug: "events-support",
    label: "Events Support Concept [Service Design]",
    title: "Improving in-person events with existing digital tools",
    criticalText:
      "This concept board explores how in-person events could be supported without requiring a full custom app. Instead of starting with a high-cost bespoke solution, it looks at how existing tools and familiar patterns could provide attendees with documents, maps, agendas, feedback collection, and announcements.\n\nThat makes this a good example of practical service design judgement. The question is not only what could be designed, but what could be usefully delivered with realistic constraints, existing platforms, and a lower implementation burden.",
    notes: [
      "The board is especially useful because it shows a pragmatic bias toward workable solutions rather than novelty for its own sake.",
      "It also reflects a cross-channel mindset: event experience is treated as an operational service problem, not only a screen problem.",
    ],
    imageSrc: "/carmignac-events-tools.png",
    imageAlt: "Concept board exploring digital support for in-person events using existing tools",
    allowExpand: false,
  },
  {
    slug: "accessibility-testing",
    label: "Accessibility Testing [Accessibility]",
    title: "Testing colour systems for accessible use",
    criticalText:
      "This accessibility work focused on taking the brand colour palette and running it through colourblind testing to understand which combinations created problems in use. Although the exercise was relatively small in scope, it took a significant amount of time because every relevant pairing needed to be checked carefully rather than assumed to be safe.\n\nThe outcome was practical rather than theoretical: a clearer understanding of which colours should not be used together. That made the work useful at a system level, because it helped reduce avoidable accessibility issues before those colour combinations were repeated across interface components and brand materials.",
    notes: [
      "The value here was in systematically testing the full brand palette rather than only reviewing a few obvious combinations.",
      "The end result was guidance on unsafe colour pairings, which is often more actionable than abstract accessibility principles on their own.",
    ],
    imageSrc: "/carmignac-accessibility-testing.png",
    imageAlt: "Accessibility testing board showing colour palette variations and comparisons",
    allowExpand: false,
  },
];

export const searchEngineWorkspaceStages: UxPortfolioWorkspaceStage[] = [
  {
    slug: "introduction",
    label: "Introduction",
    title: "Locating physical products.",
    criticalText:
      "Seeing physical products in person still matters. Despite improvements in product photography, reviews, and digital presentation, there is no real substitute for being able to inspect an item physically before buying.\n\nHowever, locating the nearest physical example of a product can be surprisingly difficult. Search engines are useful for finding brands, retailers, and product pages, but they are less effective at answering a more practical question: where is the closest place this product can actually be seen in person?\n\nThis project began by examining one existing search process and using it as a starting point for a broader exploration. The first step was to map that process, then test whether it could be structured, challenged, and developed into something more useful.",
    notes: [
      "This project was prompted by a personal problem and became an exploration of how people view physical products in a context where ecommerce is becoming increasingly common.",
    ],
    imageGallery: [
      {
        src: "/product-finder-gallery-1.jpeg",
        alt: "A product being tried on in person",
      },
      {
        src: "/product-finder-gallery-2.jpeg",
        alt: "A product being tried on in person",
      },
      {
        src: "/product-finder-gallery-3.png",
        alt: "A product being tried on in person",
      },
      {
        src: "/product-finder-gallery-4.png",
        alt: "A product being tried on in person",
      },
    ],
    allowExpand: false,
  },
  {
    slug: "introduction-continued",
    label: "Outlining Existing Process",
    title: "Capturing my current process.",
    criticalText:
      "I began by sketching out my current process: how I typically went about looking for products near me, and then attempting to formalise it into a process flow.\n\nIn practice, that often meant considering key aspects of the product that would make it more likely to be found in one type of vendor rather than another.\n\nTurning that repeated but informal behaviour into something visible made it easier to see where the friction sat, which steps were repetitive, and which parts might eventually be structured into a more useful system.",
    notes: [
      "This page documents the current behaviour rather than proposing a finished interaction model.",
      "The value of this step is in making an existing search habit visible enough to inspect.",
    ],
    imageSrc: "/product-finder-existing-process.png",
    imageAlt: "Diagram of the existing product-finding process",
    allowExpand: false,
  },
  {
    slug: "logic-sketch",
    label: "Existing System → Usable Process",
    title: "Converting a usable process from the existing system",
    criticalText:
      "Once the current process had been captured, the next step was to develop it into something more functional. The aim was no longer just to describe what happened, but to work out how that behaviour might be organised into a system that could actually operate.\n\nThis meant defining the decision points more clearly, separating broad search intent from product-specific logic, and working through how the process might adapt when evidence was weak, when the exact item was unavailable, or when only similar products could be found. In other words, this stage marked the shift from documenting a behaviour to developing a model that could begin to support one.",
    notes: [
      "This is the transition point between capturing the current process and trying to make it operational.",
      "The model is still a hypothesis, but it is detailed enough to start being tested and challenged.",
    ],
    imageSrc: "/search-engine-logic-flow.png",
    imageAlt: "Logic flow sketch for the Search Engine project",
    allowExpand: false,
  },
  {
    slug: "preparing-to-test",
    label: "Preparing to test",
    title: "Preparing to test",
    criticalText:
      "The next challenge was to find a way to test this search procedure without first building a full search engine. To create something that could be shown to people quickly, the process flow was used as an instruction set for an AI model. The model would be asked to follow that process while attempting to find the product a participant wanted to see.\n\nThat required two things: a clear testing setup, and a repeatable session procedure. Each session should begin in a fresh chat with no prior context, memory disabled, and the same prompt framing, instructions, and starting conditions. The participant flow also needed to be consistent enough that sessions could be compared without turning the conversation into a rigid script.",
    notes: [
      "This combines the setup logic and the repeatable participant procedure into one stage because they are part of the same testing design decision.",
      "The approach is useful for testing the process quickly, but it is not the same as building the real product.",
      "Large language models can hallucinate, improvise beyond the intended flow, or produce inconsistent results between similar sessions, so any findings need to be interpreted with that limitation in mind.",
    ],
    galleryLayout: "full-width",
    galleryItemDivider: true,
    imageGallery: [
      {
        src: "/product-finder-testing-setup-v2.png",
        alt: "Diagram showing the process being given to an LLM for testing",
        width: 1600,
        height: 900,
      },
      {
        src: "/product-finder-testing-procedure.svg",
        alt: "Flow diagram of the testing procedure used with each participant",
        width: 1600,
        height: 900,
      },
    ],
    allowExpand: false,
  },
  {
    slug: "moderation-guide",
    label: "Moderation Guide",
    title: "Product Finder - Interview Guide",
    criticalText:
      "This page contains the working guide for early Product Finder interviews. It is intended to keep sessions comparable while still allowing the conversation to follow the participant's real experience.\n\nThe discussion should begin broadly with how someone shops for products online, then narrow into frustrations, moments where seeing a product in person matters, and finally the evidence they would need before making a trip.",
    guideSections: [
      {
        title: "Interview Goals",
        items: [
          "Understand how people usually shop for products online, how they compare options, and where that process becomes frustrating or inefficient.",
          "Explore when people feel the need to see a product in person, how they try to make that happen, and what information they rely on before acting.",
          "Learn what makes a result feel credible enough to trust, especially when time, travel, or uncertainty are involved.",
        ],
      },
      {
        title: "Format",
        items: [
          "45 minutes with people who regularly buy products online and have experience making considered purchases across categories where physical inspection can sometimes matter.",
          "For a personal project, recruit a small spread from your own network, aiming for variety in age, shopping habits, and product categories rather than a highly specific screening rule.",
          {
            text: "Use a fresh AI chat every time, with memory disabled and no previous context. Keep the system instruction, opening prompt, model, and web-search settings consistent.",
            suggestion:
              "Suggestion: tighten recruitment slightly by ensuring at least some participants have had a recent considered purchase in the last 3 to 6 months where physical inspection mattered or almost mattered.",
          },
          "Make clear that any assisted search is an early prototype and that results are exploratory rather than confirmed.",
        ],
      },
      {
        title: "Before the session",
        items: [
          "Prepare the fresh chat, process-flow instruction, and recording or note-taking setup with consent.",
          "Have a few broad product categories in mind in case the participant needs help recalling an example, but let them choose the specific case.",
          {
            text: "Use a real or recent shopping situation where they can talk concretely about what they did, what they were unsure about, and what happened next.",
            suggestion:
              "Suggestion: pilot the guide once or twice before running real sessions, and use a separate note-taker where possible so you can focus on moderation.",
          },
        ],
      },
      {
        title: "1. Welcome and framing - 3 minutes",
        items: [
          "Explain that the session is about how they shop for products online, what helps them decide, and when digital information stops being enough.",
          "Mention that later in the session you will show an early assisted search approach and ask them to react to it.",
          {
            text: "Ask permission to record or take notes, and confirm they can skip anything they do not want to answer.",
            suggestion:
              "Suggestion: make this full informed consent rather than a quick permission check. Cover what is being recorded, how it will be used, who will see it, and that they can stop at any time.",
          },
        ],
      },
      {
        title: "2. Start broad: online shopping habits - 10 minutes",
        items: [
          {
            text: "Start with a recent online purchase or product search and let them tell the story in their own words.",
            suggestion:
              "Suggestion: bias toward a purchase that involved comparison, uncertainty, or effort, rather than a routine low-stakes purchase, so the session stays analytically useful.",
          },
          "Cover their usual process: where they start, how they compare options, what sources they use, and what typically slows them down or creates doubt.",
          "Listen for practical behaviours, not abstract opinions: what they checked, what they ignored, and what helped them move forward.",
        ],
      },
      {
        title: "3. Narrow in: when digital stops being enough - 10 minutes",
        items: [
          "Move into examples where they wanted to see a product physically before buying, or seriously considered doing so.",
          "Cover what triggered that need, how they tried to work out where to go, what information they looked for, and what felt uncertain.",
          "Explore how they decide whether a trip is worth it, and what evidence would make them confident enough to act.",
        ],
      },
      {
        title: "4. Introduce the early test - 3 minutes",
        items: [
          {
            text: "Frame the assisted search as one possible way of helping with the problem they have just described.",
            suggestion:
              "Suggestion: keep the framing maximally neutral. Avoid implying it should be helpful; position it as an early approach you want to examine for strengths, gaps, and hesitation points.",
          },
          "Use a product and search area that are meaningful to the participant, and note what they would count as a useful outcome before you begin.",
        ],
      },
      {
        title: "5. Run the assisted search - 12 minutes",
        items: [
          "Ask the participant to enter or describe the product. Run the same AI setup used for every participant.",
          "Keep prompts open and observational. Focus on what they notice, what they understand, what they doubt, and what they would do next.",
          "If the model asks a clarification question, let the participant answer naturally and record the exchange.",
          {
            text: "Observe whether the result feels useful, whether uncertainty is visible, and what still needs to be checked before they would rely on it.",
            suggestion:
              "Suggestion: treat this as concept evaluation rather than pure interviewing. If you want stronger evidence later, add a more task-based validation step that shows what they would actually do next.",
          },
        ],
      },
      {
        title: "6. Look back at the result - 5 minutes",
        items: [
          "Ask what was useful, what was missing, and what they would still need before making a decision.",
          "Compare it with their usual approach: did it save time, add confidence, or create new doubts?",
          "Probe for trust: what made parts of the result believable or questionable?",
        ],
      },
      {
        title: "7. Close - 2 minutes",
        items: [
          "Ask whether there is anything important about this kind of shopping or product-checking behaviour that has not yet come up.",
          "Thank them and close cleanly.",
        ],
      },
      {
        title: "After the session",
        items: [
          "Capture the participant context, the shopping situation discussed, key frustrations, moments where physical inspection mattered, and the AI result.",
          {
            text: "Record what they trusted, what they questioned, and what evidence they still needed.",
            suggestion:
              "Suggestion: separate raw observations, participant quotes, and your interpretation into distinct layers so findings do not get mixed with notes too early.",
          },
          "Log test-setup issues such as hallucinations, inconsistent behaviour, missed flow steps, or search limitations. Keep questions and patterns to revisit in the next session.",
        ],
      },
      {
        title: "Moderator reminders",
        items: [
          "Treat each section as a checklist of topics to cover, not a script to read out word-for-word.",
          "Follow the participant's story. Ask for examples, actions, and decisions before opinions or hypotheticals.",
          "Keep questions neutral. Avoid implying that seeing products in person is always necessary or that the assisted search should be useful.",
          "Do not defend the AI or explain away an unclear result. Treat useful, inaccurate, and uncertain results as different outcomes.",
          "Do not turn one participant's experience into a general finding. Keep the core setup stable across sessions.",
        ],
      },
    ],
    notes: [
      "This is the working interview guide used to keep sessions comparable while leaving room to follow each participant's experience.",
      "The most important outputs are shopping behaviours, decision points, frustrations, and trust signals rather than polished opinions about the prototype.",
    ],
  },
];

export const portfolioProjects: readonly PortfolioProjectCard[] = [
  {
    slug: "spaces",
    eyebrow: "Personal project",
    title: "Spaces",
    subtitle:
      "A UX exploration of cafe users and cafe owners within the work-from-cafe ecosystem, examining how both sides of the experience can be better understood and improved.",
    includes: [
      "User Research",
      "User Journeys",
      "User Stories",
      "Framing 'How Might We?' Questions",
      "Process Flows",
      "IA",
      "Wireframe",
    ],
    summary:
      "A structured case study exploring how cafe-workers discover, evaluate, and choose work-friendly spaces. The project moves from framing and journey thinking through to information architecture and wireframe-level decisions.",
    notes: [
      "Useful as a public example of end-to-end UX thinking across research, prioritisation, flows, and early interface structure.",
      "Some artefacts are illustrative rather than drawn from live client delivery; that distinction is made explicitly inside the case study.",
    ],
    href: "/ux-portfolio",
    ctaLabel: "Open case study",
  },
] as const;

export const uxPortfolioProjects: UxPortfolioProject[] = [
  {
    slug: "spaces-ux-passion-project",
    title: "Spaces",
    summary:
      "A UX passion project structured as a sequence of research, synthesis, mapping, and interface-development steps.",
    role: "UX research and UX design",
    timeline: "Case study build in progress",
    tags: ["Research", "Mapping", "Flows", "Wireframes"],
    sections: [
      {
        slug: "methodology",
        title: "Methodology",
        notes: [
          "The project is structured as a sequence of individual steps rather than a single long narrative block.",
          "Each step pairs one image with one set of notes so the reasoning stays close to the artefact.",
        ],
      },
      {
        slug: "research-setup",
        title: "Research Setup",
        notes: [
          "Interview preparation, note-taking setup, and synthesis approach are shown as separate visual steps.",
          "Notes explain what the artefact is doing and why it matters in the overall process.",
        ],
      },
      {
        slug: "journey-mapping",
        title: "Journey Mapping",
        notes: [
          "Task-specific stages and journey logic are documented one step at a time.",
          "This makes it easier to show how insights move into structure, priorities, and flows.",
        ],
      },
    ],
  },
];

export const uxPortfolioWorkspaceStages: UxPortfolioWorkspaceStage[] = [
  {
    slug: "introduction",
    label: "Introduction",
    title: "A UX exploration for cafe-workers",
    criticalText:
      "Remote and flexible work has pushed more people into public spaces as alternatives to home or office. For many, a cafe offers the right mix of atmosphere, anonymity, and energy.\n\nFinding a good place to work is harder than it should be. Existing tools don't highlight what is useful for working, rarely convey the space owners views on the space being used for focus, and are often not updated reliably.",
    notes: [
      "\"Recently, I had a few hours to spare in Barcelona and decided it would be a great chance to look through and edit some of the photos I'd taken on my trip. With no obvious work spots nearby, I searched Google Maps and found a cafe that looked promising, so I crossed town to what turned out to be a hidden gem. The place was beautiful: excellent natural light, minimal yet rustic decor, a quiet street, and from what I could tell the promise of an excellent cup of coffee. Without hesitation I ordered, took my seat, and opened my laptop, ready to edit.\n\nAs the barista brought over my drink, they politely informed me that I was welcome to stay as long as I liked. But this was a laptop-free coffee shop.\"",
      "~ Personal anecdote",
    ],
    imageSrc: "/portfolio-lab/v2/1-1.png",
    imageAlt: "16 by 9 introduction image for the UX portfolio case study",
    allowExpand: false,
  },
  {
    slug: "project-methodology",
    label: "Project Methodology",
    title: "Four conceptual stages",
    criticalText:
      "This exploration involved typical UX exercises structured around four conceptual stages, progressing from the strategy of the project, to the detailed structure of elements on the page. Following this order of thinking helped make relevant design decisions, with the necessary context, at the right time.",
    notes: [
      "These stages are from Jesse James Garrett's Five Stages of User Experience.",
      "This project focused on UX exploration, and omits the 5th stage which is UI focused.",
    ],
    imageSrc: "/portfolio-lab/v2/2.png",
    imageAlt: "Project process diagram showing strategy, scope, structure, and skeleton",
    allowExpand: false,
  },
  {
    slug: "interview-setup",
    label: "Interview Setup (illustrative) [User Research]",
    title: "One-moderator setup",
    criticalText:
      "Note-taking setup for single-moderator interviews. Where a separate note-taker can attend, they can use the same structure, ideally be on the same board/workspace if the software allows.\n\nIn this example, Interview script and colour coded post-its ready in Miro.",
    notes: [
      "This is illustrative of how research would be prepared and conducted, but no actual research was carried out for this project.",
    ],
    imageSrc: "/portfolio-lab/v2/3.png",
    imageAlt: "User interview setup artefact",
  },
  {
    slug: "research-synthesis",
    label: "Research Synthesis (illustrative)",
    title: "Synthesis process",
    criticalText:
      "Research findings can be synthesised by grouping feedback into themes.\n\nRecurring points can be summarised in a single post-it. Points that were mentioned multiple times can be indicated with a coloured dot.\n\nThis exercise can be more affective when done with a few people, as it makes the process of grouping faster and priority dots can be discussed when being allocated.",
    notes: [
      "Again, this is illustrative of how research would be prepared and conducted, but no actual research was carried out for this project.",
    ],
    imageSrc: "/portfolio-lab/v2/4.png",
    imageAlt: "Research synthesis artefact",
  },
  {
    slug: "journey-space-user",
    label: "User Journey - Space User [User Journeys]",
    title: "Space Users",
    criticalText:
      "Creating informed user journeys based upon current practices and real data.\n\nThis journey maps how a user moves through discovery, evaluation, selection, through to after they have engaged with the service. It makes the sequence of needs and frictions visible before interface-level design choices are introduced.",
    notes: [
      "For the purpose of the investigation, I regularly asked cafe employees and cafe users their thoughts on the subject of using cafe spaces to work.",
    ],
    imageSrc: "/portfolio-lab/v2/5.png",
    imageAlt: "User journey for space users",
  },
  {
    slug: "journey-space-owner",
    label: "User Journey - Space Owner [User Journeys]",
    title: "Space Owners",
    criticalText:
      "The owner journey captures a different operational perspective, with different tasks, motivations, and anxieties. Showing both sides helps explain why the system needed separate views and decision paths.",
    notes: [
      "For the purpose of the investigation, I regularly asked cafe employees and cafe users their thoughts on the subject of using cafe spaces to work.",
    ],
    imageSrc: "/portfolio-lab/v2/6.png",
    imageAlt: "User journey for space owners",
  },
  {
    slug: "user-stories",
    label: "User Stories [User Stories]",
    title: "Building Personas",
    criticalText:
      "User stories translated journey-level observations into specific user needs that the product would need to support. At this stage, the work moved from describing behaviours and pain points to defining what users needed to achieve, under what conditions, and why those needs mattered.\n\nThis made the problem space more actionable. Rather than designing around a broad idea of finding a good cafe to work from, the stories created a more precise requirements lens for prioritising features, structuring key flows, and testing whether each design decision solved a meaningful user problem.",
    notes: [
      "The stories were used as a framing tool for prioritisation, not as a full requirements specification.",
      "Their primary value was in preserving a user-centred definition of success as the work moved into scope and structure.",
    ],
    imageSrc: "/portfolio-lab/v2/7.png",
    imageAlt: "User stories artefact",
  },
  {
    slug: "hmw",
    label: "Creating & Qualifying HMW(?)'s [HMW?]",
    title: "How Might We? qualification",
    criticalText:
      "The How Might We exercise converted identified user needs into opportunity statements that were broad enough to encourage exploration but focused enough to be useful. This created a working bridge between research interpretation and solution framing.\n\nQualifying these questions was as important as generating them. Comparing their likely value, relevance, and feasibility helped reduce the number of directions being pursued and made the initial product scope easier to define with intent rather than breadth.",
    notes: [
      "Not every HMW statement was taken forward; some were too broad, too weakly evidenced, or too far from the core use case.",
      "The qualification step helped distinguish interesting ideas from strategically useful ones.",
    ],
    imageSrc: "/portfolio-lab/v2/8.png",
    imageAlt: "How Might We qualification artefact",
  },
  {
    slug: "defining-scope",
    label: "Defining Scope",
    title: "Product Requirements",
    criticalText:
      "Scope definition translated the earlier research, journeys, and HMW exercises into a manageable first product shape. At this point, the goal was not to capture every possible feature, but to identify the minimum set of capabilities required to support the core value proposition clearly and credibly.\n\nThis stage was important because it introduced constraint into the process. It clarified what the first version of the product needed to do, what could be deferred, and which decisions were essential for maintaining alignment between user needs, business logic, and interface complexity.",
    notes: [
      "The scope was intentionally kept narrow enough to protect clarity in the primary user journeys.",
      "Features that added operational or technical complexity without strengthening the core task were deprioritised.",
    ],
    imageSrc: "/portfolio-lab/v2/10.png",
    imageAlt: "Scope definition within the project process diagram",
  },
  {
    slug: "process-flows",
    label: "Process Flows (In-life & Signup) [Process Flows]",
    title: "Mapping how users will engage with the product",
    criticalText:
      "The process flows mapped how users would move through the product across key scenarios, including first-time signup and in-life use. This shifted the work from feature definition into interaction logic, making it easier to test the order of steps, identify dependencies, and remove unnecessary friction.\n\nThis stage was especially useful for checking whether the product supported the user's primary goal at the right moment. In particular, it helped assess where account creation, profile setup, or additional actions might interrupt task completion rather than enable it.",
    notes: [
      "Design inference: signup should introduce as little friction as possible, particularly for first-time users arriving with an immediate need.",
      "The flows were also used to expose edge cases before wireframing, where changes are usually more expensive to reason through.",
    ],
    imageSrc: "/portfolio-lab/v2/12.png",
    imageAlt: "Process flows for in-life and signup journeys",
  },
  {
    slug: "ia-user-view",
    label: "Information Architecture - (User View) [IA]",
    title: "User-view information architecture",
    criticalText:
      "The user-view architecture explains how content, navigation, and decision points were grouped for the primary audience. Before any visual treatment was introduced, this stage was used to test whether the product felt legible at a structural level.",
    notes: [
      "Information was grouped to support fast comparison, low-friction navigation, and clear progression into deeper detail.",
      "User feedback was treated as decision-support content rather than as a social layer.",
    ],
    imageSrc: "/portfolio-lab/v2/13.png",
    imageAlt: "Information architecture for the user view",
  },
  {
    slug: "ia-owner-view",
    label: "Information Architecture - (Owner View) [IA]",
    title: "Owner-view information architecture",
    criticalText:
      "The owner-view architecture was structured around operational oversight rather than discovery. Unlike the user-facing side of the product, which prioritised search, evaluation, and decision-making, the owner side needed to support space management, expectation-setting, and response to changing conditions within a live environment.\n\nThis divergence was important to make explicit. Although both sides of the product relate to the same service, they do not share the same tasks, mental models, or success criteria. Separating the architecture helped prevent the owner experience from inheriting patterns that only made sense in the user journey.",
    notes: [
      "Policies and expectations likely need to be managed at the individual space level rather than only at the owner-account level.",
      "A consolidated view of user feedback may be necessary, but the method of consolidation would need careful validation.",
    ],
    imageSrc: "/portfolio-lab/v2/14.png",
    imageAlt: "Information architecture for the owner view",
  },
  {
    slug: "home-user-view",
    label: "Home Screen - (User View) [Wireframe]",
    title: "User home screen",
    criticalText:
      "The user home screen translated the earlier architecture into an interface that prioritised location-based discovery. Because the primary user need is to find a suitable place to work, the homepage was designed around a map view that makes nearby options visible immediately and supports rapid situational decision-making.\n\nThis screen establishes the product's primary mode of use. It brings together browsing, filtering, and early evaluation in one place, while keeping the user's task focused on identifying viable spaces rather than navigating through unnecessary layers of interface.",
    notes: [
      "The map view reflects the fact that this problem is highly location-dependent.",
      "Direct user-to-owner messaging was intentionally excluded from scope to avoid adding operational burden without a clear reciprocal benefit.",
    ],
    imageSrc: "/portfolio-lab/v2/15.png",
    imageAlt: "Home screen wireframe for the user view",
  },
  {
    slug: "home-list-user-view",
    label: "Home Screen List View - (User View) [Wireframe]",
    title: "User list view",
    criticalText:
      "The list view provided an alternative browsing mode for users who prefer comparison through structured content rather than geography alone. It supported scanning, shortlisting, and recognition, while still keeping the interaction tightly connected to the same decision criteria established elsewhere in the product.\n\nThis view was also used to explore progressive disclosure. By allowing the card interaction to reveal more information before committing to a detail page, the design tested how much context users needed in order to decide whether to continue, compare further, or move deeper into a specific space.",
    notes: [
      "The first interaction expands the card to support quick evaluation without forcing navigation away from browsing.",
      "The second interaction moves the user into the full detail page once sufficient relevance has been established.",
      "An open design question was whether the preview content should adapt to the user's active filters.",
    ],
    imageSrc: "/portfolio-lab/v2/16.png",
    imageAlt: "Home screen list view wireframe for the user view",
  },
  {
    slug: "space-detail-user-view",
    label: "Space Detail Page - (User View) [Wireframe]",
    title: "User detail page",
    criticalText:
      "The detail page is where confidence, information depth, and decision support come together. This screen translates the broader system into one focused interaction moment, where a user decides whether a space is suitable for the kind of work they need to do.\n\nIts role is not simply to provide more information, but to reduce uncertainty. The page needed to surface the signals most relevant to trust, fit, and next-step confidence without forcing the user through unnecessary interpretation.",
    notes: [
      "The page needed to balance completeness with scanability so that users could evaluate a space without excessive cognitive load.",
      "Trust depended on presenting both owner-provided information and signals that helped users validate the space independently.",
    ],
    imageSrc: "/portfolio-lab/v2/17.png",
    imageAlt: "Space detail page wireframe for the user view",
  },
  {
    slug: "home-owner-view",
    label: "Home Screen - (Owner View) [Wireframe]",
    title: "Owner home screen",
    criticalText:
      "The owner home screen was designed as an operational overview rather than a browsing experience. Its purpose was to help space owners understand the current state of their space quickly, identify issues that may require attention, and manage information that influences how the space is perceived and used.\n\nFor that reason, the interface prioritised status visibility over exploration. Time-sensitive issues such as service disruptions, policy conflicts, or recurring complaints needed to surface clearly, while less urgent information could remain accessible without competing for attention in the primary view.",
    notes: [
      "Unlike the user side of the product, there is no need for a map-led homepage in the owner view.",
      "A notifications layer is useful here because it can surface operational issues without forcing owners into a full management workflow immediately.",
      "Even for a single-space owner, an overview screen offers a softer and more legible entry point than dropping directly into a detailed management page.",
    ],
    imageSrc: "/portfolio-lab/v2/18.png",
    imageAlt: "Home screen wireframe for the owner view",
  },
];

export const watchlistWorkspaceStagesArchive: UxPortfolioWorkspaceStage[] = [
  {
    slug: "project-brief",
    label: "Project Brief [Context]",
    title: "Using television tracking to investigate interaction design",
    criticalText:
      `This project is not an argument that another television-tracking product should exist. Television is a familiar context for studying how people remember future events, make plans with incomplete information, filter a changing collection, and decide what deserves attention next.

The portfolio case study is the deliverable. Its value depends on making assumptions, evidence, alternatives, revisions, and unresolved questions visible—not on presenting a polished interface as if the problem had already been proven.`,
    notes: [
      "Status: active investigation. The first interaction concepts are ready; user research and usability testing have not yet been conducted.",
      "A disproved assumption is a useful outcome because it improves the quality of the design decision.",
    ],
    guideSections: [
      {
        title: "Primary learning objective",
        items: [
          "Demonstrate how interaction models are generated, compared, tested, revised, and explained.",
          "Give particular attention to planning horizons, progressive disclosure, uncertainty, filtering, state changes, accessibility, and cross-device behaviour.",
        ],
      },
      {
        title: "Case-study success criteria",
        items: [
          "Every significant decision is traceable to an assumption, observation, desk-research source, or validation result.",
          "At least three interaction models are explored before a direction is selected for prototyping.",
          "Research findings and participant language are never invented to make the narrative feel complete.",
          "The final reflection records what changed, what remains uncertain, and what should happen next.",
        ],
      },
      {
        title: "Boundaries",
        items: [
          "In scope: a lightweight research plan, landscape observations, interaction exploration, low-fidelity wireframes, a testable prototype, and a decision log.",
          "Out of scope: proving market demand, building a live content catalogue, creating accounts, integrating streaming APIs, or visually redesigning the portfolio website.",
        ],
      },
    ],
  },
  {
    slug: "problem-framing",
    label: "Problem Framing [Strategy]",
    title: "Starting with beliefs, not pretending they are findings",
    criticalText:
      `The starting point is a personal frustration: release information, saved titles, and viewing intentions can live in different places. That experience is real for me, but it is not evidence that a wider group experiences the same problem or wants to plan television across a year.

I have therefore written the product premise as a set of falsifiable assumptions. The next stages should narrow, revise, or reject them before the interface is treated as a solution.`,
    notes: [
      "The initial problem statement is deliberately provisional: it describes what might be happening and identifies what must be learned.",
      "Success is not agreement with the premise. Success is a clearer explanation of the behaviour and a better-supported design decision.",
    ],
    imageSrc: "/watchlist/methodology.svg",
    imageAlt: "Watchlist investigation process from ambiguity through evidence, interaction exploration, validation, and reflection",
    allowExpand: false,
    evidenceItems: [
      {
        status: "Initial assumption",
        statement: "Existing tracking products focus more strongly on discovery, logging, ratings, and recommendations than on planning future seasons.",
        implication: "The landscape review must test this rather than repeat it as a market claim.",
      },
      {
        status: "Initial assumption",
        statement: "Release information is fragmented across streaming services and entertainment sources.",
        implication: "Research needs to identify whether fragmentation creates meaningful work or is merely inconvenient.",
      },
      {
        status: "Initial assumption",
        statement: "People who actively follow many shows may struggle to remember what is returning and when.",
        implication: "The relevant audience, frequency, and consequences of this behaviour are not yet known.",
      },
      {
        status: "Initial assumption",
        statement: "Visibility of future releases could help people plan what they watch.",
        implication: "The natural planning horizon could be seven days, one month, a season, a year, or no future planning at all.",
      },
      {
        status: "Initial assumption",
        statement: "Anticipation and planning may be as valuable as recommendation.",
        implication: "Interviews should compare real planning behaviour with the stronger and more familiar discovery behaviour.",
      },
      {
        status: "Personal observation",
        statement: "I sometimes save a title in one place and later search again for its date, service, or release pattern.",
        implication: "This is a valid starting observation, but it describes one person and must remain labelled as such.",
      },
    ],
  },
  {
    slug: "landscape",
    label: "Landscape Review [Research]",
    title: "Calendars already exist, so the question is about behaviour and fit",
    criticalText:
      `A first desk-research pass challenged the belief that future planning is simply absent. Trakt and Simkl already expose calendars or upcoming-release behaviour; JustWatch combines cross-service availability with new and upcoming content; Serializd focuses more visibly on tracking, diaries, reviews, community, and discovery.

This does not invalidate the project. It moves the opportunity away from an unsupported feature-gap claim and toward a more useful interaction question: what planning horizon, level of maintenance, and treatment of uncertainty fit the way people actually make viewing decisions?`,
    notes: [
      "Evidence type: public product documentation and support material reviewed on 3 August 2026.",
      "This is a UX pattern review, not a scored feature comparison and not evidence of how successfully people use those features.",
    ],
    evidenceItems: [
      {
        status: "Desk research",
        statement: "Trakt provides personalised calendars that can use watched, collected, and watchlisted content, with week/month and list/grid views.",
        implication: "A calendar cannot be presented as a novel or clearly underserved interaction pattern.",
        sourceLabel: "Trakt Calendars",
        sourceHref: "https://forums.trakt.tv/t/trakt-calendars/19099",
      },
      {
        status: "Desk research",
        statement: "JustWatch combines a cross-service watchlist with availability search and separate new/upcoming release views.",
        implication: "Availability aggregation and upcoming-content browsing are established patterns; the open question is how they relate to a person's own intentions.",
        sourceLabel: "JustWatch streaming guide",
        sourceHref: "https://www.justwatch.com/",
      },
      {
        status: "Desk research",
        statement: "Simkl emphasises automatic tracking, missed-episode counts, calendars, new-episode alerts, and recommendations.",
        implication: "Maintenance burden and automation should be studied alongside the timeline itself.",
        sourceLabel: "Simkl watchlist",
        sourceHref: "https://simkl.com/watchlist/",
      },
      {
        status: "Desk research",
        statement: "Serializd foregrounds tracking, diaries, ratings, reviews, social discussion, and member-led discovery.",
        implication: "Planning is only one possible job in a category where identity, memory, and community can be more salient.",
        sourceLabel: "Serializd product overview",
        sourceHref: "https://serializd.com/",
      },
    ],
    guideSections: [
      {
        title: "Cross-product UX observations",
        items: [
          "Tracking products divide a person's collection into several states: saved, watching, progress, history, dropped, and completed.",
          "Calendar views often inherit content from the wider tracking system, reducing manual setup but increasing model complexity.",
          "Availability, reminders, and progress are usually connected to discovery and logging rather than treated as a standalone planning task.",
          "Existing patterns still leave a research question around how far ahead people naturally think and how much uncertainty they tolerate.",
        ],
      },
      {
        title: "What desk research cannot establish",
        items: [
          "Whether people notice, understand, or regularly use the existing calendar features.",
          "Whether future planning changes viewing decisions or simply produces another list to maintain.",
          "Whether a yearly view creates orientation or an unrealistic sense of precision.",
        ],
      },
    ],
  },
  {
    slug: "user-understanding",
    label: "User Understanding [Research]",
    title: "Research behaviour before asking people to validate a calendar",
    criticalText:
      `The current behaviour map is a self-observation, not a user journey. It shows one possible loop—hearing about a show, saving it, checking a date, finding a service, watching, and returning—but it cannot support a general design decision on its own.

The first research round should reconstruct recent real examples before showing any concept. This reduces confirmation bias and helps reveal whether the meaningful job is planning, remembering, choosing, avoiding spoilers, coordinating with others, or something else entirely.`,
    notes: [
      "Proposed sample: five to seven people who follow recurring shows across more than one service, including both active trackers and people using informal methods.",
      "No personas or research findings will be added until patterns can be traced to actual sessions.",
    ],
    imageSrc: "/watchlist/current-behaviour.svg",
    imageAlt: "Self-observation map of the current loop for hearing about, saving, checking, locating, and watching a television show",
    allowExpand: false,
    evidenceItems: [
      {
        status: "Self-observation",
        statement: "The same title can be rediscovered several times because its release date, availability, and viewing intention are stored separately.",
        implication: "Ask participants to reconstruct the information trail for a real recent example.",
      },
      {
        status: "Research question",
        statement: "Do people plan television viewing ahead, and if so, what is their natural planning horizon?",
        implication: "Compare recent behaviour with seven-day, thirty-day, seasonal, and yearly concept views.",
      },
      {
        status: "Research question",
        statement: "What makes release information actionable rather than merely interesting?",
        implication: "Probe for service availability, schedule, household coordination, episode pattern, and confidence in the date.",
      },
      {
        status: "Provisional job",
        statement: "When I hear that a show is returning, help me preserve enough context to act later without repeatedly looking it up.",
        implication: "Treat this as a hypothesis to refine, split, or reject after research.",
      },
    ],
    guideSections: [
      {
        title: "1. Recent behaviour interview",
        items: [
          "Tell me about the last show you were waiting to return. Start from when you first heard about it.",
          "What did you save, check, or remember? Show me the places involved if you are comfortable doing so.",
          "When did the release become relevant to a real decision? What did you still need to know?",
          "Tell me about a show you meant to watch but forgot, delayed, or abandoned.",
        ],
      },
      {
        title: "2. Collection walkthrough",
        items: [
          "Ask participants to use their own watchlist, notes, messages, calendar, streaming apps, or memory rather than a prepared dataset.",
          "Observe categories they already use and where status becomes ambiguous or expensive to maintain.",
          "Separate what the participant does from what they say they would ideally do.",
        ],
      },
      {
        title: "3. Concept comparison",
        items: [
          "Show the annual map, next-up queue, and hybrid horizon in a counterbalanced order.",
          "Ask what each view helps them notice, what feels missing, and what appears to demand maintenance.",
          "Use their real shows where possible; do not ask which concept they simply prefer until the task discussion is complete.",
        ],
      },
      {
        title: "4. Lightweight diary",
        items: [
          "For one week, capture moments when participants hear about, save, check, start, postpone, or forget a show.",
          "Record the trigger, information needed, source used, confidence, action taken, and whether the moment was about planning or immediate choice.",
        ],
      },
      {
        title: "Analysis safeguards",
        items: [
          "Keep raw observation, participant language, interpretation, and design implication in separate columns.",
          "Actively log counterexamples and people who do not plan ahead.",
          "Do not convert repeated feature requests directly into requirements; trace them back to the underlying situation and job.",
        ],
      },
    ],
  },
  {
    slug: "define",
    label: "Define [Framing]",
    title: "A provisional problem statement that research is allowed to change",
    criticalText:
      `People who actively follow recurring television may need a low-effort way to preserve and revisit future-release context across services, especially when dates are incomplete or changing. The design opportunity is not to maximise tracking. It is to reduce the work required to understand what is relevant next.

This statement remains provisional because the audience, frequency, planning horizon, and cost of the current behaviour have not yet been established through user research.`,
    notes: [
      "The statement describes a behaviour to investigate, not a promise that a product should be built.",
      "The strongest reframing so far is from 'a better watchlist' to 'orientation with incomplete time information'.",
    ],
    imageSrc: "/watchlist/hmw.svg",
    imageAlt: "How Might We questions comparing planning horizon, uncertainty, maintenance, and decision context",
    allowExpand: false,
    guideSections: [
      {
        title: "Design principles",
        items: [
          "Evidence before feature: show why an interaction exists and what would cause it to change.",
          "Horizon before density: begin with the smallest useful time window and let people zoom out.",
          "Uncertainty is information: approximate, delayed, and unannounced releases should never look confirmed.",
          "Progressive disclosure: keep enough context close to the list without forcing every detail into the overview.",
          "Maintenance must earn its place: every status, preference, or notification setting adds work.",
          "Redundant communication: colour can support meaning but cannot be the only way status or confidence is expressed.",
        ],
      },
      {
        title: "How Might We questions",
        items: [
          "How might we help someone orient themselves without assuming they plan an entire year?",
          "How might we make release uncertainty useful rather than hiding it or inventing precision?",
          "How might we connect a future date to an immediate viewing decision without building another recommendation feed?",
          "How might we reduce repeated lookup work without creating a demanding tracking routine?",
        ],
      },
    ],
  },
  {
    slug: "explore",
    label: "Explore [Concepts]",
    title: "Three interaction models before one working direction",
    criticalText:
      `The first sketches compare three different organising principles. An annual release map privileges anticipation and overlap. A next-up queue privileges immediate action and mobile legibility. A hybrid horizon starts with the next thirty days and allows people to move between shorter and longer time windows.

The hybrid is the current prototype direction because it can test planning horizon as an interaction rather than hard-coding one answer. That is a design judgement based on flexibility and cross-device constraints—not yet a validated user preference.`,
    notes: [
      "Figma artefact: first-pass comparison board created on the shared Watchlist page.",
      "Selection status: provisional. The annual and next-up models remain live alternatives for testing.",
    ],
    imageSrc: "/watchlist/concept-models.svg",
    imageAlt: "Low-fidelity comparison of annual release map, next-up queue, and hybrid planning horizon concepts",
    allowExpand: false,
    evidenceItems: [
      {
        status: "Concept A",
        statement: "Annual release map: one row per show across a twelve-month axis.",
        implication: "Strong for overlap and anticipation; weak on small screens and vulnerable to false precision.",
      },
      {
        status: "Concept B",
        statement: "Next-up queue: a chronological list focused on the next seven to thirty days.",
        implication: "Strong for immediate decisions and mobile use; weak for seasonal orientation.",
      },
      {
        status: "Concept C",
        statement: "Hybrid horizon: a short chronological default with explicit controls for seven days, thirty days, season, and year.",
        implication: "Makes planning horizon testable; risks adding mode complexity and needs clear continuity between views.",
      },
    ],
    guideSections: [
      {
        title: "Comparison criteria",
        items: [
          "Orientation: what does the model help someone notice without opening details?",
          "Decision support: can the person identify what is relevant next and why?",
          "Uncertainty: can approximate information be shown without looking broken or misleading?",
          "Maintenance: what must the person continually update for the view to remain useful?",
          "Cross-device fit: does the model remain understandable without reproducing a dense desktop chart on mobile?",
        ],
      },
    ],
  },
  {
    slug: "interaction-design",
    label: "Interaction Design [Core]",
    title: "Designing the states around the timeline, not only the timeline",
    criticalText:
      `The core interaction is a change of planning horizon supported by filters and progressive disclosure. Selecting a show keeps the collection visible while revealing date confidence, release pattern, availability, and planning actions. Approximate and unannounced releases remain in the collection but use language and shape—not colour alone—to show their status.

The first pass also includes states that are easy to omit from a polished screen: no matching results, no known date, changing service availability, loading, delayed releases, keyboard focus, and reduced-motion behaviour.`,
    notes: [
      "Figma artefact: interaction-state board on the existing Watchlist page.",
      "Every current interaction remains a hypothesis until observed with real watchlists and tasks.",
    ],
    imageSrc: "/watchlist/interaction-states.svg",
    imageAlt: "Low-fidelity interaction states for filtering, progressive disclosure, uncertain release dates, and empty or loading conditions",
    allowExpand: false,
    evidenceItems: [
      {
        status: "Design hypothesis",
        statement: "A thirty-day default may provide enough anticipation without the density of a full-year view.",
        implication: "Compare task performance and participant reasoning across horizons rather than asking for preference alone.",
      },
      {
        status: "Design hypothesis",
        statement: "Keeping details beside the collection may reduce context switching when comparing several releases.",
        implication: "Test a side panel or inline expansion against a separate detail page.",
      },
      {
        status: "Design hypothesis",
        statement: "Uncertain dates should remain visible with explicit labels such as 'Expected September' and 'Date unannounced'.",
        implication: "Check whether people understand confidence and whether the information still feels actionable.",
      },
    ],
    guideSections: [
      {
        title: "Primary interaction sequence",
        items: [
          "Open on a short planning horizon with a clear explanation of what the window contains.",
          "Change horizon without losing the selected show, filters, or collection context.",
          "Filter by confidence, status, or service while announcing the new result count.",
          "Select a release to reveal detail progressively; close or move between rows without navigating away.",
          "Plan to watch or request a notification only when that action is meaningful.",
        ],
      },
      {
        title: "Edge cases to design deliberately",
        items: [
          "No release date, approximate month, delayed season, changed platform, regional availability, or simultaneous releases.",
          "Empty collection, no results after filtering, slow catalogue response, stale release information, and duplicate titles.",
          "A show that changes from unannounced to approximate to confirmed without losing the person's intent.",
        ],
      },
      {
        title: "Accessibility and cross-device rules",
        items: [
          "Status and confidence always use text labels in addition to colour or line style.",
          "Rows are keyboard-operable buttons with visible focus and persistent selected state.",
          "Mobile uses a chronological list rather than compressing a twelve-month chart into horizontal scrolling by default.",
          "State changes are announced to assistive technology and motion is non-essential.",
        ],
      },
    ],
  },
  {
    slug: "wireframes",
    label: "Wireframes [Skeleton]",
    title: "A first low-fidelity system for short and long planning horizons",
    criticalText:
      `The first wireframe combines a horizon control, chronological release list, confidence filtering, and a persistent detail panel. Desktop gives the collection and selected item equal status; mobile prioritises the sequence of upcoming moments and moves detail into an inline expansion.

The screen is intentionally unfinished. Its purpose is to expose structural questions: whether the horizon control is understandable, whether confidence belongs in the primary row, how much metadata supports a decision, and whether planning actions create more maintenance than value.`,
    notes: [
      "Figma artefact: first-version desktop, mobile, detail, and edge-state wireframes on the shared Watchlist page.",
      "Representative titles are fictional so release accuracy does not become part of the test.",
    ],
    imageSrc: "/watchlist/wireframes-v1.svg",
    imageAlt: "First-version desktop and mobile wireframes for the hybrid Watchlist planning horizon with selected-show detail and edge cases",
    allowExpand: false,
    guideSections: [
      {
        title: "Desktop overview",
        items: [
          "Purpose: compare upcoming releases while retaining selected-show context.",
          "User goal: understand what is relevant in the chosen horizon and inspect one item without losing the wider plan.",
          "Alternative considered: full-page detail. Rejected for the first test because it hides the comparison context.",
        ],
      },
      {
        title: "Mobile next-up view",
        items: [
          "Purpose: preserve chronological orientation on a narrow screen.",
          "User goal: scan upcoming moments and expand only the item that matters.",
          "Alternative considered: horizontally scrolling year chart. Deferred because it prioritises diagram fidelity over mobile legibility.",
        ],
      },
      {
        title: "Uncertainty and empty states",
        items: [
          "Purpose: make incomplete data part of the model rather than treating it as a failure state.",
          "User goal: understand what is known, what is not, and what action remains possible.",
          "Alternative considered: hiding unconfirmed releases. Rejected for testing because it removes the memory-support job from the concept.",
        ],
      },
    ],
  },
  {
    slug: "prototype",
    label: "Prototype [Testable]",
    title: "A working interaction for testing planning horizon and uncertainty",
    criticalText:
      `This functional first pass tests the hybrid model inside the existing case-study layout. It allows the planning horizon to change between seven days, thirty days, a season, and a year; filters confirmed and uncertain releases; preserves collection context while showing detail; and includes planning and notification actions.

The content is representative and the interface is deliberately low fidelity. The prototype is evidence of what can now be tested, not evidence that the design works.`,
    notes: [
      "Try changing the planning horizon, filtering for uncertain releases, selecting a show, and changing its plan or notification state.",
      "The next prototype iteration should use participants' real saved shows and real release situations.",
    ],
    interactivePrototype: "watchlist-planning-horizon",
    guideSections: [
      {
        title: "What this prototype can test",
        items: [
          "Whether people understand the horizon control and can predict what will enter or leave the view.",
          "Whether confidence labels clarify incomplete dates without making the list feel unreliable.",
          "Whether persistent detail supports comparison or competes with the release list.",
          "Whether 'plan to watch' and notification actions correspond to real behaviour or add unnecessary upkeep.",
        ],
      },
      {
        title: "What it cannot test yet",
        items: [
          "Long-term value, real release-data accuracy, service integrations, recommendation quality, or sustained maintenance behaviour.",
          "Whether the concept replaces or complements existing trackers, calendars, streaming apps, or informal methods.",
        ],
      },
    ],
  },
  {
    slug: "validation",
    label: "Validation [Plan]",
    title: "Observe decisions, not enthusiasm for the concept",
    criticalText:
      `Validation has not yet taken place. The first round should use five participants' own watchlists where possible and compare the three interaction models before testing the hybrid prototype in more detail.

The research goal is to observe whether the interaction improves orientation and supports a decision, where uncertainty causes hesitation, and what participants refuse to maintain. Positive comments alone will not be treated as validation.`,
    notes: [
      "Current status: research protocol prepared; no usability findings or revisions are being claimed.",
      "Unexpected behaviour, rejection of the premise, and preference for an existing tool are all valid outcomes.",
    ],
    evidenceItems: [
      {
        status: "Planned evidence",
        statement: "Behavioural observation using participants' own current and future shows.",
        implication: "Look for task strategy, information sought, hesitation, recovery, and spontaneous use of planning horizons.",
      },
      {
        status: "Planned evidence",
        statement: "Comprehension checks for confirmed, approximate, delayed, and unannounced release states.",
        implication: "Revise labels and hierarchy if participants infer more precision than the information supports.",
      },
      {
        status: "Evidence gap",
        statement: "No evidence yet shows that yearly planning is frequent enough to justify a dedicated view.",
        implication: "The year option may be removed even if it is visually distinctive.",
      },
    ],
    guideSections: [
      {
        title: "Core tasks",
        items: [
          "Using your own examples, show me what is relevant to watch in the next month and explain how you decided.",
          "Find a show whose release information is incomplete. Tell me what you believe is known and what you would do next.",
          "Change from immediate planning to a longer overview, then return without losing the show you were considering.",
          "Set up the minimum notification you would genuinely want, or decline if none feels useful.",
        ],
      },
      {
        title: "Observation record",
        items: [
          "Task outcome, route taken, time to first useful orientation, information requested, misinterpretations, and recovery behaviour.",
          "Participant language about planning, remembering, choosing, uncertainty, and maintenance.",
          "Concept-specific strengths, breakdowns, and counterexamples—not a single preference score.",
        ],
      },
      {
        title: "Revision triggers",
        items: [
          "Remove or demote the year view if it is rarely useful or consistently overwhelms the immediate task.",
          "Change the information hierarchy if service, episode pattern, or date confidence is repeatedly sought before the title detail.",
          "Remove planning statuses or notifications that participants cannot map to a real recurring behaviour.",
          "Reframe or stop the project if the observed problem is already handled adequately by existing tools or informal methods.",
        ],
      },
    ],
  },
  {
    slug: "decision-log",
    label: "Decision Log [Ongoing]",
    title: "Recording why the project changes direction",
    criticalText:
      `The decision log is deliberately visible inside the case study. It prevents a final interface from appearing inevitable and records what evidence was available when each choice was made.

Entries distinguish accepted framing decisions from provisional interaction hypotheses. Provisional decisions should be updated after research rather than silently rewritten to make the process look linear.`,
    notes: [
      "The log should grow throughout research and prototyping; it is not a retrospective list written at the end.",
      "A revised or rejected decision remains in the record because the change is part of the design evidence.",
    ],
    decisionLog: [
      {
        id: "D01",
        status: "Accepted",
        decision: "Treat television tracking as the context, not the proposition.",
        reasoning: "The portfolio needs to demonstrate design judgement rather than argue for a fictional startup.",
        evidence: "Project brief and portfolio objective.",
        alternatives: "Present the work as a market-gap pitch or a finished product concept.",
        uncertainty: "None at this stage; this is a framing constraint.",
      },
      {
        id: "D02",
        status: "Revised",
        decision: "Do not claim that release calendars are underserved.",
        reasoning: "Current competitors already provide calendars, upcoming views, alerts, and cross-service availability.",
        evidence: "Desk review of Trakt, JustWatch, Simkl, and Serializd.",
        alternatives: "Keep the original feature-gap statement or abandon time as a research topic.",
        uncertainty: "How discoverable, understandable, and behaviourally useful those existing features are.",
      },
      {
        id: "D03",
        status: "Provisional",
        decision: "Test planning horizon before treating the year view as the home screen.",
        reasoning: "The year is visually expressive, but the natural unit of planning may be a week or month.",
        evidence: "Initial assumption, cross-device constraints, and the open research question about planning behaviour.",
        alternatives: "Year-first calendar, seven-day queue, month grid, or no dedicated time view.",
        uncertainty: "Which horizons correspond to real recurring decisions and whether people move between them.",
      },
      {
        id: "D04",
        status: "Provisional",
        decision: "Use a thirty-day chronological view as the prototype default.",
        reasoning: "It creates more anticipation than a seven-day list while avoiding the density and precision of twelve months.",
        evidence: "Heuristic comparison of the three concept models; no user validation yet.",
        alternatives: "Seven days, current season, year, or a user-defined default.",
        uncertainty: "Whether thirty days matches anyone's natural planning horizon.",
      },
      {
        id: "D05",
        status: "Provisional",
        decision: "Keep uncertain releases visible and label their confidence explicitly.",
        reasoning: "Hiding them removes the memory-support job; precise bars would imply knowledge that does not exist.",
        evidence: "The domain contains approximate, delayed, and unannounced releases; first-pass interaction reasoning.",
        alternatives: "Hide incomplete items, place them in a separate list, or show an estimated date without qualification.",
        uncertainty: "Whether the confidence model is understood and whether incomplete items remain actionable.",
      },
      {
        id: "D06",
        status: "Provisional",
        decision: "Reveal show detail without leaving the planning context.",
        reasoning: "A persistent panel or inline expansion supports comparison and preserves the selected horizon and filters.",
        evidence: "Information-hierarchy analysis and first wireframe pass.",
        alternatives: "Dedicated detail page, modal, bottom sheet, or hover-only preview.",
        uncertainty: "Whether the detail competes with the overview or causes accessibility issues on smaller screens.",
      },
      {
        id: "D07",
        status: "Deferred",
        decision: "Do not make notifications a default requirement.",
        reasoning: "Alerts can create value but also noise, setup work, and another preference system to maintain.",
        evidence: "Initial scope review; user need has not been established.",
        alternatives: "Global alerts, per-show alerts, digest notifications, calendar subscription, or no notifications.",
        uncertainty: "Which trigger, cadence, and level of control would map to real behaviour.",
      },
    ],
  },
  {
    slug: "reflection",
    label: "Reflection [Next Steps]",
    title: "The project is stronger now that the premise is less certain",
    criticalText:
      `The first version moved too quickly from personal frustration to a yearly release interface. Reframing the work exposed that established products already contain calendars and alerts, and that the more interesting question is not whether a timeline can be drawn, but when future orientation becomes useful and how incomplete information should behave.

The next meaningful step is user research, not visual refinement. The concepts and prototype now create something concrete to challenge, while the case study remains explicit about the evidence that is still missing.`,
    notes: [
      "Current maturity: framed, explored, and ready for research—not validated and not complete.",
      "The interaction design should be allowed to become smaller, less calendar-led, or unnecessary if the research points elsewhere.",
    ],
    evidenceItems: [
      {
        status: "Learning",
        statement: "The initial market-gap assumption weakened after the landscape review.",
        implication: "The case study now focuses on interaction fit and behavioural evidence rather than novelty.",
      },
      {
        status: "Learning",
        statement: "A year view is an interaction hypothesis, not the inevitable information architecture.",
        implication: "The prototype exposes planning horizon as a control so the assumption can be tested directly.",
      },
      {
        status: "Next step",
        statement: "Run recent-behaviour interviews and concept comparisons using participants' real watchlists.",
        implication: "Update the problem statement and every provisional decision before increasing visual fidelity.",
      },
    ],
  },
];

export const watchlistWorkspaceStagesArchiveV2: UxPortfolioWorkspaceStage[] = [
  {
    slug: "start",
    label: "Introduction [Project Framing]",
    title: "Interaction Design Study",
    criticalText:
      "This case study explores interaction design through the familiar context of a TV show tracker, focusing on researching patterns, exploring alternatives, and iterating on small interactions.",
    notes: [
      "Scope kept intentionally small to focus on micro-interactions and process clarity.",
    ],
  },
  {
    slug: "evidence",
    label: "Problem Statement [Problem Framing]",
    title: "Problem Statement",
    criticalText:
      `How might complex and text-heavy TV show information be presented in a more visual, scannable, and engaging way?

This project explores alternative interaction and visual design patterns to understand how small design decisions influence clarity and the overall user experience.`,
    notes: [
      "The project is an interaction design exercise, not a proposal for a new product or proof of market demand.",
    ],
    evidenceTitle: "What this study focuses on",
    evidenceItems: [
      {
        status: "Clarity",
        statement: "Make dense show information easier to scan and understand.",
        implication: "Use hierarchy and visual cues to help the most useful information stand out.",
      },
      {
        status: "Interaction",
        statement: "Explore how small actions can reveal detail without overwhelming the page.",
        implication: "Compare several patterns before choosing one to develop further.",
      },
      {
        status: "Iteration",
        statement: "Use each design pass to learn what improves or weakens the experience.",
        implication: "The process and reasoning matter more than producing a polished product concept.",
      },
    ],
  },
  {
    slug: "research",
    label: "Existing Tools [Benchmarking]",
    title: "Trakt",
    hideTitle: true,
    criticalText:
      "A comparative review of Trakt, Serializd and JustWatch, focusing on information architecture, navigation, discovery, watch tracking and the different ways each product asks people to save a show.",
    notes: [
      "Benchmark order: Trakt, Serializd and JustWatch.",
      "Screenshot reminders are included inside each section until the final annotated assets are added.",
    ],
    imageSrc: "/watchlist/benchmark-introduction-montage.png",
    imageAlt: "Introductory montage of annotated Trakt, Serializd and JustWatch screens reviewed in the benchmark",
    imageWidth: 4096,
    imageHeight: 1820,
    allowExpand: true,
    guideSections: [
      {
        title: "Benchmark summary",
        items: [
          {
            text: "Trakt is strongest for episode tracking and calendar browsing; Serializd is strongest for bulk season tracking; JustWatch is strongest for discovery and streaming-provider integration.",
          },
          {
            text: "Calendar planning appears only in Trakt. Information density is lowest in Trakt and higher in Serializd and JustWatch, while manual tracking effort is highest in Trakt.",
          },
          {
            text: "Across the three tools, saving is fragmented across labels such as watched, want to watch, follow, watchlist and add to a list. The opportunity is a single clear entry point, with progress or collection choices introduced afterwards.",
          },
        ],
      },
      {
        title: "Information presented",
        items: [
          {
            text: "Identity: poster or backdrop, title, release year, format and age rating.",
          },
          {
            text: "State: whether a series is returning, ended or upcoming.",
          },
          {
            text: "Description: synopsis, genres and runtime, with season and episode structure added for television.",
          },
          {
            text: "Availability: streaming providers, region and whether access is included, free, rented or purchased.",
          },
          {
            text: "Viewing relationship: watchlist or saved state, watched status and episode or season progress.",
          },
          {
            text: "Release planning: latest and next episodes, confirmed or uncertain dates, upcoming releases and calendar information.",
          },
          {
            text: "Supporting context: ratings, reviews, cast, trailers, related titles, community lists and recommendations.",
          },
        ],
      },
      {
        title: "Trakt – Summary",
        items: [
          {
            text: "Strengths: Excellent episode browsing; Strong contextual information; A useful calendar; Related content that encourages discovery.",
          },
          {
            text: "Weaknesses: Ambiguous home sections; Overlapping save and tracking actions; Required watch-date selection; Heavy reliance on iconography; No bulk season tracking.",
          },
        ],
      },
      {
        title: "Serializd – Summary",
        items: [
          {
            text: "Strengths: Efficient bulk season tracking; Comprehensive show information; Clear tracking controls.",
          },
          {
            text: "Weaknesses: Dense interface; Overlapping saved states; Fragmented navigation; Seasons separated from their parent shows; Limited browsing; No calendar.",
          },
        ],
      },
      {
        title: "JustWatch – Summary",
        items: [
          {
            text: "Strengths: Excellent discovery; Strong streaming-provider integration; Clear homepage organisation; Practical provider filtering.",
          },
          {
            text: "Weaknesses: Busy interface; Overlapping Seen, Lists and TV Show Tracking models; Unintuitive episode navigation; Additional tracking navigation; No calendar view.",
          },
        ],
      },
      {
        title: "Trakt",
        hideTitle: true,
        imageSrc: "/watchlist/trakt-benchmark-main-v3.png",
        imageAlt: "Annotated montage of Trakt screens covering the home page, show page, calendar, watch-date dialog and discovery views",
        imageWidth: 4096,
        imageHeight: 1755,
        items: [
          {
            text: "The Trakt screens below examine landing experience, discovery, navigation, saving a series and keeping track of a series.",
          },
        ],
      },
      {
        title: "Trakt – Landing experience",
        imageSrc: "/watchlist/trakt-landing-v2.png",
        imageAlt: "Trakt landing page showing the welcome panel, Continue Watching and Start Watching sections",
        imageWidth: 3372,
        imageHeight: 1694,
        items: [
          {
            text: "Home page sections lack clarity: Continue Watching, Your Shows and Discover Media describe categories without making their purpose immediately clear.",
            suggestion: "The montage includes the home page states for later annotation.",
          },
          {
            text: "Continue Watching does not communicate its behaviour. It appears empty until an individual episode is tracked, but that relationship is not explained.",
            suggestion: "Compare the empty and populated states in the montage.",
          },
        ],
      },
      {
        title: "Trakt – Discovery",
        imageGallery: [
          {
            src: "/watchlist/trakt-discovery.png",
            alt: "Trakt discovery page showing search, top searches and a grid of TV and movie results",
            width: 3374,
            height: 1676,
          },
          {
            src: "/watchlist/trakt-discovery-lists.png",
            alt: "Trakt popular lists showing recognisable cover art and themed collections",
            width: 3374,
            height: 914,
          },
        ],
        items: [
          {
            text: "Supporting content enriches exploration through related shows, cast information, community lists and trivia.",
            suggestion: "The discovery and supporting-content views are included in the montage.",
          },
        ],
      },
      {
        title: "Trakt – Saving a series",
        imageSrc: "/watchlist/serializd-saving-silo-annotated.png",
        imageAlt: "Annotated Silo show page highlighting save-state controls, date options and episode status",
        imageWidth: 3372,
        imageHeight: 1646,
        items: [
          {
            text: "Required watch-date selection introduces friction. The interface asks when content was watched without explaining why, and there is no option to skip the step.",
            suggestion: "The watch-date dialog is shown in the montage.",
          },
          {
            text: "Icon-only actions rely on interpretation. A large tick marks content as watched while a bookmark adds it to a watchlist, leaving the distinction to the iconography.",
            suggestion: "The show page shows both actions together.",
          },
          {
            text: "Saving is split across watchlist, watched, ratings and lists. These actions may each support a valid use case, but their relationship is unclear at the moment someone simply wants to keep a show.",
            suggestion: "Opportunity: begin with one labelled save action, then offer progress or list organisation as a second step.",
          },
        ],
      },
      {
        title: "Trakt – Keeping track of a series",
        imageSrc: "/watchlist/trakt-keeping-track-calendar.png",
        imageAlt: "Annotated Trakt desktop and mobile calendar comparison showing weekly release browsing and unused space",
        imageWidth: 2670,
        imageHeight: 1818,
        items: [
          {
            text: "Episode tracking is detailed, but season tracking is inefficient. Users must mark episodes individually or mark the entire series, with no Mark Season Watched option.",
            suggestion: "Use the season view to explore whether a season-level action would reduce effort.",
          },
          {
            text: "The calendar provides useful release information and episode previews, but its weekly strip duplicates information, overlaps surrounding content and adds limited value beyond displaying dates.",
            suggestion: "Use the calendar view to explore how future episodes could be easier to browse and plan.",
          },
        ],
      },
      {
        title: "Serializd",
        hideTitle: true,
        imageSrc: "/watchlist/serializd-benchmark-main.png",
        imageAlt: "Annotated montage of Serializd screens covering onboarding, profiles, show details, lists and discovery",
        imageWidth: 4096,
        imageHeight: 1808,
        items: [
          {
            text: "A comparative review of Serializd’s onboarding, information architecture, watch tracking, navigation and discovery patterns.",
            suggestion: "The montage introduces the Serializd screens discussed in the sections below.",
          },
        ],
      },
      {
        title: "Serializd – Onboarding",
        imageSrc: "/watchlist/serializd-signup.png",
        imageAlt: "Annotated Serializd signup screen showing the account creation form and quick signup options",
        imageWidth: 5608,
        imageHeight: 1920,
        items: [
          {
            text: "Profile setup takes priority over content discovery, with bio, favourite shows, colour, banner and homepage preferences presented immediately after registration.",
            suggestion: "Review focus: profile setup immediately after registration.",
          },
        ],
      },
      {
        title: "Serializd – Information architecture",
        imageSrc: "/watchlist/serializd-watchlist-navigation.png",
        imageAlt: "Annotated Serializd profile and navigation screens showing access to lists and watch status views",
        imageWidth: 5592,
        imageHeight: 1526,
        items: [
          {
            text: "Show pages contain a dense hierarchy of Home, Reviews, Lists, Media, Cast and Similar sections. The breadth is comprehensive but harder to scan.",
            suggestion: "Review focus: the density of the full show page.",
          },
        ],
      },
      {
        title: "Serializd – Watch tracking",
        imageSrc: "/watchlist/serializd-saving-series.png",
        imageAlt: "Annotated Serializd show page showing watch status, save actions and season tracking controls",
        imageWidth: 5592,
        imageHeight: 5118,
        items: [
          {
            text: "Bulk season tracking reduces interaction cost by allowing individual season selection or adding all seasons at once.",
            suggestion: "Review focus: the Mark as watched modal and season selection.",
          },
          {
            text: "Currently watching, watched, watchlist, paused, dropped and add to list all represent different ways of keeping a show. The flexibility is useful, but the number of adjacent choices makes the basic save action harder to identify.",
            suggestion: "Opportunity: use one entry point and reveal these states only when the user wants to refine how the show is kept.",
          },
        ],
      },
      {
        title: "Serializd – Discovery",
        imageSrc: "/watchlist/serializd-discovery.png",
        imageAlt: "Annotated Serializd discovery screens showing trending TV rows and a larger browse grid",
        imageWidth: 5608,
        imageHeight: 3134,
        items: [
          {
            text: "Browsing feels more constrained than the other platforms, with fewer shows visible simultaneously and more emphasis on exploring individual titles.",
            suggestion: "Review focus: browse-page visibility and scanning.",
          },
        ],
      },
      {
        title: "JustWatch",
        hideTitle: true,
        imageSrc: "/watchlist/justwatch-benchmark-main.png",
        imageAlt: "Annotated montage of JustWatch screens covering the landing page, discovery, streaming availability, show details and episode tracking",
        imageWidth: 4096,
        imageHeight: 1725,
        items: [
          {
            text: "A comparative review of JustWatch’s landing experience, navigation, watch tracking, discovery and information density.",
            suggestion: "The montage introduces the JustWatch screens discussed in the sections below.",
          },
        ],
      },
      {
        title: "JustWatch – Landing experience",
        imageSrc: "/watchlist/justwatch-onboarding.png",
        imageAlt: "Annotated JustWatch landing and account screens showing streaming-provider discovery and signup paths",
        imageWidth: 5960,
        imageHeight: 3108,
        items: [
          {
            text: "Streaming-provider positioning is immediately clear through supported services including Netflix, Prime Video, Apple TV, Disney+, Paramount+ and Channel 4.",
            suggestion: "Review focus: streaming-provider positioning on the landing page.",
          },
          {
            text: "The homepage is divided into clearly labelled rows such as Top 10 Movies, Top 10 TV Shows, Popular and New Releases.",
            suggestion: "Review focus: homepage content-row hierarchy.",
          },
        ],
      },
      {
        title: "JustWatch – Watch tracking",
        imageSrc: "/watchlist/justwatch-tracking-save.png",
        imageAlt: "Annotated JustWatch show and episode screens showing episode tracking and save actions",
        imageWidth: 4940,
        imageHeight: 2518,
        items: [
          {
            text: "Tracking is performed at season level by entering individual season pages. The workflow works, but adds navigation compared with placing controls on the show page.",
            suggestion: "Review focus: the season page and Seen control.",
          },
          {
            text: "Seen, Lists and TV Show Tracking overlap as ways to retain or follow a title. Their different outcomes become clear only after moving between separate parts of the interface.",
            suggestion: "Opportunity: make one primary save action responsible for creating the relationship, then let the user update its state from the same place.",
          },
        ],
      },
      {
        title: "JustWatch – Discovery",
        imageSrc: "/watchlist/justwatch-discovery.png",
        imageAlt: "Annotated JustWatch daily discovery, upcoming releases and streaming availability screens",
        imageWidth: 5960,
        imageHeight: 1952,
        items: [
          {
            text: "Browsing by streaming service supports practical decision-making because users can filter for content available within their existing subscriptions.",
            suggestion: "Review focus: browsing by streaming provider.",
          },
        ],
      },
      {
        title: "JustWatch – Saved tracking",
        imageSrc: "/watchlist/justwatch-tracking-saved.png",
        imageAlt: "Annotated JustWatch TV show tracking list showing saved titles and caught-up episode states",
        imageWidth: 4940,
        imageHeight: 1926,
        items: [
          {
            text: "Saved tracking states make progress visible across shows, with caught-up episodes and upcoming dates shown together.",
            suggestion: "Use this screen to compare the saved state with the episode-level tracking flow.",
          },
          {
            text: "The useful caught-up state sits inside TV Show Tracking, while lists and seen controls live elsewhere. This separation makes the saved relationship feel like several systems rather than one understandable model.",
            suggestion: "Carry one saved relationship across progress, future releases and optional lists.",
          },
        ],
      },
      {
        title: "JustWatch – New releases",
        imageSrc: "/watchlist/justwatch-new-releases.png",
        imageAlt: "Annotated JustWatch new releases page showing release tabs, filters and episode cards",
        imageWidth: 2940,
        imageHeight: 1136,
        items: [
          {
            text: "New releases and trending content are available without a dedicated calendar for planning future viewing.",
            suggestion: "Review focus: the New Releases section.",
          },
        ],
      },
    ],
  },
  {
    slug: "design-takeaways",
    label: "Design Takeaways [Synthesis]",
    title: "Design Takeaways",
    criticalText:
      "The benchmark is taken forward as five interaction priorities and a deliberate information hierarchy for presenting a show or film.",
    notes: [
      "These are design implications from the benchmark, not user-research findings.",
      "Detailed evidence remains in the benchmark; this section records what the design will carry forward.",
    ],
    caseStudyVisual: "benchmark-synthesis",
  },
  {
    slug: "journey",
    label: "User Journey [Journey Mapping]",
    title: "Detailed User Journey",
    criticalText:
      "The journey follows a show from the first vague need to save it, through evaluation and the save decision, then back into progress and re-entry. It makes the save moment visible as a trust boundary rather than treating it as an isolated button press.",
    notes: [
      "The journey maps context, goals, actions, questions and friction before translating them into product signals and opportunities.",
    ],
    imageSrc: "/watchlist/detailed-user-journey-v2.png",
    imageAlt:
      "Detailed Watchlist user journey from discovery and evaluation through saving, returning, updating progress and re-entry",
    imageWidth: 2536,
    imageHeight: 1319,
    allowExpand: true,
  },
  {
    slug: "page-structure",
    label: "Page Structure [IA Sketch]",
    title: "Page structure",
    criticalText:
      "This sketch sets the page-level hierarchy for a show detail experience. It keeps the first level shallow, then lets Save open into the saved relationship and its optional viewing states. It is a structural direction, not the complete information architecture.",
    notes: [
      "The detailed IA will define the fields, actions, and edge cases inside each branch.",
      "The structure follows the diagram system: fixed modules, shared rails, midpoint connectors, and deeper branches reserved below their parent.",
    ],
    imageSrc: "/watchlist/page-structure.png",
    imageAlt:
      "Page structure sketch for a Watchlist show detail page, with Save branching to My shows, Add to list, and viewing states",
    imageWidth: 1398,
    imageHeight: 862,
    imagePresentation: "compact-divider",
    allowExpand: true,
  },
  {
    slug: "concepts",
    label: "Concept Exploration [Ideation]",
    title: "Concept Exploration",
    criticalText:
      "Three save models were compared: parallel actions, one saved relationship and a state-first form. The single relationship is taken forward because it keeps saving lightweight while preserving access to detailed states.",
    notes: [
      "Selected direction: one Add to my shows action. State selection remains optional and can be revisited from the same control.",
    ],
    caseStudyVisual: "concept-comparison",
  },
  {
    slug: "flow",
    label: "Save Process [User Flow]",
    title: "Save Process Flow",
    criticalText:
      "The save-process flow turns the journey into a sequence of interactions, then challenges every step against likely confusion, design implications and opportunities. It keeps the first save lightweight while preserving a route into progress and return behaviour.",
    notes: [
      "The working question is whether saving can stay lightweight at the start while still supporting detailed progress later.",
    ],
    imageSrc: "/watchlist/save-process-flow-v2.png",
    imageAlt:
      "Watchlist save-process flow from discovering a title to saving it, choosing a state, tracking progress and returning later",
    imageWidth: 2622,
    imageHeight: 746,
    allowExpand: true,
  },
  {
    slug: "states",
    label: "Interaction States [Interaction Design]",
    title: "Interaction States",
    criticalText:
      "Saving creates one relationship with the show; watching, catching up and finishing update that relationship rather than creating separate collections. Pause, uncertain release dates and season-level updates are treated as normal states rather than exceptions.",
    notes: [
      "State labels should be tested in context; these names remain provisional.",
    ],
    caseStudyVisual: "interaction-states",
  },
  {
    slug: "wireframes",
    label: "Wireframes [Wireframing]",
    title: "Wireframes",
    criticalText:
      "The first wireframe replaces competing save controls with one labelled entry point beside the show. The same control can later update its state, while season progress stays on the page with season- and episode-level shortcuts.",
    notes: [
      "Low fidelity is deliberate: the test is the hierarchy and behaviour, not visual polish.",
    ],
    caseStudyVisual: "show-wireframe",
  },
  {
    slug: "prototype",
    label: "Prototype [Prototyping]",
    title: "Prototype",
    criticalText:
      "The working example tests the complete relationship: save a show once, optionally choose a state, then update progress at episode or season level without leaving the show page.",
    notes: [
      "Try saving the show, closing the state menu without making a choice, reopening it, and recording progress at different levels.",
      "The title and content are fictional. The prototype tests interaction behaviour rather than visual design.",
    ],
    interactivePrototype: "watchlist-planning-horizon",
  },
  {
    slug: "testing",
    label: "Usability Testing [Usability Testing]",
    title: "Usability Testing",
    criticalText:
      "The first usability round should test whether one save entry point is understood, whether its state choices remain optional, and whether bulk season tracking and future-release information are useful. Success means people can explain the resulting state and recover from mistakes—not simply complete each task.",
    notes: [
      "No findings are claimed until sessions have been conducted.",
    ],
    caseStudyVisual: "test-plan",
  },
  {
    slug: "decisions",
    label: "Decision Log [Decision Log]",
    title: "Decision Log",
    criticalText:
      "The decision log records the current interaction choices, their benchmark evidence, the alternatives considered and the questions that still require user evidence.",
    notes: [
      "Provisional decisions should be updated after testing rather than rewritten retrospectively.",
      "Change from the initial direction: calendar planning became secondary and saving became the primary interaction problem.",
    ],
    decisionLogTitle: "Four decisions to carry into testing",
    decisionLogCollapsible: true,
    decisionLog: [
      {
        id: "D01",
        status: "Changed",
        decision: "Make the calendar a secondary view.",
        reasoning: "Future releases are useful, but the benchmark did not support making time the entire organising model.",
        evidence: "Trakt calendar review and the absence of calendars in Serializd and JustWatch.",
        alternatives: "Use a year timeline as the primary experience.",
        uncertainty: "How often future dates affect real viewing choices.",
      },
      {
        id: "D02",
        status: "Selected",
        decision: "Keep seasons and episodes inside the show page.",
        reasoning: "This preserves context and reduces navigation between related objects.",
        evidence: "Trakt’s embedded episode model compared with Serializd’s separate season pages.",
        alternatives: "Give each season its own page.",
        uncertainty: "How much season-specific detail needs dedicated space.",
      },
      {
        id: "D03",
        status: "Selected",
        decision: "Support episode, season and series-level tracking.",
        reasoning: "Different levels of progress require different interaction costs.",
        evidence: "Trakt’s detailed episode tracking and Serializd’s efficient bulk-season control.",
        alternatives: "Use one universal watched action.",
        uncertainty: "Which level should be the default in each context.",
      },
      {
        id: "D04",
        status: "Testing",
        decision: "Use one labelled save entry point, then let people refine its state.",
        reasoning: "Watched, watchlist, follow and add to list are useful distinctions, but presenting them as parallel save actions makes the basic intent harder to understand.",
        evidence: "Overlapping save, tracking and list models across Trakt, Serializd and JustWatch.",
        alternatives: "Keep several adjacent actions and clarify them with labels or hover states.",
        uncertainty: "Whether state selection should appear immediately after saving or remain entirely optional.",
      },
    ],
  },
  {
    slug: "reflection",
    label: "Reflection [Reflection]",
    title: "Reflection",
    criticalText:
      "The current direction uses one saved relationship, explicit state changes, flexible tracking effort and stronger show context. The remaining questions are behavioural and should be answered through testing rather than additional interface detail.",
    notes: [
      "Current status: framed, explored and ready for a first usability round—not validated.",
      "Change from the initial direction: the timeline is now a secondary view rather than the organising concept.",
    ],
    caseStudyVisual: "reflection",
  },
];

export const watchlistWorkspaceStages: UxPortfolioWorkspaceStage[] = [
  {
    slug: "introduction",
    label: "Introduction [Product Context]",
    title: "Improving the watchlist experience",
    criticalText:
      "Watchlist services bring together discovery, saved titles, viewing progress, release information and streaming availability. Across those moments, a person is building an ongoing relationship with a show: saving it, returning to it, keeping their place, and deciding what to watch next.\n\nThe review compares Trakt, Serializd and JustWatch to identify where these interactions are clear, where they become fragmented, and which patterns can inform interaction design.",
    notes: [
      "Focus: watchlist, progress and release interactions.",
      "Methods: comparative benchmark, interaction modelling, wireframes and prototype.",
    ],
  },
  {
    slug: "informal-research",
    label: "Informal Research [Directional Input]",
    title: "Informal research",
    hideTitle: true,
    criticalText: "",
    notes: [
      "Evidence status: anecdotal and formative, not a validated research finding.",
      "Any quotation or participant detail should only be added where an original note can support it.",
    ],
    caseStudyVisual: "informal-research",
  },
  {
    slug: "benchmark",
    label: "Benchmark [Existing Services]",
    title: "Benchmarking existing watchlist services",
    criticalText:
      "This benchmark examines Trakt, Serializd and JustWatch across three recurring moments in a watchlist journey: saving a show, recording progress and returning to it later. It identifies where these tasks are clear and where separate controls or views fragment the experience.\n\nThis is a comparative pattern review rather than a scorecard. It documents interface patterns and interaction tensions to inform subsequent design exploration.",
    notes: [
      "Products reviewed: Trakt, Serializd and JustWatch.",
      "The benchmark records interface patterns and interaction opportunities, rather than ranking the services.",
    ],
    imageSrc: "/watchlist/benchmark-overview-montage.png",
    imageAlt: "Montage of Trakt, Serializd and JustWatch screens included in the watchlist pattern review",
    imageWidth: 4096,
    imageHeight: 1555,
    allowExpand: true,
    contentOrder: "media-caption-first",
    guideSections: watchlistWorkspaceStagesArchiveV2
      .find((stage) => stage.slug === "research")
      ?.guideSections?.filter((section) =>
        [
          "Benchmark summary",
          "Information presented",
          "Trakt – Summary",
          "Serializd – Summary",
          "JustWatch – Summary",
          "Trakt – Saving a series",
          "Trakt – Keeping track of a series",
          "Serializd – Information architecture",
          "Serializd – Watch tracking",
          "JustWatch – Landing experience",
          "JustWatch – Watch tracking",
        ].includes(section.title),
      ),
  },
  {
    slug: "outcomes",
    label: "Outcomes [Benchmark Synthesis]",
    title: "Recurring challenges in the experience",
    criticalText:
      "The review revealed a continuity problem. Saving, tracking and returning to a show are often handled as separate systems, even though they form one ongoing relationship for the person using them.\n\nThese are recurring challenges in the services reviewed, rather than prescribed solutions. They create a grounded starting point for the design questions that follow.",
    notes: [
      "The outcomes identify directions for exploration; they are not claims about universal user behaviour.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "benchmark-synthesis",
  },
  {
    slug: "questions",
    label: "Design Prompts [Exploration]",
    title: "How Might We questions",
    criticalText:
      "The benchmark identified five connected moments where a watchlist experience can become unclear: saving with optional organisation, returning, progress updates, availability, and release certainty. These prompts keep the exploration grounded in those moments while leaving room for more than one response.",
    notes: [
      "Each prompt can be tested and refined through lightweight conversations and prototype tasks.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "design-prompts",
  },
  {
    slug: "task-object-mapping",
    label: "Structure Ideation [Task–Object Mapping]",
    title: "Structure ideation",
    criticalText:
      "A task-and-object mapping groups the activities surfaced in the benchmark by the thing a person is trying to manage. It distinguishes information that belongs with a show or episode from collection and account-level information.\n\nThe four working groups consolidate into three structural destinations: Show detail, My shows and Account. Discovery remains an entry point for finding titles, rather than a destination for their personal information.",
    notes: [
      "This is an exploratory grouping exercise, not a finished product model.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "task-object-mapping",
  },
  {
    slug: "information-architecture",
    label: "Information Architecture [Structure]",
    title: "Watchlist structure - V1",
    criticalText:
      "This V1 structure develops the preceding structure-ideation exercise into a navigable model. Discovery, My shows and Account form the first level, while identity, progress, availability and release information remain connected to the relevant show detail.\n\nIt provides the first working structure for the interaction exploration that follows, rather than a complete or validated product architecture.",
    notes: [
      "The first-level destinations were informed by the card groupings and user goals explored in Structure ideation.",
      "Primary icons carry the structural connections; secondary icons make key destinations easier to scan.",
      "The map is a working design artefact to test and refine through subsequent interaction work.",
    ],
    imageSrc: "/watchlist/watchlist-app-ia.png",
    imageAlt:
      "Watchlist app information architecture showing discovery, saved titles, account settings and their child pages",
    imageWidth: 1024,
    imageHeight: 954,
    imagePresentation: "framed",
    allowExpand: true,
    contentOrder: "critical-first",
  },
  {
    slug: "save-process-exploration",
    label: "Save Exploration [Interaction Design]",
    title: "Exploring save-process directions",
    criticalText:
      "Saving a show can mean simply remembering it, recording an existing viewing state, or placing it into a collection. These sketches compare those models before selecting one, making their trade-offs visible rather than treating Save as a predetermined interaction.",
    notes: [
      "This is exploratory work: the sketches are alternatives, not validated solutions.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "concept-comparison",
  },
  {
    slug: "save-process-direction",
    label: "Save Direction & Refinement [Design Decision]",
    title: "Selecting and refining the save process",
    criticalText:
      "The confirmation-first model was selected and refined because it establishes one clear saved relationship in My shows before asking for any additional organisation. A specific list remains available in the same moment, without becoming a requirement.\n\nWatchlist, Have watched and Follow can then operate as categories or states within My shows, rather than competing with the initial Save action. The flow then separates saving from later viewing-state management, keeping episode and season updates within the show relationship.",
    notes: [
      "The initial action is always Save; list organisation and later categories remain optional layers of the same saved relationship.",
      "The selection provides a concrete direction for the process flow and prototype to develop.",
      "The save and viewing-state interaction is the focus of this stage; release planning follows as its own design question.",
    ],
    caseStudyVisual: "direction-selection",
    afterCriticalVisual: "selection-interaction-context",
  },
  {
    slug: "calendar-exploration",
    label: "Calendar Exploration [Release Planning]",
    title: "Exploring release-planning directions",
    criticalText:
      "Release planning was explored as a separate design question from saving. A recurring planning problem is reaching the end of a series without knowing what to watch next: people need to see not only individual release dates, but how long a release will run and what may overlap it. The work compares a chronological Upcoming view, day and week calendar views, and a lighter signal inside My shows; it then tests whether a series release can be represented as duration as well as a set of individual dates.\n\nThese are exploratory directions and working sketches, not a validated release-calendar solution.",
    notes: [
      "The comparison considers both everyday scanning and the more complex problem of understanding a series release over time.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "calendar-exploration",
  },
  {
    slug: "calendar-direction",
    label: "Calendar Direction & Refinement [Design Decision]",
    title: "Selecting and refining release planning",
    hideTitle: true,
    criticalText: "",
    notes: [
      "This is a working direction to test; it has not yet been validated with people’s real watchlists or release routines.",
    ],
    contentOrder: "critical-first",
    caseStudyVisual: "calendar-direction",
  },
  {
    slug: "working-planner-v1",
    label: "Series Planner V1 [Interaction Design]",
    title: "Working planner V1",
    criticalText:
      "The selected direction was developed as one continuous calendar rather than separate close and overview screens. A zoom control changes the visible planning horizon from six to twenty-five weeks while episode markers remain anchored to their release dates. As more space becomes available, week and episode labels appear; as it contracts, the same bars simplify without changing their underlying dates.\n\nThe loop moves through every implemented zoom level. It documents a functional design exploration rather than a validated final interface.",
    notes: [
      "The animation uses twenty captured states, one for every supported zoom level.",
      "The functional prototype remains available for direct interaction and further testing.",
    ],
    contentOrder: "critical-first",
    videoSrc: "/watchlist/release-planner-zoom-loop.mp4",
    videoType: "video/mp4",
    videoPoster: "/watchlist/release-planner-zoom-frames/001-25-weeks.png",
    videoAlt: "Release planner smoothly changing from a twenty-five-week overview to a six-week close view and back",
    prototypeHref: "/watchlist/release-planner",
  },
  {
    slug: "working-planner-v3",
    label: "Series Planner V3 [Prototype]",
    title: "Interactive planner prototype V3",
    criticalText:
      "This iteration turns the release planner into a live, zoomable planning surface. The same calendar moves between a two-week day view and a full-year overview; episode markers remain anchored to their dates, series can be included or removed, and the release lanes stay stable while the view changes.\n\nIt is an interactive design exploration rather than a validated final interface.",
    notes: [
      "The loop captures a dense sequence of rendered states from the live planner.",
      "The full-screen version remains available for a larger working canvas.",
    ],
    contentOrder: "media-caption-first",
    videoSrc: "/watchlist/release-planner-v3-loop.mp4?v=20260910-2158",
    videoType: "video/mp4",
    videoPoster: "/watchlist/release-planner-v3-loop-frames/0001.png?v=20260910-2158",
    videoAlt: "Release planner smoothly zooming between an annual overview and a two-week close view, then moving slightly backwards and forwards in time",
    prototypeHref: "/watchlist/release-planner-v3",
    afterCriticalVisual: "planner-control-evolution",
  },
  {
    slug: "wireframes",
    label: "Full Product Wireframe [Wireframing]",
    title: "Building the complete product model",
    criticalText:
      "The interaction work was expanded into one connected wireframe covering Discovery, My shows, show detail, progress, availability, personal lists, Calendar and Account. This made it possible to assess the earlier decisions as part of a complete product rather than as isolated assets.\n\nThe model remains deliberately low fidelity. Its purpose is to test hierarchy, entry points, terminology and behaviour before UI styling begins; it should not be read as a validated or finished application.",
    notes: [
      "The surfaces share one 16-column desktop grid, an 8px spacing scale and a shared monochrome wireframe palette. Those tokens are intentionally centralised so the whole set can be adjusted together before UI styling begins.",
      "The functioning wireframe supports connected journeys across discovery, saving, organisation, progress, release information and account preferences.",
    ],
    caseStudyVisual: "show-wireframe",
    prototypeHref: "/watchlist/prototype",
  },
  {
    slug: "working-application-v1",
    label: "Working Application V1 [Product UI]",
    title: "Moving from product model to working application",
    criticalText:
      "The selected interaction directions and full-product wireframe now form one production-style web application. The first build connects Home, Discovery, My shows, show detail, progress, availability, Releases and Account in a responsive interface, while retaining the confirmation-first save model and keeping state or list choices optional.\n\nThe catalogue is fictional and data remains local to the browser. This makes the application useful as a portfolio artefact and a testable product direction without implying a live content service or completed validation.",
    notes: [
      "Saved shows, viewing states, progress and personal-list choices persist in the browser.",
      "Confirmed, expected and unknown release information remain visually distinct throughout the application.",
      "This is a working V1 intended for refinement and usability evaluation, not a production service.",
    ],
    prototypeHref: "/watchlist/app",
  },
  {
    slug: "wireframe-review",
    label: "Wireframe Review [Internal Critique]",
    title: "Wireframe review",
    hideTitle: true,
    criticalText: "",
    notes: [
      "The review separates internally identified risks from observations made in future sessions.",
      "The original IA remains visible as a record of the earlier structural decision; release planning is discussed as a later direction rather than retrofitted into it.",
    ],
    caseStudyVisual: "wireframe-tensions",
  },
  {
    slug: "wireframe-evaluation",
    label: "Evaluation Plan [Usability Testing]",
    title: "Evaluation plan",
    hideTitle: true,
    criticalText: "",
    notes: [
      "Use participants’ own recent viewing behaviour where possible, while keeping fictional Show A–Z content inside the prototype.",
      "Record observed behaviour separately from interpretation and proposed design changes.",
    ],
    caseStudyVisual: "test-plan",
  },
  {
    slug: "slide-template",
    label: "Slide Template [Working]",
    title: "",
    hideTitle: true,
    criticalText: "",
    notes: [
      "Working reference only: not part of the final Watchlist narrative.",
      "Each section keeps its artefact above its label and supporting description.",
    ],
    caseStudyVisual: "slide-template",
  },
];
