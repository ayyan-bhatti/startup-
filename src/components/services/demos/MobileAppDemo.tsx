"use client";

import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const slots = ["09:00", "10:30", "12:00", "15:30", "17:00", "18:30"];

/** A tiny booking app inside a phone: choose a day and a time, book it, get the confirmation. */
export function MobileAppDemo() {
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  return (
    <div className="flex h-full items-center justify-center gap-6 p-4">
      <div className="relative h-[15.5rem] w-[9.25rem] flex-none rounded-[1.6rem] border-[5px] border-ink bg-window shadow-[0_18px_30px_-16px_rgb(23_21_18/.5)]">
        <span className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] px-2.5 pb-2.5 pt-5 text-[10px]">
          {booked ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center" role="status">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-success text-sm text-white" aria-hidden="true">✓</span>
              <p className="mt-2 text-xs font-semibold text-ink">Booked</p>
              <p className="mt-1 text-muted">
                {days[day]} at {slot}. We&apos;ll remind you the day before.
              </p>
              <button type="button" className="chip mt-3 min-h-7" onClick={() => { setBooked(false); setSlot(null); }}>
                Book another
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold text-ink">Book a session</p>
              <div role="group" aria-label="Day" className="mt-2 grid grid-cols-5 gap-0.5">
                {days.map((d, i) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={day === i}
                    onClick={() => { setDay(i); setSlot(null); }}
                    className="rounded-[4px] py-1 text-[9px] font-semibold text-body aria-pressed:bg-ink aria-pressed:text-window"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Time" className="mt-2 grid grid-cols-2 gap-1">
                {slots.map((s, i) => {
                  const taken = (i + day) % 4 === 0;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={taken}
                      aria-pressed={slot === s}
                      onClick={() => setSlot(s)}
                      className="rounded-[4px] border border-line py-1 text-[10px] text-ink disabled:text-frame disabled:line-through aria-pressed:border-select aria-pressed:bg-select aria-pressed:text-on-select"
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                disabled={!slot}
                onClick={() => setBooked(true)}
                className="mt-auto rounded-[5px] bg-accent py-1.5 text-[10px] font-semibold text-on-accent disabled:opacity-40"
              >
                {slot ? `Book ${days[day]} ${slot}` : "Choose a time"}
              </button>
            </>
          )}
        </div>
      </div>
      <p className="hidden max-w-[11rem] text-sm text-muted sm:block">
        Try it: pick a day and a time, then book. Accounts, payments and reminders work the same way in a real app.
      </p>
    </div>
  );
}
