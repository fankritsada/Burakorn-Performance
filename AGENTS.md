# Burakorn Performance Registry Repo Rules

## Mission

Maintain a standalone preview-first website for Burakorn Performance Registry: a small, premium, indexable-ready registry preview for numbered executive restomod builds based on selected Honda Accord G8 K24 platforms in Thailand.

## Hard Rules

- Keep this project separate from `burakorn-holding`.
- Do not edit `/Users/carchar/Documents/WEBSITES/burakorn-holding` from this repo.
- Default to preview-first and noindex until Eugene explicitly approves public indexing or production launch.
- Do not deploy, modify DNS, connect Vercel production, change domains, or publish without explicit approval.
- Do not add pricing, deposits, checkout, cart, public stock lists, public availability, or purchase CTAs.
- Do not claim Honda affiliation, endorsement, partnership, manufacturer status, or official Honda relationship.
- Do not use full warranty, no-risk, like-new, zero-mileage, collector-value, fake press, fake reviews, or exaggerated performance claims.
- Do not connect email sending, CRM, WhatsApp, Line, paid APIs, scraping, or external submissions without explicit approval.

## Build Boundary

Public MVP routes are:

- `/`
- `/registry`
- `/bp-001`
- `/bp-002-moray`
- `/philosophy`
- `/platform`
- `/contact`
- `/facts/burakorn-performance`
- `/llms.txt`
- `/robots.txt`
- `/sitemap.xml`

Future pages such as `/build-journal`, `/ownership-care`, `/media`, and `/faq` must stay out of public navigation and routes until approved content exists.

## Verification

Run after material changes:

```bash
pnpm lint
pnpm typecheck
pnpm verify:content
pnpm build
```

Preview locally before any handoff:

```bash
pnpm dev
```
