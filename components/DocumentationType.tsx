import { Search, Eye, Code } from "lucide-react";

export default function DocsLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
          This week, dozens of your developers...
        </h1>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Search className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Searched your docs for API endpoints or examples
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Eye className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Found outdated schemas or broken code examples
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Code className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              And resorted to reading your source code instead
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-900 font-medium">
            It's not your fault.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            That's the price of continuous deployment and evolving APIs.
          </p>
          
          <p className="text-lg text-gray-900 font-medium italic">
            Your documentation will inevitably drift from reality every release.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            You could manually sync docs with every code change and spend 20+ hours each sprint updating examples and schemas.
          </p>
          
          <p className="text-lg text-gray-900 font-medium italic">
            Or... you could just use DocSync...
          </p>
        </div>
      </div>
    </div>
  );
}