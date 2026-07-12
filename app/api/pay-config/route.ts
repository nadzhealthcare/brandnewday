// Diagnostic: reports which payment env vars are visible to the server.
// Returns booleans only — never the secret values. Safe to expose.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    PAYLINK_SECRET: !!process.env.PAYLINK_SECRET,
    PAY_ADMIN_PASSWORD: !!process.env.PAY_ADMIN_PASSWORD,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    VERCEL_ENV: process.env.VERCEL_ENV || null,
  });
}
