import React from 'react';
import { DEFAULT_SITE_URL, SUPPORT_EMAIL } from '@/lib/site-config';

export default function JsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Foger Vapes Distributor",
    "url": DEFAULT_SITE_URL,
    "logo": `${DEFAULT_SITE_URL}/logo.png`,
    "description": "Authorized distributor of authentic Foger Vape products including Bit 35K and Switch Pro.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",
      "email": SUPPORT_EMAIL,
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://facebook.com/fogervapes",
      "https://instagram.com/fogervapes"
    ]
  };

  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Foger Vapes Distributor",
    "url": DEFAULT_SITE_URL,
    "alternateName": "Foger Vapes",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${DEFAULT_SITE_URL}/products?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteData) }}
      />
    </>
  );
}
