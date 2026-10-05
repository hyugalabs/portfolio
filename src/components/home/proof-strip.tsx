import Link from "next/link";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { BrowserFrame } from "@/components/sites/browser-frame";
import { sites } from "@/data/sites";

/* Sparkle Clean is a concept redesign and Sparkle Clean NYC shows a placeholder number,
   so neither is used as proof here. `feature` is the one thing each site shows off. */
const picks = [
  { site: "SS Cleaning LLC", feature: "A work-order quote form" },
  { site: "Sarah Ross Office Cleaning", feature: "Call and text for a quote, first" },
  { site: "BiyerKahini", feature: "Live stats from community submissions" },
  { site: "Dry Masters Carpet Systems", feature: "Google reviews and a blog" },
];

const proof = picks.flatMap(({ site, feature }) => {
  const s = sites.find((x) => x.name === site);
  return s ? [{ ...s, feature }] : [];
});

export function ProofStrip() {
  return (
    <section className="px-6 pt-12 pb-28 md:px-12 md:pt-16 md:pb-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-headline max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            Real sites, doing real jobs.
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-offwhite/70">
            Each one is built around how that business actually gets its work.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 md:[&>li:nth-child(even)]:translate-y-20">
          {proof.map(({ name, image, href, feature }, i) => {
            const domain = new URL(href).hostname.replace(/^www\./, "");
            return (
              <li key={name} className="group relative">
                <BrowserFrame
                  name={name}
                  image={image}
                  domain={domain}
                  preload={i === 0}
                  sizes="(min-width: 1280px) 590px, (min-width: 768px) 46vw, 100vw"
                  className="shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:ring-coral/40 group-has-[a:focus-visible]:ring-2 group-has-[a:focus-visible]:ring-coral group-hover:shadow-[0_36px_80px_-24px_rgb(255_59_99/0.25)]"
                />
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-2xl font-semibold tracking-[-0.02em]">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {name}
                      </a>
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-offwhite/75">
                      <span className="size-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      {feature}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-coral transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 md:mt-32">
          <Link
            href="/components"
            className="font-medium text-coral underline decoration-coral/40 underline-offset-[6px] transition-colors hover:decoration-coral"
          >
            See all our work
          </Link>
        </div>
      </div>
    </section>
  );
}
