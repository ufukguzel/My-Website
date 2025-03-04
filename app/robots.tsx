import { sharedMetadata } from '@/lib/shared-metadata'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/docs/', '/docs/app-policy/'],
    },
    sitemap: `${sharedMetadata.urls.website}/sitemap.xml`,
  }
}