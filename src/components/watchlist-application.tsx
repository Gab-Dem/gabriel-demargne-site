"use client";

import Link from "next/link";
import { WatchlistReleasePlanner } from "@/components/watchlist-release-planner";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  Circle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Eye,
  Home,
  Library,
  ListPlus,
  Menu,
  Minus,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./watchlist-application.module.css";

export type WatchlistView = "home" | "discover" | "shows" | "calendar" | "account";
type View = WatchlistView;
type ViewingState = "Not started" | "Watching" | "Paused" | "Caught up" | "Finished";
type ReleaseCertainty = "Confirmed" | "Expected" | "Date unknown";
type Genre = "Drama" | "Comedy" | "Science fiction" | "Thriller";
type AccountSection = "Profile & region" | "Availability sources" | "Notifications" | "Help & feedback";

type Show = {
  id: string;
  title: string;
  year: number;
  genre: Genre;
  synopsis: string;
  seasons: number;
  episodes: number;
  runtime: string;
  provider: string | null;
  palette: string;
  monogram: string;
  nextRelease: string | null;
  releaseDetail: string;
  releaseCertainty: ReleaseCertainty;
};

type SavedShow = {
  state: ViewingState;
  watched: number;
  list: string | null;
};

const catalogue: Show[] = [
  {
    id: "northfall",
    title: "Northfall",
    year: 2026,
    genre: "Thriller",
    synopsis: "A remote research station loses contact just as the polar night begins.",
    seasons: 3,
    episodes: 24,
    runtime: "52 min",
    provider: "Stream A",
    palette: "ice",
    monogram: "NF",
    nextRelease: "18 Sep",
    releaseDetail: "S3 E5 · 20:00",
    releaseCertainty: "Confirmed",
  },
  {
    id: "paper-city",
    title: "Paper City",
    year: 2025,
    genre: "Drama",
    synopsis: "An archivist discovers that a forgotten city survives only in its paperwork.",
    seasons: 2,
    episodes: 16,
    runtime: "48 min",
    provider: "Stream B",
    palette: "paper",
    monogram: "PC",
    nextRelease: "21 Sep",
    releaseDetail: "S2 E8 · season finale",
    releaseCertainty: "Confirmed",
  },
  {
    id: "signal-lost",
    title: "Signal Lost",
    year: 2026,
    genre: "Science fiction",
    synopsis: "A late-night radio host receives messages from twenty-four hours in the future.",
    seasons: 1,
    episodes: 10,
    runtime: "44 min",
    provider: "Stream A",
    palette: "signal",
    monogram: "SL",
    nextRelease: "25 Sep",
    releaseDetail: "S1 E7 · 21:00",
    releaseCertainty: "Confirmed",
  },
  {
    id: "second-light",
    title: "Second Light",
    year: 2026,
    genre: "Drama",
    synopsis: "Two sisters reopen a coastal cinema and inherit more than its closing debts.",
    seasons: 1,
    episodes: 8,
    runtime: "56 min",
    provider: "Stream C",
    palette: "sunset",
    monogram: "II",
    nextRelease: "October",
    releaseDetail: "Season 1 · expected this autumn",
    releaseCertainty: "Expected",
  },
  {
    id: "low-season",
    title: "Low Season",
    year: 2024,
    genre: "Comedy",
    synopsis: "The skeleton staff of a grand hotel tries to survive its quietest winter.",
    seasons: 3,
    episodes: 20,
    runtime: "29 min",
    provider: "Stream B",
    palette: "pool",
    monogram: "LS",
    nextRelease: null,
    releaseDetail: "No upcoming release announced",
    releaseCertainty: "Date unknown",
  },
  {
    id: "meridian",
    title: "Meridian",
    year: 2025,
    genre: "Science fiction",
    synopsis: "A cartographer maps a border that moves several metres every morning.",
    seasons: 2,
    episodes: 14,
    runtime: "51 min",
    provider: null,
    palette: "meridian",
    monogram: "M",
    nextRelease: "2027",
    releaseDetail: "Season 3 · expected next year",
    releaseCertainty: "Expected",
  },
  {
    id: "quiet-engine",
    title: "The Quiet Engine",
    year: 2023,
    genre: "Thriller",
    synopsis: "A train engineer realises the overnight route has stopped appearing on any map.",
    seasons: 1,
    episodes: 6,
    runtime: "58 min",
    provider: "Stream C",
    palette: "engine",
    monogram: "QE",
    nextRelease: null,
    releaseDetail: "Limited series · complete",
    releaseCertainty: "Confirmed",
  },
  {
    id: "afterimage",
    title: "Afterimage",
    year: 2026,
    genre: "Drama",
    synopsis: "A portrait photographer begins seeing the same stranger in every negative.",
    seasons: 1,
    episodes: 8,
    runtime: "46 min",
    provider: "Stream A",
    palette: "afterimage",
    monogram: "AI",
    nextRelease: "Date TBC",
    releaseDetail: "S1 E4 · release date unconfirmed",
    releaseCertainty: "Date unknown",
  },
];

const defaultSaved: Record<string, SavedShow> = {
  northfall: { state: "Watching", watched: 20, list: "Friday viewing" },
  "paper-city": { state: "Caught up", watched: 15, list: null },
  "signal-lost": { state: "Watching", watched: 6, list: "With friends" },
  "low-season": { state: "Paused", watched: 12, list: null },
  "quiet-engine": { state: "Finished", watched: 6, list: null },
};

