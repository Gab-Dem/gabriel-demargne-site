import Image from "next/image";
import type { ReactNode } from "react";
import { Braces, PanelsTopLeft, SpellCheck2, UsersRound } from "lucide-react";
import type { DesignPortfolioChapter } from "@/data/design-portfolio";

export function DesignPortfolioChapterVisual({
  chapter,
}: {
  chapter: DesignPortfolioChapter;
}) {
  switch (chapter.slug) {
    case "portfolio-direction":
      return <PortfolioOverviewVisual />;
    case "spaces-problem":
      return <SpacesProblemVisual />;
    case "spaces-two-sided-service":
      return <SpacesServiceVisual />;
    case "spaces-product-scope":
      return <SpacesScopeVisual />;
    case "spaces-experience-model":
      return <SpacesExperienceVisual />;
    case "spaces-live-product":
      return <SpacesLiveProductVisual />;
    case "watchlist-introduction":
      return <WatchlistIntroductionVisual />;
    case "watchlist-benchmark":
      return <WatchlistBenchmarkVisual />;
    case "watchlist-structure":
      return <WatchlistStructureVisual />;
    case "watchlist-connected-product":
      return <WatchlistConnectedProductVisual />;
    case "watchlist-review":
      return <WatchlistDevelopedApplicationVisual />;
    case "finder-problem":
      return <ProductFinderIntroductionVisual />;
    case "previous-work":
      return <PreviousWorkVisual />;
    case "ai-supported-design-practice":
      return <DesignPracticeVisual />;
    default:
      return null;
  }
}

function PortfolioOverviewVisual() {
  const introduction = "Product and UX work spanning research, product definition, information architecture, interaction design, prototyping and implementation.";

  return (
    <section className="design-portfolio-overview" aria-label="Contents of this portfolio">
      <div className="design-portfolio-overview__introduction design-portfolio-overview__introduction--desktop">
        <h3>Portfolio content</h3>
        <p>{introduction}</p>
      </div>
      <div className="design-portfolio-overview__introduction design-portfolio-overview__introduction--mobile">
        <p>{introduction}</p>
        <h3>Content</h3>
      </div>

      <div className="design-portfolio-overview__contents">
        <div className="design-portfolio-overview__item is-spaces">
          <span className="design-portfolio-overview__marker" aria-hidden="true" />
          <a className="design-portfolio-overview__link" href="#spaces-problem" aria-label="Go to Spaces Project" />
          <p className="design-portfolio-overview__mobile-project">Spaces Project</p>
          <h4><span className="design-portfolio-overview__headline--desktop">Turning competing needs into a working service</span><span className="design-portfolio-overview__headline--mobile">Mapping a two-sided service through to implementation</span></h4>
          <div className="design-portfolio-overview__meta">
            <p>Spaces Project</p>
            <div className="design-portfolio-overview__tags design-portfolio-overview__tags--desktop" aria-label="Skills demonstrated">
              <span>[Problem Framing]</span>
              <span>[Service Design]</span>
              <span>[Product Strategy]</span>
              <span>[Information Architecture]</span>
              <span>[Interaction Design]</span>
              <span>[Responsive Design]</span>
              <span>[Implementation]</span>
            </div>
            <div className="design-portfolio-overview__skills">Journey mapping · Product strategy · Responsive delivery</div>
          </div>
          <PortfolioOverviewJumpLink href="#spaces-problem" project="Spaces Project" />
        </div>

        <div className="design-portfolio-overview__item is-watchlist">
          <span className="design-portfolio-overview__marker" aria-hidden="true" />
          <a className="design-portfolio-overview__link" href="#watchlist-introduction" aria-label="Go to Watchlist Investigation" />
          <p className="design-portfolio-overview__mobile-project">Watchlist Investigation</p>
          <h4><span className="design-portfolio-overview__headline--desktop">Investigating and prototyping a connected product model</span><span className="design-portfolio-overview__headline--mobile">Developing a product from research to working prototype</span></h4>
          <div className="design-portfolio-overview__meta">
            <p>Watchlist Investigation</p>
            <div className="design-portfolio-overview__tags design-portfolio-overview__tags--desktop" aria-label="Skills demonstrated">
              <span>[Product Investigation]</span>
              <span>[Benchmarking]</span>
              <span>[Interaction Design]</span>
              <span>[Prototyping]</span>
              <span>[Product Design]</span>
              <span>[Responsive Design]</span>
              <span>[Implementation]</span>
            </div>
            <div className="design-portfolio-overview__skills">Benchmarking · Interaction design · Prototyping</div>
          </div>
          <PortfolioOverviewJumpLink href="#watchlist-introduction" project="Watchlist Investigation" />
        </div>

        <div className="design-portfolio-overview__item is-finder">
          <span className="design-portfolio-overview__marker" aria-hidden="true" />
          <a className="design-portfolio-overview__link" href="#finder-problem" aria-label="Go to Product Finder" />
          <p className="design-portfolio-overview__mobile-project">Product Finder</p>
          <h4><span className="design-portfolio-overview__headline--desktop">Designing adaptive search logic for finding products nearby</span><span className="design-portfolio-overview__headline--mobile">Modelling and refining adaptive search decisions</span></h4>
          <div className="design-portfolio-overview__meta">
            <p>Product Finder</p>
            <div className="design-portfolio-overview__tags design-portfolio-overview__tags--desktop" aria-label="Skills demonstrated">
              <span>[Systems Design]</span>
              <span>[Process Mapping]</span>
              <span>[Decision Logic]</span>
              <span>[Adaptive Search]</span>
            </div>
            <div className="design-portfolio-overview__skills">Process mapping · Decision logic · Systems design</div>
          </div>
          <PortfolioOverviewJumpLink href="#finder-problem" project="Product Finder" />
        </div>

        <div className="design-portfolio-overview__item is-practice">
          <span className="design-portfolio-overview__marker" aria-hidden="true" />
          <a className="design-portfolio-overview__link" href="#ai-supported-design-practice" aria-label="Go to Design Practices" />
          <p className="design-portfolio-overview__mobile-project">Design Practices</p>
          <h4><span className="design-portfolio-overview__headline--desktop">Using AI responsibly in design thinking</span><span className="design-portfolio-overview__headline--mobile">How I use AI in design thinking</span></h4>
          <div className="design-portfolio-overview__meta">
            <p>Design Practices</p>
            <div className="design-portfolio-overview__tags design-portfolio-overview__tags--desktop" aria-label="Skills demonstrated">
              <span>[Synthesis]</span>
              <span>[Rapid Prototyping]</span>
              <span>[Process Governance]</span>
            </div>
            <div className="design-portfolio-overview__skills">Synthesis · Prototyping · AI practice</div>
          </div>
          <PortfolioOverviewJumpLink href="#ai-supported-design-practice" project="Design Practices" />
        </div>
      </div>
    </section>
  );
}

