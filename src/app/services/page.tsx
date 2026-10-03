import type { Metadata } from "next";
import Link from "next/link";
import { ServiceBuilder } from "@/components/services/service-builder";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, online booking and quote forms, SEO and social content for small businesses, with the live sites where we've built each one.",
  alternates: { canonical: "/services" },
};

const strong = "text-offwhite";

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      <section className="mx-auto w-full max-w-7xl px-4 pt-32 sm:px-6 lg:pt-28">
        <div className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end lg:pb-10">
          <h1 className="text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:col-span-8 lg:text-8xl">
            What does your business <span className="font-accent font-extrabold text-coral">need?</span>
          </h1>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-lg leading-relaxed text-offwhite/70">
              Four things we do, often together. Open one to see what&rsquo;s included and the live sites where we&rsquo;ve
              already built it.
            </p>
            <p className="mt-4 text-sm text-offwhite/55">Add the ones that fit, and we&rsquo;ll start from there.</p>
          </div>
        </div>
        <ServiceBuilder />
      </section>

      <section className="mx-auto mt-32 w-full max-w-7xl px-4 sm:px-6 lg:mt-44">
        <h2 className="sr-only">What every site includes</h2>
        <p className="max-w-5xl text-pretty font-headline text-3xl font-medium leading-[1.2] tracking-[-0.025em] text-offwhite/50 sm:text-4xl lg:text-5xl">
          Every site we build is <span className={strong}>made for phones first</span>,{" "}
          <span className={strong}>loads fast</span>, puts <span className={strong}><span className="whitespace-nowrap">click-to-call</span> and your forms</span>{" "}
          where customers look, and has its <span className={strong}>search basics set up</span> before launch. You see it
          before anyone else does, and you talk to <span className={strong}>the people building it</span> the whole way.
        </p>
      </section>

      <section
        id="services-end"
        className="mx-auto mt-32 grid w-full max-w-7xl gap-10 px-4 pb-28 sm:px-6 lg:mt-44 lg:grid-cols-12 lg:items-end"
      >
        <h2 className="text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:col-span-7">
          Not sure where to <span className="font-accent font-extrabold text-coral">start?</span>
        </h2>
        <div className="lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-lg leading-relaxed text-offwhite/70">
            Tell us about your business and how customers reach you today. We&rsquo;ll suggest what&rsquo;s worth doing
            first.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact?need=Not+sure+yet"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-charcoal transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
            >
              Tell us about your business
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/components" className="font-medium text-offwhite underline decoration-coral underline-offset-4 hover:text-coral">
              See our work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
