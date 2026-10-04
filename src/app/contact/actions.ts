"use server";

import nodemailer from "nodemailer";

export type ContactResult = { ok: true } | { ok: false; error: string };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export async function sendContact(data: FormData): Promise<ContactResult> {
  const name = text(data, "name", 200);
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
          from: `"Hyuga Labs website" <${process.env.GMAIL_USER}>`,
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
