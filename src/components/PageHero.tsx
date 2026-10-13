import Link from "next/link";

/** Hero for inner pages: visible breadcrumb + the page's single H1. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumb: string;
}) {
  return (
    <section className="bg-ink py-16 sm:py-24">
      <div className="container-page">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-200">{crumb}</li>
          </ol>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-accent-light">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{intro}</p>
      </div>
    </section>
  );
}
