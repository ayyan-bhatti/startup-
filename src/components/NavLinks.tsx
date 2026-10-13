"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

/** Desktop navigation. A client component only so the current page can be marked. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-7">
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className="py-2 text-sm text-body underline-offset-8 transition-colors duration-150 hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
