import Link from 'next/link';
// Image import is present but not used in this specific policy content
import Image from 'next/image';

export const metadata = {
  title: 'Crabs HQ Privacy Policy | OpenClaw AI Workforce Platform',
  description: 'Privacy Policy for Crabs HQ - how we handle your data in our OpenClaw-powered AI workforce platform. Learn about data collection, storage, and your rights.',
  alternates: {
    canonical: "https://crabshq.com/privacy",
  },
  openGraph: {
    title: 'Privacy Policy - Crabs HQ',
    description: 'How Crabs HQ protects your data while running AI workforce teams with OpenClaw AI, ClawdBot, and GitHub integrations.',
    url: "https://crabshq.com/privacy",
    siteName: 'Crabs HQ',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ - OpenClaw AI Workforce Platform",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Privacy Policy - Crabs HQ',
    description: 'How Crabs HQ protects your data while running AI workforce teams with OpenClaw AI.',
    site: '@Crabs_HQ',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        alt: "Crabs HQ - OpenClaw AI Workforce Platform",
      },
    ],
  },
};

export default function PrivacyPolicyPage() { // Renamed component for clarity
  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6"> {/* Adjusted max-width for readability */}
        <div className="pt-12 pb-12 md:pt-16 md:pb-20"> {/* Adjusted padding */}

          {/* Page header */}
          <div className="pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Privacy Policy</h1>
            <p className="text-gray-600"><strong>Effective Date:</strong> May 2, 2025</p>
          </div>

          {/* Privacy Policy Content Start */}
          <div className="prose prose-lg max-w-none"> {/* Using Tailwind Typography for basic styling */}

            {/* Table of Contents */}
            <div className="mb-8 p-4 border rounded bg-gray-50">
              <h2 className="text-xl font-semibold mb-3">Table of Contents</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="#overview" className="text-red-600 hover:underline">Overview</a></li>
                <li><a href="#personal-information-we-collect" className="text-red-600 hover:underline">Personal Information We Collect</a></li>
                <li><a href="#how-do-we-use-your-personal-information" className="text-red-600 hover:underline">How Do We Use Your Personal Information?</a></li>
                <li><a href="#sharing-your-personal-information" className="text-red-600 hover:underline">Sharing Your Personal Information</a></li>
                <li><a href="#anonymous-performance-data-collection" className="text-red-600 hover:underline">Anonymous Performance Data Collection</a></li>
                <li><a href="#behavioral-advertising" className="text-red-600 hover:underline">Behavioral Advertising</a></li>
                <li><a href="#do-not-track" className="text-red-600 hover:underline">Do Not Track</a></li>
                <li><a href="#lawful-basis" className="text-red-600 hover:underline">Lawful Basis (for EEA Residents)</a></li>
                <li>
                  <a href="#your-rights" className="text-red-600 hover:underline">Your Rights</a>
                  <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                    <li><a href="#gdpr" className="text-red-600 hover:underline">GDPR (EEA Residents)</a></li>
                    <li><a href="#ccpa" className="text-red-600 hover:underline">CCPA (California Residents)</a></li>
                    <li><a href="#cookies" className="text-red-600 hover:underline">Cookies</a></li>
                  </ul>
                </li>
                <li><a href="#data-retention" className="text-red-600 hover:underline">Data Retention</a></li>
                <li><a href="#changes" className="text-red-600 hover:underline">Changes</a></li>
                <li><a href="#contact-us" className="text-red-600 hover:underline">Contact Us</a></li>
              </ul>
            </div>

            <hr className="my-8" />


            {/* Sections */}
            <h2 id="overview">Overview</h2>
            <p>This Privacy Policy describes how Crabs HQ ("we," "us," or "our") collects, uses, and shares your personal information when you visit or use the services provided through <code>https://crabshq.com</code> (the “Service” or “Site”). This policy applies to users of the Crabs HQ platform. Please note that websites created <em>by our users</em> using the Crabs HQ service are governed by the privacy policies of those individual site owners.</p>

            <hr className="my-8" />

            <h2 id="personal-information-we-collect">Personal Information We Collect</h2>
            <p>When you use the Service, we collect certain information:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>
                <strong>Information You Provide Directly:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  <li><strong>Account Information:</strong> When you register for an account, we collect information such as your name, email address, and password (stored securely using hashing).</li>
                  <li><strong>Payment Information:</strong> If you subscribe to a paid plan, we collect payment details (like credit card numbers, billing address). This information is typically processed directly by our third-party payment processor (e.g., Stripe) and we generally only store minimal information like the last four digits of your card or billing address for identification and compliance.</li>
                  <li><strong>Notion Integration Information:</strong> To connect your Notion account, we may require API keys or other authentication tokens. We handle this information securely to enable the core functionality of the Service.</li>
                  <li><strong>Communications:</strong> If you contact us for support or other inquiries, we collect the information you provide in those communications.</li>
                </ul>
              </li>
              <li>
                <strong>Information Collected Automatically:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  <li><strong>Device Information:</strong> When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.</li>
                  <li><strong>Usage Information:</strong> As you navigate and interact with the Service (our website <code>crabshq.com</code>, not the sites you build), we collect information about how you use the Service, such as the pages you view, features you use, and actions you take. We refer to this automatically-collected information collectively with device details as “Usage & Device Information.”</li>
                </ul>
              </li>
            </ol>
            <p>We collect Usage & Device Information using technologies like:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
                <li><strong>“Cookies”</strong>: Data files placed on your device, often including an anonymous unique identifier. Learn more at <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">allaboutcookies.org</a>.</li>
                <li><strong>“Log files”</strong>: Track actions on the Site, collecting data like IP address, browser type, ISP, referring/exit pages, and date/time stamps.</li>
                <li><strong>“Web beacons,” “tags,” and “pixels”</strong>: Electronic files used to record information about Browse activity.</li>
            </ul>
            <p>When we refer to “Personal Information” in this Privacy Policy, we mean Account Information, Payment Information, Notion Integration Information, Communications, and Usage & Device Information.</p>

            <hr className="my-8" />

            <h2 id="how-do-we-use-your-personal-information">How Do We Use Your Personal Information?</h2>
            <p>We use the Personal Information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Provide and Maintain the Service:</strong> Operate the Crabs HQ platform, authenticate users, connect to Notion accounts, process payments, and fulfill our contractual obligations to you.</li>
              <li><strong>Communicate with You:</strong> Respond to support requests, send service-related announcements (e.g., maintenance, security alerts, account notifications), and, if aligned with your preferences, send marketing communications about our products or services (you can opt-out).</li>
              <li><strong>Improve and Optimize the Service:</strong> Analyze how users interact with our Site and Service to understand usage patterns, identify areas for improvement, assess the success of features or marketing campaigns, and enhance user experience (e.g., using analytics).</li>
              <li><strong>Screen for Risk and Fraud:</strong> Use information (particularly Payment Information and Usage & Device Information like IP addresses) to detect and prevent fraudulent activity, security incidents, and abuse.</li>
              <li><strong>Comply with Legal Obligations:</strong> Fulfill applicable legal requirements, respond to lawful requests, and enforce our terms of service.</li>
            </ul>

            <hr className="my-8" />

            <h2 id="sharing-your-personal-information">Sharing Your Personal Information</h2>
            <p>We share your Personal Information with third parties in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Service Providers:</strong> We engage third-party companies and individuals to perform services on our behalf (e.g., payment processing [like Stripe], website hosting and infrastructure [like Vercel or AWS], data analytics, email delivery, customer support platforms). These providers only have access to the Personal Information necessary to perform their tasks and are obligated not to disclose or use it for other purposes. <em>[Ensure this list reflects your actual providers]</em></li>
              <li><strong>Notion:</strong> We share necessary authentication information (handled securely) with Notion to enable the integration you authorize. Notion's use of your data is governed by their own privacy policy.</li>
              <li><strong>Legal Compliance and Protection:</strong> We may disclose your Personal Information if required by law, regulation, legal process (like a subpoena or search warrant), or governmental request, or to protect the rights, property, or safety of Crabs HQ, our users, or the public.</li>
              <li><strong>Business Transfers:</strong> If Crabs HQ is involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, your Personal Information may be transferred as part of that transaction, subject to standard confidentiality arrangements.</li>
            </ul>
            <p>We do <strong>not</strong> sell your Personal Information.</p>

            <hr className="my-8" />

            <h2 id="anonymous-performance-data-collection">Anonymous Performance Data Collection</h2>
            <p>Crabs HQ gathers anonymous performance data to assess platform and content delivery network (CDN) performance for the websites built using our service.</p>
            <p>We gather information about the time it takes to deliver and render page content for sites hosted via our platform. This helps us ensure our platform and CDN are working optimally for speed and efficiency, ensuring user-created sites perform well.</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Potential Domain:</strong> <code>vitals.vercel-insights.com</code> (if using Vercel infrastructure)</li>
              <li><strong>Type:</strong> Beacon/Analytics Endpoint</li>
              <li><strong>Data Collected:</strong> Anonymous performance metrics (e.g., Core Web Vitals).</li>
              <li><strong>Personal or identifiable data collected:</strong> None.</li>
            </ul>
            <p>The analytics captured are performance data only, are completely anonymous, and generally add negligible load time. No IP address, location, or other personal information is gathered via this specific mechanism, and cookies are typically not used or stored for this purpose by the beacon itself. While GDPR principles may not strictly apply to fully anonymous data, we disclose this practice for transparency.</p>

            <hr className="my-8" />

             <h2 id="behavioral-advertising">Behavioral Advertising</h2>
            <p>As described above, we may use your Personal Information (primarily Usage & Device Information collected on <code>crabshq.com</code>) to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, visit the Network Advertising Initiative’s (“NAI”) educational page: <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.</p>
            <p>We might share information about your use of our Site and your interaction with our ads on other websites with advertising partners, sometimes through cookies or similar technologies (subject to your consent where required). <em>[Review if this section accurately reflects your practices]</em></p>
            <p>You can opt out of targeted advertising using these links:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
                <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">https://www.facebook.com/settings/?tab=ads</a></li>
                <li><strong>Google:</strong> <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">https://www.google.com/settings/ads/anonymous</a></li>
                <li><strong>Twitter:</strong> <a href="https://twitter.com/settings/your_twitter_data/audiences" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">https://twitter.com/settings/your_twitter_data/audiences</a> (Link may vary, check Twitter settings)</li>
            </ul>
            <p>Additionally, you can opt out of some services via the Digital Advertising Alliance’s portal: <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">http://optout.aboutads.info/</a>.</p>

            <hr className="my-8" />

            <h2 id="do-not-track">Do Not Track</h2>
            <p>Please note that we do not alter our Site’s data collection and use practices when we detect a Do Not Track signal from your browser, as there is no industry-standard approach to responding to DNT signals.</p>

            <hr className="my-8" />

            <h2 id="lawful-basis">Lawful Basis (for EEA Residents)</h2>
            <p>If you are a resident of the European Economic Area (“EEA”), pursuant to the General Data Protection Regulation (“GDPR”), we process your personal information under the following lawful bases:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Your consent (where applicable, e.g., for non-essential cookies or marketing emails);</li>
                <li>The performance of the contract between you and the Site (i.e., providing the Crabs HQ service you signed up for);</li>
                <li>Compliance with our legal obligations;</li>
                <li>To protect your vital interests or those of another person;</li>
                <li>To perform a task carried out in the public interest (less common for our service);</li>
                <li>For our legitimate interests (e.g., improving the service, preventing fraud, security), provided these do not override your fundamental rights and freedoms.</li>
            </ul>

            <hr className="my-8" />

            <h2 id="your-rights">Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your Personal Information.</p>

            <h3 id="gdpr" className="text-xl font-semibold mt-6 mb-2">GDPR (EEA Residents)</h3>
            <p>If you are an EEA resident, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
                <li><strong>Access</strong> the Personal Information we hold about you.</li>
                <li>Request <strong>correction</strong> of inaccurate Personal Information.</li>
                <li>Request <strong>erasure</strong> of your Personal Information (subject to certain conditions).</li>
                <li><strong>Port</strong> your Personal Information to another service.</li>
                <li><strong>Object</strong> to processing based on legitimate interests or for direct marketing.</li>
                <li>Request <strong>restriction</strong> of processing under certain circumstances.</li>
                <li><strong>Withdraw consent</strong> at any time (where processing is based on consent), without affecting the lawfulness of processing before withdrawal.</li>
            </ul>
            <p>To exercise these rights, please contact us using the details below. You also have the right to lodge a complaint with a supervisory authority.</p>

            <h3 id="ccpa" className="text-xl font-semibold mt-6 mb-2">CCPA (California Residents)</h3>
            <p>If you are a California resident, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
                <li><strong>Know</strong> what Personal Information we collect, use, disclose, and sell (though we state we do not sell).</li>
                <li>Request <strong>deletion</strong> of your Personal Information (subject to exceptions).</li>
                <li><strong>Opt-out</strong> of the sale or sharing of Personal Information (if applicable).</li>
                <li><strong>Correct</strong> inaccurate Personal Information.</li>
                <li><strong>Limit</strong> the use and disclosure of sensitive Personal Information (if applicable).</li>
                <li><strong>Non-discrimination</strong> for exercising your CCPA rights.</li>
            </ul>
            <p>To exercise these rights, please contact us. If you wish to designate an authorized agent, please provide written authorization and contact us via the details below.</p>

            <h3 id="cookies" className="text-xl font-semibold mt-6 mb-2">Cookies</h3>
            <p>A cookie is a small file downloaded to your device when you visit our Site. We use different types: functional, performance, advertising, social media/content cookies. They help remember actions/preferences (like login), provide usage insights, and optimize your experience.</p>
            <p>Most browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Instructions are typically found in your browser's 'Help', 'Tools', or 'Edit' menus. Note that removing or blocking cookies can negatively impact your user experience and parts of our Site may become inaccessible. For more details, visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">allaboutcookies.org</a>.</p>

            <hr className="my-8" />

            <h2 id="data-retention">Data Retention</h2>
            <p>We retain your Personal Information for as long as necessary to provide the Service, fulfill the purposes outlined in this policy, comply with our legal obligations (e.g., tax, accounting), resolve disputes, and enforce our agreements. Generally, account information is kept while your account is active and for a reasonable period afterward. Usage & Device Information may be kept for shorter periods for analytics or security purposes. You can request deletion of your information as described under "Your Rights," subject to legal and operational retention needs.</p>

            <hr className="my-8" />

            <h2 id="changes">Changes</h2>
            <p>We may update this privacy policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of significant changes by posting the new policy on the Site and updating the effective date.</p>

            <hr className="my-8" />

            <h2 id="contact-us">Contact Us</h2>
            <p>For more information about our privacy practices, if you have questions, would like to exercise your rights, or wish to make a complaint, please contact us by e-mail or mail:</p>
            <ul className="list-none space-y-1 mb-4"> {/* Using list-none for cleaner look */}
              <li><strong>Email:</strong> <a href="mailto:querykitty@gmail.com" className="text-red-600 hover:underline">querykitty@gmail.com</a></li>
              <li><strong>Mailing Address:</strong> Boring Sites LLC , Delaware</li>
            </ul>
            <p>Please identify Crabs HQ as the data controller for the Personal Information collected through the <code>crabshq.com</code> service in your communication where relevant (e.g., for GDPR requests).</p>

          </div>
          {/* Privacy Policy Content End */}

        </div>
      </div>
      
    </section>
  );
}