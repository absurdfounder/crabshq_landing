import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/header';

const TemplateDesign = () => {
  // Create a features array for better maintainability and consistency
  const features = [
    {
      title: "Your content",
      highlight: "lives in Notion",
      description: "Your work stays in a place you control and love, while Wonder  handles the technical parts of publishing it to your website. This means you can focus on what's actually important to you: creating content and building your brand without worrying about configurations, plugins, downtime, performance, or security.",
      image: "https://dazzling-cat.netlify.app/write%20on%20notion.png",
      alt: "Content in Notion",
      imageFirst: false
    },
    {
      title: "Customize to",
      highlight: "your brand",
      description: "Style the look and feel of your site with no-code themes and designer templates. Everything can be customized inside Wonder  without code to make you proud of the unique site you share with the world. Add custom-code only if you want to.",
      image: "https://dazzling-cat.netlify.app/notion%20to%20website.png",
      alt: "Customizable design templates",
      imageFirst: true
    },
    {
      title: "World-class",
      highlight: "Performance",
      description: "Pages load instantly anywhere in the world giving your site visitors a pleasant and snappy experience—they'll never close the page for taking too long to load. On average Wonder  Sites perform better than any industry leading website builder. We use NextJs, Vercel and Google Cloud for your websites. You can scale to 100 million monthly active users with this stack.",
      image: "https://dazzling-cat.netlify.app/performancewebsite.png",
      alt: "Fast website performance metrics",
      imageFirst: false
    },
    {
      title: "In-built",
      highlight: "analytics",
      description: "See your page views, visitors, referrers, clicks, and much more for all of your websites. Wonder  provides Inbuilt analytics for all your sites to help you find out where people are finding your blog, which links people are clicking the most, which of your posts are popular.",
      image: "https://dazzling-cat.netlify.app/analyticsseo.png",
      alt: "Website analytics dashboard",
      imageFirst: true
    },
    {
      title: "Integrates with",
      highlight: "your existing apps",
      description: "Wonder integrates with the tools you already use. Connect to Slack for notifications, embed your live chat widget from Intercom, Hubspot, Crisp and more. Need your app connected to Wonder  Sites? We got you covered.",
      image: "https://dazzling-cat.netlify.app/integrationsdb.png",
      alt: "App integrations",
      imageFirst: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful features with <span className="text-orange-600">simplicity in mind</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Everything you need to create, publish, and grow your web presence - without the complexity
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-center"
            >
              {/* Image Section */}
              <div className={`relative mb-10 lg:mb-0 ${feature.imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 p-2">
                  <Image 
                    src={feature.image}
                    alt={feature.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -z-10 top-0 left-0 w-full h-full bg-orange-100 rounded-2xl transform rotate-3 translate-x-4 translate-y-6 opacity-30"></div>
              </div>

              {/* Content Section */}
              <div className={feature.imageFirst ? 'lg:order-2' : 'lg:order-1'}>
                <div className="max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    {feature.title}{" "}
                    <span className="font-serif font-normal text-orange-600">
                      {feature.highlight}
                    </span>
                  </h3>
                  
                  <p className="text-slate-700 text-lg mb-8">
                    {feature.description}
                  </p>
                  
                  <Link 
                    href="https://app.crabshq.com" 
                    className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors duration-200 shadow-sm hover:shadow-md"
                    rel="noopener" 
                    target="_blank" 
                  >
                    <span>Create a free account</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 max-w-4xl mx-auto shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ship production ready apps on top of Notion
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Start creating beautiful, high-performance websites with Wonder  today.
            </p>
            <Link 
              href="https://app.crabshq.com" 
              className="inline-flex items-center px-8 py-4 bg-orange-700 text-white font-medium rounded-md hover:bg-orange-500 transition-colors duration-200 shadow-lg text-lg"
              rel="noopener" 
              target="_blank" 
            >
              Create Your Site
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateDesign;