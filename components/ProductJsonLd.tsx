import React from 'react';
import { Product } from '@/lib/data';

interface ProductJsonLdProps {
  product: Product;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const productData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [
      `https://fogervapes.org${product.image}`
    ],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Foger"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://fogervapes.org/products/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
    />
  );
}
