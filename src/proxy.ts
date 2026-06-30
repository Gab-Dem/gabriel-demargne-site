import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WWW_HOST = "www.gabrieldemargne.com";
const APEX_HOST = "gabrieldemargne.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === WWW_HOST) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.host = APEX_HOST;
    redirectUrl.protocol = "https:";
    redirectUrl.port = "";
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
