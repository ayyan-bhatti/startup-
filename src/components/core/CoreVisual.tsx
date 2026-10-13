"use client";

import { useEffect, useRef, useState } from "react";
import { canUse3D, clamp01 } from "@/lib/motion";
import type { CoreMode, CoreScene } from "./coreScene";

/**
 * Enhancement layer over the static core. Loads the 3D code only on capable devices and only when the box
 * is near the viewport. Renders only while visible and the tab is active. Disposes everything on unmount.
 *
 * progressFrom: id of the element whose scroll position drives the scene (hero: the hero section; process: the steps list).
 */
export function CoreVisual({ mode, progressFrom }: { mode: CoreMode; progressFrom: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas || !canUse3D()) return;

    let scene: CoreScene | null = null;
    let disposed = false;
    let visible = false;
    let rafId = 0;

    const update = () => {
      if (!scene) return;
      const target = document.getElementById(progressFrom);
      if (target) {
        const r = target.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = mode === "hero" ? clamp01(-r.top / Math.max(1, r.height)) : clamp01((vh * 0.55 - r.top) / Math.max(1, r.height));
        scene.setProgress(p);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const sync = () => {
      if (!scene) return;
      if (visible && !document.hidden) scene.start();
      else scene.stop();
    };
    const resize = () => {
      const { width, height } = box.getBoundingClientRect();
      if (width && height) scene?.resize(width, height);
    };

    const io = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !scene) {
          const { createCoreScene } = await import("./coreScene");
          if (disposed) return;
          scene = createCoreScene(canvas, mode);
          resize();
          update();
          setReady(true);
          box.parentElement?.setAttribute("data-live", "true");
        }
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(box);
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", sync);

    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      scene?.dispose();
      scene = null;
    };
  }, [mode, progressFrom]);

  return (
    <div ref={boxRef} className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity"
        style={{ opacity: ready ? 1 : 0, transitionDuration: "var(--dur-slow)", transitionTimingFunction: "var(--ease-settle)" }}
      />
    </div>
  );
}
