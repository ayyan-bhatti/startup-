import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ className = "text-ink" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-lg font-semibold ${className}`}>
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" className="flex-none">
        <rect width="32" height="32" rx="6" className="fill-surface-2" />
        <circle cx="16" cy="16" r="9.5" fill="none" stroke="#6a5f52" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" className="fill-accent" />
      </svg>
      {siteConfig.name}
      <span className="sr-only">, home</span>
    </Link>
  );
}
