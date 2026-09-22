"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Show = {
  id: string;
  title: string;
  description: string;
  service: string;
  serviceClass: string;
  state: "Watching" | "Up next" | "Finished";
  release: string;
  start: number;
  end: number;
  episodes: number;
  colour: string;
  initials: string;
};

const shows: Show[] = [
  { id: "severance", title: "Severance", description: "The work-life balance is still out of balance.", service: "Apple TV+", serviceClass: "apple", state: "Watching", release: "Thursdays · 21:00", start: 1, end: 3, episodes: 10, colour: "#cbd8c2", initials: "S" },
  { id: "andor", title: "Andor", description: "A rebellion begins in the shadows.", service: "Disney+", serviceClass: "disney", state: "Up next", release: "Wednesdays · 08:00", start: 3, end: 5, episodes: 12, colour: "#d8c4b1", initials: "A" },
  { id: "the-bear", title: "The Bear", description: "Every second counts in the kitchen.", service: "Disney+", serviceClass: "disney", state: "Watching", release: "Fridays · 08:00", start: 6, end: 7, episodes: 10, colour: "#e4bc9f", initials: "B" },
  { id: "slow-horses", title: "Slow Horses", description: "Spies, lies, and a very slow department.", service: "Apple TV+", serviceClass: "apple", state: "Finished", release: "Now available", start: 8, end: 9, episodes: 6, colour: "#b7c4d7", initials: "SH" },
  { id: "the-last-of-us", title: "The Last of Us", description: "Survival has a new meaning.", service: "Max", serviceClass: "max", state: "Up next", release: "Sundays · 02:00", start: 10, end: 11, episodes: 7, colour: "#c9bfa8", initials: "LU" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const stages = ["The problem", "A time-based view", "The watchlist", "Where to watch", "Reflection"];

export function WatchlistProject() {
  const [stage, setStage] = useState(1);
  const [filter, setFilter] = useState<"All" | Show["state"]>("All");
  const [selectedId, setSelectedId] = useState("severance");
  const [showAdd, setShowAdd] = useState(false);
  const visibleShows = useMemo(() => filter === "All" ? shows : shows.filter((show) => show.state === filter), [filter]);
  const selectedShow = shows.find((show) => show.id === selectedId) ?? shows[0];

  return (
    <main className="watchlist-project">
      <header className="watchlist-project__header">
        <Link href="/portfolio" className="watchlist-project__back"><span aria-hidden="true">←</span> Portfolio</Link>
        <h1>Watchlist</h1>
        <span className="watchlist-project__header-meta">A UX exploration · 2026</span>
      </header>
      <div className="watchlist-project__body">
        <aside className="watchlist-project__index">
          <p className="watchlist-project__label">Index</p>
          <nav aria-label="Project sections">
            {stages.map((item, index) => <button key={item} className={stage === index ? "is-active" : ""} onClick={() => setStage(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}
          </nav>
          <div className="watchlist-project__index-foot">
            <span>Personal project</span>
            <span>Product · UX/UI</span>
          </div>
        </aside>

        <section className="watchlist-project__main">
          <div className="watchlist-project__main-top">
            <span>Case study / {String(stage + 1).padStart(2, "0")}</span>
            <span>{stage === 1 ? "Prototype" : "Process notes"}</span>
          </div>
          {stage === 1 ? <Planner visibleShows={visibleShows} filter={filter} setFilter={setFilter} selectedId={selectedId} setSelectedId={setSelectedId} selectedShow={selectedShow} showAdd={showAdd} setShowAdd={setShowAdd} /> : <Story stage={stage} />}
        </section>

        <aside className="watchlist-project__notes">
          <p className="watchlist-project__label">Notes</p>
          {stage === 1 ? <>
            <p>Release dates are rarely the problem on their own. The friction comes from holding a dozen dates, services, and “maybe later” decisions in your head at once.</p>
            <p className="watchlist-project__note-accent">The year view makes time the organising principle.</p>
            <div className="watchlist-project__legend"><span><i className="is-live" /> Currently watching</span><span><i className="is-next" /> Coming soon</span><span><i className="is-done" /> Finished</span></div>
          </> : <p>{stage === 0 ? "This started with a familiar personal behaviour: saving shows in different places, then forgetting when they return." : "The artefact is deliberately small. It is a planning surface, not another catalogue trying to recommend everything."}</p>}
        </aside>
      </div>
    </main>
  );
}

function Planner({ visibleShows, filter, setFilter, selectedId, setSelectedId, selectedShow, showAdd, setShowAdd }: { visibleShows: Show[]; filter: "All" | Show["state"]; setFilter: (value: "All" | Show["state"]) => void; selectedId: string; setSelectedId: (value: string) => void; selectedShow: Show; showAdd: boolean; setShowAdd: (value: boolean) => void }) {
  return <div className="watchlist-planner">
    <div className="watchlist-planner__intro"><div><p className="watchlist-project__eyebrow">Your year in television</p><h2>What are you watching next?</h2></div><button className="watchlist-planner__add" onClick={() => setShowAdd(!showAdd)}>+ Add a show</button></div>
    <div className="watchlist-planner__controls"><div className="watchlist-planner__filters" role="group" aria-label="Filter shows">{(["All", "Watching", "Up next", "Finished"] as const).map((item) => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><span>2026 · {visibleShows.length} shows</span></div>
    {showAdd && <div className="watchlist-planner__add-form"><strong>Add a show to your year</strong><span>Search is represented here as a focused next step — the prototype keeps the planning surface in view.</span><button onClick={() => setShowAdd(false)}>Done</button></div>}
    <div className="watchlist-chart" aria-label="A gantt-like view of show release windows across 2026"><div className="watchlist-chart__months"><span />{months.map((month) => <span key={month}>{month}</span>)}</div>{visibleShows.map((show) => <button className={`watchlist-chart__row ${selectedId === show.id ? "is-selected" : ""}`} key={show.id} onClick={() => setSelectedId(show.id)}><span className="watchlist-chart__name"><b style={{ background: show.colour }}>{show.initials}</b><span>{show.title}<small>{show.service}</small></span></span><span className={`watchlist-chart__bar watchlist-chart__bar--${show.state.toLowerCase().replace(" ", "-")}`} style={{ "--start": show.start, "--span": show.end - show.start + 1 } as CSSProperties}><em>{show.state}</em></span></button>)}</div>
    <div className="watchlist-detail"><div className="watchlist-detail__poster" style={{ background: `linear-gradient(145deg, ${selectedShow.colour}, #f8f5ef)` }}><span>{selectedShow.initials}</span></div><div className="watchlist-detail__copy"><div className="watchlist-detail__heading"><div><p className="watchlist-project__eyebrow">Selected show</p><h3>{selectedShow.title}</h3></div><span className={`watchlist-status watchlist-status--${selectedShow.state.toLowerCase().replace(" ", "-")}`}>{selectedShow.state}</span></div><p>{selectedShow.description}</p><div className="watchlist-detail__facts"><span><b>Release</b>{selectedShow.release}</span><span><b>Episodes</b>{selectedShow.episodes} episodes</span><span><b>Watch on</b><strong className={`watchlist-service watchlist-service--${selectedShow.serviceClass}`}>{selectedShow.service}</strong></span></div></div></div>
  </div>;
}

function Story({ stage }: { stage: number }) {
  const content = [
    ["The problem", "Streaming made access easier, but it scattered the experience. A show can be saved in a note, remembered from a trailer, or half-watched inside an app. None of those places answer the simple question: what should I watch, and when?", "I framed the opportunity around orientation rather than discovery: help someone see the shape of their own viewing year."],
    ["A time-based view", "A conventional list is good at storing titles, but weak at showing overlap. The release calendar became the primary interaction because it exposes busy periods, gaps, and the difference between a show that is available now and one that is still approaching.", "Time is the organising principle; the list is the supporting detail."],
    ["The watchlist", "The watchlist is intentionally lightweight. Status is not a rating or a recommendation — it is a small piece of context that helps someone decide what deserves attention next.", "A useful personal tool should reduce the number of decisions you have to re-make."],
    ["Where to watch", "Availability belongs alongside the date, not hidden behind another lookup. Platform is treated as a practical fact, with the release rhythm and episode count close enough to support a real plan.", "The product connects editorial information to an immediate action: choose the right service and press play."],
    ["Reflection", "The prototype suggests a product that is more about making an existing collection legible than adding another layer of content. The next test would be to give people their real watchlists and observe whether the year view changes what they choose to watch.", "The open question is whether people plan viewing across a year — or only need help with the next seven days."],
  ][stage];
  return <article className="watchlist-story"><p className="watchlist-project__eyebrow">Case study / thinking</p><h2>{content[0]}</h2><p className="watchlist-story__lead">{content[1]}</p><div className="watchlist-story__pullquote">{content[2]}</div><div className="watchlist-story__rule" /><p className="watchlist-story__small">The work shown here is a product exploration and interactive prototype, created to make the design reasoning tangible.</p></article>;
}
