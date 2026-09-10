"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type EpisodeRelease = {
  label: string;
  date: string;
};

type Series = {
  id: string;
  title: string;
  season: string;
  releases: EpisodeRelease[];
  fullRelease?: boolean;
  selected: boolean;
};

type PreparedRelease = EpisodeRelease & {
  parsedDate: Date;
  position: number;
  index: number;
  showLabel: boolean;
};

type PreparedSeries = {
  show: Series;
  releases: PreparedRelease[];
  visibleReleases: PreparedRelease[];
  actualStart: number;
  actualEnd: number;
  barStyle: CSSProperties;
  visualStart: number;
  visualEnd: number;
};

const calendarStart = new Date(2026, 8, 7);
const dayInMilliseconds = 24 * 60 * 60 * 1000;

const series: Series[] = [
  { id: "paper-city", title: "Paper City", season: "S2", selected: true, releases: ["2026-08-14", "2026-08-21", "2026-08-28", "2026-09-04", "2026-09-11", "2026-09-18", "2026-09-25", "2026-10-02", "2026-10-09"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "signal-lost", title: "Signal Lost", season: "S4", selected: true, releases: ["2026-09-10", "2026-09-17", "2026-09-24", "2026-10-01", "2026-10-08", "2026-10-15", "2026-10-22", "2026-10-29"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "northfall", title: "Northfall", season: "S3", selected: true, releases: ["2026-09-23", "2026-09-30", "2026-10-07", "2026-10-14", "2026-10-21", "2026-10-28", "2026-11-04", "2026-11-11", "2026-11-18", "2026-11-25"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "the-long-game", title: "The Long Game", season: "S1", selected: true, releases: ["2026-11-04", "2026-11-11", "2026-11-18", "2026-11-25", "2026-12-02", "2026-12-09", "2026-12-16", "2026-12-23", "2026-12-30", "2027-01-06", "2027-01-13"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "oracle", title: "Oracle", season: "S2", selected: true, fullRelease: true, releases: [{ date: "2026-12-11", label: "Full release" }] },
  { id: "quiet-harbour", title: "Quiet Harbour", season: "S5", selected: false, releases: ["2026-12-28", "2027-01-04", "2027-01-11", "2027-01-18", "2027-01-25", "2027-02-01", "2027-02-08"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "thread", title: "Thread", season: "S1", selected: false, releases: ["2027-01-22", "2027-01-29", "2027-02-05", "2027-02-12", "2027-02-19", "2027-02-26", "2027-03-05", "2027-03-12", "2027-03-19", "2027-03-26"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
  { id: "endline", title: "Endline", season: "S3", selected: false, releases: ["2027-02-15", "2027-02-22", "2027-03-01", "2027-03-08", "2027-03-15", "2027-03-22", "2027-03-29", "2027-04-05", "2027-04-12"].map((date, index, dates) => ({ date, label: index === dates.length - 1 ? "Finale" : `E${index + 1}` })) },
];

function releaseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addWeeks(date: Date, weeks: number) {
  return new Date(date.getTime() + weeks * 7 * dayInMilliseconds);
}

function formatWeek(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date);
}

function formatRangeDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function getMonthGroups(startWeek: number, weeks: number) {
  const groups: { key: string; label: string; span: number }[] = [];
  for (let index = 0; index < weeks; index += 1) {
    const date = addWeeks(calendarStart, startWeek + index);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
    const previous = groups.at(-1);
    if (previous?.key === key) previous.span += 1;
    else groups.push({ key, label, span: 1 });
  }
  return groups;
}

function datePosition(date: Date, start: Date, end: Date) {
  if (date < start) return -1;
  if (date >= end) return 101;
  return ((date.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
}

function estimateTextWidth(value: string) {
  return value.length * 5.8;
}

function estimateSeriesLabelWidth(show: Series) {
  const separatorWidth = 3;
  const internalGaps = 16;
  const horizontalPadding = 28;
  return estimateTextWidth(show.title) + estimateTextWidth(show.season) + separatorWidth + internalGaps + horizontalPadding + 4;
}

function packIntoLanes(entries: PreparedSeries[]) {
  const laneGap = 16;
  const lanes: PreparedSeries[][] = [];
  const laneEnds: number[] = [];
  [...entries].sort((a, b) => a.visualStart - b.visualStart || a.visualEnd - b.visualEnd).forEach((entry) => {
    const availableLane = laneEnds.findIndex((end) => entry.visualStart >= end + laneGap);
    const laneIndex = availableLane === -1 ? lanes.length : availableLane;
    if (!lanes[laneIndex]) lanes[laneIndex] = [];
    lanes[laneIndex].push(entry);
    laneEnds[laneIndex] = entry.visualEnd;
  });
  return lanes;
}

export function WatchlistReleasePlanner() {
  const [visibleWeeks, setVisibleWeeks] = useState(25);
  const [startWeek, setStartWeek] = useState(0);
  const [chartWidth, setChartWidth] = useState(900);
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(series.filter((show) => show.selected).map((show) => show.id)),
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const updateWidth = () => setChartWidth(Math.max(1, chart.getBoundingClientRect().width));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(chart);
    return () => observer.disconnect();
  }, []);

  const viewStart = addWeeks(calendarStart, startWeek);
  const viewEnd = addWeeks(viewStart, visibleWeeks);
  const monthGroups = useMemo(() => getMonthGroups(startWeek, visibleWeeks), [startWeek, visibleWeeks]);
  const showWeekLabels = visibleWeeks <= 10;
  const selectedSeries = series.filter((show) => selectedIds.has(show.id));
  const visibleSeries = selectedSeries.filter((show) => {
    const firstRelease = releaseDate(show.releases[0].date);
    const finalRelease = releaseDate(show.releases.at(-1)!.date);
    return finalRelease >= viewStart && firstRelease < viewEnd;
  });
  const offRangeCount = selectedSeries.length - visibleSeries.length;
  const preparedSeries: PreparedSeries[] = visibleSeries.map((show) => {
    const parsedReleases = show.releases.map((episode) => ({ ...episode, parsedDate: releaseDate(episode.date) }));
    const positions = parsedReleases.map((episode) => datePosition(episode.parsedDate, viewStart, viewEnd));
    const pixelsPerWeek = chartWidth / visibleWeeks;
    const releases = parsedReleases.map((episode, index) => {
      const position = positions[index];
      const previousPosition = positions[index - 1];
      const nextPosition = positions[index + 1];
      const availableLabelSpace = episode.label === "Finale"
        ? previousPosition === undefined ? Infinity : ((position - previousPosition) / 100) * chartWidth
        : nextPosition === undefined ? Infinity : ((nextPosition - position) / 100) * chartWidth;
      const requiredLabelSpace = estimateTextWidth(episode.label) + 18;
      const showLabel = show.fullRelease
        ? pixelsPerWeek >= 48
        : pixelsPerWeek >= 42 && availableLabelSpace >= requiredLabelSpace;
      return { ...episode, position, index, showLabel };
    });
    const actualStart = positions[0];
    const actualEnd = positions.at(-1)!;
    const displayStart = Math.max(actualStart, 0);
    const displayEnd = Math.min(actualEnd, 100);
    const visibleReleases = releases.filter((episode) => episode.position >= 0 && episode.position <= 100);
    const barStyle = {
      "--bar-start": displayStart,
      "--bar-span": Math.max(displayEnd - displayStart, 0),
    } as CSSProperties;
    const barLeft = (displayStart / 100) * chartWidth - 17;
    const fullReleaseLabelVisible = show.fullRelease && releases.some((episode) => episode.showLabel);
    const barWidth = show.fullRelease ? (fullReleaseLabelVisible ? 92 : 34) : ((displayEnd - displayStart) / 100) * chartWidth + 34;
    let visualStart = barLeft - estimateSeriesLabelWidth(show);
    let visualEnd = barLeft + barWidth;

    visibleReleases.forEach((episode) => {
      if (!episode.showLabel) return;
      const markerX = (episode.position / 100) * chartWidth;
      const labelWidth = estimateTextWidth(episode.label);
      if (episode.label === "Finale") visualStart = Math.min(visualStart, markerX - 9 - labelWidth);
      else visualEnd = Math.max(visualEnd, markerX + 9 + labelWidth);
    });

    return { show, releases, visibleReleases, actualStart, actualEnd, barStyle, visualStart, visualEnd };
  });
  const packedLanes = packIntoLanes(preparedSeries);

  function toggleSeries(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function changeVisibleWeeks(nextVisibleWeeks: number) {
    setStartWeek((current) => current + (visibleWeeks - nextVisibleWeeks) / 2);
    setVisibleWeeks(nextVisibleWeeks);
  }

  const gridStyle = { "--column-count": visibleWeeks } as CSSProperties;
  const navigationStep = visibleWeeks / 2;

  return (
    <main className="watchlist-gantt">
      <header className="watchlist-gantt__nav">
        <a href="/watchlist" className="watchlist-gantt__wordmark">Watchlist</a>
        <nav aria-label="Watchlist navigation">
          <span>Discover</span>
          <span>My shows</span>
          <span className="is-active">Releases</span>
        </nav>
        <span className="watchlist-gantt__profile" aria-label="Account">GD</span>
      </header>

      <section className="watchlist-gantt__content" aria-labelledby="planner-title">
        <div className="watchlist-gantt__workspace">
        <section className="watchlist-gantt__timeline" aria-label={`${visibleWeeks}-week Gantt release planner`}>
          <header className="watchlist-gantt__timeline-heading">
            <div><p>My shows / Releases</p><h1 id="planner-title">Release planner</h1></div>
            <div className="watchlist-gantt__legend" aria-label="Release key">
              <span><i className="is-line" /> Weekly release</span>
              <span><i className="is-drop" /> Full release</span>
            </div>
          </header>
          <header className="watchlist-gantt__timeline-controls">
            <button type="button" onClick={() => setStartWeek((current) => current - navigationStep)} aria-label="Show earlier dates">← <span>Previous</span></button>
            <div className="watchlist-gantt__zoom-slider">
              <label htmlFor="release-planner-zoom"><span>Zoom</span><output htmlFor="release-planner-zoom">{visibleWeeks} weeks</output></label>
              <input id="release-planner-zoom" type="range" min="6" max="25" step="1" value={visibleWeeks} onChange={(event) => changeVisibleWeeks(Number(event.target.value))} aria-label={`Timeline zoom, ${visibleWeeks} weeks visible`} />
              <div aria-hidden="true"><span>Close</span><span>Zoomed out</span></div>
            </div>
            <button type="button" onClick={() => setStartWeek((current) => current + navigationStep)} aria-label="Show later dates"><span>Next</span> →</button>
          </header>

          <div className="watchlist-gantt__date-range">{formatRangeDate(viewStart)} — {formatRangeDate(viewEnd)}</div>
          <div className="watchlist-gantt__scroll" tabIndex={0} aria-label="Release calendar">
            <div ref={chartRef} className="watchlist-gantt__chart" style={gridStyle}>
              <div className="watchlist-gantt__months" style={gridStyle}>
                {monthGroups.map((month) => <span key={month.key} style={{ gridColumn: `span ${month.span}` }}>{month.label}</span>)}
              </div>
              {showWeekLabels ? <div className="watchlist-gantt__weeks" style={gridStyle}>{Array.from({ length: visibleWeeks }, (_, index) => <span key={index}>Week of {formatWeek(addWeeks(calendarStart, startWeek + index))}</span>)}</div> : null}
              <div className="watchlist-gantt__rows">
                {packedLanes.map((lane, laneIndex) => <article key={laneIndex} className="watchlist-gantt__row" style={gridStyle} aria-label={`Release lane ${laneIndex + 1}: ${lane.map((entry) => entry.show.title).join(", ")}`}>
                    <div className="watchlist-gantt__guides" aria-hidden="true" style={gridStyle}>
                      {Array.from({ length: visibleWeeks }, (_, index) => <span key={index} />)}
                    </div>
                    {lane.map(({ show, releases, visibleReleases, actualStart, actualEnd, barStyle }) => <div key={show.id} className="watchlist-gantt__series-placement" aria-label={`${show.title}, ${show.season}, releases from ${formatRangeDate(releases[0].parsedDate)} to ${formatRangeDate(releases.at(-1)!.parsedDate)}`}>
                      <div className={`watchlist-gantt__bar${show.fullRelease ? " is-full-release" : ""}${show.fullRelease && releases.some((episode) => episode.showLabel) ? " has-release-label" : ""}${actualEnd > 100 ? " is-end-clipped" : ""}${actualStart < 0 ? " is-start-clipped" : ""}`} style={barStyle}>
                        <strong className="watchlist-gantt__bar-title"><span>{show.title}</span><em><span aria-hidden="true">·</span>{show.season}</em></strong>
                      </div>
                      <div className="watchlist-gantt__event-layer">{visibleReleases.map((episode) => {
                        return <span key={`${show.id}-${episode.date}`} className={`watchlist-gantt__episode-event${episode.showLabel ? " is-labelled" : ""}${episode.label === "Finale" ? " is-finale" : ""}${show.fullRelease ? " is-full-release" : ""}`} style={{ "--event-x": episode.position } as CSSProperties} aria-label={`${episode.label}, ${formatRangeDate(episode.parsedDate)}`}>
                          {episode.showLabel ? <small>{episode.label}</small> : null}<i aria-hidden="true" />
                        </span>;
                      })}</div>
                    </div>)}
                  </article>)}
                {packedLanes.length === 0 ? <div className="watchlist-gantt__empty">No selected series release during this period. Try a different range or add a lane above.</div> : null}
              </div>
            </div>
          </div>
          <footer className="watchlist-gantt__timeline-note">
            <span>Each lane shows a season’s release window, not your viewing progress.</span>
            {offRangeCount > 0 ? <span>{offRangeCount} selected {offRangeCount === 1 ? "series is" : "series are"} outside this range.</span> : <span>Episode dots show the release cadence.</span>}
          </footer>
        </section>
        <aside className="watchlist-gantt__picker" aria-labelledby="picker-title">
          <div className="watchlist-gantt__picker-heading">
            <div><p>Series in view</p><h2 id="picker-title">Choose your shows</h2></div>
            <span>{selectedIds.size} of {series.length} selected</span>
          </div>
          <div className="watchlist-gantt__checkboxes">
            {series.map((show) => (
              <label key={show.id}>
                <input type="checkbox" checked={selectedIds.has(show.id)} onChange={() => toggleSeries(show.id)} />
                <span>{show.title}</span><small>{show.season}</small>
              </label>
            ))}
          </div>
        </aside>
        </div>
      </section>
    </main>
  );
}
