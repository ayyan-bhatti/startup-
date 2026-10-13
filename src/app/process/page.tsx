import Link from "next/link";
import { processQuestions, processSteps } from "@/content/process";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our software development process",
  description:
    "How a project with us runs, step by step: Discovery, Design, Development, Testing, Launch and Support. What we do, what we need from you and what you get at each stage.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Process", path: "/process" }])} />
      <PageIntro
        crumb="Process"
        title="Our software development process"
        lead="Every project follows the same six steps, whether it is a small website or a large system. For each step you can see what we do, what we need from you, and what you have at the end."
      />

      <section aria-label="The six steps" className="py-12 sm:py-16">
        <div className="container-page grid grid-cols-1 gap-10 max-w-4xl">
          <ol id="process-steps" className="min-w-0">
            {processSteps.map((step, i) => (
              <li key={step.title} className="border-b border-line py-8 first:pt-0">
                <p className="text-sm text-muted">Step {i + 1} of {processSteps.length}</p>
                <h2 className="mt-1 text-2xl">{step.title}</h2>
                <p className="mt-2 text-lg text-ink">{step.summary}</p>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-ink">What we do</dt>
                    <dd className="mt-1">{step.we}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-ink">What we need from you</dt>
                    <dd className="mt-1">{step.you}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-ink">What you get</dt>
                    <dd className="mt-1">{step.output}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="questions-heading" className="border-t border-line py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <h2 id="questions-heading" className="text-2xl">Common questions</h2>
          <dl className="max-w-3xl space-y-8">
            {processQuestions.map((item) => (
              <div key={item.q}>
                <dt className="text-lg font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2">{item.a}</dd>
              </div>
            ))}
            <div>
              <dt className="text-lg font-semibold text-ink">Which services does this apply to?</dt>
              <dd className="mt-2">
                All of them. <Link href="/services" className="link">See the full list of services</Link>.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaSection
        title="Book a Discovery call"
        text="Discovery is where we work out what to build and what it will cost. You are under no obligation to continue afterwards."
      />
    </>
  );
}
