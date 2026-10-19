# D-Kell Systems

A statically generated Nuxt business website. The original assets and Git metadata are preserved. The supplied business-content file now contains the email confirmed by the owner: **dkellsystems@gmail.com**. No deployment, billing or DNS changes have been made.

## Run locally

Use Node 24 LTS (24.20.0 was used). Nuxt 4.6.1 requires `^22.22.3 || ^24.15.0 || >=26.0.0`.

```powershell
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1
```

Open the Local address printed by Nuxt, normally **http://127.0.0.1:3000**. Keep the terminal running; Ctrl+C stops it. On Windows, `npm.cmd` avoids PowerShell execution-policy changes. On macOS/Linux, use `npm`.

For the production preview:

```powershell
npm.cmd run generate
npm.cmd run preview
```

Open **http://127.0.0.1:3000**. The preview serves `.output/public`, supports direct page visits and returns the custom 404 document for missing paths. Stop any development server using the same port first, or add `-- --port 3100` to the preview command. The preview script wraps Nuxt's underlying static-serving library, avoiding a Nuxt CLI issue that looked for a server entry after static generation. It is a local tool, not a deployed backend.

See [homepage redesign decisions and verification](docs/redesign.md) for the visual system, illustrative compositions and motion behaviour.

## Architecture and decisions

- **Nuxt 4 / Vue 3:** file-based routes generate real HTML for all 12 public pages. Vue hydrates small interactions such as navigation and the enquiry form. There is no runtime server, database, CMS or login.
- **Strict TypeScript:** defines service, client and enquiry data, including absent prices and case-study fields. Optional values are intentional, not unfinished placeholders.
- **Tailwind 4:** uses the officially supported Vite plugin. CSS variables in the preserved `design/brand-tokens.css` provide the five approved colours. Shared CSS handles the editorial layouts; utility classes handle small layout variations.
- **Static Firebase Hosting:** can serve the generated files over HTTPS without App Hosting or SSR infrastructure. Every service has an HTML file, so no catch-all SPA rewrite is needed.
- **Shared components:** navigation, footer, service cards, page intros, process, contact call-to-action, client banner and form fields are reused. The six service pages use one `[slug].vue` template.
- **Enquiries:** pure functions validate the form and encode a WhatsApp draft. The visitor reviews the draft and sends it through WhatsApp. Nothing is stored or submitted to this website. Changing a reviewed field hides the old review until it is validated again.
- **Clients:** a single client appears once with no controls. More clients enable manual, labelled previous/next controls and a polite announcement. There is no autoplay.
- **Accessibility:** semantic landmarks, unique titles, route announcements, skip link, labels, inline errors, focus on the first invalid field, keyboard menu dismissal, visible focus, reduced motion and mobile layouts. Automated checks do not replace assistive-technology testing.

## Where to edit

| Location                              | Responsibility                                                                   |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `project-brief/business-content.json` | Business facts, service names, prices, client fields, confirmed contact details  |
| `app/data/business.ts`                | Typed service descriptions, planning copy, client logo mapping, price formatting |
| `app/utils/enquiry.ts`                | Form validation, query preselection, message formatting and URL encoding         |
| `app/pages/`                          | Home, services, service detail template, work, about, contact and privacy        |
| `app/components/`                     | Reusable presentation and interactions                                           |
| `app/assets/css/main.css`             | Responsive design and shared component styles                                    |
| `app/composables/usePageSeo.ts`       | Titles, descriptions, Open Graph, canonical URLs and organisation data           |
| `shared/site.mjs`                     | Origin validation, route list and sitemap generation                             |
| `scripts/postgenerate.mjs`            | Verify generated pages; write robots, sitemap and static 404                     |
| `scripts/preview.mjs`                 | Local static preview with real missing-page status                               |

To add pricing, supply a non-negative `startingPrice`, `currency` and optional `priceScope` in the relevant service entry. The type supports these fields; absent amounts display **Request a quote**. The final quote remains dependent on requirements. No amounts have been invented.

To add a client, supply its name and optional logo/project fields. Approved logo paths can be added to the source JSON; Gemsbyw currently uses the real supplied PNG via the data mapping. Do not publish unapproved details or testimonials.

## SEO and business identity

The confirmed production origin is **https://dkellsystems.web.app**, stored in `project-brief/business-content.json`. Both Nuxt and static sitemap generation use it by default. `NUXT_PUBLIC_SITE_ORIGIN` optionally overrides it; `.env.example` contains the production value. An explicitly blank override disables indexing and omits canonical URLs for local-only builds. Regenerate after changing the origin.

Canonical links, Open Graph URLs, Twitter/X titles and descriptions, organisation data, sitemap and robots use this configuration. An approved social-share image is still outstanding. See [Firebase instructions](docs/firebase.md) and [deployment readiness](docs/deployment-readiness.md) for the prepared deployment and remaining limitations.

## Checks

```powershell
npm.cmd run lint
npm.cmd run format:check
npm.cmd run typecheck
npm.cmd run test:unit
npm.cmd run generate
npm.cmd run test:e2e
```

`npm.cmd run format` formats application code and documentation. Vitest covers validation, encoding, service preselection, optional pricing, origin configuration and single/multiple-client behaviour. Playwright checks generated routes, 404s, contact journeys, navigation, keyboard use and asset loading at desktop/mobile sizes. Run generation before browser tests.

Local browser tests use installed Microsoft Edge. CI installs Playwright Chromium on Ubuntu. These are mobile viewport emulation checks, not physical iOS/Safari testing. Browser screenshots and failure traces are ignored under `test-results/`. GitHub Actions runs lint, formatting, types, unit tests, generation and browser tests without deployment credentials. See [verification](docs/verification.md) for actual results; a configured workflow is not a claimed remote CI run.

## Assets and outstanding content

The supplied generated raster reproduction is used in the header. It resembles the selected board but is not an original vector master. The untouched SVG redraws and favicon are approximate drafts. Brand boards are references only and are not served as logos. The client PNG is present despite the initial inventory marking it missing.

Manrope Latin variable WOFF2 is self-hosted with its SIL OFL licence. Sources and provenance are recorded in `public/fonts/README.md`. There are no runtime Google Fonts requests, analytics, advertising scripts or tracking cookies.

Still needed: an approved production vector master; optional starting prices with scope; approved project descriptions/screenshots; the final social-share image. Email is confirmed. No testimonials or business outcomes have been fabricated.

See [Firebase deployment instructions](docs/firebase.md), [portfolio case-study draft](docs/portfolio-case-study.md) and [future portal plan](docs/future-portal.md).
