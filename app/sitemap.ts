import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["https://fsoaz.github.io/home/", "https://fsoaz.github.io/home/en/"].map(url => ({
    url, changeFrequency: "monthly", priority: url.endsWith("/en/") ? 0.8 : 1,
    alternates: { languages: { "pt-BR": "https://fsoaz.github.io/home/", "en-US": "https://fsoaz.github.io/home/en/" } },
  }));
}
