import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const base = siteConfig.url;

// Update a page's date only when its content really changes; Google ignores dates that always move.
const pages = [
  { path: "", lastModified: "2026-10-10" },
  { path: "/components", lastModified: "2026-10-10" },
  { path: "/services", lastModified: "2026-10-10" },
  { path: "/contact", lastModified: "2026-10-10" },
  { path: "/about", lastModified: "2026-10-10" },
  { path: "/privacy", lastModified: "2026-10-10" },
  { path: "/terms", lastModified: "2026-10-10" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified }) => ({ url: `${base}${path}`, lastModified }));
}
