import { MetadataRoute } from 'next';
import { DEFAULT_SITE_URL } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = DEFAULT_SITE_URL;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/track-order'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
