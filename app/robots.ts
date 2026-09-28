import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/track-order'],
    },
    sitemap: 'https://foger-vapes.store/sitemap.xml',
  };
}
