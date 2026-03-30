import React from 'react';
import Link from 'next/link';


const Rating = () => {
    return (
        <div className='max-w-3xl mx-auto text-center py-12 md:py-20 px-4 sm:px-6'>
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-800">CrabsHQ is rated the Best.</h2>
        <p className="text-lg sm:text-xl text-slate-600"> Numbers quantify everything, this is what stands us apart from the competition.</p>


        {/* Items */}
        <div className="max-w-sm mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 items-start md:max-w-2xl lg:max-w-none mt-8">
          {/* 1st item */}
          <Link href="/" className="relative flex flex-col items-center p-4 sm:p-6 bg-white rounded-md h-full shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div>
                <h3 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-slate-500 font-bold">86%</h3>
                <span className="text-sm sm:text-base text-slate-900 font-bold">Ease of Use</span>
              </div>
            </div>
          </Link>

          {/* 2nd item */}
          <Link href="/" className="relative flex flex-col items-center p-4 sm:p-6 bg-white rounded-md h-full shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div>
                <h3 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-slate-500 font-bold">90%</h3>
                <span className="text-sm sm:text-base text-slate-900 font-bold">Ease of Admin</span>
              </div>
            </div>
          </Link>
          {/* 3rd item */}
          <Link href="/" className="relative flex flex-col items-center p-4 sm:p-6 bg-white rounded-md h-full shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div>
                <h3 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-slate-500 font-bold">91%</h3>
                <span className="text-sm sm:text-base text-slate-900 font-bold">Meets requirements</span>
              </div>
            </div>
          </Link>
          {/* 4th item */}
          <Link href="/" className="relative flex flex-col items-center p-4 sm:p-6 bg-white rounded-md h-full shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div>
                <h3 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-slate-500 font-bold">86%</h3>
                <span className="text-sm sm:text-base text-slate-900 font-bold">Ease of Setup</span>
              </div>
            </div>
          </Link>
        </div>

      </div>

    );
};

export default Rating;