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

Defined in `src/app/globals.css` under `@theme`.

| Token | Value | Use |
|---|---|---|
| `ink` | `#1c1917` | Headings, primary text on light backgrounds, footer background |
| `body` | `#44403c` | Body text |
| `muted` | `#6b6560` | Secondary text, captions (5.6:1 on white) |
| `line` | `#e7e3dd` | Borders and dividers |
| `surface` | `#f7f5f2` | Alternate section background |
| `accent` | `#1f5c45` | Primary buttons, links, focus ring (8:1 on white) |
| `accent-hover` | `#17483a` | Hover and active state of accent |
| `success` / `danger` | `#1f5c45` / `#a1281c` | Form result messages |
| `--radius` | `6px` | The only corner radius |

- **Font:** Inter, weights 400 and 600 only.
- **Type scale:** `text-sm` (captions, labels), `text-base` (body), `text-lg` (lead), `text-2xl` (H2), `text-4xl`/`text-5xl` (H1). H3 uses `text-lg font-semibold`.
- **Spacing:** sections use `py-16 sm:py-20`; stacks use multiples of 4 from Tailwind's scale.
- **No** shadows, gradients, blur, pills, or decorative images.
- **Motion:** colour transitions only (150ms) on hover/focus. Disabled under `prefers-reduced-motion`.

## Components

| Component | Where | Notes |
|---|---|---|
| `btn-primary` | Main action on a page | Accent fill. One per view where possible |
| `btn-secondary` | Alternative action | Border, no fill |
| `link` | Inline and standalone text links | Accent, underline on hover, never "click here" |
| `card` | Bordered block | Border + radius, no shadow, never a hover effect unless the whole card is a link |
| `field` | All inputs, selects and textareas | Same height, border, focus ring and error state |
| `CtaSection` | Last section of each page | Left-aligned, on `surface` |
| `PageIntro` | Top of inner pages | Breadcrumb, H1, one lead paragraph |
