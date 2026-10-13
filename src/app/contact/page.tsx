import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl, breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us: Start Growing Your Business Online",
  description: `Tell us about your business. ${siteConfig.name} replies to every enquiry within 3 business days with advice on websites, apps, SEO and automation for your business.`,
  path: "/contact",
});

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${siteConfig.name}`,
      url: absoluteUrl("/contact"),
      about: { "@type": "Organization", "@id": organizationId, name: siteConfig.name, email: siteConfig.email },
      mainEntity: {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        email: siteConfig.email,
        address: { "@type": "PostalAddress", addressLocality: siteConfig.location.city, addressCountry: siteConfig.location.countryCode },
      },
    },
    breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Let's talk about your business"
        intro="Share a few details and we will get back to you within 3 business days with ideas and next steps."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Tell us about your business</h2>
            <p className="mt-2 text-sm">Fields marked * are required.</p>
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold">Prefer email?</h2>
              <p className="mt-2">
                Write to us at{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">{siteConfig.email}</a>.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>We review your message and reply within 3 business days.</li>
                <li>We schedule a short call to understand your goals.</li>
                <li>We send a clear proposal with what we recommend, timeline and cost.</li>
              </ol>
              <p className="mt-4 text-sm">
                Curious about the details?{" "}
                <Link href="/process" className="font-semibold text-accent hover:underline">See how we work</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
