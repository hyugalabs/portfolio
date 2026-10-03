"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/\\";
const SCRAMBLE_MS = 700;
const TICK_MS = 45;

function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) return;

    const chars = text.split("");
    const start = performance.now();
    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (now - start >= SCRAMBLE_MS) return setDisplay(text);
      if (now - last >= TICK_MS) {
        last = now;
        const settled = Math.floor(((now - start) / SCRAMBLE_MS) * chars.length);
        setDisplay(
          chars
            .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);

  return <span className="tabular-nums">{display}</span>;
}

const layer =
  "pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-[transform,opacity] duration-150 ease-out group-hover:opacity-70 motion-reduce:hidden";

export function NotFoundGlitch() {
  return (
    <section className="flex min-h-svh w-full flex-col items-center justify-center gap-8 px-6 pb-20 pt-32 text-center">
      <div className="group relative select-none font-accent font-extrabold leading-none tracking-[-0.04em] text-offwhite [font-size:clamp(6rem,22vw,13rem)]">
        <span aria-hidden className={`${layer} text-coral group-hover:translate-x-[3px]`}>
          <Scramble text="404" />
        </span>
        <span aria-hidden className={`${layer} text-teal group-hover:-translate-x-[3px]`}>
          <Scramble text="404" />
        </span>
        <h1 className="relative" aria-label="404">
          <span aria-hidden>
            <Scramble text="404" />
          </span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="font-headline text-2xl font-semibold tracking-[-0.02em] text-offwhite">Page not found</p>
        <p className="max-w-sm text-base text-offwhite/70">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-block rounded-full bg-coral px-7 py-3 font-semibold text-charcoal transition-[opacity,transform] hover:opacity-90 active:scale-[0.97]"
        >
          Go home
        </Link>
        <Link
          href="/components"
          className="inline-block rounded-full px-7 py-3 font-semibold text-offwhite ring-1 ring-offwhite/15 transition-[background-color,transform] hover:bg-offwhite/[0.06] active:scale-[0.97]"
        >
          Our Work
        </Link>
      </div>
    </section>
  );
}
