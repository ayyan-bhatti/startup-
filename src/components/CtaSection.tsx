import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WindowFrame } from "./desktop/Window";
import { MailGlyph } from "./desktop/Icons";

/** The single closing call to action used at the end of each page, drawn as a small dialog window. */
export function CtaSection({ title, text }: { title: string; text: string }) {
  return (
    <section aria-labelledby="cta-heading" className="no-print desk-dots border-t border-frame/50 py-16 sm:py-20">
      <div className="container-page">
        <WindowFrame title="New enquiry" icon={<MailGlyph className="h-3.5 w-4.5" />} isStatic className="max-w-3xl">
          <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <h2 id="cta-heading" className="text-3xl">{title}</h2>
              <p className="mt-3">{text}</p>
            </div>
            <Link href={siteConfig.cta.href} className="btn-primary justify-self-start">
              {siteConfig.cta.label}
            </Link>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
