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

type StableLaneLayout = {
  laneBySeriesId: Map<string, number>;
  laneCount: number;
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

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * dayInMilliseconds);
}

function formatWeek(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date);
}

function formatDay(date: Date, includeWeekday: boolean) {
  return new Intl.DateTimeFormat("en-GB", includeWeekday ? { weekday: "short", day: "numeric" } : { day: "numeric" }).format(date);
}

function formatRangeDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(date);
}

function getMonthGroups(startDay: number, days: number) {
  const groups: { key: string; label: string; span: number; showLabel: boolean }[] = [];
  for (let index = 0; index < days; index += 1) {
    const date = addDays(calendarStart, startDay + index);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
    const previous = groups.at(-1);
    if (previous?.key === key) previous.span += 1;
    else groups.push({ key, label, span: 1, showLabel: true });
  }

  const dayBeforeView = addDays(calendarStart, startDay - 1);
  const dayAfterView = addDays(calendarStart, startDay + days);
  const dayBeforeKey = `${dayBeforeView.getFullYear()}-${dayBeforeView.getMonth()}`;
  const dayAfterKey = `${dayAfterView.getFullYear()}-${dayAfterView.getMonth()}`;

  if (groups[0]?.key === dayBeforeKey) groups[0].showLabel = false;
  if (groups.at(-1)?.key === dayAfterKey) groups.at(-1)!.showLabel = false;

  return groups;
}

function getYearGroups(startDay: number, days: number) {
  const groups: { key: string; label: string; span: number }[] = [];
  for (let index = 0; index < days; index += 1) {
    const date = addDays(calendarStart, startDay + index);
    const key = String(date.getFullYear());
    const previous = groups.at(-1);
    if (previous?.key === key) previous.span += 1;
    else groups.push({ key, label: key, span: 1 });
  }
  return groups;
}

function getWeekGroups(startDay: number, days: number) {
  return Array.from({ length: Math.ceil(days / 7) }, (_, index) => {
    const offset = index * 7;
    return { key: offset, label: formatWeek(addDays(calendarStart, startDay + offset)), span: Math.min(7, days - offset) };
  });
}

