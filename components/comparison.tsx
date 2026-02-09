import React from 'react';
import { Database, Bot, Mail, Shield, BarChart3, HardDrive, X, CheckCircle, Code, Clock, Sparkles } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  otherPlatform: string;
  wonder: string;
}

const WonderComparison: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Database,
      name: 'Database Setup',
      otherPlatform: 'Manual Supabase integration',
      wonder: 'Built-in'
    },
    {
      icon: Bot,
      name: 'AI Integration',
      otherPlatform: 'OpenAI API setup required',
      wonder: 'Built-in'
    },
    {
      icon: Mail,
      name: 'Email System',
      otherPlatform: 'Resend/SendGrid setup needed',
      wonder: 'Built-in'
    },
    {
      icon: Shield,
      name: 'Authentication',
      otherPlatform: 'Auth provider configuration',
      wonder: 'Built-in'
    },
    {
      icon: BarChart3,
      name: 'Analytics',
      otherPlatform: 'Third-party integration needed',
      wonder: 'Built-in'
    },
    {
      icon: HardDrive,
      name: 'Storage',
      otherPlatform: 'Supabase/S3/Cloud storage setup',
      wonder: 'Built-in'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-red-500">All-in-One</span> vs Integration Hell
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how CrabsHQ stacks up against other AI app-building platforms
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Other AI Platforms */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Other AI Platforms</h2>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="font-medium text-gray-900">{feature.name}</span>
                    </div>
                    <span className="text-sm text-red-500 font-medium">{feature.otherPlatform}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <Code className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm font-medium text-red-700">Hours spent on tedious integrations and configurations</span>
              </div>
            </div>
          </div>

          {/* CrabsHQ */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
            
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-500">WONDER</h2>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="font-medium text-gray-900">{feature.name}</span>
                    </div>
                    <span className="text-sm text-teal-500 font-medium">{feature.wonder}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm font-medium text-red-700">Everything you need, ready to use instantly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-full font-medium shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
            <Clock className="w-5 h-5 mr-2" />
            Stop wasting time on integrations
          </div>
        </div>
      </div>
    </div>
  );
};

export default WonderComparison;