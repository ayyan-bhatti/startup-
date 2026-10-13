"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { services } from "@/content/services";
import { WindowFrame } from "@/components/desktop/Window";
import { WebsitesDemo } from "@/components/services/demos/WebsitesDemo";
import { MobileAppDemo } from "@/components/services/demos/MobileAppDemo";
import { BrandingDemo } from "@/components/services/demos/BrandingDemo";
import { AiAutomationDemo } from "@/components/services/demos/AiAutomationDemo";
import { CustomSoftwareDemo } from "@/components/services/demos/CustomSoftwareDemo";

type Row = {
  slug: string;
  heading: string;
  ask: string;
  reply: string;
  pill: "pill-blue" | "pill-orange" | "pill-teal" | "pill-pink" | "pill-green";
  file: string;
  wallpaper: string;
  Demo: ComponentType;
};

/** One row per service. The headings and descriptions come from src/content/services.ts. */
const rows: Row[] = [
  {
    slug: "websites",
    heading: "websites",
    ask: "core, build us a website",
    reply: "on it. you'll click through the screens before we build.",
    pill: "pill-blue",
    file: "website-preview",
    wallpaper: "linear-gradient(160deg,#cfe3ff 0%,#a2c7ff 45%,#f5d9ff 100%)",
    Demo: WebsitesDemo,
  },
  {
    slug: "mobile-apps",
    heading: "mobile apps",
    ask: "core, we need an app",
    reply: "yes. one app, for iphone and android.",
    pill: "pill-orange",
    file: "booking-app",
    wallpaper: "linear-gradient(160deg,#ffe9d6 0%,#ffc999 50%,#ffb3d6 100%)",
    Demo: MobileAppDemo,
  },
  {
    slug: "branding",
    heading: "branding and design",
    ask: "core, make us look good",
    reply: "logo, colours and type, applied everywhere you're seen.",
    pill: "pill-teal",
    file: "brand-kit",
    wallpaper: "linear-gradient(160deg,#d6fffb 0%,#7fe3d4 50%,#c9f0ff 100%)",
    Demo: BrandingDemo,
  },
  {
    slug: "ai-automation",
    heading: "ai automation",
    ask: "core, answer our emails",
    reply: "done. a person still approves what matters.",
    pill: "pill-pink",
    file: "booking-assistant",
    wallpaper: "linear-gradient(160deg,#ffe0f0 0%,#ffb3d6 50%,#e2d6ff 100%)",
    Demo: AiAutomationDemo,
  },
  {
    slug: "custom-software",
    heading: "custom software",
    ask: "core, fix our spreadsheets",
    reply: "let's map how your work moves, then build around it.",
    pill: "pill-green",
    file: "job-tracker",
    wallpaper: "linear-gradient(160deg,#e3ffd6 0%,#a9e88f 50%,#d6fffb 100%)",
    Demo: CustomSoftwareDemo,
  },
];

const BAR_HEIGHTS = [30, 55, 100, 70, 85, 60, 95, 45, 75, 40, 25];