const navItems: { id: View; label: string; icon: typeof Library }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "shows", label: "My shows", icon: Library },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "calendar", label: "Release calendar", icon: CalendarDays },
];

const viewingStates: ViewingState[] = ["Not started", "Watching", "Paused", "Caught up", "Finished"];
const storageKey = "watchlist-application-v1";

export function WatchlistApplication({ initialView = "home", initialCalendarMode = "Upcoming" }: { initialView?: WatchlistView; initialCalendarMode?: "Upcoming" | "Week" | "Planner" }) {
  const [view, setView] = useState<View>(initialView);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState<Record<string, SavedShow>>(defaultSaved);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<Genre | "All">("All");
  const [stateFilter, setStateFilter] = useState<ViewingState | "All">("All");
  const [listFilter, setListFilter] = useState("All");
  const [savePanel, setSavePanel] = useState<string | null>(null);
  const [progressPanel, setProgressPanel] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    window.queueMicrotask(() => {
      try {
        if (stored) setSaved(JSON.parse(stored) as Record<string, SavedShow>);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [hydrated, saved]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setView("discover");
        setSelectedId(null);
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const selectedShow = catalogue.find((show) => show.id === selectedId) ?? null;
  const savedShows = catalogue.filter((show) => saved[show.id]);
  const discoverShows = catalogue.filter((show) => {
    const matchesText = `${show.title} ${show.genre}`.toLowerCase().includes(search.toLowerCase().trim());
    return matchesText && (genre === "All" || show.genre === genre);
  });
  const filteredSaved = savedShows.filter((show) => {
    const record = saved[show.id];
    const matchesText = show.title.toLowerCase().includes(search.toLowerCase().trim());
    const matchesState = stateFilter === "All" || record.state === stateFilter;
    const matchesList = listFilter === "All" || record.list === listFilter;
    return matchesText && matchesState && matchesList;
  });
  const personalLists = Array.from(new Set(savedShows.map((show) => saved[show.id].list).filter((list): list is string => Boolean(list))));
  function navigate(next: View) {
    setView(next);
    setSelectedId(null);
    setMobileMenu(false);
    setSearch("");
  }

  function openSavedView({ state = "All", list = "All" }: { state?: ViewingState | "All"; list?: string } = {}) {
    setStateFilter(state);
    setListFilter(list);
    navigate("shows");
  }

  function openShow(id: string) {
    setSelectedId(id);
    setSavePanel(null);
    setProgressPanel(null);
  }

  function saveShow(id: string) {
    setSaved((current) => ({
      ...current,
      [id]: current[id] ?? { state: "Not started", watched: 0, list: null },
    }));
    setSavePanel(id);
    setToast(`${catalogue.find((show) => show.id === id)?.title} saved to My shows`);
  }

  function updateSaved(id: string, patch: Partial<SavedShow>) {
    setSaved((current) => ({
      ...current,
      [id]: { ...(current[id] ?? { state: "Not started", watched: 0, list: null }), ...patch },
    }));
  }

  function removeShow(id: string) {
    setSaved((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setSavePanel(null);
    setToast("Removed from My shows");
  }

  return (
    <main className={styles.app}>
      <aside className={`${styles.sidebar} ${mobileMenu ? styles.sidebarOpen : ""}`}>
        <div className={styles.brandRow}>
          <button className={styles.brand} type="button" onClick={() => navigate("home")} aria-label="Open Watchlist home">
            <span>W</span>
            <strong>Watchlist</strong>
          </button>
          <button className={styles.mobileClose} type="button" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X /></button>
        </div>
        <nav className={styles.primaryNav} aria-label="Application navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} type="button" className={view === item.id && !selectedShow ? styles.activeNav : ""} onClick={() => navigate(item.id)}><Icon /><span>{item.label}</span>{item.id === "shows" ? <b>{savedShows.length}</b> : null}</button>;
          })}
        </nav>
        <div className={styles.sidebarFoot}>
          <button type="button" className={view === "account" && !selectedShow ? styles.activeNav : ""} onClick={() => navigate("account")}><Settings /><span>Preferences</span></button>
          <Link href="/watchlist"><ArrowLeft /><span>Back to case study</span></Link>
        </div>
      </aside>

      <section className={styles.shell}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} type="button" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu /></button>
          <button className={styles.globalSearch} type="button" onClick={() => navigate("discover")}><Search /><span>Search for a show</span><kbd>⌘ K</kbd></button>
          <div className={styles.topActions}>
            <button type="button" onClick={() => navigate("calendar")} aria-label="View release notifications"><Bell /><i /></button>
            <button type="button" className={styles.profileButton} onClick={() => navigate("account")} aria-label="Open profile">GD</button>
          </div>
        </header>

        <div className={styles.content}>
          {selectedShow ? (
            <ShowDetail
              show={selectedShow}
              saved={saved[selectedShow.id]}
              onBack={() => setSelectedId(null)}
              onSave={() => saveShow(selectedShow.id)}
              onManage={() => setSavePanel(selectedShow.id)}
              onProgress={() => setProgressPanel(selectedShow.id)}
            />
          ) : view === "home" ? (
            <HomeView shows={savedShows} saved={saved} lists={personalLists} onOpen={openShow} onNavigate={navigate} onOpenSavedView={openSavedView} />
          ) : view === "discover" ? (
            <DiscoverView shows={discoverShows} saved={saved} search={search} genre={genre} onSearch={setSearch} onGenre={setGenre} onOpen={openShow} onSave={saveShow} />
          ) : view === "shows" ? (
            <MyShowsView shows={filteredSaved} saved={saved} search={search} state={stateFilter} list={listFilter} onSearch={setSearch} onState={setStateFilter} onClearList={() => setListFilter("All")} onOpen={openShow} onDiscover={() => navigate("discover")} />
          ) : view === "calendar" ? (
            <ReleaseCalendarView shows={savedShows} onOpen={openShow} initialMode={initialCalendarMode} />
          ) : (
            <AccountView savedCount={savedShows.length} />
          )}
        </div>
      </section>

      {savePanel ? <SavePanel show={catalogue.find((show) => show.id === savePanel)!} saved={saved[savePanel]} onClose={() => setSavePanel(null)} onUpdate={(patch) => updateSaved(savePanel, patch)} onRemove={() => removeShow(savePanel)} /> : null}
      {progressPanel ? <ProgressPanel show={catalogue.find((show) => show.id === progressPanel)!} saved={saved[progressPanel]} onClose={() => setProgressPanel(null)} onUpdate={(watched) => updateSaved(progressPanel, { watched, state: watched === catalogue.find((show) => show.id === progressPanel)!.episodes ? "Caught up" : watched > 0 ? "Watching" : "Not started" })} /> : null}
      {toast ? <div className={styles.toast} role="status"><span><Check /></span><p>{toast}</p><button type="button" onClick={() => setToast(null)} aria-label="Dismiss"><X /></button></div> : null}
    </main>
  );
}

function PageHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) {
  return <header className={styles.pageHeading}><div><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{action}</header>;
}

