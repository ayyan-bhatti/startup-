"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const SIZE = 104; // px, edge of the cube

const faces = [
  { t: `translateZ(${SIZE / 2}px)`, cls: "bg-ink", content: "core" },
  { t: `rotateY(180deg) translateZ(${SIZE / 2}px)`, cls: "bg-accent", content: "" },
  { t: `rotateY(90deg) translateZ(${SIZE / 2}px)`, cls: "bg-select", content: "" },
  { t: `rotateY(-90deg) translateZ(${SIZE / 2}px)`, cls: "bg-window", content: "stripes" },
  { t: `rotateX(90deg) translateZ(${SIZE / 2}px)`, cls: "bg-[#fde5c2]", content: "" },
  { t: `rotateX(-90deg) translateZ(${SIZE / 2}px)`, cls: "bg-chrome", content: "dots" },
];

/**
 * A small object you can turn with a pointer or with the buttons. It keeps spinning slowly on its own
 * (unless reduced motion is on) and carries the momentum of a flick.
 */
export function Interactive3DDemo() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const rot = useRef({ x: -22, y: 34, vx: 0, vy: 0.18 });
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const paint = () => {
      const r = rot.current;
      if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${r.x}deg) rotateY(${r.y}deg)`;
    };
    const tick = () => {
      const r = rot.current;
      if (!drag.current) {
        r.x += r.vx;
        r.y += r.vy;
        // Momentum settles back to a slow idle spin.
        r.vx *= 0.94;
        r.vy += ((reduce ? 0 : 0.18) - r.vy) * 0.04;
      }
      paint();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    // Only animate while the cube is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    if (cubeRef.current) io.observe(cubeRef.current);
    paint();
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  function down(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  }
  function moveP(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const r = rot.current;
    r.vy = (e.clientX - d.x) * 0.5;
    r.vx = -(e.clientY - d.y) * 0.5;
    r.y += r.vy;
    r.x = Math.max(-80, Math.min(80, r.x + r.vx));
    d.x = e.clientX;
    d.y = e.clientY;
  }
  function up() {
    drag.current = null;
  }
  const nudge = (dy: number) => {
    rot.current.vy += dy;
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div
        data-no-drag
        onPointerDown={down}
        onPointerMove={moveP}
        onPointerUp={up}
        onPointerCancel={up}
        className="grid h-40 w-full cursor-grab touch-none place-items-center active:cursor-grabbing"
        style={{ perspective: "640px" }}
        aria-hidden="true"
      >
        <div ref={cubeRef} className="relative" style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d" }}>
          {faces.map((f, i) => (
            <div
              key={i}
              className={`absolute inset-0 grid place-items-center rounded-[10px] border border-[#171512]/25 ${f.cls}`}
              style={{ transform: f.t, backfaceVisibility: "hidden" }}
            >
              {f.content === "core" && (
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#8a7d6c]">
                  <span className="h-7 w-7 rounded-full bg-accent" />
                </span>
              )}
              {f.content === "stripes" && <span className="pinstripes block h-12 w-16 [opacity:.8!important]" />}
              {f.content === "dots" && <span className="desk-dots block h-16 w-16 rounded-md" />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="chip" onClick={() => nudge(-9)}>Turn left</button>
        <span className="text-xs text-muted">or drag it</span>
        <button type="button" className="chip" onClick={() => nudge(9)}>Turn right</button>
      </div>
    </div>
  );
}
