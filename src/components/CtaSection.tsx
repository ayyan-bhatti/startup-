import Link from "next/link";

export function CtaSection({
  title = "Ready to grow your business?",
  text = "Tell us about your business and goals. We reply to every enquiry within 3 business days with honest advice and clear next steps.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="bg-white py-20">
      <div className="container-page">
        <div className="rounded-2xl bg-ink px-6 py-14 text-center sm:px-12">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">{text}</p>
          <Link href="/contact" className="btn-primary mt-8">
            Contact us to get started
          </Link>
        </div>
      </div>
    </section>
  );
}
