import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const base = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/components`, priority: 0.9 },
    { url: `${base}/services`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
  ];
}
