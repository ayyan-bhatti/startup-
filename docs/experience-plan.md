# Experience plan: dark, 3D and scroll-driven

Written before building, following the installed `frontend-design` skill (plan, review against the brief, then build).

## 1. Concept: "Strata"

The company is called **Core**. Every project we describe starts in the middle (what the business needs) and is built outward in layers: Discovery, Design, Development, Testing, Launch, Support.

So the whole site is set inside one idea: **a molten core wrapped in layered shells, like the strata of a planet.**

- **The dark world:** warm basalt, not cold black. Surfaces are layered rock tones, so depth comes from material, not from glow or blur.
- **The 3D motif:** one procedural object: a small bright core inside concentric low-poly shells. It appears on Home as the hero, and on Process it is built shell by shell as you scroll through the six steps. It is never decoration for its own sake: it is a picture of how we work.
- **The motion language:** slow, heavy, geological. Things settle into place. No bounce, no springy UI, no fade-up on every section.

### Review against the skill's list of generic defaults

| Default the skill warns about | Where my first draft landed | Revision |
|---|---|---|
| Near-black with one bright acid-green or vermilion accent | First idea was near-black + the existing green brightened for dark mode | Changed to **warm basalt + molten amber**. The amber is the core's own colour, so the accent means something. Base is a warm brown-black, not neutral #0B0B0B/#111 |
| Default typefaces | Site used Inter | Changed to **Bricolage Grotesque** for display (its optical sizing and slight irregularity suit "material, made by hand") and **Instrument Sans** for body |
| Floating blobs, purple gradients, glassmorphism | Not used | Kept out. The only glow is the core itself |
| SaaS-card kit, one radius everywhere, soft shadows | Removed in the last pass | Kept out. Depth comes from surface tones and borders |
| Eyebrows in caps, `A · B · C` meta strings, `→` on links, mono labels | None present | Kept out |
| Numbered markers | Only used where content is a real sequence (Process steps) | Kept, because Process is a sequence |
| Fade-and-slide-up on every section | Tempting for a "scroll-animated" brief | **One** orchestrated moment per page at most. Scroll motion is tied to meaning (the shells being built), not applied to every block |

**Where the boldness is spent:** the core object. Everything around it stays quiet: plain type, left-aligned text, generous dark space.

## 2. Tokens

| Name | Hex | Use |
|---|---|---|
| `base` | `#14110e` | Page background (basalt) |
| `surface` | `#1c1915` | Raised sections, footer, form fields |
| `surface-2` | `#26221c` | Hover/active surfaces, table header |
| `line` | `#3b352d` | Borders, dividers |
| `ink` | `#f3ece1` | Headings, primary text (16:1 on base) |
| `body` | `#d3cabc` | Body text (11:1) |
| `muted` | `#a39886` | Secondary text (6.7:1) |
| `accent` | `#f0a54a` | The core: primary buttons, links, focus ring (9:1 on base) |
| `accent-hover` | `#f7c27e` | Hover state of accent |
| `on-accent` | `#1a1207` | Text on amber buttons (9.5:1) |
| `danger` | `#ff9b8a` | Error text and borders (8:1) |
| `success` | `#a6d9a8` | Success border (11:1) |

- `color-scheme: dark`, `theme-color: #14110e`, dark favicon, dark OG image, dark emails.
- Radius: 6px on controls only. Sections have none.
- Type: Bricolage Grotesque 600 for headings, Instrument Sans 400/600 for everything else.

## 3. Page by page

| Page | What the visitor should feel | 3D / motion | Why it earns its place |
|---|---|---|---|
| **Home** (persuade) | "These people make things that feel finished." | Hero: the core object, slowly turning, leaning toward the pointer. As you scroll past the hero the shells drift apart (an exploded view), then the canvas stops rendering. | It shows the craft in the first second. It also says plainly in the copy that 3D and interactive websites are something we build for clients. |
| **Services** (find what you need) | Calm and easy to scan. | **No WebGL.** The index stays sticky; the active section is highlighted in the index as you scroll. | People come here to find and compare. A 3D scene would slow them down. |
| **About** (trust) | Steady and honest. | No WebGL. One quiet moment: the "What we believe" statement is set large; nothing animates. | Trust is built by plain words. Motion here would feel like a sales trick. |
| **Process** (reduce uncertainty) | "I can see exactly where I'd be at each step." | A sticky core beside the six steps. Each step you scroll past adds its shell around the core (step 1 = the core alone, step 6 = all six shells). Scrubbed directly by scroll position, so it moves forward and back with you. | The object is a literal diagram of the process. The text is complete without it. |
| **Contact** (reach out effortlessly) | Nothing in the way. | No WebGL. After a successful send, a small static core in the confirmation pulses once (motion that answers the action). | The form is the job. |
| **404 / error / loading** | Oriented. | Static. | — |

## 4. Motion system

Defined once in `src/lib/motion.ts` and as CSS custom properties in `globals.css`.

| Token | Value | Use |
|---|---|---|
| `--ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | Things arriving and coming to rest |
| `--ease-move` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things moving between two states |
| `--dur-fast` | `150ms` | Hover, press, focus |
| `--dur-base` | `300ms` | Menus, small state changes |
| `--dur-slow` | `900ms` | The one entrance per page (canvas arriving) |
| Stagger | `60ms` per item, max 6 items | Mobile menu items only |
| 3D damping | `1 - exp(-4 · dt)` per frame | Pointer lean and scroll scrub: follows the input, never overshoots |

**Scroll conventions**
- Scroll drives progress values (0 to 1). Scenes read the value; they never set scroll position.
- No scroll hijacking: no snapping, no pinning that blocks scrolling. "Pinned" visuals use CSS `position: sticky`, so the page always scrolls at the user's speed.
- Only `transform` and `opacity` are animated in the DOM.
- No content is hidden waiting for an animation. All text is visible in the HTML from the first paint.

## 5. Performance budget

| Item | Budget |
|---|---|
| JavaScript on first load (excluding 3D) | No more than the current site + 10 kB |
| 3D chunk (three + scene) | ~160 kB gzip, loaded only when needed |
| Hero first paint | Real text and a static picture of the core, with no 3D code |
| Layout shift | 0. Every canvas sits in a box with a fixed aspect ratio |
| Pixel ratio | Capped at 1.5 |
| Draw calls per scene | Under 15 |
| Lighthouse (mobile) | Performance 90+, SEO 100, Accessibility and Best Practices 95+ |

## 6. Fallbacks

The 3D only loads when **all** of these are true:
1. The visitor has not asked for reduced motion.
2. WebGL is available.
3. The screen is at least 768px wide (phones get the static picture, which saves battery and data).
4. The device is not low-power: `navigator.hardwareConcurrency > 4`, `deviceMemory` (when reported) above 4, and no `Save-Data`.

Otherwise the static SVG core stays in place. It is the same composition, so nothing looks missing.

While running:
- Rendering stops when the canvas leaves the screen (IntersectionObserver) or the tab is hidden.
- All geometry, materials and the renderer are disposed when the page changes.

Smooth scrolling only runs with a fine pointer (mouse or trackpad) and no reduced-motion preference. It uses the browser's native scroll position, so anchor links, keyboard scrolling, back/forward, find-in-page and touch scrolling keep working.
