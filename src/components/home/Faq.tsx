"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { processQuestions } from "@/content/process";

const items = [
  ...processQuestions,
  { q: "Which services does this apply to?", a: "All of them: websites, 3D and interactive websites, mobile apps, custom software, AI automation, SEO and branding." },
];

/** Questions and answers from the process copy, as an accordion. The first answer starts open. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-5 py-20 lg:py-[61px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="badge">faq</span>
        <h2 id="faq-heading" className="mt-6 text-[34px] leading-[1.2] tracking-[-1.02px] lg:text-[56px] lg:tracking-[-1.68px]">
          frequently asked questions
        </h2>
        <p className="text-[16px] tracking-[-0.48px] lg:text-[18px] lg:tracking-[-0.54px]">
          what to know about working with us. <Link href="/process" className="link">the full process</Link>
        </p>
      </div>
      <ul className="mx-auto mt-14 flex max-w-[834px] flex-col gap-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="rounded-lg bg-white">
              <h3 className="text-[20px] font-medium leading-tight tracking-[-0.6px]">
                <button
                  type="button"
                  id={`${id}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 rounded-lg p-5 text-left lowercase"
                >
                  {item.q}
                  <svg viewBox="0 0 20 20" className={`mt-0.5 h-5 w-5 flex-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                    <path d="M10 3v14M3 10h14" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </h3>
              <div
                id={`${id}-a${i}`}
                role="region"
                aria-labelledby={`${id}-q${i}`}
                hidden={!isOpen}
                className="-mt-2 max-w-[470px] px-5 pb-5 text-[16px] leading-normal tracking-[-0.48px] text-black/55 lowercase"
              >
                {item.a}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
