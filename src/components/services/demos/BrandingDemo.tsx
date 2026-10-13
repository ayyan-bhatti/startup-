"use client";

import { useId, useState } from "react";

const palettes = [
  { name: "Ember", bg: "#1b1915", fg: "#f0a54a", soft: "#fde5c2" },
  { name: "Harbour", bg: "#17307f", fg: "#ffffff", soft: "#dfe6ff" },
  { name: "Fern", bg: "#14532d", fg: "#e9f7ee", soft: "#d8efdf" },
  { name: "Clay", bg: "#fde1da", fg: "#8a2a14", soft: "#fcfbf9" },
];

const faces = [
  { name: "Sans", font: "var(--font-body)", weight: 600 },
  { name: "Serif", font: "Georgia, 'Times New Roman', serif", weight: 700 },
  { name: "Mono", font: "var(--font-mono)", weight: 400 },
];

/** A tiny identity builder: a name, a palette and a typeface, applied to a card and an app icon. */
export function BrandingDemo() {
  const id = useId();
  const [name, setName] = useState("Northside Bakery");
  const [p, setP] = useState(0);
  const [f, setF] = useState(0);
  const pal = palettes[p];
  const face = faces[f];
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "?";

  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] gap-4 p-4 text-sm">
      <div data-no-drag className="min-w-0 space-y-2.5">
        <div>
          <label htmlFor={`${id}-n`} className="text-xs font-semibold text-ink">Business name</label>
          <input id={`${id}-n`} value={name} maxLength={28} onChange={(e) => setName(e.target.value)} className="field mt-1 py-1.5 text-sm" />
        </div>
        <div role="group" aria-label="Colours" className="flex flex-wrap gap-1.5">
          {palettes.map((x, i) => (
            <button key={x.name} type="button" aria-pressed={p === i} onClick={() => setP(i)} className="chip gap-1.5">
              <span className="h-3 w-3 rounded-full border border-[#171512]/20" style={{ background: x.bg }} aria-hidden="true" />
              {x.name}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Typeface" className="flex flex-wrap gap-1.5">
          {faces.map((x, i) => (
            <button key={x.name} type="button" aria-pressed={f === i} onClick={() => setF(i)} className="chip">
              {x.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3" aria-hidden="true">
        <div
          className="flex h-[6.5rem] w-[10.5rem] flex-col justify-between rounded-md p-3 shadow-[0_10px_20px_-12px_rgb(23_21_18/.6)] transition-colors duration-300"
          style={{ background: pal.bg, color: pal.fg }}
        >
          <span className="text-[15px] leading-tight" style={{ fontFamily: face.font, fontWeight: face.weight }}>
            {name || "Your name"}
          </span>
          <span className="text-[9px] opacity-75">hello@{(name || "you").toLowerCase().replace(/[^a-z0-9]/g, "") || "you"}.com</span>
        </div>
        <span
          className="grid h-14 w-14 place-items-center rounded-[14px] text-lg transition-colors duration-300"
          style={{ background: pal.soft, color: pal.bg === "#fde1da" ? pal.fg : pal.bg, fontFamily: face.font, fontWeight: face.weight, boxShadow: "inset 0 0 0 1px rgb(23 21 18 / .12)" }}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
