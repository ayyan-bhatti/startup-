/*
 * Small drawings that fill the hero windows and the desk around them. All CSS and SVG, all decorative:
 * each window has a real title and a button that opens a working demo.
 */

export function MiniSite() {
  return (
    <div className="flex h-full flex-col bg-white p-2" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-7 rounded-full bg-black" />
        <span className="flex gap-1">
          <span className="h-1 w-4 rounded-full bg-black/20" />
          <span className="h-1 w-4 rounded-full bg-black/20" />
          <span className="h-1 w-4 rounded-full bg-black/20" />
        </span>
      </div>
      <div className="mt-2 grid flex-1 grid-cols-[1.2fr_1fr] gap-2">
        <div className="flex flex-col justify-center gap-1">
          <span className="h-2 w-full rounded-sm bg-black" />
          <span className="h-2 w-3/4 rounded-sm bg-black" />
          <span className="mt-0.5 h-1 w-full rounded-full bg-black/15" />
          <span className="h-1 w-5/6 rounded-full bg-black/15" />
          <span className="mt-1 h-2.5 w-10 rounded-full border border-[#221898] bg-[#a2c7ff]" />
        </div>
        <span className="rounded-[3px] bg-[linear-gradient(140deg,#ffd9b3,#ffb3d6_55%,#a2c7ff)]" />
      </div>
    </div>
  );
}

