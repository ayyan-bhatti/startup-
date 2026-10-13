"use client";

import { useEffect, useState } from "react";

const format = (d: Date) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/** The visitor's local time, like a menu bar clock. Rendered only in the browser to avoid a hydration mismatch. */
export function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className={`min-w-[4.5rem] text-right tabular-nums ${className}`} aria-hidden="true">
      {now ?? " "}
    </time>
  );
}
