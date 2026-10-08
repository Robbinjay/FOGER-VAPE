/**
 * Global site domain and brand configuration
 * Official domain: foger-vapes.store
 */

export const PRIMARY_DOMAIN = 'foger-vapes.store';
export const OFFICIAL_DOMAINS = ['foger-vapes.store'] as const;

export const DEFAULT_SITE_URL = 'https://foger-vapes.store';
export const SUPPORT_EMAIL = 'support@foger-vapes.store';
export const PAYMENTS_EMAIL = 'payments@foger-vapes.store';
export const ORDERS_EMAIL = 'orders@foger-vapes.store';

/**
 * Returns active site URL based on environment or default
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (envUrl) {
    const cleaned = envUrl.trim();
    return cleaned.startsWith('http') ? cleaned : `https://${cleaned}`;
  }
  return DEFAULT_SITE_URL;
}

export const siteConfig = {
  name: 'Foger Vapes Distributor',
  title: 'Foger Vape Distributor | Authentic Bit 35K & Switch Pro',
  description:
    'Authorized distributor of authentic Foger Vape products. Shop Foger Bit 35K, Switch Pro Kits, and replacement pods. 100% genuine guaranteed with fast shipping.',
  primaryDomain: PRIMARY_DOMAIN,
  officialDomains: OFFICIAL_DOMAINS,
  siteUrl: DEFAULT_SITE_URL,
  supportEmail: SUPPORT_EMAIL,
  paymentsEmail: PAYMENTS_EMAIL,
  socialLinks: {
    facebook: 'https://facebook.com/fogervapes',
    instagram: 'https://instagram.com/fogervapes',
  },
};
