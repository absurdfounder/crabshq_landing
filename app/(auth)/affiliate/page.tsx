import Link from 'next/link';
import Image from 'next/image'


export const metadata = {
  title: 'Affiliate Program',
  description: 'Join the Wonder affiliate program to become our partner. Spread the website builder and earn money with us.',
  alternates: {
    canonical: "https://crabshq.com/affiliate",
  },
  openGraph: {
    images: [
        {
            url: "https://dazzling-cat.netlify.app/WonderSitesaffilate_socialshare.png",
            width: 1200,
            height: 630,
            alt: "Get a Marketplace with Notion",
        },
    ],
},
twitter: {
    card: "summary_large_image",
    images: [
        {
            url: "https://dazzling-cat.netlify.app/WonderSitesaffilate_socialshare.png",
            alt: "Get a Marketplace with Notion",
        },
    ],
},
}

export default function PageDetail() {
  return (
    <section >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-6 md:pt-4 md:pb-6">

          {/* Page header */}

<div className="relative flex items-center justify-center px-3 py-1 text-sm font-semibold leading-6 rounded-md ring-1 opacity-60 hover:ring-orange-900/20 w-fit m-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32" className="w-4 h-4 mr-1"><path fill="currentColor" d="M30.674 15.2c.033-.118.072-.233.1-.353c.006-.024.008-.048.014-.072a7.274 7.274 0 0 0-1.651-6.612a7.807 7.807 0 0 0-6.323-3.148h-.052c-.1 0-.212.007-.318.01h-.121a39.667 39.667 0 0 0-6.282.854l-4.477-.715h-.035a9.745 9.745 0 0 0-6.237 1a8.767 8.767 0 0 0-2.71 2.558l-.041.055l-.025.035a8.6 8.6 0 0 0-.108 9.45c-.019.034-.03.072-.048.107a3.972 3.972 0 0 0-.221.537c-.032.1-.056.206-.079.31c-.018.085-.036.169-.048.254a3.395 3.395 0 0 0-.022.319c0 .086-.01.17-.006.255c.007.112.02.223.038.334c.012.079.018.158.036.236c.03.123.07.244.116.362c.023.063.038.128.066.19c.082.183.182.356.3.518A3.338 3.338 0 0 0 4.424 23a2.758 2.758 0 0 0 .95 2.272a4.058 4.058 0 0 0 2.028.954c.155.503.427.962.793 1.34a3.118 3.118 0 0 0 1.905.98c.174.593.504 1.129.956 1.55c.557.548 1.303.86 2.084.87a3.372 3.372 0 0 0 1.639-.434c.744.426 1.616.57 2.458.406a3.063 3.063 0 0 0 2.117-1.509c.021-.033.033-.062.052-.095c.85.174 1.735.021 2.478-.428a3.1 3.1 0 0 0 1.4-1.67c.894.012 1.76-.31 2.427-.905a3.045 3.045 0 0 0 1.026-2.595c0-.028-.007-.05-.009-.077a3 3 0 0 0 1.358-.855a3.29 3.29 0 0 0 .52-3.804a10.214 10.214 0 0 0 2-3.556c.024-.077.044-.161.068-.244Zm-1.712-1.7a6.27 6.27 0 0 1-.329 1.474l-.032.1a8.482 8.482 0 0 1-1.418 2.448c-3.137-2.738-7.7-6.734-8.075-7.092a2.349 2.349 0 0 0-1.608-.652a1.837 1.837 0 0 0-.549.079c-.634.2-2.192.7-3.552 1.205c-.52.193-1.114-.3-1.295-.72c-.12-.252-.14-.54-.058-.806c.163-.295.437-.514.761-.608a34.491 34.491 0 0 1 9.546-1.9h.121c.111 0 .221-.008.323-.01a5.48 5.48 0 0 1 2.179.413a7.135 7.135 0 0 1 2.624 2.05a5.633 5.633 0 0 1 1.272 2.483l.009.046a5.25 5.25 0 0 1 .091.746c.003.081.008.183.008.273c0 .145 0 .289-.017.432l-.001.039ZM4.007 20.159C4 20.116 4 20.069 4 20.024a1.275 1.275 0 0 1 0-.29a1.48 1.48 0 0 1 .043-.168c.02-.089.05-.176.086-.259c.033-.06.071-.118.113-.172a1.28 1.28 0 0 1 .215-.265l.006-.005l1.881-1.595a1.2 1.2 0 0 1 1.684.22a.807.807 0 0 1 .1.708l-2.95 2.874a1.178 1.178 0 0 1-1.021-.555a.942.942 0 0 1-.15-.358Zm2.516 2.395L9.76 19.4l-.015-.015a.986.986 0 0 1 .589-.092c.257.07.489.214.666.414c.176.15.294.356.334.584a1.23 1.23 0 0 1-.146.665a.817.817 0 0 0-.026.085l-3.271 3.187a1.602 1.602 0 0 1-1.234-.5a1.117 1.117 0 0 1-.134-1.174Zm2.785 3.085l3.38-3.289c.215.043.412.153.562.314a1.3 1.3 0 0 1 .412.693a.976.976 0 0 1-.015.347l-2.923 2.845a1.168 1.168 0 0 1-1.075-.36a1.363 1.363 0 0 1-.341-.55Zm3.137 3.012a1.617 1.617 0 0 1-.418-.58l2.761-2.687c.197.065.377.172.528.313a.96.96 0 0 1 .307.433a.741.741 0 0 1 0 .385a3.019 3.019 0 0 1-.611 1.094l-.756.88h.006c-.025.016-.053.023-.076.041a1.641 1.641 0 0 1-1.026.427a1.029 1.029 0 0 1-.715-.306Zm4.474.307c-.148.023-.297.03-.446.02l.074-.086l.024-.029l.001.001a5.96 5.96 0 0 0 .764-1.221l.442.468a1.95 1.95 0 0 1-.13.273a1.081 1.081 0 0 1-.729.574Zm6.4-3.725l-1.779-1.971a.999.999 0 0 0-1.694 1.002a1 1 0 0 0 .208.336l1.436 1.6c-.01.102-.031.203-.063.3a1.139 1.139 0 0 1-.53.669a1.46 1.46 0 0 1-1.06.216l-1.2-1.274a.993.993 0 0 0-1.03-.259a2.575 2.575 0 0 0-.063-.288a2.956 2.956 0 0 0-.887-1.347a3.525 3.525 0 0 0-.985-.635a2.783 2.783 0 0 0-.035-.556a3.267 3.267 0 0 0-.977-1.777a3.152 3.152 0 0 0-1.323-.8c.005-.134 0-.267-.015-.4a2.967 2.967 0 0 0-.912-1.759a3.352 3.352 0 0 0-1.671-.951a2.702 2.702 0 0 0-.659-.045a2.606 2.606 0 0 0-.465-1.025a3.2 3.2 0 0 0-4.493-.579l-.035.028l-1.235 1.04a6.542 6.542 0 0 1 .314-6.812l.021-.03A6.793 6.793 0 0 1 6.292 7.9a7.762 7.762 0 0 1 4.982-.751l.464.074A3.056 3.056 0 0 0 10.2 8.77a3.022 3.022 0 0 0 .066 2.356a3.154 3.154 0 0 0 3.834 1.812c1.32-.489 2.834-.98 3.4-1.159a.3.3 0 0 1 .238.105c.489.46 6.392 5.627 8.858 7.776l.2.171a1.32 1.32 0 0 1-.183 1.62a1 1 0 0 1-.535.3l-1.733-1.757a1.004 1.004 0 0 0-1.432 1.406l1.656 1.678c.007.03.015.06.024.089l.012.031a2.473 2.473 0 0 1 .135.662a1.061 1.061 0 0 1-.321.943c-.299.28-.694.434-1.103.43h.003Z"></path></svg>
        Become a Wonder  Partner
      </div>

          <div className="max-w-3xl mx-auto text-center pb-4">
            <h1 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-800">Earn <b className="text-orange-600">$972 per month</b>* promoting an award-winning notion backed web app builder</h1>
            <p className="px-2 mt-6 leading-7 text-slate-600 sm:px-0 sm:text-lg sm:leading-8">
        Earn <b>30% recurring commissions</b> for every paying customer you
refer to Wonder  Sites, without limits. Join
        our affiliate program today and start earning money.
      </p>
          </div>



          <div className="m-auto text-center"><Link className="btn text-dark text-2xl bg-orange-300 hover:bg-orange-700 hover:text-orange-100 w-full mb-4 sm:w-auto sm:mb-0 flex items-center justify-center" href="https://wondersites.lemonsqueezy.com/affiliates">Sign Up</Link></div>
          <Link href="https://wondersites.lemonsqueezy.com/affiliates" target="_blank" rel="noopener"  className="block mt-8 text-sm text-orange-600 sm:mt-4 m-auto w-fit">Already partner? Open the affiliate dashboard →</Link>



          {/* Items */}
          <div className="max-w-sm mx-auto items-start md:max-w-2xl lg:max-w-none mt-20">


            <div className="py-12">
              <div className="max-w-md mx-auto">
                <div className="text-center">
                  <h2 className="h2 font-bold leading-tight">How it works</h2>
                  <div className="mt-4 text-slate-600">
                    <p className="text-md mt-4 mb-4 text-slate-800">You can start earning money in 30 minutes.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <ul className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                  <li className="flex flex-col items-center">
                    <div className="relative">
                      <Image 
                      width={300}
                      height={100}
                      src="/images/Group 8770.png" alt="Become a partner" className="h-40 p-4" />
                      <div className="absolute -right-4 -bottom-4">
                        {/* SVG icon */}
                      </div>
                    </div>
                    <div className="mt-4 text-center">Join Wonder  Sites's affiliate program, grab your unique link and share it.</div>
                  </li>
                  <li className="flex flex-col items-center">
                    <div className="relative">
                      <Image src="/images/Group 8771 (1).png" alt="Earn money" width={300} height={100} className="h-40 p-4" />
                      <div className="absolute -right-4 -bottom-4">
                        {/* SVG icon */}
                      </div>
                    </div>
                    <div className="mt-4 text-center">Someone clicks your link and upgrades to a paid plan. You earn 33% of all their payments.</div>
                  </li>
                  <li className="flex flex-col items-center">
                    <div className="relative">
                      <Image src="/images/Group 8772.png" alt="Cash out in one click" width={300} height={100} className="h-40 p-4" />
                    </div>
                    <div className="mt-4 text-center">Check in anytime to view referrals. Cash out in one click (Bank, Paypal, Wise).</div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link href="https://wondersites.lemonsqueezy.com/affiliates" target="_self" className="btn text-dark text-2xl bg-orange-300 hover:bg-orange-700 hover:text-orange-100 w-full mb-4 sm:w-auto sm:mb-0 flex items-center justify-center">Become our Partner</Link>
              </div>
            </div>


          </div>




          <div className="max-w-7xl  container mx-auto py-8">
            <div className="flex gap-4 justify-center space-x-4 relative items-center p-6 bg-white rounded-2xl shadow-xl text-center h-full border w-fit m-auto">
              {/* Affiliate Detail Item */}
              <Link href="." className="flex flex-col items-center space-y-2 px-8 border p-6 rounded">
                {/* SVG icon */}
                <Image src="/images/🤑.png" alt="Cash out in one click" className="h-10" width={40} height={100}/>
                <h2 className="h2 font-semibold">33%</h2>
                <span className="text-base text-slate-600">your commission</span>
              </Link>

              {/* Affiliate Detail Item */}
              <Link href="." className="flex flex-col items-center space-y-2 px-8 border p-6 rounded">
                {/* SVG icon */}
                <Image src="/images/🍪.png" alt="Cash out in one click" className="h-10" width={40} height={100}/>
                <h2 className="h2 font-semibold">60 days</h2>
                <span className="text-base text-slate-600">cookie period</span>
              </Link>

              {/* Affiliate Detail Item */}
              <Link href="." className="flex flex-col items-center space-y-2 px-8 border p-6 rounded">
                {/* SVG icon */}
                <Image src="/images/partyblow.png" alt="Cash out in one click" className="h-10" width={40} height={100} />
                <h2 className="h2 font-semibold">10%</h2>
                <span className="text-base text-slate-600">2nd tier commission</span>
              </Link>
            </div>
          </div>





          <div className="flex mx-auto px-4 py-8 mt-8">
            <div className="w-full lg:w-1/2 p-8 m-auto">
              <h2 className="h2 font-bold text-accent">An essential collection of banners</h2>
              <br />
              <p className="text-md mt-4 mb-4 text-slate-800">We prepared designs for you to download and use right away — no extra work. Missing a format? Just ask and we will make unique design files just for you. Free of charge.</p>
            </div>
            <Image src="https://dazzling-cat.netlify.app/nb-assets.png" unoptimized alt="Banners free pack" width={100} height={100} className="w-full lg:w-1/2 p-8 m-auto" />
          </div>


          <div className="flex mx-auto px-4 py-8 mt-8">
            <Image src="https://dazzling-cat.netlify.app/freelancer-mockup.webp" unoptimized alt="Design agency" width={100} height={100} className="w-full lg:w-1/2 p-8 m-auto" />
            <div className="w-full lg:w-1/2 p-8 m-auto">
              <h2 className="h2 font-bold mb-8">You’re a freelancer or an agency</h2>
              <p className="text-md mt-4 mb-4 text-slate-800">Demonstrate your industry knowledge by recommending Wonder  to your clients and fellow marketers. This will help you create an additional revenue source for your business. "Diversification is the key to financial resilience." — Warren Buffett.</p>
            </div>
          </div>


          <div className="flex mx-auto px-4 py-8 mt-8">
            <div className="w-full lg:w-1/2 p-8 m-auto">
              <h2 className="h2 font-bold mb-8">You have an audience</h2>
              <p className="text-md mt-4 mb-4 text-slate-800">Have an X.com account that is followed by marketers? Or a website about web design? Monetize your audience by recommending them a great tool. Use our affiliate program link alongside with your existing monetization. Boost your earnings!</p>
            </div>
            <Image src="https://dazzling-cat.netlify.app/influencer-mockup.webp" unoptimized alt="Influencer" width={100} height={100} className="w-full lg:w-1/2 p-8 m-auto" />
          </div>




          <div className="pt-12 pb-16 relative z-10 bg-white">
            <div className="max-w-lg mx-auto text-center mb-12">
              <h2 className="h2 font-semibold mb-4 mt-8">Make Passive Income!</h2>
              <p className="text-md mt-4 mb-4 text-slate-800">Just imagine this amount of cash coming into your bank account every single month. *Calculations are based on the Startup plan.</p>
            </div>
            <div className="max-w-7xl  container mx-auto">
              <ul className="flex flex-wrap justify-center">
                <li className="w-1/3 px-2 mb-4">
                  <div className="bg-slate-100 p-4 rounded-lg shadow border-slate-600 border">
                    <div className="text-center mb-4 p-4">

                      <span className="h4">🐻 BEAR</span>
                      <h2 className="h2 mt-4">$<b className="font-bold">146</b></h2>
                      <p className="text-md mt-4 mb-4 text-slate-800">per month</p>

                    </div>
                    <div className="text-center">
                      20 people = $191/m
                    </div>
                  </div>
                </li>
                <li className="w-1/3 px-2 mb-4">
                  <div className="bg-slate-100 p-4 rounded-lg shadow border-slate-600 border">
                    <div className="text-center mb-4 p-4">
                      <span className="h4">🐴 HORSE</span>
                      <h2 className="h2 mt-4">$<b className="font-bold">957</b></h2>
                      <p className="text-md mt-4 mb-4 text-slate-800">per month</p>
                    </div>
                    <div className="text-center">
                      100 people = $957/m
                    </div>
                  </div>
                </li>
                <li className="w-1/3 px-2 mb-4">
                  <div className="bg-slate-100 p-4 rounded-lg shadow border-slate-600 border">
                    <div className="text-center mb-4 p-4">
                      <span className="h4">🦄 UNICORN</span>
                      <h2 className="h2 mt-4">$<b className="font-bold">4785</b></h2>
                      <p className="text-md mt-4 mb-4 text-slate-800">per month</p>
                    </div>
                    <div className="text-center">
                      500 people = $4785/m
                    </div>
                  </div>
                </li>
              </ul>
              <div className="text-center mt-8">
                <Link href="https://partner.crabshq.com/" target="_self" className="btn text-dark text-2xl bg-orange-300 hover:bg-orange-700 hover:text-orange-100 w-full mb-4 sm:w-auto sm:mb-0 flex items-center justify-center">Start to earn money</Link>
              </div>
            </div>
          </div>



          <div className="mt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-4xl font-bold ">We are interested in your growth</h2>
              <p className=" mt-4">Every partner gets our full support because <strong>our</strong> growth depends on <strong>your</strong> growth.</p>
            </div>
            <div className="mt-8">
              <ul className="flex flex-wrap justify-center">
                <li className="w-full md:w-1/3 px-4 py-2">
                  <div className="text-center">
                    <Image src="/images/🧑_🏫.png" alt="Free coaching" className="mx-auto h-20" width={80} height={100}/>
                    <h3 className="h4 font-semibold mt-2 ">Free coaching</h3>
                    <p className=" mt-1">Struggling with growing your blog or agency? Let us consult you. Our team has experts in the niche.</p>
                  </div>
                </li>
                <li className="w-full md:w-1/3 px-4 py-2">
                  <div className="text-center">
                    <Image src="/images/💻.png" alt="Personal dashboard" className="mx-auto h-20" width={80} height={100} />
                    <h3 className="h4 font-semibold mt-2 ">Personal dashboard</h3>
                    <p className=" mt-1">Track every campaign, URL click, and dollar you earn. Easy and convenient.</p>
                  </div>
                </li>
                <li className="w-full md:w-1/3 px-4 py-2">
                  <div className="text-center">
                    <Image src="/images/🧑_🎨.png" alt="Have our designer for $0" className="mx-auto h-20" width={80} height={100}/>
                    <h3 className="h4 font-semibold mt-2 ">Have our designer for $0</h3>
                    <p className=" mt-1">Not satisfied with our media kit? Just ask! Our design crew will prepare exclusive images and videos.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>



          <div className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-semibold">Questions?</h2>
              </div>

              <div className="mt-8">
                <div className="space-y-6">
                  <div className='p-8 border rounded-2xl border-slate-600'>
                    <h3 className="font-bold text-xl">Who is Wonder  for?</h3>
                    <br />
                    <p className="text-md mt-4 mb-4 text-slate-800">Wonder is a quick business builder for startup founders. Our users can quickly Get a beautiful web apps, blogs, and helpdesks for a mobile or desktop, for a SaaS product, for a plugin, an open-source project, a SMM tool etc.</p>
                    <p className="text-md mt-4 mb-4 text-slate-800">If your audience are tech guys, Wonder  is for them. They will be more willing to use a tailored tool for startups rather than generic old-fashioned Webflow or Wordpress.</p>
                  </div>

                  <div className='p-8 border rounded-2xl border-slate-600'>
                    <h3 className="font-bold text-xl">Why promote you while I can promote some other website builder?</h3>
                    <br />
                    <p className="text-md mt-4 mb-4 text-slate-800">The key advantage is the approach. We are building a landing page generator for startups only. That means, we pay all the attention to startups-only demands. In particular, we will provide not-so-popular integrations, specific components and templates.</p>
                    <p className="text-md mt-4 mb-4 text-slate-800">This is why startup founders love Wonder  more than other tools.</p>
                    <p className="text-md mt-4 mb-4 text-slate-800">Why believe me? Just A/B test it yourself. Put a Wix affiliate link for a month, measure your earnings. Then put our link. Compare. Pick the winner.</p>
                  </div>

                  <div className='p-8 border rounded-2xl border-slate-600'>
                    <h3 className="font-bold text-xl">What is the minimum payout amount?</h3>
                    <br />
                    <ul>
                      <li>Wise with min. payout of $200</li>
                      <li>Paypal with min. payout of $50</li>
                      <li>Bank (Australia) with min. payout of $50</li>
                      <li>Bank (Canada) with min. payout of $50</li>
                      <li>Bank (UK) with min. payout of $50</li>
                      <li>Bank (US) with min. payout of $50</li>
                      <li>Bank (international) with min. payout of $200</li>
                      <li>Bank (IBAN) with min. payout of $200</li>
                    </ul>
                  </div>

                  <div className='p-8 border rounded-2xl border-slate-600'>
                    <h3 className="font-bold text-xl">Can I have multiple affiliate offers on the same page?</h3>
                    <br />
                    <p className="text-md mt-4 mb-4 text-slate-800">Yes. Nothing stops your from selling let's say an analytics tool or a social media scheduler alongside with a landing page builder. Take the maximum out of your resource!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>




          <div className="bg-slate-800 border border-slate-800 text-white border-2 border-dashed py-20 rounded-md">
    <div className="max-w-md mx-auto text-center">
        <h2 className="h2 font-bold">Start earning cash by referring customers to Crabs HQ</h2>
        <br />
        <p className="mt-4">Quick payouts to Wise, Paypal or your local bank. Premium support and cross-promotions from us.</p>
        <div className="mt-8"><Link href="https://wondersites.lemonsqueezy.com/affiliates" target="_blank" rel="noopener"  className="btn text-slate-900 bg-slate-200 hover:bg-slate-600 w-full mb-4 sm:w-auto sm:mb-0">Become our partner</Link></div>
    </div>
</div>

          


        </div>
      </div>
    </section>
  )
}
