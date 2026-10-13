import { CoreStatic } from "./CoreStatic";
import { CoreVisual } from "./CoreVisual";
import type { CoreMode } from "./coreScene";

/**
 * A square box with a fixed aspect ratio (no layout shift). The static core is always rendered;
 * the 3D layer fades in over it on capable devices and the static picture fades out underneath.
 */
export function CoreFigure({ mode, progressFrom, className = "" }: { mode: CoreMode; progressFrom: string; className?: string }) {
  return (
    <div className={`group relative aspect-square w-full ${className}`} aria-hidden="true">
      <CoreStatic
        shells={6}
        className="absolute inset-0 h-full w-full transition-opacity duration-[900ms] ease-[var(--ease-settle)] group-data-[live=true]:opacity-0"
      />
      <CoreVisual mode={mode} progressFrom={progressFrom} />
    </div>
  );
}
