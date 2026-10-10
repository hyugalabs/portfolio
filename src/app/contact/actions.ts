"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";

export type ContactResult = { ok: true } | { ok: false; error: string };

// Business mailbox (SMTP_*) when set, otherwise the Gmail sender.
const smtp = process.env.SMTP_HOST && process.env.SMTP_PASS
  ? {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    }
  : null;
const sender = smtp ? process.env.SMTP_USER : process.env.GMAIL_USER;

const transporter = nodemailer.createTransport(
  smtp ?? { service: "gmail", auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } },
);

// Spam defences: honeypot field, minimum time on the form, and a per-IP limit.
const MIN_FILL_MS = 3000;
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  hits.set(ip, [...recent, now]);
  if (hits.size > 5000) for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  return false;
}

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export async function sendContact(data: FormData): Promise<ContactResult> {
  // Bots get a fake success so they don't learn what tripped them.
  const openedAt = Number(data.get("openedAt"));
  if (data.get("website") || !openedAt || Date.now() - openedAt < MIN_FILL_MS) {
    console.warn("Contact form blocked as spam", {
      honeypotFilled: Boolean(data.get("website")),
      openedAt: openedAt || null,
      msOnForm: openedAt ? Date.now() - openedAt : null,
    });
    return { ok: true };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { ok: false, error: "Too many messages from your connection. Please wait a few minutes or email us directly." };
  }

  const name = text(data, "name", 200).replace(/[\r\n]+/g, " ");
  const business = text(data, "business", 200);
  const email = text(data, "email", 320);
  const message = text(data, "message", 5000);
  const needs = data.getAll("needs").map(String).join(", ");

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please fill in your name, a valid email and a message." };
  }

  const recipients = (process.env.CONTACT_RECIPIENTS ?? "").split(",").map((r) => r.trim()).filter(Boolean);

  try {
    // One email per recipient so each gets their own copy.
    await Promise.all(
      recipients.map((to) =>
        transporter.sendMail({
          from: `"Hyuga Labs website" <${sender}>`,
          to,
          replyTo: { name, address: email },
          subject: `New project enquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Business: ${business || "-"}`,
            `Email: ${email}`,
            `Looking for: ${needs || "-"}`,
            "",
            message,
          ].join("\n"),
        }),
      ),
    );
    return { ok: true };
  } catch (err) {
    console.error("Contact form email failed", err);
    return { ok: false, error: "Something went wrong sending your message. Please try again or email us directly." };
  }
}
