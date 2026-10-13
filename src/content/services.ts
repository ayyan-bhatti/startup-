export type Service = {
  slug: string;
  title: string;
  /** One sentence, used on Home and in the footer-level summary. */
  short: string;
  intro: string;
  deliverables: string[];
  goodFit: string;
};

/** Service names must match docs/style-guide.md exactly. */
export const services: Service[] = [
  {
    slug: "websites",
    title: "Websites",
    short: "Company sites, online stores and web platforms that explain what you do and make it easy to buy, book or get in touch.",
    intro:
      "We plan, write, design and build the site, then set it up so your team can edit it. A small company site usually needs a handful of pages. An online store or a platform with accounts needs more planning, and we scope that with you in Discovery.",
    deliverables: [
      "Page structure and copy based on what your customers need to know",
      "Design for phones first, then larger screens",
      "Contact forms, booking or checkout, connected to the tools you already use",
      "Search-friendly setup: page titles, descriptions, sitemap and fast loading",
      "A short handover so your team can update pages and content",
    ],
    goodFit: "You have no site, or your current site is out of date, slow, or does not bring in enquiries.",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    short: "iPhone and Android apps for your customers or your staff, from the first screen design to the app store listing.",
    intro:
      "Apps make sense when people use your service again and again: booking, ordering, tracking, learning or checking an account. We design the screens, build the app and the system behind it, and publish it to the App Store and Google Play under your account.",
    deliverables: [
      "Screen designs you can click through before anything is built",
      "One app for iPhone and Android",
      "Accounts, payments, notifications and messaging where you need them",
      "An admin area to manage content, orders or users",
      "App Store and Google Play submission",
    ],
    goodFit: "Your customers come back regularly, or your staff work away from a desk.",
  },
  {
    slug: "custom-software",
    title: "Custom software",
    short: "Systems built around how your business works: client records, bookings, stock, reports, portals and full software products.",
    intro:
      "When spreadsheets, paper and a mix of tools start slowing your team down, a system built for your process can replace them. We map how work moves through your business today, then build software that fits it, and connect it to the tools you want to keep.",
    deliverables: [
      "A written map of your current process and what the system will change",
      "Client, booking, order or stock management",
      "Client portals and staff dashboards",
      "Connections to your accounting, email, payment or calendar tools",
      "Importing your existing data",
    ],
    goodFit: "Your team spends hours each week copying data between tools, or you are building a software product of your own.",
  },
  {
    slug: "ai-automation",
    title: "AI automation",
    short: "Assistants and automated steps that answer common questions, book appointments, send reminders and follow up, at any hour.",
    intro:
      "Most businesses repeat the same tasks every day: answering the same questions, chasing replies, copying details from emails into a system. We find the tasks that are safe to automate, set them up, and keep a person in the loop where judgement matters.",
    deliverables: [
      "A chat assistant on your website that answers from your own information",
      "Automatic booking confirmations, reminders and follow-ups",
      "Reading documents and emails and filing the details in the right place",
      "Clear logs so you can see what was automated and when",
    ],
    goodFit: "Your team answers the same questions all day, or enquiries wait hours for a reply.",
  },
  {
    slug: "seo",
    title: "SEO",
    short: "Work that helps people find you on Google when they search for what you offer, in the markets you choose.",
    intro:
      "We start by finding the searches that lead to paying customers, then fix what stops your site from ranking for them: technical problems, missing pages and thin content. Each month you get a plain report of what changed and what it led to.",
    deliverables: [
      "Research into the searches that matter for your business",
      "Technical fixes: speed, structure, indexing and structured data",
      "New and improved pages that answer your customers' questions",
      "Business profile and listing setup where it applies",
      "A monthly report on visits, rankings and enquiries",
    ],
    goodFit: "Your site gets few visitors from search, or most of your work comes from referrals and paid ads.",
  },
  {
    slug: "branding",
    title: "Branding",
    short: "A name, logo and visual identity that look right on a website, a shop front, a business card and a review page.",
    intro:
      "People judge a business by how it looks before they read a word. We create or refresh your logo, colours and type, write simple rules for using them, and apply them to the places your customers actually see you, online and in print.",
    deliverables: [
      "Logo, colours and typography",
      "A short brand guide your team and suppliers can follow",
      "Social profile, email signature and presentation templates",
      "Print files for cards, signage, packaging and brochures",
      "Setting up and tidying your online profiles and reviews",
    ],
    goodFit: "You are starting out, or your current look no longer matches the quality of your work.",
  },
];

export const otherProjects = {
  slug: "other-projects",
  title: "Other projects",
  text: "The six services above are what clients ask for most, not the full list. We also take on integrations between systems, marketplaces, internal tools, data dashboards, migrations from old systems and projects that combine several services. If your project is not described here, tell us about it and we will say honestly whether we are the right team for it.",
};
