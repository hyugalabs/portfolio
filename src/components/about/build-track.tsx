"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { buildStages, type BuildStage } from "@/data/build-stages";
import { sites } from "@/data/sites";

// Same wipe as the site menu and the services rows, running top to bottom.
const CLIP = {
  closed: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};
const WIPE = { duration: 0.8, ease: [0.76, 0, 0.24, 1] } as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function Stage({ stage, index }: { stage: BuildStage; index: number }) {
  const reduced = useReducedMotion();
  const { title, body, proof } = stage;
  const site = sites.find((s) => s.name === proof.site)!;
  const { scale = 1, originX = 0, originY = 0 } = proof.zoom ?? {};
  // Where the mark lands once the shot is scaled from its origin.
  const at = (v: number, o: number) => `${o + (v - o) * scale}%`;
  const { left, top, width, height } = proof.mark;
  const box = { left: at(left, originX), top: at(top, originY), width: `${width * scale}%`, height: `${height * scale}%` };
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p aria-hidden className="font-headline text-7xl font-semibold leading-none tracking-[-0.04em] text-offwhite/15 sm:text-8xl">
          {number}
        </p>
        <h3 className="mt-6 text-balance font-headline text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-offwhite/70">{body}</p>
      </div>

      <figure>
        {/* The trigger sits on this unclipped wrapper: a fully clipped element never counts as in view. */}
        <motion.div initial={reduced ? false : "hidden"} whileInView="shown" viewport={{ once: true, amount: 0.35 }} className="relative">
          <motion.div
            variants={{ hidden: { clipPath: CLIP.closed }, shown: { clipPath: CLIP.open, transition: WIPE } }}
            className="relative aspect-8/5 overflow-hidden rounded-xl bg-offwhite/[0.04] ring-1 ring-offwhite/10"
          >
            <span className="absolute inset-0" style={proof.zoom && { transform: `scale(${scale})`, transformOrigin: `${originX}% ${originY}%` }}>
              <Image
                src={site.image}
                alt={`${site.name} website, with ${proof.label.toLowerCase()} marked`}
                fill
                sizes={`(min-width: 1280px) ${700 * scale}px, (min-width: 1024px) ${55 * scale}vw, ${100 * scale}vw`}
                className="object-cover object-top"
              />
            </span>
            {/* The detail this stage is about: the rest of the shot dims and a coral ring wipes in around it. */}
            <motion.span
              aria-hidden
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.75 } } }}
              className="absolute rounded-[10px] shadow-[0_0_0_9999px_rgb(30_30_32/0.4)]"
              style={box}
            />
            <motion.span
              aria-hidden
              variants={{
                hidden: { clipPath: "inset(0% 100% 100% 0% round 10px)" },
                shown: { clipPath: "inset(0% 0% 0% 0% round 10px)", transition: { duration: 0.7, ease: EASE_OUT, delay: 0.75 } },
              }}
              className="absolute rounded-[10px] ring-2 ring-coral"
              style={box}
            />
          </motion.div>
          <motion.span
            aria-hidden
            variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 1.1 } } }}
            className="absolute -top-3.5 right-4 rounded-full bg-coral px-3.5 py-1.5 text-sm font-semibold text-charcoal shadow-[0_10px_24px_-10px_rgb(0_0_0/0.6)]"
          >
            {proof.label}
          </motion.span>
        </motion.div>
        <figcaption className="mt-4 flex items-start justify-between gap-4">
          <span className="max-w-md leading-relaxed text-offwhite/65">
            <span className="flex items-center gap-1.5 font-medium text-offwhite">
              <span aria-hidden className="size-1.5 rounded-full bg-teal" />
              {site.name}
            </span>
            {proof.caption}
          </span>
          <a
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1 pt-0.5 text-sm font-medium text-offwhite/70 transition-colors hover:text-coral"
          >
            Visit<span className="sr-only"> {site.name} (opens in a new tab)</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

/** The four stages of a build, each pinned to the live site that shows it, with a rail tracking where you are. */
export function BuildTrack() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // The stage crossing the middle of the screen is the active one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.current.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10">
      <div aria-hidden className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
        <div className="relative pl-5">
          <span className="absolute inset-y-1 left-0 w-px bg-offwhite/12" />
          <span
            className="absolute left-0 top-1 w-px bg-coral transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ height: `calc(${(active / (buildStages.length - 1)) * 100}% - 0.5rem)` }}
          />
          <ol className="flex flex-col gap-5">
            {buildStages.map((s, i) => (
              <li
                key={s.id}
                className={`flex items-baseline gap-2 text-sm transition-colors duration-500 ${
                  i === active ? "text-offwhite" : i < active ? "text-offwhite/55" : "text-offwhite/30"
                }`}
              >
                <span className={`font-semibold tabular-nums ${i <= active ? "text-coral" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                {s.short}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className="border-t border-offwhite/10">
        {buildStages.map((stage, i) => (
          <li
            key={stage.id}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="border-b border-offwhite/10 py-14 sm:py-20 lg:min-h-[72vh] lg:py-24"
          >
            <Stage stage={stage} index={i} />
          </li>
        ))}
      </ol>
    </div>
  );
}
