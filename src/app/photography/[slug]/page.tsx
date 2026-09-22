import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotographyReturnLink } from "@/components/photography-return-link";
import { PhotographyMobileNav } from "@/components/photography-mobile-nav";

const collections = {
  warsaw: { title: "Warsaw", folder: "warsaw" },
  "costa-brava": { title: "Costa Brava", folder: "costa-brava" },
  lisbon: { title: "Lisbon", folder: "lisbon" },
  sweden: { title: "Sweden", folder: "sweden" },
} as const;

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections[slug as keyof typeof collections];

  return collection
    ? {
        title: `${collection.title} — Photography`,
        description: `${collection.title} photography by Gabriel Demargne.`,
        alternates: { canonical: `/photography/${slug}` },
      }
    : {};
}

function getImages(folder: string) {
  const directory = join(process.cwd(), "public", "photography-places", folder);

  try {
    return readdirSync(directory)
      .filter((file) => /\.(?:jpe?g|png)$/i.test(file))
      .filter((file) => folder !== "warsaw" || file !== "671A68B6-A4D0-4865-BFF9-1D289EAE65B2_1_105_c.jpg")
      .sort()
      .map((file) => `/photography-places/${folder}/${file}`);
  } catch {
    return [];
  }
}

export default async function PhotographyCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections[slug as keyof typeof collections];

  if (!collection) notFound();

  const images = getImages(collection.folder);

  return (
    <main className="photography-detail">
      <PhotographyMobileNav />
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
        <aside className="photography-detail__index photography-detail__index--single">
          <PhotographyReturnLink />
          <h1>{collection.title}</h1>
        </aside>
        <div className="photography-detail__gallery" id="photos" aria-label={`${collection.title} photos`}>
          {images.map((src, index) => (
            <figure className="photography-detail__photo" key={src}>
              {/* Native lazy loading preserves each source image's real orientation. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${collection.title} photograph ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
