import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/process", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
