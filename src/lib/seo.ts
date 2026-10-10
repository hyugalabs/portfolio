import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const ogImage = { url: "/opengraph-image.png", width: 1200, height: 630, alt: `${siteConfig.name}: ${siteConfig.tagline}` };

/** Per-page metadata. Page-level openGraph replaces the layout's whole object (file-based images included), so everything is set here. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: [ogImage] },
  };
}
