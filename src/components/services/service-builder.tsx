"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { RollText } from "@/components/layout/roll-text";
import { services, type Service } from "@/data/services";
import { sites } from "@/data/sites";

// Same wipe as the site menu, running top to bottom.
const CLIP = {
  closed: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};
const WIPE = { duration: 0.8, ease: [0.76, 0, 0.24, 1] } as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { y: 24, opacity: 0, transition: { duration: 0.2 } },
  shown: (i: number = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.3 + i * 0.06 } }),
};

const grow: Variants = {
  hidden: { scale: 0.85, opacity: 0, transition: { duration: 0.2 } },
  shown: (i: number = 0) => ({ scale: 1, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.4 + i * 0.08 } }),
};

function Plus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative grid size-11 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:size-14 ${
        open ? "rotate-45 bg-coral text-charcoal ring-coral" : "text-offwhite ring-offwhite/20 group-hover:ring-coral"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="size-5">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

function ServiceRow({
  service,
  open,
  picked,
  onToggle,
  onPick,
}: {
  service: Service;
  open: boolean;
  picked: boolean;
  onToggle: () => void;
  onPick: () => void;
}) {
  const reduced = useReducedMotion();
  const { id, name, summary, includes, proof, note } = service;
  const tiles = proof.map((p) => ({ ...p, ...sites.find((s) => s.name === p.site)! }));

  return (
    <li className="border-b border-offwhite/10">
      <h2>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-7 text-left sm:py-8 lg:grid-cols-[1fr_minmax(0,19rem)_auto] lg:gap-x-12 lg:py-5"
        >
          <span className="font-headline text-[12vw] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
            <RollText
              text={name}
              after={picked && <span className="-mr-[18px] ml-2 inline-block size-2.5 rounded-full bg-coral align-[0.55em] sm:-mr-6 sm:ml-3 sm:size-3" />}
            />
          </span>
          <span className="col-span-2 row-start-2 max-w-sm font-sub text-base leading-relaxed text-offwhite/65 lg:col-span-1 lg:col-start-2 lg:row-start-1">
            {summary}
          </span>
          <Plus open={open} />
        </button>
      </h2>

      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={reduced ? { duration: 0 } : WIPE}
        className="overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={open ? "shown" : "hidden"}
          variants={reduced ? undefined : { hidden: { clipPath: CLIP.closed }, shown: { clipPath: CLIP.open, transition: WIPE } }}
          className="grid gap-10 pb-24 pt-2 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16 lg:pb-20"
        >
          <div>
            <ul className="flex flex-col gap-3.5">
              {includes.map((item, i) => (
                <motion.li key={item} custom={i} variants={reduced ? undefined : rise} className="flex gap-3 leading-relaxed text-offwhite/85">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div custom={includes.length} variants={reduced ? undefined : rise}>
              <button
                type="button"
                aria-pressed={picked}
                onClick={onPick}
                className={`mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition-colors ${
                  picked ? "bg-coral text-charcoal ring-coral" : "text-offwhite ring-offwhite/25 hover:ring-coral"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4">
                  {picked ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M12 5v14M5 12h14" />}
                </svg>
                {picked ? "On your list" : `Add ${name} to your list`}
              </button>
            </motion.div>
          </div>

          {tiles.length ? (
            <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
              {tiles.map((t, i) => (
                <motion.li key={t.site} custom={i} variants={reduced ? undefined : grow} className="w-[64vw] shrink-0 snap-start sm:w-auto">
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="group/tile block">
                    <span className="relative block aspect-8/5 overflow-hidden rounded-xl bg-offwhite/[0.04] ring-1 ring-offwhite/10 transition-shadow duration-300 group-hover/tile:ring-2 group-hover/tile:ring-coral">
                      <Image
                        src={t.image}
                        alt={`${t.site} website`}
                        fill
                        sizes="(min-width: 1280px) 260px, (min-width: 640px) 28vw, 64vw"
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-105 motion-reduce:transition-none"
                      />
                    </span>
                    <span className="mt-3 flex items-start justify-between gap-2">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-offwhite">{t.site}</span>
                        <span className="mt-0.5 flex items-center gap-1.5 text-sm text-offwhite/60">
                          <span aria-hidden className="size-1.5 rounded-full bg-teal" />
                          {t.feature}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-offwhite/50 transition-[color,transform] group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:text-coral" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.p
              custom={1}
              variants={reduced ? undefined : rise}
              className="max-w-md self-center text-balance font-headline text-2xl font-medium leading-snug tracking-[-0.02em] text-offwhite/80 sm:text-3xl"
            >
              {note}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </li>
  );
}

/** The services as giant rows that wipe open; the ones you add ride along to the contact form. */
export function ServiceBuilder() {
  const [open, setOpen] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [atEnd, setAtEnd] = useState(false);
  const reduced = useReducedMotion();

  // Hide the list bar once the closing call to action is on screen.
  useEffect(() => {
    const end = document.getElementById("services-end");
    if (!end) return;
    const io = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting));
    io.observe(end);
    return () => io.disconnect();
  }, []);

  const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const chosen = services.filter((s) => picked.includes(s.id));
  const contactHref = `/contact?${new URLSearchParams(chosen.map((s) => ["need", s.need]))}`;

  return (
    <>
      <ul className="border-t border-offwhite/10">
        {services.map((s) => (
          <ServiceRow
            key={s.id}
            service={s}
            open={open.includes(s.id)}
            picked={picked.includes(s.id)}
            onToggle={() => setOpen((o) => toggle(o, s.id))}
            onPick={() => setPicked((p) => toggle(p, s.id))}
          />
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">
        {chosen.length ? `${chosen.length} on your list: ${chosen.map((s) => s.name).join(", ")}` : ""}
      </p>

      <AnimatePresence>
        {chosen.length > 0 && !atEnd && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { y: "120%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: "120%" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full bg-offwhite py-2 pl-5 pr-2 text-charcoal shadow-[0_24px_50px_-16px_rgb(0_0_0/0.7)]"
          >
            <p className="min-w-0 truncate text-sm">
              <span className="font-semibold tabular-nums">{chosen.length} on your list</span>
              <span className="hidden text-charcoal/60 sm:inline">: {chosen.map((s) => s.name).join(", ")}</span>
            </p>
            <Link
              href={contactHref}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-charcoal transition-opacity hover:opacity-90"
            >
              Talk to us about these
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
