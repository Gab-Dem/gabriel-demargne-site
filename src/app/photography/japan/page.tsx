import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { PhotographyChapterNav } from "@/components/photography-chapter-nav";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { PhotographyReturnLink } from "@/components/photography-return-link";
import { SiteDesktopIdentity } from "@/components/site-desktop-identity";

type Chapter = {
  id: string;
  title: string;
  folder: string;
};

const chapters: readonly Chapter[] = [
  { id: "tokyo", title: "Tokyo", folder: "Tokyo" },
  { id: "japanese-alps", title: "Japanese Alps", folder: "Japanese-Alps" },
  { id: "kanazawa", title: "Kanazawa", folder: "Kanazawa" },
  { id: "naoshima", title: "Naoshima", folder: "Naoshima" },
  { id: "naoshima-beppu", title: "Naoshima - Beppu", folder: "Naoshima-Bepu" },
  { id: "kyushu", title: "Kyushu", folder: "Kyushu" },
  { id: "kagoshima", title: "Kagoshima", folder: "Kagoshima" },
  { id: "yakushima", title: "Yakushima", folder: "Yakushima" },
  { id: "hiroshima", title: "Hiroshima", folder: "Hiroshima" },
  { id: "nara", title: "Nara", folder: "Nara" },
];

function getChapterImages(folder: string) {
  const directory = join(process.cwd(), "public", "photography-places", "japan", folder);

  try {
    return readdirSync(directory)
      .filter((file) => /\.(?:jpe?g|png)$/i.test(file))
      .sort()
      .map((file) => `/photography-places/japan/${folder}/${file}`);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Japan — Photography",
  description: "Japan photography by Gabriel Demargne.",
  alternates: { canonical: "/photography/japan" },
};

export default function JapanPhotographyPage() {
  return (
    <main className="photography-detail photography-detail--chapters photography-detail--japan">
      <PhotographyMobileNav title="Japan" chapters={chapters} />
      <header className="photography-detail__header">
        <SiteDesktopIdentity identityClassName="photography-detail__identity" backHref="/photography" />
        <nav className="photography-detail__nav" aria-label="Primary navigation">
          <Link className="site-top-contact" href="/contact">Contact me</Link>
          <Link href="/photography" className="photography-detail__active">Photography</Link>
          <Link href="/design-portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
        </nav>
      </header>

      <div className="photography-detail__body">
        <aside className="photography-detail__index" aria-label="Japan chapters">
          <PhotographyReturnLink />
          <h1>Japan</h1>
          <PhotographyChapterNav chapters={chapters} label="Locations in Japan" />
        </aside>

        <div className="photography-detail__gallery">
          {chapters.map((chapter, chapterIndex) => {
            const images = getChapterImages(chapter.folder);

            return (
              <section className="photography-detail__chapter" id={chapter.id} aria-label={chapter.title} key={chapter.id}>
                {images.map((src, imageIndex) => (
                  <figure className="photography-detail__photo" key={src}>
                    {/* Native lazy loading preserves each source image's real orientation. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${chapter.title} photograph ${imageIndex + 1}`}
                      loading={chapterIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                    />
                  </figure>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
