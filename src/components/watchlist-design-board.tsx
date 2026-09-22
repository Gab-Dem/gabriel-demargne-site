"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Point = { x: number; y: number };

const initialAssetPositions: Record<string, Point> = {
  planner: { x: 120, y: 120 },
  type: { x: 884, y: 120 },
  series: { x: 884, y: 429 },
  controls: { x: 884, y: 695 },
  selector: { x: 884, y: 859 },
  nav: { x: 1468, y: 120 },
  search: { x: 1468, y: 200 },
  show: { x: 1468, y: 433 },
  foundations: { x: 120, y: 744 },
  collection: { x: 884, y: 1083 },
  empty: { x: 1468, y: 1126 },
  actions: { x: 120, y: 1042 },
  toast: { x: 884, y: 1256 },
};
const boardLayoutStorageKey = "watchlist-design-board-layout-v4";
const boardAlignmentUnit = 8;
const boardSize = { width: 2148, height: 1460 };

function getInitialAssetPositions() {
  if (typeof window === "undefined") return initialAssetPositions;
  try {
    const savedLayout = window.localStorage.getItem(boardLayoutStorageKey);
    const parsedLayout = savedLayout ? JSON.parse(savedLayout) as Record<string, Point> : null;
    return parsedLayout && Object.keys(initialAssetPositions).every((key) => parsedLayout[key])
      ? parsedLayout
      : initialAssetPositions;
  } catch {
    window.localStorage.removeItem(boardLayoutStorageKey);
    return initialAssetPositions;
  }
}

