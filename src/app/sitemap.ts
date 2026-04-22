import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.brbotssa.com.br/pt",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.brbotssa.com.br/en",
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
