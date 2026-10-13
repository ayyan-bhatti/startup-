"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { serviceOptions, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

function Field({
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
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [failure, setFailure] = useState("");
  const sendingRef = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify(raw),
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
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  const sending = status === "sending";
  const a11y = (field: keyof ContactInput) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="mt-8 border-l-4 border-success bg-surface p-6 outline-none">
        <h2 className="text-xl">Thank you. Your enquiry has been sent.</h2>
        <p className="mt-2">
          We have emailed you a confirmation with a copy of your message. We will reply within {siteConfig.replyTime}.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link mt-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6" aria-describedby="required-note">
      <p id="required-note" className="text-sm text-muted">All fields are required unless marked optional.</p>

      {/* Honeypot: hidden from people and assistive technology. Bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={100} className="field" {...a11y("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className="field" {...a11y("email")} />
        </Field>
        <Field id="phone" label="Phone" hint="(optional, include your country code)" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} placeholder="+44 20 7946 0958" className="field" {...a11y("phone")} />
        </Field>
        <Field id="organization" label="Business or organization" error={errors.organization}>
          <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={150} className="field" {...a11y("organization")} />
        </Field>
        <Field id="industry" label="Industry or type of business" error={errors.industry}>
          <input id="industry" name="industry" type="text" maxLength={100} placeholder="For example: online store, school, logistics" className="field" {...a11y("industry")} />
        </Field>
        <Field id="service" label="Service you are interested in" error={errors.service}>
          <select id="service" name="service" defaultValue="" className="field" {...a11y("service")}>
            <option value="" disabled>Choose one</option>
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field id="message" label="About your project" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={5000}
          placeholder="What do you want to build or change, and why now?"
          className="field resize-y"
          {...a11y("message")}
        />
      </Field>

      {status === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-l-4 border-danger bg-surface p-4 outline-none">
          <p className="font-semibold text-ink">Your enquiry was not sent.</p>
          <p className="mt-1">{failure}</p>
          <p className="mt-1">
            Your answers are still in the form, so you can try again. You can also email us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>.
          </p>
        </div>
      )}

      <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
        {sending ? "Sending…" : status === "error" ? "Try again" : "Send enquiry"}
      </button>
    </form>
  );
}
