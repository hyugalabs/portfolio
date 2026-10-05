import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { BrowserFrame } from "@/components/sites/browser-frame";
import type { Site } from "@/data/sites";

export function SiteCard({
  name,
  description,
  image,
  href,
  features,
  flip,
  preload,
}: Site & { flip?: boolean; preload?: boolean }) {
  const domain = new URL(href).hostname.replace(/^www\./, "");

  return (
    <li className="group relative grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
      {/* Browser frame: the site is the hero of each row */}
      <BrowserFrame
        name={name}
        image={image}
        domain={domain}
        preload={preload}
        sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
        className={`shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:ring-coral/40 group-has-[a:focus-visible]:ring-2 group-has-[a:focus-visible]:ring-coral group-hover:shadow-[0_36px_80px_-24px_rgb(255_59_99/0.25)] lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      />

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <h2 className="font-headline text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
          {/* Whole row is clickable via the stretched link */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {name}
          </a>
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-offwhite/70 sm:text-lg">
          {description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-offwhite/80">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-teal" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-2 font-medium text-coral">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
            Visit {domain}
          </span>
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </li>
  );
}
