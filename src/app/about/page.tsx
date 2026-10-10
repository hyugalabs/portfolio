import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Blobatar } from "@blobatar/react";
import "blobatar/motion.css";
import { BuildTrack } from "@/components/about/build-track";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { team } from "@/data/team";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Hyuga Labs is a small remote team building custom websites for small businesses. Here's how we build, start to finish, shown on the live sites we've made.",
  path: "/about",
});

const strong = "text-offwhite";

function MemberLink({ name, href, className }: { name: string; href: string; className: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 font-headline font-semibold tracking-[-0.02em] transition-colors hover:text-coral ${className}`}
    >
      {name}
      <ArrowUpRight className="size-4 shrink-0 text-offwhite/50 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Role({ role }: { role: string }) {
  return (
    <span className="mt-0.5 flex items-center gap-1.5 text-sm text-offwhite/60">
      <span aria-hidden className="size-1.5 rounded-full bg-teal" />
      {role}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      <section className="mx-auto w-full max-w-7xl px-4 pt-32 sm:px-6 lg:pt-28">
        <div className="grid gap-6 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <h1 className="text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:col-span-8 lg:text-8xl">
            How we <span className="font-accent font-extrabold text-coral">build,</span> start to finish
          </h1>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-lg leading-relaxed text-offwhite/70">
              Hyuga Labs is a small remote team that designs and builds custom websites for small businesses, with SEO and
              social content from the same people.
            </p>
            <p className="mt-4 text-sm text-offwhite/55">Here&rsquo;s how a site goes from first message to launch, on sites we&rsquo;ve built.</p>
          </div>
        </div>
        <h2 className="sr-only">How we build</h2>
        <BuildTrack />
      </section>

      <section className="mx-auto mt-32 w-full max-w-7xl px-4 sm:px-6 lg:mt-44">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="text-balance font-headline text-4xl font-bold leading-[1] tracking-[-0.03em] sm:text-6xl lg:col-span-7">
            The people you&rsquo;ll talk to
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-offwhite/70 lg:col-span-5 lg:pb-1">
            The same people answer your first email, build your site and launch it with you.
          </p>
        </div>
        {/* Portrait cards once every photo is in; until then a compact row, so empty frames don't fill the screen. */}
        {team.every((m) => m.photo) ? (
          <ul className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-8">
            {team.map((member, i) => (
              <li key={i} className="w-[70vw] shrink-0 snap-start sm:w-auto">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-charcoal-raised ring-1 ring-offwhite/10">
                  <Image
                    src={member.photo!}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 640px) 31vw, 70vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4">
                  <MemberLink name={member.name} href={member.href} className="text-lg sm:text-xl" />
                </p>
                <Role role={member.role} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid border-t border-offwhite/10 sm:grid-cols-3 sm:gap-x-8 sm:border-t-0">
            {team.map((member, i) => (
              <li key={i} className="flex items-center gap-5 border-b border-offwhite/10 py-5 sm:border-b-0 sm:border-t sm:py-7">
                <Blobatar
                  name={member.name}
                  animate="hover"
                  traits={{ shape: 0.11 }} /* always the round silhouette */
                  aria-hidden
                  className="size-16 shrink-0 sm:size-20"
                />
                <span>
                  <MemberLink name={member.name} href={member.href} className="text-lg sm:text-xl" />
                  <Role role={member.role} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto mt-32 w-full max-w-7xl px-4 sm:px-6 lg:mt-44">
        <h2 className="sr-only">Where we work</h2>
        <p className="max-w-5xl text-pretty font-headline text-3xl font-medium leading-[1.2] tracking-[-0.025em] text-offwhite/50 sm:text-4xl lg:text-5xl">
          We&rsquo;re <span className={strong}>a remote team</span>, working with small businesses{" "}
          <span className={strong}>wherever they are</span>. So far that&rsquo;s meant{" "}
          <span className={strong}>cleaning companies in Ohio and New York</span> and{" "}
          <span className={strong}>one community project</span>, and{" "}
          <Link href="/components" className="text-offwhite underline decoration-coral decoration-2 underline-offset-[0.18em] transition-colors hover:text-coral">
            you can see every one of them
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto mt-32 grid w-full max-w-7xl gap-10 px-4 pb-28 sm:px-6 lg:mt-44 lg:grid-cols-12 lg:items-end">
        <h2 className="text-balance font-headline text-5xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:col-span-7">
          Want to see how we&rsquo;d build <span className="font-accent font-extrabold text-coral">yours?</span>
        </h2>
        <div className="lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-lg leading-relaxed text-offwhite/70">
            Tell us how customers reach you today, and we&rsquo;ll start from there, the same way every site above did.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
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
