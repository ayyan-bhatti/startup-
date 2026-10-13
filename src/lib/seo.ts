import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** Builds consistent per-page metadata: title, description, canonical, Open Graph and Twitter. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: ogTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name}: ${siteConfig.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/twitter-image"],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationId = `${siteConfig.url}/#organization`;

/** Organization + local business details, used on the home page. */
export function organizationJsonLd() {
  const { city, country, countryCode } = siteConfig.location;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/opengraph-image`,
    email: siteConfig.email,
    description: siteConfig.description,
    address: { "@type": "PostalAddress", addressLocality: city, addressCountry: countryCode },
    areaServed: [{ "@type": "City", name: city }, { "@type": "Country", name: country }],
    knowsAbout: services.map((s) => s.title),
    ...(siteConfig.socials.length ? { sameAs: siteConfig.socials } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      url: `${siteConfig.url}/contact`,
    },
  };
}
