import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { GlobeHorizon } from "@/components/contact/globe-horizon";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Hyuga Labs about your business. We work remotely with small businesses anywhere on custom websites, SEO and social content.",
  path: "/contact",
});

const steps = [
  {
    title: "We read it and write back",
    body: "A real person replies by email, usually with a few questions about your business.",
  },
  {
    title: "A short call",
    body: "We talk through how you work today: how customers find you, book you and ask for quotes.",
  },
  {
    title: "A clear proposal",
    body: "Scope, timeline and price in writing, before any work starts.",
  },
  {
    title: "We build, you review",
    body: "You see the site take shape as we go, then we launch it together.",
  },
];

const faqs = [
  {
    q: "Do you work with businesses anywhere?",
    a: "Yes. We work remotely with small businesses wherever they are. Most of the sites we've built so far are for cleaning companies in Ohio and New York.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on what the site needs to do. A simple site and one with booking, quote forms or a CRM are different projects. You get a written price in the proposal before anything starts.",
  },
  {
    q: "How long does it take?",
    a: "That depends on scope too. The proposal includes a timeline, and you see progress along the way.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of your business and what you want the site to do. Logos, photos and existing copy help, but we can start with whatever you have.",
  },
];

const channel =
  "group flex items-center justify-between gap-4 border-b border-offwhite/10 py-5 transition-colors hover:text-coral";

export default function ContactPage() {
  return (
    <main className="overflow-x-clip pb-28">
      <section className="px-4 pt-32 text-center sm:px-6 lg:pt-40">
        <h1 className="mx-auto max-w-4xl text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
          Tell us about your <span className="font-accent font-extrabold text-coral">business.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-offwhite/75">
          What you do, who you serve, and what your site should handle. We&rsquo;ll take it from there.
        </p>
        <div className="mt-12">
          <GlobeHorizon />
        </div>
      </section>

      <section
        aria-label="Send us a message"
        className="relative z-10 mx-auto -mt-[24vw] grid w-full max-w-6xl gap-12 px-4 sm:px-6 md:-mt-[22rem] lg:grid-cols-[1fr_1.5fr] lg:gap-16"
      >
        <div className="order-2 lg:order-1 lg:self-end lg:pb-10">
          <h2 className="font-headline text-2xl font-semibold tracking-[-0.02em]">Rather talk directly?</h2>
          <p className="mt-3 max-w-sm leading-relaxed text-offwhite/70">
            Email or call, whichever is easier. You&rsquo;ll be talking to the people who build your site.
          </p>
          <ul className="mt-6 border-t border-offwhite/10">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={channel}>
                <span>
                  <span className="block text-sm text-offwhite/55 group-hover:text-coral/80">Email</span>
                  <span className="mt-1 block break-all font-headline text-lg font-medium sm:text-xl">{siteConfig.email}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className={channel}>
                <span>
                  <span className="block text-sm text-offwhite/55 group-hover:text-coral/80">Call</span>
                  <span className="mt-1 block font-headline text-lg font-medium tabular-nums sm:text-xl">{siteConfig.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {siteConfig.socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full px-4 py-2 text-sm text-offwhite/75 ring-1 ring-offwhite/15 transition-colors hover:text-offwhite hover:ring-coral/60"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 rounded-2xl bg-charcoal-raised p-6 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:p-10 lg:order-2">
          <h2 className="font-headline text-2xl font-semibold tracking-[-0.02em]">Send us a message</h2>
          <p className="mb-8 mt-2 text-offwhite/65">A few lines is plenty. We&rsquo;ll ask about the rest.</p>
          <ContactForm />
        </div>
      </section>

      <section className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-6 lg:mt-44">
        <h2 className="max-w-2xl text-balance font-headline text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
          What happens after you hit send
        </h2>
        <ol className="mt-12 grid gap-10 border-l border-offwhite/12 pl-6 md:grid-cols-4 md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-10">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[1.84rem] top-1.5 size-2.5 rounded-full md:-top-[2.84rem] md:left-0 ${i === 0 ? "bg-coral" : "bg-offwhite/35"}`}
              />
              <h3 className="font-headline text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-offwhite/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-32 grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:mt-44 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <h2 className="text-balance font-headline text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Questions people ask first
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-offwhite/70">
            Want to see the work before you write?{" "}
            <Link href="/components" className="text-offwhite underline decoration-coral underline-offset-4 hover:text-coral">
              Browse the sites we&rsquo;ve built
            </Link>
            .
          </p>
        </div>
        <div className="border-t border-offwhite/10">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-offwhite/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-headline text-lg font-medium transition-colors hover:text-coral sm:text-xl [&::-webkit-details-marker]:hidden">
                {q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="size-5 shrink-0 text-coral transition-transform duration-300 group-open:rotate-45">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-prose pb-6 leading-relaxed text-offwhite/75">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
