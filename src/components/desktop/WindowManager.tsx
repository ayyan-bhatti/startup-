"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

/* ------------------------------------------------------------------------------------------------
 * State
 * One manager per desktop. It owns which windows are open, their stacking order and their drag offset.
 * ---------------------------------------------------------------------------------------------- */

type WinState = { open: boolean; z: number; dx: number; dy: number };
type State = { wins: Record<string, WinState>; top: number; active: string | null; dragged: boolean };
type Action =
  | { type: "open"; id: string; at?: { dx: number; dy: number } }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "move"; id: string; dx: number; dy: number }
  | { type: "dragged" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
    case "focus": {
      const win = state.wins[action.id] ?? { open: false, z: 0, dx: 0, dy: 0 };
      if (action.type === "focus" && (!win.open || state.active === action.id)) return state;
      const top = state.top + 1;
      const next: WinState = { ...win, open: true, z: top };
      if (action.type === "open" && action.at && !win.open) Object.assign(next, action.at);
      return { ...state, top, active: action.id, wins: { ...state.wins, [action.id]: next } };
    }
    case "close": {
      const win = state.wins[action.id];
      if (!win?.open) return state;
      const wins = { ...state.wins, [action.id]: { ...win, open: false } };
      // The next active window is the highest one still open.
      const active =
        Object.entries(wins)
          .filter(([, w]) => w.open)
          .sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null;
      return { ...state, wins, active };
    }
    case "move": {
      const win = state.wins[action.id];
      if (!win) return state;
      return { ...state, wins: { ...state.wins, [action.id]: { ...win, dx: action.dx, dy: action.dy } } };
    }
    case "dragged":
      return state.dragged ? state : { ...state, dragged: true };
  }
}

type Manager = {
  state: State;
  open: (id: string, opener?: HTMLElement | null, at?: { dx: number; dy: number }) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  move: (id: string, dx: number, dy: number) => void;
  markDragged: () => void;
  boundsRef: RefObject<HTMLDivElement | null>;
  /** Free dragging is on for large screens only. Smaller screens get in-flow windows or sheets. */
  canDrag: boolean;
  /** Space on the left that windows may not cover, for example a launcher. In pixels. */
  reserveLeft: number;
};

const ManagerContext = createContext<Manager | null>(null);

export function useWindowManager() {
  const ctx = useContext(ManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside <Desktop>");
  return ctx;
}

const DRAG_QUERY = "(min-width: 1024px)";
function subscribeDrag(cb: () => void) {
  const mq = window.matchMedia(DRAG_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useCanDrag() {
  return useSyncExternalStore(
    subscribeDrag,
    () => window.matchMedia(DRAG_QUERY).matches,
    () => false,
  );
}

/**
 * A desktop: a bounded area that windows live in. Windows can't be dragged outside it.
 * `initiallyOpen` lists windows open on first render, bottom to top.
 */
export function Desktop({
  initiallyOpen,
  className = "",
  style,
  children,
  label,
  reserveLeft = 0,
}: {
  initiallyOpen: string[];
  reserveLeft?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  label?: string;
}) {
  const [state, dispatch] = useReducer(reducer, initiallyOpen, (ids) => ({
    wins: Object.fromEntries(ids.map((id, i) => [id, { open: true, z: i + 1, dx: 0, dy: 0 }])),
    top: ids.length,
    active: ids.at(-1) ?? null,
    dragged: false,
  }));
  const boundsRef = useRef<HTMLDivElement>(null);
  const openers = useRef(new Map<string, HTMLElement>());
  const canDrag = useCanDrag();

  const open = useCallback((id: string, opener?: HTMLElement | null, at?: { dx: number; dy: number }) => {
    if (opener) openers.current.set(id, opener);
    dispatch({ type: "open", id, at });
  }, []);
  const close = useCallback((id: string) => {
    dispatch({ type: "close", id });
    // Return focus to whatever opened the window, so keyboard users don't lose their place.
    const opener = openers.current.get(id);
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus({ preventScroll: true }));
  }, []);
  const focus = useCallback((id: string) => dispatch({ type: "focus", id }), []);
  const move = useCallback((id: string, dx: number, dy: number) => dispatch({ type: "move", id, dx, dy }), []);
  const markDragged = useCallback(() => dispatch({ type: "dragged" }), []);

  const value = useMemo(
    () => ({ state, open, close, focus, move, markDragged, boundsRef, canDrag, reserveLeft }),
    [state, open, close, focus, move, markDragged, canDrag, reserveLeft],
  );

  return (
    <ManagerContext.Provider value={value}>
      <div ref={boundsRef} className={`relative isolate ${className}`} style={style} aria-label={label} role={label ? "region" : undefined}>
        {children}
      </div>
    </ManagerContext.Provider>
  );
}
