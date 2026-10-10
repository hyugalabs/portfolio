import type { ReactNode } from "react";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="overflow-x-clip">
      <article className="mx-auto w-full max-w-3xl px-4 pb-28 pt-32 sm:px-6 lg:pt-28">
        <h1 className="text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl">
          {title}
          <span aria-hidden className="ml-[0.08em] inline-block size-[0.16em] rounded-full bg-coral" />
        </h1>
        <p className="mt-6 text-sm text-offwhite/60">Last updated {updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-offwhite/80">{intro}</p>
        {sections.map(({ heading, body }) => (
          <section key={heading} className="mt-12">
            <h2 className="font-headline text-2xl font-semibold tracking-[-0.02em]">{heading}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-offwhite/75 [&_a]:text-offwhite [&_a]:underline [&_a]:decoration-coral [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
              {body}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
