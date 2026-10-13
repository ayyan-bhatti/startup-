"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { CoreStatic } from "@/components/core/CoreStatic";
import { WindowFrame } from "@/components/desktop/Window";
import { MailGlyph } from "@/components/desktop/Icons";
import { serviceOptions, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

/** One line of the composer: label on the left, input on the right, error underneath. */
function Row({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: keyof ContactInput;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 border-b border-line px-4 py-2.5 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-start sm:gap-3 sm:px-5">
      <label htmlFor={id} className="pt-1.5 text-sm font-semibold text-ink">
        {label}
        {hint && <span className="block text-xs font-normal text-muted">{hint}</span>}
      </label>
      <div className="min-w-0">
        {children}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

const input =
  "block w-full min-w-0 rounded-md border border-[#8a8a8a] bg-white px-3 py-2 text-base tracking-[-0.3px] text-ink shadow-[inset_0_1px_2px_rgb(0_0_0/.06)] placeholder:text-faint hover:border-[#6f6f6f] focus:border-select focus:outline-2 focus:outline-offset-0 focus:outline-select aria-[invalid=true]:border-danger aria-[invalid=true]:bg-[#fdf0ee]";

/**
 * The enquiry form, drawn as a new email. Validation is shared with the API route (src/lib/contact.ts).
 * A hidden honeypot field and a minimum fill time keep simple bots out; the API never exposes the email key.
 */
export function ContactForm({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [failure, setFailure] = useState("");
  const sendingRef = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const startedAt = useRef(0);
  const Heading = headingLevel;

  // Start the fill timer, and pre-select a service when the visitor arrives from a service window.
  // Runs when the form appears: on load, and again after "Send another enquiry".
  const formShown = status !== "success";
  useEffect(() => {
    if (!formShown) return;
    startedAt.current = Date.now();
    const wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted && serviceOptions.includes(wanted) && serviceRef.current) serviceRef.current.value = wanted;
  }, [formShown]);

  // Move focus to the result once it is on screen, so keyboard and screen reader users hear it.
  useEffect(() => {
    if (status === "error" || status === "success") resultRef.current?.focus();
  }, [status, failure]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const { errors: clientErrors } = validateContact(raw);
    setErrors(clientErrors);
    setFailure("");
    if (Object.keys(clientErrors).length) {
      setStatus("idle");
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, elapsed: Date.now() - startedAt.current }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        if (json?.errors) setErrors(json.errors);
        setFailure(json?.message || "Something went wrong on our side and your enquiry was not sent.");
        setStatus("error");
      } else {
        form.reset();
        setStatus("success");
      }
    } catch {
      setFailure("We could not reach our server. Check your internet connection and try again.");
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  const sending = status === "sending";
  const a11y = (field: keyof ContactInput) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const sendButton = (extra = "") => (
    <button type="submit" form="enquiry-form" disabled={sending} className={`btn-primary ${extra}`}>
      {sending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent" aria-hidden="true" />}
      {sending ? "Sending…" : status === "error" ? "Try again" : "Send enquiry"}
    </button>
  );

  return (
    <WindowFrame
      title={status === "success" ? "Sent" : "New enquiry"}
      icon={<MailGlyph className="h-3.5 w-4.5" />}
      isStatic
      className="text-left"
    >
      {status === "success" ? (
        <div ref={resultRef} tabIndex={-1} role="status" className="grid min-h-[26rem] place-items-center p-8 text-center outline-none">
          <div className="max-w-md">
            <CoreStatic shells={2} pulse className="mx-auto h-20 w-20" />
            <Heading className="mt-5 text-2xl">Thank you. Your enquiry has been sent.</Heading>
            <p className="mt-3">
              We have emailed you a confirmation with a copy of your message. We will reply within {siteConfig.replyTime}.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-frame/70 bg-chrome px-4 py-2.5 sm:px-5">
            <Heading className="font-sans text-sm font-semibold tracking-normal">Tell us about your project</Heading>
            {sendButton("hidden min-h-9 py-1.5 sm:inline-flex")}
          </div>
          <form id="enquiry-form" onSubmit={onSubmit} noValidate aria-describedby="required-note" aria-busy={sending}>
            <div className="grid grid-cols-1 border-b border-line px-4 py-2.5 text-sm sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-3 sm:px-5">
              <span className="font-semibold text-ink">To</span>
              <span className="truncate px-2">
                {siteConfig.name} <span className="text-muted">&lt;{siteConfig.email}&gt;</span>
              </span>
            </div>

            {/* Honeypot: hidden from people and assistive technology. Bots tend to fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <Row id="name" label="Your name" error={errors.name}>
              <input id="name" name="name" type="text" autoComplete="name" maxLength={100} className={input} {...a11y("name")} />
            </Row>
            <Row id="email" label="Email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className={input} {...a11y("email")} />
            </Row>
            <Row id="phone" label="Phone" hint="Optional, with country code" error={errors.phone}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} placeholder="+44 20 7946 0958" className={input} {...a11y("phone")} />
            </Row>
            <Row id="organization" label="Business or organization" error={errors.organization}>
              <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={150} className={input} {...a11y("organization")} />
            </Row>
            <Row id="industry" label="Industry or type of business" error={errors.industry}>
              <input id="industry" name="industry" type="text" maxLength={100} placeholder="For example: online store, school, logistics" className={input} {...a11y("industry")} />
            </Row>
            <Row id="service" label="Service" error={errors.service}>
              <select ref={serviceRef} id="service" name="service" defaultValue="" className={`${input} cursor-pointer`} {...a11y("service")}>
                <option value="" disabled>Choose one</option>
                {serviceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Row>

            <div className="px-4 pb-2 pt-3 sm:px-5">
              <label htmlFor="message" className="text-sm font-semibold text-ink">About your project</label>
              <textarea
                id="message"
                name="message"
                rows={7}
                maxLength={5000}
                data-lenis-prevent
                placeholder="What do you want to build or change, and why now? A few sentences is enough."
                className={`${input} mt-1 resize-y leading-relaxed`}
                {...a11y("message")}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            {status === "error" && (
              <div ref={resultRef} tabIndex={-1} role="alert" className="mx-4 mb-3 rounded-md border border-danger/40 bg-[#fdf0ee] p-4 outline-none sm:mx-5">
                <p className="font-semibold text-ink">Your enquiry was not sent.</p>
                <p className="mt-1">{failure}</p>
                <p className="mt-1">
                  Your answers are still in the form, so you can try again. You can also email us at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>.
                </p>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-line bg-chrome px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p id="required-note" className="text-xs text-muted">All fields are required unless marked optional.</p>
              {sendButton("w-full sm:w-auto")}
            </div>
          </form>
        </>
      )}
    </WindowFrame>
  );
}