function formatZoomLabel(days: number) {
  if (days < 14) return `${days} ${days === 1 ? "day" : "days"}`;
  if (days % 7 === 0) {
    const weeks = days / 7;
    return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }
  return `${days} days`;
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
  const releaseTypeWidth = show.fullRelease
    ? separatorWidth + internalGaps + estimateTextWidth("Full release")
    : 0;
  return estimateTextWidth(show.title) + estimateTextWidth(show.season) + separatorWidth + internalGaps + releaseTypeWidth + horizontalPadding + 4;
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

function getStableLaneLayout(shows: Series[], chartWidth: number, referenceDays: number): StableLaneLayout {
  const pixelsPerDay = chartWidth / referenceDays;
  const laneGap = 16;
  const labelSafety = 40;
  const laneEnds: number[] = [];
  const laneBySeriesId = new Map<string, number>();
  const entries = shows.map((show) => {
    const firstRelease = releaseDate(show.releases[0].date);
    const finalRelease = releaseDate(show.releases.at(-1)!.date);
    const firstX = ((firstRelease.getTime() - calendarStart.getTime()) / dayInMilliseconds) * pixelsPerDay;
    const finalX = ((finalRelease.getTime() - calendarStart.getTime()) / dayInMilliseconds) * pixelsPerDay;
    const barStart = firstX - 17;
    const barEnd = show.fullRelease ? barStart + 92 : finalX + 17;
    return {
      id: show.id,
      visualStart: barStart - estimateSeriesLabelWidth(show),
      visualEnd: barEnd + labelSafety,
    };
  });

  entries
    .sort((a, b) => a.visualStart - b.visualStart || a.visualEnd - b.visualEnd)
    .forEach((entry) => {
      const availableLane = laneEnds.findIndex((end) => entry.visualStart >= end + laneGap);
      const laneIndex = availableLane === -1 ? laneEnds.length : availableLane;
      laneEnds[laneIndex] = entry.visualEnd;
      laneBySeriesId.set(entry.id, laneIndex);
    });

  return { laneBySeriesId, laneCount: laneEnds.length };
}

export function WatchlistReleasePlanner({ version = "v1", embedded = false }: { version?: "v1" | "v2" | "v3"; embedded?: boolean } = {}) {
  const [visibleDays, setVisibleDays] = useState(175);
  const [startDay, setStartDay] = useState(0);
  const [chartWidth, setChartWidth] = useState(900);
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set((version === "v3" ? series : series.filter((show) => show.selected)).map((show) => show.id)),
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

  const viewStart = addDays(calendarStart, startDay);
  const viewEnd = addDays(viewStart, visibleDays);
  const viewEndDate = addDays(viewEnd, -1);
  const monthGroups = useMemo(() => getMonthGroups(startDay, visibleDays), [startDay, visibleDays]);
  const yearGroups = useMemo(() => getYearGroups(startDay, visibleDays), [startDay, visibleDays]);
  const weekGroups = useMemo(() => getWeekGroups(startDay, visibleDays), [startDay, visibleDays]);
  const showDayLabels = visibleDays <= 35;
  const showWeekLabels = visibleDays > 35 && visibleDays <= 70;
  const hidePartialMonthLabels = visibleDays >= 210;
  const selectedSeries = series.filter((show) => selectedIds.has(show.id));
  const visibleSeries = selectedSeries.filter((show) => {
    const firstRelease = releaseDate(show.releases[0].date);
    const finalRelease = releaseDate(show.releases.at(-1)!.date);
    return finalRelease >= viewStart && firstRelease < viewEnd;
  });
  const offRangeCount = selectedSeries.length - visibleSeries.length;
  const stableLaneLayout = useMemo(
    () => getStableLaneLayout(series.filter((show) => selectedIds.has(show.id)), chartWidth, 365),
    [selectedIds, chartWidth],
  );
  const preparedSeries: PreparedSeries[] = visibleSeries.map((show) => {
    const parsedReleases = show.releases.map((episode) => ({ ...episode, parsedDate: releaseDate(episode.date) }));
    const positions = parsedReleases.map((episode) => datePosition(episode.parsedDate, viewStart, viewEnd));
    const pixelsPerDay = chartWidth / visibleDays;
    const releases = parsedReleases.map((episode, index) => {
      const position = positions[index];
      const previousPosition = positions[index - 1];
      const nextPosition = positions[index + 1];
      const availableLabelSpace = episode.label === "Finale"
        ? previousPosition === undefined ? Infinity : ((position - previousPosition) / 100) * chartWidth
        : nextPosition === undefined ? Infinity : ((nextPosition - position) / 100) * chartWidth;
      const requiredLabelSpace = estimateTextWidth(episode.label) + 18;
      const showLabel = show.fullRelease
        ? version !== "v1" || pixelsPerDay >= (48 / 7)
        : pixelsPerDay >= 6 && availableLabelSpace >= requiredLabelSpace;
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
      "--series-label-width": `${estimateSeriesLabelWidth(show)}px`,
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
  const isModernPlanner = version === "v2" || version === "v3";
  const packedLanes = isModernPlanner
    ? Array.from({ length: stableLaneLayout.laneCount }, (_, laneIndex) =>
        preparedSeries.filter((entry) => stableLaneLayout.laneBySeriesId.get(entry.show.id) === laneIndex),
      )
    : packIntoLanes(preparedSeries);

  function toggleSeries(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function changeVisibleDays(nextVisibleDays: number) {
    setStartDay((current) => current + (visibleDays - nextVisibleDays) / 2);
    setVisibleDays(nextVisibleDays);
  }

  function changeTimelineCenter(nextCenterDay: number) {
    setStartDay(nextCenterDay - visibleDays / 2);
  }

  const gridStyle = { "--column-count": visibleDays } as CSSProperties;
  const navigationStep = visibleDays / 2;
  const timelineCenterDay = startDay + visibleDays / 2;
  const timelineCenterDate = addDays(calendarStart, timelineCenterDay);
  const visualVersion = version === "v3" ? "v2" : version;
  const Root = embedded ? "section" : "main";

  return (
    <Root className={`watchlist-gantt watchlist-gantt--${visualVersion}${embedded ? " watchlist-gantt--embedded" : ""}`} data-planner-version={version} aria-label={embedded ? "Interactive release planner" : undefined}>
      {embedded ? null : <header className="watchlist-gantt__nav">
        <a href="/watchlist" className="watchlist-gantt__wordmark">Watchlist</a>
        <nav aria-label="Watchlist navigation">
          <span>Discover</span>
          <span>My shows</span>
          <span className="is-active">Releases</span>
        </nav>
        <span className="watchlist-gantt__profile" aria-label="Account">GD</span>
      </header>}

      <section className="watchlist-gantt__content" aria-labelledby="planner-title">
        <div className="watchlist-gantt__workspace">
        <section className="watchlist-gantt__timeline" aria-label={`${formatZoomLabel(visibleDays)} Gantt release planner`}>
          <header className="watchlist-gantt__timeline-heading">
            <div><p>My shows / Releases</p><h1 id="planner-title">Release planner</h1></div>
            {version !== "v3" ? <div className="watchlist-gantt__legend" aria-label="Release key">
              <span><i className="is-line" /> Weekly release</span>
              <span><i className="is-drop" /> Full release</span>
            </div> : null}
          </header>
          {isModernPlanner ? <section className="watchlist-gantt__control-panel" aria-label="Timeline controls">
            <div className="watchlist-gantt__slider-control watchlist-gantt__zoom-slider">
              <label htmlFor="release-planner-zoom"><span>Zoom</span><output htmlFor="release-planner-zoom">{formatZoomLabel(visibleDays)}</output></label>
              <input id="release-planner-zoom" type="range" min="14" max="365" step="1" value={visibleDays} onChange={(event) => changeVisibleDays(Number(event.target.value))} aria-label={`Timeline zoom, ${formatZoomLabel(visibleDays)} visible`} dir="rtl" />
            </div>
            <div className="watchlist-gantt__slider-control watchlist-gantt__time-slider">
              <label htmlFor="release-planner-time"><span>Position</span><output htmlFor="release-planner-time">{formatMonthYear(timelineCenterDate)}</output></label>
              <div className="watchlist-gantt__time-track">
                <span className="watchlist-gantt__today-marker" aria-hidden="true">Today</span>
                <input id="release-planner-time" type="range" min="-90" max="455" step="1" value={timelineCenterDay} onChange={(event) => changeTimelineCenter(Number(event.target.value))} aria-label={`Timeline centred on ${formatRangeDate(timelineCenterDate)}; centre marker indicates today`} />
              </div>
            </div>
            <div className="watchlist-gantt__control-range" aria-label="Visible range"><strong>{formatRangeDate(viewStart)} — {formatRangeDate(viewEndDate)}</strong></div>
          </section> : <header className="watchlist-gantt__timeline-controls">
            <button type="button" onClick={() => setStartDay((current) => current - navigationStep)} aria-label="Show earlier dates">← <span>Previous</span></button>
            <div className="watchlist-gantt__zoom-slider">
              <label htmlFor="release-planner-zoom"><span>Zoom</span><output htmlFor="release-planner-zoom">{formatZoomLabel(visibleDays)}</output></label>
              <input id="release-planner-zoom" type="range" min="14" max="365" step="1" value={visibleDays} onChange={(event) => changeVisibleDays(Number(event.target.value))} aria-label={`Timeline zoom, ${formatZoomLabel(visibleDays)} visible`} />
              <div aria-hidden="true"><span>Close</span><span>Zoomed out</span></div>
            </div>
            <button type="button" onClick={() => setStartDay((current) => current + navigationStep)} aria-label="Show later dates"><span>Next</span> →</button>
          </header>}

          {version === "v1" ? <div className="watchlist-gantt__date-range">{formatRangeDate(viewStart)} — {formatRangeDate(viewEndDate)}</div> : null}
          <div className="watchlist-gantt__scroll" tabIndex={0} aria-label="Release calendar">
            <div ref={chartRef} className="watchlist-gantt__chart" style={gridStyle}>
              <div className={`watchlist-gantt__months${isModernPlanner && !showDayLabels && !showWeekLabels ? " is-years" : ""}`} style={gridStyle}>
                {isModernPlanner && !showDayLabels && !showWeekLabels
                  ? yearGroups.map((year) => <span key={year.key} style={{ gridColumn: `span ${year.span}` }}>{year.label}</span>)
                  : monthGroups.map((month) => <span key={month.key} style={{ gridColumn: `span ${month.span}` }} aria-hidden={hidePartialMonthLabels && !month.showLabel}>{!hidePartialMonthLabels || month.showLabel ? month.label : null}</span>)}
              </div>
              {isModernPlanner ? <div className={`watchlist-gantt__weeks is-visible${showDayLabels ? " is-day-detail" : showWeekLabels ? " is-week-detail" : " is-month-summary"}${visibleDays >= 210 ? " is-compact" : ""}`} style={gridStyle}>
                {showDayLabels
                  ? Array.from({ length: visibleDays }, (_, index) => <span key={index}>{formatDay(addDays(calendarStart, startDay + index), visibleDays <= 14)}</span>)
                  : showWeekLabels
                    ? weekGroups.map((week) => <span key={week.key} style={{ gridColumn: `span ${week.span}` }}>Week of {week.label}</span>)
                    : monthGroups.map((month) => <span key={month.key} style={{ gridColumn: `span ${month.span}` }} aria-hidden={hidePartialMonthLabels && !month.showLabel}>{!hidePartialMonthLabels || month.showLabel ? month.label : null}</span>)}
              </div> : showDayLabels || showWeekLabels ? <div className={`watchlist-gantt__weeks is-visible${showDayLabels ? " is-day-detail" : " is-week-detail"}`} style={gridStyle}>{showDayLabels
                ? Array.from({ length: visibleDays }, (_, index) => <span key={index}>{formatDay(addDays(calendarStart, startDay + index), visibleDays <= 14)}</span>)
                : weekGroups.map((week) => <span key={week.key} style={{ gridColumn: `span ${week.span}` }}>Week of {week.label}</span>)}</div> : null}
              <div className="watchlist-gantt__rows">
                {isModernPlanner ? <div className="watchlist-gantt__month-fields" aria-hidden="true" style={gridStyle}>{monthGroups.map((month) => <span key={month.key} style={{ gridColumn: `span ${month.span}` }} />)}</div> : null}
                {packedLanes.map((lane, laneIndex) => <article key={laneIndex} className="watchlist-gantt__row" style={gridStyle} aria-label={`Release lane ${laneIndex + 1}: ${lane.map((entry) => entry.show.title).join(", ")}`}>
                    {showDayLabels || showWeekLabels ? <div className="watchlist-gantt__guides is-detailed" aria-hidden="true" style={gridStyle}>
                      {Array.from({ length: visibleDays }, (_, index) => <span key={index} />)}
                    </div> : null}
                    {lane.map(({ show, releases, visibleReleases, actualStart, actualEnd, barStyle }) => <div key={show.id} className="watchlist-gantt__series-placement" data-series={show.id} aria-label={`${show.title}, ${show.season}, releases from ${formatRangeDate(releases[0].parsedDate)} to ${formatRangeDate(releases.at(-1)!.parsedDate)}`}>
                      <div className={`watchlist-gantt__bar${show.fullRelease ? " is-full-release" : ""}${show.fullRelease && releases.some((episode) => episode.showLabel) ? " has-release-label" : ""}${actualEnd > 100 ? " is-end-clipped" : ""}${actualStart < 0 ? " is-start-clipped" : ""}`} style={barStyle}>
                        <strong className="watchlist-gantt__bar-title"><span>{show.title}</span><em><span aria-hidden="true">·</span>{show.season}{show.fullRelease ? <><span aria-hidden="true">·</span><span>Full release</span></> : null}</em></strong>
                      </div>
                      <div className="watchlist-gantt__event-layer">{visibleReleases.map((episode) => {
                        return <span key={`${show.id}-${episode.date}`} className={`watchlist-gantt__episode-event${episode.showLabel ? " is-labelled" : ""}${episode.label === "Finale" ? " is-finale" : ""}${show.fullRelease ? " is-full-release" : ""}`} style={{ "--event-x": episode.position } as CSSProperties} aria-label={`${episode.label}, ${formatRangeDate(episode.parsedDate)}`}>
                          {episode.showLabel && !show.fullRelease ? <small>{episode.label}</small> : null}<i aria-hidden="true" />
                        </span>;
                      })}</div>
                    </div>)}
                  </article>)}
                {isModernPlanner && selectedSeries.length === 0 ? <div className="watchlist-gantt__empty">Choose at least one series to build your release plan.</div> : null}
                {version === "v1" && packedLanes.length === 0 ? <div className="watchlist-gantt__empty">No selected series release during this period. Try a different range or add a lane above.</div> : null}
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
    </Root>
  );
}
