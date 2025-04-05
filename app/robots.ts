import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ai-contennt-creation.vercel.app/"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/private/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

