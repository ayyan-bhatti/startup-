import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CoreMark } from "./desktop/Icons";

export function Logo({ className = "text-ink" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 rounded-md font-display text-lg font-semibold tracking-tight ${className}`}>
      <CoreMark className="h-6 w-6 flex-none" />
      {siteConfig.name}
      <span className="sr-only">, home</span>
    </Link>
  );
}