function HomeView({ shows, saved, lists, onOpen, onNavigate, onOpenSavedView }: { shows: Show[]; saved: Record<string, SavedShow>; lists: string[]; onOpen: (id: string) => void; onNavigate: (view: View) => void; onOpenSavedView: (filters?: { state?: ViewingState | "All"; list?: string }) => void }) {
  const confirmed = shows.filter((show) => show.nextRelease && show.releaseCertainty === "Confirmed");
  const dateUnknown = shows.filter((show) => show.releaseCertainty === "Date unknown");
  const paused = shows.filter((show) => saved[show.id].state === "Paused");
  const caughtUp = shows.filter((show) => saved[show.id].state === "Caught up");
  const changes = [
    { show: shows.find((show) => show.id === "northfall"), label: "Release date confirmed", detail: "18 Sep · S3 E5 at 20:00" },
    { show: shows.find((show) => show.id === "paper-city"), label: "Season finale scheduled", detail: "21 Sep · S2 E8" },
    { show: shows.find((show) => show.id === "low-season"), label: "Still waiting for a date", detail: "No upcoming release announced" },
  ].filter((change): change is { show: Show; label: string; detail: string } => Boolean(change.show));

  if (!shows.length) return <div className={styles.homeDashboard}>
    <PageHeading eyebrow="Your watchlist" title="Home" copy="Changes, lists and upcoming releases from the shows you save." />
    <EmptyState title="Your watchlist is ready" copy="Save a show to begin tracking progress, lists and release changes here." action="Find a show" onAction={() => onNavigate("discover")} />
  </div>;

  return <div className={styles.homeDashboard}>
    <PageHeading eyebrow="Your watchlist" title="Home" copy="Changes, lists and upcoming releases from the shows you save." action={<button className={styles.primaryButton} type="button" onClick={() => onNavigate("discover")}><Plus /> Find a show</button>} />
    <section className={styles.homeSummary} aria-label="Watchlist summary">
      <button type="button" onClick={() => onOpenSavedView()}><span className={styles.summaryIcon}><Library /></span><span className={styles.summaryCopy}><strong>My shows</strong><small>{shows.length} saved {shows.length === 1 ? "show" : "shows"}</small></span><ChevronRight /></button>
      <button type="button" onClick={() => onNavigate("calendar")}><span className={styles.summaryIcon}><CalendarDays /></span><span className={styles.summaryCopy}><strong>Release calendar</strong><small>{confirmed.length} confirmed {confirmed.length === 1 ? "release" : "releases"}</small></span><ChevronRight /></button>
      <button type="button" onClick={() => onOpenSavedView({ state: "Caught up" })}><span className={styles.summaryIcon}><Check /></span><span className={styles.summaryCopy}><strong>Caught up</strong><small>{caughtUp.length} {caughtUp.length === 1 ? "show is" : "shows are"} up to date</small></span><ChevronRight /></button>
    </section>
    <div className={styles.homeDashboardGrid}>
      <div className={styles.homeMainColumn}>
        <section className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><span>Since your last visit</span><h2>Changes in My shows</h2></div><button type="button" onClick={() => onNavigate("calendar")}>Release calendar <ChevronRight /></button></div>
          <div className={styles.changeList}>{changes.map((change) => <button type="button" key={change.show.id} onClick={() => onOpen(change.show.id)}><Poster show={change.show} compact /><span><strong>{change.show.title}</strong><small>{change.label} · {change.detail}</small></span><ChevronRight /></button>)}</div>
        </section>
        <section className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><span>Your organisation</span><h2>Personal lists</h2></div><button type="button" onClick={() => onOpenSavedView()}>My shows <ChevronRight /></button></div>
          <div className={styles.personalListGrid}>{lists.map((list) => { const count = shows.filter((show) => saved[show.id].list === list).length; return <button type="button" key={list} onClick={() => onOpenSavedView({ list })}><ListPlus /><span><strong>{list}</strong><small>{count} {count === 1 ? "show" : "shows"}</small></span><ChevronRight /></button>; })}</div>
        </section>
      </div>
      <aside className={styles.homeSideColumn}>
        <section className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><span>Based on your collection</span><h2>Suggested lists</h2></div></div>
          <div className={styles.suggestedLists}>
            <button type="button" onClick={() => onNavigate("calendar")}><CalendarDays /><span><strong>Releasing soon</strong><small>{confirmed.length} confirmed in your calendar</small></span><ChevronRight /></button>
            <button type="button" onClick={() => onNavigate("calendar")}><CircleHelp /><span><strong>Waiting for dates</strong><small>{dateUnknown.length} {dateUnknown.length === 1 ? "show" : "shows"} without a confirmed date</small></span><ChevronRight /></button>
            <button type="button" onClick={() => onOpenSavedView({ state: "Paused" })}><Clock3 /><span><strong>Paused shows</strong><small>{paused.length} saved for later</small></span><ChevronRight /></button>
          </div>
        </section>
        <section className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><span>Coming up</span><h2>Next releases</h2></div><button type="button" onClick={() => onNavigate("calendar")}>See all <ChevronRight /></button></div>
          <div>{confirmed.slice(0, 3).map((show) => <button className={styles.releaseRow} type="button" key={show.id} onClick={() => onOpen(show.id)}><time>{show.nextRelease?.split(" ")[0]}<small>{show.nextRelease?.split(" ")[1]}</small></time><span><strong>{show.title}</strong><small>{show.releaseDetail}</small></span><ChevronRight /></button>)}</div>
        </section>
      </aside>
    </div>
  </div>;
}

