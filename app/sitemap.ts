import type { MetadataRoute } from "next";
import { siteConfig, policyLinks } from "@/content/site";
import { newsPosts } from "@/content/news";
import { tournamentVideos } from "@/content/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/tournament",
    "/tournament/about",
    "/tournament/entry-criteria",
    "/tournament/rules",
    "/news",
    "/videos",
    "/hall-of-fame",
    "/gallery",
    "/shop",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const newsRoutes = newsPosts.map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const videoRoutes = tournamentVideos.map((video) => ({
    url: `${base}/videos/${video.year}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const policyRoutes = policyLinks.map((policy) => ({
    url: `${base}/policies/${policy.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...newsRoutes, ...videoRoutes, ...policyRoutes];
}
