import Link from "next/link";
import { locationLabel, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl, breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services & Industries: Websites, Apps, SEO & CRM",
  description:
    "Websites, iOS and Android apps, SEO, branding, AI appointment booking and CRM systems for hospitals, dental and medical clinics, pharmacies, law firms and gyms.",
  path: "/services",
});

const serviceTitle = (slug: string) => services.find((s) => s.slug === slug)?.title ?? slug;

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 flex-none text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function ServicesPage() {
  const jsonLd = [
    ...services.map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl("/services")}#${s.slug}`,
      name: s.title,
      serviceType: s.title,
      description: s.intro,
      url: `${absoluteUrl("/services")}#${s.slug}`,
      provider: { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: siteConfig.url },
      areaServed: { "@type": "City", name: siteConfig.location.city },
      audience: industries.map((i) => ({ "@type": "BusinessAudience", name: i.name })),
    })),
    breadcrumbJsonLd([{ name: "Services", path: "/services" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        crumb="Services"
        eyebrow="Services & industries"
        title="Digital solutions for healthcare, legal and fitness businesses"
        intro={`From your first website to AI appointment booking and clinic management software, we help businesses in ${locationLabel} and beyond attract more patients, clients and members.`}
      />

      <nav aria-label="On this page" className="border-b border-slate-200 bg-slate-50">
        <ul className="container-page flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="font-medium text-slate-700 hover:text-accent">{s.title}</a>
            </li>
          ))}
          <li><a href="#industries" className="font-semibold text-accent">Industries we serve</a></li>
        </ul>
      </nav>

      <div className="container-page divide-y divide-slate-200">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-heading`} className="grid gap-8 py-16 lg:grid-cols-2">
            <div>
              <h2 id={`${s.slug}-heading`} className="text-2xl font-bold sm:text-3xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-8">{s.intro}</p>
              <div className="mt-6 rounded-lg bg-accent-soft p-5">
                <h3 className="font-semibold">Who it&apos;s for</h3>
                <p className="mt-2">{s.idealFor}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold">What you get</h3>
                <ul className="mt-3 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3"><Check /><span>{d}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">How it helps your industry</h3>
                <dl className="mt-3 space-y-3">
                  {s.industryUses.map((u) => (
                    <div key={u.industry}>
                      <dt className="font-medium text-slate-900">{u.industry}</dt>
                      <dd className="text-sm leading-6">{u.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section id="industries" aria-labelledby="industries-heading" className="bg-slate-50 py-20">
        <div className="container-page">
          <p className="eyebrow">Industries we serve</p>
          <h2 id="industries-heading" className="mt-2 text-3xl font-bold sm:text-4xl">Common problems we solve, by industry</h2>
          <p className="mt-4 max-w-2xl text-lg">
            Missed appointments, no online presence, manual paperwork, poor Google visibility and slow follow-ups. Here is
            how we fix them for each type of business.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {industries.map((ind) => (
              <article key={ind.slug} id={ind.slug} aria-labelledby={`${ind.slug}-heading`} className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                <h3 id={`${ind.slug}-heading`} className="text-xl font-bold">{ind.name}</h3>
                <p className="mt-1 text-sm">{ind.short}</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">The problem</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                      {ind.problems.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-accent">How we solve it</h4>
                    <ul className="mt-2 space-y-1 text-sm leading-6">
                      {ind.solutions.map((p) => <li key={p} className="flex gap-2"><Check /><span>{p}</span></li>)}
                    </ul>
                  </div>
                </div>
                <p className="mt-5 text-sm">
                  Related:{" "}
                  {ind.services.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 && ", "}
                      <a href={`#${slug}`} className="font-medium text-accent hover:underline">{serviceTitle(slug)}</a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10">
            Run a different kind of local service business?{" "}
            <Link href="/contact" className="font-semibold text-accent hover:underline">Tell us about it</Link>, or read{" "}
            <Link href="/about" className="font-semibold text-accent hover:underline">why we specialise in these industries</Link>.
          </p>
        </div>
      </section>

      <CtaSection title="Not sure where to start?" text="Tell us about your business and goals. We reply within 3 business days with honest advice on what will make the biggest difference." />
    </>
  );
}
