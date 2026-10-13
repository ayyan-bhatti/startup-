import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Clock } from "./Clock";
import { CoreMark } from "./desktop/Icons";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** The menu bar: brand and pages on the left, the mark in the middle, the time and the main action on the right. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-desk">
      <div className="flex h-[53px] items-center px-5 lg:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link href="/" className="text-[14px] font-medium leading-none tracking-[-0.42px] text-black max-lg:hidden">
            {siteConfig.name.toLowerCase()}
            <span className="sr-only">, home</span>
          </Link>
          <nav aria-label="Main" className="max-lg:hidden">
            <NavLinks />
          </nav>
          <Link href="/" className="lg:hidden" aria-label={`${siteConfig.name}, home`}>
            <CoreMark className="h-7 w-7" />
          </Link>
        </div>
        <Link href="/" className="max-lg:hidden" aria-label={`${siteConfig.name}, home`}>
          <CoreMark className="h-7 w-7 transition-transform duration-150 hover:scale-105" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Clock className="text-[14px] tracking-[-0.42px] text-black/60 max-lg:hidden" />
          <Link href={siteConfig.cta.href} className="flex items-center gap-1.5 whitespace-nowrap text-[14px] font-medium tracking-[-0.42px] text-link transition-opacity hover:opacity-80 active:scale-[0.97]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M2 4.2C2 3.5 2.5 3 3.2 3h9.6c.7 0 1.2.5 1.2 1.2v7.6c0 .7-.5 1.2-1.2 1.2H3.2C2.5 13 2 12.5 2 11.8z" fill="currentColor" />
              <path d="M2.6 4l5.4 4.2L13.4 4" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            {siteConfig.cta.label.toLowerCase()}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