function PortfolioOverviewJumpLink({ href, project }: { href: string; project: string }) {
  return (
    <a className="design-portfolio-overview__jump" href={href} aria-label={`Jump to ${project}`}>
      <span>View section</span>
      <svg width="18" height="18" viewBox="0 0 13 12" fill="none" aria-hidden="true">
        <path d="M1 6h11m0 0-4.5-4.5M12 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function WatchlistIntroductionVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--watchlist">
    <div className="design-portfolio-watchlist-screens">
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=home" printSrc="/watchlist/print-home-desktop.png" title="Watchlist home on desktop" label="Home · desktop" viewport="desktop" />
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=home" printSrc="/watchlist/print-home-mobile.png" title="Watchlist home on mobile" label="Home" viewport="mobile" />
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=shows" printSrc="/watchlist/print-shows-mobile.png" title="Watchlist My shows on mobile" label="My shows" viewport="mobile" />
    </div>
    <VisualCaption label="An independent product-design exploration">
      Watchlist was developed through product framing, comparative research, interaction design
      and prototyping. The resulting connected application uses a fictional catalogue and stores
      its state locally.
    </VisualCaption>
  </figure>;
}

function StaticWatchlistPreview({
  src,
  printSrc,
  title,
  label,
  viewport,
  staticOnly = false,
}: {
  src: string;
  printSrc: string;
  title: string;
  label: string;
  viewport: "desktop" | "mobile";
  staticOnly?: boolean;
}) {
  return <div className={`design-portfolio-watchlist-screen is-${viewport}${staticOnly ? " is-static" : ""}`}>
    <span>{label}</span>
    <div className="design-portfolio-watchlist-preview">
      {!staticOnly ? <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={-1}
      /> : null}
      <Image
        className="design-portfolio-watchlist-print-capture"
        src={printSrc}
        width={viewport === "desktop" ? 1440 : 390}
        height={viewport === "desktop" ? 900 : 844}
        alt=""
        aria-hidden="true"
        unoptimized
      />
    </div>
  </div>;
}

function WatchlistBenchmarkVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--watchlist">
    <div className="design-portfolio-watchlist-evidence-group">
      <h4>Comparative benchmark</h4>
      <div className="design-portfolio-evidence-board__row is-three-up">
        <SourceArtefact
          src="/watchlist/benchmark-provider-radars.png"
          width={2184}
          height={1086}
          alt="Comparative radar diagrams for Trakt, Serializd and JustWatch"
          unoptimized
        />
        <SourceArtefact
          src="/watchlist/benchmark-provider-summaries.png"
          width={2184}
          height={1836}
          alt="Strengths and weaknesses summaries for Trakt, Serializd and JustWatch"
          unoptimized
        />
        <SourceArtefact
          src="/watchlist/benchmark-analysis-collage.png"
          width={4216}
          height={5149}
          alt="Layered annotated benchmark captures from Trakt, Serializd and JustWatch"
          unoptimized
        />
      </div>
    </div>
    <div className="design-portfolio-watchlist-evidence-group">
      <h4>Analysis and opportunity framing</h4>
      <div className="design-portfolio-evidence-board__row is-two-up design-portfolio-watchlist-synthesis-row">
        <SourceArtefact
          src="/watchlist/benchmark-research-outcomes.png"
          width={5664}
          height={1764}
          alt="Research outcomes developed from the comparative benchmark"
          unoptimized
        />
        <SourceArtefact
          src="/watchlist/benchmark-how-might-we.png"
          width={4672}
          height={928}
          alt="How Might We prompts developed from the benchmark analysis"
          unoptimized
        />
      </div>
    </div>
    <VisualCaption label="Carrying comparative research into product definition">
      The work moved from a detailed review of established services through synthesis, requirements
      framing and How Might We prompts. The compressed contact sheet shows the breadth of the
      investigation without turning the portfolio into a presentation of its individual findings.
    </VisualCaption>
  </figure>;
}

function WatchlistStructureVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--watchlist">
    <div className="design-portfolio-watchlist-structure-sequence">
      <SourceArtefact
        label="Structure ideation"
        src="/watchlist/structure-ideation.png"
        width={2012}
        height={2408}
        alt="Structure ideation organising identified requirements and design opportunities"
        unoptimized
      />
      <SourceArtefact
        className="design-portfolio-watchlist-ia-source"
        label="Information architecture"
        src="/watchlist/watchlist-app-ia.png"
        width={1024}
        height={954}
        alt="Information architecture developed from the structure ideation"
      />
    </div>
    <VisualCaption label="Organising requirements into a navigable model">
      A structure-ideation exercise grouped the identified requirements and design opportunities.
      The resulting relationships then informed the information architecture, moving the project
      from a set of needs into a coherent product structure.
    </VisualCaption>
  </figure>;
}

function WatchlistConnectedProductVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--watchlist design-portfolio-visual--watchlist-interactions">
    <div className="design-portfolio-watchlist-evidence-group">
      <h4>Annotated interaction sketches</h4>
      <div className="design-portfolio-evidence-board__row is-three-up">
        <SourceArtefact src="/watchlist/save-progress-series-list-annotations-v2.png" width={1672} height={941} alt="Annotated interaction sketch reviewing a progress-management flow" />
        <SourceArtefact src="/watchlist/calendar-series-release-zoomed-out-annotations-v1.png" width={1600} height={983} alt="Annotated interaction sketch reviewing a longer planning horizon" />
        <SourceArtefact src="/watchlist/calendar-series-release-close-annotations-v1.png" width={1736} height={906} alt="Annotated interaction sketch reviewing a closer planning horizon" />
      </div>
    </div>
    <div className="design-portfolio-watchlist-evidence-group">
      <h4>Selected connected wireframes</h4>
      <div className="design-portfolio-watchlist-wireframe-contact-sheet">
        <SourceArtefact
          src="/watchlist/wireframes-v1.svg"
          width={1600}
          height={1200}
          alt="Responsive wireframes exploring a hybrid planning horizon and its edge states"
        />
        <SourceArtefact
          src="/watchlist/wireframes-v2.svg"
          width={1600}
          height={864}
          alt="Connected desktop and mobile wireframes for changes in a saved watchlist"
        />
      </div>
    </div>
    <div className="design-portfolio-watchlist-evidence-group">
      <h4>Focused working model</h4>
      <div className="design-portfolio-watchlist-working-model">
        <SourceArtefact src="/watchlist/control-panel-studies/01-zoom-only.png" width={1376} height={777} alt="Early release-planner working model" />
      </div>
    </div>
    <VisualCaption label="Exploring, reviewing and connecting interaction decisions">
      Annotated sketches recorded design critique and refinement before the interactions were
      developed across a connected wireframe set. Focused working prototypes were then used where
      particular behaviours required deeper iteration.
    </VisualCaption>
  </figure>;
}

function WatchlistDevelopedApplicationVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--watchlist design-portfolio-visual--watchlist-application">
    <div className="design-portfolio-watchlist-developed-screens">
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=home" printSrc="/watchlist/print-home-desktop.png" title="Watchlist home on desktop" label="Home · desktop" viewport="desktop" />
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=shows" printSrc="/watchlist/print-shows-desktop.png" title="Watchlist My shows on desktop" label="My shows · desktop" viewport="desktop" />
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=calendar" printSrc="/watchlist/print-calendar-mobile.png" title="Watchlist calendar on mobile" label="Calendar · mobile" viewport="mobile" />
      <StaticWatchlistPreview staticOnly src="/watchlist/app?view=account" printSrc="/watchlist/print-account-mobile.png" title="Watchlist preferences on mobile" label="Preferences · mobile" viewport="mobile" />
    </div>
    <VisualCaption label="Taking the product direction into a responsive application">
      The selected direction was developed into a connected working application across discovery,
      personal collections, release planning and preferences. These captures show the same product
      operating across its principal desktop and mobile views; the catalogue is fictional and state
      is stored locally.
    </VisualCaption>
  </figure>;
}

function ProductFinderIntroductionVisual() {
  return <figure className="design-portfolio-visual design-portfolio-visual--finder">
    <div className="design-portfolio-finder-overview-models">
      <SourceArtefact
        label="1. Existing search process"
        src="/product-finder-existing-process.png"
        width={2395}
        height={1669}
        alt="Mapped manual process for locating a physical product"
      />
      <SourceArtefact
        label="2. Initial adaptive-search model"
        src="/product-finder-intermediate-process-flow.png"
        width={2390}
        height={1673}
        alt="Initial Product Finder process model showing interpretation, search strategy, result checks and revision loops"
      />
      <SourceArtefact
        label="3. Refined matching and fallback logic"
        src="/search-engine-logic-flow.png"
        width={4780}
        height={3724}
        alt="Operational logic model for interpreting and widening a product search"
        unoptimized
      />
    </div>
    <VisualCaption label="Modelling and refining decision logic">
      I mapped the existing process, then iterated the model into explicit interpretation, matching,
      fallback and revision rules. This shows how I make complex system behaviour understandable
      and testable.
    </VisualCaption>
  </figure>;
}

function VisualCaption({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figcaption className="design-portfolio-visual__caption">
      <h3>{label}</h3>
      <p>{children}</p>
    </figcaption>
  );
}

function SourceArtefact({
  label,
  className,
  src,
  width,
  height,
  alt,
  status,
  unoptimized = false,
}: {
  label?: string;
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  status?: string;
  unoptimized?: boolean;
}) {
  return (
    <div className={`design-portfolio-source${className ? ` ${className}` : ""}`}>
      {label ? <header className="design-portfolio-source__header"><h4>{label}</h4></header> : null}
      <div className="design-portfolio-source__image">
        <Image
          src={src}
          width={width}
          height={height}
          sizes="(max-width: 800px) 100vw, 58vw"
          alt={alt}
          unoptimized={unoptimized}
        />
      </div>
      {status ? <p className="design-portfolio-source__status">{status}</p> : null}
    </div>
  );
}

