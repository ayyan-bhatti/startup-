import type { HTMLAttributes, ReactNode } from "react";

export type WindowTone = "light" | "dark" | "grey";

/** Three window lights, drawn in SVG. Decorative unless the red one closes the window. */
export function TrafficLights({ size = 12, onClose, label }: { size?: number; onClose?: () => void; label?: string }) {
  const light = (fill: string, edge: string) => (
    <svg viewBox="0 0 12 12" width={size} height={size} aria-hidden="true" focusable="false" className="block flex-none">
      <defs>
        <radialGradient id={`tl-${fill.slice(1)}`} cx="50%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor={fill} />
          <stop offset="1" stopColor={fill} />
        </radialGradient>
      </defs>
      <circle cx="6" cy="6" r="5.5" fill={`url(#tl-${fill.slice(1)})`} stroke={edge} strokeWidth=".8" />
    </svg>
  );
  return (
    <span className="flex items-center gap-[5px]">
      {onClose ? (
        <button type="button" onClick={onClose} className="group/tl relative grid place-items-center rounded-full" data-no-drag>
          <span className="sr-only">Close {label}</span>
          {light("#ff5f57", "#d8433c")}
          <svg viewBox="0 0 10 10" className="absolute h-[6px] w-[6px] opacity-0 group-hover/tl:opacity-70" aria-hidden="true">
            <path d="M2 2l6 6M8 2l-6 6" stroke="#4d0000" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      ) : (
        light("#ff5f57", "#d8433c")
      )}
      {light("#febc2e", "#d69e1b")}
      {light("#28c840", "#1aa22f")}
    </span>
  );
}

type WindowFrameProps = {
  title?: string;
  icon?: ReactNode;
  tone?: WindowTone;
  /** Kept for the window manager; aqua windows look the same active or not. */
  active?: boolean;
  isStatic?: boolean;
  /** Only pass this when closing actually does something. */
  onClose?: () => void;
  titleId?: string;
  /** Keep the title for assistive technology but don't draw it (small desk windows). */
  titleHidden?: boolean;
  barProps?: HTMLAttributes<HTMLDivElement>;
  barEnd?: ReactNode;
  className?: string;
  /** Classes for the inset screen. */
  bodyClassName?: string;
  children: ReactNode;
};

/**
 * The window chrome used everywhere: a brushed-metal frame, three lights, a centred title and an inset screen.
 * Positioning, dragging and stacking live in ManagedWindow; this only draws.
 */
export function WindowFrame({
  title,
  icon,
  tone = "light",
  onClose,
  titleId,
  titleHidden = false,
  barProps,
  barEnd,
  className = "",
  bodyClassName = "",
  children,
}: WindowFrameProps) {
  const screen = tone === "dark" ? "bg-term text-term-ink" : tone === "grey" ? "bg-[#e9e8ea]" : "bg-white";
  return (
    <div className={`aqua min-w-0 ${className}`}>
      <div {...barProps} className={`aqua-bar select-none ${barProps?.className ?? ""}`}>
        <TrafficLights onClose={onClose} label={title} />
        {title && (
          <span id={titleId} className={titleHidden ? "sr-only" : "aqua-title flex items-center gap-1.5"}>
            {icon}
            {title}
          </span>
        )}
        {barEnd ?? (
          <svg viewBox="0 0 10 10" className="h-[7px] w-[8px] flex-none opacity-40" aria-hidden="true">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div className={`aqua-screen min-h-0 flex-1 ${screen} ${bodyClassName}`}>{children}</div>
    </div>
  );
}
