/**
 * Single source of truth for brand details.
 * Rename the company, change the domain, email or location here and it updates everywhere.
 */
const fallbackUrl = "https://www.example.com";

export const siteConfig = {
  name: "Core",
  legalName: "Core Digital Ltd.",
  tagline: "Start, launch and scale your business online",
  description:
    "Core helps clinics, hospitals, pharmacies, law firms and gyms start digitally, launch properly and scale online with websites, apps, SEO, branding, AI automation and management systems.",
  /** Canonical domain. Override per environment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, ""),
  /** Public contact email shown on the site. */
  email: "hello@example.com", // [PLACEHOLDER]
  /** Where we are based. Used in copy and local-business structured data. */
  location: {
    city: "[PLACEHOLDER: City]", // e.g. "Lahore"
    country: "[PLACEHOLDER: Country]", // e.g. "Pakistan"
    countryCode: "XX", // [PLACEHOLDER] two-letter ISO code, e.g. "PK"
  },
  locale: "en_US",
  /** Optional social profile URLs, used in Organization JSON-LD (sameAs). */
  socials: [] as string[],
  nav: [
    { href: "/services", label: "Services" },
    { href: "/services#industries", label: "Industries" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export const locationLabel = `${siteConfig.location.city}, ${siteConfig.location.country}`;