/** Little voice bars that move while a row is in focus. */
function Wave({ live }: { live: boolean }) {
  return (
    <div className="flex h-[86px] items-start justify-center" aria-hidden="true">
      <div className="flex h-7 items-center gap-2.5">
        {BAR_HEIGHTS.map((h, i) => (
          <i
            key={i}
            className={`block w-2 rounded-full transition-colors duration-300 ${live ? "bg-black" : "bg-[#c8c8cc]"}`}
            style={{
              height: `${h}%`,
              animation: live ? `wave 0.9s ease-in-out ${i * 70}ms infinite alternate` : undefined,
              opacity: i === 0 || i === BAR_HEIGHTS.length - 1 ? 0.35 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** The typed request and the reply, once the row has been in focus. */
function Conversation({ row, started, align }: { row: Row; started: boolean; align: "left" | "right" }) {
  const [typed, setTyped] = useState(0);
  const done = typed >= row.ask.length;

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    const id = setInterval(
      () => {
        i = reduce ? row.ask.length : i + 1;
        setTyped(i);
        if (i >= row.ask.length) clearInterval(id);
      },
      reduce ? 0 : 38,
    );
    return () => clearInterval(id);
  }, [started, row.ask.length]);

  return (
    <div className={`flex flex-col gap-4 ${align === "right" ? "items-end" : "items-start"}`}>
      <p className={`${row.pill} h-[37px] max-w-full justify-start whitespace-nowrap px-5 text-left text-[20px] font-normal tracking-[-0.6px] hover:opacity-100 sm:text-[24px] sm:tracking-[-0.72px]`}>
        <span className="sr-only">{row.ask}</span>
        <span className="relative z-[2]" aria-hidden="true">
          {row.ask.slice(0, typed) || " "}
          {started && !done && <span className="caret ml-0.5 inline-block h-[20px] w-[2px] translate-y-[3px] bg-black/55" />}
        </span>
      </p>
      <p
        className={`flex items-center gap-2 text-[15px] leading-snug text-black/60 transition-[opacity,translate] duration-300 ${done ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
        aria-hidden={!done}
      >
        <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-black" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ffc999]" />
        </span>
        {row.reply}
      </p>
    </div>
  );
}

function FeatureRow({ row, index, focused, seen, setRef }: { row: Row; index: number; focused: boolean; seen: boolean; setRef: (el: HTMLElement | null) => void }) {
  const service = services.find((s) => s.slug === row.slug);
  const flip = index % 2 === 1;
  return (
    <article
      ref={setRef}
      aria-labelledby={`feat-${row.slug}`}
      className={`flex flex-col gap-0 px-5 pb-10 transition-[opacity,scale] duration-[400ms] ease-[var(--ease-settle)] lg:flex-row lg:items-center lg:gap-16 lg:px-0 lg:pb-0 ${
        flip ? "lg:flex-row-reverse" : ""
      } ${focused ? "scale-100 opacity-100" : "scale-[0.75] opacity-15 lg:scale-[0.8] lg:opacity-30"}`}
    >
      {/* Copy column. On phones: copy, then window, then the conversation. */}
      <div className={`contents lg:flex lg:h-[474px] lg:w-[320px] lg:flex-none lg:flex-col lg:p-4 ${flip ? "lg:items-end lg:text-right" : ""}`}>
        <div className="order-3 mt-6 lg:order-none lg:mt-0">
          <Wave live={focused} />
        </div>
        <div className="order-4 flex flex-1 flex-col justify-center lg:order-none">
          <Conversation row={row} started={seen} align={flip ? "right" : "left"} />
        </div>
        <div className={`order-1 mb-6 flex flex-col gap-2 lg:order-none lg:mb-0 ${flip ? "lg:items-end" : ""}`}>
          <h3 id={`feat-${row.slug}`} className="text-[20px] font-medium leading-normal tracking-[-0.6px]">
            {row.heading}
          </h3>
          <p className="text-[16px] leading-normal tracking-[-0.48px] text-black/60 lowercase">{service?.short}</p>
          <Link href={`/services#${row.slug}`} className="mt-1 text-[14px] font-medium text-link hover:underline">
            what&apos;s included
          </Link>
        </div>
      </div>

      {/* The window: a small desktop with the working demo. */}
      <div className="order-2 lg:order-none lg:h-[474px] lg:w-[706px] lg:flex-none">
        <div
          className="relative h-[420px] overflow-hidden rounded-2xl border border-black p-2 shadow-[0_8px_19.2px_rgb(0_0_0/.12)] sm:h-[460px] lg:h-full"
          style={{ background: row.wallpaper }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0.8px_0.8px_rgb(255_255_255/.8)]" aria-hidden="true" />
          <WindowFrame title={row.file} className="h-full" bodyClassName="desk-dots">
            <div className={focused ? "" : "pointer-events-none lg:pointer-events-auto"}>
              <div className="flex h-full min-h-[300px] items-center justify-center">
                <div className="w-full max-w-[520px] lg:[zoom:1.3]">
                  <row.Demo />
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>
      </div>
    </article>
  );
}

/**
 * What we build: one row per service, each with a small working demo. The row nearest the middle of the
 * screen is in focus; the others step back, so the page reads one service at a time.
 */
export function Features() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [focus, setFocus] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setFocus(best);
      setSeen((s) => (s.has(best) ? s : new Set(s).add(best)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="services" aria-labelledby="services-heading" className="pb-16 pt-20 lg:pb-32 lg:pt-32">
      <div className="mb-12 flex flex-col items-center gap-3 px-5 text-center lg:mb-16">
        <span className="badge">what we build</span>
        <h2 id="services-heading" className="text-[34px] leading-[1.2] tracking-[-1.02px] lg:text-[56px] lg:tracking-[-1.68px]">
          try the work, not a video of it
        </h2>
        <p className="max-w-[520px] text-[16px] leading-normal tracking-[-0.48px] text-black/55 lg:text-[18px] lg:tracking-[-0.54px]">
          each window is a small working version of something we build. click around.
        </p>
      </div>
      <div className="flex flex-col gap-0 lg:items-center lg:gap-12">
        {rows.map((row, i) => (
          <div key={row.slug} className="contents">
            {i > 0 && <hr className="mx-5 mb-10 border-0 border-t-2 border-dotted border-black/15 lg:hidden" />}
            <FeatureRow
              row={row}
              index={i}
              focused={focus === i}
              seen={seen.has(i)}
              setRef={(el) => {
                refs.current[i] = el;
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-12 px-5 text-center text-[16px] text-black/60 lg:mt-20">
        we also build <Link href="/services#3d-interactive-websites" className="link">3d and interactive websites</Link> and do{" "}
        <Link href="/services#seo" className="link">seo</Link>.
      </p>
    </section>
  );
}
