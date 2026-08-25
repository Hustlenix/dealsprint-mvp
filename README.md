# DealSprint

Voice note in. Branded, priced proposal out. In under sixty seconds.

DealSprint is a working MVP built for the RevenueCat Shipaton 2026 (submission deadline September 28, 2026). It targets solo field closers: roofers, solar reps, contractors who shake hands on a job and then lose the deal in the two-hour gap it takes to type a proposal at a desk that night.

| | |
|---|---|
| Pitch site | https://hustlenix.github.io/dealsprint-mvp/ |
| Working prototype | https://hustlenix.github.io/dealsprint-mvp/app.html |
| Checks | copy gate and marker checks enforced by a pre-push hook; GitHub Actions version staged on the `ci-workflow` branch |

## What is real today

- The full product loop works end to end in the browser: record or type messy deal notes, watch them parse into a client name, line items with quantities, a budget read, and a priced proposal. Every field is editable and totals recompute live.
- Voice input uses the browser speech engine (Chrome and Edge). Typing works everywhere.
- Pricing runs on an editable rate table (shingles per square, gutters per foot, skylights each). A 10 percent contingency row is added automatically.
- Download PDF prints just the document. Copy summary puts a plain-text version on the clipboard.
- Free plan: 2 proposals per month, watermarked. Pro: $14.99/month, 7-day trial, no watermark.
- Optional: paste your own AI key in Settings and extraction upgrades from the local engine to a language model. The key never leaves your browser.

## Payments, honestly stated

The paywall supports two paths:

1. **Real Stripe checkout.** Create a Payment Link (free) at dashboard.stripe.com under Payment Links for $14.99/month with a 7-day trial. Set its after-payment redirect to `https://hustlenix.github.io/dealsprint-mvp/app.html?payment=success`. Then either paste the link into Settings in the app (stored in your browser) or bake it into `app.html` as `STRIPE_PAYMENT_LINK_URL`. When a customer completes checkout they return to the app and Pro activates automatically.
2. **Demo activate.** A clearly labeled no-charge activation so product demos never stall in front of a room.

Known limitation, stated plainly: activating on the `?payment=success` return parameter is prototype-grade. Production verification belongs to the backend phase, which for Shipaton means RevenueCat entitlements wrapping the purchase.

## Repository layout

```
index.html          pitch site: problem, users, features, validation verdict,
                    go/no-go gate, prize strategy, five-week plan
app.html            the working prototype, single file, no build step
checks/ci.js        copy gate + sanity checks, run before every push
```

No frameworks. No build step. No npm install. Any static host serves it; GitHub Pages deploys main automatically on every merge.

## Run locally

```
npx http-server .
```

then open http://localhost:8080/app.html

## Validation status

The idea went through a four-agent design council twice and returned FIX FIRST both times. Verdict summary: the risk is not whether the tool can be built (it is built, above), it is whether solo closers will pay for it. The go/no-go gate: 40 concierge outreach messages offering a flat $19 done-tonight proposal service. Eight or more paid orders by August 31 greenlights building the full spec. Fewer than three pivots the surface to higher-frequency documents while keeping the same stack.

## Changelog

- **Prototype v2** - Real Stripe payment link flow: connect in Settings or bake in at deploy, grant-on-return via redirect parameter, connection status shown on the paywall, pending-checkout handling.
- **Prototype v1** - Six-screen app state machine: record, process, extract, editable proposal, send stamp with elapsed time, watermark, usage meter, paywall, settings drawer with rate table and optional AI key.
- **BUILD 3** - Pitch site redesigned to a light courier-manifesto theme, dramatic three-act pinned canvas hero, whole-site motion, primary call to action now opens the live prototype.
- **BUILD 2** - Cinematic pinned scroll hero added to the original dark deck site.
- **BUILD 1** - Static presentation deck shipped.

## Discipline

Every change ships as its own commit with a clear message, passes the copy gate and marker checks before push, and lands live via GitHub Pages automatic deploy from main. The footer of the pitch site carries a BUILD tag that increments each redesign so anyone can verify they are seeing the latest deployment.
