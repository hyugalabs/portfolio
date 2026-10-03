"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/components", label: "Components" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const marquee = [
  "Custom websites",
  "SEO that ranks",
  "Social content",
  "Booking & quotes",
  "CRM",
];

function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function MarqueeRow() {
  return (
    <div className="flex items-center gap-12 px-6">
      {marquee.map((item, i) => (
        <span key={item} className="flex items-center gap-12">
          {item}
          <span className={i % 2 ? "text-teal/60" : "text-coral/60"}>✦</span>
        </span>
      ))}
    </div>
  );
}

const pill =
  "footer-pill flex items-center gap-3 rounded-full font-semibold text-offwhite";
const bigPill = `${pill} px-8 py-4 text-sm md:px-10 md:py-5 md:text-base`;
const svgProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CinematicFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bgProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end end"],
  });
  const { scrollYProgress: fgProgress } = useScroll({
    target: ref,
    offset: ["start 40%", "end end"],
  });

  const bgY = useTransform(bgProgress, [0, 1], ["10vh", "0vh"]);
  const bgScale = useTransform(bgProgress, [0, 1], [0.8, 1]);
  const bgOpacity = useTransform(bgProgress, [0, 1], [0, 1]);
  const headingY = useTransform(fgProgress, [0, 0.6], [50, 0]);
  const headingOpacity = useTransform(fgProgress, [0, 0.6], [0, 1]);
  const linksY = useTransform(fgProgress, [0.15, 0.75], [50, 0]);
  const linksOpacity = useTransform(fgProgress, [0.15, 0.75], [0, 1]);

  return (
    // Curtain reveal: the footer is fixed, and the clip-path shows it only inside this box.
    <div
      ref={ref}
      className="relative h-svh w-full"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <footer className="fixed bottom-0 left-0 flex h-svh w-full flex-col justify-between overflow-hidden bg-charcoal text-offwhite">
        <div
          aria-hidden
          className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px]"
        />
        <div aria-hidden className="footer-grid pointer-events-none absolute inset-0 z-0" />
        <motion.div
          aria-hidden
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity, x: "-50%" }}
          className="footer-giant-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 select-none whitespace-nowrap font-headline"
        >
          HYUGA
        </motion.div>

        <div
          aria-hidden
          className="absolute left-0 top-24 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-offwhite/10 bg-charcoal/60 py-4 backdrop-blur-md"
        >
          <div className="animate-footer-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-offwhite/60 md:text-sm">
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-24 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <motion.h2
            style={{ y: headingY, opacity: headingOpacity }}
            className="footer-glow mb-12 text-center font-headline text-5xl font-black tracking-tighter md:text-8xl"
          >
            Let&rsquo;s build <span className="font-accent">yours.</span>
          </motion.h2>

          <motion.div
            style={{ y: linksY, opacity: linksOpacity }}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="flex w-full flex-wrap justify-center gap-4">
              <Magnetic>
                <a href={`mailto:${siteConfig.email}`} className={bigPill}>
                  <svg {...svgProps} className="h-5 w-5 text-offwhite/60">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                  {siteConfig.email}
                </a>
              </Magnetic>
              <Magnetic>
                <a href={`tel:${siteConfig.phone}`} className={bigPill}>
                  <svg {...svgProps} className="h-5 w-5 text-offwhite/60">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </Magnetic>
            </div>

            <nav aria-label="Footer" className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
              {navLinks.map(({ href, label }) => (
                <Magnetic key={href}>
                  <Link href={href} className={`${pill} px-5 py-2.5 text-xs font-medium text-offwhite/70 md:text-sm`}>
                    {label}
                  </Link>
                </Magnetic>
              ))}
            </nav>
          </motion.div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <p className="order-3 text-[10px] font-semibold uppercase tracking-widest text-offwhite/60 md:order-1 md:text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="order-1 flex gap-3 md:order-2">
            {siteConfig.socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-pill block rounded-full px-4 py-2 text-xs font-semibold text-offwhite/70"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-pill group order-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-offwhite/60 md:order-3"
          >
            <svg {...svgProps} className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1">
              <path d="M5 10l7-7 7 7M12 3v18" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
