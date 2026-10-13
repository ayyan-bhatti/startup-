import Link from "next/link";
import { siteConfig } from "@/config/site";
import { commitments } from "@/content/about";
import { TrafficLights } from "@/components/desktop/Window";
import { Reveal } from "@/components/desktop/Reveal";
import { Sticker } from "./Minis";

/** Title-bar tints, one per card, like coloured windows on a desk. */
const tints = [
  "linear-gradient(90deg,#cfe9d4,#e3f3e6 50%,#cfe9d4)",
  "linear-gradient(90deg,#cfdcf3,#e2ebfa 50%,#cfdcf3)",
  "linear-gradient(90deg,#f3d0d6,#fae4e7 50%,#f3d0d6)",
  "linear-gradient(90deg,#cdeeea,#e2f7f4 50%,#cdeeea)",
  "linear-gradient(90deg,#f6dcc6,#fbebdd 50%,#f6dcc6)",
  "linear-gradient(90deg,#f1e8b8,#f8f2d6 50%,#f1e8b8)",
];

const glyphs = ["✉", "✎", "◐", "☺", "⌂", "✓"];

function Card({ term, detail, i }: { term: string; detail: string; i: number }) {
  return (
    <article className="card-win">
      <div className="flex items-center justify-between p-2.5" style={{ background: tints[i % tints.length] }}>
        <TrafficLights size={10} />
        <svg viewBox="0 0 10 10" className="h-[7px] w-[8px] opacity-40" aria-hidden="true">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-3 p-4 pt-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#f5f5f5] text-[18px] shadow-[inset_0_0_0_1px_rgb(0_0_0/.08)]" aria-hidden="true">
            {glyphs[i % glyphs.length]}
          </span>
          <span className="flex flex-col gap-1.5 leading-none">
            <h3 className="text-[14px] font-normal tracking-[-0.42px]">{term.toLowerCase()}</h3>
            <span className="text-[14px] tracking-[-0.42px] text-black/60">on every project</span>
          </span>
        </div>
        <p className="text-[16px] leading-normal tracking-[-0.48px] lowercase">{detail}</p>
      </div>
    </article>
  );
}

/** What working with us is like: the commitments from the About page, as a wall of small windows. */
export function HowWeWork() {
  const words = Array.from({ length: 8 }, () => "how we work");
  const cols = [0, 1, 2].map((c) => commitments.filter((_, i) => i % 3 === c));
  return (
    <section aria-labelledby="work-heading" className="relative border-t-2 border-dotted border-black/10 pb-20 pt-16 lg:mx-auto lg:w-[1090px] lg:border-t-2 lg:pt-[61px]">
      <div className="flex justify-center">
        <span className="badge">promises</span>
      </div>
      <div className="relative mt-6 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-6 whitespace-nowrap text-[34px] font-medium tracking-[-1.02px] lg:text-[48px] lg:tracking-[-1.44px]">
          {[...words, ...words].map((w, i) => (
            <span key={i} className={i % 8 === 2 ? "text-black" : "text-black/25"}>
              {w}
            </span>
          ))}
        </div>
      </div>
      <h2 id="work-heading" className="sr-only">How we work</h2>
      <div className="relative mt-2 flex justify-end pr-[18%]">
        <Sticker className="-mt-14 rotate-[-12deg] text-[15px] lg:-mt-16">no surprises!</Sticker>
      </div>

      <Reveal className="mt-8 px-5 lg:px-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:pb-16 lg:[mask-image:linear-gradient(#000_78%,transparent_100%)]">
          {cols.map((col, c) => (
            <div key={c} className={`flex flex-col gap-4 ${c === 1 ? "lg:mt-8" : ""}`}>
              {col.map((x) => (
                <Card key={x.term} term={x.term} detail={x.detail} i={commitments.indexOf(x)} />
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="relative z-[3] mx-5 mt-6 rounded-lg border border-black/[0.08] p-1 shadow-[0_10px_24px_rgb(0_0_0/.12),inset_0_1px_1px_rgb(255_255_255/.8)] backdrop-blur-md backdrop-saturate-150 [background:linear-gradient(rgb(255_255_255/.55),rgb(231_231_231/.55)_42%,rgb(251_251_251/.55))] lg:mx-0 lg:-mt-12">
        <p className="p-4 text-center text-[18px] font-medium tracking-[-0.54px] lg:text-[20px]">
          every enquiry gets a reply within {siteConfig.replyTime}.{" "}
          <Link href={siteConfig.cta.href} className="text-link underline decoration-link/30 underline-offset-4 hover:decoration-link">
            start a project
          </Link>
        </p>
      </div>
    </section>
  );
}
