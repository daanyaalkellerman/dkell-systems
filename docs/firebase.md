# Firebase Hosting

Prepared for project **d-kell-systems**. Nothing has been deployed by this preparation task. This is static Firebase Hosting; no application server, Firebase SDK, database or authentication service is required.

## Production identity

The canonical production origin is **https://dkellsystems.web.app**. The existing `.firebaserc` already selects `d-kell-systems`. The Hosting site is `dkellsystems`, mapped to target `dkell` under project `d-kell-systems`. `firebase.json` selects that target. The same site is also available at `https://dkellsystems.firebaseapp.com`; metadata consistently identifies the `web.app` address as canonical.

`project-brief/business-content.json` stores the confirmed origin. Both Nuxt and the post-generation script read it by default, so a clean checkout generates the same production identity. `NUXT_PUBLIC_SITE_ORIGIN` can override it; an explicitly blank value creates a non-indexable local-only build. Remove that blank override before generating for deployment. `.env.example` contains the production value.

Every public page receives its canonical URL, Open Graph URL/title/description, Twitter/X summary title/description and organisation URL. The sitemap contains all 12 public routes and robots permits indexing. The custom 404 remains noindex. An approved social-share image is still outstanding, so no `og:image` or large-image card is claimed.

## Static routing

`firebase.json` serves **.output/public**. Nuxt generates `index.html` for each public route, including nested service pages. `cleanUrls: true` and `trailingSlash: false` provide URLs consistent with the canonical links. There is no catch-all SPA rewrite or server-function rewrite. Firebase resolves the generated files directly and uses `.output/public/404.html` for missing paths with a real 404 response. Hashed `/_nuxt/` assets retain immutable caching.

## Build and review

From the repository root:

```powershell
npm.cmd run lint
npm.cmd run format:check
npm.cmd run typecheck
npm.cmd run test:unit
npm.cmd run generate
npm.cmd run test:e2e
npm.cmd audit --json --offline=false
```

The online audit currently exits nonzero because of unresolved advisories; see [deployment readiness](deployment-readiness.md). Do not interpret an offline audit as a clean security result.

For the ordinary local preview:

```powershell
npm.cmd run preview
```

Open http://127.0.0.1:3000. For a Firebase-specific local verification, with Firebase CLI installed:

```powershell
firebase.cmd emulators:exec --only hosting --project d-kell-systems "node scripts/verify-hosting.mjs"
```

This only starts a local emulator and checks generated routes, SEO, assets and missing-page responses. It does not deploy. The verification script defaults to http://127.0.0.1:5000; pass a different base URL if using a different emulator port.

## Deploy yourself

Authenticate using `firebase login` if needed. After reviewing the output and unresolved issues, run:

```powershell
firebase deploy --only hosting:dkell --project d-kell-systems
```

Do not rerun `firebase init` over the prepared configuration. Only `.output/public` is published. No billing, DNS, custom-domain or live hosting changes were made by this task. If a custom domain is selected later, update the configured origin and regenerate before redeploying.

Official references:

- [Hosting and default domains](https://firebase.google.com/docs/hosting)
- [Hosting configuration, static files, custom 404 and trailing slashes](https://firebase.google.com/docs/hosting/full-config)
- [Hosting usage and quotas](https://firebase.google.com/docs/hosting/usage-quotas-pricing)
