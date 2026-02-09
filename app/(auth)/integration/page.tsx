import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import Header from '@/components/ui/header';

import { _loadFromJson } from '@/app/utils/helper';
export const metadata = {
  title: 'CrabsHQ Integrations',
  description: 'Integrate with your stack and extend functionality with powerful integrations built by us and our amazing community.',
  alternates: {
    canonical: "https://crabshq.com/integration",
  },
  openGraph: {
    images: [
        {
            url: "https://dazzling-cat.netlify.app/WonderSitesintegrations_socialshare.png",
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
            url: "https://dazzling-cat.netlify.app/WonderSitesintegrations_socialshare.png",
            alt: "Get a Marketplace with Notion",
        },
    ],
},
}
const Integration = async () => {
  const integrations = await _loadFromJson(false);
  return (
    <section >

<Header/>

<br/>
<br/>
<br/>
<br/>
<br/>


      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-6 md:pt-4 md:pb-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="font-funneldisplay h3 mb-4">CrabsHQ Integrations</h1>
            <p className="text-xl text-slate-600">Integrate with your stack and extend functionality with powerful integrations built by us and our amazing community.</p>

            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center aos-init aos-animate mt-6">
              <div><Link className="btn text-dark text-2xl bg-red-300 hover:bg-red-700 hover:text-red-100 w-full mb-4 sm:w-auto sm:mb-0 flex items-center justify-center" href="/contact-us">Missing Integration? Ask for Help</Link></div>
            </div>

          </div>
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {integrations.map((integration: any, index: number) => (
              <Link key={index} href={"/integration/" + integration.id} >
                <div className="cursor-pointer relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl text-center h-full border bg-white">
                  <div className='w-full'>
                    <div className="flex items-center space-x-2 mb-4">

                    <Image 
  className="w-10 h-10" 
  src={integration?.product?.logo} 
  alt={integration?.product?.name} 
  width={100}  // Larger size
  height={100} // Larger size
/>

                      <span className="text-dark font-bold">{integration?.product?.name}  </span>
                    </div>
                    <button className="text-white bg-slate-900 rounded-md w-full p-2 mt-4">
                      {integration?.callToCopy?.text || "Integrate"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}

            <Link href="https://iframely.com/domains" target='_blank'>
            <div className="cursor-pointer relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl text-center h-full border bg-white border-slate-600 border-dashed">
                <div className="w-full">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-md" ></div>
                        <span className="text-dark font-bold">And a lot more..</span>
                    </div>
                    <button className="border border-slate-200 bg-red-700 rounded-md w-full p-2 mt-4">Add More...</button>
                </div>
            </div>

            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Integration;
