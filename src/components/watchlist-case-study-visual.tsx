import {
  CircleCheckBig,
} from "lucide-react";
import Image from "next/image";

type CaseStudyVisual =
  | "benchmark-review"
  | "informal-research"
  | "benchmark-synthesis"
  | "design-prompts"
  | "task-object-mapping"
  | "direction-selection"
  | "selection-interaction-context"
  | "calendar-exploration"
  | "calendar-direction"
  | "information-architecture"
  | "concept-comparison"
  | "core-flow"
  | "interaction-states"
  | "show-wireframe"
  | "show-wireframe-selection"
  | "wireframe-tensions"
  | "test-plan"
  | "reflection"
  | "planner-control-evolution"
  | "slide-template";

function WireframeChrome({ children, plain = false }: { children: React.ReactNode; plain?: boolean }) {
  return (
    <div className="watchlist-artifact__screen">
      {plain ? null : <div className="watchlist-artifact__screen-bar" aria-hidden="true"><i /><i /><i /><span /></div>}
      {children}
    </div>
  );
}

function TemplateTextSections({
  ariaLabel,
  sections,
}: {
  ariaLabel: string;
  sections: readonly { title: string; copy: string }[];
}) {
  return (
    <section className="watchlist-artifact watchlist-artifact--template watchlist-artifact--template-text" aria-label={ariaLabel}>
      {sections.map((section) => (
        <section className="watchlist-template__section watchlist-template__section--text-only" key={section.title}>
          <div className="watchlist-template__caption">
            <h3>{section.title}</h3>
            <p>{section.copy}</p>
          </div>
        </section>
      ))}
    </section>
  );
}

function InformalResearch() {
  return <TemplateTextSections ariaLabel="How informal conversations informed the project" sections={[
    {
      title: "An early question",
      copy: "Informal conversations repeatedly returned to the moment after a series finishes: what should I watch next? This is a paraphrased prompt rather than a verbatim participant quotation.",
    },
    {
      title: "How it shaped the exploration",
      copy: "The question connected discovery with time. Seeing when one series ends, what else is releasing, and where gaps or overlaps appear became a direction worth exploring.",
    },
    {
      title: "Questions carried forward",
      copy: "Can someone understand how long a current release will continue? Can upcoming series be compared without treating uncertain dates as exact? Does planning belong beside saved shows rather than inside general discovery?",
    },
    {
      title: "Evidence boundary",
      copy: "These conversations were anecdotal and formative. They generated design questions, but they do not validate the proposed response or support wider claims about user behaviour.",
    },
  ]} />;
}

function BenchmarkReview() {
  const patterns = [
    {
      number: "01", title: "Starting with a service", question: "How does each service establish a useful starting point before someone has a personal collection?",
      insight: "Onboarding, sign-up and first-use screens all shape whether discovery feels welcoming or like configuration work.",
      examples: [
        { product: "Trakt", image: "/watchlist/trakt-landing-v2.png", alt: "Trakt landing page showing welcome, continue watching and start watching sections", note: "Landing experience" },
        { product: "Serializd", image: "/watchlist/serializd-signup.png", alt: "Serializd sign-up screen with account creation options", note: "Account set-up" },
        { product: "JustWatch", image: "/watchlist/justwatch-onboarding.png", alt: "JustWatch onboarding screens for streaming-provider selection and sign-up", note: "Provider preferences" },
      ],
    },
    {
      number: "02", title: "Finding something to watch", question: "What helps someone move from broad browsing to a title worth keeping?",
      insight: "Search, themed collections and release-led browsing all offer useful entry points, but place different demands on someone who has not yet decided.",
      examples: [
        { product: "Trakt", image: "/watchlist/trakt-discovery.png", alt: "Trakt discovery page with search and TV and movie results", note: "Search and browsing" },
        { product: "Serializd", image: "/watchlist/serializd-discovery.png", alt: "Serializd discovery screens with trending rows and browse results", note: "Trending discovery" },
        { product: "JustWatch", image: "/watchlist/justwatch-discovery.png", alt: "JustWatch discovery screens for daily picks, releases and streaming availability", note: "Release-led discovery" },
      ],
    },
    {
      number: "03", title: "Keeping a show", question: "What happens when someone simply wants to remember a title?",
      insight: "Useful distinctions often appear before the basic save is complete.",
      examples: [
        { product: "Trakt", image: "/watchlist/trakt-saving-series.png", alt: "Trakt show page with save and watched controls", note: "Watchlist and watched actions sit together." },
        { product: "Serializd", image: "/watchlist/serializd-saving-series.png", alt: "Serializd show page with watch status controls", note: "Several status choices sit beside collection actions." },
        { product: "JustWatch", image: "/watchlist/justwatch-tracking-save.png", alt: "JustWatch screens with seen and tracking controls", note: "Seen, lists and tracking lead to separate outcomes." },
      ],
    },
    {
      number: "04", title: "Recording progress", question: "How much effort should it take to update one episode or a whole season?",
      insight: "Precision and bulk updates are both useful; they should belong to the same relationship.",
      examples: [
        { product: "Trakt", image: "/watchlist/trakt-calendar.png", alt: "Trakt episode tracking and calendar interface", note: "Detailed episode-level control." },
        { product: "Serializd", image: "/watchlist/serializd-saving-series.png", alt: "Serializd season tracking controls", note: "Bulk season updates reduce repeated work." },
        { product: "JustWatch", image: "/watchlist/justwatch-tracking-save.png", alt: "JustWatch episode and season tracking interfaces", note: "Progress controls require deeper navigation." },
      ],
    },
    {
      number: "05", title: "Returning to a show", question: "What context helps someone pick up a saved show later?",
      insight: "Progress, availability and the next meaningful release need to be easy to find together.",
      examples: [
        { product: "Trakt", image: "/watchlist/trakt-calendar.png", alt: "Trakt calendar with upcoming episode information", note: "Release context is visible in the calendar." },
        { product: "Serializd", image: "/watchlist/serializd-watchlist-navigation.png", alt: "Serializd profile and watchlist navigation", note: "Collection context is distributed across views." },
        { product: "JustWatch", image: "/watchlist/justwatch-tracking-saved.png", alt: "JustWatch TV show tracking list with caught-up states", note: "Saved tracking pairs progress with upcoming episodes." },
      ],
    },
  ];

  return <section className="watchlist-artifact watchlist-artifact--benchmark" aria-label="Watchlist interaction pattern review">
    <div className="watchlist-benchmark__patterns">
      {patterns.map((pattern) => <article key={pattern.number}>
        <div className="watchlist-benchmark__examples">
          {pattern.examples.map((example) => <figure key={`${pattern.number}-${example.product}`}>
            <div><Image src={example.image} alt={example.alt} width={3372} height={1800} sizes="(max-width: 800px) 100vw, 28vw" /></div>
          </figure>)}
        </div>
        <div className="watchlist-benchmark__caption"><h3>{pattern.title}</h3><p>{pattern.question} {pattern.insight} The comparison considers Trakt, Serializd and JustWatch.</p></div>
      </article>)}
    </div>
  </section>;
}

