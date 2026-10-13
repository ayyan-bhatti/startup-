import Image from "next/image";
import Link from "next/link";
import { locationLabel, siteConfig } from "@/config/site";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us: Why We Focus on Healthcare, Legal & Fitness",
  description: `${siteConfig.name} helps clinics, hospitals, pharmacies, law firms and gyms start, launch and scale online. Learn our mission, values and why we specialise.`,
  path: "/about",
});

const focus = [
  {
    title: "Healthcare",
    text: "Hospitals, clinics and pharmacies lose time and revenue to missed appointments, phone queues and paperwork. Patients also choose providers online more than ever. Small improvements, like reminders or a clear booking page, make a real difference to both patients and staff.",
  },
  {
    title: "Legal",
    text: "People choose a law firm based on trust. A credible website, strong reviews and fast responses to enquiries often decide who gets the consultation. Behind the scenes, organised case and client management saves hours every week.",
  },
  {
    title: "Fitness",
    text: "Gyms and studios live on bookings and memberships. Easy class booking, timely follow-ups with trial visitors and a strong local brand help fill classes and keep members coming back.",
  },
];

const values = [
  { title: "Results over buzzwords", text: "We talk about patients, clients and bookings, not jargon. If something will not help your business grow, we will not suggest it." },
  { title: "Honesty first", text: "Realistic timelines, clear pricing and straight answers, even when the answer is “you don't need this yet”." },
  { title: "Quality in every detail", text: "From your logo to your booking flow, we care about getting the details right because your customers notice them." },
  { title: "Long-term partnership", text: "We stay with you after launch to keep improving, so your digital presence grows as your business does." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        crumb="About"
        eyebrow="About us"
        title="We help local businesses start, launch and scale online"
        intro={`We are a digital partner based in ${locationLabel}, working with healthcare, legal and fitness businesses that want more customers and less admin.`}
      />

      <section aria-labelledby="mission-heading" className="py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-heading" className="mt-2 text-3xl font-bold">Make growing online simple for every service business</h2>
            <p className="mt-5 text-lg leading-8">
              Many great clinics, firms and studios are hard to find online, or are held back by manual work. We exist to
              change that. We give them a credible presence, bring in more enquiries and take repetitive work off their
              plate, so they can focus on the people they serve.
            </p>
            <p className="mt-4 leading-7">
              See{" "}
              <Link href="/services" className="font-semibold text-accent hover:underline">the services we offer</Link>{" "}
              and{" "}
              <Link href="/services#industries" className="font-semibold text-accent hover:underline">the industries we help</Link>.
            </p>
          </div>
          <Image
            src="/hero-illustration.svg"
            alt="Illustration of a business website and booking app"
            width={560}
            height={420}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-md rounded-2xl bg-ink p-6"
          />
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="bg-slate-50 py-20">
        <div className="container-page">
          <p className="eyebrow">Our focus</p>
          <h2 id="focus-heading" className="mt-2 text-3xl font-bold">Why we focus on healthcare, legal and fitness</h2>
          <p className="mt-4 max-w-3xl text-lg">
            These businesses share the same challenges: they run on appointments, depend on trust and are often slowed
            down by manual processes. Focusing on them means we understand your customers and your day-to-day work from
            the first conversation.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {focus.map((f) => (
              <li key={f.title} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 leading-7">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="py-20">
        <div className="container-page">
          <p className="eyebrow">Our values</p>
          <h2 id="values-heading" className="mt-2 text-3xl font-bold">What we stand for</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.title}>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 leading-7">{v.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/process" className="mt-10 inline-block font-semibold text-accent hover:underline">
            See how we work, step by step <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CtaSection title="Let's grow your business together" />
    </>
  );
}
