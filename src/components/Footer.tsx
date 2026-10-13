import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

/* 5x7 pixel letters for the wordmark. */
const GLYPHS: Record<string, string[]> = {
  c: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
  o: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  r: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  e: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
};

/** The studio name, built from small glossy tiles. */
function Wordmark({ text }: { text: string }) {
  const letters = text.toLowerCase().split("").filter((ch) => GLYPHS[ch]);
  const cell = 26;
  const gap = 2;
  const width = letters.length * 6 * cell;
  return (
    <svg viewBox={`0 0 ${width} ${7 * cell}`} className="h-auto w-full" role="img" aria-label={text}>
      <defs>
        <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6ecff" />
          <stop offset=".45" stopColor="#7cc4f6" />
          <stop offset="1" stopColor="#4aa6ea" />
        </linearGradient>
      </defs>
      {letters.map((ch, li) =>
        GLYPHS[ch].flatMap((row, y) =>
          row.split("").map((v, x) =>
            v === "#" ? (
              <g key={`${li}-${x}-${y}`}>
                <rect x={li * 6 * cell + x * cell + gap / 2} y={y * cell + gap / 2} width={cell - gap} height={cell - gap} rx="4" fill="url(#tile)" stroke="#2a7cc0" strokeOpacity=".35" />
                <rect x={li * 6 * cell + x * cell + 4} y={y * cell + 3} width={cell - 8} height="5" rx="2.5" fill="#fff" opacity=".55" />
              </g>
            ) : null,
          ),
        ),
      )}
    </svg>
  );
}

const linkCls = "w-fit text-[16px] leading-normal tracking-[-0.48px] text-black/60 transition-colors hover:text-black";
const headCls = "text-[16px] font-normal leading-normal tracking-[-0.48px] text-black";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto max-w-[1090px] border-t-2 border-dotted border-black/10 px-5 pb-6 pt-16 lg:px-0 lg:pt-[104px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-[31px]">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className={headCls}>pages</h2>
            <Link href="/" className={linkCls}>home</Link>
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className={linkCls}>{item.label.toLowerCase()}</Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <h2 className={headCls}>services</h2>
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className={linkCls}>{s.title.toLowerCase()}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className={headCls}>contact</h2>
            <a href={`mailto:${siteConfig.email}`} className={linkCls}>{siteConfig.email}</a>
            <Link href={siteConfig.cta.href} className={linkCls}>start a project</Link>
            {siteConfig.socials.map((url) => (
              <a key={url} href={url} className={linkCls} rel="me noopener">{new URL(url).hostname.replace("www.", "")}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className={headCls}>note</h2>
            <p className="text-[16px] leading-normal tracking-[-0.48px] text-black/60">
              we reply to every enquiry within {siteConfig.replyTime}, including the ones we turn down.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-[760px] lg:mt-20">
          <Wordmark text={siteConfig.name} />
        </div>
        <p className="mt-10 text-center text-[12px] leading-4 tracking-[-0.24px] text-black/60">
          © {new Date().getFullYear()} {siteConfig.legalName}
          {siteConfig.legalAddress ? ` · ${siteConfig.legalAddress}` : ""}
        </p>
      </div>
    </footer>
  );
}
