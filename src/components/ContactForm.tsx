"use client";

import { useState } from "react";
import { businessTypeOptions, serviceOptions, validateContact, type ContactErrors } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-accent focus:outline-2 focus:outline-accent aria-[invalid=true]:border-red-600";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const { errors: clientErrors } = validateContact(raw);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      setStatus("idle");
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.message || "Something went wrong.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setServerMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-900">Thank you, your message has been sent.</h3>
        <p className="mt-2 text-green-900">
          We have emailed you a confirmation and will get back to you within 3 business days.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 font-semibold text-green-900 underline">
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const a11y = (field: keyof ContactErrors) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-900">Name *</label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} className={inputClass} {...a11y("name")} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-900">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} {...a11y("email")} />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-slate-900">Phone <span className="font-normal text-slate-600">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={25} className={inputClass} {...a11y("phone")} />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="organization" className="text-sm font-medium text-slate-900">Business / organization name *</label>
          <input id="organization" name="organization" type="text" autoComplete="organization" required maxLength={150} className={inputClass} {...a11y("organization")} />
          <FieldError id="organization-error" message={errors.organization} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="businessType" className="text-sm font-medium text-slate-900">Type of business *</label>
          <select id="businessType" name="businessType" required defaultValue="" className={inputClass} {...a11y("businessType")}>
            <option value="" disabled>Select your business type</option>
            {businessTypeOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
          <FieldError id="businessType-error" message={errors.businessType} />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium text-slate-900">Service interested in *</label>
          <select id="service" name="service" required defaultValue="" className={inputClass} {...a11y("service")}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
          <FieldError id="service-error" message={errors.service} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-900">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="Tell us about your business and what you would like to achieve: more bookings, more clients, less paperwork…"
          className={inputClass}
          {...a11y("message")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {serverMessage} Please try again, or email us directly.
        </div>
      )}

      <button type="submit" disabled={sending} aria-disabled={sending} className="btn-primary w-full sm:w-auto">
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
