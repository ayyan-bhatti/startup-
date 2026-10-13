import Link from "next/link";
import { siteConfig } from "@/config/site";
import { otherProjects, services } from "@/content/services";
import { industryExamples } from "@/content/industries";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { SectionIndex } from "@/components/SectionIndex";
import { absoluteUrl, breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website, app and custom software development services",
  description:
    "Websites, 3D and interactive websites, mobile apps, custom software, AI automation, SEO and branding. What each service includes, who it suits, and examples of projects across industries. Clients worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  const provider = { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: siteConfig.url };
  const jsonLd = [
    ...services.map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl("/services")}#${s.slug}`,
      name: s.title,
      serviceType: s.title,
      description: `${s.short} ${s.intro}`,
      url: `${absoluteUrl("/services")}#${s.slug}`,
      provider,
      areaServed: "Worldwide",
    })),
    breadcrumbJsonLd([{ name: "Services", path: "/services" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageIntro
        crumb="Services"
        title="Website, app and custom software development services"
        lead="Each service below lists what is included and the kind of situation it suits. If you are not sure which one you need, describe the problem and we will suggest a starting point."
      />

      <div className="container-page grid grid-cols-1 gap-12 py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:py-16">
        <nav aria-label="Services on this page" className="no-print lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-ink">On this page</p>
          <SectionIndex
            items={[
              ...services.map((s) => ({ id: s.slug, label: s.title })),
              { id: otherProjects.slug, label: otherProjects.title },
              { id: "industries", label: "Examples by industry" },
            ]}
          />
        </nav>

        <div className="min-w-0 divide-y divide-line">
          {services.map((s) => (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-heading`} className="py-10 first:pt-0">
              <h2 id={`${s.slug}-heading`} className="text-2xl">{s.title}</h2>
              <p className="mt-3 text-lg leading-8 text-ink">{s.short}</p>
              <p className="mt-3 max-w-3xl">{s.intro}</p>
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <div className="min-w-0">
                  <h3 className="text-base">What is included</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-accent">
                    {s.deliverables.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base">A good fit if</h3>
                  <p className="mt-2">{s.goodFit}</p>
                </div>
              </div>
            </section>
          ))}

          <section id={otherProjects.slug} aria-labelledby="other-heading" className="py-10">
            <h2 id="other-heading" className="text-2xl">{otherProjects.title}</h2>
            <p className="mt-3 max-w-3xl">{otherProjects.text}</p>
          </section>

          <section id="industries" aria-labelledby="industries-heading" className="py-10">
            <h2 id="industries-heading" className="text-2xl">Examples by industry</h2>
            <p className="mt-3 max-w-3xl">
              The same services apply in very different fields. These are examples of projects we take on, not a list
              of the only industries we work in.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[20rem] border-collapse text-left">
                <caption className="sr-only">Example projects by industry</caption>
                <thead>
                  <tr className="border-b-2 border-muted text-sm">
                    <th scope="col" className="py-2 pr-6 font-semibold text-ink">Industry</th>
                    <th scope="col" className="py-2 font-semibold text-ink">Typical projects</th>
                  </tr>
                </thead>
                <tbody>
                  {industryExamples.map((ind) => (
                    <tr key={ind.name} className="border-b border-line align-top">
                      <th scope="row" className="py-3 pr-6 font-semibold text-ink sm:w-64">{ind.name}</th>
                      <td className="py-3">{ind.work}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6">
              If your industry is not listed, <Link href="/contact" className="link">tell us about your project</Link> and we will
              explain how we would approach it.
            </p>
          </section>
        </div>
      </div>

      <CtaSection
        title="Not sure which service you need"
        text="Describe what you want to achieve in a few sentences. We will suggest where to start, even if the answer is a smaller project than you expected."
      />
    </>
  );
}
