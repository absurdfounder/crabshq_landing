import { Search, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogLandingPage() {
  return (
    <div className="min-h-screen bg-white grid items-center justify-center p-4">
      <div className=" rounded-3xl p-12 max-w-2xl w-full m-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
          This week, hundreds of your readers...
        </h1>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Search className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Discovered your blog through search
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Eye className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Found outdated content or broken links
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <ArrowLeft className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              And bounced without subscribing or engaging
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-900 font-medium">
            It's not your fault.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            That's the price of consistently publishing and growing your content library.
          </p>

          <p className="text-lg text-gray-900 font-medium italic">
            Your blog content will inevitably become outdated every month.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            You could manually audit hundreds of posts and spend 40+ hours every quarter fixing broken links and updating information.
          </p>

          <p className="text-lg text-gray-900 font-medium italic">
            Or... you could just use ContentKeeper...
          </p>
        </div>
      </div>

    </div>
  );
}