"use client";

import { useState } from "react";

const sizes = [
  { id: "desktop", label: "Desktop", width: "100%" },
  { id: "tablet", label: "Tablet", width: "62%" },
  { id: "phone", label: "Phone", width: "32%" },
] as const;

const themes = [
  { id: "sky", label: "Sky", hero: "linear-gradient(150deg,#d6e7ff,#a2c7ff 55%,#99cbf8)", ink: "#0b1b3a", button: "#0b1b3a" },
  { id: "peach", label: "Peach", hero: "linear-gradient(150deg,#ffe9d6,#ffc999 55%,#ffb3d6)", ink: "#3a1606", button: "#3a1606" },
  { id: "mint", label: "Mint", hero: "linear-gradient(150deg,#e3ffd6,#a9e88f 50%,#4fd8c6)", ink: "#0b2a14", button: "#0b2a14" },
] as const;

/**
 * The big hero window: a sample website for a made-up business. Switch the screen size and the colours and
 * the page reflows with real container queries, the way the sites we build do.
 */
export function SiteBuilder() {
  const [size, setSize] = useState<(typeof sizes)[number]["id"]>("desktop");
  const [theme, setTheme] = useState<(typeof themes)[number]["id"]>("sky");
  const t = themes.find((x) => x.id === theme)!;
  const width = sizes.find((x) => x.id === size)!.width;

  return (
    <div className="relative flex h-full flex-col bg-[#e9e8ea]">
      <div className="flex min-h-0 flex-1 justify-center overflow-hidden px-3 pt-3">
        <div
          className="flex min-h-0 flex-col overflow-hidden rounded-t-[6px] border border-b-0 border-black/15 bg-white transition-[width] duration-500 ease-[var(--ease-settle)]"
          style={{ width }}
          aria-label={`Sample website shown at ${size} size`}
          role="img"
        >
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#f5f5f5] px-3 py-1.5">
            <span className="flex-1 truncate rounded-full bg-white px-3 py-0.5 text-center text-[11px] text-black/60">northside-bakery.com</span>
          </div>
          <div className="@container min-h-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 @lg:px-7">
              <span className="text-[13px] font-semibold tracking-tight" style={{ color: t.ink }}>northside bakery</span>
              <span className="hidden gap-4 text-[11px] text-black/55 @md:flex">
                <span>menu</span>
                <span>order</span>
                <span>visit</span>
              </span>
              <span className="grid gap-[3px] @md:hidden">
                <span className="h-[2px] w-4 bg-black" />
                <span className="h-[2px] w-4 bg-black" />
              </span>
            </div>
            <div className="mx-3 grid gap-4 rounded-[10px] p-5 transition-[background] duration-500 @lg:mx-6 @lg:grid-cols-[1.1fr_1fr] @lg:p-8" style={{ background: t.hero }}>
              <div>
                <p className="text-[22px] font-semibold leading-[1.05] tracking-tight @lg:text-[34px]" style={{ color: t.ink }}>
                  fresh bread, every morning.
                </p>
                <p className="mt-2 max-w-[24ch] text-[11px] leading-snug text-black/60 @lg:text-[13px]">
                  order by 9pm, pick up warm from 7am. sample site, made up for this demo.
                </p>
                <span className="mt-3 inline-block rounded-full px-3 py-1.5 text-[11px] font-medium text-white" style={{ background: t.button }}>
                  order for tomorrow
                </span>
              </div>
              <div className="hidden grid-cols-2 gap-2 @lg:grid">
                {["sourdough", "rye", "croissant", "focaccia"].map((x) => (
                  <span key={x} className="flex aspect-[4/3] items-end rounded-[8px] bg-white/70 p-2 text-[10px] font-medium text-black/70">{x}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 px-3 py-3 @md:grid-cols-3 @lg:px-6">
              {["open 7am to 3pm", "free local delivery", "gluten-free friday"].map((x) => (
                <span key={x} className="rounded-[8px] border border-black/10 px-3 py-2 text-[11px] text-black/60">{x}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* A glass toolbar floating over the preview. */}
      <div
        className="absolute bottom-3 left-1/2 flex max-w-[calc(100%-16px)] -translate-x-1/2 items-center gap-1 rounded-full sm:bottom-4 sm:gap-1.5 border border-white/70 bg-white/60 p-1.5 shadow-[0_10px_24px_rgb(0_0_0/.15)] backdrop-blur-md"
        data-no-drag
      >
        <div role="group" aria-label="Screen size" className="flex gap-1">
          {sizes.map((s) => (
            <button key={s.id} type="button" className="chip" aria-pressed={size === s.id} onClick={() => setSize(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <span className="mx-1 hidden h-5 w-px flex-none bg-black/15 sm:block" aria-hidden="true" />
        <div role="group" aria-label="Colours" className="hidden gap-1 sm:flex">
          {themes.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={theme === x.id}
              onClick={() => setTheme(x.id)}
              className="grid h-7 w-7 flex-none place-items-center rounded-full border border-black/20 sm:h-8 sm:w-8 aria-pressed:border-[#221898] aria-pressed:ring-2 aria-pressed:ring-[#a2c7ff]"
              style={{ background: x.hero }}
            >
              <span className="sr-only">{x.label} colours</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
