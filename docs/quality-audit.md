# Quality & Authenticity Audit

Audit of the site as it stood before the quality pass (October 2026). Line numbers refer to that version. Each item is marked with how it was resolved.

## A. Layout and structure

| # | Problem | Location | Resolution |
|---|---|---|---|
| A1 | Every inner page uses the same skeleton: dark hero with breadcrumb, then card grids, then the same dark CTA banner. Nothing about the layout reflects the page's purpose. | `components/PageHero.tsx`, all `app/*/page.tsx` | Each page restructured around its job (see style guide, "Page jobs"). |
| A2 | Home is the textbook template: hero + illustration, "stages" row, 3-column card grid, pill cloud, step cards, "why choose us", CTA banner. | `app/page.tsx:58-201` | Rebuilt: left-aligned statement hero, services as a two-column definition list, one paragraph on who we work with, a compact process line, one CTA. |
| A3 | "Why choose us" on Home (`app/page.tsx:178-198`) repeats the commitments on About (`app/about/page.tsx:38-43, 112-120`) and the values (`about/page.tsx:30-35`). The same idea appears three times. | as listed | Kept once, on About, as concrete commitments. Removed from Home. Values merged into it. |
| A4 | Duplicate CTAs. Services ends with an "Anything else" button (`services/page.tsx:104`), three inline links (`:129-133`) and a CTA banner (`:137`) back to back. Home has a card CTA (`page.tsx:128-134`) just above the industry link and the final banner. | as listed | One closing CTA per page. Inline links kept only where they help navigation. |
| A5 | Home "Start / Build / Launch / Scale" row (`page.tsx:86-106`) is filler: it restates the headline in four boxes. | `app/page.tsx:86-106` | Deleted. |
| A6 | Three-column card grids used for everything: services, industries, values, breadth, process. | `page.tsx:116`, `services/page.tsx:117`, `about/page.tsx:87,100`, `process/page.tsx:27` | Replaced with definition lists, a table (industries), split layouts and plain prose. |
| A7 | Centered blocks: CTA banner, "anything else" card, 404. | `CtaSection.tsx:13`, `page.tsx:128`, `not-found.tsx:13` | Left-aligned. |
| A8 | Process page gives a one-line summary and a paragraph per step but does not answer the questions that cause uncertainty (what do I need to do, what do I receive, how long, what does it cost). | `app/process/page.tsx` | Each step now states what we do, what we need from you and what you get. Added honest answers to common questions. |
| A9 | Contact page ends without a clear statement of what happens after sending, and its side panel duplicates the "3 business days" sentence from the hero. | `app/contact/page.tsx:40,61` | Restructured: form first, short "what happens next" list beside it, no repetition. |

## B. Copy

| # | Problem | Location | Resolution |
|---|---|---|---|
| B1 | Banned word "journeys". | `content/industries.ts:13` | Rewritten. |
| B2 | Em dashes in email subjects and sign-offs. | `lib/email-templates.ts:25,37,48,53,59,71`; `globals.css:4` | Replaced with plain punctuation. |
| B3 | Rhetorical questions as headings and openers: "Ready to build something?", "Ready for your discovery call?", "Not sure where to start?", "Ready to grow your business?", "Prefer email?", "Have an idea or a new business?", "Not listed?". | `page.tsx:92,201`, `process/page.tsx:53`, `services/page.tsx:126,137`, `CtaSection.tsx:4`, `contact/page.tsx:52` | Replaced with plain statements. |
| B4 | Slogan-style lines and punchy closers: "If it can be built, we can build it", "…and every other industry", "Every industry, every size, everywhere", "Results over buzzwords", "Honesty first", "Any business · Any industry · Anywhere". | `content/services.ts:136`, `services/page.tsx:100,111,125`, `page.tsx:62,144,152`, `about/page.tsx:31-34` | Rewritten as specific sentences. The universal positioning is kept but said plainly. |
| B5 | Forced rule-of-three: every service has exactly three "outcomes" pills, every list has 3 or 4 items of identical shape. | `content/services.ts` (`outcomes` on every item), `about/page.tsx:15-28` | `outcomes` removed. List lengths now follow the content. |
| B6 | Vague claims: "a brand people remember", "steady, compounding growth", "fresh eyes", "ideas travel between industries". | `content/services.ts`, `about/page.tsx:16-27` | Replaced with what we actually deliver. |
| B7 | Inconsistent terms: "clients" / "customers" / "users" / "members" for the people we work for; "enquiry" / "message" / "project"; primary CTA labelled "Start your project", "Get started", "Contact us to get started", "Describe your idea", "Tell us what you have in mind", "Explore what we do". | across `app/`, `components/Header.tsx:23`, `MobileMenu.tsx:52`, `CtaSection.tsx:17` | One term per concept, documented in `docs/style-guide.md` and applied everywhere including metadata, schema and emails. |
| B8 | Service names differ between places: "AI-Powered Automation" (services), "AI automation" (description, OG), "Branding & Image" vs "branding". | `content/services.ts`, `config/site.ts:11-12`, `lib/og.tsx:32` | One name per service, used everywhere. |
| B9 | Mixed heading capitalisation (Title Case in metadata, sentence case on page). | metadata in each `page.tsx` | Sentence case everywhere except the brand name. |
| B10 | "All rights reserved" boilerplate. | `components/Footer.tsx:45` | Removed. |