function LiveCapturePair({
  label,
  desktop,
  mobile,
}: {
  label: string;
  desktop: string;
  mobile: string;
}) {
  return (
    <div className="spaces-live-pair">
      <h4>{label}</h4>
      <div className="spaces-live-pair__screens">
        <Image
          className="spaces-live-pair__desktop"
          src={desktop}
          width={1440}
          height={900}
          sizes="(max-width: 800px) 68vw, 28vw"
          alt={`${label} on a desktop viewport`}
          unoptimized
        />
        <Image
          className="spaces-live-pair__mobile"
          src={mobile}
          width={390}
          height={844}
          sizes="(max-width: 800px) 24vw, 10vw"
          alt={`${label} on a mobile viewport`}
          unoptimized
        />
      </div>
    </div>
  );
}

function SpacesProblemVisual() {
  return (
    <figure className="design-portfolio-visual design-portfolio-visual--paper">
      <div className="spaces-live-board">
        <LiveCapturePair
          label="Home"
          desktop="/design-portfolio/spaces/home-desktop.png"
          mobile="/design-portfolio/spaces/home-mobile.png"
        />
        <LiveCapturePair
          label="Directory"
          desktop="/design-portfolio/spaces/directory-desktop.png"
          mobile="/design-portfolio/spaces/directory-mobile.png"
        />
      </div>
      <VisualCaption label="Taking a responsive design into implementation">
        The original UX work was developed into a functioning website. Paired desktop and mobile
        captures show how the information architecture, interaction model and visual system were
        carried through to implementation.
      </VisualCaption>
    </figure>
  );
}

function SpacesServiceVisual() {
  return (
    <figure className="design-portfolio-visual">
      <div className="design-portfolio-evidence-board">
        <div className="design-portfolio-evidence-board__row is-three-up">
          <SourceArtefact
            label="Using Garrett’s project stages"
            src="/portfolio-lab/v2/2.png"
            width={6480}
            height={2780}
            alt="The strategy, scope, structure and skeleton stages used for the project"
          />
          <SourceArtefact
            label="Interview setup · illustrative"
            src="/portfolio-lab/v2/3.png"
            width={6480}
            height={3020}
            alt="An illustrative interview guide and note-taking setup"
          />
          <SourceArtefact
            label="Synthesis setup · illustrative"
            src="/portfolio-lab/v2/4.png"
            width={6480}
            height={3608}
            alt="An illustrative research synthesis board"
          />
        </div>
        <div className="design-portfolio-evidence-board__row is-two-up">
          <SourceArtefact
            label="Space-user journey"
            src="/portfolio-lab/v2/5.png"
            width={6496}
            height={2856}
            alt="Journey map following a space user from discovery through using and leaving a café"
          />
          <SourceArtefact
            label="Space-owner journey"
            src="/portfolio-lab/v2/6.png"
            width={6496}
            height={2852}
            alt="Journey map following a café owner from attracting customers through operating and reviewing the space"
          />
        </div>
      </div>
      <VisualCaption label="Planning the investigation and mapping both sides">
        The work included a staged project model, illustrative preparation for interviews and
        synthesis, and separate journey maps for people using and operating the spaces. The research
        preparation is shown as process evidence, not as completed fieldwork.
      </VisualCaption>
    </figure>
  );
}

function SpacesScopeVisual() {
  return (
    <figure className="design-portfolio-visual">
      <div className="design-portfolio-evidence-board design-portfolio-evidence-board--scope">
        <SourceArtefact
          label="Available information and user stories"
          src="/portfolio-lab/v2/7.png"
          width={6480}
          height={2516}
          alt="Available observations organised into user stories"
          status="Illustrative framing"
        />
        <SourceArtefact
          label="How Might We qualification"
          src="/portfolio-lab/qualifying-hmw.png"
          width={6480}
          height={4320}
          alt="How Might We questions organised and qualified against the project problem"
        />
        <SourceArtefact
          label="Information and functional requirements"
          src="/portfolio-lab/v2/11.png"
          width={6480}
          height={4136}
          alt="Information and functional requirements for space users and space owners"
        />
        <SourceArtefact
          label="Primary and signup flows"
          src="/portfolio-lab/v2/12.png"
          width={6480}
          height={2532}
          alt="Primary user and signup process flows with challenges, implications and opportunities"
        />
      </div>
      <VisualCaption label="Moving from assumptions into a workable scope">
        This compressed view shows the breadth of the scope work rather than asking the reader to
        inspect every note: user stories, opportunity qualification, requirements and process flows.
      </VisualCaption>
    </figure>
  );
}

