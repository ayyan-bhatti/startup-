"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page py-20 sm:py-28">
      <p className="text-sm text-muted">Something went wrong</p>
      <h1 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">This page could not be loaded</h1>
      <p className="mt-5 max-w-xl text-lg">
        An unexpected error stopped the page from loading. Trying again usually fixes it.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-secondary">Go to the home page</Link>
      </div>
    </section>
  );
}
