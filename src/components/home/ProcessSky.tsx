"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/content/process";
import { TrafficLights } from "@/components/desktop/Window";

/** The six steps, grouped into three cards of two. */
const cards = [
  { title: "plan", tag: "discovery and design", steps: [0, 1], cta: { href: siteConfig.cta.href, label: "book a discovery call" } },
  { title: "build", tag: "development and testing", steps: [2, 3], cta: { href: "/process", label: "see the full process" }, featured: true },
  { title: "launch", tag: "launch and support", steps: [4, 5], cta: { href: siteConfig.cta.href, label: "start a project" } },
];

const views = [
  { id: "we", label: "what we do" },
  { id: "output", label: "what you get" },
] as const;

/** A soft sky, drawn with gradients. */
const sky =
  "radial-gradient(60% 40% at 15% 20%, rgb(255 255 255 / .55), transparent 70%), radial-gradient(45% 30% at 80% 12%, rgb(255 255 255 / .45), transparent 70%), radial-gradient(55% 35% at 65% 70%, rgb(255 255 255 / .35), transparent 70%), radial-gradient(40% 25% at 25% 85%, rgb(255 255 255 / .3), transparent 70%), linear-gradient(180deg, #2459b0 0%, #2f6cc4 30%, #5d97dd 70%, #8ec0ef 100%)";

export function ProcessSky() {
  const [view, setView] = useState<(typeof views)[number]["id"]>("we");

  return (
    <section id="process" aria-labelledby="process-heading" className="relative overflow-hidden rounded-t-[24px] pb-20 pt-14 lg:pb-24 lg:pt-[61px]" style={{ background: sky }}>
      <div className="flex flex-col items-center gap-3 px-5 text-center">
        <span className="badge">process</span>
        <h2 id="process-heading" className="mt-2 text-[34px] leading-[1.2] tracking-[-1.02px] text-white lg:text-[56px] lg:tracking-[-1.68px]">
          how a project runs
        </h2>
        <p className="text-[16px] tracking-[-0.48px] text-white/90 lg:text-[18px]">the same six steps for a small website or a large system.</p>

        <div role="group" aria-label="Show" className="mt-4 flex rounded-full border border-white/50 bg-white/20 p-1 shadow-[inset_0_1px_1px_rgb(255_255_255/.6)] backdrop-blur-md">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => setView(v.id)}
              className="rounded-full px-4 py-1.5 text-[16px] font-medium tracking-[-0.48px] text-white transition-colors aria-pressed:bg-[linear-gradient(#fff,#ececec)] aria-pressed:text-black aria-pressed:shadow-[0_2px_6px_rgb(0_0_0/.15)]"
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1090px] grid-cols-1 gap-5 px-5 md:grid-cols-3 lg:px-0">
        {cards.map((c) => {
          const first = c.steps[0] + 1;
          const last = c.steps[c.steps.length - 1] + 1;
          return (
            <article
              key={c.title}
              className="relative rounded-lg p-1 pt-2 shadow-[0_10px_24px_rgb(0_0_0/.12),inset_0_1px_1px_rgb(255_255_255/.8),inset_0_0_0_1px_rgb(255_255_255/.25)] backdrop-blur-xl [background:linear-gradient(rgb(255_255_255/.3),rgb(231_231_231/.3)_42%,rgb(251_251_251/.3))]"
            >
              {c.featured && <span className="badge absolute -top-3.5 left-1/2 z-[2] h-6 -translate-x-1/2 normal-case">most of the work</span>}
              <div className="px-1 pb-2">
                <TrafficLights size={10} />
              </div>
              <div className={`rounded-[5px] px-5 pb-5 pt-6 text-center ${c.featured ? "bg-white" : "bg-white/95"}`}>
                <h3 className="text-[24px] tracking-[-0.72px]">{c.title}</h3>
                <p className="mt-1 text-[18px] tracking-[-0.54px]">{c.tag}</p>
                <hr className="mx-auto my-5 w-full border-0 border-t-2 border-dotted border-black/10" />
                <p className="text-[56px] font-medium leading-none tracking-[-1.68px]">
                  {first}
                  <span className="text-black/30">–</span>
                  {last}
                </p>
                <p className="mt-2 text-[13px] text-black/60">steps {first} and {last} of {processSteps.length}</p>
                <Link href={c.cta.href} className={`${c.featured ? "pill-blue" : "pill-grey"} mt-5 h-9 text-[16px]`}>
                  <span className="relative z-[2]">{c.cta.label}</span>
                </Link>
                <hr className="mx-auto my-5 w-full border-0 border-t-2 border-dotted border-black/10" />
                <p className="text-left text-[14px] text-black/60">{view === "we" ? "what we do" : "what you get"}</p>
                <ul className="mt-3 space-y-3 text-left">
                  {c.steps.map((i) => (
                    <li key={i} className="grid grid-cols-[20px_minmax(0,1fr)] gap-2.5 text-[15px] leading-snug tracking-[-0.45px]">
                      <span className="mt-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-black text-[10px] text-white" aria-hidden="true">✓</span>
                      <span>
                        <span className="font-medium">{processSteps[i].title.toLowerCase()}:</span>{" "}
                        <span className="lowercase text-black/70">{view === "we" ? processSteps[i].we : processSteps[i].output}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {/* A dark note, like a terminal on the desk. */}
      <div className="mx-auto mt-10 max-w-[1090px] px-5 lg:px-0">
        <div className="rounded-lg border border-black/60 bg-[#1d1d1f] p-1 pt-2 shadow-[0_10px_24px_rgb(0_0_0/.2)]">
          <div className="px-2 pb-2">
            <TrafficLights size={10} />
          </div>
          <div className="flex flex-col gap-5 rounded-[5px] bg-[#232325] px-6 py-6 font-mono text-[#f2f2f2] md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[18px] tracking-normal">&lt; not sure where to start? &gt;</p>
              <p className="mt-2 text-[14px] leading-relaxed tracking-normal text-[#a1a1a6]">
                describe what you want to change in a few sentences. we&apos;ll suggest where to start, even if it&apos;s a smaller project than you expected *
              </p>
            </div>
            <Link href="#contact" className="pill-grey h-10 self-start font-mono text-[16px] tracking-normal md:self-auto">
              <span className="relative z-[2]">write to us</span>
            </Link>
          </div>
        </div>
        <p className="mt-2 text-center text-[12px] text-black/70">* we reply within {siteConfig.replyTime}.</p>
      </div>
    </section>
  );
}
