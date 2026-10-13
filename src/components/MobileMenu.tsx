"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

export function MobileMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded-md p-2 text-white hover:bg-white/10"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full border-t border-white/10 bg-ink px-4 pb-6 pt-2 shadow-lg">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block rounded-md px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-primary mt-4 w-full">
            Get started
          </Link>
        </nav>
      )}
    </div>
  );
}
