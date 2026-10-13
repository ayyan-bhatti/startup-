import Image from "next/image";
import Link from "next/link";
import { locationLabel, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { processSteps } from "@/content/process";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { organizationId, organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    description: `${siteConfig.name} helps healthcare, legal and fitness businesses start, launch and scale online with websites, apps, SEO, branding, AI appointment booking and management systems.`,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Digital Solutions for Clinics, Law Firms & Gyms` },
};

const reasons = [
  {
    title: "We focus on results",
    text: "More patients, more clients, more bookings and less manual work. That is how we measure every project.",
  },
  {
    title: "We know your industry",
    text: "We specialise in healthcare, legal and fitness businesses, so we already understand your customers and daily workflows.",
  },
  {
    title: "One partner for everything",
    text: "Website, app, Google visibility, brand and automation, handled together instead of by five different suppliers.",
  },
  {
    title: "Clear and honest",
    text: "Plain language, realistic timelines and transparent pricing. You always know what is happening and why.",
  },
];

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

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-ink">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">
              Digital solutions for healthcare, legal &amp; fitness
            </p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Start, launch and scale your business online
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Whether you are just getting started or ready to grow, we help clinics, hospitals, pharmacies, law firms
              and gyms win more patients, clients and members, with less time spent on paperwork and phone calls.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Start your project</Link>
              <Link href="/services" className="btn-secondary">See how we can help</Link>
            </div>
          </div>
          <Image
            src="/hero-illustration.svg"
            alt="Illustration of a business website and a booking app on a phone"
            width={560}
            height={420}
            priority
            className="mx-auto h-auto w-full max-w-lg"
          />
        </div>
      </section>

      <section aria-labelledby="stages-heading" className="border-b border-slate-200 py-16">
        <div className="container-page">
          <h2 id="stages-heading" className="sr-only">Where we help you</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            <li>
              <h3 className="text-xl font-bold">Start</h3>
              <p className="mt-2">No website or online presence yet? We give your business a credible, professional start online.</p>
            </li>
            <li>
              <h3 className="text-xl font-bold">Launch</h3>
              <p className="mt-2">Launching something new? We make sure it looks right, works smoothly and reaches the right people.</p>
            </li>
            <li>
              <h3 className="text-xl font-bold">Scale</h3>
              <p className="mt-2">Ready to grow? We bring in more enquiries and automate the work that slows your team down.</p>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="py-20 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Everything your business needs to grow online</h2>
          <p className="mt-4 max-w-2xl text-lg">
            Choose a single service or let us handle your whole digital presence, from first impression to day-to-day operations.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="flex flex-col rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6">{s.short}</p>
                <Link href={`/services#${s.slug}`} className="mt-5 text-sm font-semibold text-accent hover:text-accent-hover">
                  More about {s.title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="industries-heading" className="bg-slate-50 py-20 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">Who we help</p>
          <h2 id="industries-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Built for healthcare, legal and fitness businesses</h2>
          <p className="mt-4 max-w-2xl text-lg">
            We work with local service businesses in {locationLabel} and beyond, where every missed call or forgotten
            appointment is lost revenue.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <li key={ind.slug} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold">{ind.name}</h3>
                <p className="mt-2 text-sm leading-6">{ind.short}</p>
              </li>
            ))}
            <li className="flex flex-col justify-center rounded-xl border border-dashed border-slate-300 p-6">
              <h3 className="font-semibold">Similar local businesses</h3>
              <p className="mt-2 text-sm leading-6">Physiotherapy, beauty, accounting or another service business? We can help too.</p>
            </li>
          </ul>
          <Link href="/services#industries" className="mt-10 inline-block font-semibold text-accent hover:text-accent-hover">
            See how we solve the problems in your industry <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="py-20 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="mt-2 text-3xl font-bold sm:text-4xl">A clear path from first call to growth</h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-slate-200 p-6">
                <span className="text-sm font-bold text-accent">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6">{step.summary}</p>
              </li>
            ))}
          </ol>
          <Link href="/process" className="mt-10 inline-block font-semibold text-accent hover:text-accent-hover">
            See our full six-step process <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="bg-slate-50 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 id="why-heading" className="mt-2 text-3xl font-bold sm:text-4xl">A partner that cares about your growth</h2>
            <p className="mt-4">
              <Link href="/about" className="font-semibold text-accent underline-offset-4 hover:underline">
                Learn why we focus on healthcare, legal and fitness
              </Link>
              .
            </p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {reasons.map((r) => (
              <li key={r.title}>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-6">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection title="Ready to grow your business online?" />
    </>
  );
}
