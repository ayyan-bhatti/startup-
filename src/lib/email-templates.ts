import { siteConfig } from "@/config/site";
import type { ContactInput } from "./contact";

/** Escapes user input before it is placed into HTML emails. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br />");

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;width:150px;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">${value}</td></tr>`;
}

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif"><div style="max-width:600px;margin:0 auto;padding:24px"><div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e2e8f0">${body}</div><p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:16px">${escapeHtml(siteConfig.legalName)} · ${escapeHtml(siteConfig.url)}</p></div></body></html>`;
}

export function visitorConfirmation(d: ContactInput) {
  const subject = `We received your message — ${siteConfig.name}`;
  const html = layout(`
    <h1 style="font-size:22px;color:#0f172a;margin:0 0 16px">Thanks for reaching out, ${escapeHtml(d.name)}!</h1>
    <p style="color:#334155;line-height:1.6">We received your message and will get back to you within <strong>3 business days</strong>.</p>
    <p style="color:#334155;line-height:1.6">Here is a short summary of what you sent us:</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0">
      ${row("Business", escapeHtml(d.organization))}
      ${row("Type of business", escapeHtml(d.businessType))}
      ${row("Service", escapeHtml(d.service))}
      ${row("Message", nl2br(d.message))}
    </table>
    <p style="color:#334155;line-height:1.6">If you want to add anything, just reply to this email.</p>
    <p style="color:#334155;line-height:1.6">— The ${escapeHtml(siteConfig.name)} team</p>`);
  const text = `Thanks for reaching out, ${d.name}!

We received your message and will get back to you within 3 business days.

Business: ${d.organization}
Type of business: ${d.businessType}
Service: ${d.service}
Message:
${d.message}

— The ${siteConfig.name} team`;
  return { subject, html, text };
}

export function internalNotification(d: ContactInput, timestamp: string) {
  const subject = `New enquiry: ${d.organization} (${d.businessType}) — ${d.service}`;
  const html = layout(`
    <h1 style="font-size:20px;color:#0f172a;margin:0 0 16px">New enquiry</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row("Name", escapeHtml(d.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`)}
      ${row("Phone", escapeHtml(d.phone || "—"))}
      ${row("Business", escapeHtml(d.organization))}
      ${row("Type of business", escapeHtml(d.businessType))}
      ${row("Service", escapeHtml(d.service))}
      ${row("Message", nl2br(d.message))}
      ${row("Submitted", escapeHtml(timestamp))}
    </table>
    <p style="color:#64748b;font-size:13px;margin-top:16px">Reply to this email to respond directly to ${escapeHtml(d.name)}.</p>`);
  const text = `New enquiry

Name: ${d.name}
Email: ${d.email}
Phone: ${d.phone || "—"}
Business: ${d.organization}
Type of business: ${d.businessType}
Service: ${d.service}
Submitted: ${timestamp}

Message:
${d.message}`;
  return { subject, html, text };
}
