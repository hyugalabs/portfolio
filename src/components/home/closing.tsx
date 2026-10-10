import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { team } from "@/data/team";

const names = team.map((m) => m.name);

export function Closing() {
  return (
    <section className="bg-charcoal-raised px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-headline max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
          Tell us what your business needs.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-offwhite/75">
          You&rsquo;ll talk to the people who build it: {names.slice(0, -1).join(", ")} and {names.at(-1)}.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-coral px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
          >
            Start a conversation
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium underline decoration-offwhite/30 underline-offset-[6px] transition-colors hover:decoration-coral"
          >
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-medium tabular-nums underline decoration-offwhite/30 underline-offset-[6px] transition-colors hover:decoration-coral"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
