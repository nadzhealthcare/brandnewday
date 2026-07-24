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

# Tabby  (UAE uses api.tabby.ai; KSA would be api.tabby.sa)
TABBY_SECRET_KEY=          # sk_test_… then sk_… (the key decides test vs live)
TABBY_MERCHANT_CODE=       # from your Tabby integration manager
TABBY_WEBHOOK_SECRET=      # openssl rand -hex 32, sent back to us as a header

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

## Tabby

Hosted checkout. `lib/tabby.ts` creates the session, `/api/checkout/tabby`
serves the pay page, and money only actually moves once the payment is
**captured** — an authorised payment that is never captured is not settled.

**Capture happens in two places on purpose.** `/pay/success` captures when the
shopper is redirected back, and `/api/webhooks/tabby` captures when Tabby tells
us the payment was authorised. The redirect alone is not trustworthy: a shopper
who closes the tab after approving still owes us an order we would never hear
about (Tabby auto-captures around day 21, by which point nobody here knew to
send a doctor). Both routes go through `captureAuthorized()`, which re-reads the
payment and only captures while it is still `AUTHORIZED` with nothing captured
yet, so the two paths cannot double-charge.

### Registering the webhook (once per environment)
Webhooks are registered through Tabby's API, and the secret key decides which
environment it lands in — so run this once with the test key and again with the
live key. Max 4 per merchant code + key pair, so `list` before you `register`.

```bash
openssl rand -hex 32              # put this in TABBY_WEBHOOK_SECRET (env + Vercel)
node scripts/tabby-webhook.mjs list
node scripts/tabby-webhook.mjs register
```

It registers `NEXT_PUBLIC_SITE_URL/api/webhooks/tabby` with an `x-tabby-auth`
header set to `TABBY_WEBHOOK_SECRET`; the route rejects anything whose header
doesn't match. Tabby cannot reach localhost, so this needs the deployed URL.

### Sandbox test buyers (OTP is always `8888`)
| Outcome | Email | UAE phone |
| --- | --- | --- |
| Paid | `otp.success@tabby.ai` | `+971500000001` |
| Rejected at payment | `otp.rejected@tabby.ai` | `+971500000001` |
| Rejected at pre-scoring (Tabby won't be offered) | `otp.success@tabby.ai` | `+971500000002` |

`/pay/demo` generates a valid sample order for end-to-end testing.

### Approval rates
Tabby pre-scores each order on `buyer_history` and `order_history`. There are no
accounts or orders table here, so we send "registered today, no prior orders"
rather than inventing history for a lender's risk engine. If an orders table
ever lands, passing the last 5–10 real orders will lift approvals.

## Compliance notes
- Use hosted checkout / provider SDKs so card data never touches our server (PCI SAQ-A).
- Never expose secret keys client-side — only `NEXT_PUBLIC_*` keys are safe in the browser.
- Verify every webhook signature before trusting it.
