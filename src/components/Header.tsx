import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>
        <Link href={siteConfig.cta.href} className="btn-primary hidden min-h-10 py-2 md:inline-flex">
          {siteConfig.cta.label}
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
