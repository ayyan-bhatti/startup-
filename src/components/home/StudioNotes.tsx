import { work } from "@/content/work";
import { Reveal } from "@/components/desktop/Reveal";
import { TrafficLights, WindowFrame } from "@/components/desktop/Window";
import { MiniSite } from "./Minis";

/** Two arches of tiny windows framing the notes, drawn in SVG. */
function Arches() {
  const arch = (colors: [string, string], mirror: boolean) =>
    Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      const theta = Math.PI * (1 - t * 0.62);
      const x0 = 430 + Math.cos(theta) * 380;
      const x = mirror ? 1440 - x0 : x0;
      const y = 660 - Math.sin(theta) * 380;
      return (
        <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
          <rect
            x="-36"
            y="-24"
            width="72"
            height="48"
            rx="6"
            fill={i % 2 ? colors[0] : colors[1]}
            opacity={0.3 + t * 0.7}
            stroke="#000"
            strokeOpacity=".12"
          />
          <rect
            x="-36"
            y="-24"
            width="72"
            height="10"
            rx="5"
            fill="#fff"
            opacity=".5"
          />
        </g>
      );
    });
  return (
    <svg
      viewBox="0 0 1440 700"
      className="pointer-events-none absolute left-0 top-[160px] hidden w-[1440px] lg:block"
      aria-hidden="true"
    >
      {arch(["#ff7ab8", "#c58bff"], false)}
      {arch(["#a9e88f", "#febc2e"], true)}
    </svg>
  );
}

const paragraphs: { text: string; ink?: string; after?: string }[] = [
  { text: "most businesses do not need more technology." },
  {
    text: "they need fewer missed enquiries, fewer hours spent copying data from one place to another, and a website that answers questions before anyone has to pick up the phone.",
  },
  {
    text: "so ",
    ink: "we start with the problem, not the product.",
    after:
      " sometimes the answer is a new app. often it is a better website, a booking form and three automated emails.",
  },
  {
    text: "we work remotely with clients in any country, and keep decisions and progress in writing.",
  },
];

/** About the studio, written as a note on the desk. */
export function StudioNotes() {
  const latest = work[0];
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t-2 border-dotted border-black/10 py-16 lg:min-h-[900px] lg:border-0 lg:py-0"
    >
      <h2 id="about-heading" className="sr-only">
        About the studio
      </h2>
      <div className="flex justify-center lg:absolute lg:inset-x-0 lg:top-[61px]">
        <span className="badge">the studio</span>
      </div>
      <Arches />

      <Reveal className="relative z-[2] mx-auto mt-8 w-full max-w-[480px] px-5 lg:mt-0 lg:px-0 lg:pt-[120px]">
        <div className="aqua-notes overflow-hidden rounded-lg">
          <div className="relative flex items-center gap-2.5 p-2.5">
            <TrafficLights size={10} />
            <span className="absolute left-1/2 top-2.5 flex -translate-x-1/2 items-center gap-1.5 text-[12px] leading-none tracking-[-0.36px] text-black/60 [text-shadow:0_1px_1px_rgb(255_255_255/.8)]">
              <span
                className="h-[15px] w-[15px] rounded-[3.5px] bg-[linear-gradient(#f7d64b_0_30%,#fff_30%)] shadow-[inset_0_0_0_0.5px_rgb(0_0_0/.18),0_0.5px_1px_rgb(0_0_0/.15)]"
                aria-hidden="true"
              />
              about-core.txt
            </span>
          </div>
          <div className="flex flex-col gap-2.5 bg-white px-6 py-5">
            {paragraphs.map((p) => (
              <p
                key={p.text}
                className="text-[18px] leading-normal tracking-[-0.54px] text-black/55 sm:text-[20px] sm:tracking-[-0.6px]"
              >
                {p.text}
                {p.ink && (
                  <mark className="rounded-[2px] bg-[#feea3d]/35 px-0.5 text-black [box-decoration-break:clone]">
                    {p.ink}
                  </mark>
                )}
                {p.after}
              </p>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-black shadow-[0_6px_15px_rgb(0_0_0/.12)]"
                aria-hidden="true"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#8a8a8a]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffc999]" />
                </span>
              </span>
              <span className="flex flex-col gap-1.5 text-[16px] leading-none tracking-[-0.48px]">
                <span>the core team</span>
                <span className="text-black/60">remote, worldwide</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {latest && (
        <div
          id="work"
          className="relative z-[3] mx-auto mt-12 w-[240px] lg:absolute lg:left-[1040px] lg:top-[600px] lg:mx-0 lg:mt-0 lg:rotate-[4deg]"
        >
          <Reveal delay={150}>
            <WindowFrame
              title="latest-project"
              titleHidden
              bodyClassName="h-[120px]"
            >
              <MiniSite />
            </WindowFrame>
            <p className="win-caption">
              our latest project: {latest.name.toLowerCase()}.{" "}
              {latest.status.toLowerCase()}
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
