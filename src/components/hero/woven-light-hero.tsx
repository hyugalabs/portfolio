"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";

const WovenCanvas = dynamic(() => import("./woven-canvas"), { ssr: false });

const words = ["Websites", "built", "around", "how", "your", "business", "works"];
const ease = [0.2, 0.65, 0.3, 0.9] as const;
const copyDelay = words.length * 0.08 + 0.3;

export const WovenLightHero = () => (
  <section className="relative flex h-[calc(100svh-4.5rem)] min-h-[34rem] w-full flex-col items-center justify-center overflow-hidden bg-charcoal">
    <WovenCanvas />
    <div className="relative z-10 px-5 text-center">
      {/* Soft charcoal glow keeps the copy readable over the particles */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-full bg-charcoal/75 blur-3xl" />
      <h1 className="font-headline mx-auto max-w-4xl text-4xl font-bold tracking-[-0.03em] text-balance text-offwhite sm:text-6xl md:text-7xl">
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.span
              className="inline-block whitespace-nowrap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3, duration: 0.9, ease }}
            >
              {word}
              {i === words.length - 1 && (
                <span aria-hidden className="ml-[0.08em] inline-block size-[0.16em] rounded-full bg-coral" />
              )}
            </motion.span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: copyDelay, duration: 0.9, ease }}
        className="font-sub mx-auto mt-6 max-w-xl text-lg text-offwhite/85"
      >
        Hyuga Labs builds custom websites for small businesses, then helps people find them with SEO and social content.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: copyDelay + 0.2, duration: 0.8 }}
        className="font-sub mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
      >
        <Link
          href="/components"
          className="inline-block rounded-full bg-coral px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
        >
          See sites we&rsquo;ve built
        </Link>
        <Link
          href="/contact"
          className="font-medium text-offwhite underline decoration-offwhite/30 underline-offset-[6px] transition-colors hover:decoration-coral"
        >
          Talk to us
        </Link>
      </motion.div>
    </div>
  </section>
);
