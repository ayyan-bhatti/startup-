import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";
import { internalNotification, visitorConfirmation } from "@/lib/email-templates";

export const runtime = "nodejs";

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

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Some answers need fixing. See the messages next to each field.", errors }, { status: 422 });
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
