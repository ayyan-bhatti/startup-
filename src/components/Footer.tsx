import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-6">{siteConfig.description}</p>
          <p className="mt-4 text-sm">
            Email us:{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent-light hover:text-white">
              {siteConfig.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-6 text-xs">
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
