import Link from "next/link";

/** Top of every inner page: breadcrumb, the page's only H1, and one lead paragraph. */
export function PageIntro({ crumb, title, lead }: { crumb: string; title: string; lead: string }) {
  return (
    <section className="border-b border-line pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="no-print">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-ink hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{crumb}</li>
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8">{lead}</p>
      </div>
    </section>
  );
}