function DiscoverView({ shows, saved, search, genre, onSearch, onGenre, onOpen, onSave }: { shows: Show[]; saved: Record<string, SavedShow>; search: string; genre: Genre | "All"; onSearch: (value: string) => void; onGenre: (value: Genre | "All") => void; onOpen: (id: string) => void; onSave: (id: string) => void }) {
  return <div>
    <PageHeading eyebrow="Find something" title="Discover" copy="Browse a small, fictional catalogue built to test the product model." />
    <div className={styles.searchRow}><label><Search /><input autoFocus value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search shows or genres" /><kbd>⌘ K</kbd></label><span className={styles.filterSummary}><SlidersHorizontal /> {genre === "All" ? "All genres" : genre}</span></div>
    <div className={styles.chips}>{(["All", "Drama", "Comedy", "Science fiction", "Thriller"] as const).map((item) => <button type="button" className={genre === item ? styles.activeChip : ""} key={item} onClick={() => onGenre(item)}>{item}</button>)}</div>
    <div className={styles.catalogueGrid}>{shows.map((show) => <ShowCard key={show.id} show={show} saved={saved[show.id]} onOpen={() => onOpen(show.id)} onSave={() => onSave(show.id)} />)}</div>
    {!shows.length ? <EmptyState title="No shows found" copy="Try another title or remove the current genre filter." /> : null}
  </div>;
}

function MyShowsView({ shows, saved, search, state, list, onSearch, onState, onClearList, onOpen, onDiscover }: { shows: Show[]; saved: Record<string, SavedShow>; search: string; state: ViewingState | "All"; list: string; onSearch: (value: string) => void; onState: (value: ViewingState | "All") => void; onClearList: () => void; onOpen: (id: string) => void; onDiscover: () => void }) {
  return <div>
    <PageHeading eyebrow="Your library" title="My shows" copy="Every saved title, with its state and useful return context." action={<button className={styles.primaryButton} type="button" onClick={onDiscover}><Plus /> Find a show</button>} />
    {list !== "All" ? <div className={styles.activeListFilter}><ListPlus /><span><small>Personal list</small><strong>{list}</strong></span><button type="button" onClick={onClearList}>Clear filter <X /></button></div> : null}
    <div className={styles.libraryTools}><div className={styles.chips}>{(["All", ...viewingStates] as const).map((item) => <button type="button" className={state === item ? styles.activeChip : ""} key={item} onClick={() => onState(item)}>{item}{item !== "All" ? <small>{Object.values(saved).filter((record) => record.state === item).length}</small> : null}</button>)}</div><label><Search /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search My shows" /></label></div>
    <div className={styles.libraryList}>{shows.map((show) => { const record = saved[show.id]; return <button type="button" key={show.id} className={styles.libraryRow} onClick={() => onOpen(show.id)}><Poster show={show} compact /><span className={styles.libraryTitle}><strong>{show.title}</strong><small>{show.year} · {show.genre} · {show.provider ?? "No current provider"}</small></span><span className={styles.statePill}>{record.state}</span><span className={styles.libraryProgress}><strong>{record.watched} of {show.episodes}</strong><small>episodes watched</small><Progress value={record.watched} max={show.episodes} /></span><span className={styles.libraryRelease}><strong>{show.nextRelease ?? "Nothing announced"}</strong><small>{show.releaseCertainty}</small></span><ChevronRight /></button>; })}</div>
    {!shows.length ? <EmptyState title="Nothing in this view" copy="Change the filter or save another show to My shows." action="Discover shows" onAction={onDiscover} /> : null}
  </div>;
}

