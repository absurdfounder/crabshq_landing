import { Search, Eye, MessageCircle } from "lucide-react";

export default function ChangelogLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
          This week, dozens of your users...
        </h1>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Search className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Checked your changelog for recent updates
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Eye className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Found vague entries or missing releases
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              And asked support "what actually changed?"
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-900 font-medium">
            It's not your fault.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            That's the price of rapid development and frequent deployments.
          </p>
          
          <p className="text-lg text-gray-900 font-medium italic">
            Your changelog will inevitably fall behind every sprint.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            You could manually track every commit and spend hours each week writing detailed release notes.
          </p>
          
          <p className="text-lg text-gray-900 font-medium italic">
            Or... you could just use ChangeFlow...
          </p>
        </div>
      </div>
    </div>
  );
}