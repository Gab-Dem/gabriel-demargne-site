"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { UxPortfolioWorkspaceStage } from "@/data/ux-portfolio";
import { PortfolioSlideSections } from "@/components/portfolio-slide-sections";
import { WatchlistCaseStudyVisual } from "@/components/watchlist-case-study-visual";

export function UXPortfolioWorkspace({
  stages,
  title = "UX Portfolio",
  backHref = "/portfolio",
  backLabel = "Portfolio",
  usePortfolioSlideTemplate = false,
  useProjectNavigation = false,
}: {
  stages: readonly UxPortfolioWorkspaceStage[];
  title?: string;
  backHref?: string;
  backLabel?: string;
  usePortfolioSlideTemplate?: boolean;
  useProjectNavigation?: boolean;
}) {
  const [selectedSlug, setSelectedSlug] = useState(stages[0]?.slug ?? "");
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string | null>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const selectedIndex = stages.findIndex((stage) => stage.slug === selectedSlug);
  const resolvedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const selectedStage = stages[resolvedIndex] ?? null;
  const previousStage = resolvedIndex > 0 ? stages[resolvedIndex - 1] : null;
  const nextStage = resolvedIndex < stages.length - 1 ? stages[resolvedIndex + 1] : null;
  const galleryImages = selectedStage?.imageGallery ?? [];
  const hasGallery = galleryImages.length > 0;
  const hasVideo = Boolean(selectedStage?.videoSrc);
  const hasImage = Boolean(selectedStage?.imageSrc && selectedStage?.imageAlt);
  const hasVisualMedia = hasGallery || hasVideo || hasImage;
  const canExpandImage = hasImage && !hasGallery && !hasVideo && selectedStage?.allowExpand !== false;
  const hasCriticalContent = !selectedStage.hideTitle || Boolean(selectedStage.criticalText);
  const usesMediaCaptionFirst = selectedStage.contentOrder === "media-caption-first";
  const usesWatchlistTemplate = title === "Watchlist" || usePortfolioSlideTemplate;
  const projectNavigationItems = useProjectNavigation
    ? getProjectNavigationItems(stages)
    : [];
  const selectedProject = getStageProject(selectedStage.label);
  const visibleProjectTitle = selectedProject === "Design portfolio" ? null : selectedProject;
  const workspaceClassName = `ux-portfolio-workspace${usesWatchlistTemplate ? " ux-portfolio-workspace--watchlist" : ""}`;
  const imageClassName =
    [
      "ux-portfolio-workspace__image",
      selectedStage?.imageTreatment === "blurred"
        ? "ux-portfolio-workspace__image--blurred"
        : "",
      selectedStage?.imagePresentation === "compact-divider"
        ? "ux-portfolio-workspace__image--compact"
        : selectedStage?.imagePresentation === "framed"
          ? "ux-portfolio-workspace__image--framed"
          : "",
    ]
      .filter(Boolean)
      .join(" ");
  const galleryClassName =
    selectedStage?.galleryLayout === "full-width"
      ? "ux-portfolio-workspace__image-gallery ux-portfolio-workspace__image-gallery--full-width"
      : selectedStage?.galleryLayout === "landscape-pair"
        ? "ux-portfolio-workspace__image-gallery ux-portfolio-workspace__image-gallery--landscape-pair"
      : "ux-portfolio-workspace__image-gallery";
  const galleryImageClassName =
    selectedStage?.galleryLayout === "full-width"
      ? "ux-portfolio-workspace__image ux-portfolio-workspace__image--gallery ux-portfolio-workspace__image--gallery-full-width"
      : selectedStage?.galleryLayout === "landscape-pair"
        ? "ux-portfolio-workspace__image ux-portfolio-workspace__image--gallery ux-portfolio-workspace__image--gallery-landscape"
        : "ux-portfolio-workspace__image ux-portfolio-workspace__image--gallery";

  useEffect(() => {
    if (!selectedStage?.guideSections?.length) {
      return;
    }

    const sections = selectedStage.guideSections
      .map((section) => document.getElementById(sectionAnchorId(selectedStage.slug, section.title)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          setActiveSectionTitle(visible.target.getAttribute("data-section-title"));
        }
      },
      { root: mainScrollRef.current, rootMargin: "-12% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    const scrollContainer = mainScrollRef.current;
    const handleScroll = () => {
      if (scrollContainer && scrollContainer.scrollTop < 24) {
        setActiveSectionTitle("__intro");
      }
    };
    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [selectedStage]);

  if (!selectedStage) {
    return null;
  }

  const leadingBenchmarkSummary =
    selectedStage.slug === "benchmark"
      ? selectedStage.guideSections?.find((section) => section.title === "Benchmark summary")
      : undefined;
  const remainingGuideSections = (selectedStage.guideSections ?? []).filter(
    (section) => section !== leadingBenchmarkSummary,
  );
  const toolSummarySections = remainingGuideSections.filter((section) => section.title.endsWith(" – Summary"));
  const displayedGuideSections = remainingGuideSections.filter((section) => !section.title.endsWith(" – Summary"));
  const leadingBenchmarkSummaryBlock = leadingBenchmarkSummary ? (
    <section
      id={sectionAnchorId(selectedStage.slug, leadingBenchmarkSummary.title)}
      data-section-title={leadingBenchmarkSummary.title}
      className="ux-portfolio-workspace__guide-section ux-portfolio-workspace__guide-section--summary ux-portfolio-workspace__guide-section--leading-summary"
    >
      <SummaryVisual />
    </section>
  ) : null;

  const mediaBlock = hasGallery ? (
    <>
      <div className={galleryClassName} aria-label={`${selectedStage.title} image gallery`}>
        {galleryImages.map((image, index) => (
          <div key={image.src} className="ux-portfolio-workspace__image-gallery-entry">
            <div className="ux-portfolio-workspace__image-gallery-item">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 900}
                height={image.height ?? 1600}
                sizes={
                  selectedStage?.galleryLayout === "full-width"
                    ? "(max-width: 800px) 100vw, 60vw"
                    : selectedStage?.galleryLayout === "landscape-pair"
                      ? "(max-width: 800px) 100vw, 48vw"
                    : "(max-width: 800px) 100vw, 30vw"
                }
                className={galleryImageClassName}
              />
            </div>
            {selectedStage.galleryItemDivider && index < galleryImages.length - 1 ? (
              <div
                className="ux-portfolio-workspace__image-gallery-divider"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </>
  ) : hasVideo ? (
    <>
      <div className="ux-portfolio-workspace__image-stage ux-portfolio-workspace__video-stage">
        <video
          key={selectedStage.videoSrc}
          className="ux-portfolio-workspace__video"
          aria-label={selectedStage.videoAlt}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={selectedStage.videoPoster}
        >
          <source src={selectedStage.videoSrc} type={selectedStage.videoType ?? "video/mp4"} />
        </video>
      </div>
    </>
  ) : hasImage ? (
    <>
      {canExpandImage ? (
        <button
          type="button"
          className="ux-portfolio-workspace__image-stage"
          onClick={() => setIsImageExpanded(true)}
          aria-label={`Expand image for ${selectedStage.title}`}
        >
          <Image
            src={selectedStage.imageSrc!}
            alt={selectedStage.imageAlt!}
            width={selectedStage.imageWidth ?? 1600}
            height={selectedStage.imageHeight ?? 900}
            sizes="(max-width: 800px) 100vw, 60vw"
            className={imageClassName}
          />
        </button>
      ) : (
        <div className="ux-portfolio-workspace__image-stage">
          <Image
            src={selectedStage.imageSrc!}
            alt={selectedStage.imageAlt!}
            width={selectedStage.imageWidth ?? 1600}
            height={selectedStage.imageHeight ?? 900}
            sizes="(max-width: 800px) 100vw, 60vw"
            className={imageClassName}
          />
        </div>
      )}
      {selectedStage.imagePresentation === "compact-divider" ? (
        <div className="ux-portfolio-workspace__image-divider" aria-hidden="true" />
      ) : null}
    </>
  ) : null;

  const studyArtifact = selectedStage.slideSections?.length ? (
    <PortfolioSlideSections sections={selectedStage.slideSections} />
  ) : selectedStage.caseStudyVisual ? (
    <WatchlistCaseStudyVisual type={selectedStage.caseStudyVisual} />
  ) : selectedStage.interactivePrototype === "watchlist-planning-horizon" && selectedStage.prototypeHref ? (
    <Link className="watchlist-prototype-link" href={selectedStage.prototypeHref} target="_blank" rel="noreferrer">
      Open the functional prototype <span aria-hidden="true">→</span>
    </Link>
  ) : null;
  const afterCriticalArtifact = selectedStage.afterCriticalVisual ? (
    <WatchlistCaseStudyVisual type={selectedStage.afterCriticalVisual} />
  ) : null;
  const usesHeadingPrototypeButton =
    selectedStage.slug === "working-planner-v3" && Boolean(selectedStage.prototypeHref);
  const standardCriticalBlock = hasCriticalContent ? (
    <div
      className={
        [
          selectedStage.guideSections?.length && !usesMediaCaptionFirst
            ? "ux-portfolio-workspace__critical ux-portfolio-workspace__critical--guide"
            : "ux-portfolio-workspace__critical",
          `ux-portfolio-workspace__critical--${selectedStage.slug}`,
          selectedStage.contentOrder === "critical-first"
            ? "ux-portfolio-workspace__critical--intro"
            : "",
          usesWatchlistTemplate &&
          ((!hasVisualMedia &&
            !selectedStage.caseStudyVisual &&
            !selectedStage.interactivePrototype) ||
            selectedStage.contentOrder === "critical-first")
            ? "ux-portfolio-workspace__critical--watchlist-text-only"
            : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {selectedStage.hideTitle ? null : usesHeadingPrototypeButton ? (
        <div className="ux-portfolio-workspace__critical-heading-action">
          <h2 className="ux-portfolio-workspace__critical-title">{selectedStage.title}</h2>
          <Link className="watchlist-ui-action ux-portfolio-workspace__prototype-button" href={selectedStage.prototypeHref!} target="_blank" rel="noreferrer">
            Open the model <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : (
        <h2 className="ux-portfolio-workspace__critical-title">{selectedStage.title}</h2>
      )}
      <div className="ux-portfolio-workspace__critical-copy-wrap">
        <StageCopy text={selectedStage.criticalText} />
        {selectedStage.prototypeHref && !usesHeadingPrototypeButton ? <Link className="watchlist-wireframe-intro-link" href={selectedStage.prototypeHref} target="_blank" rel="noreferrer">Open the functional prototype <span aria-hidden="true">→</span></Link> : null}
      </div>
    </div>
  ) : null;
  const openingMediaBlock = usesMediaCaptionFirst ? (
    <section className={`ux-portfolio-workspace__asset-caption ux-portfolio-workspace__asset-caption--${selectedStage.slug}`}>
      {mediaBlock}
      {standardCriticalBlock}
    </section>
  ) : mediaBlock;

  return (
    <main className={workspaceClassName}>
      <header className="ux-portfolio-workspace__header">
        <Link href={backHref} className="ux-portfolio-workspace__back-link">
          <span aria-hidden="true">←</span>
          <span>{backLabel}</span>
        </Link>
        <h1 className="ux-portfolio-workspace__title">{title}</h1>
        <div aria-hidden="true" className="ux-portfolio-workspace__header-spacer" />
      </header>

      <div className="ux-portfolio-workspace__body">
        <aside className="ux-portfolio-workspace__column ux-portfolio-workspace__column--index">
          <h2 className="ux-portfolio-workspace__column-title ux-portfolio-workspace__column-title--index">
            {useProjectNavigation ? "Projects" : "Index"}
          </h2>
          <div className="ux-portfolio-workspace__index-block">
            <nav
              aria-label={useProjectNavigation ? "Portfolio projects" : "Portfolio stages"}
              className="ux-portfolio-workspace__index"
            >
              {useProjectNavigation
                ? projectNavigationItems.map((project) => {
                    const isActive = project.label === selectedProject;

                    return (
                      <button
                        type="button"
                        className={
                          isActive
                            ? "ux-portfolio-workspace__index-item ux-portfolio-workspace__index-item--active"
                            : "ux-portfolio-workspace__index-item"
                        }
                        aria-current={isActive ? "page" : undefined}
                        key={project.label}
                        onClick={() => {
                          setActiveSectionTitle(null);
                          setSelectedSlug(project.firstStageSlug);
                        }}
                      >
                        <span className="ux-portfolio-workspace__index-main">{project.label}</span>
                      </button>
                    );
                  })
                : stages.map((stage) => {
                    const isActive = stage.slug === selectedStage.slug;

                    return (
                      <div key={stage.slug}>
                        <button
                          type="button"
                          className={
                            isActive
                              ? "ux-portfolio-workspace__index-item ux-portfolio-workspace__index-item--active"
                              : "ux-portfolio-workspace__index-item"
                          }
                          onClick={() => {
                            setActiveSectionTitle(
                              stage.slug === "benchmark" ? stage.guideSections?.[0]?.title ?? null : null,
                            );
                            setSelectedSlug(stage.slug);
                          }}
                        >
                          <StageLabel label={stage.label} />
                        </button>
                        {isActive && stage.guideSections?.length ? (
                          <div className="ux-portfolio-workspace__index-subnav" aria-label="Benchmark sections">
                          <button
                            type="button"
                            className={`ux-portfolio-workspace__index-subnav-item${
                              activeSectionTitle === "__intro" ||
                              (stage.slug === "benchmark" && activeSectionTitle === "Benchmark summary")
                                ? " ux-portfolio-workspace__index-subnav-item--active"
                                : ""
                            }`}
                            aria-current={
                              activeSectionTitle === "__intro" ||
                              (stage.slug === "benchmark" && activeSectionTitle === "Benchmark summary")
                                ? "true"
                                : undefined
                            }
                            onClick={() => {
                              setActiveSectionTitle("__intro");
                              mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            {stage.slug === "benchmark" ? "Overview" : "Intro"}
                          </button>
                          {getNavigationSections(stage).map((section) => (
                            <button
                              key={section.title}
                              type="button"
                              className={`ux-portfolio-workspace__index-subnav-item${
                                activeSectionTitle === (section.anchorTitle ?? section.title)
                                  ? " ux-portfolio-workspace__index-subnav-item--active"
                                  : ""
                              }`}
                              aria-current={activeSectionTitle === (section.anchorTitle ?? section.title) ? "true" : undefined}
                              onClick={() => {
                                const anchorTitle = section.anchorTitle ?? section.title;
                                setActiveSectionTitle(anchorTitle);
                                document
                                  .getElementById(sectionAnchorId(stage.slug, anchorTitle))
                                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                            >
                              {section.title}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    );
                  })}
            </nav>
          </div>
        </aside>

        <section className="ux-portfolio-workspace__column ux-portfolio-workspace__column--main">
          <div className="ux-portfolio-workspace__image-nav" aria-label="Stage navigation">
            <button
              type="button"
              className="ux-portfolio-workspace__image-nav-button"
              onClick={() => previousStage && setSelectedSlug(previousStage.slug)}
              disabled={!previousStage}
              aria-label={previousStage ? `Previous: ${previousStage.title}` : "Previous stage unavailable"}
            >
              ←
            </button>
            <div className="ux-portfolio-workspace__image-nav-title">
              {useProjectNavigation && visibleProjectTitle
                ? `${visibleProjectTitle} · ${getNavTitle(selectedStage.label)}`
                : getNavTitle(selectedStage.label)}
            </div>
            <button
              type="button"
              className="ux-portfolio-workspace__image-nav-button"
              onClick={() => nextStage && setSelectedSlug(nextStage.slug)}
              disabled={!nextStage}
              aria-label={nextStage ? `Next: ${nextStage.title}` : "Next stage unavailable"}
            >
              →
            </button>
          </div>
          <div
            ref={mainScrollRef}
            className={`ux-portfolio-workspace__main-scroll${
              selectedStage.slug === "benchmark"
                ? " ux-portfolio-workspace__main-scroll--benchmark"
                : ""
            }`}
          >
            {selectedStage.contentLayout === "split-media-right" && hasVisualMedia && !usesWatchlistTemplate ? (
              <section className="ux-portfolio-workspace__split-stage">
                <div
                  className={
                    selectedStage.guideSections?.length
                      ? "ux-portfolio-workspace__critical ux-portfolio-workspace__critical--guide ux-portfolio-workspace__critical--stacked"
                      : "ux-portfolio-workspace__critical ux-portfolio-workspace__critical--stacked"
                  }
                >
                  {selectedStage.hideTitle ? null : (
                    <h2 className="ux-portfolio-workspace__critical-title">{selectedStage.title}</h2>
                  )}
                  <div className="ux-portfolio-workspace__critical-copy-wrap">
                    <StageCopy text={selectedStage.criticalText} />
                  </div>
                </div>
                <div className="ux-portfolio-workspace__split-stage-media">{mediaBlock}</div>
              </section>
            ) : (
              usesWatchlistTemplate ? (
                <>
                  {selectedStage.contentOrder === "critical-first" ? standardCriticalBlock : null}
                  {openingMediaBlock}
                  {leadingBenchmarkSummaryBlock}
                  {studyArtifact}
                  {selectedStage.contentOrder === "critical-first" || usesMediaCaptionFirst ? null : standardCriticalBlock}
                  {afterCriticalArtifact}
                </>
              ) : (
                <>
                  {selectedStage.contentOrder === "critical-first" ? standardCriticalBlock : null}
                  {openingMediaBlock}
                  {leadingBenchmarkSummaryBlock}
                  {studyArtifact}
                  {selectedStage.contentOrder === "critical-first" || usesMediaCaptionFirst ? null : standardCriticalBlock}
                  {afterCriticalArtifact}
                </>
              )
            )}
            {selectedStage.evidenceItems?.length ? (
              <section
                className="ux-portfolio-workspace__evidence"
                aria-labelledby={`${selectedStage.slug}-evidence-title`}
              >
                <h3
                  id={`${selectedStage.slug}-evidence-title`}
                  className="ux-portfolio-workspace__evidence-title"
                >
                  {selectedStage.evidenceTitle ?? "Evidence register"}
                </h3>
                <div className="ux-portfolio-workspace__evidence-list">
                  {selectedStage.evidenceItems.map((item) => (
                    <article
                      key={`${item.status}-${item.statement}`}
                      className="ux-portfolio-workspace__evidence-item"
                    >
                      <div className="ux-portfolio-workspace__evidence-meta">
                        <span>{item.status}</span>
                      </div>
                      <div className="ux-portfolio-workspace__evidence-copy">
                        <p>{item.statement}</p>
                        {item.implication ? <p>{item.implication}</p> : null}
                        {item.sourceLabel && item.sourceHref ? (
                          <a href={item.sourceHref} target="_blank" rel="noreferrer">
                            Source: {item.sourceLabel} →
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            {displayedGuideSections.length ? (
              <div className="ux-portfolio-workspace__guide" aria-label="Interview guide">
                {displayedGuideSections.map((section) => (
                  <Fragment key={section.title}>
                  {section.title === "Trakt – Saving a series" && toolSummarySections.length ? <ToolSummaryGroup sections={toolSummarySections} /> : null}
                  <section
                    key={section.title}
                    id={sectionAnchorId(selectedStage.slug, section.title)}
                    data-section-title={section.title}
                    className={`ux-portfolio-workspace__guide-section${
                      section.title === "Benchmark summary" ? " ux-portfolio-workspace__guide-section--summary" : ""
                    }${section.hideTitle ? " ux-portfolio-workspace__guide-section--company-intro" : ""}${
                      selectedStage.slug === "benchmark" &&
                      ["Trakt", "Serializd", "JustWatch"].includes(section.title)
                        ? " ux-portfolio-workspace__guide-section--benchmark-tool"
                        : ""
                    }${section.title === "Information presented" ? " ux-portfolio-workspace__guide-section--information" : ""}`}
                  >
                    {section.title === "Benchmark summary" ? <SummaryVisual /> : null}
                    {section.hideTitle ? null : (
                      <h3 className="ux-portfolio-workspace__guide-title">{section.title}</h3>
                    )}
                    {section.imageGallery?.length ? (
                      <div className="ux-portfolio-workspace__guide-image-gallery">
                        {section.imageGallery.map((image) => (
                          <Image
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            sizes="(max-width: 800px) 100vw, 50vw"
                            className="ux-portfolio-workspace__guide-image"
                          />
                        ))}
                      </div>
                    ) : section.imageSrc && section.imageAlt ? (
                      <Image
                        src={section.imageSrc}
                        alt={section.imageAlt}
                        width={section.imageWidth ?? 1600}
                        height={section.imageHeight ?? 900}
                        sizes="(max-width: 800px) 100vw, 50vw"
                        className="ux-portfolio-workspace__guide-image"
                      />
                    ) : null}
                    <ul className="ux-portfolio-workspace__guide-items">
                      {section.items.map((item) => {
                        const itemText = typeof item === "string" ? item : item.text;
                        const [informationType, ...informationDescription] = itemText.split(":");
                        const isInformationItem = section.title === "Information presented" && informationDescription.length > 0;

                        return (
                        <li key={itemText}>
                          <span className="ux-portfolio-workspace__guide-item-text">
                            {isInformationItem ? (
                              <>
                                <strong>{informationType}</strong>
                                <span>{informationDescription.join(":").trim()}</span>
                              </>
                            ) : itemText}
                          </span>
                          {typeof item === "string" || !item.suggestion ? null : (
                            <span className="ux-portfolio-workspace__guide-suggestion">
                              {item.suggestion}
                            </span>
                          )}
                        </li>
                        );
                      })}
                    </ul>
                  </section>
                  </Fragment>
                ))}
              </div>
            ) : null}
            {selectedStage.decisionLog?.length ? (
              <section
                className="ux-portfolio-workspace__decision-log"
                aria-labelledby={`${selectedStage.slug}-decision-title`}
              >
                <h3
                  id={`${selectedStage.slug}-decision-title`}
                  className="ux-portfolio-workspace__decision-log-title"
                >
                  {selectedStage.decisionLogTitle ?? "Ongoing design decision log"}
                </h3>
                <div className="ux-portfolio-workspace__decision-list">
                  {selectedStage.decisionLog.map((entry) => {
                    const heading = (
                      <div className="ux-portfolio-workspace__decision-heading">
                        <span>{entry.id}</span>
                        <span>{entry.status}</span>
                        <h4>{entry.decision}</h4>
                      </div>
                    );
                    const details = (
                      <dl className="ux-portfolio-workspace__decision-details">
                        <div>
                          <dt>Why</dt>
                          <dd>{entry.reasoning}</dd>
                        </div>
                        <div>
                          <dt>Evidence</dt>
                          <dd>{entry.evidence}</dd>
                        </div>
                        <div>
                          <dt>Other options</dt>
                          <dd>{entry.alternatives}</dd>
                        </div>
                        <div>
                          <dt>What we still do not know</dt>
                          <dd>{entry.uncertainty}</dd>
                        </div>
                      </dl>
                    );

                    return selectedStage.decisionLogCollapsible ? (
                      <details key={entry.id} className="ux-portfolio-workspace__decision-entry">
                        <summary>{heading}</summary>
                        {details}
                      </details>
                    ) : (
                      <article key={entry.id} className="ux-portfolio-workspace__decision-entry">
                        <header>{heading}</header>
                        {details}
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}
            {selectedStage.overviewLinks?.length ? (
              <div className="ux-portfolio-workspace__overview-links" aria-label="Employment overview">
                {selectedStage.overviewLinks.map((link) => (
                  <section key={link.label} className="ux-portfolio-workspace__overview-section">
                    <div className="ux-portfolio-workspace__overview-main">
                      <div className="ux-portfolio-workspace__overview-left">
                        <button
                          type="button"
                          className="ux-portfolio-workspace__overview-link"
                          onClick={() => setSelectedSlug(link.targetSlug)}
                        >
                          {link.label}
                        </button>
                        <div
                          className="ux-portfolio-workspace__overview-tags"
                          aria-label={`Work completed during ${link.label}`}
                        >
                          {link.items.map((item) => (
                            <button
                              key={`${link.label}-${item}`}
                              type="button"
                              className="ux-portfolio-workspace__overview-tag"
                              onClick={() => setSelectedSlug(link.targetSlug)}
                            >
                              [{item}]
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="ux-portfolio-workspace__overview-description">{link.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <aside className="ux-portfolio-workspace__column ux-portfolio-workspace__column--notes">
          <h2 className="ux-portfolio-workspace__column-title ux-portfolio-workspace__column-title--notes">
            Notes
          </h2>
          <div className="ux-portfolio-workspace__notes">
            {selectedStage.notes.map((note) => (
              <p key={note} className="ux-portfolio-workspace__note">
                {note}
              </p>
            ))}
          </div>
        </aside>
      </div>

      {isImageExpanded && canExpandImage ? (
        <div
          className="ux-portfolio-workspace__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedStage.title} expanded image`}
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            type="button"
            className="ux-portfolio-workspace__lightbox-close"
            onClick={() => setIsImageExpanded(false)}
            aria-label="Close expanded image"
          >
            Close
          </button>
          <div
            className="ux-portfolio-workspace__lightbox-image-wrap"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedStage.imageSrc!}
              alt={selectedStage.imageAlt!}
              width={2400}
              height={1600}
              sizes="100vw"
              className="ux-portfolio-workspace__lightbox-image"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

function StageLabel({ label }: { label: string }) {
  const match = label.match(/^(.*?)(\s*(\[[^\]]+\]))$/);

  if (!match) {
    return <span className="ux-portfolio-workspace__index-main">{label}</span>;
  }

  const main = match[1].trimEnd();
  const tag = match[3];

  return (
    <>
      <span className="ux-portfolio-workspace__index-main">{main} </span>
      <span className="ux-portfolio-workspace__index-tag">{tag}</span>
    </>
  );
}

function getNavTitle(label: string) {
  return label.replace(/\s*\[[^\]]+\]\s*$/, "").trim();
}

function getStageProject(label: string) {
  return label.match(/\[([^\]]+)\]\s*$/)?.[1] ?? null;
}

function getProjectNavigationItems(stages: readonly UxPortfolioWorkspaceStage[]) {
  const projects = new Map<string, string>();

  stages.forEach((stage) => {
    const project = getStageProject(stage.label);

    if (project && project !== "Design portfolio" && !projects.has(project)) {
      projects.set(project, stage.slug);
    }
  });

  return Array.from(projects, ([label, firstStageSlug]) => ({ label, firstStageSlug }));
}

function sectionAnchorId(stageSlug: string, sectionTitle: string) {
  return `${stageSlug}-${sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function getNavigationSections(stage: UxPortfolioWorkspaceStage): Array<{ title: string; anchorTitle?: string }> {
  if (stage.slug !== "benchmark") return stage.guideSections ?? [];

  const sections = stage.guideSections ?? [];
  const findSection = (title: string) => sections.find((section) => section.title === title);

  return [
    findSection("Information presented"),
    { title: "Provider summaries" },
    { title: "Trakt", anchorTitle: "Trakt – Saving a series" },
    { title: "Serializd", anchorTitle: "Serializd – Information architecture" },
    { title: "JustWatch", anchorTitle: "JustWatch – Landing experience" },
  ].filter((section): section is { title: string; anchorTitle?: string } => Boolean(section));
}

function StageCopy({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return <p className="ux-portfolio-workspace__critical-copy">{text}</p>;
  }

  return (
    <div className="ux-portfolio-workspace__critical-copy-group">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="ux-portfolio-workspace__critical-copy"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ToolSummaryGroup({
  sections,
}: {
  sections: NonNullable<UxPortfolioWorkspaceStage["guideSections"]>;
}) {
  return (
    <section
      id={sectionAnchorId("benchmark", "Provider summaries")}
      data-section-title="Provider summaries"
      className="ux-portfolio-workspace__tool-summary-group"
      aria-label="Service benchmark summaries"
    >
      <h2>Provider summaries</h2>
      {sections.map((section) => (
        <article key={section.title} className={`ux-portfolio-workspace__tool-summary-row ux-portfolio-workspace__tool-summary-row--${section.title.split(" – ")[0].toLowerCase()}`}>
          <h3>{section.title.replace(" – Summary", "")}</h3>
          <div className="ux-portfolio-workspace__tool-summary-points">
            {section.items.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              const [label, ...pointText] = text.split(": ");
              return (
                <section key={text}>
                  <h4>{label}</h4>
                  <ul>
                    {pointText.join(": ").split("; ").map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </section>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}

const benchmarkTools = [
  { name: "Trakt", scores: [5, 1, 4, 5, 2] },
  { name: "Serializd", scores: [3, 5, 2, 4, 3] },
  { name: "JustWatch", scores: [2, 2, 5, 4, 3] },
] as const;

function ToolRadar({ name, scores }: { name: string; scores: readonly number[] }) {
  const centerX = 140;
  const centerY = 140;
  const radius = 64;
  const labelRadius = 94;
  const angles = scores.map((_, index) => -Math.PI / 2 + (index * Math.PI * 2) / scores.length);
  const polygon = scores.map((score, index) => `${centerX + radius * (score / 5) * Math.cos(angles[index])},${centerY + radius * (score / 5) * Math.sin(angles[index])}`).join(" ");
  const labels = [
    "Episode tracking",
    "Season tracking",
    "Discovery",
    "Contextual information",
    "Clarity of actions\nand states",
  ];

  return (
    <svg className="ux-portfolio-workspace__summary-radar" viewBox="0 0 280 280" role="img" aria-label={`${name} capability profile`}>
      {[1, 2, 3, 4, 5].map((level) => <polygon key={level} points={angles.map((angle) => `${centerX + radius * (level / 5) * Math.cos(angle)},${centerY + radius * (level / 5) * Math.sin(angle)}`).join(" ")} fill="none" stroke="currentColor" strokeOpacity=".28" />)}
      <polygon points={polygon} fill="currentColor" fillOpacity=".72" stroke="currentColor" strokeWidth="1.5" />
      {labels.map((label, index) => {
        const lines = label.split("\n");
        const y = centerY + labelRadius * Math.sin(angles[index]);
        return (
          <text key={label} x={centerX + labelRadius * Math.cos(angles[index])} y={y - ((lines.length - 1) * 3.5)} textAnchor="middle" dominantBaseline="middle">
            {lines.map((line, lineIndex) => <tspan key={line} x={centerX + labelRadius * Math.cos(angles[index])} dy={lineIndex === 0 ? 0 : 7}>{line}</tspan>)}
          </text>
        );
      })}
    </svg>
  );
}

function SummaryVisual() {
  const calendarAvailability = [true, false, false];

  return (
    <div className="ux-portfolio-workspace__summary-visual ux-portfolio-workspace__summary-visual--comparison">
      <div className="ux-portfolio-workspace__summary-table" role="table" aria-label="Cross-platform comparison">
        {benchmarkTools.map((tool, toolIndex) => (
          <section className={`ux-portfolio-workspace__summary-tool-column ux-portfolio-workspace__summary-tool-column--${tool.name.toLowerCase()}`} role="columnheader" key={tool.name}>
            <header><strong>{tool.name}</strong><ToolRadar name={tool.name} scores={tool.scores} /></header>
            <div className="ux-portfolio-workspace__summary-tool-metrics">
              <div role="cell">
                <span>Calendar</span>
                <CalendarIndicator available={calendarAvailability[toolIndex]} />
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="ux-portfolio-workspace__summary-lead">
        <p><strong>Trakt</strong> leads episode tracking and calendar planning · <strong>Serializd</strong> leads bulk season tracking · <strong>JustWatch</strong> leads discovery and streaming integration · all three fragment saving across several actions or states.</p>
      </div>
    </div>
  );
}

function CalendarIndicator({ available }: { available: boolean }) {
  return (
    <span
      className={`ux-portfolio-workspace__summary-binary ux-portfolio-workspace__summary-binary--${available ? "yes" : "no"}`}
      aria-label={available ? "Calendar available" : "No calendar"}
    >
      {available ? "✓" : "×"}
    </span>
  );
}
