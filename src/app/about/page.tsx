import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false },
};

export default function AboutPage() {
  return <UnderConstruction />;
}
