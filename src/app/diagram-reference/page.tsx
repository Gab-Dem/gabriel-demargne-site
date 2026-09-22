import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagram Reference",
  description: "A proposed structural information architecture system.",
  robots: { index: false, follow: false },
};

type NodeProps = { x: number; y: number; label: string; subtle?: boolean };

function Node({ x, y, label, subtle = false }: NodeProps) {
  return (
    <g className={subtle ? "diagram-reference__ia-node diagram-reference__ia-node--subtle" : "diagram-reference__ia-node"}>
      <rect x={x} y={y} width="150" height="36" />
      <text x={x + 75} y={y + 22} textAnchor="middle">{label}</text>
    </g>
  );
}

function WatchlistIA() {
  return (
    <svg viewBox="0 0 1260 440" role="img" aria-label="Watchlist information architecture">
      {/* Connectors render first, so each line ends cleanly at a node edge. */}
      <g className="diagram-reference__ia-connector">
        {/* Landing page drops into one horizontal first-level rail. */}
        <path d="M135 76V120M135 120H1095" />
        <path d="M135 120V158M375 120V158M855 120V158M1095 120V158" />
        {/* Browse owns a rightward vertical branch before the next top-level node begins. */}
        <path d="M450 176H500V238H540M500 238V282H540" />
      </g>

      <Node x={60} y={40} label="LANDING PAGE" />
      <Node x={60} y={158} label="HOME" subtle />
      <Node x={300} y={158} label="BROWSE" />
      <Node x={780} y={158} label="MY SHOWS" />
      <Node x={1020} y={158} label="ACCOUNT" subtle />

      <Node x={540} y={220} label="SHOW PAGE" />
      <Node x={540} y={264} label="DETAILS" subtle />
    </svg>
  );
}

export default function DiagramReferencePage() {
  return (
    <main className="diagram-reference-page">
      <header className="diagram-reference-page__header">
        <p className="diagram-reference-page__eyebrow">Reference / diagram system</p>
        <h1>Structural IA</h1>
        <p>A fixed-module hierarchy for product maps, navigation maps, and process trees.</p>
      </header>
      <section className="diagram-reference-card diagram-reference-card--ia">
        <header><span>01</span><h2>Fixed module tree</h2></header>
        <div className="diagram-reference-card__visual"><WatchlistIA /></div>
        <div className="diagram-reference-card__rules">
          <p><strong>Nodes:</strong> one 150 × 36 module at every level.</p>
          <p><strong>Direction:</strong> landing page drops into a left-to-right first level; deeper branches grow right from their parent.</p>
          <p><strong>Reservation:</strong> a top-level item reserves its full rightward branch width plus one standard gap before the next item begins.</p>
        </div>
      </section>
    </main>
  );
}
