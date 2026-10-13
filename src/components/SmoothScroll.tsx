"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import type Lenis from "lenis";

/**
 * Smooth scrolling for mouse and trackpad only. It keeps the browser's native scroll position, so anchor links,
 * keyboard scrolling, find-in-page, back/forward and touch scrolling behave normally. Off with reduced motion.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let cancelled = false;
    const start = () =>
      import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        lenisRef.current = new LenisCtor({ autoRaf: true, anchors: true, lerp: 0.12, smoothWheel: true, syncTouch: false });
      });
    // Wait until the browser is idle so smooth scrolling never competes with first paint.
    const timer = setTimeout(() => (typeof requestIdleCallback === "function" ? requestIdleCallback(start) : start()), 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After navigation the framework sets the scroll position; keep the smooth scroller in step with it.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.resize();
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