function ReleaseCalendarView({ shows, onOpen, initialMode = "Upcoming" }: { shows: Show[]; onOpen: (id: string) => void; initialMode?: "Upcoming" | "Week" | "Planner" }) {
  const [mode, setMode] = useState<"Upcoming" | "Week" | "Planner">(initialMode);
  const calendarModes = [
    { name: "Upcoming" as const, icon: Clock3 },
    { name: "Week" as const, icon: CalendarDays },
    { name: "Planner" as const, icon: SlidersHorizontal },
  ];
  return <div className={styles.calendarView}>
    <header className={styles.calendarHeader}>
      <h1>Release calendar</h1>
      <nav className={styles.calendarTabs} aria-label="Release calendar views">
        {calendarModes.map((item) => { const Icon = item.icon; return <button type="button" key={item.name} className={mode === item.name ? styles.activeCalendarTab : ""} aria-pressed={mode === item.name} onClick={() => setMode(item.name)}><Icon />{item.name}</button>; })}
      </nav>
    </header>
    {mode === "Upcoming" ? <UpcomingView shows={shows} onOpen={onOpen} /> : mode === "Week" ? <WeekView shows={shows} onOpen={onOpen} /> : <section className={styles.plannerView}><div className={styles.plannerToolbar}><Link href="/watchlist/release-planner-v3" target="_blank">Open full screen <ChevronRight /></Link></div><WatchlistReleasePlanner version="v3" embedded /></section>}
  </div>;
}

function UpcomingView({ shows, onOpen }: { shows: Show[]; onOpen: (id: string) => void }) {
  const [range, setRange] = useState<"30" | "90" | "all">("90");
  const visibleIds = range === "30" ? ["northfall", "paper-city", "signal-lost", "afterimage"] : range === "90" ? ["northfall", "paper-city", "signal-lost", "second-light", "afterimage", "low-season"] : catalogue.map((show) => show.id);
  const visibleShows = shows.filter((show) => visibleIds.includes(show.id));
  const groups = (["Confirmed", "Expected", "Date unknown"] as const).map((certainty) => ({ certainty, shows: visibleShows.filter((show) => show.releaseCertainty === certainty) }));
  return <section className={styles.calendarPanel}>
    <header className={styles.calendarPanelHeading}><h2>Upcoming releases</h2><label>Time range<select value={range} onChange={(event) => setRange(event.target.value as "30" | "90" | "all")}><option value="30">Next 30 days</option><option value="90">Next 90 days</option><option value="all">All upcoming</option></select></label></header>
    <div className={styles.releaseSummary}><article><CalendarDays /><span><strong>{groups[0].shows.length}</strong><small>confirmed releases</small></span></article><article><Clock3 /><span><strong>{groups[1].shows.length}</strong><small>expected releases</small></span></article><article><CircleHelp /><span><strong>{groups[2].shows.length}</strong><small>dates unknown</small></span></article></div>
    <div className={styles.releaseTimeline}>{groups.map((group) => group.shows.length ? <section key={group.certainty}><header><span className={`${styles.certaintyDot} ${styles[`certainty${group.certainty.replace(" ", "")}`]}`} /><div><h2>{group.certainty}</h2><p>{group.certainty === "Confirmed" ? "Exact dates announced" : group.certainty === "Expected" ? "Useful direction without false precision" : "No date has been announced"}</p></div></header><div>{group.shows.map((show) => <button type="button" key={show.id} onClick={() => onOpen(show.id)}><time><strong>{show.nextRelease ?? "TBC"}</strong><small>{show.releaseCertainty}</small></time><Poster show={show} compact /><span><strong>{show.title}</strong><small>{show.releaseDetail}</small></span><span className={styles.provider}>{show.provider ?? "Availability unknown"}</span><ChevronRight /></button>)}</div></section> : null)}</div>
  </section>;
}

const weekOptions = [
  { range: "7–13 Sep", label: "Previous week", releases: [{ day: "Thu", date: "10", showId: "signal-lost", detail: "S1 E5 · 21:00" }, { day: "Fri", date: "11", showId: "paper-city", detail: "S2 E7 · 20:00" }] },
  { range: "14–20 Sep", label: "This week", releases: [{ day: "Thu", date: "17", showId: "signal-lost", detail: "S1 E6 · 21:00" }, { day: "Fri", date: "18", showId: "northfall", detail: "S3 E5 · 20:00" }, { day: "Sun", date: "20", showId: "paper-city", detail: "S2 E8 · season finale" }] },
  { range: "21–27 Sep", label: "Next week", releases: [{ day: "Mon", date: "21", showId: "paper-city", detail: "Behind the scenes special" }, { day: "Thu", date: "24", showId: "signal-lost", detail: "S1 E7 · 21:00" }, { day: "Fri", date: "25", showId: "northfall", detail: "S3 E6 · 20:00" }] },
] as const;

