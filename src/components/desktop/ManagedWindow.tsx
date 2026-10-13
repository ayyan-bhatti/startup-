"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { WindowFrame, type WindowTone } from "./Window";
import { useWindowManager } from "./WindowManager";

const KEY_STEP = 24;
/** Movement (in px) below which a press counts as a click rather than a drag. */
const CLICK_SLOP = 4;

/** The canvas zoom set in the root layout (1 outside the zoomed home canvas). */
function canvasZoom(el: HTMLElement | null) {
  if (!el?.closest(".canvas") || !window.matchMedia("(min-width: 1024px)").matches) return 1;
  const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--z"));
  return Number.isFinite(z) && z > 0 ? z : 1;
}

type ManagedWindowProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  tone?: WindowTone;
  /** Position inside the desktop, as CSS lengths. */
  left: string;
  top: string;
  width: string;
  closable?: boolean;
  /** Delay for the first entrance, so the desktop opens as one sequence. */
  enterDelay?: number;
  /** Filename shown under the window, as on a desktop. */
  caption?: string;
  /** Drag from anywhere in the window, not only the title bar (interactive elements still never drag). */
  dragWhole?: boolean;
  titleHidden?: boolean;
  className?: string;
  bodyClassName?: string;
  barEnd?: ReactNode;
  children: ReactNode;
};

/**
 * A window that lives on a Desktop. Drag it with a pointer or touch, or focus the title bar and use the arrow
 * keys. Pressing anywhere in it brings it to the front. Escape closes it when it can be closed. A press that
 * turns into a drag never also counts as a click on what is inside.
 */
