"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

/** Menu bar links. A client component only so the current page can be marked. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-4 text-[14px] leading-none tracking-[-0.42px]">
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className="inline-block py-2 text-black/55 transition-[color,transform] duration-[120ms] hover:text-black active:scale-[0.97] aria-[current=page]:text-black"
          >
            {item.label.toLowerCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
