import Link from 'next/link';
// Image import is present but not used in this specific policy content
import Image from 'next/image';

export const metadata = {
    title: 'Crabs HQ Terms of Service', // More specific title
    description: 'Terms of Service for using Crabs HQ (crabshq.com)', // More specific description
    alternates: {
        canonical: "https://crabshq.com/terms",
      },
    openGraph: {
        title: 'Crabs HQ Terms of Service', // Consistent title
        description: 'Read the terms governing your use of the Crabs HQ platform.', // Specific OG description
        url: "https://crabshq.com/terms", // Add URL
        siteName: 'Crabs HQ', // Add site name
        images: [
            {
                url: "https://dazzling-cat.netlify.app/WonderSites_socialshare.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ - Notion to Website", // More relevant alt text
            },
        ],
        locale: 'en_US', // Optional: Specify locale
        type: 'website',
    },
    twitter: {
        card: "summary_large_image",
        title: 'Crabs HQ Terms of Service', // Consistent title
        description: 'Read the terms governing your use of the Crabs HQ platform.', // Specific Twitter description
        images: [
            {
                url: "https://dazzling-cat.netlify.app/WonderSites_socialshare.png",
                alt: "Crabs HQ - Notion to Website", // More relevant alt text
            },
        ],
    },
};


export default function TermsOfServicePage() { // Renamed component
    return (
        <section>
            <div className="max-w-3xl mx-auto px-4 sm:px-6"> {/* Adjusted max-width */}
                <div className="pt-12 pb-12 md:pt-16 md:pb-20"> {/* Adjusted padding */}

                    {/* Page header */}
                    <div className="pb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Terms of Service</h1>
                        <p className="text-gray-600"><strong>Last Updated:</strong> May 2, 2025</p>
                    </div>

                    {/* Terms Content Start */}
                    <div className="prose prose-lg max-w-none"> {/* Using Tailwind Typography */}

                        {/* Table of Contents */}
                        <div className="mb-8 p-4 border rounded bg-gray-50">
                            <h2 className="text-xl font-semibold mb-3">Table of Contents</h2>
                            <ol className="list-decimal list-inside space-y-1">
                                <li><a href="#overview" className="text-blue-600 hover:underline">Overview</a></li>
                                <li><a href="#eligibility-account-use" className="text-blue-600 hover:underline">Eligibility and Account Use</a></li>
                                <li><a href="#general-conditions" className="text-blue-600 hover:underline">General Conditions</a></li>
                                <li><a href="#info-accuracy" className="text-blue-600 hover:underline">Accuracy, Completeness and Timeliness of Information (on Crabs HQ)</a></li>
                                <li><a href="#modifications-prices" className="text-blue-600 hover:underline">Modifications to the Service and Prices</a></li>
                                <li><a href="#service-description" className="text-blue-600 hover:underline">Service Description and Limitations</a></li>
                                <li>
                                    <a href="#billing-account-payments" className="text-blue-600 hover:underline">Billing, Account Information, and Payments</a>
                                    <ul className="list-disc list-inside ml-5 mt-1">
                                      <li><a href="#refund-policy" className="text-blue-600 hover:underline">Refund Policy</a></li>
                                    </ul>
                                </li>
                                <li><a href="#optional-tools" className="text-blue-600 hover:underline">Optional Tools and Integrations</a></li>
                                <li><a href="#third-party" className="text-blue-600 hover:underline">Third-Party Links and Services (including Notion)</a></li>
                                <li><a href="#user-content" className="text-blue-600 hover:underline">User Content, Feedback, and Responsibilities</a></li>
                                <li><a href="#personal-information" className="text-blue-600 hover:underline">Personal Information</a></li>
                                <li><a href="#errors-omissions" className="text-blue-600 hover:underline">Errors, Inaccuracies and Omissions (on Crabs HQ)</a></li>
                                <li><a href="#prohibited-uses" className="text-blue-600 hover:underline">Prohibited Uses</a></li>
                                <li><a href="#disclaimer-liability" className="text-blue-600 hover:underline">Disclaimer of Warranties; Limitation of Liability</a></li>
                                <li><a href="#indemnification" className="text-blue-600 hover:underline">Indemnification</a></li>
                                <li><a href="#severability" className="text-blue-600 hover:underline">Severability</a></li>
                                <li><a href="#termination" className="text-blue-600 hover:underline">Termination</a></li>
                                <li><a href="#entire-agreement" className="text-blue-600 hover:underline">Entire Agreement</a></li>
                                <li><a href="#governing-law" className="text-blue-600 hover:underline">Governing Law</a></li>
                                <li><a href="#changes-tos" className="text-blue-600 hover:underline">Changes to Terms of Service</a></li>
                                <li><a href="#contact-info" className="text-blue-600 hover:underline">Contact Information</a></li>
                            </ol>
                        </div>

                        <hr className="my-8" />



                        {/* --- Overview --- */}
                        <h2 id="overview">Overview</h2>
                        <p>This website and service (<code>https://crabshq.com</code>) is operated by Crabs HQ ([Boring Sites LLC] "we", "us", "our"). Crabs HQ offers this platform, including all information, tools, and services available from this site (the "Service") to you, the user ("you"), conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.</p>
                        <p>By visiting our site and/or using our Service (e.g., creating an account, building a site, purchasing a subscription), you engage in our Service and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and policies referenced herein and/or available by hyperlink (such as our Privacy Policy). These Terms apply to all users of the Site and Service, including browsers, customers, and contributors of content or feedback.</p>
                        <p>Please read these Terms carefully before accessing or using our Service. By accessing or using any part of the Service, you agree to be bound by these Terms. If you do not agree to all the terms, then you may not access the website or use any Service. If these Terms are considered an offer, acceptance is expressly limited to these Terms.</p>
                        <p>Any new features or tools added to the current Service shall also be subject to these Terms. You can review the most current version of the Terms at any time on this page. We reserve the right to update, change, or replace any part of these Terms by posting updates/changes to our website. It is your responsibility to check this page periodically. Your continued use of or access to the Service following the posting of changes constitutes acceptance of those changes.</p>
                        <p>Our payment processing is handled by third-party providers (e.g., Stripe). Their terms and privacy policies also apply to payment transactions.</p>

                        <hr className="my-8" />

                        {/* --- 1. Eligibility and Account Use --- */}
                        <h2 id="eligibility-account-use">1. Eligibility and Account Use</h2>
                        <p>By agreeing to these Terms, you represent that you are at least the age of majority in your jurisdiction of residence, or that you are the age of majority and have given us consent to allow any minor dependents to use this site under your supervision.</p>
                        <p>You are responsible for maintaining the security of your account and password. You may not use our Service for any illegal or unauthorized purpose nor may you violate any laws in your jurisdiction (including copyright laws) through your use of the Service or the content you publish via the Service.</p>
                        <p>You must not transmit any worms, viruses, or malicious code. You must not attempt to compromise the integrity or security of the Service or its underlying infrastructure.</p>
                        <p>A breach or violation of any Term will result in immediate termination of your Services.</p>

                        <hr className="my-8" />

                        {/* --- 2. General Conditions --- */}
                        <h2 id="general-conditions">2. General Conditions</h2>
                        <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
                        <p>You understand that your content provided to the Service (e.g., Notion content linked for site generation, configuration settings - <strong>not</strong> including encrypted credit card information) may be transferred unencrypted over various networks and may be changed to conform to technical requirements. Credit card information is always encrypted during transfer over networks via our payment processor.</p>
                        <p>You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service without express written permission from us.</p>
                        <p>The headings used are for convenience only and do not limit or affect these Terms.</p>

                        <hr className="my-8" />

                        {/* --- 3. Accuracy, Completeness and Timeliness of Information (on Crabs HQ) --- */}
                        <h2 id="info-accuracy">3. Accuracy, Completeness and Timeliness of Information (on Crabs HQ)</h2>
                        <p>We are not responsible if information made available <em>on the Crabs HQ website (<code>crabshq.com</code>)</em> itself (e.g., marketing materials, documentation) is not accurate, complete, or current. This material is for general information only and should not be the sole basis for decisions without consulting primary sources. Any reliance on the material on <em>this</em> site is at your own risk. This section does not apply to the content of websites <em>you</em> create using the Service.</p>
                        <p>Our site may contain historical information provided for reference only. We reserve the right to modify the contents of <em>our</em> site at any time, but have no obligation to update any information. You agree it is your responsibility to monitor changes to <em>our</em> site.</p>

                        <hr className="my-8" />

                        {/* --- 4. Modifications to the Service and Prices --- */}
                        <h2 id="modifications-prices">4. Modifications to the Service and Prices</h2>
                        <p>Prices for our Service (e.g., subscription plans) are subject to change without notice.</p>
                        <p>We reserve the right at any time to modify or discontinue the Service (or any part, feature, or content thereof) without notice.</p>
                        <p>We shall not be liable to you or any third-party for any modification, price change, suspension, or discontinuance of the Service.</p>

                        <hr className="my-8" />

                        {/* --- 5. Service Description and Limitations --- */}
                        <h2 id="service-description">5. Service Description and Limitations</h2>
                        <p>Crabs HQ provides a platform enabling users to generate and publish websites based on content managed within their Notion workspace.</p>
                        <p>We reserve the right, but are not obligated, to limit the sales or provision of our Service to any person, geographic region, or jurisdiction. We may exercise this right case-by-case. We reserve the right to limit the features or plans available. All descriptions of the Service or pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any part of the Service at any time. Any offer is void where prohibited.</p>
                        <p>We do not warrant that the quality or functionality of the Service, or websites generated through it, will meet your specific expectations, or that any errors in the Service will be corrected. The final appearance and functionality depend on Notion's content structure, our platform's capabilities, and potential limitations of Notion's API or web technologies.</p>

                        <hr className="my-8" />

                        {/* --- 6. Billing, Account Information, and Payments --- */}
                        <h2 id="billing-account-payments">6. Billing, Account Information, and Payments</h2>
                        <p>We reserve the right to refuse any order or subscription you place with us. We may, in our discretion, limit or cancel plans purchased per person or account. If we change or cancel an order/subscription, we may attempt to notify you via the email or billing information provided.</p>
                        <p>You agree to provide current, complete, and accurate purchase and account information for all subscriptions. You agree to promptly update your account and other information (email, payment method details) so we can complete transactions and contact you.</p>

                        <h3 id="refund-policy" className="text-xl font-semibold mt-6 mb-2">Refund Policy</h3>
                        <p className=" text-slate-800">There is a 14 day refund policy.</p>

                        <hr className="my-8" />

                        {/* --- 7. Optional Tools and Integrations --- */}
                        <h2 id="optional-tools">7. Optional Tools and Integrations</h2>
                        <p>We may provide you with access to third-party tools or integrations (beyond the core Notion connection) over which we neither monitor nor have control nor input.</p>
                        <p>You acknowledge and agree we provide access to such tools ”as is” and “as available” without warranties, representations, or conditions, and without endorsement. We have no liability arising from or relating to your use of optional third-party tools.</p>
                        <p>Any use is entirely at your own risk and discretion. You should ensure you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>
                        <p>We may also offer new services/features/integrations in the future, which will also be subject to these Terms.</p>

                        <hr className="my-8" />

                        {/* --- 8. Third-Party Links and Services (including Notion) --- */}
                        <h2 id="third-party">8. Third-Party Links and Services (including Notion)</h2>
                        <p>Certain content or services available via our Service may include materials or links from third-parties. Our Service relies heavily on the availability and functionality of Notion and its API.</p>
                        <p>Third-party links on <em>this</em> site (<code>crabshq.com</code>) may direct you to websites not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and do not warrant liability for third-party materials or websites linked <em>from our site</em>.</p>
                        <p>We are not liable for harm or damages related to transactions made in connection with third-party websites. Review third-party policies carefully. Complaints regarding third-party products should be directed to the third-party.</p>
                        <p>Furthermore, Crabs HQ is not responsible for the content, functionality, or privacy practices of third-party services or code that <em>you</em> choose to embed or link to on the websites <em>you create</em> using our Service. You are responsible for ensuring any third-party integrations you add to your site comply with applicable laws and terms.</p>
                        <p>Your use of Notion is governed by Notion's own Terms of Service and Privacy Policy. We are not responsible for Notion's service availability, data handling practices, or changes to their API that may affect our Service.</p>

                         <hr className="my-8" />

                        {/* --- 9. User Content, Feedback, and Responsibilities --- */}
                        <h2 id="user-content">9. User Content, Feedback, and Responsibilities</h2>
                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li><strong>Feedback:</strong> If you send us ideas, suggestions, proposals, or other materials ("Feedback"), you agree we may use, edit, copy, publish, distribute, and translate such Feedback without restriction or compensation. We are under no obligation to maintain Feedback in confidence, pay for it, or respond to it.</li>
                            <li><strong>Notion Content:</strong> You retain ownership of the content you create and manage within your Notion workspace ("Notion Content"). By connecting your Notion account and using the Service to build a website, you grant Crabs HQ a limited, non-exclusive, worldwide, royalty-free license to access, use, reproduce, modify (for formatting/display purposes), publish, and distribute your selected Notion Content solely for the purpose of providing the Service to you and displaying it on the website you create.</li>
                            <li><strong>User Site Content & Responsibility:</strong> You are solely responsible for all content, data, and information displayed on the websites you create using the Crabs HQ Service ("User Site Content"), including its legality, accuracy, appropriateness, and compliance with intellectual property laws and other regulations. You represent and warrant that you have all necessary rights to publish your User Site Content. Crabs HQ does not pre-screen or endorse User Site Content but reserves the right (though not the obligation) to remove content or suspend sites that violate these Terms or applicable law.</li>
                            <li><strong>Prohibited Content:</strong> You agree your Notion Content and User Site Content will not violate any third-party right (copyright, trademark, privacy, etc.), contain libelous, unlawful, abusive, or obscene material, or contain malware. You may not use false identities or mislead us or others.</li>
                            <li><strong>Monitoring:</strong> We may, but have no obligation to, monitor, edit, or remove content we determine in our sole discretion is unlawful, offensive, threatening, libelous, defamatory, obscene, or otherwise objectionable or violates any party’s IP or these Terms.</li>
                            <li><strong>Liability:</strong> We take no responsibility and assume no liability for any Notion Content or User Site Content posted by you or any third-party.</li>
                        </ul>

                        <hr className="my-8" />

                        {/* --- 10. Personal Information --- */}
                        <h2 id="personal-information">10. Personal Information</h2>
                        <p>Your submission and our collection and use of personal information through the Service is governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>

                        <hr className="my-8" />

                        {/* --- 11. Errors, Inaccuracies and Omissions (on Crabs HQ) --- */}
                        <h2 id="errors-omissions">11. Errors, Inaccuracies and Omissions (on Crabs HQ)</h2>
                        <p>Occasionally there may be information on <em>our Site</em> or in the Service description that contains typographical errors, inaccuracies, or omissions relating to features, pricing, promotions, or availability. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders/subscriptions if any information is inaccurate at any time without prior notice (including after you have subscribed).</p>
                        <p>We undertake no obligation to update, amend, or clarify information <em>on our Site</em> or in the Service, including pricing, except as required by law. No specified update date should be taken to indicate all information has been modified.</p>

                        <hr className="my-8" />

                        {/* --- 12. Prohibited Uses --- */}
                        <h2 id="prohibited-uses">12. Prohibited Uses</h2>
                        <p>In addition to other prohibitions in these Terms, you are prohibited from using the Service or the websites created with it:</p>
                        <ol type="a" className="list-alpha list-inside space-y-1 mb-4"> {/* Using list-alpha */}
                            <li>for any unlawful purpose;</li>
                            <li>to solicit others to perform or participate in unlawful acts;</li>
                            <li>to violate regulations, rules, laws, or ordinances;</li>
                            <li>to infringe upon or violate our intellectual property rights or those of others;</li>
                            <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate;</li>
                            <li>to submit false or misleading information;</li>
                            <li>to upload or transmit viruses or malicious code affecting the Service, related websites, user sites, or the Internet;</li>
                            <li>to collect or track the personal information of others without consent/legal basis;</li>
                            <li>for spamming, phishing, pharming, pretexting, spidering, crawling, or scraping;</li>
                            <li>for any obscene or immoral purpose;</li>
                            <li>to interfere with or circumvent the security features of the Service, Notion, related websites, or the Internet;</li>
                            <li>to host content related to illegal activities, hate speech, or dangerous organizations;</li>
                            <li>to create phishing sites or sites impersonating others;</li>
                            <li>in a manner that imposes an unreasonable load on our infrastructure or disrupts the service for others.</li>
                        </ol>
                        <p>We reserve the right to terminate your use of the Service for violating any prohibited uses.</p>

                        <hr className="my-8" />

                         {/* --- 13. Disclaimer of Warranties; Limitation of Liability --- */}
                        <h2 id="disclaimer-liability">13. Disclaimer of Warranties; Limitation of Liability</h2>
                        <p>We do not guarantee, represent, or warrant that your use of our Service will be uninterrupted, timely, secure, or error-free. The Service depends on third parties like Notion and hosting providers, whose availability we do not control.</p>
                        <p>We do not warrant that the results obtained from the use of the Service (e.g., website appearance, performance, SEO) will be accurate, reliable, or meet your requirements.</p>
                        <p>You agree we may remove the Service for indefinite periods or cancel it at any time, without notice (though we endeavor to provide notice for significant changes).</p>
                        <p>You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service is provided 'as is' and 'as available' for your use, without any representation, warranties, or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</p>
                        <p>In no case shall Crabs HQ ([Specify Legal Entity Name]), our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of the Service or any content generated via the Service, or for any other claim related in any way to your use of the Service, including errors or omissions in content, or loss/damage incurred as a result of using the Service or content made available via it, even if advised of their possibility. Because some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, in such jurisdictions, our liability shall be limited to the maximum extent permitted by law.</p>

                        <hr className="my-8" />

                        {/* --- 14. Indemnification --- */}
                        <h2 id="indemnification">14. Indemnification</h2>
                        <p>You agree to indemnify, defend, and hold harmless Crabs HQ ([Specify Legal Entity Name]) and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms, the documents they incorporate by reference, your violation of any law or the rights of a third-party, or the content you publish on websites created using the Service.</p>

                        <hr className="my-8" />

                        {/* --- 15. Severability --- */}
                        <h2 id="severability">15. Severability</h2>
                        <p>If any provision of these Terms is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed severed. This determination shall not affect the validity and enforceability of other remaining provisions.</p>

                        <hr className="my-8" />

                        {/* --- 16. Termination --- */}
                        <h2 id="termination">16. Termination</h2>
                        <p>Obligations and liabilities incurred prior to termination shall survive termination.</p>
                        <p>These Terms are effective unless and until terminated by either you or us. You may terminate by notifying us you no longer wish to use our Services, or when you cease using our site and cancel any active subscriptions according to our cancellation process.</p>
                        <p>If in our sole judgment you fail, or we suspect you have failed, to comply with any term or provision, we may terminate this agreement at any time without notice. You will remain liable for all amounts due up to and including the date of termination; and/or we may deny you access to our Services (or any part thereof). We also reserve the right to terminate accounts for any reason with reasonable notice where practicable.</p>

                        <hr className="my-8" />

                        {/* --- 17. Entire Agreement --- */}
                        <h2 id="entire-agreement">17. Entire Agreement</h2>
                        <p>Our failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver.</p>
                        <p>These Terms and any policies or operating rules posted by us on this site or in respect to the Service (including the Privacy Policy) constitute the entire agreement and understanding between you and us, governing your use of the Service, superseding any prior or contemporaneous agreements, communications, and proposals, oral or written (including prior versions of the Terms).</p>
                        <p>Any ambiguities in interpretation shall not be construed against the drafting party.</p>

                        <hr className="my-8" />

                        {/* --- 18. Governing Law --- */}
                        <h2 id="governing-law">18. Governing Law</h2>
                        <p>These Terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of [Specify Jurisdiction, e.g., State of Delaware, USA / England and Wales, UK / Province of Ontario, Canada]. You agree to submit to the exclusive jurisdiction of the courts located in [Specify City/Region and Country corresponding to Jurisdiction] for resolving any legal matter arising from the Terms.</p>

                        <hr className="my-8" />

                        {/* --- 19. Changes to Terms of Service --- */}
                        <h2 id="changes-tos">19. Changes to Terms of Service</h2>
                        <p>You can review the most current version of the Terms of Service at any time on this page.</p>
                        <p>We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes constitutes acceptance of those changes.</p>

                        <hr className="my-8" />

                        {/* --- 20. Contact Information --- */}
                        <p>Questions about the Terms of Service should be sent to us at:</p>
                        <ul className="list-none space-y-1 mb-4"> {/* Using list-none for cleaner look */}
              <li><strong>Email:</strong> <a href="mailto:querykitty@gmail.com" className="text-blue-600 hover:underline">querykitty@gmail.com</a></li>
              <li><strong>Mailing Address:</strong> Boring Sites LLC , Delaware</li>
            </ul>

                    </div>
                    {/* Terms Content End */}

                </div>
            </div>
        </section>
    );
}