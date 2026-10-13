"use client";

import { useId, useState } from "react";

const LIMITS = { title: 60, description: 155 };

function Meter({ value, max }: { value: number; max: number }) {
  const over = value > max;
  return (
    <span className="flex items-center gap-2 text-[11px] tabular-nums text-muted">
      <span className="relative h-1 w-16 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <span
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] ${over ? "bg-danger" : "bg-success"}`}
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </span>
      <span className={over ? "font-semibold text-danger" : ""}>
        {value}/{max}
      </span>
    </span>
  );
}

const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** Edit a page title and description and watch the search result update, with length checks as you type. */
export function SeoDemo() {
  const id = useId();
  const [title, setTitle] = useState("Emergency plumber in Leeds | Open 24 hours");
  const [desc, setDesc] = useState("Burst pipe or no hot water? We reach most of Leeds within an hour. Fixed call-out price, quoted before we start.");

  return (
    <div className="grid h-full grid-cols-1 gap-3 p-4 text-sm">
      <div className="rounded-md border border-frame bg-window p-3" aria-label="Search result preview" role="img">
        <p className="truncate text-xs text-muted">yourbusiness.com › emergency-plumber</p>
        <p className="mt-0.5 truncate text-[15px] text-[#1a0dab]">{cut(title, LIMITS.title) || "Page title"}</p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-body">{cut(desc, LIMITS.description) || "Page description"}</p>
      </div>
      <div data-no-drag className="space-y-2">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-t`} className="text-xs font-semibold text-ink">Page title</label>
            <Meter value={title.length} max={LIMITS.title} />
          </div>
          <input id={`${id}-t`} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className="field mt-1 py-1.5 text-sm" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-d`} className="text-xs font-semibold text-ink">Description</label>
            <Meter value={desc.length} max={LIMITS.description} />
          </div>
          <input id={`${id}-d`} value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={300} className="field mt-1 py-1.5 text-sm" />
        </div>
      </div>
    </div>
  );
}
