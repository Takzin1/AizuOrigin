# AizuOrigin — Ver. 0.5

**Aizu craft × global storytelling × provenance, without pretending that a demo is a business.**

A bilingual (Japanese/English), responsive concept storefront exploring how stories of Aizu craft objects could reach international audiences. The digital craft passport currently demonstrates **local sample-record integrity**, not actual authentication or on-chain ownership.

## What's working

- [x] Japanese / English storefront with persistent language toggle
- [x] Home, collection, product detail, project story, digital passport, and shortlist screens
- [x] Three explicitly **fictional** sample pieces inspired by Aizu lacquerware, Aizu cotton and akabeko
- [x] Responsive, self-contained SVG illustrations and accessible navigation
- [x] Category filtering and text search
- [x] Browser-local shortlist (add, remove, copy a demo inquiry summary)
- [x] Passport lookup by demo ID (AO-DEMO-001, 002, 003)
- [x] Browser-side SHA-256 digest computed from sample fields and compared with bundled references

## What is NOT working / NOT claimed

- **No real inventory or artisan partnerships.** Makers, illustrations, products, histories and prices are fictional.
- **No checkout, order capture, payment, delivery or automatic communication.**
- **No NFT minting, wallet connection, signed issuer credentials, third-party verification or ownership transfer.**
- **No proof of a physical object's authenticity.** An NFT by itself cannot authenticate a physical item.
- The reference hashes and sample records live in the *same public JavaScript file*. A coordinated attacker can change both. A hash match is **not independently trustworthy proof**.

This is a v0.5 concept demonstration, **not an operating store**.

## Run locally

No package manager, API keys, database or backend required.

1. Clone this repository.
2. Run a local static server in the repository root using the command: python3 -m http.server 8000
3. Open http://localhost:8000/#/

You can also open index.html directly, but the integrity demo may be unavailable on file origins. Use localhost or HTTPS for Web Crypto.

## Publish to GitHub Pages

For this static v0.5, GitHub Pages does not need an Actions workflow:

1. Repository **Settings → Pages**
2. **Build and deployment → Deploy from a branch**
3. Branch **main**, directory **/(root)**, and **Save**
4. Once Pages confirms deployment, use the URL displayed in Pages settings.

For the common account/repo combination, the expected URL is:
https://takzin1.github.io/AizuOrigin/

**This URL is only live after Pages is actually enabled and deployed.** The hash routes work on GitHub Pages without custom fallback routing. No Actions jobs are included.

## Demo flows

- Browse #/catalog, filter by category, or search for material.
- Open a sample detail, click Add to inquiry list, then open #/inquiry.
- Open #/passport/AO-DEMO-001, inspect the sample digest match, and read the verification limitations.
- Switch to English from the header to show the global-facing version.

Demo canonical record format (UTF-8; vertical bar separators):

record_id | maker | region | year | material | version

Actual canonical SHA input has no spaces around separators. Example:

AO-DEMO-001|Demo Workshop A|Aizuwakamatsu, Fukushima|2026|Lacquerware|v1

Each pinned SHA-256 digest is bundled into app.js solely to demonstrate a local comparison.

## Roadmap

| Release | Scope | Gate |
| --- | --- | --- |
| v0.5 | Storytelling storefront, mock catalog, demo provenance, bilingual UI | No false sales/authenticity claims |
| v0.6 | Partner onboarding, content approval, maker profiles, provenance evidence | Written maker consent and rights review |
| v0.7 | Signed credentials, independent trust anchors, repairs-history event model | Signing, revocation and security design |
| v0.8 | Real catalog, inquiry/order flow, shipping and tax calculation | Merchant of record, consumer-law and privacy review |
| v1.0 | Optional NFT/on-chain attestations and ownership-event privacy safeguards | Independent security and legal review |

## Design principles

1. **Maker-first:** Never publish actual works or partner logos without permission.
2. **Provenance, not speculation:** Tokens do not automatically guarantee authenticity, ownership or IP rights.
3. **Static first:** No credentials, live services, third-party JS, dependencies or expensive Actions.
4. **Privacy-aware:** Shortlist and language are stored only in the visitor's browser; no analytics SDK.

## Rights

No open-source license is currently granted. Illustrations are bespoke concept artwork. This independent demo does not claim endorsement by Aizu makers or organizations and is not presented as the commerce website of an incorporated merchant.
