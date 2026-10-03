"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { sites } from "@/data/sites";
import { siteConfig } from "@/lib/site-config";
import { RollText } from "./roll-text";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/components", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const previews = sites.slice(0, 2);

// Panel wipes up from the bottom on open and out through the top on close.
const CLIP = {
  below: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  full: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  above: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
};
const WIPE = { duration: 1, ease: [0.76, 0, 0.24, 1] } as const;
const REVEAL_DELAY = 0.6;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const rise: Variants = {
  hidden: { y: 30, opacity: 0 },
  shown: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: REVEAL_DELAY + i * 0.07 },
  }),
};

const grow: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  shown: (i: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: REVEAL_DELAY + 0.1 + i * 0.05 },
  }),
};

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While open: lock scroll, close on Escape, keep Tab inside the header + panel.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !rootRef.current) return;
      const items = [...rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  const ink = open ? "text-charcoal" : "text-offwhite";
  const inkDelay = open ? "delay-500" : "delay-300";

  return (
    <div ref={rootRef}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-1" aria-label={`${siteConfig.name} home`}>
            <span className="relative size-12">
              <Image src="/images/logos/only logo 1024x1024 dark mode.svg" alt="" fill preload className={`transition-opacity duration-300 ${inkDelay} ${open ? "opacity-0" : ""}`} />
              <Image src="/images/logos/only logo 1024x1024 transparent.svg" alt="" fill className={`transition-opacity duration-300 ${inkDelay} ${open ? "" : "opacity-0"}`} />
            </span>
            <span className={`font-headline text-lg font-semibold transition-colors duration-300 ${inkDelay} ${ink}`}>
              Hyuga Labs<span aria-hidden className="ml-1 inline-block size-1.5 rounded-full bg-coral align-baseline" />
            </span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={`group flex cursor-pointer items-center gap-3 rounded-full py-2 pl-4 pr-3 font-sub text-sm transition-colors duration-300 ${inkDelay} ${ink}`}
          >
            <span className="relative overflow-hidden">
              <span className={`block transition-transform duration-500 ${open ? "-translate-y-full" : ""}`}>Menu</span>
              <span aria-hidden className={`absolute inset-0 transition-transform duration-500 ${open ? "" : "translate-y-full"}`}>Close</span>
            </span>
            <span aria-hidden className="relative flex h-3 w-6 flex-col justify-between">
              <span className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-500 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-500 ${open ? "w-full -translate-y-[5px] -rotate-45 bg-current" : "w-2/3 self-end bg-coral group-hover:w-full"}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            initial={reduced ? { opacity: 0 } : { clipPath: CLIP.below }}
            animate={reduced ? { opacity: 1 } : { clipPath: CLIP.full }}
            exit={reduced ? { opacity: 0 } : { clipPath: CLIP.above }}
            transition={reduced ? { duration: 0.2 } : WIPE}
            className="fixed inset-0 z-40 overflow-y-auto bg-offwhite text-charcoal"
          >
            <motion.div
              initial={reduced ? false : "hidden"}
              animate="shown"
              exit={reduced ? undefined : { scale: 0.92, opacity: 0.5, transition: { duration: 0.6, ease: "easeIn" } }}
              className="mx-auto flex min-h-svh max-w-7xl flex-col justify-between gap-12 px-4 pb-8 pt-28 sm:px-6 lg:pt-32"
            >
              <motion.p variants={rise} className="max-w-md font-sub text-lg text-charcoal/60 sm:text-xl">
                Custom websites, SEO and social content for small businesses.
              </motion.p>

              <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
                <ul>
                  {links.map(({ href, label }, i) => {
                    const current = pathname === href;
                    return (
                      <motion.li key={href} custom={i} variants={rise}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={current ? "page" : undefined}
                          className="group flex items-baseline gap-4 font-headline text-[13vw] font-semibold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
                        >
                          <span className="w-8 font-sub text-sm font-normal tracking-normal text-charcoal/40 sm:w-10 sm:text-base">0{i + 1}</span>
                          <RollText text={label} />
                          {current && <span aria-hidden className="inline-block size-2.5 rounded-full bg-coral sm:size-3" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="hidden gap-6 lg:flex">
                  {previews.map((site, i) => (
                    <motion.div key={site.href} custom={i} variants={grow} className={i ? "-mb-10" : ""}>
                      <Link
                        href="/components"
                        onClick={() => setOpen(false)}
                        tabIndex={-1}
                        aria-hidden
                        className="group block w-[22vw] max-w-80"
                      >
                        <span className="relative block aspect-8/5 overflow-hidden rounded-xl bg-charcoal/5 ring-1 ring-charcoal/10 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-coral">
                          <Image
                            src={site.image}
                            alt=""
                            fill
                            sizes="320px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                          />
                        </span>
                        <span className="mt-2 block font-sub text-xs text-charcoal/60">{site.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                custom={6}
                variants={rise}
                className="flex flex-col gap-4 border-t border-charcoal/10 pt-6 font-sub text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <a href={`mailto:${siteConfig.email}`} className="font-medium transition-colors hover:text-coral">
                  {siteConfig.email}
                </a>
                <ul className="flex gap-5">
                  {siteConfig.socials.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal/60 transition-colors hover:text-coral"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
