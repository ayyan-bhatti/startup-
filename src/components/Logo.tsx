import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ className = "text-ink" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-lg font-semibold ${className}`}>
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" className="flex-none">
        <rect width="32" height="32" rx="6" className="fill-accent" />
        <circle cx="16" cy="16" r="7" fill="none" stroke="white" strokeWidth="3" />
      </svg>
      {siteConfig.name}
      <span className="sr-only">, home</span>
    </Link>
  );
}
