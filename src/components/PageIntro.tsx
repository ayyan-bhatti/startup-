import Link from "next/link";

/** Top of every inner page: a breadcrumb badge, the page's only H1 and one lead paragraph, centred on the desk. */
export function PageIntro({ crumb, title, lead }: { crumb: string; title: string; lead: string }) {
  return (
    <section className="desk-dots px-5 pb-14 pt-12 sm:pb-20 sm:pt-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <nav aria-label="Breadcrumb" className="no-print">
          <ol className="badge gap-1.5 normal-case">
            <li><Link href="/" className="hover:text-black">home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-black">{crumb.toLowerCase()}</li>
          </ol>
        </nav>
        <h1 className="mt-5 text-[34px] leading-[1.2] tracking-[-1.02px] lg:text-[56px] lg:tracking-[-1.68px]">{title}</h1>
        <p className="max-w-[600px] text-[16px] leading-normal tracking-[-0.48px] text-black/60 lg:text-[18px] lg:tracking-[-0.54px]">{lead}</p>
      </div>
    </section>
  );
}
