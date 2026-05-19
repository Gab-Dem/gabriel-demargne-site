export const site = {
  name: "Gabriel Demargne",
  sectionTitle: "Creative Consulting",
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/photography", label: "Photography" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    slug: "website-design",
    title: "Website Design",
    copy: "Websites designed, built, refined, and maintained.",
    detailTitle: "Website Design",
    intro:
      "Supporting artists, creative practitioners, and service-led businesses with websites that make their work easier to understand, evaluate, and act on.",
    focusIntro:
      "A website needs to do more than look resolved. It needs to explain the offer, create confidence, and guide people through the right next step.",
    functions: [
      {
        title: "Structure",
        copy:
          "Clarifying what needs to be said, what matters most, and how the page should unfold.",
      },
      {
        title: "Content",
        copy:
          "Shaping language, navigation, and page sections so the site feels direct and easy to use.",
      },
      {
        title: "Visual judgement",
        copy:
          "Using layout, type, spacing, imagery, and restraint to create a credible online presence.",
      },
      {
        title: "Build",
        copy:
          "Turning the design into a working site that is practical, maintainable, and suited to real use.",
      },
    ],
    examples: [
      {
        title: "MDA Architecture",
        copy:
          "Client website redesign and rebuild, with attention to structure, editorial pacing, and scalable implementation.",
        href: "https://www.mdemargne.com/",
        image: "/mda.webp",
      },
      {
        title: "Buse Avvocati Rechtsanwälte",
        copy:
          "A service-led website shaped with close attention to clarity, structure, and how a focused offer is presented online.",
        href: "https://buse.it/",
        image: "/buse.jpg",
      },
      {
        title: "Maggie Hughes Art",
        copy:
          "A restrained website designed to let the work remain central, while keeping the structure clear and usable.",
        href: "https://maggie-hughes-art.com/",
        image: "/mha-v2.png",
      },
      {
        title: "Impact Investment Consultants",
        copy:
          "A restrained consulting site designed to communicate credibility, specialist focus, and a clear professional proposition.",
        href: "https://impactinvestmentconsultants.com/",
        image: "/iic-v2.png",
      },
    ],
  },
  {
    slug: "ux-ui-consulting",
    title: "UX / UI Consulting",
    copy: "Creating clear, intuitive digital experiences.",
    detailTitle: "UX / UI Consulting",
    intro:
      "This work sits between structure, interface, and implementation. It focuses on making digital products and websites easier to understand and easier to use.",
    includes: [
      "User flows and journey thinking",
      "Interface direction and page structure",
      "Close collaboration with engineering or implementation",
      "Iterating from concept into a working frontend",
    ],
    evidence: [
      "4+ years of UX design and research experience noted in career documentation",
      "Experience working in complex and regulated environments",
      "Independent product and website work across prototypes, websites, and concept builds",
    ],
  },
  {
    slug: "ux-research",
    title: "UX Research",
    copy: "Helping you make informed decisions for your business.",
    detailTitle: "UX Research",
    intro:
      "Research work has focused on understanding what users need, testing assumptions, and supporting clearer decisions before more time is spent building.",
    includes: [
      "Usability testing support",
      "Guide writing and synthesis",
      "Research-informed product and content decisions",
      "Using findings to clarify what should happen next",
    ],
    evidence: [
      "Career notes reference conducting and supporting usability testing",
      "Research and synthesis experience from prior UX roles",
      "Independent work where product and website decisions required validation and iteration",
    ],
  },
  {
    slug: "photography",
    title: "Photography",
    copy: "Commissioned natural-light photography.",
    detailTitle: "Photography",
    intro:
      "Photography is offered as a service, while the broader image archive remains a separate body of work.",
    includes: [
      "Commissioned natural-light photography",
      "Photography used where it supports a project directly",
      "A separate image archive for broader work and slower browsing",
    ],
    evidence: [
      "Existing photography archive and long-running image practice",
      "Photography included as part of the professional offer, not only as a personal gallery",
    ],
  },
  {
    slug: "small-business-consulting",
    title: "Small-business consulting",
    copy: "Position and strategy consulting for creative businesses.",
    detailTitle: "Small-business consulting",
    intro:
      "Some projects begin as website briefs, but the more useful work is often clarifying the offer, the structure, and the proposition first.",
    includes: [
      "Clarifying business proposition and offer",
      "Positioning a service more clearly online",
      "Connecting messaging, structure, and website direction",
      "Practical advice before or alongside implementation",
    ],
    evidence: [
      "Freelance notes describe recurring work on positioning and proposition, not only visual design",
      "GAZ Richmond Boat Services is noted as a strong example of strategy and positioning work within website delivery",
      "Independent client work often involved solving adjacent structural and messaging problems alongside the site itself",
    ],
  },
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
