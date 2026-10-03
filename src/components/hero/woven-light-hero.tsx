"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";

const WovenCanvas = dynamic(() => import("./woven-canvas"), { ssr: false });

const headline = "Hyuga Labs";
const words = headline.split(" ");

export const WovenLightHero = () => (
  <section className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-charcoal">
    <WovenCanvas />
    <div className="relative z-10 px-4 text-center">
      {/* Soft charcoal glow keeps the copy readable over the particles */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-full bg-charcoal/75 blur-3xl" />
      <h1 className="font-headline text-5xl font-bold text-offwhite sm:text-6xl md:text-8xl">
        {words.map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap">
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (i * 5 + j) * 0.1 + 1.5,
                  duration: 1.2,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
              >
                {char}
              </motion.span>
            ))}
            {i < words.length - 1 && <span>&nbsp;</span>}
            {i === words.length - 1 && (
              <motion.span
                aria-hidden
                className="ml-[0.12em] mb-[0.08em] inline-block size-[0.2em] rounded-full bg-coral align-baseline"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: headline.length * 0.1 + 1.5,
                  duration: 1.2,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
              />
            )}
          </span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: headline.length * 0.1 + 1.5, duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="font-sub mx-auto mt-6 max-w-xl text-lg text-offwhite/85"
      >
        We build custom websites for small businesses, and help you grow your presence with SEO and social content.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-10"
      >
        <Link
          href="/components"
          className="font-sub inline-block rounded-full bg-coral px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
        >
          Our Work
        </Link>
      </motion.div>
    </div>
  </section>
);
