# Portfolio case-study draft: D-Kell Systems

## Problem and users

D-Kell Systems needs its own business presence, separate from the owner's personal portfolio. Small businesses in South Africa and internationally need to understand the available website and technology services and make a clear enquiry. Some already sell through social media; others need administration, bookings, automation or reporting tools.

## Implementation

Nuxt and Vue provide reusable components and generated HTML for each public route. TypeScript makes optional prices and client content explicit and keeps the enquiry data predictable. Static Firebase Hosting was chosen for a public informational site without server requirements. Hosting configuration is prepared; deployment has not been performed.

Six services use one route template backed by typed data. The homepage introduces services, the five-step process and ongoing support. Work, About, Contact and Privacy pages provide supporting information. The contact form validates input and prepares an encoded WhatsApp draft for the visitor to review and send. It does not store submissions.

## Design and accessibility

The implementation uses the approved teal, ivory, sage, lime and charcoal palette with self-hosted Manrope. The supplied generated logo reproduction remains provisional; the SVG redraws are approximate drafts. A clearly labelled website/system illustration replaces invented client screenshots. Gemsbyw appears once in a reusable banner; no fake outcomes or testimonials are displayed.

Keyboard navigation, a skip link, route announcements, labelled controls, inline form errors, focus management, reduced-motion preferences and responsive layouts are included. The client banner avoids autoplay and adds manual controls only when there is more than one client.

## Validation and limits

See [the verification report](verification.md) for completed checks and limitations. Tests cover message encoding, validation, service preselection, pricing, client banner behaviour, generated routes and key desktop/mobile journeys. The GitHub Actions workflow is configured but a remote run is not claimed. No Lighthouse score, conversion uplift or customer outcome has been measured.

## Future work

Supply approved project case-study material, final brand assets and the business origin, then review and deploy to Firebase Hosting. A client portal is a future phase, using Firebase Authentication, Firestore and tested per-client access rules only after its requirements are defined. It is not part of the delivered public website.

## Interview talking points

- Static generation moves rendering to build time; the host serves HTML and assets without a live Nuxt server.
- Typed data and one service template keep service pages consistent without duplicating six implementations.
- Pure enquiry functions separate business rules from Vue UI and make encoding/validation easy to test.
- Optional prices and project details support incomplete real-world content without invented claims.
- A real 404 and generated route files preserve useful URL behaviour; a blanket SPA rewrite would obscure missing pages.
- A future portal needs server-enforced isolation, not merely hidden client-side links.
