export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  deliverables: string[];
  idealFor: string;
  industryUses: { industry: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "websites",
    title: "Websites",
    short: "Credible, fast websites that turn visitors into enquiries, bookings and calls.",
    intro:
      "Your website is often the first impression a patient, client or member gets. We create professional websites that build trust in seconds, explain what you offer clearly and make it effortless to call, book or send an enquiry.",
    deliverables: [
      "A professional, mobile-friendly website written around your services",
      "Clear calls to action: call, book, message or request a quote",
      "Pages structured to be found on Google from day one",
      "Easy updates, so your opening hours and services stay current",
    ],
    idealFor: "Businesses with no website, an outdated one, or a site that looks fine but brings in no enquiries.",
    industryUses: [
      { industry: "Dental & medical clinics", text: "A website for dental clinics and medical practices that lists treatments, doctors' availability and lets patients book online." },
      { industry: "Law firms", text: "Law firm website design that builds credibility, explains practice areas and turns visitors into consultations." },
      { industry: "Gyms & studios", text: "Class timetables, membership plans and trial sign-ups in one place." },
    ],
  },
  {
    slug: "mobile-apps",
    title: "iOS & Android Apps",
    short: "Apps for bookings, clients, patients or members, on every phone.",
    intro:
      "An app keeps your business in your customers' pocket. We design and launch iOS and Android apps that make booking, paying, checking records and staying in touch simple, so people come back more often.",
    deliverables: [
      "An app for both iPhone and Android",
      "Bookings, reminders, payments and messaging built around your workflow",
      "Notifications that bring patients, clients and members back",
      "App Store and Google Play publishing handled for you",
    ],
    idealFor: "Businesses with repeat customers who want a direct, branded channel to them.",
    industryUses: [
      { industry: "Gyms & fitness studios", text: "Gym app development for class booking, memberships, check-ins and progress tracking." },
      { industry: "Hospitals & clinics", text: "Patient apps for appointments, reports and reminders." },
      { industry: "Pharmacies", text: "Prescription refill requests and order-ready notifications." },
    ],
  },
  {
    slug: "digital-growth-seo",
    title: "Digital Growth & SEO",
    short: "Get found on Google by the people already searching for what you offer.",
    intro:
      "Every day, people search for a dentist, a lawyer or a gym near them. We make sure they find you. Our digital growth and SEO work improves your Google visibility, local rankings and the number of people who actually get in touch.",
    deliverables: [
      "Local SEO so you appear in “near me” and map searches",
      "Search-friendly content for each service you offer",
      "Technical fixes that help Google understand and rank your site",
      "Simple monthly reports on calls, enquiries and rankings",
    ],
    idealFor: "Businesses that have a website but are invisible on Google, or rely entirely on word of mouth.",
    industryUses: [
      { industry: "Clinics", text: "Digital growth and SEO for clinics, targeting the treatments patients search for most." },
      { industry: "Law firms", text: "Visibility for practice-area searches in your city." },
      { industry: "Pharmacies", text: "Appear when people nearby search for an open pharmacy." },
    ],
  },
  {
    slug: "brand-reputation",
    title: "Brand & Real-World Image",
    short: "Look as good offline as you do online: branding, reviews and reputation.",
    intro:
      "Trust is built everywhere your business appears. We shape a consistent brand across your logo, signage, printed materials, Google Business Profile and reviews, so your business looks established and trustworthy at every touchpoint.",
    deliverables: [
      "Logo and brand identity: colours, typography and usage guide",
      "Google Business Profile setup and optimisation",
      "A simple system for collecting and responding to reviews",
      "Printed materials: business cards, brochures, signage and forms",
    ],
    idealFor: "New businesses building a brand, and established ones whose image no longer matches their quality.",
    industryUses: [
      { industry: "Clinics & hospitals", text: "A calm, professional identity that reassures patients before they arrive." },
      { industry: "Law firms", text: "A brand and profile that signal experience and discretion." },
      { industry: "Gyms", text: "An energetic brand that carries from social media to the studio wall." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI-Powered Automation",
    short: "Automated booking, reminders and follow-ups that save hours every week.",
    intro:
      "Missed calls, no-shows and forgotten follow-ups quietly cost you business. We set up AI appointment booking and automation that answers common questions, books appointments, sends reminders and follows up with clients automatically, day and night.",
    deliverables: [
      "AI appointment booking that works around the clock",
      "Automatic reminders to reduce no-shows",
      "Follow-ups after visits, consultations or trial classes",
      "Chat assistants that answer common questions on your website",
    ],
    idealFor: "Busy front desks and small teams spending hours on phone calls, messages and reminders.",
    industryUses: [
      { industry: "Dental & medical clinics", text: "Reminders and rebooking that keep the appointment book full." },
      { industry: "Law firms", text: "Instant enquiry responses and consultation scheduling." },
      { industry: "Gyms", text: "Automatic follow-ups that turn trial visitors into members." },
    ],
  },
  {
    slug: "crm-management-systems",
    title: "CRM & Management Systems",
    short: "One place to manage patients, clients, members, appointments and records.",
    intro:
      "Paper files, spreadsheets and scattered messages slow everyone down. We build management systems shaped around how you work, so appointments, records, payments and communication live in one organised place.",
    deliverables: [
      "Patient, client or member records in one secure place",
      "Appointment calendars and staff schedules",
      "Billing, invoicing and payment tracking",
      "Reports that show how your business is performing",
    ],
    idealFor: "Growing businesses that have outgrown paperwork, spreadsheets or generic tools.",
    industryUses: [
      { industry: "Hospitals & clinics", text: "Clinic management software and hospital CRM for patients, appointments and records." },
      { industry: "Pharmacies", text: "Pharmacy software for stock, orders and customer records." },
      { industry: "Law firms", text: "A law firm CRM for cases, clients, deadlines and documents." },
    ],
  },
];
