import { createRef } from "@/lib/paylink";

// Staff-only: generate a signed pay-link for a custom amount.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Bad request" }, { status: 400 });

  const adminPw = process.env.PAY_ADMIN_PASSWORD;
  if (!adminPw || body.password !== adminPw) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return Response.json({ error: "Invalid amount" }, { status: 400 });
  }

  const ref = createRef({
    a: Math.round(amount * 100) / 100,
    d: String(body.description ?? "").slice(0, 140),
    n: body.name ? String(body.name).slice(0, 80) : undefined,
    p: body.phone ? String(body.phone).slice(0, 30) : undefined,
  });

  const site =
    process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const url = `${site}/pay?ref=${encodeURIComponent(ref)}`;
  return Response.json({ ref, url });
}