export function ManagedWindow({
  id,
  title,
  icon,
  tone,
  left,
  top,
  width,
  closable = false,
  enterDelay = 0,
  caption,
  dragWhole = false,
  titleHidden = false,
  className = "",
  bodyClassName = "",
  barEnd,
  children,
}: ManagedWindowProps) {
  const { state, close, focus, move, markDragged, boundsRef, canDrag, reserveLeft } = useWindowManager();
  const win = state.wins[id];
  const isOpen = !!win?.open;
  const active = state.active === id;
  const titleId = useId();
  const outerRef = useRef<HTMLDivElement>(null);

  // Keep the window mounted while its closing animation plays.
  const [present, setPresent] = useState(isOpen);
  const [leaving, setLeaving] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);
  // Only the very first entrance uses enterDelay; windows opened later appear at once.
  const [initial, setInitial] = useState(true);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    setInitial(false);
    if (isOpen) {
      setPresent(true);
      setLeaving(false);
    } else {
      setLeaving(true);
    }
  }
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => {
      setPresent(false);
      setLeaving(false);
    }, 170);
    return () => clearTimeout(t);
  }, [leaving]);

  // A window opened by the visitor (not on first render) takes keyboard focus.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isOpen) outerRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  /** Limits an offset so the whole window stays inside the desktop. Values are canvas pixels. */
  const clampOffset = useCallback(
    (dx: number, dy: number) => {
      const el = outerRef.current;
      const bounds = boundsRef.current;
      if (!el || !bounds) return { dx, dy };
      const minX = reserveLeft - el.offsetLeft;
      const minY = -el.offsetTop;
      const maxX = Math.max(minX, bounds.clientWidth - el.offsetLeft - el.offsetWidth);
      const maxY = Math.max(minY, bounds.clientHeight - el.offsetTop - el.offsetHeight);
      return { dx: Math.min(maxX, Math.max(minX, dx)), dy: Math.min(maxY, Math.max(minY, dy)) };
    },
    [boundsRef, reserveLeft],
  );

  // When the desktop changes size, pull windows back inside it.
  const dx = win?.dx ?? 0;
  const dy = win?.dy ?? 0;
  const offset = useRef({ dx, dy });
  useLayoutEffect(() => {
    offset.current = { dx, dy };
  }, [dx, dy]);
  useLayoutEffect(() => {
    const bounds = boundsRef.current;
    if (!bounds || !present) return;
    const ro = new ResizeObserver(() => {
      const c = clampOffset(offset.current.dx, offset.current.dy);
      if (c.dx !== offset.current.dx || c.dy !== offset.current.dy) move(id, c.dx, c.dy);
    });
    ro.observe(bounds);
    return () => ro.disconnect();
  }, [boundsRef, clampOffset, id, move, present]);

  /* Dragging. Pointer moves write the transform directly; the final position is committed on release. */
  const drag = useRef<{ x: number; y: number; dx: number; dy: number; zoom: number; pointer: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const paint = (x: number, y: number) => {
    const el = outerRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!canDrag || e.button !== 0) return;
    const interactive = (e.target as HTMLElement).closest("button, a, input, textarea, select, label, [data-no-drag]");
    if (interactive && !interactive.hasAttribute("data-drag-ok")) return;
    drag.current = { x: e.clientX, y: e.clientY, dx, dy, zoom: canvasZoom(outerRef.current), pointer: e.pointerId, moved: false };
    suppressClick.current = false;
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointer) return;
    const mx = (e.clientX - d.x) / d.zoom;
    const my = (e.clientY - d.y) / d.zoom;
    if (!d.moved) {
      if (Math.abs(mx) + Math.abs(my) < CLICK_SLOP) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    const next = clampOffset(d.dx + mx, d.dy + my);
    paint(next.dx, next.dy);
  }
  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointer) return;
    drag.current = null;
    if (!d.moved) return;
    suppressClick.current = true;
    const next = clampOffset(d.dx + (e.clientX - d.x) / d.zoom, d.dy + (e.clientY - d.y) / d.zoom);
    paint(next.dx, next.dy);
    setDragging(false);
    move(id, next.dx, next.dy);
    markDragged();
  }
  const pointerHandlers = { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };

  function onBarKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (!canDrag || e.target !== e.currentTarget) return;
    const step = e.shiftKey ? KEY_STEP * 4 : KEY_STEP;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = clampOffset(dx + delta[0], dy + delta[1]);
    move(id, next.dx, next.dy);
    markDragged();
  }

  // Escape closes the active window when focus is inside it, or when focus was lost (for example
  // because the button that had it disappeared). Listening on the document covers both cases.
  useEffect(() => {
    if (!active || !closable || !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      const focused = document.activeElement;
      if (focused && focused !== document.body && !outerRef.current?.contains(focused)) return;
      e.preventDefault();
      close(id);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, closable, isOpen, close, id]);

  if (!present) return null;

  const grab = canDrag ? `touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}` : "";

  return (
    <div
      ref={outerRef}
      tabIndex={-1}
      role="group"
      aria-labelledby={titleId}
      data-window={id}
      data-dragging={dragging || undefined}
      onPointerDownCapture={() => focus(id)}
      onFocusCapture={() => focus(id)}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          suppressClick.current = false;
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      {...(dragWhole ? pointerHandlers : {})}
      className={`absolute outline-none ${dragWhole ? grab : ""} ${className}`}
      style={{
        left,
        top,
        width,
        zIndex: win?.z ?? 0,
        transform: `translate3d(${dx}px, ${dy}px, 0)`,
        transition: dragging ? "none" : "transform var(--dur-base) var(--ease-settle)",
      }}
    >
      <div className={leaving ? "win-exit" : initial ? "rise-in" : "win-enter"} style={{ ["--d" as string]: `${enterDelay}ms` }}>
        <WindowFrame
          title={title}
          icon={icon}
          tone={tone}
          active={active}
          titleId={titleId}
          titleHidden={titleHidden}
          onClose={closable ? () => close(id) : undefined}
          barEnd={barEnd}
          bodyClassName={bodyClassName}
          className={dragging ? "[filter:drop-shadow(0_18px_22px_rgb(0_0_0/0.2))]" : ""}
          barProps={{
            ...(dragWhole ? {} : pointerHandlers),
            onKeyDown: onBarKeyDown,
            tabIndex: canDrag ? 0 : undefined,
            "aria-label": canDrag ? `${title}. Use the arrow keys to move this window.` : undefined,
            "aria-roledescription": canDrag ? "window title bar" : undefined,
            className: dragWhole ? "" : grab,
          }}
        >
          {children}
        </WindowFrame>
        {caption && <p className="win-caption">{caption}</p>}
      </div>
    </div>
  );
}
