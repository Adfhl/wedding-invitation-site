const RSVP_UPSTREAM = "https://omar-abeer-invitation.fat114011.chatgpt.site/api/rsvp";

async function forward(request: Request) {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(RSVP_UPSTREAM);
  upstreamUrl.search = incomingUrl.search;

  const response = await fetch(upstreamUrl, {
    method: request.method,
    headers: { "content-type": "application/json" },
    body: request.method === "POST" ? await request.text() : undefined,
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
  });
}

export async function POST(request: Request) {
  return forward(request);
}

export async function GET(request: Request) {
  return forward(request);
}