function BenchmarkSynthesis() {
  const outcomes = [
    {
      title: "Saving is not always a single state",
      visual: "save",
      observed: "Watchlists, watched states, personal lists and tracking controls often sit together when someone wants to keep a show.",
      challenge: "A person who only wants to remember a title may need to interpret the service's tracking model before they can act.",
    },
    {
      title: "Handling season/show granularity",
      visual: "tracking",
      observed: "Episode and season states, progress displays and notifications all use different levels of detail.",
      challenge: "Someone may track one episode, finish a season, choose how much progress to see, or decide which releases deserve alerts. These choices can feel disconnected.",
    },
    {
      title: "Useful return context is distributed",
      visual: "return",
      observed: "Progress, availability and release information can sit in different parts of a service.",
      challenge: "Returning to a show can mean reconstructing what changed and what action makes sense next.",
    },
    {
      title: "Information can be comprehensive without being scannable",
      visual: "information",
      observed: "Show pages can combine metadata, reviews, lists, cast, community activity and controls in one place.",
      challenge: "The most useful information can be buried when browsing, tracking and community features share the same hierarchy.",
    },
    {
      title: "Release planning lacks a shared model",
      visual: "release",
      observed: "Calendar views, future episodes and uncertain dates are handled differently across the services reviewed.",
      challenge: "Understanding what is coming next can require finding a separate view or interpreting unclear date states.",
    },
  ] as const;

  return (
    <section className="watchlist-artifact watchlist-artifact--synthesis" aria-label="Benchmark synthesis">
      <div className="watchlist-synthesis__outcomes">
        {outcomes.map(({ title, visual, observed, challenge }) => (
          <article key={title}>
            <OutcomeVisual kind={visual} />
            <h3>{title}</h3>
            <div className="watchlist-synthesis__outcome-detail">
              <span>Observed</span>
              <p>{observed}</p>
            </div>
            <div className="watchlist-synthesis__outcome-detail watchlist-synthesis__outcome-detail--direction">
              <span>Typical challenge</span>
              <p>{challenge}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OutcomeVisual({ kind }: { kind: "save" | "tracking" | "return" | "information" | "release" }) {
  if (kind === "save") {
    return <div className="watchlist-synthesis__visual watchlist-synthesis__visual--save" aria-hidden="true"><span>Save</span><i /><i /><i /></div>;
  }
  if (kind === "tracking") {
    return <div className="watchlist-synthesis__visual watchlist-synthesis__visual--tracking" aria-hidden="true"><span>Episode</span><i /><i /><i /><i /><span>Season</span><b /></div>;
  }
  if (kind === "return") {
    return <div className="watchlist-synthesis__visual watchlist-synthesis__visual--return" aria-hidden="true"><span>Progress</span><span>Availability</span><span>Next episode</span></div>;
  }
  if (kind === "information") {
    return <div className="watchlist-synthesis__visual watchlist-synthesis__visual--information" aria-hidden="true"><i /><i /><i /><i /><i /></div>;
  }
  return <div className="watchlist-synthesis__visual watchlist-synthesis__visual--release" aria-hidden="true"><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span></div>;
}

function DesignPrompts() {
  const prompts = [
    { title: "How might we make Save relate clearly to collections and states?", question: "My shows, personal lists and viewing states all represent a relationship with a show, but their connection to one Save action is unresolved.", kind: "save-options" },
    { title: "How might we bring the right context forward on return?", question: "A person may need progress, the next episode and current availability to decide whether and how to continue.", kind: "resume" },
    { title: "How might we distinguish episode and season progress?", question: "Recording one watched episode and completing a whole season are different updates that may need different levels of effort.", kind: "progress" },
    { title: "How might we place availability where it supports a choice?", question: "A saved show can be available in more than one way; the useful moment for that information is still open to explore.", kind: "availability" },
    { title: "How might we communicate release certainty honestly?", question: "Confirmed, expected and unknown release information should remain distinct without making any of them feel like an error state.", kind: "certainty" },
  ];
  return <section className="watchlist-artifact watchlist-artifact--prompts" aria-label="Design prompts for the Watchlist exploration">
      {prompts.map((prompt) => <article className="watchlist-template__section" key={prompt.title}>
        <div className={`watchlist-prompts__scene watchlist-prompts__scene--${prompt.kind}`}>
          {prompt.kind === "save-options" ? <div className="watchlist-prompts__save-map"><button type="button">Save show</button><div className="watchlist-prompts__save-options"><div><strong>My shows</strong><small>Personal saved collection</small></div><div><strong>Personal list A</strong><small>A personal list</small></div><div><strong>Watching</strong><small>A viewing state</small></div><div><strong>Personal list B</strong><small>A personal list</small></div></div></div> : null}
          {prompt.kind === "resume" ? <><div className="watchlist-prompts__show"><i>SL</i><div><span>Signal Lost</span><small>Saved · 3 episodes watched</small></div></div><div className="watchlist-prompts__next"><span>Next episode</span><strong>The Relay · 48 min</strong></div></> : null}
          {prompt.kind === "progress" ? <><span>Progress can change at different scales</span><div className="watchlist-prompts__update-scopes"><div><strong>One episode</strong><small>“I watched episode 4”</small></div><div><strong>A whole season</strong><small>“I finished season 2”</small></div></div></> : null}
          {prompt.kind === "availability" ? <><span>Signal Lost</span><div className="watchlist-prompts__availability"><i>SA</i><div><strong>Stream A</strong><small>Included with subscription</small></div><b>Available now</b></div><div className="watchlist-prompts__availability"><i>SB</i><div><strong>Stream B</strong><small>Buy individual episodes</small></div><b>Alternative</b></div></> : null}
          {prompt.kind === "certainty" ? <><span>Release information can carry different confidence</span><div className="watchlist-prompts__release"><strong>Episode 4 · 14 August</strong><small>Confirmed</small></div><div className="watchlist-prompts__release is-muted"><strong>Season 3 · next year</strong><small>Expected</small></div><div className="watchlist-prompts__release is-unknown"><strong>Episode 5</strong><small>Date unknown</small></div></> : null}
        </div>
        <div className="watchlist-template__caption"><h3>{prompt.title}</h3><p>{prompt.question}</p></div>
      </article>)}
  </section>;
}

function TaskObjectMapping() {
  const groups = [
    {
      object: "Show",
      destination: "Show detail",
      goal: "Keep a title and decide what to do next.",
      actions: [
        { label: "Poster or backdrop", category: "identity" },
        { label: "Title", category: "identity" },
        { label: "Release year", category: "identity" },
        { label: "Format", category: "identity" },
        { label: "Age rating", category: "identity" },
        { label: "Series state", category: "relationship" },
        { label: "Synopsis", category: "identity" },
        { label: "Genres", category: "identity" },
        { label: "Runtime", category: "identity" },
        { label: "Watched status", category: "relationship" },
        { label: "Watchlist or saved state", category: "relationship" },
        { label: "Personal lists", category: "relationship" },
        { label: "Streaming providers", category: "availability" },
        { label: "Region", category: "availability" },
        { label: "Access type", category: "availability" },
        { label: "Next episode", category: "availability" },
        { label: "Release date", category: "availability" },
        { label: "Ratings", category: "support" },
        { label: "Reviews", category: "support" },
        { label: "Cast", category: "support" },
        { label: "Trailers", category: "support" },
        { label: "Related titles", category: "support" },
        { label: "Recommendations", category: "support" },
      ],
    },
    {
      object: "Season / episode",
      destination: "Show detail",
      goal: "Record progress at the right level.",
      actions: [
        { label: "Season structure", category: "identity" },
        { label: "Episode structure", category: "identity" },
        { label: "Runtime", category: "identity" },
        { label: "Watched status", category: "relationship" },
        { label: "Episode progress", category: "relationship" },
        { label: "Season progress", category: "relationship" },
        { label: "Latest episode", category: "availability" },
        { label: "Next episode", category: "availability" },
        { label: "Release date", category: "availability" },
        { label: "Release certainty", category: "availability" },
        { label: "Upcoming releases", category: "availability" },
      ],
    },
    {
      object: "Collection",
      destination: "My shows",
      goal: "Organise saved titles when useful.",
      actions: [
        { label: "Watchlist or saved state", category: "relationship" },
        { label: "Personal lists", category: "relationship" },
        { label: "Community lists", category: "support" },
        { label: "Add to a list", category: "relationship" },
        { label: "View saved shows", category: "relationship" },
      ],
    },
    {
      object: "Account",
      destination: "Account",
      goal: "Set preferences for a personal service.",
      actions: [
        { label: "Profile details", category: "relationship" },
        { label: "Streaming providers", category: "availability" },
        { label: "Region", category: "availability" },
        { label: "Notification preferences", category: "relationship" },
        { label: "Release alerts", category: "relationship" },
        { label: "Calendar connection", category: "relationship" },
        { label: "Help and feedback", category: "support" },
      ],
    },
  ];

  return (
    <section className="watchlist-artifact watchlist-artifact--task-map" aria-label="Task and object mapping exercise">
      <div className="watchlist-task-map__key" aria-label="Information type key">
        <span>Key</span>
        <i className="watchlist-task-map__note--identity" /> <small>Identity and description</small>
        <i className="watchlist-task-map__note--relationship" /> <small>States and relationships</small>
        <i className="watchlist-task-map__note--availability" /> <small>Availability and release</small>
        <i className="watchlist-task-map__note--support" /> <small>Supporting context</small>
      </div>
      <div className="watchlist-task-map">
        {groups.map((group) => (
          <article key={group.object}>
            <header>
              <div><h3>{group.object}</h3><span>→ {group.destination}</span></div>
              <p>{group.goal}</p>
            </header>
            <ul>
              {group.actions.map((action) => <li className={`watchlist-task-map__note--${action.category}`} key={action.label}>{action.label}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function DirectionSelection() {
  return <section className="watchlist-artifact watchlist-artifact--selection" aria-label="Selected interaction direction">
    <section className="watchlist-template__section">
      <div className="watchlist-selection__sketch">
        <Image src="/watchlist/save-then-set-viewing-state-v2-sketch-figma-bg-v2.png" alt="Hand-drawn interaction sketch showing Save, a My shows confirmation, and options to mark as watched or add to a list." width={2172} height={724} sizes="(max-width: 720px) 100vw, 72vw" />
      </div>
    </section>
  </section>;
}

function CalendarSolutionExploration() {
  const concepts = [
    {
      title: "Upcoming releases",
      description: "A date-led list for people who want to know what returns soon, without navigating a calendar.",
      image: "/watchlist/calendar-concept-upcoming-desktop-v2.png",
      width: 1586,
      height: 992,
      alt: "Hand-drawn Upcoming view listing saved television shows with release dates and relative countdowns.",
    },
    {
      title: "Day calendar",
      description: "A month calendar that places forthcoming episodes in their individual day cells.",
      image: "/watchlist/calendar-concept-day-desktop-v4.png",
      width: 1586,
      height: 992,
      alt: "Hand-drawn month calendar with saved television-show episodes placed in their individual day cells.",
    },
    {
      title: "Week view",
      description: "One contained weekly digest that gathers every forthcoming saved-show release in the same view.",
      image: "/watchlist/calendar-concept-week-desktop-v4.png",
      width: 1586,
      height: 992,
      alt: "Hand-drawn weekly release digest listing all forthcoming saved television-show episodes in one overview box.",
    },
    {
      title: "My shows signal",
      description: "A familiar collection view, enhanced only where a saved title has a forthcoming season.",
      image: "/watchlist/calendar-concept-my-shows-desktop-v2.png",
      width: 1586,
      height: 992,
      alt: "Hand-drawn My shows list with small forthcoming-season indicators beside two saved television shows.",
    },
  ];

  return <section className="watchlist-artifact watchlist-artifact--calendar-solution-exploration" aria-label="Release-view solution exploration">
    <section className="watchlist-template__section">
        <hr className="watchlist-template__section-rule" />
        <div className="watchlist-template__caption watchlist-template__section-intro">
          <h3>Displaying upcoming releases</h3>
          <p>These four directions compare a dedicated upcoming list, calendar views at two time scales, and a lighter signal inside the saved-title collection. Release planning involves different questions at different moments: is a saved show returning, what comes out next, and what is available this week? Purpose-specific views let people move from a quiet signal, to a chronological overview, to immediate detail, without forcing every question into one dense interface.</p>
        </div>
        <div className="watchlist-calendar-concepts">
          {concepts.map((concept) => <article key={concept.title}>
            <Image src={concept.image} alt={concept.alt} width={concept.width} height={concept.height} sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 36vw" />
            <div><h3>{concept.title}</h3><p>{concept.description}</p></div>
          </article>)}
        </div>
    </section>
  </section>;
}

function SaveProcessDesign() {
  return <section className="watchlist-artifact watchlist-artifact--selection-interaction-context" aria-label="Save action location on a show-detail page">
    <div className="watchlist-selection__storyboard-screens">
      <section className="watchlist-template__section">
        <div className="watchlist-selection__storyboard-flow">
          <Image src="/watchlist/save-progress-screen-1-v3.png" alt="Step one: a hand-drawn show-detail page with a Save action." width={1672} height={941} sizes="(max-width: 720px) 100vw, 72vw" />
          <Image src="/watchlist/save-progress-screen-2-v3.png" alt="Step two: a Saved confirmation with review annotations for a clear success marker and the need for a close option." width={1672} height={941} sizes="(max-width: 720px) 100vw, 72vw" />
          <Image src="/watchlist/save-progress-screen-3-v3.png" alt="Step three: a viewing-state screen with review annotations for mark-all placement and season dropdowns." width={1672} height={941} sizes="(max-width: 720px) 100vw, 72vw" />
        </div>
        <div className="watchlist-template__caption">
          <h3>Refining the save and viewing-state flow</h3>
          <p>We separated saving from viewing-state management: a clear confirmation makes the save visible and easy to close, then users can mark a series or individual episodes as watched. The next review tightened the Save action, the collapse behaviour after marking all watched, and the position of the expand controls.</p>
        </div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/save-progress-series-list-annotations-v2.png" alt="Review annotations for collapsing the list after marking all as watched, changing Continue to a primary Save action, and moving toggles before each title." width={1672} height={941} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption">
          <h3>Making completion feel complete</h3>
          <p>Marking every episode watched should return the list to its compact completed state. The final iteration also promotes Save as the decisive action and moves each expand control before its title, making the hierarchy and the action order easier to scan.</p>
        </div>
      </section>
    </div>
  </section>;
}

function CalendarExploration() {
  return <>
    <CalendarSolutionExploration />
    <section className="watchlist-artifact watchlist-artifact--selection-interaction-context" aria-label="Release representation exploration">
      <div className="watchlist-selection__storyboard-screens">
        <section className="watchlist-template__section watchlist-template__section--intro-only">
          <hr className="watchlist-template__section-rule" />
          <div className="watchlist-template__caption watchlist-template__section-intro">
            <h3>What is an intuitive way to represent a series?</h3>
            <p>A series release is a bounded process: it begins with a premiere, unfolds through scheduled episodes, and reaches a finale or a full-series release. This asks a different question from the views above: how long will a series run, what may overlap it, and what could someone line up next? Making that duration visible calls for a representation that shows time span and milestones together, rather than only a list of dates.</p>
          </div>
        </section>
        <section className="watchlist-template__section">
          <div className="watchlist-template__artifacts watchlist-template__artifacts--1"><div className="watchlist-concept-sketch"><Image src="/watchlist/calendar-pattern-investigation-v3.png" alt="Hand-drawn comparison of four release-schedule patterns, annotated from above to show that Calendar grid, Release list, and Timeline do not indicate duration." width={1693} height={929} sizes="(max-width: 720px) 100vw, 72vw" /></div></div>
          <div className="watchlist-template__caption watchlist-concept-summary"><h3>Comparing release patterns</h3><p>A Gantt board is the closest established planning pattern. It places a time span and its key events on one shared calendar, making the release window visible alongside its milestones — a useful model to adapt and test for television releases.</p></div>
        </section>
        <section className="watchlist-template__section">
          <div className="watchlist-template__artifacts watchlist-template__artifacts--1"><div className="watchlist-concept-sketch"><Image src="/watchlist/calendar-grid-investigation-v9.png" alt="Annotated black-ink calendar investigation with outline-only release bars, rounded true series endpoints, flat continuation ends, and notes on series labels, row wrapping, colour coding, and limited space." width={1536} height={1024} sizes="(max-width: 720px) 100vw, 72vw" /></div></div>
          <div className="watchlist-template__caption watchlist-concept-summary"><h3>Testing the calendar grid</h3><p>A month-and-week calendar keeps the time frame compact while letting release duration span the weeks in a single row. The next question is whether this overview provides enough detail when more shows enter view.</p></div>
        </section>
      </div>
    </section>
  </>;
}

function CalendarDirectionRefinement() {
  return <section className="watchlist-artifact watchlist-artifact--selection-interaction-context" aria-label="Calendar design refinement">
    <div className="watchlist-selection__storyboard-screens">
      <section className="watchlist-template__section">
        <div className="watchlist-calendar-final-views" aria-label="Selected release-planning views">
          <Image src="/watchlist/calendar-series-release-zoomed-out-v6.png" alt="Hand-drawn zoomed-out twenty-five-week Gantt-style release view with episode dots and month boundaries." width={1600} height={983} sizes="(max-width: 720px) 100vw, 30vw" />
          <Image src="/watchlist/calendar-concept-week-desktop-v4.png" alt="Hand-drawn Week view with a detailed current-week release list." width={1586} height={992} sizes="(max-width: 720px) 100vw, 30vw" />
          <Image src="/watchlist/calendar-concept-upcoming-desktop-v2.png" alt="Hand-drawn Upcoming view listing saved television shows with release dates and countdowns." width={1586} height={992} sizes="(max-width: 720px) 100vw, 30vw" />
        </div>
        <div className="watchlist-template__caption"><h3>Selecting and refining release planning</h3><p>The selected model keeps My shows focused on saved titles, with a small signal only when a future season is relevant. Detailed release information belongs in a dedicated planning destination, where Upcoming supports chronological scanning and Week supports a more detailed current-week view. Together, these views help someone see when a series will end, what overlaps it, and what they might watch next. The following sketches refine those complementary surfaces and distinguish confirmed dates, expected returns, and unknown release information without treating uncertainty as an error.</p></div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/release-refinement-my-shows-v5.png" alt="Annotated hand-drawn My shows view distinguishing a confirmed dated return from a less specific new-season signal." width={1536} height={1024} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption"><h3>Refining the My shows signal</h3><p>The collection only surfaces release information when it is relevant. The wording distinguishes an announced season from a confirmed return date, so uncertainty is visible rather than represented as a false promise.</p></div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/release-refinement-week-view-v5.png" alt="Annotated hand-drawn Week view showing a detailed selected week and compact future weeks." width={1536} height={1024} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption"><h3>Refining the Week view</h3><p>The current week remains expanded so episode and service information can be scanned together. Future weeks stay compact until selected, creating a clear path from a broad release horizon to the detail needed for the week ahead.</p></div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/release-refinement-upcoming-releases-v5.png" alt="Annotated hand-drawn Upcoming view with show, season and episode, release date, and countdown columns." width={1536} height={1024} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption"><h3>Refining Upcoming</h3><p>A single chronological list brings active releases, forthcoming returns and confirmed new seasons into one place. The review question remains explicit: whether the list should announce every episode or only the next meaningful release for each show.</p></div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/calendar-series-release-close-annotations-v1.png" alt="Annotated hand-drawn close-view Gantt-style calendar explaining episode labels, edge-aligned series names, and near-term planning." width={1736} height={906} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption"><h3>Close view — 6 weeks</h3><p>When a release extends outside the visible window, its name stays inside the bar at the edge where it remains visible. Episode names provide detail at this zoom level.</p></div>
      </section>
      <section className="watchlist-template__section">
        <Image src="/watchlist/calendar-series-release-zoomed-out-annotations-v1.png" alt="Annotated hand-drawn zoomed-out twenty-five-week release view explaining release cadence, duration, overlap, and planning what to watch next." width={1600} height={983} sizes="(max-width: 720px) 100vw, 72vw" />
        <div className="watchlist-template__caption"><h3>Zoomed-out view — 25 weeks</h3><p>At a longer horizon, only month boundaries remain visible. Variable bar lengths and episode dots retain the cadence of each release, so a person can see when a series ends, what overlaps it, and which saved show could follow. Labels sit immediately after the bar and a partly visible title can enter from outside the view.</p></div>
      </section>
    </div>
  </section>;
}

function ConceptComparison() {
  const concepts = [
    {
      name: "Save and move on",
      rationale: "The show is saved to My shows immediately, then a compact confirmation states where it went. Organisation can happen later.",
      image: "/watchlist/save-and-move-on-sketch-white-figma-bg-v2.png",
      imageHeight: 724,
      alt: "Hand-drawn interaction sketch showing Save followed by a confirmation that a show was added to My shows.",
    },
    {
      name: "Save, then set viewing state",
      rationale: "After saving, the confirmation can record that someone has already watched the show, while keeping a specific list optional. Planning remains a list choice.",
      image: "/watchlist/save-then-set-viewing-state-v2-sketch-figma-bg-v2.png",
      imageHeight: 724,
      alt: "Hand-drawn interaction sketch showing Save, a My shows confirmation, and options to mark as watched or add to a list.",
    },
    {
      name: "Save into a category",
      rationale: "Watchlist, Watched and Follow become parallel categories alongside personal lists. The model is easy to scan, but mixes viewing state with collection organisation.",
      image: "/watchlist/save-into-category-sketch-figma-bg-v2.png",
      imageHeight: 724,
      alt: "Hand-drawn interaction sketch showing Save, confirmation in My shows, and category choices for Watchlist, Watched, Follow, and Personal list A.",
    },
  ];
  return (
    <section className="watchlist-artifact watchlist-artifact--concepts" aria-label="Save and release-view concept comparison">
      {concepts.map((concept, index) => (
        <section className="watchlist-template__section" key={concept.name}>
          {index === 0 ? <>
            <hr className="watchlist-template__section-rule" />
            <div className="watchlist-template__caption watchlist-template__section-intro">
              <h3>Saving a show</h3>
              <p>Three approaches compare how a save can be acknowledged and organised without requiring someone to learn a tracking model. Each uses the same show-page context, isolating the save moment, the feedback that follows, and the way optional collection choices are introduced.</p>
            </div>
          </> : null}
          <div className="watchlist-template__artifacts watchlist-template__artifacts--1">
            <div className="watchlist-concept-sketch">
              <Image src={concept.image} alt={concept.alt} width={2172} height={concept.imageHeight} sizes="(max-width: 720px) 100vw, 72vw" />
            </div>
          </div>
          <div className="watchlist-template__caption watchlist-concept-summary"><h3>{concept.name}</h3><p>{concept.rationale}</p></div>
        </section>
      ))}
      <CalendarSolutionExploration />
    </section>
  );
}

function InformationArchitecture() {
  const node = (x: number, label: string, question: string, subtle = false) => (
    <g className={subtle ? "watchlist-ia__node watchlist-ia__node--subtle" : "watchlist-ia__node"}>
      <rect x={x} y="158" width="150" height="36" />
      <text x={x + 75} y="180" textAnchor="middle">{label}</text>
      <text x={x} y="220" className="watchlist-ia__question">{question}</text>
    </g>
  );

  const root = (
    <g className="watchlist-ia__node">
      <text x="135" y="18" className="watchlist-ia__root-label" textAnchor="middle">MY COLLECTION</text>
      <rect x="60" y="40" width="150" height="36" />
      <text x="135" y="62" textAnchor="middle">YEAR VIEW</text>
    </g>
  );

  return (
    <section className="watchlist-artifact watchlist-artifact--ia" aria-label="Watchlist information architecture">
      <svg viewBox="0 0 960 252" role="img" aria-label="Watchlist collection planning model connecting a year view to filtering, show detail, and availability">
        <g className="watchlist-ia__connector">
          <path d="M135 76V120M135 120H735M135 120V158M435 120V158M735 120V158" />
        </g>
        {root}
        {node(60, "FILTER / STATUS", "When does it happen?", true)}
        {node(360, "SHOW DETAIL", "What should I know?")}
        {node(660, "AVAILABILITY", "Where can I watch?", true)}
      </svg>
    </section>
  );
}

function CoreFlow() {
  const screens = [
    { action: "Add to my shows" },
    { action: "Saved" },
    { action: "Add to a list" },
    { action: "Season 2 · 4/8" },
  ];
  return (
    <section className="watchlist-artifact watchlist-artifact--flow" aria-label="Save and progress user flow">
      <div className="watchlist-flow__screens">
        {screens.map((screen, index) => (
          <article key={screen.action}>
            <WireframeChrome>
              <div className="watchlist-flow-screen">
                <div className="watchlist-flow-screen__hero" />
                <span className="watchlist-artifact__line watchlist-artifact__line--title" />
                <span className="watchlist-artifact__line" />
                <button type="button">{screen.action}</button>
                {index === 1 ? (
                  <div className="watchlist-flow-screen__confirmation" aria-label="Saved show confirmation popup">
                    <CircleCheckBig aria-hidden="true" />
                    <strong>Saved to My shows</strong>
                    <span>Add to one of your lists, or continue.</span>
                    <div><button type="button">Add to a list</button><button type="button">Done</button></div>
                  </div>
                ) : null}
                {index === 2 ? <div className="watchlist-flow-screen__menu"><span>Add to a list</span><span className="is-active">Create a list</span><span>Done</span></div> : null}
                {index === 3 ? <div className="watchlist-flow-screen__progress"><i /><i /><i /><i /><i /><i /><i /><i /></div> : null}
              </div>
            </WireframeChrome>
          </article>
        ))}
      </div>
      <div className="watchlist-flow__branch">
        <span>After saving</span><i aria-hidden="true" />
        <strong>Leave it in My shows</strong>
        <small>The flow ends successfully without requiring a list, date or progress update.</small>
      </div>
    </section>
  );
}

function InteractionStates() {
  const states = [
    ["Not started", "Default after saving", "Start watching"],
    ["Watching", "Episode progress visible", "Pause or catch up"],
    ["Paused", "Progress is retained", "Resume watching"],
    ["Caught up", "No unplayed episodes", "New release arrives"],
  ];

  const stateNode = (x: number, index: number, state: string, description: string, transition: string) => (
    <g className="watchlist-states__svg-node" key={state}>
      <rect x={x} y="158" width="150" height="36" />
      <text x={x + 75} y="180" className="watchlist-states__svg-node-label" textAnchor="middle">{state}</text>
      <text x={x} y="238" className="watchlist-states__svg-copy">{description}</text>
      <text x={x} y="260" className="watchlist-states__svg-transition">{transition}</text>
    </g>
  );

  return (
    <section className="watchlist-artifact watchlist-artifact--states" aria-label="Saved show state model">
      <svg className="watchlist-states__diagram" viewBox="0 0 990 282" role="img" aria-label="Saved show with four possible interaction states">
        <g className="watchlist-states__svg-connector">
          <path d="M135 76V120M135 120H855" />
          <path d="M135 120V158M375 120V158M615 120V158M855 120V158" />
        </g>
        <g className="watchlist-states__svg-root">
          <text x="135" y="15">PERSISTENT OBJECT</text>
          <rect x="60" y="40" width="150" height="36" />
          <text x="135" y="63">SAVED SHOW</text>
        </g>
        {states.map(([state, description, transition], index) => stateNode(60 + index * 240, index, state, description, transition))}
      </svg>
    </section>
  );
}

function ShowWireframe({ selectedOnly = false }: { selectedOnly?: boolean } = {}) {
  const episodeRows = [
    ["01", "The signal", "42 min · Watched", true],
    ["02", "The relay", "48 min · Available now", false],
    ["03", "The crossing", "48 min · 18 Sep", false],
  ] as const;

  return (
    <section className={`watchlist-artifact watchlist-artifact--wireframes${selectedOnly ? " watchlist-artifact--wireframes-selected" : ""}`} aria-label="Signal and Carbon Watchlist wireframes">
      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-collection">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><b>Discover</b><span>My shows</span><span>Account</span><i /></div>
            <header><div><h4>Browse shows</h4></div><div className="watchlist-wireframe-search">Search shows, people, genres <b>⌕</b></div></header>
            <nav><b>Browse all</b><span>New releases</span><span>Genres &amp; collections</span></nav>
            <div className="watchlist-wireframe-collection__grid">{["A", "B", "C", "D"].map((letter) => <article key={letter}><i>{letter}</i><div><strong>Show {letter}</strong><small>{letter === "A" ? "Premieres this month" : letter === "B" ? "Now streaming" : "New season soon"}</small><em>View show →</em></div></article>)}</div>
          </div>
        </WireframeChrome>
      </article>

      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-collection">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><span>Discover</span><b>My shows</b><span>Account</span><i /></div>
            <header><div><h4>My shows</h4></div><button type="button">View calendar →</button></header>
            <nav><b>All saved</b><span>Plan to watch</span><span>Watching</span><span>Personal list A</span></nav>
            <div className="watchlist-wireframe-collection__grid">{["A", "B", "C", "D"].map((letter) => <article key={letter}><i>{letter}</i><div><strong>Show {letter}</strong><small>{letter === "A" ? "Watching · new season soon" : letter === "B" ? "Plan to watch · 2 weeks" : "Caught up"}</small><em>View show →</em></div></article>)}</div>
          </div>
        </WireframeChrome>
      </article>

      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-show">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><span>Discover</span><b>My shows</b><span>Account</span><i /></div>
            <aside><div className="watchlist-wireframe-poster">Show<br />A</div><small>2026 · Drama</small></aside>
            <main>
              <div className="watchlist-wireframe-show__title"><div><p>Series · 3 seasons</p><h4>Show A</h4></div><button type="button">＋ Save</button></div>
              <nav><b>Overview</b><span>Episodes</span><span>Availability</span></nav>
              <div className="watchlist-wireframe-show__overview"><section><small>Progress</small><strong>Season 1 · 3 of 8 watched</strong><span>Episode and season updates</span></section><section><small>Availability</small><strong>Stream A</strong><span>Included with subscription</span></section><section><small>Next release</small><strong>Episode 4 · 18 Sep</strong><span>Confirmed</span></section></div>
            </main>
          </div>
        </WireframeChrome>
      </article>

      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-progress">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><span>Discover</span><b>My shows</b><span>Account</span><i /></div>
            <div className="watchlist-wireframe-confirmation"><b>✓</b><div><strong>Saved to My shows</strong><span>Add it to a list now, or organise it later.</span></div><button type="button">Add to a list</button><button type="button" aria-label="Close confirmation">×</button></div>
            <div className="watchlist-wireframe-progress__heading"><div><p>Show A · Saved</p><h4>Season 1</h4></div><button type="button">Mark season watched</button></div>
            <div className="watchlist-wireframe-progress__list">
              {episodeRows.map(([number, title, detail, watched]) => <div key={number}><button type="button" aria-label={`Expand episode ${number}`}>⌄</button><span>{number}</span><section><strong>{title}</strong><small>{detail}</small></section><button type="button" className={watched ? "is-watched" : ""}>{watched ? "Watched" : "Mark watched"}</button></div>)}
            </div>
          </div>
        </WireframeChrome>
      </article>

      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-releases">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><span>Discover</span><b>My shows</b><span>Account</span><i /></div>
            <div className="watchlist-wireframe-releases__heading"><div><p>My shows / Calendar</p><h4>Calendar</h4></div><nav><b>Upcoming</b><span>Week</span><span>Open planner →</span></nav></div>
            <div className="watchlist-wireframe-release-grid"><section><small>MY SHOWS</small><div><i>A</i><span><strong>Show A</strong><em>Season 2 expected</em></span></div><div><i>B</i><span><strong>Show B</strong><em>Episode 6 · Fri</em></span></div><div><i>C</i><span><strong>Show C</strong><em>No upcoming release</em></span></div></section><main><small>THIS WEEK</small><article><time>FRI<br /><b>18</b></time><div><strong>Show B · Episode 6</strong><span>Stream A · 48 min</span></div><em>Confirmed</em></article><small>LATER</small><article><time>SEP<br /><b>24</b></time><div><strong>Show A · Season 2</strong><span>Release date to be confirmed</span></div><em className="is-muted">Expected</em></article></main></div>
          </div>
        </WireframeChrome>
      </article>

      <article className="watchlist-wireframe-state">
        <WireframeChrome plain>
          <div className="watchlist-wireframe-releases">
            <div className="watchlist-wireframe-nav"><strong>Watchlist</strong><span>Discover</span><span>My shows</span><b>Account</b><i /></div>
            <div className="watchlist-wireframe-releases__heading"><div><h4>Your preferences</h4></div></div>
            <div className="watchlist-wireframe-release-grid"><section><small>STREAMING SERVICES</small><div><i>✓</i><span><strong>Stream A</strong><em>Included in availability results</em></span></div><div><i>✓</i><span><strong>Stream B</strong><em>Included in availability results</em></span></div></section><main><small>RELEASE UPDATES</small><article><time>✓</time><div><strong>Confirmed episode dates</strong><span>Visible in My shows and release planning</span></div></article><article><time>○</time><div><strong>Availability changes</strong><span>Optional notification setting</span></div></article></main></div>
          </div>
        </WireframeChrome>
      </article>
    </section>
  );
}

function WireframeTensions() {
  const reviews = [
    {
      title: "Questioning the starting point",
      copy: "Browse is the current default, but the project increasingly centres on returning to an existing relationship with saved shows. The annotation identifies an assumption to test: whether returning users expect My shows to be their starting point.",
      image: "/watchlist/wireframe-review-browse-annotated.png",
      width: 1981,
      height: 794,
      alt: "Browse wireframe annotated in red to question Discover as the default entry point and suggest My shows as a possible returning-user home.",
    },
    {
      title: "Separating discovery from management",
      copy: "Browse and My shows support different intentions, yet both use a similar repeated-card treatment. The review asks whether managing saved shows needs a more distinct hierarchy from discovering something new.",
      image: "/watchlist/wireframe-review-my-shows-annotated.png",
      width: 1985,
      height: 792,
      alt: "My shows wireframe annotated in red to question it as the returning-user home and note its similarity to the Browse grid.",
    },
    {
      title: "Locating release planning",
      copy: "Detailed planning emerged after the original information architecture was drawn. Rather than rewriting that earlier decision, the review keeps Calendar within My shows and identifies the route into the planner as something to evaluate.",
      image: "/watchlist/wireframe-review-calendar-annotated.png",
      width: 1792,
      height: 878,
      alt: "Calendar wireframe annotated in red to question its position within My shows and the later emergence of the detailed planner.",
    },
  ];

  return (
    <section className="watchlist-artifact watchlist-artifact--template watchlist-artifact--wireframe-review" aria-label="Internally identified wireframe tensions">
      <section className="watchlist-template__section watchlist-template__section--intro-only">
        <div className="watchlist-template__caption watchlist-template__section-intro">
          <h3>Reviewing the complete product model</h3>
          <p>Connecting the wireframes made assumptions visible that were difficult to see while individual interactions were being designed. The annotations below record an internal design review and define questions for later evaluation; they are not participant findings.</p>
        </div>
        <hr className="watchlist-template__section-rule" />
      </section>
      {reviews.map((review) => (
        <section className="watchlist-template__section" key={review.title}>
          <Image src={review.image} alt={review.alt} width={review.width} height={review.height} sizes="(max-width: 720px) 100vw, 72vw" />
          <div className="watchlist-template__caption">
            <h3>{review.title}</h3>
            <p>{review.copy}</p>
          </div>
        </section>
      ))}
    </section>
  );
}

function TestPlan() {
  const tests = [
    {
      hypothesis: "The default destination should support the most common returning-user intent.",
      task: "Open the product and find the show you are currently following. No destination is named in the task.",
      observe: "The first destination inspected, hesitation on Browse, and whether My shows is expected to be the starting point.",
      signal: "The participant reaches their saved show and can explain what they expected on entry.",
    },
    {
      hypothesis: "Saving can remain simple while organisation stays optional.",
      task: "Keep a newly discovered show, then add it to Personal list A.",
      observe: "Whether Save is understood before list organisation and whether the confirmation provides a clear next step.",
      signal: "The show is saved and organised without interpreting several competing save states.",
    },
    {
      hypothesis: "Release certainty and planning are understandable inside My shows.",
      task: "Find which saved show returns next and what is still uncertain.",
      observe: "Interpretation of confirmed, expected and unknown dates; use of Calendar; and whether the detailed planner is sought.",
      signal: "The participant identifies the next release without treating an expected or unknown date as exact.",
    },
  ];
  return <TemplateTextSections ariaLabel="Usability testing plan" sections={[
    {
      title: "Evaluation approach",
      copy: "Run moderated, task-based sessions with people who follow at least five active shows, using the connected low-fidelity product model. The plan describes what will be evaluated; no findings are claimed before sessions are completed.",
    },
    ...tests.map((test) => ({
      title: test.hypothesis,
      copy: `${test.task} Observe ${test.observe.toLowerCase()} A successful outcome is that ${test.signal.charAt(0).toLowerCase()}${test.signal.slice(1)}`,
    })),
  ]} />;
}

function Reflection() {
  const columns = [
    {
      label: "Resolved in the concept",
      items: ["One saved relationship", "Season and episode granularity", "Show context remains intact"],
    },
    {
      label: "Requires user evidence",
      items: ["State terminology", "When to offer state selection", "Value of future release information"],
    },
    {
      label: "Next iteration",
      items: ["Run five moderated sessions", "Revise the state model", "Prototype the mobile flow"],
    },
  ];
  return (
    <section className="watchlist-artifact watchlist-artifact--reflection" aria-label="Current project position">
      <div className="watchlist-reflection__position">
        <span>Current position</span>
        <strong>A focused interaction model for saving, tracking and returning to a show.</strong>
      </div>
      <div className="watchlist-reflection__columns">
        {columns.map((column) => (
          <article key={column.label}>
            <h3>{column.label}</h3>
            {column.items.map((item) => <p key={item}>{item}</p>)}
          </article>
        ))}
      </div>
    </section>
  );
}

function PlannerControlEvolution() {
  const panels = [
    { label: "A", title: "Zoom only", copy: "A single horizon control made the calendar scale clear, but offered no way to move through time.", image: "/watchlist/control-panel-studies/01-zoom-only.png", alt: "Early release planner with a single zoom control above the calendar." },
    { label: "B", title: "Separate controls", copy: "Adding a position control established the two required dimensions, but the controls read as unrelated utilities.", image: "/watchlist/control-panel-studies/02-two-controls.png", alt: "Intermediate release planner with separated zoom and position controls." },
    { label: "C", title: "Connected control panel", copy: "The chosen direction groups zoom, position and visible range into one planning context.", image: "/watchlist/control-panel-studies/03-connected-panel.png", alt: "Current release planner with zoom and position controls grouped in one panel." },
  ] as const;

  return <section className="watchlist-artifact watchlist-artifact--planner-controls" aria-label="Release planner control-panel iterations">
    <header className="watchlist-planner-controls__intro"><span>Control-panel studies</span><p>Static captures of the main control decisions. These remain deliberately open for review annotation.</p></header>
    <div className="watchlist-planner-controls__grid">
      {panels.map((panel) => <article key={panel.label}>
        <div className="watchlist-planner-controls__screen"><Image src={panel.image} alt={panel.alt} width={1376} height={1032} sizes="(max-width: 760px) 100vw, 30vw" /></div>
        <div className="watchlist-planner-controls__caption"><span>{panel.label}</span><div><h3>{panel.title}</h3><p>{panel.copy}</p></div></div>
      </article>)}
    </div>
  </section>;
}

function SlideTemplate() {
  const sections = [
    {
      label: "A consistent way to present each stage",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      images: 1,
    },
    {
      label: "Comparing related interface moments",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A small set of images can sit together when they need to be read as one comparison.",
      images: 2,
    },
    {
      label: "Showing a sequence or a system",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Use a row of images for a concise progression, retaining one clear label and explanation beneath.",
      images: 3,
    },
    {
      label: "A text-only section",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. When there is no artefact to show, the section simply begins with its label and supporting description—without an empty visual frame.",
      images: 0,
      textOnly: true,
    },
    {
      label: "A longer text-only section",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      secondaryDescription: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
      images: 0,
      textColumns: true,
    },
  ];

  return (
    <section className="watchlist-artifact watchlist-artifact--template" aria-label="Working Watchlist slide template">
      {sections.map((section) => (
        <section className={`watchlist-template__section${section.textOnly ? " watchlist-template__section--text-only" : ""}${section.textColumns ? " watchlist-template__section--text-columns" : ""}`} key={section.label}>
          {section.images ? (
            <div className={`watchlist-template__artifacts watchlist-template__artifacts--${section.images}`} aria-label={`${section.images} artefact placeholder${section.images > 1 ? "s" : ""}`}>
              {Array.from({ length: section.images }, (_, imageIndex) => <div className="watchlist-template__artifact" key={imageIndex} />)}
            </div>
          ) : null}
          <div className="watchlist-template__caption">
            <h3>{section.label}</h3>
            {section.textColumns ? (
              <div className="watchlist-template__copy-columns">
                <p>{section.description}</p>
                <p>{section.secondaryDescription}</p>
              </div>
            ) : (
              <p>{section.description}</p>
            )}
          </div>
        </section>
      ))}
    </section>
  );
}

export function WatchlistCaseStudyVisual({ type }: { type: CaseStudyVisual }) {
  if (type === "informal-research") return <InformalResearch />;
  if (type === "benchmark-review") return <BenchmarkReview />;
  if (type === "benchmark-synthesis") return <BenchmarkSynthesis />;
  if (type === "design-prompts") return <DesignPrompts />;
  if (type === "task-object-mapping") return <TaskObjectMapping />;
  if (type === "direction-selection") return <DirectionSelection />;
  if (type === "selection-interaction-context") return <SaveProcessDesign />;
  if (type === "calendar-exploration") return <CalendarExploration />;
  if (type === "calendar-direction") return <CalendarDirectionRefinement />;
  if (type === "information-architecture") return <InformationArchitecture />;
  if (type === "concept-comparison") return <ConceptComparison />;
  if (type === "core-flow") return <CoreFlow />;
  if (type === "interaction-states") return <InteractionStates />;
  if (type === "show-wireframe") return <ShowWireframe />;
  if (type === "show-wireframe-selection") return <ShowWireframe selectedOnly />;
  if (type === "wireframe-tensions") return <WireframeTensions />;
  if (type === "test-plan") return <TestPlan />;
  if (type === "planner-control-evolution") return <PlannerControlEvolution />;
  if (type === "slide-template") return <SlideTemplate />;
  return <Reflection />;
}
