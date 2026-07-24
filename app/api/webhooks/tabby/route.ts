import { captureAuthorized, tabbyReady } from "@/lib/tabby";

/* Tabby payment webhook.

   The redirect back to /pay/success is not a reliable signal: a shopper who
   closes the tab after approving still has an authorised payment, and Tabby's
   own guidance is to never rely on the redirect alone. This fires on every
   status change regardless of what the browser did, so an order that was paid
   is always captured — otherwise it sits uncaptured until Tabby auto-captures
   it around day 21 and nobody here ever knew to deliver the visit.

   Tabby signs nothing: authenticity comes from an auth header chosen at
   registration time, which it replays on every call. We compare it to
   TABBY_WEBHOOK_SECRET in constant time and reject anything else.

   Tabby retries up to four times on a non-200 or a one-minute timeout, so this
   answers 200 quickly and does the capture inline (a single API round-trip).
   Webhook payloads use lowercase statuses; the retrieve endpoint uses
   uppercase, which is why the compare below is lowercased. */

export const dynamic = "force-dynamic";

const AUTH_HEADER = "x-tabby-auth";

/** Constant-time compare, so a wrong secret can't be guessed by timing. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(request: Request) {
  const secret = process.env.TABBY_WEBHOOK_SECRET;
  if (!secret || !tabbyReady()) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  const provided = request.headers.get(AUTH_HEADER) ?? "";
  if (!safeEqual(provided, secret)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }

  const event = (await request.json().catch(() => null)) as {
    id?: string;
    status?: string;
  } | null;

  const id = event?.id;
  if (!id) {
    // Malformed, but retrying won't fix it — acknowledge so Tabby stops.
    return Response.json({ ok: true, ignored: "no payment id" });
  }

  const status = (event.status ?? "").toLowerCase();

  // Only an authorised payment needs anything doing. closed/rejected/expired
  // are terminal and captured ones re-notify on every capture entry.
  if (status !== "authorized") {
    return Response.json({ ok: true, status });
  }

  // Re-read server-side rather than trusting the payload, and capture once.
  const { captured } = await captureAuthorized(id);
  return Response.json({ ok: true, captured });
}