## C. Visual design

| # | Problem | Location | Resolution |
|---|---|---|---|
| C1 | Indigo accent (`#4f46e5`) and an indigo gradient on the OG image: the most common AI-generated palette. | `globals.css:5-8`, `lib/og.tsx:18`, `app/icon.svg`, `apple-icon.tsx`, `Logo.tsx` | New restrained palette: one deep green accent on warm neutrals. Flat colours only. |
| C2 | Five different radii (`rounded-md`, `-lg`, `-xl`, `-2xl`, `-full`) and three shadows (`shadow-sm`, `shadow`, `hover:shadow-lg`). | see grep counts: `page.tsx:119,128,147,151,165`, `services/page.tsx:71,89,97,119,124`, `about/page.tsx:78,89,112`, `process/page.tsx:29,31`, `CtaSection.tsx:13`, `ContactForm.tsx:9,62,146`, `MobileMenu.tsx:26,37,44` | One radius token (`--radius`, 6px). No shadows. Borders instead. |
| C3 | Pill badges / tag clouds. | `page.tsx:147-152`, `services/page.tsx:89` | Removed. |
| C4 | Hover lift (`hover:shadow-lg`) on cards that are not clickable. | `page.tsx:119` | Removed. |
| C5 | Decorative illustration that says nothing (`hero-illustration.svg`), used twice. | `page.tsx:75`, `about/page.tsx:72`, `public/hero-illustration.svg` | Deleted. |
| C6 | Four font weights in use (400, 500, 600, 700). | 26× `font-bold`, 15× `font-medium`, 37× `font-semibold` | Two weights: 400 and 600. Only those are loaded. |
| C7 | Raw Tailwind palette colours (`slate-*`, `green-*`, `red-*`) used directly (54 places) with no tokens. | all components | Replaced by named tokens: `ink`, `body`, `muted`, `line`, `surface`, `accent`, `success`, `danger`. |
| C8 | Buttons defined as utilities, but there is no text-link style; links use five different class combinations. | `globals.css:43-52` and inline link classes across pages | Button system: `btn-primary`, `btn-secondary`, `link`. One card style (`card`). One field style (`field`). |
| C9 | Numbered circles on process steps (icon-in-a-circle pattern). | `process/page.tsx:30-35` | Replaced with plain numerals in the type scale. |

## D. Real-world behaviour

| # | Problem | Location | Resolution |
|---|---|---|---|
| D1 | Mobile menu has no focus trap, does not lock background scroll, and the panel is not keyboard-contained. | `components/MobileMenu.tsx` | Focus trap, scroll lock, Escape, close on route change, focus returns to the toggle. |
| D2 | No active nav state on desktop. | `components/Header.tsx:15` | `aria-current="page"` and a visible underline. |
| D3 | No `error.tsx` page. | `app/` | Added. |
| D4 | No overflow protection: long words, long emails or company names can overflow cards and the form's success message. | global | `overflow-wrap: anywhere` on body text, `min-w-0` on grid children, buttons wrap. |
| D5 | Contact form: no double-submit guard beyond `disabled`; network failure (no JSON) shows "Something went wrong." with no next step; success hides the form with no way back except a small link. | `components/ContactForm.tsx:24-58` | Ref guard, human error messages for each failure type with a retry path, input preserved on every error, focus moved to the result. |
| D6 | API error messages are terse ("We could not send your message.", "Email service is not configured.") and surface as "… Please try again, or email us directly." without the email address. | `app/api/contact/route.ts:33,48`, `ContactForm.tsx:146` | Messages rewritten; the error box shows the email address as a working link. |
| D7 | No print styles: header, menu and footer print. | `globals.css` | Print rules added. |
| D8 | Duplicated breadcrumb: visible breadcrumb on every inner page adds a line of chrome with one link. | `components/PageHero.tsx:21-27` | Kept (it is useful and matches the BreadcrumbList schema) but restyled to the type scale. |
| D9 | "Industries" nav item points to an anchor on another page, so it never shows as active and duplicates "Services". | `config/site.ts:28` | Removed from the nav. Industries stay as a section of Services. |

## E. Code

| # | Problem | Location | Resolution |
|---|---|---|---|
| E1 | `Logo` has a `dark` prop that is always `true`. | `components/Logo.tsx` | Prop removed. |
| E2 | `outcomes` field and `audienceSizes` exist only to feed slogan sections. | `content/services.ts`, `content/industries.ts` | Removed with those sections. |
| E3 | No linter configured; `npm run lint` does not exist. | `package.json` | ESLint with the framework's recommended config added; lint, type-check and build all run clean. |
| E4 | CTA, card and link styles repeated inline instead of shared. | all pages | Shared `CtaSection`, `card`, `link`, `btn-*` tokens. |
