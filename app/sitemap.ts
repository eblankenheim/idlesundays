import type { MetadataRoute } from "next";
import { fetchEvents } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await fetchEvents();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/calendar"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/instagram"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/facebook"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl(`/events/${event.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