function WeekView({ shows, onOpen }: { shows: Show[]; onOpen: (id: string) => void }) {
  const [weekIndex, setWeekIndex] = useState(1);
  const currentWeek = weekOptions[weekIndex];
  const releases = currentWeek.releases.map((release) => ({ ...release, show: shows.find((show) => show.id === release.showId) })).filter((release) => release.show);
  return <section className={styles.calendarPanel}>
    <header className={styles.weekHeading}><h2>{currentWeek.label}</h2><div><button type="button" onClick={() => setWeekIndex(Math.max(0, weekIndex - 1))} disabled={weekIndex === 0} aria-label="Previous week"><ChevronLeft /></button><strong>{currentWeek.range}</strong><button type="button" onClick={() => setWeekIndex(Math.min(weekOptions.length - 1, weekIndex + 1))} disabled={weekIndex === weekOptions.length - 1} aria-label="Next week"><ChevronRight /></button></div></header>
    <div className={styles.weekLayout}><section className={styles.weekDays}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => { const dayReleases = releases.filter((release) => release.day === day); return <article className={dayReleases.length ? styles.dayHasRelease : ""} key={day}><header><span>{day}</span><strong>{Number(currentWeek.range.split("–")[0]) + index}</strong></header><div>{dayReleases.map((release) => <button type="button" key={`${release.showId}-${release.date}`} onClick={() => onOpen(release.showId)}><Poster show={release.show!} compact /><span><strong>{release.show!.title}</strong><small>{release.detail}</small><em>{release.show!.provider ?? "Provider unknown"}</em></span><ChevronRight /></button>)}</div></article>; })}</section><aside className={styles.weekSummary}><span>Week at a glance</span><strong>{releases.length}</strong><p>{releases.length === 1 ? "release" : "releases"} across {new Set(releases.map((release) => release.showId)).size} saved shows.</p><div>{releases.map((release) => <button type="button" key={`summary-${release.showId}-${release.date}`} onClick={() => onOpen(release.showId)}><i className={styles[`poster${release.show!.palette}`]} /><span><strong>{release.day} {release.date}</strong><small>{release.show!.title}</small></span></button>)}</div></aside></div>
    <div className={styles.nearbyWeeks}><span>Nearby weeks</span>{weekOptions.map((week, index) => <button type="button" className={index === weekIndex ? styles.activeNearbyWeek : ""} key={week.range} onClick={() => setWeekIndex(index)}><span>{week.label}</span><strong>{week.range}</strong><small>{week.releases.length} releases</small></button>)}</div>
  </section>;
}

function AccountView({ savedCount }: { savedCount: number }) {
  const [savedMessage, setSavedMessage] = useState(false);
  const [section, setSection] = useState<AccountSection>("Profile & region");
  const sections: { name: AccountSection; icon: typeof UserRound }[] = [
    { name: "Profile & region", icon: UserRound },
    { name: "Availability sources", icon: Eye },
    { name: "Notifications", icon: Bell },
    { name: "Help & feedback", icon: CircleHelp },
  ];
  return <div>
    <PageHeading eyebrow="Account" title="Preferences" copy="Regional and notification settings shape the information shown across Watchlist." />
    <div className={styles.settingsGrid}><aside><div className={styles.accountIdentity}><span>GD</span><strong>Gabriel</strong><small>{savedCount} saved shows</small></div><nav>{sections.map((item) => { const Icon = item.icon; return <button className={section === item.name ? styles.activeSetting : ""} type="button" key={item.name} onClick={() => { setSection(item.name); setSavedMessage(false); }}><Icon /> {item.name}</button>; })}</nav></aside><section className={styles.settingsPanel}>
      {section === "Profile & region" ? <><header><h2>Profile & region</h2><p>Your region affects release times and availability references.</p></header><label>Display name<input defaultValue="Gabriel" onChange={() => setSavedMessage(false)} /></label><label>Region<select defaultValue="United Kingdom" onChange={() => setSavedMessage(false)}><option>United Kingdom</option><option>France</option><option>United States</option></select></label><label>Preferred week start<select defaultValue="Monday" onChange={() => setSavedMessage(false)}><option>Monday</option><option>Sunday</option></select></label></> : null}
      {section === "Availability sources" ? <><header><h2>Availability sources</h2><p>Choose which services Watchlist checks when it shows regional availability.</p></header>{["Stream A", "Stream B", "Stream C"].map((service, index) => <label className={styles.toggleRow} key={service}><span><strong>{service}</strong><small>{index < 2 ? "Checked for availability" : "Not selected"}</small></span><input type="checkbox" defaultChecked={index < 2} onChange={() => setSavedMessage(false)} /></label>)}</> : null}
      {section === "Notifications" ? <><header><h2>Notifications</h2><p>Choose which changes are useful enough to interrupt you.</p></header>{["Confirmed episode dates", "New season announcements", "Availability changes"].map((notification, index) => <label className={styles.toggleRow} key={notification}><span><strong>{notification}</strong><small>{index === 0 ? "When an exact date is announced" : index === 1 ? "When a saved show is renewed" : "When a provider changes"}</small></span><input type="checkbox" defaultChecked={index < 2} onChange={() => setSavedMessage(false)} /></label>)}</> : null}
      {section === "Help & feedback" ? <><header><h2>Help & feedback</h2><p>Record a question or observation about this working application.</p></header><label>Topic<select defaultValue="Feedback" onChange={() => setSavedMessage(false)}><option>Feedback</option><option>Problem</option><option>Question</option></select></label><label>Message<input placeholder="What would you like to share?" onChange={() => setSavedMessage(false)} /></label></> : null}
      <button className={styles.primaryButton} type="button" onClick={() => setSavedMessage(true)}>{savedMessage ? <><Check /> {section === "Help & feedback" ? "Feedback recorded" : "Changes saved"}</> : section === "Help & feedback" ? "Submit feedback" : "Save changes"}</button>
    </section></div>
  </div>;
}

