import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

export type PhotographyReviewItem = {
  src: string;
  section: "Places" | "Projects";
  collection: string;
  filename: string;
  order: number;
};

export const photographyRemovalFile = join(process.cwd(), "tmp", "photography-removals.json");

const photographyRoots = [
  join(process.cwd(), "public", "photography-places"),
  join(process.cwd(), "public", "photography-projects"),
];

const collectionOrder: Record<string, { section: "Places" | "Projects"; label: string; order: number }> = {
  "photography-places/japan/Tokyo": { section: "Places", label: "Japan · Tokyo", order: 10 },
  "photography-places/japan/Japanese-Alps": { section: "Places", label: "Japan · Japanese Alps", order: 20 },
  "photography-places/japan/Kanazawa": { section: "Places", label: "Japan · Kanazawa", order: 30 },
  "photography-places/japan/Naoshima": { section: "Places", label: "Japan · Naoshima", order: 40 },
  "photography-places/japan/Naoshima-Bepu": { section: "Places", label: "Japan · Naoshima – Beppu", order: 50 },
  "photography-places/japan/Kyushu": { section: "Places", label: "Japan · Kyushu", order: 60 },
  "photography-places/japan/Kagoshima": { section: "Places", label: "Japan · Kagoshima", order: 70 },
  "photography-places/japan/Yakushima": { section: "Places", label: "Japan · Yakushima", order: 80 },
  "photography-places/japan/Hiroshima": { section: "Places", label: "Japan · Hiroshima", order: 90 },
  "photography-places/japan/Nara": { section: "Places", label: "Japan · Nara", order: 100 },
  "photography-places/warsaw": { section: "Places", label: "Warsaw", order: 110 },
  "photography-places/costa-brava": { section: "Places", label: "Costa Brava", order: 120 },
  "photography-places/lisbon": { section: "Places", label: "Lisbon", order: 130 },
  "photography-places/sweden": { section: "Places", label: "Stockholm", order: 140 },
  "photography-places/costa-rica": { section: "Places", label: "Costa Rica · Unlisted", order: 150 },
  "photography-projects/road-race/reuben-stovold": { section: "Projects", label: "Road Race · Reuben Stovold", order: 200 },
  "photography-projects/road-race/criterium": { section: "Projects", label: "Road Race · Criterium", order: 210 },
  "photography-projects/olivia": { section: "Projects", label: "Olivia Lerjestad", order: 220 },
  "photography-projects/abstract": { section: "Projects", label: "Abstract", order: 230 },
  "photography-projects/weddings": { section: "Projects", label: "Wedding Photography", order: 240 },
};

function collectImages(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectImages(path);
    return /\.(?:jpe?g|png)$/i.test(entry.name) ? [path] : [];
  });
}

export function getPhotographyReviewItems(): PhotographyReviewItem[] {
  return photographyRoots
    .flatMap((root) => collectImages(root))
    .map((path) => {
      const publicPath = relative(join(process.cwd(), "public"), path).split(sep).join("/");
      const parts = publicPath.split("/");
      const directory = parts.slice(0, -1).join("/");
      const details = collectionOrder[directory] ?? {
        section: publicPath.startsWith("photography-projects/") ? "Projects" as const : "Places" as const,
        label: parts.slice(1, -1).join(" / "),
        order: 999,
      };
      return {
        src: `/${publicPath}`,
        section: details.section,
        collection: details.label,
        filename: parts.at(-1) ?? publicPath,
        order: details.order,
      };
    })
    .sort((a, b) => a.order - b.order || a.filename.localeCompare(b.filename, undefined, { numeric: true }));
}

export function getPhotographyRemovals(): string[] {
  if (!existsSync(photographyRemovalFile)) return [];

  try {
    const value = JSON.parse(readFileSync(photographyRemovalFile, "utf8"));
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
