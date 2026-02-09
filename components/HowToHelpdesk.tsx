import Image from "next/image";
import Link from "next/link";

export default function HowtoHelpdesk() {
  return (
    <section className="relative w-full">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div>

          {/* CTA Section */}
          <section className=" w-full rounded-2xl py-8 sm:py-12 px-1 sm:px-2 mt-12 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-black">
                We built the first helpdesk
                <span className=" block font-normal text-orange-600 mt-2">
                  that writes itself from support chats.
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600">
                Wonder automatically keeps your help center up to date by listening to your team communicate about your product. Here's how it works…
              </p>
            </div>

            <img
              src="https://dazzling-cat.netlify.app/marketingai.png"
              alt="Launch illustration"
              className="w-full h-auto mx-auto my-8 border rounded-2xl shadow-md"
            />

          </section>


          <section className=" rounded-3xl">
            <div className="container mx-auto">
              <div className="flex flex-col items-start space-y-6 lg:space-y-8 xl:space-y-10">
                {/* Your content lives inside Notion */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #1</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        Your content <span className="font-serif font-normal text-orange-600">lives inside Notion</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        Your work stays in a place you control and love, while Wonder handles the technical parts of publishing it to your website. This means you can focus on what's actually important to you: creating content and building your brand without worrying about configurations, plugins, downtime, performance, or security.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >
                      <img
                        src="https://dazzling-cat.netlify.app/write%20on%20notion.png"
                        alt="Write on Notion"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Optimized for SEO */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #2</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        Perfected for <span className="font-serif font-normal text-orange-600">SEO</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        All you have to do is to write good content that satisfies the needs of your readers. We take care of the rest. Set all the proper meta tags and canonical links, Structured Schema markup for all your posts, Served from the edge to make the blog super fast, Easy controls to override the SEO settings.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >                      <img
                        src="https://dazzling-cat.netlify.app/performancewebsite.png"
                        alt="Performance Website"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Easy customization */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #3</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        Membership for <span className="font-serif font-normal text-orange-600">paid subscribers.</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        Style the look and feel of your site with no-code themes and designer templates. Everything can be customized inside Wonder  without code to make you proud of the unique site you share with the world. Add custom-code only if you want to.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >                      <img
                        src="https://dazzling-cat.netlify.app/notion%20to%20website.png"
                        alt="Notion to Website"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* In-built analytics */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #4</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        In-built <span className="font-serif font-normal text-orange-600">analytics</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        See your page views, visitors, referrers, clicks, and much more for all of your websites. Wonder provides Inbuilt analytics for all your sites to help you find out where people are finding your blog, which links people are clicking the most, which of your posts are popular.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >                      <img
                        src="https://dazzling-cat.netlify.app/analyticsseo.png"
                        alt="Analytics SEO"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Support */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #5</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        Create AI Agents <span className="font-serif font-normal text-orange-600">over your content.</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        Create AI Agents for support, suggestions, sales, therapy or any other purposes you have in mind. Because it's 2025 and AI is cheap. Make AI do most of work so that you can focus on whats important.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >                      <img
                        src="https://dazzling-cat.netlify.app/aisupportreco.png"
                        alt="AI Support"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div className="bg-white rounded-3xl xl:sticky xl:top-20 border h-[600px] overflow-hidden w-full">
                  <div className="grid md:flex items-center h-full bg-white">
                    <div className="p-6 sm:p-8 lg:p-10 md:w-2/5 w-full">
                      <p className="text-sm font-bold uppercase tracking-wide text-orange-600 font-silkscreen">Step #6</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-2 sm:mt-4">
                        Integrates with <span className="font-serif font-normal text-orange-600">your existing apps</span>
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 mt-4">
                        Wonder integrates with the tools you already use. Connect to Slack for notifications, embed your live chat widget from Intercom, Hubspot, Crisp and more. Need your app connected to Crabs HQ? We got you covered.
                      </p>
                    </div>
                    <div className="w-full px-4 pt-6 md:w-3/5 rounded-md mr-4"
                      style={{
                        background: "linear-gradient(45deg, #ececec5e, #b1b1b11a)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}

                    >                      <img
                        src="https://dazzling-cat.netlify.app/integrationsdb.png"
                        alt="Integrations DB"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className=" w-full bg-slate-900 rounded-2xl py-8 sm:py-12 px-4 sm:px-6 mt-12 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                This Time, You'll Actually Launch
                <span className=" block font-normal text-orange-600 mt-2">
                  Skip the Setup Hell
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-300">
                We know you have too much on your plate.
              </p>
            </div>

            <img
              src="https://dazzling-cat.netlify.app/marry.png"
              alt="Launch illustration"
              className="max-w-2xl w-full h-auto mx-auto my-8"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto px-4">
              <Link
                href="https://app.crabshq.com"
                className="w-full sm:w-auto px-6 py-3 text-lg sm:text-xl bg-orange-700 text-black rounded-lg hover:bg-orange-700 transition-colors duration-300 text-center"
              >
                Start from 98% Ready
              </Link>
              <Link
                href="#template-section"
                className="w-full sm:w-auto px-6 py-3 text-lg sm:text-xl border border-white text-white rounded-lg hover:bg-slate-800 transition-colors duration-300 text-center"
              >
                Sites built on Wonder
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
