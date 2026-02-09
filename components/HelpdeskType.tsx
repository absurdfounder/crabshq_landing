"use client";

import React from 'react';
import { Search, Eye, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Helpdesk_Type() {
  return (

    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl w-full">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
            This week, dozens of your customers...
          </h1>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Searched your help center
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Eye className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Found an outdated or irrelevant article
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Settings className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                And sent you an angry email in support
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-900 font-medium">
              It's not your fault.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              That's the price of shipping quickly and constantly improving your product.
            </p>

            <p className="text-lg text-gray-900 font-medium italic">
              Your help center will inevitably go stale every week.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              You could do quarterly reviews and spend 30+ hours every month answering repeat tickets.
            </p>

            <p className="text-lg text-gray-900 font-medium italic">
              Or... you could just use CrabsHQ...
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}