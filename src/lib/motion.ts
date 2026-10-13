/** Motion system. Mirrors the CSS custom properties in globals.css. See docs/experience-plan.md. */
export const motion = {
  durFast: 150,
  durBase: 260,
  durSlow: 900,
  /** Per-second rate for frame-rate independent damping. Higher follows the input faster. */
  damping: 4,
};

/** Frame-rate independent damping toward a target. Never overshoots. */
export function damp(current: number, target: number, dt: number, rate = motion.damping) {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Decides whether the device should get the 3D version.
 * Phones, low-power devices, data savers, reduced motion and browsers without WebGL get the static picture.
 */
export function canUse3D(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < 768) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return false;
  if (nav.connection?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
