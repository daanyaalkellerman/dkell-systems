# Homepage and shared-layout redesign

Implemented locally on 19 October 2026. No deployment or dependency upgrade is part of this change.

## Design decisions

The Revolut reference was inspected for its section progression and focused feature storytelling. D-Kell retains its own logo, approved palette, content and business identity. No financial interface, reference-site wording or imagery was copied.

The homepage now progresses through a descriptive hero, the single-client recognition strip, all six services, an administration/automation/dashboard feature, a website/store feature, the five-step process, maintenance and support, and a closing WhatsApp enquiry section.

The shared visual system uses a 1240px content limit, fluid headings, 16–18px body copy, restrained borders, consistent button treatment and responsive spacing. The old accumulated stylesheet overrides were replaced. `main.css` owns the shared layout system; `illustrations.css` owns the illustrative interfaces. The service, work, about and contact pages use the same system without inheriting the large homepage hero.

The hero and feature compositions use HTML/CSS, with explicit illustrative labels. They are not working products, client screenshots or measured results. Their dimensions reserve layout space. No animation library or new dependency was introduced.

## Navigation and motion

The sticky header keeps its height when its background/border changes. Scroll padding and anchor margins account for it. The mobile/tablet menu closes through its button, Escape, outside interaction, leaving the header by keyboard or route navigation. Without JavaScript, navigation links remain expanded and usable.

`RevealBlock.vue` uses an IntersectionObserver to add a single 550ms opacity/18px entrance animation. Content is visible by default, so failed or unavailable observation cannot strand invisible content. Reduced-motion CSS disables animation and smooth scrolling, including when a visitor changes the preference after load. Button and link transitions use short durations; there is no autoplay, continuous animation, scroll hijacking or parallax.

## Preserved behaviour

All routes, SEO/static generation, typed services, optional prices, client configuration, email and enquiry functions are preserved. Service detail enquiry links still preselect their service. Visitors review WhatsApp messages and send them themselves; the website does not store submissions. The header and closing section now also provide direct WhatsApp links. Client login remains future-only.

## Verification

The browser suite retains the prior meaningful assertions. The duplicated contact email is now scoped to the main contact content in its assertion, and the 768px tablet uses the same menu checks as mobile. Additional checks cover shared-page screenshots, horizontal overflow, reduced motion, unavailable observation, sticky-header height and service/footer links. Review sizes are 390px, 768px and 1440px.

Final local results: ESLint, Prettier and strict TypeScript checks passed; all 10 unit tests and all 15 browser tests passed. Static generation verified all 12 public routes. Screenshots were captured at 390px, 768px and 1440px, with visual review of the homepage at each size and representative shared pages, including Contact. No Lighthouse score, physical-device test or remote CI run is claimed.

The previously recorded 11 high-severity dependency advisories remain separate in `verification.md`; no dependency or security changes were mixed into this redesign. No Firebase deployment was performed.
