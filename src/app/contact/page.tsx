import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us",
  description: `Start a project with ${siteConfig.name}. Tell us what you want to build and we reply within ${siteConfig.replyTime}. We work with clients worldwide.`,
  path: "/contact",
});

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${siteConfig.name}`,
      url: absoluteUrl("/contact"),
      mainEntity: {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        email: siteConfig.email,
        areaServed: "Worldwide",
      },
    },
    breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container-page grid grid-cols-1 gap-12 py-10 sm:py-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-4xl leading-tight sm:text-5xl">Start a project</h1>
          <p className="mt-4 max-w-xl text-lg leading-8">
            Tell us a little about your business and what you want to build. A few sentences is enough.
          </p>
          <ContactForm />
        </div>

        <aside aria-labelledby="next-heading" className="min-w-0 lg:pt-24">
          <h2 id="next-heading" className="text-lg">What happens next</h2>
          <ol className="mt-4 space-y-4">
            <li className="border-l-2 border-line pl-4">
              <p className="font-semibold text-ink">You get a confirmation email</p>
              <p className="mt-1 text-sm">Straight away, with a copy of what you sent.</p>
            </li>
            <li className="border-l-2 border-line pl-4">
              <p className="font-semibold text-ink">We reply within {siteConfig.replyTime}</p>
              <p className="mt-1 text-sm">With questions, first thoughts, and suggested times for a call in your time zone.</p>
            </li>
            <li className="border-l-2 border-line pl-4">
              <p className="font-semibold text-ink">Discovery and a proposal</p>
              <p className="mt-1 text-sm">If we are a good fit, we agree the scope and send a written proposal with timeline and cost.</p>
            </li>
          </ol>
          <h2 className="mt-10 text-lg">Prefer to email</h2>
          <p className="mt-2">
            Write to <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>. You will get the same
            reply time.
          </p>
        </aside>
      </div>
    </>
  );
}
