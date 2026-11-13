import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://chentaijilab.ca/" },
    { url: "https://chentaijilab.ca/classes" },
    { url: "https://chentaijilab.ca/start" },
    { url: "https://chentaijilab.ca/about" },
    { url: "https://chentaijilab.ca/method" },
  ];
}
