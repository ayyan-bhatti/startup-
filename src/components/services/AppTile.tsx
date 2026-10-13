/** The icon tile for each service "app". Colours and drawings are decorative; the service name is always beside it. */

type Look = { bg: string; fg: string; path: React.ReactNode };

const looks: Record<string, Look> = {
  websites: {
    bg: "#dfe6ff",
    fg: "#2546b0",
    path: (
      <>
        <rect x="7" y="9" width="26" height="22" rx="3" />
        <path d="M7 15h26M11 12h.01M14 12h.01" />
        <path d="M12 21h9M12 25h14" />
      </>
    ),
  },
  "3d-interactive-websites": {
    bg: "#fde5c2",
    fg: "#8a4b06",
    path: (
      <>
        <path d="M20 7l12 6.5v13L20 33 8 26.5v-13z" />
        <path d="M8 13.5L20 20l12-6.5M20 20v13" />
      </>
    ),
  },
  "mobile-apps": {
    bg: "#d8efdf",
    fg: "#1d7442",
    path: (
      <>
        <rect x="12" y="6" width="16" height="28" rx="3.5" />
        <path d="M18 10h4M17.5 29.5h5" />
      </>
    ),
  },
  "custom-software": {
    bg: "#e7e0ff",
    fg: "#5b3fc4",
    path: (
      <>
        <rect x="7" y="8" width="26" height="24" rx="3" />
        <path d="M7 15h26M7 23h26M16 8v24" />
      </>
    ),
  },
  "ai-automation": {
    bg: "#fde0ec",
    fg: "#a8326b",
    path: (
      <>
        <circle cx="11" cy="12" r="3.5" />
        <circle cx="29" cy="20" r="3.5" />
        <circle cx="11" cy="28" r="3.5" />
        <path d="M14.5 12.5c6 .5 8 4 11 6.5M14.5 27.5c6-.5 8-4 11-6.5" />
      </>
    ),
  },
  seo: {
    bg: "#d6f0ee",
    fg: "#11706a",
    path: (
      <>
        <circle cx="18" cy="18" r="8.5" />
        <path d="M24.5 24.5L32 32M14 18h8M18 14v8" />
      </>
    ),
  },
  branding: {
    bg: "#fde1da",
    fg: "#b03a1f",
    path: (
      <>
        <path d="M20 6l9 11-9 17-9-17z" />
        <circle cx="20" cy="18" r="2.5" />
        <path d="M20 20.5V34" />
      </>
    ),
  },
};

export function AppTile({ slug, className = "h-12 w-12" }: { slug: string; className?: string }) {
  const look = looks[slug] ?? looks.websites;
  return (
    <span
      className={`grid flex-none place-items-center rounded-[11px] border border-[#171512]/15 ${className}`}
      style={{ background: look.bg, boxShadow: "inset 0 1px 0 rgb(255 255 255 / .7), 0 1px 2px rgb(23 21 18 / .12)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="h-[62%] w-[62%]" fill="none" stroke={look.fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {look.path}
      </svg>
    </span>
  );
}
