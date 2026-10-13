import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between">
        <Logo dark />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn-primary hidden py-2 md:inline-flex">
          Get started
        </Link>
        <MobileMenu nav={siteConfig.nav} />
      </div>
    </header>
  );
}
