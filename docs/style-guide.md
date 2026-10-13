# Style Guide

How the Core website is written and built. Keep this file in step with the code.

## Terminology

Use one term per concept, everywhere: page copy, metadata, structured data, emails, footer.

| Concept | Use | Do not use |
|---|---|---|
| The people and organisations who hire us | **clients** | customers (for us), partners, accounts |
| The people our clients serve | **customers** | users (except for apps), members, patients (except in an industry example) |
| A piece of work we do for a client | **project** | engagement, solution, initiative |
| A message sent through the form | **enquiry** | submission, lead, request |
| The main call to action | **Start a project** | Get started, Contact us to get started, Describe your idea |
| The nav/footer link to /contact | **Contact** | Get in touch, Reach out |
| The first step of our process | **Discovery** | Kick-off, onboarding |
| Our reply time | **within 3 business days** | 72 hours, shortly, ASAP |

### Service names (exact, everywhere)

1. Websites
2. 3D and interactive websites
3. Mobile apps
4. Custom software
5. AI automation
6. SEO
7. Branding

"Other projects" is the catch-all, and "Something else or not sure yet" is its form option.

## Tone

- Plain, specific and calm. Say what we do, what the client gets and what happens next.
- Short words. Mix sentence lengths. Not every paragraph needs a closing line.
- No rhetorical questions as headings. No slogans. No "not just X, it's Y".
- No em dashes in copy. Use a full stop, a comma or a colon.
- Sentence case for every heading, button and label. Only the brand name is capitalised mid-sentence.
- Never invent clients, numbers, reviews, awards or certifications. Real data that is missing is marked `[PLACEHOLDER]`.
- Banned words: unlock, elevate, empower, seamless, leverage, cutting-edge, state-of-the-art, revolutionize, supercharge, next-level, game-changing, holistic, robust, scalable solutions, tailored solutions, fast-paced, digital landscape, journey, synergy, transform your business, passionate, world-class.

## Page jobs

| Page | Job | Shape |
|---|---|---|
| Home | Persuade | One statement, the services as a list, who we work with in one paragraph, the process in one line, one CTA |
| Services | Help people find what they need | Index at the top, one section per service in the same order, industry examples as a table, the catch-all |
| About | Build trust | What we believe in prose, concrete commitments, why we work across industries |
| Process | Reduce uncertainty | Each step: what we do, what we need from you, what you get. Honest answers to common questions |
| Contact | Make reaching out effortless | The form first, what happens next beside it, the email address as an alternative |

Each page ends with exactly one call to action (except Contact, which is the action).

## Design tokens

Defined in `src/app/globals.css`. Values are measured from the reference; see `docs/desktop-plan.md`.

| Token | Value | Use |
|---|---|---|
| `desk` | `#f5f5f5` | Page background; the hero adds the dot grid (`desk-dots`) |
| `ink` | `#000` | Headings and primary text |
| black at 60% / 55% / 50% | | Body copy, secondary text and captions (all 4.5:1 or better on the desk) |
| `link` | `#0a5fd1` | Text links and the menu bar action (5.4:1 on the desk) |
| `select` | `#0f7fff` | Focus ring and selection |
| `danger` / `success` | `#b42318` / `#17803d` | Form results |

- **Type:** Inter 400/500 for everything. JetBrains Mono only in the dark note.
- **Voice on Home:** lowercase headings, labels and buttons, matching the reference. Inner pages keep sentence case for long-form reading. Brand and service names keep their spelling in content files and are lowercased in CSS only where the design calls for it.
- **Windows:** `.aqua` (metal frame), `.card-win` (white card with a tinted bar), `.aqua-notes` (yellow notes). Captions use `.win-caption`.
- **Buttons:** `pill-blue` (main action), `pill-grey` (secondary), plus orange, teal, pink and green pills for speech bubbles. `badge` labels each section.
- **Motion:** `rise-in` for entrances, `win-enter`/`win-exit` for windows, the zoom dialog pop, and the focus dimming of feature rows. All off under `prefers-reduced-motion`.

## Components

| Component | Where | Notes |
|---|---|---|
| `btn-primary` | Main action on a page | Accent fill. One per view where possible |
| `btn-secondary` | Alternative action | Border, no fill |
| `link` | Inline and standalone text links | Accent, underline on hover, never "click here" |
| `field` | All inputs, selects and textareas | Same height, border, focus ring and error state |
| `CtaSection` | Last section of each page | A small "New enquiry" window on the desk |
| `PageIntro` | Top of inner pages | Path-bar breadcrumb, H1, one lead paragraph |
| `WindowFrame` | Any window | Title bar with pinstripes when active; close button only when closing works |
| `Desktop` + `ManagedWindow` | Hero and the services desktop | Draggable, stackable windows; see `docs/desktop-plan.md` |
| `chip` | Small toggles inside demos | Uses `aria-pressed` for its selected state |
