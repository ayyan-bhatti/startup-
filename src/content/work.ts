/**
 * Projects shown in the Work section on the home page.
 *
 * Only add real projects, with the client's permission. Never add invented clients, results or numbers.
 * Each entry renders as a row in the Work window; the fields marked optional appear only when present.
 */
export type WorkItem = {
  slug: string;
  name: string;
  /** Which service it belongs to, using the exact service names from docs/style-guide.md. */
  category: string;
  technologies: string[];
  overview: string;
  status: string;
  /** Optional: live site or case study. */
  url?: string;
  /** Optional: screenshot in /public, with alt text describing what it shows. */
  image?: { src: string; alt: string; width: number; height: number };
};

export const work: WorkItem[] = [
  {
    slug: "core-website",
    name: "This website",
    category: "3D and interactive websites",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Resend"],
    overview:
      "Our own site, built as a desktop you can use: windows that open, stack and move, a working demo for every service, and a contact form that sends a confirmation email. Every page is server-rendered, so the words load first and search engines can read them.",
    status: "Live. You are using it.",
    url: "/",
  },
];
