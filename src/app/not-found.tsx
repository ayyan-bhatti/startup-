import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-page py-20 sm:py-28">
      <p className="text-sm text-muted">Error 404</p>
      <h1 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">This page does not exist</h1>
      <p className="mt-5 max-w-xl text-lg">
        The link may be out of date, or the address may have a typo. These pages should help:
      </p>
      <ul className="mt-6 space-y-2">
        <li><Link href="/" className="link">Home</Link></li>
        <li><Link href="/services" className="link">Services</Link></li>
        <li><Link href="/contact" className="link">Contact</Link></li>
      </ul>
    </section>
  );
}
