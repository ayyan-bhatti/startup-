import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { industryExamples } from "@/content/industries";
import { processSteps } from "@/content/process";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { organizationId, organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    description: `${siteConfig.name} is a software development company. We build websites, mobile apps and custom software, and handle AI automation, SEO and branding for clients in any industry, worldwide.`,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Website, app and software development company` },
};

export default function HomePage() {
  const jsonLd = [
    organizationJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: { "@id": organizationId },
      inLanguage: "en",
    },
  ];

  const industryNames = industryExamples.map((i) => i.name.toLowerCase());

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-line">
        <div className="container-page py-16 sm:py-24">
          <h1 className="max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            We build websites, apps and software for businesses of any size, in any industry.
          </h1>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-end">
            <p className="max-w-2xl text-lg leading-8">
              Some clients come to us with an idea and nothing else. Others have a business that has outgrown its
              website or its spreadsheets. We plan the work with you, build it, launch it, and keep improving it
              afterwards. We work remotely, with clients in any country.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={siteConfig.cta.href} className="btn-primary">{siteConfig.cta.label}</Link>
              <Link href="/services" className="btn-secondary">See our services</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <h2 id="services-heading" className="text-2xl">What we do</h2>
            <p className="mt-3">
              Six services cover most projects. Many clients use two or three together, for example a website with SEO,
              or an app with the system behind it.
            </p>
            <p className="mt-3">
              <Link href="/services#other-projects" className="link">Projects outside these six</Link>
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {services.map((s) => (
              <div key={s.slug} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                <dt>
                  <Link href={`/services#${s.slug}`} className="link">{s.title}</Link>
                </dt>
                <dd>{s.short}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="clients-heading" className="bg-surface py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          <h2 id="clients-heading" className="text-2xl">Who we work with</h2>
          <p className="mt-4 text-lg leading-8">
            Our clients range from people starting their first business to large organisations replacing old systems.
            They work in {industryNames.slice(0, -1).join(", ")} and {industryNames.at(-1)}, and in many fields not on
            that list. What they share is the need to be found online, to look credible, and to spend less time on
            repetitive work.
          </p>
          <p className="mt-4">
            <Link href="/services#industries" className="link">Examples of projects by industry</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="py-16 sm:py-20">
        <div className="container-page">
          <h2 id="process-heading" className="text-2xl">How a project runs</h2>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, i) => (
              <li key={step.title} className="min-w-0 border-t-2 border-ink pt-3">
                <p className="text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg">{step.title}</h3>
                <p className="mt-1 text-sm">{step.summary}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            Every project starts with Discovery and a written proposal, so you know the scope and cost before any work
            begins. <Link href="/process" className="link">Read the full process</Link>
          </p>
        </div>
      </section>

      <CtaSection
        title="Tell us what you want to build"
        text={`Send a short description of your project. We reply within ${siteConfig.replyTime} with questions, first thoughts, and a time for a call.`}
      />
    </>
  );
}
