"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { sendContact } from "@/app/contact/actions";

const needs = ["New website", "Booking or quotes", "SEO", "Social content", "Not sure yet"];

const field =
  "w-full rounded-xl bg-transparent px-4 py-3 text-base text-offwhite caret-coral ring-1 ring-offwhite/15 transition-shadow placeholder:text-offwhite/55 hover:ring-offwhite/25 focus:outline-none focus:ring-2 focus:ring-coral user-invalid:ring-coral/70";
const label = "mb-2 block text-sm font-medium text-offwhite/75";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
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
    const data = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await sendContact(data);
      if (result.ok) setSent(true);
      else setError(result.error);
    });
  };

  if (sent) {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col justify-center">
        <p className="font-headline text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
          Message sent<span className="text-coral">.</span>
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-offwhite/75">
          Thanks for reaching out. We&apos;ll get back to you at the email you gave us.
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

      {error && (
        <p role="alert" className="text-sm text-coral">
          {error}{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-offwhite underline decoration-coral underline-offset-4">
            {siteConfig.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group disabled:cursor-wait disabled:opacity-60 mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-coral px-8 py-3.5 font-semibold text-charcoal transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:w-fit"
      >
        {pending ? "Sending..." : "Send message"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
