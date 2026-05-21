import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://nifelux.com'
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/support/success'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
