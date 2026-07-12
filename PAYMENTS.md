# Payments — Pay-by-link (Stripe + Tabby + Tamara)

Model: **custom amount / invoice** ("pay-by-link"). Staff generate a link for a
quoted amount; the customer pays by **Card / Apple Pay (Stripe)**, **Tabby**, or
**Tamara**. MVP uses **signed links** (no database required); order status lives
in each provider's dashboard + webhooks.

## Flow
1. Staff → internal link generator: amount + customer name/phone + description.
2. App builds a signed token → `/pay?ref=<signed>`.
3. Customer pay page shows amount + three methods:
   - Card / Apple Pay → Stripe Checkout Session
   - Tabby → Tabby checkout session
   - Tamara → Tamara checkout session
4. Provider redirects back to `/pay/success` / `/pay/cancel`.
5. Webhook (`/api/webhooks/{stripe,tabby,tamara}`) verifies + confirms payment,
   then (optional) sends a WhatsApp/email receipt.

## Build order
1. **Stripe** (cards + Apple Pay) — self-serve test keys, build & verify in sandbox now.
2. **Tabby** — after merchant approval + sandbox keys.
3. **Tamara** — after merchant approval + sandbox keys.
4. Apple Pay domain verification file + registration.
5. (Optional later) orders database for an in-app payments list.

## Environment variables (set in Vercel → Project → Settings → Environment Variables)
```
# App
PAYLINK_SECRET=            # random 32+ char string, signs pay-links
NEXT_PUBLIC_SITE_URL=      # e.g. https://brandnewday-eight.vercel.app

# Stripe
STRIPE_SECRET_KEY=         # sk_test_… then sk_live_…
STRIPE_WEBHOOK_SECRET=     # whsec_…
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_test_…

# Tabby
TABBY_SECRET_KEY=
TABBY_PUBLIC_KEY=
TABBY_WEBHOOK_SECRET=

# Tamara
TAMARA_API_TOKEN=
TAMARA_NOTIFICATION_TOKEN=
TAMARA_API_URL=            # sandbox vs production base URL
```

## Accounts / onboarding checklist
- [ ] Stripe account created; test keys copied into Vercel env
- [ ] Apple Pay: add domain in Stripe → host verification file (I add the route)
- [ ] Tabby merchant application submitted → approved → sandbox keys
- [ ] Tamara merchant application submitted → approved → sandbox keys
- [ ] Go-live: swap test/sandbox keys for live keys, re-verify webhooks

## Compliance notes
- Use hosted checkout / provider SDKs so card data never touches our server (PCI SAQ-A).
- Never expose secret keys client-side — only `NEXT_PUBLIC_*` keys are safe in the browser.
- Verify every webhook signature before trusting it.
