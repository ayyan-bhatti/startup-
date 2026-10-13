import Link from "next/link";
import type { ReactNode } from "react";

/* Hand-drawn desktop glyphs. All decorative: the label next to them carries the meaning. */

type GlyphProps = { className?: string };

export function FolderGlyph({ className = "h-12 w-14", tint = "#9fb4f5" }: GlyphProps & { tint?: string }) {
  return (
    <svg viewBox="0 0 56 46" className={className} aria-hidden="true" focusable="false">
      <path d="M3 8a4 4 0 0 1 4-4h14l5 5h23a4 4 0 0 1 4 4v4H3z" fill={tint} stroke="#171512" strokeOpacity=".35" />
      <rect x="3" y="13" width="50" height="30" rx="4" fill={tint} stroke="#171512" strokeOpacity=".35" />
      <rect x="3.5" y="13.5" width="49" height="5" rx="2" fill="#fff" opacity=".35" />
    </svg>
  );
}

export function DocGlyph({ className = "h-12 w-10" }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 50" className={className} aria-hidden="true" focusable="false">
      <path d="M4 3h22l10 10v33a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="#fcfbf9" stroke="#171512" strokeOpacity=".4" />
      <path d="M26 3v10h10" fill="#e2dfd9" stroke="#171512" strokeOpacity=".4" />
      <path d="M9 21h20M9 26h22M9 31h16M9 36h20" stroke="#625c52" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MailGlyph({ className = "h-11 w-14" }: GlyphProps) {
  return (
    <svg viewBox="0 0 56 42" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="50" height="34" rx="4" fill="#f0a54a" stroke="#171512" strokeOpacity=".4" />
      <path d="M4 7l24 17L52 7" fill="none" stroke="#171512" strokeOpacity=".55" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function WizardGlyph({ className = "h-12 w-12" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="6" width="40" height="36" rx="5" fill="#fcfbf9" stroke="#171512" strokeOpacity=".4" />
      <rect x="4" y="6" width="40" height="8" rx="4" fill="#e2dfd9" />
      <rect x="10" y="22" width="28" height="5" rx="2.5" fill="#e2dfd9" />
      <rect x="10" y="22" width="17" height="5" rx="2.5" fill="#2f56d6" />
      <path d="M10 34h12" stroke="#625c52" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** The Core mark: a bright centre inside a shell. */
export function CoreMark({ className = "h-5 w-5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#171512" />
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="#8a7d6c" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="5" fill="#f0a54a" />
    </svg>
  );
}

/**
 * A labelled icon on a desktop. It's a plain link, so it works as navigation even for visitors who
 * don't read it as an icon. Focus and hover show the classic selected look.
 */
export function DesktopIcon({ href, label, glyph }: { href: string; label: string; glyph: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex w-24 flex-col items-center gap-1.5 rounded-md p-1.5 text-center outline-none"
    >
      <span className="grid h-14 place-items-center rounded-md p-1 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-pop)] group-hover:-translate-y-0.5 group-hover:bg-[#171512]/[0.06] group-focus-visible:bg-select/15">
        {glyph}
      </span>
      <span className="rounded-[3px] px-1.5 py-px text-xs font-semibold leading-snug text-ink group-hover:bg-window/80 group-focus-visible:bg-select group-focus-visible:text-on-select">
        {label}
      </span>
    </Link>
  );
}
