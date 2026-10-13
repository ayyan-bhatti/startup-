import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/desktop/Reveal";
import { Faq } from "@/components/home/Faq";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ProcessSky } from "@/components/home/ProcessSky";
import { StudioNotes } from "@/components/home/StudioNotes";
import { organizationId, organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    description: `${siteConfig.name} is a software development company. We build websites, 3D and interactive websites, mobile apps and custom software, and handle AI automation, SEO and branding for clients in any industry, worldwide.`,
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

  return (
    <div className="canvas">
      <JsonLd data={jsonLd} />
      <Hero />
      <Features />
      <StudioNotes />
      <HowWeWork />
      <ProcessSky />
      <Faq />

      <section id="contact" aria-labelledby="contact-heading" className="px-5 pb-24 pt-10 lg:pb-32">
        <div className="mx-auto max-w-[1090px] border-t-2 border-dotted border-black/10 pt-[61px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="badge">contact</span>
            <h2 id="contact-heading" className="mt-6 text-[34px] leading-[1.2] tracking-[-1.02px] lg:text-[56px] lg:tracking-[-1.68px]">
              start a project
            </h2>
            <p className="max-w-[520px] text-[16px] tracking-[-0.48px] lg:text-[18px] lg:tracking-[-0.54px]">
              a few sentences is enough. we reply within {siteConfig.replyTime} with questions, first thoughts and a time for a
              call.
            </p>
          </div>
          <Reveal className="mx-auto mt-12 max-w-[834px]">
            <ContactForm headingLevel="h3" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
