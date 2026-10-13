import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description: `${siteConfig.name} builds websites, apps and software for clients in any industry, worldwide. How we work, what we commit to, and why we do not limit ourselves to one sector.`,
  path: "/about",
});

const commitments = [
  { term: "A reply", detail: `Every enquiry gets a reply from us within ${siteConfig.replyTime}, including the ones we turn down.` },
  { term: "A written proposal", detail: "Scope, timeline and cost are in writing before any work starts. If something changes, we tell you before it affects the cost." },
  { term: "Regular previews", detail: "You see working progress throughout the project, not only at the end." },
  { term: "One point of contact", detail: "You always know who to message, and you get an answer, not a ticket number." },
  { term: "Your ownership", detail: "Code, designs, content, domain and accounts are set up in your name. If you leave, you take everything with you." },
  { term: "Honest advice", detail: "If you do not need something yet, we say so, even when it means a smaller project for us." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageIntro
        crumb="About"
        title="About us"
        lead={`${siteConfig.name} is a software development company. We build websites, apps and custom software, and help clients get found, look credible and cut repetitive work.`}
      />

      <section aria-labelledby="believe-heading" className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 id="believe-heading" className="text-2xl">What we believe</h2>
          <div className="max-w-2xl space-y-4 text-lg leading-8">
            <p>
              Most businesses do not need more technology. They need fewer missed enquiries, fewer hours spent copying
              data from one place to another, and a website that answers questions before anyone has to pick up the phone.
            </p>
            <p>
              So we start with the problem, not the product. Sometimes the answer is a new app. Often it is a better
              website, a booking form and three automated emails.
            </p>
            <p>
              We work remotely with clients in any country, and we keep decisions and progress in writing so time zones
              never slow a project down.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="commitments-heading" className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <h2 id="commitments-heading" className="text-2xl">What you can expect from us</h2>
          <p className="mt-3 max-w-2xl">
            We do not show a team page or client logos yet. [PLACEHOLDER: add real case studies or reviews here once
            clients agree to be named.] Until then, these are the commitments we make on every project.
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {commitments.map((c) => (
              <div key={c.term} className="min-w-0 border-t border-line pt-4">
                <dt className="font-semibold text-ink">{c.term}</dt>
                <dd className="mt-1">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="breadth-heading" className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 id="breadth-heading" className="text-2xl">Why we work across industries</h2>
          <div className="max-w-2xl space-y-4">
            <p>
              A clinic booking patients, a gym booking classes and a law firm booking consultations face the same
              problem: people want to book without making a phone call. Working in many industries means we have
              usually solved a close version of your problem before, just in a different setting.
            </p>
            <p>
              It also means we ask questions someone inside your industry might skip, and those questions often lead to
              a simpler solution. Where your field has specific rules, such as data protection in healthcare or finance,
              we plan for them in Discovery and agree how they will be handled in the proposal.
            </p>
            <p>
              <Link href="/services#industries" className="link">See examples of projects by industry</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Start with a conversation"
        text={`Tell us about your business and what you want to change. We reply within ${siteConfig.replyTime}.`}
      />
    </>
  );
}
