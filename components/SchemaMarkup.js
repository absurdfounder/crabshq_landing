// components/SchemaMarkup.js
import React from 'react';

const SchemaMarkup = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Crabs HQ",
    "url": "https://crabshq.com/",
    "description": "AI Workforce Platform Powered by OpenClaw — Deploy autonomous AI employees that execute real tasks using GitHub, Gmail, browsers, and APIs.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://crabshq.com/integration?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Crabs HQ",
    "url": "https://crabshq.com",
    "logo": "https://dazzling-cat.netlify.app/crabshq_social.png",
    "description": "Crabs HQ builds AI workforce teams powered by OpenClaw. Multiple AI employees execute tasks autonomously using GitHub, Gmail, browsers, and APIs.",
    "sameAs": [
      "https://twitter.com/Crabs_HQ"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://crabshq.com/contact"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Crabs HQ",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI workforce platform powered by OpenClaw. Deploy multiple AI employees that make GitHub commits, send emails, browse the web, and execute complex multi-step tasks autonomously.",
    "url": "https://crabshq.com",
    "featureList": [
      "AI Workforce Teams",
      "GitHub Integration with real commits",
      "Autonomous Task Execution",
      "Persistent Memory across sessions",
      "Browser Control and automation",
      "Email Automation via Gmail",
      "3000+ OpenClaw Skills and Plugins",
      "Multi-Agent Collaboration",
      "System Access and API integration",
      "Chat Interfaces"
    ],
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
      "priceValidUntil": "2026-12-31",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "7.00",
        "priceCurrency": "USD",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": 1,
          "unitCode": "MON"
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
        "name": "What is Crabs HQ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crabs HQ is an AI workforce platform powered by OpenClaw technology. It lets you deploy multiple AI employees (agents) that work autonomously — making GitHub commits, sending emails, browsing the web, and executing complex multi-step tasks."
        }
      },
      {
        "@type": "Question",
        "name": "What are OpenClaw Skills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OpenClaw Skills are installable capabilities for AI agents. With 3,000+ skills available, they extend agent functionality across coding, browser automation, data analytics, DevOps, testing, and more. Install via: npx clawhub@latest install <skill-name>."
        }
      },
      {
        "@type": "Question",
        "name": "How does GitHub integration work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CrabsHQ AI agents connect directly to your GitHub repositories. They can make real commits, create pull requests, review code, manage branches, and resolve merge conflicts — all autonomously."
        }
      },
      {
        "@type": "Question",
        "name": "Can multiple AI agents work together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CrabsHQ supports multi-agent collaboration. Multiple AI agents can work on the same project, communicate with each other, delegate tasks, and orchestrate complex workflows together."
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
        "name": "Home",
        "item": "https://crabshq.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Skills Catalog",
        "item": "https://crabshq.com/integration"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing",
        "item": "https://crabshq.com/pricing"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Features",
        "item": "https://crabshq.com/features/ai-workforce"
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
