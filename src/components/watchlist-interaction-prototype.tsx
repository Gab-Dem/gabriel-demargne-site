"use client";

import { useState } from "react";

type View = "browse" | "my-shows" | "calendar" | "account" | "show";
type Filter = "All" | "Plan to watch" | "Watching" | "Caught up";
type CalendarMode = "Upcoming" | "Week";
type ShowTab = "Overview" | "Episodes" | "Availability";
type DiscoveryScope = "Browse all" | "New releases" | "Genres & collections";
type SavedList = "All saved" | "Personal list A" | "Personal list B";
type PersonalList = Exclude<SavedList, "All saved">;
type AccountSection = "Profile & region" | "Streaming services" | "Notifications" | "Help & feedback";
type ReleaseState = "Confirmed" | "Expected" | "Date unknown";

type Show = {
  id: string;
  title: string;
  initials: string;
  genre: string;
  status: Exclude<Filter, "All">;
  progress: string;
  provider: string | null;
  release: string | null;
  releaseState: ReleaseState | null;
};

const genres = ["Drama", "Comedy", "Documentary", "Science fiction"] as const;
const statuses: Show["status"][] = ["Watching", "Plan to watch", "Caught up"];
const catalogue: Show[] = Array.from({ length: 26 }, (_, index) => {
  const letter = String.fromCharCode(65 + index);
  const releasePattern = index % 6;
  return {
    id: `show-${letter.toLowerCase()}`,
    title: `Show ${letter}`,
    initials: letter,
    genre: genres[index % genres.length],
    status: statuses[index % statuses.length],
    progress: index % 3 === 0 ? "S2 · 4 of 8 watched" : index % 3 === 1 ? "Not started" : "Up to date",
    provider: index % 7 === 0 ? null : index % 2 === 0 ? "Stream A" : "Stream B",
    release: releasePattern === 0
      ? "S3 E1 · Fri 21 Jun"
      : releasePattern === 1
        ? "Season 2 · Sun 30 Jun"
        : releasePattern === 2
          ? "New season · expected next year"
          : releasePattern === 3
            ? "Next episode · date unknown"
            : null,
    releaseState: releasePattern === 0 || releasePattern === 1
      ? "Confirmed"
      : releasePattern === 2
        ? "Expected"
        : releasePattern === 3
          ? "Date unknown"
          : null,
  };
});

const initiallySavedIds = catalogue.slice(0, 12).map((show) => show.id);
const initialLists: Record<PersonalList, string[]> = {
  "Personal list A": ["show-a", "show-c", "show-e", "show-g", "show-i"],
  "Personal list B": ["show-b", "show-d", "show-f", "show-h", "show-j"],
};
const seasons = [1, 2, 3, 4, 5];
const episodeTitles = ["The signal", "The relay", "The crossing", "The return", "The field", "The quiet", "The pass", "Final call"];

const weekSets = {
  previous: [
    { label: "Earlier week", dates: "27 May – 2 Jun", releases: [["Show D", "S1 E1 · Stream B"]] },
    { label: "Following week", dates: "3–9 Jun", releases: [["Show A", "S3 E1 · Stream A"], ["Show B", "S4 E1 · Stream B"]] },
    { label: "Following week", dates: "10–16 Jun", releases: [["Show C", "S2 E3 · Stream A"]] },
  ],
  current: [
    { label: "This week", dates: "17–23 Jun", releases: [["Show B", "S4 E1 · Stream B"], ["Show A", "S3 E1 · Stream A"], ["Show C", "S2 E3 · Stream A"]] },
    { label: "Next week", dates: "24–30 Jun", releases: [["Show B", "Season 2 · Stream B"], ["Show D", "S1 E1 · Stream B"]] },
    { label: "Following week", dates: "1–7 Jul", releases: [["Show C", "S3 E2 · Stream A"]] },
  ],
  next: [
    { label: "This week", dates: "8–14 Jul", releases: [["Show A", "S3 E2 · Stream A"], ["Show C", "S3 E3 · Stream A"]] },
    { label: "Next week", dates: "15–21 Jul", releases: [["Show B", "S4 E2 · Stream B"]] },
    { label: "Following week", dates: "22–28 Jul", releases: [["Show D", "Season 2 · Stream B"]] },
  ],
} as const;

