import Link from "next/link";
import { siteConfig } from "@/config/site";

/** The single closing call to action used at the end of each page. */
export function CtaSection({ title, text }: { title: string; text: string }) {
  return (
    <section aria-labelledby="cta-heading" className="no-print border-t border-line bg-surface py-16">
      <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="min-w-0 max-w-2xl">
          <h2 id="cta-heading" className="text-2xl">{title}</h2>
          <p className="mt-3">{text}</p>
        </div>
        <Link href={siteConfig.cta.href} className="btn-primary justify-self-start">
          {siteConfig.cta.label}
        </Link>
      </div>
    </section>
  );
}
