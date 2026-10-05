import Link from "next/link";
import { RollText } from "@/components/layout/roll-text";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { services } from "@/data/services";

export function ServicesList() {
  return (
    <section data-header-light className="bg-offwhite px-6 py-24 text-charcoal md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-headline max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
          One team for the site, and for getting it found.
        </h2>

        <ul className="mt-14 border-b border-charcoal/15 md:mt-20">
          {services.map(({ id, name, summary }) => (
            <li key={id} className="border-t border-charcoal/15">
              <Link
                href="/services"
                className="group grid items-center gap-x-10 gap-y-3 py-8 md:grid-cols-12 md:py-10"
              >
                <span className="font-headline text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl md:col-span-6">
                  <RollText text={name} />
                </span>
                <span className="max-w-md text-base leading-relaxed text-charcoal/75 sm:text-lg md:col-span-5">
                  {summary}
                </span>
                <ArrowUpRight className="hidden size-6 justify-self-end transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:col-span-1 md:block" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          className="mt-12 inline-block font-medium underline decoration-charcoal/30 underline-offset-[6px] transition-colors hover:decoration-charcoal"
        >
          See what each one includes
        </Link>
      </div>
    </section>
  );
}