export function MiniPhoneApp() {
  const slots = ["09:00", "10:30", "12:00", "15:30", "17:00"];
  return (
    <div className="flex h-full flex-col bg-white px-2 pb-2 pt-2.5 text-[7px] leading-none text-black" aria-hidden="true">
      <span className="text-[9px] font-medium">book a session</span>
      <span className="mt-1 text-black/60">wednesday</span>
      <div className="mt-2 grid grid-cols-5 gap-0.5">
        {["m", "t", "w", "t", "f"].map((d, i) => (
          <span key={i} className={`rounded-[3px] py-1 text-center ${i === 2 ? "bg-black text-white" : "bg-black/5"}`}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid gap-1">
        {slots.map((s, i) => (
          <span key={s} className={`rounded-[4px] border px-1.5 py-1 ${i === 1 ? "border-[#221898] bg-[#a2c7ff]" : "border-black/10"} ${i === 3 ? "text-black/25 line-through" : ""}`}>{s}</span>
        ))}
      </div>
      <span className="mt-auto rounded-full border border-[#9a5518] bg-[linear-gradient(#ffe9d6,#ffc999_42%,#ffe9d6)] py-1 text-center font-medium">book 10:30</span>
    </div>
  );
}

export function MiniDashboard() {
  const bars = [38, 62, 45, 80, 58, 92, 70];
  return (
    <div className="grid h-full grid-cols-[1.1fr_1fr] gap-2 bg-white p-2 text-[7px] leading-none" aria-hidden="true">
      <div className="flex flex-col gap-1">
        {[
          ["#1042", "new", "bg-[#dfe6ff]"],
          ["#1041", "in progress", "bg-[#ffe9d6]"],
          ["#1040", "done", "bg-[#d8efdf]"],
          ["#1039", "new", "bg-[#dfe6ff]"],
          ["#1038", "done", "bg-[#d8efdf]"],
        ].map(([id, s, c]) => (
          <span key={id} className="flex items-center justify-between rounded-[3px] border border-black/5 px-1 py-[3px]">
            <span className="text-black/60">{id}</span>
            <span className={`rounded-full px-1 py-[2px] ${c}`}>{s}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-col rounded-[4px] bg-[#f5f5f5] p-1.5">
        <span className="text-black/60">this week</span>
        <span className="mt-0.5 text-[11px] font-medium">128 jobs</span>
        <span className="mt-auto flex h-[55%] items-end gap-[3px]">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[2px] bg-[#a2c7ff]" style={{ height: `${h}%` }} />
          ))}
        </span>
      </div>
    </div>
  );
}

export function MiniFlow() {
  const node = "flex items-center gap-1 rounded-full border bg-white px-1.5 py-1 shadow-[0_2px_4px_rgb(0_0_0/.08)]";
  return (
    <div className="relative h-full bg-[#f2f2f4] p-2 text-[7px] leading-none" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 212 120" preserveAspectRatio="none">
        <path d="M58 28 C 90 28, 90 60, 118 60 M58 92 C 90 92, 90 60, 118 60 M150 60 L 180 60" stroke="#b9b9c0" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      </svg>
      <span className={`${node} absolute left-2 top-[18%] border-[#a3306a]/40`}><span className="h-1.5 w-1.5 rounded-full bg-[#ff7ab8]" />new email</span>
      <span className={`${node} absolute bottom-[18%] left-2 border-[#158479]/40`}><span className="h-1.5 w-1.5 rounded-full bg-[#4fd8c6]" />web chat</span>
      <span className={`${node} absolute left-[52%] top-1/2 -translate-y-1/2 border-[#221898]/40`}><span className="h-1.5 w-1.5 rounded-full bg-[#5b8cff]" />book it</span>
      <span className="absolute right-1.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-[#28c840] text-[9px] text-white">✓</span>
    </div>
  );
}

export function MiniDesign() {
  return (
    <div className="flex h-full flex-col gap-1.5 bg-[#fbfbfb] p-2 text-[7px] leading-none" aria-hidden="true">
      <div className="flex gap-1">
        {["#ff5f57", "#febc2e", "#a2c7ff", "#4fd8c6", "#000"].map((c) => (
          <span key={c} className="h-3 flex-1 rounded-[3px] border border-black/10" style={{ background: c }} />
        ))}
      </div>
      <span className="text-[13px] font-semibold tracking-tight">Aa</span>
      <span className="text-black/60">inter · 500</span>
      <div className="relative mt-1 flex-1 rounded-[6px] border border-dashed border-[#0f7fff]/60 bg-white p-1.5">
        <span className="absolute -top-2 left-1 rounded-[2px] bg-[#0f7fff] px-1 py-[2px] text-[6px] text-white">card</span>
        <span className="block h-[45%] rounded-[3px] bg-[linear-gradient(140deg,#d6fffb,#a2c7ff)]" />
        <span className="mt-1 block h-1.5 w-3/4 rounded-full bg-black" />
        <span className="mt-1 block h-1 w-full rounded-full bg-black/15" />
        <span className="mt-1 block h-1 w-2/3 rounded-full bg-black/15" />
        <span className="mt-1.5 block h-2.5 w-1/2 rounded-full border border-[#221898] bg-[#a2c7ff]" />
      </div>
      <div className="flex justify-between text-black/60">
        <span>auto layout</span>
        <span>12px</span>
      </div>
    </div>
  );
}

/* ---- Desk decor ---- */

export function Folder({ className = "h-[30px] w-[38px]", tint = "#7cc4f6" }: { className?: string; tint?: string }) {
  return (
    <svg viewBox="0 0 38 30" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`fd-${tint.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".25" stopColor={tint} />
          <stop offset="1" stopColor={tint} />
        </linearGradient>
      </defs>
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h9l3 3h17A2.5 2.5 0 0 1 36 8.5V10H2z" fill={tint} opacity=".85" />
      <rect x="2" y="8" width="34" height="20" rx="2.5" fill={`url(#fd-${tint.slice(1)})`} stroke="#000" strokeOpacity=".12" />
    </svg>
  );
}

export function Kaomoji({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`whitespace-nowrap text-[20px] leading-none text-black ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

/** A name-tag style sticker. */
export function NameTag({ color = "#1d5bff", lines = ["we are", "core"], className = "" }: { color?: string; lines?: string[]; className?: string }) {
  return (
    <div
      className={`w-[74px] overflow-hidden rounded-[5px] bg-white text-center shadow-[0_6px_10px_rgb(0_0_0/.14)] ${className}`}
      style={{ border: `1px solid ${color}` }}
      aria-hidden="true"
    >
      <div className="py-[3px] text-[7px] font-semibold uppercase leading-none tracking-wide text-white" style={{ background: color }}>
        hello
      </div>
      <div className="px-1 pb-1.5 pt-1 text-[7px] leading-tight text-black/60">
        {lines[0]}
        <span className="block font-[cursive] text-[12px] leading-tight text-black">{lines[1]}</span>
      </div>
      <div className="h-[5px]" style={{ background: color }} />
    </div>
  );
}

export function Palette({ className = "" }: { className?: string }) {
  return (
    <div className={`grid w-[96px] grid-cols-3 gap-1 rounded-[6px] bg-white p-1.5 shadow-[0_6px_12px_rgb(0_0_0/.14)] ${className}`} aria-hidden="true">
      {["#ff5f57", "#febc2e", "#28c840", "#a2c7ff", "#ffb3d6", "#000"].map((c) => (
        <span key={c} className="h-6 rounded-[3px]" style={{ background: c }} />
      ))}
    </div>
  );
}

export function PhoneObject({ className = "" }: { className?: string }) {
  return (
    <div className={`h-[92px] w-[46px] rounded-[10px] border-2 border-black bg-[linear-gradient(160deg,#cfe4ff,#ffd6ea)] p-[3px] shadow-[0_8px_14px_rgb(0_0_0/.2)] ${className}`} aria-hidden="true">
      <div className="mx-auto h-[3px] w-3 rounded-full bg-black" />
      <div className="mt-1.5 grid grid-cols-3 gap-[3px] px-[2px]">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="aspect-square rounded-[2px] bg-white/80" />
        ))}
      </div>
    </div>
  );
}

export function AppIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`grid h-[46px] w-[46px] place-items-center rounded-[11px] bg-black shadow-[0_6px_12px_rgb(0_0_0/.2)] ${className}`} aria-hidden="true">
      <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#8a8a8a]">
        <span className="h-3 w-3 rounded-full bg-[#ffc999]" />
      </span>
    </div>
  );
}

export function StickyNote({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[86px] bg-[#fff4a8] px-2 pb-2 pt-1.5 text-[9px] leading-snug text-black/75 shadow-[0_6px_10px_rgb(0_0_0/.14)] ${className}`} aria-hidden="true">
      <span className="font-medium text-black">to do</span>
      <span className="block line-through decoration-black/40">discovery call</span>
      <span className="block line-through decoration-black/40">design</span>
      <span className="block">launch ✦</span>
    </div>
  );
}

export function Sticker({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-white bg-[linear-gradient(135deg,#ff7ab8,#febc2e,#4fd8c6,#5b8cff)] px-3 py-1.5 text-[12px] font-semibold italic text-white shadow-[0_6px_12px_rgb(0_0_0/.2)] [text-shadow:0_1px_2px_rgb(0_0_0/.3)] ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
