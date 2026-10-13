import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-lg font-bold ${dark ? "text-white" : "text-slate-900"}`}
      aria-label={`${siteConfig.name} home`}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-accent" />
        <circle cx="16" cy="16" r="7" fill="none" stroke="white" strokeWidth="3" />
      </svg>
      {siteConfig.name}
    </Link>
  );
}
