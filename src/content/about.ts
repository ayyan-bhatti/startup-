import { siteConfig } from "@/config/site";

/** What we believe. Shared by the About page and the About window on Home. */
export const beliefs = [
  "Most businesses do not need more technology. They need fewer missed enquiries, fewer hours spent copying data from one place to another, and a website that answers questions before anyone has to pick up the phone.",
  "So we start with the problem, not the product. Sometimes the answer is a new app. Often it is a better website, a booking form and three automated emails.",
  "We work remotely with clients in any country, and we keep decisions and progress in writing so time zones never slow a project down.",
];

export const commitments = [
  { term: "A reply", detail: `Every enquiry gets a reply from us within ${siteConfig.replyTime}, including the ones we turn down.` },
  { term: "A written proposal", detail: "Scope, timeline and cost are in writing before any work starts. If something changes, we tell you before it affects the cost." },
  { term: "Regular previews", detail: "You see working progress throughout the project, not only at the end." },
  { term: "One point of contact", detail: "You always know who to message, and you get an answer, not a ticket number." },
  { term: "Your ownership", detail: "Code, designs, content, domain and accounts are set up in your name. If you leave, you take everything with you." },
  { term: "Honest advice", detail: "If you do not need something yet, we say so, even when it means a smaller project for us." },
];