export function WatchlistDesignBoard() {
  const [offset, setOffset] = useState<Point>({ x: 24, y: 24 });
  const [scale, setScale] = useState(1);
  const [assetPositions, setAssetPositions] = useState<Record<string, Point>>(getInitialAssetPositions);
  const [assetDrag, setAssetDrag] = useState<{ key: string; pointer: Point; position: Point } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ pointer: Point; offset: Point } | null>(null);

  const beginPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button, input, label, select, textarea")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointer: { x: event.clientX, y: event.clientY },
      offset,
    };
  };

  const movePan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    setOffset({
      x: dragStart.current.offset.x + event.clientX - dragStart.current.pointer.x,
      y: dragStart.current.offset.y + event.clientY - dragStart.current.pointer.y,
    });
  };

  const endPan = () => {
    dragStart.current = null;
  };

  useEffect(() => {
    window.localStorage.setItem(boardLayoutStorageKey, JSON.stringify(assetPositions));
  }, [assetPositions]);

  const startAssetDrag = (key: string, event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button, input, label, select, textarea")) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setAssetDrag({ key, pointer: { x: event.clientX, y: event.clientY }, position: assetPositions[key] });
  };

  useEffect(() => {
    if (!assetDrag) return;

    const moveAsset = (event: PointerEvent) => {
      setAssetPositions((current) => ({
        ...current,
        [assetDrag.key]: {
          x: assetDrag.position.x + (event.clientX - assetDrag.pointer.x) / scale,
          y: assetDrag.position.y + (event.clientY - assetDrag.pointer.y) / scale,
        },
      }));
    };
    const endAssetDrag = () => {
      setAssetPositions((current) => ({
        ...current,
        [assetDrag.key]: {
          x: Math.round(current[assetDrag.key].x / boardAlignmentUnit) * boardAlignmentUnit,
          y: Math.round(current[assetDrag.key].y / boardAlignmentUnit) * boardAlignmentUnit,
        },
      }));
      setAssetDrag(null);
    };

    window.addEventListener("pointermove", moveAsset);
    window.addEventListener("pointerup", endAssetDrag);
    window.addEventListener("pointercancel", endAssetDrag);
    return () => {
      window.removeEventListener("pointermove", moveAsset);
      window.removeEventListener("pointerup", endAssetDrag);
      window.removeEventListener("pointercancel", endAssetDrag);
    };
  }, [assetDrag, scale]);

  const assetProps = (key: string, width: "standard" | "wide" | "reference" = "standard") => ({
    "data-block-width": width,
    className: "design-board-block",
    style: { left: assetPositions[key].x, top: assetPositions[key].y },
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => startAssetDrag(key, event),
  });

  const fitBoard = useCallback(() => {
    const viewport = viewportRef.current?.getBoundingClientRect();
    if (!viewport) return;
    const nextScale = Math.min((viewport.width - 80) / boardSize.width, (viewport.height - 80) / boardSize.height);
    setScale(nextScale);
    setOffset({
      x: (viewport.width - boardSize.width * nextScale) / 2,
      y: (viewport.height - boardSize.height * nextScale) / 2,
    });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(fitBoard);
    return () => window.cancelAnimationFrame(frame);
  }, [fitBoard]);

  return (
    <main className="watchlist-design-board">
      <header className="watchlist-design-board__header">
        <a href="/watchlist">← Watchlist</a>
        <div>
          <p className="watchlist-ui-eyebrow">System workspace</p>
          <h1>Watchlist building blocks</h1>
        </div>
        <div className="watchlist-design-board__header-actions">
          <button type="button" onClick={fitBoard}>See all</button>
          <button type="button" onClick={() => { setScale(1); setOffset({ x: 24, y: 24 }); }}>100%</button>
          <button type="button" onClick={() => { window.localStorage.removeItem(boardLayoutStorageKey); setAssetPositions(initialAssetPositions); }}>Reset tiles</button>
        </div>
      </header>

      <div
        className="watchlist-design-board__viewport"
        ref={viewportRef}
        onPointerDown={beginPan}
        onPointerMove={movePan}
        onPointerUp={endPan}
        onPointerCancel={endPan}
      >
        <div className="watchlist-design-board__hint">Drag to pan · board spacing is not component spacing</div>
        <div
          className="watchlist-design-board__canvas"
          style={{ width: boardSize.width, height: boardSize.height, transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
        >
          <section {...assetProps("foundations")} className="design-board-block design-board-block--foundations">
            <div className="design-board-block__heading">
              <p className="watchlist-ui-eyebrow">Production UI</p>
              <h2>UI foundations</h2>
              <p>The UI has its own palette and 4px rhythm. Signal and Carbon remain references for wireframe work.</p>
            </div>
            <div className="design-board-swatches">
              <Swatch name="Canvas" token="--watchlist-canvas" />
              <Swatch name="Surface" token="--watchlist-surface" dark />
              <Swatch name="Raised" token="--watchlist-surface-raised" dark />
              <Swatch name="Series" token="--watchlist-series" />
              <Swatch name="Release" token="--watchlist-release" />
            </div>
            <div className="design-board-spacing" aria-label="Spacing scale">
              {[4, 8, 12, 16, 24, 32, 40].map((space) => (
                <span key={space}><i style={{ width: space }} />{space}</span>
              ))}
            </div>
          </section>

          <section {...assetProps("type")} className="design-board-block design-board-block--type">
            <p className="design-board-type__display">Release planner</p>
            <p className="design-board-type__section">Choose your shows</p>
            <p className="watchlist-ui-eyebrow">Series in view</p>
            <p className="design-board-type__body">Quiet editorial copy supports the working surface without competing with the schedule.</p>
          </section>

          <section {...assetProps("actions")} className="design-board-block design-board-block--actions">
            <div className="design-board-stack">
              <button className="watchlist-ui-action" type="button">Open the model <span>→</span></button>
              <span className="watchlist-ui-pill design-board-pill">Weekly release</span>
              <span className="watchlist-ui-pill design-board-pill design-board-pill--release"><i /> Full release</span>
            </div>
          </section>

          <section {...assetProps("controls")} className="design-board-block design-board-block--controls">
            <div className="design-board-control-sample">
              <div><span>Zoom</span><strong>148 days</strong></div>
              <input aria-label="Zoom example" type="range" defaultValue="62" />
            </div>
            <div className="design-board-control-sample">
              <div><span>Position</span><strong>November 2026</strong></div>
              <input aria-label="Position example" type="range" defaultValue="44" />
            </div>
          </section>

          <section {...assetProps("series", "wide")} className="design-board-block design-board-block--series">
            <div className="design-board-context-heading">
              <p className="watchlist-ui-eyebrow">Page-region pattern</p>
              <h2>Release planning lanes</h2>
              <p>These lanes belong inside a planning view; they are not standalone cards.</p>
            </div>
            <div className="design-board-series-lane">
              <span>Northfall <em>· S3</em></span>
              <div>{["E1", "E2", "E3", "E4", "E5"].map((episode) => <b key={episode}><i />{episode}</b>)}</div>
            </div>
            <div className="design-board-release-lane">
              <span>Oracle <em>· S2 · Full release</em></span><i />
            </div>
          </section>

          <section {...assetProps("selector")} className="design-board-block design-board-block--selector">
            <h2>Choose your shows</h2>
            {["Paper City", "Signal Lost", "Northfall"].map((show, index) => (
              <label key={show}><input type="checkbox" defaultChecked={index !== 1} /> <span>{show}</span><small>S{index + 2}</small></label>
            ))}
          </section>

          <section {...assetProps("planner", "reference")} className="design-board-block design-board-block--asset">
            <Image src="/watchlist/release-planner-v3-loop-frames/0001.png" alt="Release planner V3 overview" width={1440} height={990} />
            <div className="design-board-asset-caption">
              <h2>Working planner V3</h2>
              <p>The current planner uses the shared canvas, surface, series and release tokens. Its supporting text stays with the asset, without hidden media padding.</p>
            </div>
          </section>

          <section {...assetProps("nav", "wide")} className="design-board-block design-board-block--app-nav">
            <span className="design-board-wordmark">N</span>
            <nav><b>Home</b><b className="is-active">My shows</b><b>Search</b></nav>
            <i>GD</i>
          </section>

          <section {...assetProps("search")} className="design-board-block design-board-block--search">
            <div className="design-board-search-input">Search shows, people, genres <span>⌕</span></div>
            <div className="design-board-search-result"><i /><span><b>Paper City</b><small>Drama · 2026</small></span><button type="button">Save</button></div>
            <div className="design-board-search-result"><i /><span><b>Northfall</b><small>Thriller · 2026</small></span><button type="button">Saved</button></div>
          </section>

          <section {...assetProps("show", "wide")} className="design-board-block design-board-block--show-context">
            <div className="design-board-context-heading">
              <p className="watchlist-ui-eyebrow">Composed page region</p>
              <h2>Show detail</h2>
              <p>Summary, progress, episodes and availability gain meaning through their relationship on the page.</p>
            </div>

            <div className="design-board-show-summary">
              <div className="design-board-show__poster">Northfall</div>
              <div className="design-board-show__copy"><p className="watchlist-ui-eyebrow">Returning series · S3</p><h3>Northfall</h3><p>Winter has closed in. New episodes arrive weekly.</p><div><button className="watchlist-ui-action" type="button">Saved <span>✓</span></button><button type="button">Add to list</button></div></div>
            </div>

            <div className="design-board-show-support">
              <section className="design-board-progress">
                <p className="watchlist-ui-eyebrow">Your progress</p>
                <h3>6 of 9 episodes</h3>
                <div className="design-board-progress-track"><i /></div>
                <p>Next: E7 · The thaw</p>
              </section>

              <section className="design-board-providers">
                <p className="watchlist-ui-eyebrow">Where to watch</p>
                <div><i>+</i><span>Stream now on</span><b>Apple TV+</b></div>
                <div><i>◉</i><span>Available to rent</span><b>Prime Video</b></div>
              </section>
            </div>

            <section className="design-board-episodes" aria-label="Episode examples">
              {["E6 · The pass", "E7 · The thaw", "E8 · Final call"].map((episode, index) => <button key={episode} type="button"><i className={index === 0 ? "is-done" : ""} />{episode}<span>{index === 0 ? "Watched" : "Sep 18"}</span></button>)}
            </section>
          </section>

          <section {...assetProps("collection")} className="design-board-block design-board-block--collection">
            <h2>Friday night</h2>
            <p>4 saved shows</p>
            <div>{["Paper City", "Signal Lost", "Northfall", "Oracle"].map((show) => <span key={show}>{show}</span>)}</div>
          </section>

          <section {...assetProps("empty")} className="design-board-block design-board-block--empty">
            <i>+</i><h2>Nothing saved here yet</h2><p>Save a show and return to it when you’re ready.</p><button className="watchlist-ui-action" type="button">Explore shows</button>
          </section>

          <section {...assetProps("toast")} className="design-board-toast"><i>✓</i><span><b>Paper City saved</b><small>Added to My shows</small></span><button type="button">Undo</button></section>
        </div>
      </div>
    </main>
  );
}

function Swatch({ name, token, dark = false }: { name: string; token: string; dark?: boolean }) {
  return <span className={dark ? "design-board-swatch is-dark" : "design-board-swatch"}>
    <i style={{ background: `var(${token})` }} />
    <b>{name}</b>
  </span>;
}
