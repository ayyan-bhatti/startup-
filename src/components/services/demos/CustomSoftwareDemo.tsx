"use client";

import { useState } from "react";

const STATUSES = ["New", "In progress", "Done"] as const;
type Status = (typeof STATUSES)[number];

const initial: { id: number; item: string; status: Status }[] = [
  { id: 1042, item: "Kitchen refit quote", status: "New" },
  { id: 1041, item: "Annual service visit", status: "In progress" },
  { id: 1040, item: "Replacement parts", status: "New" },
  { id: 1039, item: "Site survey", status: "Done" },
  { id: 1038, item: "Repair callout", status: "In progress" },
];

const badge: Record<Status, string> = {
  New: "bg-[#dfe6ff] text-link",
  "In progress": "bg-[#fde5c2] text-[#7a4205]",
  Done: "bg-[#d8efdf] text-success",
};

/** A small internal tool: filter jobs by status and move each one forward. The counts stay in step. */
export function CustomSoftwareDemo() {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<Status | "All">("All");
  const visible = filter === "All" ? rows : rows.filter((r) => r.status === filter);

  const advance = (id: number) =>
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: STATUSES[(STATUSES.indexOf(r.status) + 1) % STATUSES.length] } : r)),
    );

  return (
    <div className="flex h-full flex-col p-4">
      <div role="group" aria-label="Filter jobs" className="flex flex-wrap gap-1.5">
        {(["All", ...STATUSES] as const).map((s) => (
          <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
            {s} <span className="ml-1 opacity-70">{s === "All" ? rows.length : rows.filter((r) => r.status === s).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-md border border-frame bg-window text-sm">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Sample jobs. Use the status button to move a job to the next stage.</caption>
          <thead className="bg-chrome text-xs text-muted">
            <tr>
              <th scope="col" className="px-3 py-1.5 font-semibold">Job</th>
              <th scope="col" className="px-3 py-1.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-3 py-1.5">
                  <span className="text-xs text-muted tabular-nums">#{r.id}</span> <span className="text-ink">{r.item}</span>
                </td>
                <td className="px-3 py-1">
                  <button
                    type="button"
                    onClick={() => advance(r.id)}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors hover:ring-2 hover:ring-select/40 ${badge[r.status]}`}
                  >
                    {r.status}
                    <span className="sr-only">, move #{r.id} to the next stage</span>
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-4 text-center text-muted">Nothing here. Try another filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
