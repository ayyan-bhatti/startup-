"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  "Read the message",
  "Found: a booking request for Friday morning",
  "Checked the calendar: 09:30 is free",
  "Drafted a reply offering 09:30",
];

/**
 * An automation that answers a booking request. It does the routine work, then waits for a person to approve
 * the reply, because that is where judgement matters.
 */
export function AiAutomationDemo() {
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "waiting" | "sent">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShown(0);
    setPhase("running");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    steps.forEach((_, i) =>
      timers.current.push(setTimeout(() => setShown(i + 1), reduce ? 0 : 450 * (i + 1))),
    );
    timers.current.push(setTimeout(() => setPhase("waiting"), reduce ? 0 : 450 * steps.length + 250));
  }

  return (
    <div className="flex h-full flex-col gap-3 p-4 text-sm">
      <div className="rounded-md border border-frame bg-window px-3 py-2">
        <p className="text-xs text-muted">New message from your website</p>
        <p className="mt-0.5 text-ink">&ldquo;Hi, can I book a cleaning on Friday morning?&rdquo;</p>
      </div>
      <ol className="min-h-0 flex-1 space-y-1 font-mono text-[12px]" aria-live="polite">
        {steps.slice(0, shown).map((s) => (
          <li key={s} className="flex gap-2">
            <span className="text-success" aria-hidden="true">✓</span>
            <span>{s}</span>
          </li>
        ))}
        {phase === "waiting" && (
          <li className="flex gap-2 text-[#7a4205]">
            <span aria-hidden="true">●</span>
            <span>Waiting for a person to approve</span>
          </li>
        )}
        {phase === "sent" && (
          <li className="flex gap-2 text-success">
            <span aria-hidden="true">✓</span>
            <span>Approved and sent. Reminder set for Thursday.</span>
          </li>
        )}
      </ol>
      <div className="flex gap-2">
        {phase === "waiting" ? (
          <>
            <button type="button" className="chip border-select bg-select text-on-select hover:bg-link" onClick={() => setPhase("sent")}>
              Approve and send
            </button>
            <button type="button" className="chip" onClick={() => { setPhase("idle"); setShown(0); }}>
              Discard
            </button>
          </>
        ) : (
          <button type="button" className="chip" disabled={phase === "running"} onClick={run}>
            {phase === "idle" ? "Run the automation" : phase === "running" ? "Running…" : "Run it again"}
          </button>
        )}
      </div>
    </div>
  );
}
