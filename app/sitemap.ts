import { MetadataRoute } from 'next';
import { products } from '@/lib/data';
import { headers } from 'next/headers';
import { getSiteUrl } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = getSiteUrl();
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host) {
      baseUrl = `${proto}://${host}`;
    }
  } catch {
    // fallback to default site url
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = [
    '',
    '/about',
    '/products',
    '/contact',
    '/faq',
    '/shipping',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...routes, ...productUrls];
}
