import type { Metadata } from "next";
import { NotFoundGlitch } from "@/components/not-found/not-found-glitch";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main>
      <NotFoundGlitch />
    </main>
  );
}
