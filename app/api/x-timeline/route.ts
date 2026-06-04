import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const screenName =
    request.nextUrl.searchParams.get("screenName") ?? "acesfootballuk";

  const params = new URLSearchParams({
    showHeader: "false",
    showReplies: "false",
    showBorder: "false",
    transparent: "true",
    theme: "light",
  });

  const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${screenName}?${params}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 300 },
    });

    const html = await response.text();

    if (!response.ok || html.length < 100) {
      return NextResponse.json({ error: "X timeline unavailable" }, { status: 502 });
    }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "X timeline fetch failed" }, { status: 502 });
  }
}
