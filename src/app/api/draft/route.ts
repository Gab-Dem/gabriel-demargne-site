import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const allowedDraftSlugs = new Set(["/portfolio-lab", "/portfolio-lab/ux-portfolio"]);

export async function GET(request: Request) {
  const secret = process.env.DRAFT_MODE_SECRET;

  if (!secret) {
    return new Response("Draft mode secret is not configured.", { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const providedSecret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (providedSecret !== secret || !slug || !allowedDraftSlugs.has(slug)) {
    return new Response("Invalid token or slug.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
