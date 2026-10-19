# Verification

For current production-origin configuration, fresh advisory findings and final static checks, see [deployment readiness](deployment-readiness.md). Earlier results below are historical.

For the 19 October homepage and shared-layout redesign, see [redesign decisions and verification](redesign.md): 10 unit tests and 15 browser tests passed. The initial implementation report below is retained as historical context.

Local verification on 18 October 2026, using Node 24.20.0 on Windows.

## Completed checks

- ESLint: passed.
- Prettier formatting: passed.
- Nuxt strict type checking: passed after aligning Vue Router with Nuxt 4.6.1's declared Vue Router 5 dependency.
- Vitest: 3 files, 10 tests passed. Includes encoding, validation, service preselection, optional prices, client banner behaviour and origin/sitemap rules.
- Static generation: 12 public routes verified. Every service route has real HTML; robots, sitemap and a custom static 404 are generated.
- Playwright: **12 tests passed** across desktop, tablet and mobile. These cover route HTML and metadata, real 404 responses, service preselection, validation, message encoding, confirmed email, keyboard/mobile navigation, loaded assets, no horizontal overflow, no page JavaScript errors and the JavaScript-disabled contact fallback.
- Desktop, tablet and mobile homepage screenshots inspected. Images and the self-hosted font loaded; no horizontal overflow or page JavaScript errors were found in the checked journeys.
- `git diff --check`: passed. Original reference boards, brand assets, palette, client image and handoff documents are unchanged. The source business JSON was updated only for the owner-confirmed email and confirmation flag, plus a final newline.

## Issues found and resolved

The first type check found a malformed dropdown tag, which was corrected. The expanded routed site exposed a Vue Router version mismatch; Vue Router 5.4.0 now matches Nuxt's declared requirement. Nuxt's preview command tried to run a nonexistent server entry after generation, so the project uses a small local static preview wrapper with real 404 responses. Initial browser runs against the development server timed out; the final checks target the actual generated output. The JavaScript-disabled test found an invisible noscript message in Edge; the message is now rendered as normal HTML until hydration completes. Windows sandbox process-spawn restrictions required the unit/browser tests to run with explicit tool permission.

## Dependency advisory limitation

`npm audit fix --dry-run --json` reported **11 high-severity dependency findings**, with **zero proposed non-breaking package changes**. These trace to `braces` (deeply nested pattern denial of service) and `node-forge` (signature verification) and their dependency chains. The audit suggests a forced Nuxt downgrade to 4.1.3 for part of the chain; that was not applied because this project uses the requested current stable Nuxt release. No speculative overrides were added.

The production deliverable is static files; these Node build/server packages are not a deployed application server. This does not make the build toolchain advisory-free. Recheck and resolve/assess the advisories before production deployment. The repository is not represented as passing a clean security audit.

## Other limitations

No Firebase deployment, custom-domain/DNS change, remote GitHub Actions run, Lighthouse score, physical-device test, Safari test or screen-reader audit is claimed. Browser coverage uses Edge/Chromium and emulated viewport sizes. GitHub Actions is configured for Chromium on Ubuntu but has not run remotely from this workspace.

Without a confirmed business origin, canonical/Open Graph URLs are deliberately omitted, the sitemap is empty and indexing is disabled. The sitemap generator is unit tested with an isolated example domain; no example domain is published as business identity. The supplied generated logo reproduction and SVG/favicon drafts are provisional. No project outcomes or client testimonials are asserted.

Build warnings include a font URL left for runtime resolution (the public font file is copied and browser-tested) and Nuxt/Vite timing diagnostics. They did not prevent generation. The site uses no server endpoints or runtime Firebase services.
