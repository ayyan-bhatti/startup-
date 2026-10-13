# Setup log

Date: 2026-10-13. Release-age rule: nothing published after 2026-09-29 (14 days).

## Skills

### Already available before this pass
- **Project** (`.claude/skills`): none. The folder did not exist.
- **User** (synced to this account): built-in-browser, chrome-browser, computer-use, deep-research, docs, docx, google-workspace, import-memory, morning, pdf, pptx, skill-creator, xlsx. None of these cover web design or web testing.
- **Built into this environment:** artifact-design, dataviz, code-review, simplify, run, security-review and others. None are specific to building a site in this repo.

### Installed into `.claude/skills/`
Source: the official repository `https://github.com/anthropics/skills`, cloned at commit `dbd4588f9e10` (2026-10-09). Skill names were taken from the repo's `skills/` folder, not guessed.

| Skill | Why | Status |
|---|---|---|
| `frontend-design` | Required by the brief. Guides the design direction and lists the generic defaults to avoid. | Installed and read in full. Followed in `docs/experience-plan.md` (the "review against defaults" table). |
| `webapp-testing` | Playwright-based testing of a local web app: the brief's quality gate. | Installed and read in full. It expects Python Playwright, which was not installed, so `pip install playwright` was run (version 1.63.0). Tests launch the installed Chrome (`channel="chrome"`), so no browser download was needed. |

### Looked at and not installed
| Skill | Reason |
|---|---|
| `theme-factory` | Applies preset themes. A preset palette is the opposite of what the brief and the frontend-design skill ask for. |
| `web-artifacts-builder` | Builds single-file claude.ai artifacts, not a Next.js site. |
| `canvas-design`, `algorithmic-art`, `brand-guidelines` | For static images, generative art and Anthropic's own brand. Not relevant. |

No other accessibility or web-quality skill exists in that repository. Nothing failed to download.

## Libraries

| Package | Version | Published | Why |
|---|---|---|---|
| `three` | 0.186.1 (exact) | 2026-09-24 | WebGL rendering for the core object. Procedural geometry only, no model or texture files. |
| `lenis` | 1.3.26 (exact) | 2026-08-05 | Smooth scrolling for mouse and trackpad. It keeps the browser's native scroll position, so anchors, find-in-page, back/forward and keyboard scrolling keep working. |
| `@types/three` | 0.186.0 (exact, dev) | 2026-09-11 | Type definitions for three. |

### Considered and not used
| Package | Reason |
|---|---|
| `@react-three/fiber`, `@react-three/drei` | Two small procedural scenes do not need a React renderer for three. Using three directly keeps the 3D chunk smaller and gives direct control over pausing and disposal. |
| `gsap` + ScrollTrigger | The only scroll-driven sequence (Process) needs a single progress value from 0 to 1. That is a few lines with `requestAnimationFrame` and `getBoundingClientRect`. Pinning is done with CSS `position: sticky`, which never hijacks scrolling. |
| A motion library for UI transitions | The UI transitions are colour and transform changes on hover, press, menu open and form result. CSS handles them. |

### Other changes
- Fonts: Inter replaced with **Bricolage Grotesque** (headings) and **Instrument Sans** (body), both loaded through the framework's font loader, so there are no extra packages.
