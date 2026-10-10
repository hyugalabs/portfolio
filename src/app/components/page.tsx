import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteCard } from "@/components/sites/site-card";
import { sites } from "@/data/sites";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "Live websites Hyuga Labs designed and built for small businesses: booking, quote forms, click-to-call and more.",
  path: "/components",
});

export default function ComponentsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
      <header className="grid grid-cols-1 gap-6 border-b border-offwhite/10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-20">
        <h1 className="font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:col-span-8 lg:text-8xl">
          Sites we&rsquo;ve{" "}
          <span className="font-accent font-extrabold text-coral">built.</span>
        </h1>
        <div className="lg:col-span-4 lg:pb-3">
          <p className="max-w-sm text-lg leading-relaxed text-offwhite/70">
            Live sites we designed and built. Find the one closest to what you
            need, and we&rsquo;ll shape it around your business.
          </p>
          <p className="mt-4 text-sm tabular-nums text-offwhite/50">
            {sites.length} live sites
          </p>
        </div>
      </header>
      <ul className="divide-y divide-offwhite/10">
        {sites.map((site, i) => (
          <SiteCard key={site.name} {...site} flip={i % 2 === 1} preload={i === 0} />
        ))}
      </ul>
    </main>
  );
}
