import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-sm">
      <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="text-base font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm">{siteConfig.tagline}. We work remotely with clients worldwide.</p>
          <p className="mt-4">
            <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>
          </p>
        </div>
        <nav aria-label="Footer" className="min-w-0">
          <h2 className="text-sm font-semibold">Pages</h2>
          <ul className="mt-3 space-y-2">
            <li><Link href="/" className="hover:text-ink hover:underline">Home</Link></li>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="mt-3 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-ink hover:underline">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col gap-1 border-t border-line py-5 text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
        {siteConfig.legalAddress && <p>{siteConfig.legalAddress}</p>}
      </div>
    </footer>
  );
}
