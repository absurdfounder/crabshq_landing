// components/SchemaMarkup.js
import React from 'react';

const SchemaMarkup = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Crabs HQ",
    "url": "https://crabshq.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://crabshq.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Crabs HQ",
    "url": "https://crabshq.com",
    "logo": "https://dazzling-cat.netlify.app/WonderSites_socialshare.png",
    "sameAs": [
      "https://twitter.com/WonderSites",
      "https://www.facebook.com/WonderSites",
      "https://www.linkedin.com/company/WonderSites"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Crabs HQ",
    "applicationCategory": "WebApplication",
    "operatingSystem": "All",
    "description": "Create superfast websites with Notion as your CMS. Go from Notion to Blog, Helpdesk, Documentation, Marketplace or Directory in minutes. Build unlimited sites!",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "124"
    },
    "offers": {
      "@type": "Offer",
      "price": "7.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://crabshq.com/pricing",
      "priceValidUntil": "2025-12-31",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "7.00",
        "priceCurrency": "USD",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": 1,
          "unitCode": "MON"  // "MON" is a common code to indicate a monthly period
        },
        "description": "$7 per month subscription"
      }
    }
  };
  

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I create a website with CrabsHQ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can create a website using Notion as your CMS and CrabsHQ to turn it into powerful blog, helpdesk, documentation site, marketplace, or directory in minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Is CrabsHQ SEO-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CrabsHQ creates superfast websites that are SEO-friendly, helping your content rank better in search engines."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a marketplace with CrabsHQ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can create a marketplace or directory site with CrabsHQ using Notion as your CMS. It's a no-code solution that lets you build unlimited sites."
        }
      },
      {
        "@type": "Question",
        "name": "How fast are websites created with CrabsHQ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crabs HQ using Amazon AWS the websites are superfast and optimized for excellent SEO. You can go from Notion to a live website in minutes using our AI Agents."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Pricing",
        "item": "https://crabshq.com/pricing"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Integrations",
        "item": "https://crabshq.com/integrations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CrabsHQ App",
        "item": "https://app.crabshq.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default SchemaMarkup;