function SpacesExperienceVisual() {
  return (
    <figure className="design-portfolio-visual design-portfolio-visual--experience">
      <div className="design-portfolio-evidence-board design-portfolio-evidence-board--experience">
        <div className="design-portfolio-evidence-board__row is-two-up">
          <SourceArtefact
            label="User-view information architecture"
            src="/portfolio-lab/v2/13.png"
            width={6480}
            height={4324}
            alt="Information architecture for the user-facing Spaces experience"
          />
          <SourceArtefact
            label="Owner-view information architecture"
            src="/portfolio-lab/v2/14.png"
            width={6480}
            height={4320}
            alt="Information architecture for the owner-facing Spaces experience"
          />
        </div>
        <div className="design-portfolio-evidence-board__row is-four-up">
          <SourceArtefact
            label="Map discovery"
            src="/portfolio-lab/v2/15.png"
            width={6480}
            height={4320}
            alt="Spaces map-view wireframe"
          />
          <SourceArtefact
            label="List comparison"
            src="/portfolio-lab/v2/16.png"
            width={6480}
            height={4320}
            alt="Spaces list-view wireframe"
          />
          <SourceArtefact
            label="Detailed evaluation"
            src="/portfolio-lab/v2/17.png"
            width={6480}
            height={4320}
            alt="Spaces detail-page wireframe"
          />
          <SourceArtefact
            label="Owner overview"
            src="/portfolio-lab/v2/18.png"
            width={6480}
            height={4320}
            alt="Spaces owner-overview wireframe"
          />
        </div>
      </div>

      <VisualCaption label="Designing two connected parts of the service">
        Separate information architectures led to wireframes for map and list discovery, detailed
        evaluation and an owner overview. The contact-sheet treatment shows the extent of the
        interaction work without turning each wireframe into a presentation slide.
      </VisualCaption>
    </figure>
  );
}

function SpacesLiveProductVisual() {
  return (
    <figure className="design-portfolio-visual design-portfolio-visual--experience">
      <div className="design-portfolio-spaces-product-details">
        <SourceArtefact
          src="/design-portfolio/spaces/live-directory-desktop.png"
          width={1920}
          height={990}
          alt="The completed Spaces directory and routes into focused place-finding needs"
          unoptimized
        />
        <SourceArtefact
          src="/design-portfolio/spaces/live-location-summary-mobile.jpeg"
          width={658}
          height={1102}
          alt="A concise place summary and practical profile information on mobile"
          unoptimized
        />
        <SourceArtefact
          src="/design-portfolio/spaces/live-opening-hours-mobile.jpeg"
          width={1179}
          height={1430}
          alt="Published opening hours visualised in the completed mobile location profile"
          unoptimized
        />
        <SourceArtefact
          src="/design-portfolio/spaces/live-save-note-mobile.jpeg"
          width={1179}
          height={2045}
          alt="The completed mobile interaction for saving a personal note against a place"
          unoptimized
        />
      </div>

      <VisualCaption label="Carrying the design system into a live product">
        I translated the product model into a responsive implementation, combining content
        structure, interaction logic and visual patterns across directory, location detail and
        feedback flows.
      </VisualCaption>
    </figure>
  );
}

function PreviousWorkVisual() {
  return (
    <figure className="design-portfolio-visual design-portfolio-visual--professional">
      <div className="design-portfolio-professional-foundations">
        <SourceArtefact
          label="Information architecture"
          src="/carmignac-site-map.png"
          width={1800}
          height={2182}
          alt="Information architecture for a professional investment website"
          unoptimized
        />
        <SourceArtefact
          label="Product benchmarking and definition"
          src="/carmignac-simulator-benchmark-composite.png"
          width={3840}
          height={1640}
          alt="Benchmark and definition work for an investment simulator"
          unoptimized
        />
      </div>

      <div className="design-portfolio-evidence-board__row is-four-up">
        <SourceArtefact
          label="Simulator input"
          src="/carmignac-simulator-input.png"
          width={2560}
          height={1352}
          alt="Investment simulator input interface"
        />
        <SourceArtefact
          label="Simulator results"
          src="/carmignac-simulator-results.png"
          width={2560}
          height={1351}
          alt="Investment simulator results interface"
        />
        <SourceArtefact
          label="Fund discovery"
          src="/carmignac-fund-list.png"
          width={2560}
          height={1352}
          alt="Searchable and filterable fund listing interface"
        />
        <SourceArtefact
          label="Fund evaluation"
          src="/carmignac-fund-detail.png"
          width={2560}
          height={1351}
          alt="Fund detail interface for evaluating an investment product"
        />
      </div>

      <SourceArtefact
        label="Accessibility and colour-system testing"
        src="/carmignac-accessibility-testing.png"
        width={26622}
        height={9483}
        alt="Accessibility testing across a professional brand colour system"
        unoptimized
      />

      <VisualCaption label="Working across structure, product behaviour and delivery constraints">
        Selected professional work spans information architecture, comparative product definition,
        connected input-and-result journeys, fund discovery and systematic accessibility review.
        The compressed view shows the range of responsibilities without turning each engagement
        into a separate case study.
      </VisualCaption>
    </figure>
  );
}

