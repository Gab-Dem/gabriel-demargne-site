import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobilePageBack } from "@/components/mobile-page-back";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { SiteDesktopIdentity } from "@/components/site-desktop-identity";
import costaRicaPhotos from "@/data/costa-rica-photos.json";

type PhotographyFolder = {
  title: string;
  src: string;
  alt: string;
  ratio: number;
  slug?: string;
  href?: string;
};

const places: readonly PhotographyFolder[] = [
  {
    title: "Japan",
    src: "/photography-places/japan/Hiroshima/D15D8278-2057-4F99-BDEB-1F5C798EE646_1_201_a.jpg",
    alt: "A street scene in Japan",
    ratio: 1800 / 1200,
    slug: "japan",
    href: "/photography/japan",
  },
  {
    title: "Warsaw",
    src: "/photography-places/warsaw/E34ED853-74AE-409B-A006-8C34BCC51F2E_1_201_a.jpg",
    alt: "A Warsaw street scene",
    ratio: 177 / 265,
    slug: "warsaw",
  },
  {
    title: "Costa Brava",
    src: "/photography-places/costa-brava/0E508DFB-94C9-4488-951E-DA2D8CDAC40A_1_201_a.jpg",
    alt: "A coastal view on the Costa Brava",
    ratio: 398 / 265,
    slug: "costa-brava",
  },
  {
    title: "Costa Rica",
    src: `/photography-places/costa-rica/${costaRicaPhotos.cover}`,
    alt: "Costa Rica photography",
    ratio: 1800 / 1200,
    slug: "costa-rica",
  },
  {
    title: "Lisbon",
    src: "/photography-places/lisbon/26CF21C4-F7C1-487B-A37A-066BDFDF447C_1_105_c.jpg",
    alt: "A Lisbon street scene",
    ratio: 471 / 265,
    slug: "lisbon",
  },
  {
    title: "Stockholm",
    src: "/photography-places/sweden/039E8535-03AF-4D46-9EE4-E42D74AE10FB_1_201_a.jpg",
    alt: "A waterside view in Sweden",
    ratio: 397 / 265,
    slug: "sweden",
  },
];

const projects: readonly PhotographyFolder[] = [
  {
    title: "Road Race",
    src: "/photography-projects/road-race/criterium/76B028D9-F334-48A9-A8ED-71589ACF19B7_1_201_a.jpeg",
    alt: "Road race photography",
    ratio: 5846 / 3897,
    href: "/photography/projects/road-race",
  },
  {
    title: "Olivia Lerjestad",
    src: "/photography-projects/olivia/DSCF1643.JPG",
    alt: "Olivia Lerjestad photographed in rehearsal",
    ratio: 2730 / 1535,
    href: "/photography/projects/olivia",
  },
  {
    title: "Abstract",
    src: "/photography-projects/abstract/1CE87F4D-DEF7-4429-87E2-C0B45562E321_1_201_a.jpeg",
    alt: "Abstract photographic composition",
    ratio: 3793 / 2529,
    href: "/photography/projects/abstract",
  },
  {
    title: "Wedding Photography",
    src: "/photography-projects/weddings/1E92316D-4A5C-4791-9EFA-A279BFC2B61B_1_201_a.jpeg",
    alt: "Wedding photography",
    ratio: 5056 / 3371,
    href: "/photography/projects/wedding-photography",
  },
];

export const metadata: Metadata = {
  title: "Photography",
  description: "Travel and project photography by Gabriel Demargne.",
  alternates: {
    canonical: "/photography",
  },
};

export default function PhotographyPage() {
  return (
    <main className="photography-index">
      <PhotographyMobileNav />
      <header className="photography-index__header">
        <SiteDesktopIdentity identityClassName="photography-index__identity" />

        <nav className="photography-index__nav" aria-label="Primary navigation">
          <Link className="site-top-contact" href="/contact">Contact me</Link>
          <span aria-current="page">Photography</span>
          <Link href="/design-portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
        </nav>
      </header>

      <div className="photography-index__mobile-back">
        <MobilePageBack href="/" ariaLabel="Back to home" />
      </div>

      <div className="photography-index__rails">
        <PhotographyRail title="Places" folders={places} />
        <PhotographyRail title="Projects" folders={projects} />
      </div>
    </main>
  );
}

function PhotographyRail({
  title,
  folders,
}: {
  title: string;
  folders: readonly PhotographyFolder[];
}) {
  const headingId = `photography-${title.toLowerCase()}`;

  return (
    <section className="photography-rail" aria-labelledby={headingId}>
      <h2 id={headingId} className="photography-rail__title">
        {title}
      </h2>

      <div
        className="photography-rail__scroller"
        tabIndex={0}
        aria-label={`${title} photography folders`}
      >
        <PhotographyFolderTrack folders={folders} />
      </div>
    </section>
  );
}

function PhotographyFolderTrack({ folders }: { folders: readonly PhotographyFolder[] }) {
  return (
    <div className="photography-rail__track">
      {folders.map((folder, index) => (
        <figure
          className="photography-folder"
          key={`${folder.title}-${index}`}
          style={{ width: `calc(var(--photography-rail-height) * ${folder.ratio})` }}
        >
          <a
            className="photography-folder__link"
            href={folder.href ?? (folder.slug ? `/photography/${folder.slug}` : folder.src)}
            aria-label={`Open ${folder.title} photograph`}
          >
            <span className="photography-folder__image-wrap">
              <Image
                className="photography-folder__image"
                src={folder.src}
                alt={folder.alt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                sizes="(max-width: 760px) 80vw, 34vw"
              />
            </span>
            <figcaption>{folder.title}</figcaption>
          </a>
        </figure>
      ))}
    </div>
  );
}
