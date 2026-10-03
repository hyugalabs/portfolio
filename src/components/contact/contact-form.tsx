"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

const needs = ["New website", "Booking or quotes", "SEO", "Social content", "Not sure yet"];

const field =
  "w-full rounded-xl bg-transparent px-4 py-3 text-base text-offwhite caret-coral ring-1 ring-offwhite/15 transition-shadow placeholder:text-offwhite/55 hover:ring-offwhite/25 focus:outline-none focus:ring-2 focus:ring-coral user-invalid:ring-coral/70";
const label = "mb-2 block text-sm font-medium text-offwhite/75";

// Placeholder delivery: opens the visitor's mail app with the message filled in.
// Swap this for a real backend once one is chosen.
function sendMessage(data: FormData) {
  const name = String(data.get("name"));
  const lines = [
    `Name: ${name}`,
    `Business: ${data.get("business") || "-"}`,
    `Email: ${data.get("email")}`,
    `Looking for: ${data.getAll("needs").join(", ") || "-"}`,
    "",
    String(data.get("message")),
  ];
  const subject = encodeURIComponent(`New project enquiry from ${name}`);
  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select the needs picked on /services (?need=SEO&need=...).
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).getAll("need");
    if (!wanted.length || !formRef.current) return;
    for (const box of formRef.current.querySelectorAll<HTMLInputElement>('input[name="needs"]')) {
      box.checked = wanted.includes(box.value);
    }
  }, [sent]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(new FormData(e.currentTarget));
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col justify-center">
        <p className="font-headline text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
          Almost there<span className="text-coral">.</span>
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-offwhite/75">
          Your email app should have opened with your message ready. Hit send there and it reaches us.
        </p>
        <p className="mt-6 text-sm text-offwhite/60">
          Nothing opened? Email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-offwhite underline decoration-coral underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 w-fit cursor-pointer text-sm font-medium text-offwhite/70 underline-offset-4 hover:text-offwhite hover:underline"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="business" className={label}>
            Business <span className="text-offwhite/60">(optional)</span>
          </label>
          <input id="business" name="business" autoComplete="organization" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className={field} />
      </div>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((need) => (
            <label key={need} className="cursor-pointer">
              <input type="checkbox" name="needs" value={need} className="peer sr-only" />
              <span className="inline-block rounded-full px-4 py-2 text-sm text-offwhite/75 ring-1 ring-offwhite/15 transition-colors select-none hover:ring-offwhite/35 peer-checked:bg-coral peer-checked:text-charcoal peer-checked:ring-coral peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-coral">
                {need}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={label}>Tell us about your business</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What you do, who your customers are, and what you'd like the site to handle."
          className={`${field} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="group mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-coral px-8 py-3.5 font-semibold text-charcoal transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:w-fit"
      >
        Send message
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
