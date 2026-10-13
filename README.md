# Core: Business Website

Marketing website for Core, a digital partner that helps businesses of every industry and size, worldwide, start, build, launch and scale anything digital. (Developer notes below necessarily mention the tooling; none of it appears on the public site.)

- 5 pages: Home, Services (including an "Anything else" section and an "Every industry" section at `/services#industries`), About, Process, Contact (plus a custom 404)
- Contact form (name, email, phone (optional, international), business name, industry (free text), service, message) with client- and server-side validation, a honeypot field, and two Resend emails (visitor confirmation + internal notification)
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter cards, a generated OG image, sitemap, robots, JSON-LD and a web manifest
- Everything is server-rendered except the contact form and the mobile menu

## 1. Install

Requires Node.js 20.9 or newer.

```bash
npm install
```

## 2. Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live URL, e.g. `https://www.yourdomain.com` (no trailing slash). Used for canonical URLs, sitemap, robots and OG tags. |
| `RESEND_API_KEY` | API key from https://resend.com/api-keys |
| `CONTACT_FROM_EMAIL` | Sender, e.g. `Core <hello@yourdomain.com>`. Must be on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | Where enquiries go: `abdullahfarooq61305@gmail.com`. Separate multiple addresses with commas. |

> **Testing before your domain is verified:** set `CONTACT_FROM_EMAIL="Core <onboarding@resend.dev>"`. In that mode Resend only delivers to the email address you signed up to Resend with. The internal notification will arrive if that is your address, but visitor confirmations to other addresses will not be sent until you verify a domain.

## 3. Run locally

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint, fails on any warning
```

## 4. Deploy to Vercel

1. Push the project to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, click **Add New → Project** and import the repository. The framework is detected as Next.js automatically.
3. Under **Settings → Environment Variables**, add all four variables from `.env.example` (for Production, and Preview if you want).
4. Deploy, then add your custom domain under **Settings → Domains** and follow the DNS instructions.
5. Make sure `NEXT_PUBLIC_SITE_URL` matches the final domain, and redeploy after changing it.

## 5. Verify your domain in Resend

1. Open https://resend.com/domains and click **Add Domain**. Using a subdomain such as `mail.yourdomain.com` or the root domain both work.
2. Resend shows DNS records (an MX and TXT record for SPF, a TXT record for DKIM, and an optional DMARC TXT record).
3. Add those records at your DNS provider (or in Vercel → Domains if Vercel manages your DNS).
4. Click **Verify DNS Records** in Resend. Propagation usually takes a few minutes, occasionally up to 48 hours.
5. Once verified, set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `Core <hello@yourdomain.com>`, and redeploy.
6. Submit the contact form on the live site and check that both emails arrive (check spam the first time).

## How the contact form works

- `src/lib/contact.ts` holds the service dropdown options and the validation shared by the browser and `src/app/api/contact/route.ts`. There is no budget field.
- The notification email includes name, email, phone, business name, industry, service, message and timestamp. The visitor confirmation includes a short summary (business, industry, service, message).
- A hidden `website` field acts as a honeypot. If it is filled in, the API returns success without sending anything.
- The internal notification is sent first with `replyTo` set to the visitor's email, so you can reply directly. If it fails, the visitor sees an error.
- The visitor confirmation is sent second. If only that one fails, the error is logged and the visitor still sees success, because the enquiry already reached you.
- All user input is HTML-escaped in `src/lib/email-templates.ts`.

## Project structure

```
src/
  config/site.ts          ← name, tagline, domain, email, nav (edit this first)
  content/                ← services, industry examples and process copy
docs/rnd-report.md        ← research, positioning and SEO plan
docs/style-guide.md       ← terminology, tone, design tokens and components (read before editing copy or styles)
docs/quality-audit.md     ← quality audit and how each issue was fixed
  app/                    ← pages, API route, sitemap, robots, manifest, icons, OG image
  components/             ← header, footer, CTA, contact form, mobile menu
  lib/                    ← SEO helpers, validation, email templates, OG renderer
public/                   ← static images
```

The accent color is set once in `src/app/globals.css` under `@theme` (`--color-accent` and related variables).

## Checklist: what to change

- [ ] **Site name, tagline, legal name, description, public email:** `src/config/site.ts`
- [ ] **Legal address (optional):** `legalAddress` in `src/config/site.ts`. Shown only in the footer when set. The site and structured data otherwise target clients worldwide (`areaServed: Worldwide`).
- [ ] **Domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel (and optionally the fallback in `src/config/site.ts`)
- [ ] **Resend:** verify your domain and set `CONTACT_FROM_EMAIL` / `RESEND_API_KEY`
- [ ] **Social profiles (optional):** `socials` in `src/config/site.ts` (used in structured data)
- [ ] **Logo:** the inline SVG in `src/components/Logo.tsx`, the favicon in `src/app/icon.svg`, the Apple icon in `src/app/apple-icon.tsx`, and the mark in `src/lib/og.tsx`
- [ ] **Colors:** `@theme` in `src/app/globals.css`, plus `themeColor` in `src/app/layout.tsx` and `src/app/manifest.ts`, and the hex values in the OG/icon files
- [ ] **Copy:** `src/content/services.ts`, `src/content/industries.ts`, `src/content/process.ts`, and page text in `src/app/*/page.tsx`
- [ ] **Service dropdown:** `src/lib/contact.ts`
- [ ] **Hero illustration:** `public/hero-illustration.svg` (keep the width/height in sync if you swap it)
- [ ] **Keywords:** `keywords` in `src/app/layout.tsx`
