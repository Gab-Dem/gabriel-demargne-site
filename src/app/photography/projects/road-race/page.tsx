import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { PhotographyChapterNav } from "@/components/photography-chapter-nav";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";
import { PhotographyReturnLink } from "@/components/photography-return-link";

const chapters = [
  { id: "reuben-stovold", title: "Reuben Stovold", folder: "reuben-stovold" },
  { id: "criterium", title: "Criterium", folder: "criterium" },
] as const;

function getChapterImages(folder: string) {
  const directory = join(process.cwd(), "public", "photography-projects", "road-race", folder);

  try {
    return readdirSync(directory)
      .filter((file) => /\.(?:jpe?g|png)$/i.test(file))
      .sort()
      .map((file) => `/photography-projects/road-race/${folder}/${file}`);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Road Race — Photography",
  description: "Road race photography by Gabriel Demargne.",
  alternates: { canonical: "/photography/projects/road-race" },
};

export default function RoadRacePage() {
  return (
    <main className="photography-detail photography-detail--chapters">
      <PhotographyMobileNav title="Road Race" chapters={chapters} />
      <header className="photography-detail__header">
        <Link href="/" className="photography-detail__identity" aria-label="Home">
          <span>Gabriel</span>
          <span>Demargne</span>
        </Link>
        <nav className="photography-detail__nav" aria-label="Primary navigation">
          <Link className="site-top-contact" href="/contact">Contact me</Link>
          <Link href="/photography" className="photography-detail__active">Photography</Link>
          <Link href="/design-portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
        </nav>
      </header>

      <div className="photography-detail__body">
        <aside className="photography-detail__index" aria-label="Road Race chapters">
          <PhotographyReturnLink />
          <h1>Road Race</h1>
          <PhotographyChapterNav chapters={chapters} label="Road Race chapters" />
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
