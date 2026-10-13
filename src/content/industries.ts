export type Industry = {
  slug: string;
  name: string;
  short: string;
  problems: string[];
  solutions: string[];
  services: string[]; // service slugs
};

export const industries: Industry[] = [
  {
    slug: "hospitals",
    name: "Hospitals",
    short: "Smoother patient journeys and less paperwork across departments.",
    problems: [
      "Long phone queues and manual appointment scheduling",
      "Patient records scattered across paper and spreadsheets",
      "Little visibility on Google for specific departments",
    ],
    solutions: [
      "A hospital CRM to manage patients, appointments and records",
      "Online booking and automated reminders for every department",
      "A clear website and local SEO for each specialty",
    ],
    services: ["crm-management-systems", "ai-automation", "websites"],
  },
  {
    slug: "pharmacies",
    name: "Pharmacies",
    short: "Get found nearby and keep regular customers coming back.",
    problems: [
      "Not showing up when people search for a pharmacy nearby",
      "Manual tracking of orders, refills and stock",
      "No easy way for customers to order ahead",
    ],
    solutions: [
      "Pharmacy software and a website built for local search",
      "Refill requests and order-ready notifications by app or message",
      "An optimised Google Business Profile with reviews",
    ],
    services: ["websites", "crm-management-systems", "digital-growth-seo"],
  },
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    short: "A fuller appointment book and fewer no-shows.",
    problems: [
      "Missed appointments and last-minute cancellations",
      "Weak Google visibility for high-value treatments",
      "Slow follow-ups for check-ups and treatment plans",
    ],
    solutions: [
      "A website for dental clinics with online booking",
      "AI appointment booking, reminders and recall messages",
      "SEO focused on the treatments patients search for",
    ],
    services: ["websites", "ai-automation", "digital-growth-seo"],
  },
  {
    slug: "medical-clinics",
    name: "Medical Clinics",
    short: "Less admin for staff, a better experience for patients.",
    problems: [
      "Front desk overwhelmed by calls and paperwork",
      "No online presence, or an outdated website",
      "Patients forgetting follow-up visits",
    ],
    solutions: [
      "Clinic management software for appointments and records",
      "Automated reminders and follow-ups",
      "A credible website and Google profile that build trust",
    ],
    services: ["crm-management-systems", "ai-automation", "brand-reputation"],
  },
  {
    slug: "healthcare-crm",
    name: "Healthcare CRM & Software Companies",
    short: "A partner to design, launch and grow healthcare products.",
    problems: [
      "Products that are hard for clinics and patients to use",
      "No clear online presence to win new healthcare clients",
      "Limited in-house capacity to ship new features",
    ],
    solutions: [
      "Product design and development for patient and staff apps",
      "A website and SEO that explain your product to buyers",
      "Automation features that clinics value",
    ],
    services: ["mobile-apps", "crm-management-systems", "digital-growth-seo"],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    short: "More consultations and organised case management.",
    problems: [
      "Enquiries left waiting for hours or days",
      "Case files, deadlines and client updates handled manually",
      "Hard to stand out from other firms on Google",
    ],
    solutions: [
      "Law firm website design that builds credibility",
      "A law firm CRM for cases, clients and deadlines",
      "Instant enquiry replies and consultation booking",
    ],
    services: ["websites", "crm-management-systems", "ai-automation"],
  },
  {
    slug: "gyms",
    name: "Gyms & Fitness Studios",
    short: "More members, fewer cancellations, less admin.",
    problems: [
      "Trial visitors who never become members",
      "Class bookings handled by phone and messages",
      "Members dropping off without anyone noticing",
    ],
    solutions: [
      "Gym app and website development for bookings and memberships",
      "Automated follow-ups for trials and inactive members",
      "A brand and local SEO that fill classes",
    ],
    services: ["mobile-apps", "ai-automation", "brand-reputation"],
  },
];
