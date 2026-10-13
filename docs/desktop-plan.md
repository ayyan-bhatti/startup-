# The Core desktop

How the home page is built, and where its measurements come from. Read with `docs/style-guide.md`.

## Reference

The home page follows heyclicky.com closely in composition, window style, type and motion. It was inspected in Chrome with Playwright at 1440px, 1920px and 390px: screenshots of every section, computed styles and the site's CSS rules for windows, buttons, captions and sections. Brand, copy, illustrations and demos are original. No reference assets (images, video, logos, illustrations) are used; every drawing is CSS or inline SVG.

Measured values used as tokens:

| What | Value |
|---|---|
| Page and menu bar | `#f5f5f5`; menu bar 53px, bottom border `rgb(0 0 0 / .05)` |
| Hero dot grid | `radial-gradient(rgb(0 0 0 / .13) 1px, transparent 1.3px)`, 34.24 × 34px |
| Type | Inter only. Hero 88px/500, −2.64px tracking. Section titles 56px/500, −1.68px. Body 16–20px, −0.03em |
| Window | 8px radius, padding 8px 4px 4px, brushed gradient `#d6d5d7 → #f0f0f0 → #d6d5d7`, gradient edge black → 10% black, `drop-shadow(0 10px 12px rgb(0 0 0 / .12))`, inset white highlight; screen radius 4px; 12px lights |
| Caption | 12px, 40–50% black, white text shadow |
| Pill button | 40px high, 18px/500, 1px dark border, `0 10px 24px rgb(0 0 0 / .12)`; blue: `#edf4ff → #a2c7ff → #a2d2f7` with `#221898` border |
| Badge | 28px, 12px uppercase, `#fff → #e7e7e7 → #fbfbfb`, `rgb(0 0 0 / .3)` border |
| Motion | hero items rise 8px over .45s ease-out, 16ms apart; zoomed window pops from .94; feature rows not in focus go to 30% opacity and 0.8 scale |
| Layout | home is drawn on a 1440px canvas, zoomed to fit between 1024 and 1440px; below 1024px it reflows into a single column |

## Page order

1. **Hero:** the name, one line, two pills, and a desk of small windows (one per service) plus decor. Windows drag from anywhere; a click without a drag opens the window zoomed, with the working demo inside. The large window is an interactive sample website.
2. **What we build:** five rows (websites, mobile apps, branding and design, AI automation, custom software). Each has voice bars, a typed request in a speech pill, a reply, the service copy, and a large window with the working demo. The row nearest the middle of the screen is in focus.
3. **The studio:** the About text as a notes window between two arches of tiny windows, and our latest project (this site) as a small window.
4. **Promises:** the commitments from `src/content/about.ts` as a wall of tinted windows, with a frosted banner.
5. **Process:** a sky section with three glass cards (two steps each) and a toggle between "what we do" and "what you get", then a dark note.
6. **FAQ**, **contact** (the enquiry form in a window) and the footer with a tiled wordmark.

## Window system

`src/components/desktop/`

| File | What it does |
|---|---|
| `Window.tsx` | `WindowFrame` (the chrome) and `TrafficLights`. The red light is a real close button only when `onClose` is passed. |
| `WindowManager.tsx` | `Desktop`: one manager per desk (open/close, stacking, focus, drag offsets, bounds). |
| `ManagedWindow.tsx` | A positioned, draggable window with an optional caption. Drag maths divides by the canvas zoom, so windows follow the pointer exactly at any width. |
| `Reveal.tsx` | Fades content in once when it first scrolls into view. |

Behaviour: pressing a window brings it to the front; a press that moves more than 4px is a drag and never also counts as a click; windows can't leave their desk; title bars are focusable and move with the arrow keys; Escape closes the active closable window; zoomed windows and sheets are native `<dialog>` elements. Under reduced motion there are no entrances, bubbles show their full text, and nothing waits on an animation.

## Content sources

- `src/content/services.ts`: service names and descriptions (feature rows, zoomed windows, footer).
- `src/content/process.ts`: steps and questions (process cards, FAQ).
- `src/content/about.ts`: beliefs and commitments (studio notes, promises wall, About page).
- `src/content/work.ts`: real projects only (the latest-project window).
- The bubbles' requests and replies, the window filenames and the sample bakery site are illustrative copy written for the demos, not claims about clients.
