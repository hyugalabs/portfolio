import Link from "next/link";
import { buildStages } from "@/data/build-stages";

export function ProcessLine() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-headline max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
          From first message to launch, in four steps.
        </h2>

        <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {buildStages.map(({ id, short, title }) => (
            <li key={id} className="relative border-t border-offwhite/20 pt-6">
              <span aria-hidden className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-coral" />
              <h3 className="font-headline text-3xl font-semibold tracking-[-0.03em]">{short}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-offwhite/75">{title}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/about"
          className="mt-14 inline-block font-medium text-coral underline decoration-coral/40 underline-offset-[6px] transition-colors hover:decoration-coral"
        >
          See how we build
        </Link>
      </div>
    </section>
  );
}
