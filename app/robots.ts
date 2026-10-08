import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getSiteUrl } from '@/lib/site-config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl = getSiteUrl();
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host) {
      baseUrl = `${proto}://${host}`;
    }
  } catch {
    // fallback
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/track-order'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
