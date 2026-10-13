import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-ink py-28">
      <div className="container-page text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">404 error</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
          The link may be broken or the page may have moved. Here are some helpful places to continue:
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back to the homepage</Link>
          <Link href="/services" className="btn-secondary">View our services</Link>
          <Link href="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
