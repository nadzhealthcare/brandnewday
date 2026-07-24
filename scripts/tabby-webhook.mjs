#!/usr/bin/env node
/* Register (or list) the Tabby payment webhook.

   Tabby webhooks are registered through its API, once per merchant_code +
   secret key pair, and the environment is decided by which key you use:
   sk_test_... registers against test, sk_... against live. So this has to be
   run once with the test key and again with the live key.

   Usage, from the repo root:
     node scripts/tabby-webhook.mjs list
     node scripts/tabby-webhook.mjs register

   Reads TABBY_SECRET_KEY, TABBY_MERCHANT_CODE, TABBY_WEBHOOK_SECRET and
   NEXT_PUBLIC_SITE_URL from .env.local (or the real environment, which is what
   you want when pointing it at production).

   Tabby allows a maximum of 4 webhooks per pair, so `list` first: re-running
   `register` blindly will fill the quota with duplicates. */

import { readFileSync } from "node:fs";

const API = "https://api.tabby.ai/api/v1/webhooks"; // UAE/Kuwait; KSA is api.tabby.sa
const AUTH_HEADER = "x-tabby-auth"; // must match app/api/webhooks/tabby/route.ts

// Load .env.local without a dependency, letting real env vars win.
function loadEnv() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* no .env.local, rely on the environment */
  }
}

loadEnv();

const key = process.env.TABBY_SECRET_KEY;
const merchant = process.env.TABBY_MERCHANT_CODE;
const secret = process.env.TABBY_WEBHOOK_SECRET;
const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

if (!key || !merchant) {
  console.error("Missing TABBY_SECRET_KEY or TABBY_MERCHANT_CODE.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${key}`,
  "X-Merchant-Code": merchant,
  "Content-Type": "application/json",
};

const mode = process.argv[2] ?? "list";
const env = key.startsWith("sk_test") ? "TEST" : "LIVE";

if (mode === "list") {
  const res = await fetch(API, { headers });
  const body = await res.text();
  console.log(`[${env}] ${res.status}`);
  console.log(body);
  process.exit(res.ok ? 0 : 1);
}

if (mode === "register") {
  if (!secret) {
    console.error(
      "Missing TABBY_WEBHOOK_SECRET. Generate one and set it in the environment\n" +
        "AND in Vercel, so the route can verify what Tabby sends back:\n" +
        "  openssl rand -hex 32",
    );
    process.exit(1);
  }
  if (!site.startsWith("https://")) {
    console.error(
      `NEXT_PUBLIC_SITE_URL must be a public https URL, got: ${site || "(unset)"}\n` +
        "Tabby has to be able to reach it, so localhost will not work.",
    );
    process.exit(1);
  }

  const url = `${site}/api/webhooks/tabby`;
  const res = await fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url,
      header: { title: AUTH_HEADER, value: secret },
    }),
  });
  const body = await res.text();
  console.log(`[${env}] registering ${url}`);
  console.log(`${res.status}`);
  console.log(body);
  process.exit(res.ok ? 0 : 1);
}

console.error(`Unknown command "${mode}". Use "list" or "register".`);
process.exit(1);
