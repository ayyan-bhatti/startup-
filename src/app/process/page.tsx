import Link from "next/link";
import { processSteps } from "@/content/process";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How We Work: From First Call to Growth",
  description:
    "Our six-step process for launching websites, apps, automation and clinic management software: Discovery, Design, Development, Testing, Launch and Support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Process", path: "/process" }])} />
      <PageHero
        crumb="Process"
        eyebrow="How we work"
        title="How we work: six clear steps to launch and grow"
        intro="A simple, transparent process that keeps you in control, from the first conversation to long after launch."
      />

      <section aria-label="Process steps" className="py-20">
        <ol className="container-page relative space-y-10">
          {processSteps.map((step, i) => (
            <li key={step.title} className="grid gap-4 rounded-xl border border-slate-200 p-6 sm:grid-cols-[4rem_1fr] sm:p-8">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h2>
                <p className="mt-1 font-medium text-slate-900">{step.summary}</p>
                <p className="mt-3 leading-7">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="container-page mt-12">
          The same steps apply to all of our{" "}
          <Link href="/services" className="font-semibold text-accent hover:underline">services for clinics, law firms and gyms</Link>.
        </p>
      </section>

      <CtaSection title="Ready for your discovery call?" />
    </>
  );
}
