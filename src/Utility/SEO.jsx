import { Title, Meta, Link } from 'react-head';

export default function SEO({ 
  title = "Join DropArabia the first dropshipping platform in Lebanon! | Test Products Before You Buy Inventory",
  description = "Launch your dropshipping business in Lebanon with DropArabia. Test winning products with low risk, no inventory needed. We handle shipping, COD & fulfillment. Start your store in 10-14 days.",
  keywords = "dropshipping Lebanon, dropshipping platform, test products before buying, low risk dropshipping, COD fulfillment Lebanon, dropshipping tools, start dropshipping business, product testing platform, ecommerce Lebanon, dropshipping software"
}) {
  const url = "https://join.droparabia.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DropArabia",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "250"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Lebanon"
    },
    "inLanguage": "en",
    "featureList": [
      "Product demand testing with low daily budget",
      "COD and fulfillment management",
      "Brand building from winning products",
      "Fast store launch in 10-14 days",
      "Shipping and logistics support"
    ]
  };

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
      <Link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={url} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={`${url}/og-image.jpg`} />
      <Meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <Meta property="twitter:card" content="summary_large_image" />
      <Meta property="twitter:url" content={url} />
      <Meta property="twitter:title" content={title} />
      <Meta property="twitter:description" content={description} />
      <Meta property="twitter:image" content={`${url}/og-image.jpg`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
}