export function WatchlistInteractionPrototype() {
  const [view, setView] = useState<View>("browse");
  const [sourceView, setSourceView] = useState<Exclude<View, "show">>("browse");
  const [filter, setFilter] = useState<Filter>("All");
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("Upcoming");
  const [showTab, setShowTab] = useState<ShowTab>("Overview");
  const [discoveryScope, setDiscoveryScope] = useState<DiscoveryScope>("Browse all");
  const [savedList, setSavedList] = useState<SavedList>("All saved");
  const [selectedGenre, setSelectedGenre] = useState<(typeof genres)[number]>(genres[0]);
  const [accountSection, setAccountSection] = useState<AccountSection>("Profile & region");
  const [weekOffset, setWeekOffset] = useState<-1 | 0 | 1>(0);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("show-a");
  const [savedShowIds, setSavedShowIds] = useState<Set<string>>(() => new Set(initiallySavedIds));
  const [personalLists, setPersonalLists] = useState<Record<PersonalList, Set<string>>>(() => ({
    "Personal list A": new Set(initialLists["Personal list A"]),
    "Personal list B": new Set(initialLists["Personal list B"]),
  }));
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);
  const [watchedSeasons, setWatchedSeasons] = useState<Set<number>>(() => new Set());
  const [watchedEpisodes, setWatchedEpisodes] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const [episodeSeason, setEpisodeSeason] = useState(1);
  const [helpSent, setHelpSent] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);

  const selectedShow = catalogue.find((show) => show.id === selectedId) ?? catalogue[0];
  const isSaved = savedShowIds.has(selectedId);
  const savedShows = catalogue.filter((show) => savedShowIds.has(show.id));
  const visibleSavedShows = savedShows.filter((show) => {
    const matchesStatus = filter === "All" || show.status === filter;
    const matchesList = savedList === "All saved" || personalLists[savedList].has(show.id);
    return matchesStatus && matchesList;
  });
  const queryMatches = catalogue.filter((show) => show.title.toLowerCase().includes(query.trim().toLowerCase()));
  const visibleDiscoveryShows = discoveryScope === "Genres & collections"
    ? queryMatches.filter((show) => show.genre === selectedGenre)
    : queryMatches;
  const releaseGroups = (["Confirmed", "Expected", "Date unknown"] as const).map((state) => ({ state, shows: visibleDiscoveryShows.filter((show) => show.releaseState === state).slice(0, 6) }));
  const upcomingSaved = savedShows.filter((show) => show.release && show.releaseState);
  const allWatched = watchedSeasons.size === seasons.length;
  const visibleWeeks = weekOffset < 0 ? weekSets.previous : weekOffset > 0 ? weekSets.next : weekSets.current;
  const rangeLabel = weekOffset < 0 ? "27 May – 16 June" : weekOffset > 0 ? "8–28 July" : "17 June – 7 July";

  function navigate(nextView: Exclude<View, "show">) {
    setView(nextView);
    setIsSaveConfirmationOpen(false);
    setIsListOpen(false);
    setIsProgressOpen(false);
  }

  function openShow(id: string) {
    setSourceView(view === "show" ? "browse" : view);
    setSelectedId(id);
    setView("show");
    setShowTab("Overview");
    setIsSaveConfirmationOpen(false);
    setIsListOpen(false);
    setIsProgressOpen(false);
  }

  function save() {
    setSavedShowIds((current) => new Set(current).add(selectedId));
    setIsSaveConfirmationOpen(true);
  }

  function toggleList(list: PersonalList) {
    setPersonalLists((current) => {
      const nextList = new Set(current[list]);
      if (nextList.has(selectedId)) nextList.delete(selectedId);
      else nextList.add(selectedId);
      return { ...current, [list]: nextList };
    });
  }

  function toggleSeason(season: number) {
    setWatchedSeasons((current) => {
      const next = new Set(current);
      if (next.has(season)) next.delete(season);
      else next.add(season);
      return next;
    });
  }

  function toggleEpisode(season: number, index: number) {
    if (episodeSeason !== season) {
      setEpisodeSeason(season);
      setWatchedEpisodes(new Set([index]));
      return;
    }
    setWatchedEpisodes((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function markAll() {
    setWatchedSeasons(new Set(seasons));
    setWatchedEpisodes(new Set(episodeTitles.map((_, index) => index)));
  }

  return <main className="watchlist-prototype-app">
    <header className="watchlist-prototype-app__header">
      <button type="button" className="watchlist-prototype-app__wordmark" onClick={() => navigate("browse")}>Watchlist</button>
      <nav aria-label="Wireframe navigation">
        <button type="button" className={view === "my-shows" || view === "calendar" ? "is-active" : ""} onClick={() => navigate("my-shows")}>My shows</button>
        <button type="button" className={view === "browse" ? "is-active" : ""} onClick={() => navigate("browse")}>Discover</button>
        <button type="button" className={view === "account" ? "is-active" : ""} onClick={() => navigate("account")}>Account</button>
      </nav>
    </header>

    {view === "browse" ? <DiscoveryPage scope={discoveryScope} setScope={setDiscoveryScope} query={query} setQuery={setQuery} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} shows={visibleDiscoveryShows} releaseGroups={releaseGroups} openShow={openShow} /> : null}

    {view === "my-shows" ? <section className="watchlist-prototype-app__page" aria-labelledby="my-shows-title">
      <header className="watchlist-prototype-app__page-header"><div><p>My shows</p><h1 id="my-shows-title">Your saved shows</h1><span>{savedShows.length} saved shows</span></div><button type="button" className="watchlist-prototype-app__releases-entry" onClick={() => navigate("calendar")}>Open calendar →</button></header>
      <div className="watchlist-prototype-app__filter-groups">
        <div><span>Viewing state</span><div className="watchlist-prototype-app__filters">{(["All", "Plan to watch", "Watching", "Caught up"] as const).map((item) => <button type="button" key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div><span>Collection</span><div className="watchlist-prototype-app__lists" aria-label="Saved show collection filters">{(["All saved", "Personal list A", "Personal list B"] as const).map((item) => <button type="button" key={item} className={savedList === item ? "is-active" : ""} onClick={() => setSavedList(item)}>{item}</button>)}</div></div>
      </div>
      <ShowGrid shows={visibleSavedShows} openShow={openShow} saved />
      {visibleSavedShows.length === 0 ? <EmptyState title="No shows in this view" copy="Choose another viewing state or personal list." action="Show all saved" onAction={() => { setFilter("All"); setSavedList("All saved"); }} /> : null}
    </section> : null}

    {view === "calendar" ? <CalendarPage mode={calendarMode} setMode={setCalendarMode} upcoming={upcomingSaved} weekOffset={weekOffset} setWeekOffset={setWeekOffset} visibleWeeks={visibleWeeks} rangeLabel={rangeLabel} openShow={openShow} /> : null}

    {view === "account" ? <AccountPage section={accountSection} setSection={setAccountSection} helpSent={helpSent} setHelpSent={setHelpSent} accountSaved={accountSaved} setAccountSaved={setAccountSaved} /> : null}

    {view === "show" ? <section className="watchlist-prototype-app__page watchlist-prototype-app__show" aria-labelledby="show-title">
      <button type="button" className="watchlist-prototype-app__back" onClick={() => navigate(sourceView)}>← {sourceView === "browse" ? "Discover" : sourceView === "calendar" ? "Calendar" : "My shows"}</button>
      <div className="watchlist-prototype-app__show-hero"><i>{selectedShow.initials}</i><div><p>{selectedShow.genre} · 2026 · Series</p><h1 id="show-title">{selectedShow.title}</h1><div className="watchlist-prototype-app__show-actions">{isSaved ? <button type="button" className="watchlist-prototype-app__saved" onClick={() => setIsListOpen((open) => !open)}>✓ Saved <b>⌄</b></button> : <button type="button" className="watchlist-prototype-app__save" onClick={save}>＋ Save</button>}<button type="button" onClick={() => setIsProgressOpen(true)}>Update progress</button></div><span>A fictional show record used to test hierarchy, state changes, availability and release certainty.</span></div></div>
      <nav className="watchlist-prototype-app__show-tabs" aria-label="Show detail sections">{(["Overview", "Episodes", "Availability"] as const).map((tab) => <button key={tab} type="button" className={showTab === tab ? "is-active" : ""} onClick={() => { setShowTab(tab); setIsProgressOpen(false); }}>{tab}</button>)}</nav>
      {isSaveConfirmationOpen ? <section className="watchlist-prototype-app__save-confirmation" role="status"><header><strong>Saved to My shows <b>✓</b></strong><button type="button" aria-label="Close saved confirmation" onClick={() => setIsSaveConfirmationOpen(false)}>×</button></header><p>You can leave it here or organise it now.</p><div><button type="button" onClick={() => { setIsSaveConfirmationOpen(false); setIsListOpen(true); }}>Add to a list</button><button type="button" onClick={() => setIsSaveConfirmationOpen(false)}>Done</button></div></section> : null}
      {isListOpen ? <section className="watchlist-prototype-app__list-menu"><header><strong>Personal lists</strong><button type="button" aria-label="Close list options" onClick={() => setIsListOpen(false)}>×</button></header>{(["Personal list A", "Personal list B"] as const).map((list) => <button type="button" key={list} className={personalLists[list].has(selectedId) ? "is-selected" : ""} onClick={() => toggleList(list)}>{personalLists[list].has(selectedId) ? `✓ ${list}` : `Add to ${list}`}</button>)}<button type="button" onClick={() => setIsListOpen(false)}>Done</button></section> : null}
      {isProgressOpen ? <ProgressEditor watchedSeasons={watchedSeasons} watchedEpisodes={watchedEpisodes} episodeSeason={episodeSeason} expandedSeason={expandedSeason} setExpandedSeason={setExpandedSeason} toggleSeason={toggleSeason} toggleEpisode={toggleEpisode} markAll={markAll} allWatched={allWatched} close={() => setIsProgressOpen(false)} /> : showTab === "Episodes" ? <EpisodesPanel watchedEpisodes={watchedEpisodes} toggleEpisode={toggleEpisode} /> : showTab === "Availability" ? <AvailabilityPanel show={selectedShow} /> : <OverviewPanel show={selectedShow} />}
    </section> : null}
  </main>;
}

function DiscoveryPage({ scope, setScope, query, setQuery, selectedGenre, setSelectedGenre, shows, releaseGroups, openShow }: { scope: DiscoveryScope; setScope: (scope: DiscoveryScope) => void; query: string; setQuery: (query: string) => void; selectedGenre: (typeof genres)[number]; setSelectedGenre: (genre: (typeof genres)[number]) => void; shows: Show[]; releaseGroups: { state: ReleaseState; shows: Show[] }[]; openShow: (id: string) => void }) {
  const title = scope === "Browse all" ? "Browse shows" : scope;
  return <section className="watchlist-prototype-app__page" aria-labelledby="discover-title">
    <header className="watchlist-prototype-app__page-header"><div><p>Discover</p><h1 id="discover-title">{title}</h1><span>{scope === "Browse all" ? "Explore the catalogue" : scope === "New releases" ? "Release information across the catalogue" : "Browse by collection"}</span></div></header>
    <label className="watchlist-prototype-app__search"><span>Search shows</span><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search shows" placeholder="Try “Show M”" /></label>
    <div className="watchlist-prototype-app__discover-links" aria-label="Discovery views">{(["Browse all", "New releases", "Genres & collections"] as const).map((item) => <button type="button" key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</div>
    {scope === "Browse all" ? <><div className="watchlist-prototype-app__results-meta"><span>{shows.length} shows</span><span>Sorted A–Z</span></div><ShowGrid shows={shows} openShow={openShow} /></> : null}
    {scope === "New releases" ? <div className="watchlist-prototype-app__release-board">{releaseGroups.map((group) => <section key={group.state}><header><div><h2>{group.state}</h2><span>{group.state === "Confirmed" ? "Exact date available" : group.state === "Expected" ? "Approximate timing only" : "No date has been announced"}</span></div><b>{group.shows.length}</b></header>{group.shows.length ? group.shows.map((show) => <button type="button" key={show.id} onClick={() => openShow(show.id)}><i>{show.initials}</i><strong>{show.title}</strong><span>{show.release}</span><em>View show →</em></button>) : <p>No matching releases in this group.</p>}</section>)}</div> : null}
    {scope === "Genres & collections" ? <><div className="watchlist-prototype-app__genre-grid">{genres.map((genre) => <button type="button" key={genre} className={selectedGenre === genre ? "is-active" : ""} onClick={() => setSelectedGenre(genre)}><strong>{genre}</strong><span>{catalogue.filter((show) => show.genre === genre).length} shows</span></button>)}</div><div className="watchlist-prototype-app__results-meta"><span>{selectedGenre}</span><span>{shows.length} shows</span></div><ShowGrid shows={shows} openShow={openShow} /></> : null}
    {shows.length === 0 ? <EmptyState title="No shows found" copy="Try another title or return to the full catalogue." action="Clear search" onAction={() => setQuery("")} /> : null}
  </section>;
}

function ShowGrid({ shows, openShow, saved = false }: { shows: Show[]; openShow: (id: string) => void; saved?: boolean }) {
  return <div className="watchlist-prototype-app__show-grid">{shows.map((show) => <button type="button" key={show.id} onClick={() => openShow(show.id)}><i>{show.initials}</i><span><strong>{show.title}</strong><small>{saved ? `${show.status} · ${show.progress}` : show.genre}</small>{show.release ? <em><b>{show.releaseState === "Confirmed" ? "●" : show.releaseState === "Expected" ? "◐" : "○"}</b>{show.release}</em> : <em>No announced release</em>}<u>View show →</u></span></button>)}</div>;
}

function CalendarPage({ mode, setMode, upcoming, weekOffset, setWeekOffset, visibleWeeks, rangeLabel, openShow }: { mode: CalendarMode; setMode: (mode: CalendarMode) => void; upcoming: Show[]; weekOffset: -1 | 0 | 1; setWeekOffset: (offset: -1 | 0 | 1) => void; visibleWeeks: typeof weekSets.current | typeof weekSets.previous | typeof weekSets.next; rangeLabel: string; openShow: (id: string) => void }) {
  return <section className="watchlist-prototype-app__page" aria-labelledby="calendar-title">
    <header className="watchlist-prototype-app__page-header"><div><p>My shows / Calendar</p><h1 id="calendar-title">Calendar</h1><span>Release information for saved shows</span></div><nav>{(["Upcoming", "Week"] as const).map((item) => <button key={item} type="button" className={mode === item ? "is-active" : ""} onClick={() => setMode(item)}>{item}</button>)}<a href="/watchlist/release-planner" target="_blank" rel="noreferrer">Open planner V1 →</a></nav></header>
    {mode === "Upcoming" ? <div className="watchlist-prototype-app__upcoming"><header><span>Show</span><span>Release</span><span>Certainty</span><span>Availability</span></header>{(["Confirmed", "Expected", "Date unknown"] as const).map((state) => <section key={state}><small>{state}</small>{upcoming.filter((show) => show.releaseState === state).map((show) => <button type="button" key={show.id} onClick={() => openShow(show.id)}><i>{show.initials}</i><strong>{show.title}</strong><span>{show.release}</span><em>{state}</em><span>{show.provider ?? "Not currently available"}</span></button>)}</section>)}</div> : <div className="watchlist-prototype-app__week"><header><button type="button" aria-label="Show earlier weeks" disabled={weekOffset === -1} onClick={() => setWeekOffset(-1)}>‹</button><strong>{rangeLabel}</strong><button type="button" aria-label="Show later weeks" disabled={weekOffset === 1} onClick={() => setWeekOffset(1)}>›</button></header><div className="watchlist-prototype-app__week-grid">{visibleWeeks.map((week) => <section key={week.dates}><header><small>{week.label}</small><strong>{week.dates}</strong></header>{week.releases.map(([title, detail]) => <button type="button" key={`${week.dates}-${title}`} onClick={() => openShow(`show-${title.at(-1)?.toLowerCase()}`)}><span>●</span><div><strong>{title}</strong><small>{detail}</small></div></button>)}</section>)}</div></div>}
  </section>;
}

function AccountPage({ section, setSection, helpSent, setHelpSent, accountSaved, setAccountSaved }: { section: AccountSection; setSection: (section: AccountSection) => void; helpSent: boolean; setHelpSent: (sent: boolean) => void; accountSaved: boolean; setAccountSaved: (saved: boolean) => void }) {
  return <section className="watchlist-prototype-app__page watchlist-prototype-app__account" aria-labelledby="account-title">
    <header className="watchlist-prototype-app__page-header"><div><p>Account</p><h1 id="account-title">Account settings</h1><span>Profile, services and communication preferences</span></div></header>
    <div className="watchlist-prototype-app__settings-layout"><nav aria-label="Account sections">{(["Profile & region", "Streaming services", "Notifications", "Help & feedback"] as const).map((item) => <button type="button" key={item} className={section === item ? "is-active" : ""} onClick={() => setSection(item)}>{item}<span>→</span></button>)}</nav><section className="watchlist-prototype-app__settings-panel">
      {section === "Profile & region" ? <><header><h2>Profile & region</h2><p>Regional settings affect release dates and streaming availability.</p></header><label>Display name<input defaultValue="Profile A" onChange={() => setAccountSaved(false)} /></label><label>Region<select defaultValue="United Kingdom" onChange={() => setAccountSaved(false)}><option>United Kingdom</option><option>United States</option><option>France</option></select></label><button type="button" onClick={() => setAccountSaved(true)}>{accountSaved ? "✓ Changes saved" : "Save changes"}</button></> : null}
      {section === "Streaming services" ? <><header><h2>Streaming services</h2><p>Selected services appear first when availability is shown.</p></header>{["Stream A", "Stream B", "Stream C", "Cinema releases"].map((provider, index) => <label className="watchlist-prototype-app__setting-check" key={provider}><input type="checkbox" defaultChecked={index < 2} /><span><strong>{provider}</strong><small>{index < 2 ? "Included in availability" : "Not selected"}</small></span></label>)}</> : null}
      {section === "Notifications" ? <><header><h2>Notifications</h2><p>Choose which changes are useful enough to interrupt you.</p></header><label className="watchlist-prototype-app__setting-check"><input type="checkbox" defaultChecked /><span><strong>Confirmed episode dates</strong><small>When an exact date is announced</small></span></label><label className="watchlist-prototype-app__setting-check"><input type="checkbox" defaultChecked /><span><strong>New-season announcements</strong><small>When a saved show is renewed</small></span></label><label className="watchlist-prototype-app__setting-check"><input type="checkbox" /><span><strong>Availability changes</strong><small>When a show moves between services</small></span></label></> : null}
      {section === "Help & feedback" ? <><header><h2>Help & feedback</h2><p>Ask for help or record an issue with this wireframe.</p></header>{helpSent ? <div className="watchlist-prototype-app__settings-confirmation" role="status"><strong>Feedback recorded</strong><span>This confirms the submitted state in the wireframe.</span><button type="button" onClick={() => setHelpSent(false)}>Write another</button></div> : <><label>Topic<select defaultValue="Feedback"><option>Feedback</option><option>Problem</option><option>Question</option></select></label><label>Message<textarea placeholder="Describe what happened" /></label><button type="button" onClick={() => setHelpSent(true)}>Submit feedback</button></>}</> : null}
    </section></div>
  </section>;
}

function OverviewPanel({ show }: { show: Show }) {
  return <section className="watchlist-prototype-app__show-overview"><h2>Show context</h2><article><span>Progress</span><strong>{show.progress}</strong><small>Update one episode or a whole season.</small></article><article><span>Availability</span><strong>{show.provider ?? "Not currently available"}</strong><small>{show.provider ? "Included with your selected services." : "No matching service in your region."}</small></article><article><span>Next release</span><strong>{show.release ?? "Nothing announced"}</strong><small>{show.releaseState ?? "No current release information"}</small></article></section>;
}

function EpisodesPanel({ watchedEpisodes, toggleEpisode }: { watchedEpisodes: Set<number>; toggleEpisode: (season: number, index: number) => void }) {
  return <section className="watchlist-prototype-app__episode-cards"><header><div><h2>Season 1</h2><span>{watchedEpisodes.size} of {episodeTitles.length} watched</span></div><select aria-label="Season"><option>Season 1</option><option>Season 2</option><option>Season 3</option></select></header>{episodeTitles.map((episode, index) => <article key={episode}><i>E{index + 1}</i><div><strong>{episode}</strong><span>{index < 3 ? "Available now" : index === 3 ? "18 Sep · confirmed" : "Date unknown"}</span></div><button type="button" className={watchedEpisodes.has(index) ? "is-watched" : ""} onClick={() => toggleEpisode(1, index)}>{watchedEpisodes.has(index) ? "✓ Watched" : "Mark watched"}</button></article>)}</section>;
}

function AvailabilityPanel({ show }: { show: Show }) {
  if (!show.provider) return <section className="watchlist-prototype-app__availability"><h2>Where to watch</h2><EmptyState title="Not available on your services" copy="Availability can change by region and provider." /></section>;
  return <section className="watchlist-prototype-app__availability"><h2>Where to watch</h2><article><i>SA</i><div><strong>{show.provider}</strong><span>Included with subscription</span></div><em>Available now</em></article><article><i>SC</i><div><strong>Stream C</strong><span>Buy individual episodes</span></div><em>From £2.49</em></article></section>;
}

function ProgressEditor({ watchedSeasons, watchedEpisodes, episodeSeason, expandedSeason, setExpandedSeason, toggleSeason, toggleEpisode, markAll, allWatched, close }: { watchedSeasons: Set<number>; watchedEpisodes: Set<number>; episodeSeason: number; expandedSeason: number | null; setExpandedSeason: (season: number | null) => void; toggleSeason: (season: number) => void; toggleEpisode: (season: number, index: number) => void; markAll: () => void; allWatched: boolean; close: () => void }) {
  return <section className="watchlist-prototype-app__progress-editor"><header><button type="button" onClick={close}><span aria-hidden="true">×</span>Cancel</button><strong>Update progress</strong><button type="button" className="watchlist-prototype-app__progress-save" onClick={close}>Save</button></header><div className="watchlist-prototype-app__mark-all"><span>Apply one update to the complete series</span><button type="button" onClick={markAll}>Mark all as watched</button></div>{allWatched ? <div className="watchlist-prototype-app__completed-row">✓ Watched <span>All seasons completed</span></div> : seasons.map((season) => { const isComplete = watchedSeasons.has(season) || (episodeSeason === season && watchedEpisodes.size === episodeTitles.length); const isExpanded = expandedSeason === season; return <div className="watchlist-prototype-app__season-row" key={season}><button type="button" className={`watchlist-prototype-app__expand${isExpanded ? " is-expanded" : ""}`} aria-label={`${isExpanded ? "Collapse" : "Expand"} Season ${season}`} onClick={() => setExpandedSeason(isExpanded ? null : season)} /><strong>Season {season}</strong><button type="button" className={isComplete ? "is-watched" : ""} onClick={() => toggleSeason(season)}>{isComplete ? "✓ Watched" : "Mark as watched"}</button>{isExpanded ? <div className="watchlist-prototype-app__episode-editor">{episodeTitles.map((episode, index) => { const watched = episodeSeason === season && watchedEpisodes.has(index); return <div key={episode}><button type="button" aria-label={`Mark ${episode}`} onClick={() => toggleEpisode(season, index)}>{watched ? "✓" : "○"}</button><span>E{index + 1} · {episode}</span><button type="button" className={watched ? "is-watched" : ""} onClick={() => toggleEpisode(season, index)}>{watched ? "Watched" : "Mark as watched"}</button></div>; })}</div> : null}</div>; })}</section>;
}

function EmptyState({ title, copy, action, onAction }: { title: string; copy: string; action?: string; onAction?: () => void }) {
  return <div className="watchlist-prototype-app__empty-state"><i aria-hidden="true">○</i><strong>{title}</strong><span>{copy}</span>{action && onAction ? <button type="button" onClick={onAction}>{action}</button> : null}</div>;
}
