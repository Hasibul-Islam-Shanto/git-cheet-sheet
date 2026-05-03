import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://hi-shanto.me/sitemap.xml',
    host: 'https://hi-shanto.me',
  }
}