function ShowDetail({ show, saved, onBack, onSave, onManage, onProgress }: { show: Show; saved?: SavedShow; onBack: () => void; onSave: () => void; onManage: () => void; onProgress: () => void }) {
  const [tab, setTab] = useState<"Overview" | "Episodes" | "Availability">("Overview");
  return <div className={styles.detail}>
    <button className={styles.backButton} type="button" onClick={onBack}><ChevronLeft /> Back</button>
    <section className={styles.detailHero}><Poster show={show} large /><div><div className={styles.detailMeta}><span>{show.year}</span><span>{show.genre}</span><span>{show.runtime}</span></div><h1>{show.title}</h1><p>{show.synopsis}</p><div className={styles.detailActions}>{saved ? <><button className={styles.savedButton} type="button" onClick={onManage}><Check /> My shows · {saved.state}<ChevronDown /></button><button className={styles.secondaryButton} type="button" onClick={onProgress}>Update progress</button></> : <button className={styles.primaryButton} type="button" onClick={onSave}><Plus /> Save to My shows</button>}</div></div><aside><span>Next meaningful release</span><strong>{show.nextRelease ?? "Nothing announced"}</strong><p>{show.releaseDetail}</p><em className={styles[`certainty${show.releaseCertainty.replace(" ", "")}`]}>{show.releaseCertainty}</em></aside></section>
    <nav className={styles.detailTabs}>{(["Overview", "Episodes", "Availability"] as const).map((item) => <button type="button" className={tab === item ? styles.activeTab : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</nav>
    {tab === "Overview" ? <div className={styles.overviewGrid}><section><span>Progress</span><strong>{saved ? `${saved.watched} of ${show.episodes} episodes` : "Not tracked yet"}</strong>{saved ? <Progress value={saved.watched} max={show.episodes} /> : null}<button type="button" onClick={saved ? onProgress : onSave}>{saved ? "Update progress" : "Save to start tracking"}<ChevronRight /></button></section><section><span>Availability</span><strong>{show.provider ?? "Not currently listed"}</strong><p>{show.provider ? "Listed on one of your selected services." : "Availability can change by region and provider."}</p><button type="button" onClick={() => setTab("Availability")}>See availability <ChevronRight /></button></section><section><span>Release information</span><strong>{show.nextRelease ?? "No date announced"}</strong><p>{show.releaseDetail}</p><button type="button" onClick={() => setTab("Episodes")}>See episodes <ChevronRight /></button></section></div> : tab === "Episodes" ? <EpisodeList show={show} saved={saved} onProgress={saved ? onProgress : onSave} /> : <Availability show={show} />}
  </div>;
}

function EpisodeList({ show, saved, onProgress }: { show: Show; saved?: SavedShow; onProgress: () => void }) {
  const visibleEpisodes = Array.from({ length: Math.min(show.episodes, 8) }, (_, index) => index + 1);
  return <section className={styles.episodeList}><header><div><span>Current season</span><h2>Season {show.seasons}</h2></div><button className={styles.secondaryButton} type="button" onClick={onProgress}>{saved ? "Edit progress" : "Save to track"}</button></header>{visibleEpisodes.map((episode) => { const watched = Boolean(saved && episode <= saved.watched % 8); return <article key={episode}><button type="button" onClick={onProgress} aria-label={`Update episode ${episode}`}>{watched ? <Check /> : <Circle />}</button><span><strong>Episode {episode}</strong><small>{episode < 5 ? "Released" : episode === 5 ? show.releaseDetail : "Date unknown"}</small></span><time>{show.runtime}</time><em>{watched ? "Watched" : episode < 5 ? "Released" : "Upcoming"}</em></article>; })}</section>;
}

function Availability({ show }: { show: Show }) {
  return <section className={styles.availability}><header><span>United Kingdom</span><h2>Availability</h2><p>Regional availability is reference information only and may change.</p></header>{show.provider ? <><article><span className={styles.providerMark}>A</span><div><strong>{show.provider}</strong><small>Listed with subscription · HD</small></div><em>Currently listed</em><span className={styles.availabilityNote}>Selected source</span></article><article><span className={styles.providerMark}>C</span><div><strong>Stream C</strong><small>Purchase listing from £2.49 an episode</small></div><em>Alternative</em><span className={styles.availabilityNote}>Purchase option</span></article></> : <EmptyState title="No current availability listing" copy="Availability may change. You can keep the show saved and check again later." />}</section>;
}

function ShowCard({ show, saved, onOpen, onSave }: { show: Show; saved?: SavedShow; onOpen: () => void; onSave?: () => void }) {
  return <article className={styles.showCard}><button className={styles.posterButton} type="button" onClick={onOpen}><Poster show={show} /><span className={styles.cardOverlay}><Eye /></span></button><div className={styles.cardCopy}><button type="button" onClick={onOpen}><strong>{show.title}</strong><small>{show.year} · {show.genre}</small></button>{saved ? <span className={styles.cardState}><Check /> {saved.state}</span> : onSave ? <button className={styles.quickSave} type="button" onClick={onSave}><Plus /> Save</button> : null}</div>{saved ? <Progress value={saved.watched} max={show.episodes} /> : null}</article>;
}

function Poster({ show, compact = false, large = false }: { show: Show; compact?: boolean; large?: boolean }) {
  return <span className={`${styles.poster} ${styles[`poster${show.palette}`]} ${compact ? styles.posterCompact : ""} ${large ? styles.posterLarge : ""}`} aria-label={`${show.title} poster`}><i /><b>{show.monogram}</b><small>{show.title}</small></span>;
}

function Progress({ value, max }: { value: number; max: number }) {
  return <span className={styles.progress} aria-label={`${value} of ${max} episodes watched`}><i style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></span>;
}

function SavePanel({ show, saved, onClose, onUpdate, onRemove }: { show: Show; saved: SavedShow; onClose: () => void; onUpdate: (patch: Partial<SavedShow>) => void; onRemove: () => void }) {
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><section className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="save-panel-title"><header><div><span>Saved to My shows</span><h2 id="save-panel-title">{show.title}</h2></div><button type="button" onClick={onClose} aria-label="Close"><X /></button></header><p className={styles.drawerIntro}>The save is complete. Add detail only if it is useful now.</p><fieldset><legend>Viewing state</legend>{viewingStates.map((state) => <button type="button" className={saved.state === state ? styles.selectedOption : ""} key={state} onClick={() => onUpdate({ state })}><span>{saved.state === state ? <Check /> : <Minus />}</span><div><strong>{state}</strong><small>{state === "Caught up" ? "Waiting for another episode or season" : state === "Finished" ? "The series is complete" : state === "Watching" ? "Actively making progress" : state === "Paused" ? "Keeping your place for later" : "Saved without progress"}</small></div></button>)}</fieldset><fieldset><legend>Personal list</legend>{["Friday viewing", "With friends", "Comfort shows"].map((list) => <button type="button" className={saved.list === list ? styles.selectedOption : ""} key={list} onClick={() => onUpdate({ list: saved.list === list ? null : list })}><span>{saved.list === list ? <Check /> : <ListPlus />}</span><div><strong>{list}</strong><small>{saved.list === list ? "Included in this list" : "Optional organisation"}</small></div></button>)}</fieldset><footer><button className={styles.removeButton} type="button" onClick={onRemove}>Remove from My shows</button><button className={styles.primaryButton} type="button" onClick={onClose}>Done</button></footer></section></div>;
}

function ProgressPanel({ show, saved, onClose, onUpdate }: { show: Show; saved: SavedShow; onClose: () => void; onUpdate: (watched: number) => void }) {
  const [draft, setDraft] = useState(saved.watched);
  const seasonSize = 8;
  const seasons = Array.from({ length: show.seasons }, (_, index) => index + 1);
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><section className={`${styles.drawer} ${styles.progressDrawer}`} role="dialog" aria-modal="true" aria-labelledby="progress-panel-title"><header><div><span>Update progress</span><h2 id="progress-panel-title">{show.title}</h2></div><button type="button" onClick={onClose} aria-label="Close"><X /></button></header><div className={styles.progressSummary}><span><strong>{draft}</strong> of {show.episodes} episodes watched</span><Progress value={draft} max={show.episodes} /></div><div className={styles.seasonList}>{seasons.map((season) => { const start = (season - 1) * seasonSize; const end = Math.min(start + seasonSize, show.episodes); const seasonWatched = Math.max(0, Math.min(end - start, draft - start)); const complete = seasonWatched === end - start; return <article key={season}><div><strong>Season {season}</strong><small>{seasonWatched} of {end - start} watched</small></div><button type="button" className={complete ? styles.completedButton : ""} onClick={() => setDraft(complete ? start : end)}>{complete ? <><Check /> Watched</> : "Mark season watched"}</button></article>; })}</div><div className={styles.stepper}><button type="button" onClick={() => setDraft(Math.max(0, draft - 1))} aria-label="Decrease watched episodes"><Minus /></button><span><strong>{draft}</strong><small>episodes watched</small></span><button type="button" onClick={() => setDraft(Math.min(show.episodes, draft + 1))} aria-label="Increase watched episodes"><Plus /></button></div><footer><button className={styles.secondaryButton} type="button" onClick={onClose}>Cancel</button><button className={styles.primaryButton} type="button" onClick={() => { onUpdate(draft); onClose(); }}><Check /> Save progress</button></footer></section></div>;
}

function EmptyState({ title, copy, action, onAction }: { title: string; copy: string; action?: string; onAction?: () => void }) {
  return <section className={styles.emptyState}><Sparkles /><h2>{title}</h2><p>{copy}</p>{action && onAction ? <button className={styles.primaryButton} type="button" onClick={onAction}>{action}</button> : null}</section>;
}
