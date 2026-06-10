# Decision Log

## 2026-06-04 - Standalone registry site

Decision: Build Burakorn Performance Registry as a separate site at `/Users/carchar/Documents/WEBSITES/burakorn-performance-registry`.

Reason: `burakorn-holding` has explicit rules keeping Burakorn Performance hidden. A standalone preview site avoids weakening those rules.

## 2026-06-04 - Preview-first indexing

Decision: Default `INDEXING_ENABLED=false`.

Reason: The MVP should be public-ready but not indexable until Eugene approves launch/indexing.

## 2026-06-04 - Minimal public routes

Decision: Public v1 includes only home, registry, BP-001, BP-002, philosophy, platform, contact, facts, `llms.txt`, `robots.txt`, and `sitemap.xml`.

Reason: The site should feel sparse by design, not half-empty.
