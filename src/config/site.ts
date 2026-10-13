/**
 * Single source of truth for brand details.
 * Rename the company, change the domain or email here and it updates everywhere.
 */
const fallbackUrl = "https://www.example.com";

export const siteConfig = {
  name: "Core",
  legalName: "Core Digital Ltd.",
  tagline: "Websites, apps and software for any business",
  description:
    "Core builds websites, mobile apps and custom software, and handles AI automation, SEO and branding for clients in any industry, anywhere in the world.",
  /** Canonical domain. Override per environment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, ""),
  /** Public contact email shown on the site. [PLACEHOLDER] */
  email: "hello@example.com",
  /**
   * Optional registered company address, shown only in the footer.
   * Leave as null to show nothing.
   */
  legalAddress: null as string | null,
  /** How quickly we reply to an enquiry. Used in copy, metadata and emails. */
  replyTime: "3 business days",
  locale: "en_US",
  /** Optional social profile URLs, used in Organization JSON-LD (sameAs). Only add real profiles. */
  socials: [] as string[],
  nav: [
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  cta: { href: "/contact", label: "Start a project" },
};
