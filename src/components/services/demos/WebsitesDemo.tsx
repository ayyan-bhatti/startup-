"use client";

import { useState } from "react";

const sizes = [
  { id: "phone", label: "Phone", width: "13.5rem" },
  { id: "tablet", label: "Tablet", width: "21rem" },
  { id: "laptop", label: "Laptop", width: "100%" },
] as const;

/** One layout, three screen sizes. The preview uses real container queries, so it reflows as it resizes. */
export function WebsitesDemo() {
  const [size, setSize] = useState<(typeof sizes)[number]["id"]>("laptop");
  const width = sizes.find((s) => s.id === size)!.width;

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div role="group" aria-label="Preview size" className="flex gap-1.5">
        {sizes.map((s) => (
          <button key={s.id} type="button" className="chip" aria-pressed={size === s.id} onClick={() => setSize(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 justify-center">
        <div
          className="flex min-h-0 flex-col overflow-hidden rounded-md border border-frame bg-window shadow-sm transition-[width] duration-500 ease-[var(--ease-settle)]"
          style={{ width }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-chrome px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-frame" />
            <span className="ml-1 flex-1 truncate rounded-[3px] bg-window px-1.5 text-[9px] text-muted">yourbusiness.com</span>
          </div>
          <div className="@container min-h-0 flex-1 overflow-hidden p-2.5">
            <div className="flex items-center justify-between">
              <span className="h-2 w-10 rounded-sm bg-ink" />
              <span className="hidden gap-1.5 @xs:flex">
                <span className="h-1.5 w-6 rounded-sm bg-frame" />
                <span className="h-1.5 w-6 rounded-sm bg-frame" />
                <span className="h-1.5 w-6 rounded-sm bg-frame" />
              </span>
              <span className="grid gap-0.5 @xs:hidden">
                <span className="h-0.5 w-3 bg-ink" />
                <span className="h-0.5 w-3 bg-ink" />
                <span className="h-0.5 w-3 bg-ink" />
              </span>
            </div>
            <div className="mt-3 grid gap-2.5 @md:grid-cols-[1.2fr_1fr] @md:items-center">
              <div>
                <span className="block h-2.5 w-[85%] rounded-sm bg-ink" />
                <span className="mt-1 block h-2.5 w-[60%] rounded-sm bg-ink" />
                <span className="mt-2 block h-1.5 w-[90%] rounded-sm bg-frame" />
                <span className="mt-1 block h-1.5 w-[70%] rounded-sm bg-frame" />
                <span className="mt-2.5 block h-3.5 w-14 rounded-[3px] bg-accent" />
              </div>
              <span className="block h-14 rounded-[4px] bg-[linear-gradient(135deg,#dfe6ff,#fde5c2)] @md:h-20" />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-1.5 @xs:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-8 rounded-[3px] border border-line bg-chrome" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
