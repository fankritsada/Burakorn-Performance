# Burakorn Performance Registry

Standalone preview-first Next.js site for Burakorn Performance Registry.

Burakorn Performance is a Bangkok-based numbered restomod registry creating dark executive builds from selected Honda Accord G8 K24 platforms.

## Purpose

This is not a dealership site, tuning shop, sales landing page, or public stock list. It is a small premium registry preview that can be made indexable after owner approval.

## Local Setup

```bash
pnpm install
pnpm dev
```

Local preview normally runs on `http://localhost:3000`. If that port is occupied:

```bash
pnpm exec next dev -p 3008
```

## Indexing Controls

Default posture is preview-first:

```bash
INDEXING_ENABLED=false
```

When `INDEXING_ENABLED` is not set to `true`, page metadata is noindex and `robots.txt` blocks crawling.

For a controlled local check of public-ready metadata:

```bash
INDEXING_ENABLED=true SITE_URL=https://example.com pnpm build
```

Do not use a real production domain or public deployment without explicit approval.

## Routes

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

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm verify:content
pnpm build
```

## Content Boundary

Keep build facts in `content/registry.ts`. Keep SEO, site URL, definition, navigation, and disclaimer in `lib/site.ts`.
