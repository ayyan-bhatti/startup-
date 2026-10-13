import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";
import { internalNotification, visitorConfirmation } from "@/lib/email-templates";

export const runtime = "nodejs";

/** Forms filled faster than this were not filled by a person. */
const MIN_FILL_MS = 2500;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
/**
 * Best-effort limit per IP address. It lives in memory, so on serverless hosting each instance counts on its own.
 * It stops one visitor or script from sending many enquiries in a row, not a determined attack.
 */
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return NextResponse.json({ message: "The form data could not be read. Please reload the page and try again." }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  // Time trap: the form sends how long it was open. Same silent success as the honeypot.
  if (typeof body.elapsed === "number" && body.elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Some answers need fixing. See the messages next to each field.", errors }, { status: 422 });
  }

  // Counted only for valid enquiries, so fixing mistakes in the form never locks anyone out.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "We have received several enquiries from you in the last few minutes. Please wait a little before sending another, or email us directly." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact form: missing RESEND_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
    return NextResponse.json({ message: "Our email service is not set up correctly, so we could not send your enquiry. This is our problem, not yours." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toUTCString();
  const notify = internalNotification(data, timestamp);
  const confirm = visitorConfirmation(data);

  // The notification is the critical email: if it fails, report an error to the visitor.
  const notifyResult = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
  });
  if (notifyResult.error) {
    console.error("Contact form: notification failed", notifyResult.error);
    return NextResponse.json({ message: "Our email service did not accept the enquiry. Please try again in a few minutes." }, { status: 502 });
  }

  // The confirmation is best effort: the enquiry has already reached us.
  const confirmResult = await resend.emails.send({
    from,
    to: data.email,
    replyTo: to.split(",")[0].trim(),
    subject: confirm.subject,
    html: confirm.html,
    text: confirm.text,
  });
  if (confirmResult.error) {
    console.error("Contact form: confirmation failed", confirmResult.error);
  }

  return NextResponse.json({ ok: true });
}
