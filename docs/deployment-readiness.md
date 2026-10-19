# Deployment readiness: 19 October 2026

Project: `d-kell-systems`. Production origin: `https://dkellsystems.web.app`. Static output: `.output/public`. No deployment performed.

## Dependency review

A fresh `npm.cmd audit --json --offline=false` reported **11 high-severity findings**, zero moderate and zero critical. These are package-chain findings around two underlying advisories, not 11 independent application vulnerabilities:

- Installed `braces@3.0.3`: deeply nested patterns can exhaust the stack. Dependency path: Nuxt / Nitro / globby / micromatch / braces. [Advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- Installed `node-forge@1.4.0`: malformed RSA signature structures can be accepted. Dependency path: Nuxt / Nitro / listhen / node-forge. [Advisory GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv).

The online `npm audit fix --dry-run --json --offline=false` now proposes a Nitro patch update from 2.13.4 to 2.13.5, but its projected audit still reports all 11 findings. This supersedes the earlier report of zero proposed package changes. npm also suggests a forced Nuxt downgrade to 4.1.3 for part of the chain. No upgrade, forced downgrade or dependency override was applied. This task reviews deployment readiness rather than changing the dependency stack.

The machine has npm offline mode enabled. An initial plain audit misleadingly returned zero; that result was discarded. Always use `--offline=false` for the current advisory check.

These packages belong to the Node build/development toolchain. Firebase publishes only static HTML, CSS, browser JavaScript, images and fonts; it does not run this Node/Nitro dependency tree as a server. The application does not feed visitor input to these libraries. This limits the deployed site's exposure, but does not resolve the toolchain vulnerabilities or establish a clean security audit. Keep development servers local and assess upstream fixes before moving this application to SSR or exposing build tools to untrusted input.

## Other outstanding items

- No approved social-share image is available. Social title, description and canonical URL are configured; image previews are not guaranteed.
- The supplied logo reproduction and SVG/favicon drafts remain provisional, as documented in the original handoff.
- The emulator made read-only Firebase API requests confirming the active project during the earlier check; the target-specific verification below supersedes that default-site check. This does not test deployment permissions or a live release. Actual deployment remains with the owner.
- No custom domain, DNS, billing or live release was changed. No Lighthouse, physical-device or remote CI result is claimed.

## Verification

- ESLint, formatting and strict TypeScript: passed.
- Unit tests: 10 passed across 3 files.
- Production generation: all 12 public routes generated successfully using the confirmed origin.
- Firebase Hosting emulator: passed. All 12 routes returned 200 with the expected canonical, Open Graph, Twitter/X and organisation metadata. Sitemap and robots matched the production origin. Both a missing top-level page and a missing service returned the custom noindex 404 document with HTTP 404. The Gemsbyw screenshot returned 200 as PNG.
- Browser suite: all 15 tests passed across desktop, tablet and mobile, covering generated routes, contact journeys, navigation, assets, no-JavaScript fallback and responsive layouts.

The build emitted the existing font-resolution/timing diagnostics and a Nitro cache-driver resolution warning. Generation and emulator verification succeeded; the public font is present. These are recorded as build warnings, not hidden test failures. The deployment artifact is the generated static directory, not the temporary prerender server.
