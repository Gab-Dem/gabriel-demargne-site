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
  criticalText: string;
  notes: string[];
  imageSrc: string;
  imageAlt: string;
  allowExpand?: boolean;
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
