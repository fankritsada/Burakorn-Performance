# Implementation Report

## 1. Summary

Standalone Burakorn Performance Registry MVP implemented as a preview-first Next.js site. The site defaults to noindex, keeps `burakorn-holding` untouched, and exposes only the approved MVP routes.

## 2. Changed files

- New Next.js app scaffold.
- Shared registry content.
- Shared SEO, indexing, and JSON-LD helpers.
- MVP pages and static `llms.txt`.
- Project docs and content boundary check.
- Generated exterior hero asset.

## 3. Commands run

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm verify:content`
- `pnpm build`
- `INDEXING_ENABLED=true SITE_URL=https://example.com pnpm build`
- `pnpm exec next start -p 3008`
- `INDEXING_ENABLED=true SITE_URL=https://example.com pnpm exec next start -p 3009`
- Route smoke checks with `/usr/bin/curl`
- Screenshot QA with `pnpm dlx playwright@1.57.0 screenshot --channel chrome`

## 4. Test results

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm verify:content`: passed.
- Default `pnpm build`: passed.
- Controlled indexing build: passed.
- MVP routes returned 200: `/`, `/registry`, `/bp-001`, `/bp-002-moray`, `/philosophy`, `/platform`, `/contact`, `/facts/burakorn-performance`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`.
- Future routes returned 404: `/build-journal`, `/ownership-care`, `/media`, `/faq`.
- Default preview mode verified: `robots.txt` disallows `/`, homepage emits `noindex, nofollow`.
- `INDEXING_ENABLED=true` mode verified: `robots.txt` allows `/`, sitemap uses `https://example.com`, homepage emits `index, follow`.
- Desktop and mobile screenshots verified with system Chrome through Playwright CLI.

## 5. Output files

- `public/visuals/burakorn-performance-hero.png`
- `qa-screenshots/home-desktop-fixed.png`
- `qa-screenshots/home-mobile-fixed.png`
- `qa-screenshots/bp002-desktop.png`
- `qa-screenshots/bp002-mobile-full.png`

## 6. Errors or warnings

- Initial `pnpm install` hit pnpm's native build approval guard for `sharp` and `unrs-resolver`; fixed with local `pnpm-workspace.yaml` allowBuilds values.
- Direct Browser plugin screenshot tooling was not exposed in this session; screenshot QA used Playwright CLI with installed system Chrome.

## 7. Remaining risks

- Real BP-001/BP-002 exterior images are not yet supplied.
- Contact channel is not owner-approved.
- Public indexing remains disabled until owner approval.

## 8. Questions requiring Eugene

- Approve final public contact channel.
- Approve real domain and production deployment.
- Approve indexing.

## 9. Recommended next step

Review the local preview at `http://localhost:3008`, then decide whether to keep noindex preview or prepare a protected Vercel preview.