function SynthesisIcon() {
  return (
    <svg
      className="design-portfolio-practice-principle-icon"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 4.5h5M2.5 8h3.5M2.5 16h5M2.5 19.5h3.5" />
      <path d="M9 6c2.5 0 2.5 6 5 6M9 18c2.5 0 2.5-6 5-6" />
      <path d="M14 12h7" />
    </svg>
  );
}

function EvidenceToVisualIcon() {
  return (
    <svg
      className="design-portfolio-practice-principle-icon"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="3.5" width="7" height="17" rx="1" />
      <path d="M4.5 7h3M4.5 10h3M4.5 13h2.5" />
      <path d="M10.5 12h3m-1.5-1.5 1.5 1.5-1.5 1.5" />
      <circle cx="17" cy="6" r="1.5" />
      <circle cx="20.5" cy="12" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
      <path d="m18 7.2 1.6 3.1m0 3.4L18 16.8" />
    </svg>
  );
}

function DesignPracticeVisual() {
  return (
    <figure className="design-portfolio-visual design-portfolio-visual--practice">
      <section className="design-portfolio-practice-section" id="design-practice-ai">
        <div className="design-portfolio-practice-section__header">
          <h3>Appropriate use of AI in design thinking</h3>
          <p>
            I use AI to synthesise supplied information, check work, create visual assets from
            evidence and build testable prototypes more quickly. Reusable skill instructions keep
            the tools aligned with a design process I have chosen. AI does not fabricate evidence,
            replace research with real users or make design decisions on my behalf.
          </p>
        </div>

        <div className="design-portfolio-practice-ai-content">
          <div className="design-portfolio-practice-principles">
            <article>
              <SynthesisIcon />
              <h4>Synthesise supplied information</h4>
              <p>AI can organise and condense project material, but the underlying information must come from traceable sources.</p>
            </article>
            <article>
              <SpellCheck2 className="design-portfolio-practice-principle-icon" size={26} strokeWidth={1.5} aria-hidden="true" />
              <h4>Check and improve work</h4>
              <p>AI helps identify spelling, grammar and consistency problems; I review and approve the corrections.</p>
            </article>
            <article>
              <EvidenceToVisualIcon />
              <h4>Create from evidence</h4>
              <p>AI can turn approved information into maps, flows and visual assets. It must not invent the evidence those artefacts present.</p>
            </article>
            <article>
              <PanelsTopLeft className="design-portfolio-practice-principle-icon" size={26} strokeWidth={1.5} aria-hidden="true" />
              <h4>Prototype more quickly</h4>
              <p>AI shortens the path from a design decision to a testable prototype, making ideas easier to evaluate and refine.</p>
            </article>
            <article>
              <UsersRound className="design-portfolio-practice-principle-icon" size={26} strokeWidth={1.5} aria-hidden="true" />
              <h4>Keep real users in research</h4>
              <p>AI can support research planning and synthesis, but it cannot stand in for participants or create user findings.</p>
            </article>
            <article>
              <Braces className="design-portfolio-practice-principle-icon" size={26} strokeWidth={1.5} aria-hidden="true" />
              <h4>Encode the process in skills</h4>
              <p>Reusable skill instructions define the methods, boundaries and checks I want the tool to follow.</p>
            </article>
          </div>
        </div>
      </section>

    </figure>
  );
}
