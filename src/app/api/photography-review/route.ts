import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  getPhotographyReviewItems,
  photographyRemovalFile,
} from "@/lib/photography-review";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { removed?: unknown } | null;
  if (!body || !Array.isArray(body.removed)) {
    return Response.json({ error: "Expected a removed photo list." }, { status: 400 });
  }

  const validPaths = new Set(getPhotographyReviewItems().map((photo) => photo.src));
  const removed = [...new Set(body.removed)]
    .filter((path): path is string => typeof path === "string" && validPaths.has(path))
    .sort();

  await mkdir(dirname(photographyRemovalFile), { recursive: true });
  const temporaryFile = `${photographyRemovalFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(removed, null, 2)}\n`, "utf8");
  await rename(temporaryFile, photographyRemovalFile);

  return Response.json({ saved: removed.length });
}
