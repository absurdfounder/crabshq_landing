"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Download, Globe, Chrome } from 'lucide-react';
import Header from '@/components/ui/header';

// Define the proper types for the manifest.json
interface ManifestAction {
  default_title?: string;
  default_icon?: {
    [key: string]: string;
  };
}

interface ManifestJSON {
  manifest_version: number;
  name: string;
  version: string;
  description: string;
  permissions: string[];
  side_panel: {
    default_path: string;
  };
  action: ManifestAction;
  background: {
    service_worker: string;
  };
  icons?: {
    [key: string]: string;
  };
}

const BrowserExtensionWizard: React.FC = () => {
  // State variables
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("chrome");
  const [name, setName] = useState<string>('Crabs HQ Extension');
  const [description, setDescription] = useState<string>('Easily create a chrome extension..');
  const [version, setVersion] = useState<string>('1.0');
  const [websiteUrl, setWebsiteUrl] = useState<string>('https://crabshq.com');
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIframePopup, setShowIframePopup] = useState<boolean>(false);
  const [generationComplete, setGenerationComplete] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Preload the website in a hidden iframe to warm up cache
  useEffect(() => {
    const preloadIframe = document.createElement('iframe');
    preloadIframe.src = ensureProtocol(websiteUrl);
    preloadIframe.style.display = 'none';
    document.body.appendChild(preloadIframe);
    return () => {
      document.body.removeChild(preloadIframe);
    };
  }, [websiteUrl]);
  
  // Handle icon upload
  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Please upload a PNG or JPEG image.');
        return;
      }
      
      setIcon(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setIconPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Make sure URL has http/https
  const ensureProtocol = (inputUrl: string): string => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };
  
  // Test URL preview
  const openIframePopup = () => {
    if (!websiteUrl.trim()) {
      setError('Please enter a URL');
      return;
    }
    // Reset the iframe load state when opening the popup
    setIframeLoaded(false);
    setShowIframePopup(true);
  };
  
  // Generate the extension
  const generateZipFile = async (): Promise<void> => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Import JSZip dynamically
      const JSZipModule = await import('jszip');
      const JSZip = JSZipModule.default;
      
      const zip = new JSZip();
      
      // Process URL
      let processedUrl = ensureProtocol(websiteUrl);
      
      try {
        const urlObj = new URL(processedUrl);
        if (!urlObj.searchParams.has('ref')) {
          urlObj.searchParams.append('ref', 'chrome-extension');
          processedUrl = urlObj.toString();
        }
      } catch (err) {
        throw new Error('Invalid URL. Please enter a valid website address.');
      }
      
      // Create manifest.json
      const manifest: ManifestJSON = {
        manifest_version: 3,
        name: name || 'My Website Extension',
        version: version || '1.0',
        description: description || 'Easily access my website',
        permissions: ["sidePanel", "storage"],
        side_panel: {
          default_path: "sidepanel.html"
        },
        action: {
          default_title: name || 'My Website Extension'
        },
        background: {
          service_worker: "background.js"
        }
      };
      
      // Add icon to manifest if provided
      if (icon) {
        manifest.action = {
          ...manifest.action,
          default_icon: {
            "16": "icon16.png",
            "48": "icon48.png",
            "128": "icon128.png"
          }
        };
        
        manifest.icons = {
          "16": "icon16.png",
          "48": "icon48.png",
          "128": "icon128.png"
        };
      }
      
      // Add files to zip
      zip.file("manifest.json", JSON.stringify(manifest, null, 2));
      zip.file("background.js", `chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});`);
      
      zip.file("sidepanel.html", `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || 'My Website Extension'}</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <iframe src="${processedUrl}" allow="fullscreen"></iframe>
</body>
</html>`);
      
      zip.file("script.js", `document.addEventListener('DOMContentLoaded', function() {
  console.log('Extension initialized');
});`);

      zip.file("styles.css", `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  height: 100vh;
  overflow: hidden;
}
`);

      // Handle icon
      if (icon && iconPreview) {
        try {
          const response = await fetch(iconPreview);
          const blob = await response.blob();
          
          zip.file("icon16.png", blob);
          zip.file("icon48.png", blob);
          zip.file("icon128.png", blob);
        } catch (err) {
          console.error('Error processing icon:', err);
        }
      }
      
      // Generate and download the ZIP file
      const blob = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${name.replace(/\s+/g, '-').toLowerCase() || 'my-website-extension'}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(downloadUrl);
      setGenerationComplete(true);
      
      // Auto-advance to step 2
      setTimeout(() => setActiveStep(2), 1500);
      
    } catch (error) {
      console.error('Error generating zip file:', error);
      setError(error instanceof Error ? error.message : 'Unknown error generating extension');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Creation step
  const renderStep1 = () => (
    <div className="space-y-6">
      {error && (
        <div className="px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Extension Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-white border border-gray-200 rounded-md"
              placeholder="My Website Extension"
            />
          </label>
          
          <label className="block text-sm font-medium">
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-white border border-gray-200 rounded-md"
              placeholder="Easily access my website"
            />
          </label>
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Website URL
            <div className="flex mt-1">
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-l-md"
                placeholder="https://app.crabshq.com"
              />
              <button
                onClick={openIframePopup}
                className="px-3 py-2 bg-gray-300 border border-gray-200 border-l-0 rounded-r-md hover:bg-gray-500 hover:text-white"
                type="button"
              >
                Test URL
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">The website that will appear in your extension</p>
          </label>

          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Version
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white border border-gray-200 rounded-md"
                  placeholder="1.0"
                />
              </label>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Icon
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 h-9 flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  {iconPreview ? 'Change Icon' : 'Upload Icon'}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleIconChange}
                  className="hidden"
                  accept="image/png,image/jpeg"
                />
              </label>
            </div>
          </div>

          {iconPreview && (
            <div className="flex items-center space-x-2">
              <img src={iconPreview} alt="Icon Preview" className="w-10 h-10 object-contain border rounded" />
              <span className="text-sm text-gray-600">Icon uploaded</span>
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={generateZipFile}
        disabled={isGenerating}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
        type="button"
      >
        {isGenerating ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Generate Extension</span>
          </>
        )}
      </button>
      
      {generationComplete && (
        <div className="px-4 py-3 text-sm text-green-600 bg-green-50 border border-green-100 rounded-md">
          Extension successfully generated! Moving to publishing step...
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        <p className="font-medium">How to install locally:</p>
        <ol className="list-decimal list-inside pl-1 space-y-1 mt-1">
          <li>Extract the downloaded ZIP file</li>
          <li>Go to chrome://extensions in your browser</li>
          <li>Enable "Developer Mode" (top right)</li>
          <li>Click "Load unpacked" and select the extracted folder</li>
        </ol>
      </div>
    </div>
  );
  
  // Publishing step
  const renderStep2 = () => {
    const browserTabs = [
      { id: "chrome", name: "Chrome", icon: <Chrome className="w-4 h-4" /> },
      { id: "edge", name: "Edge", icon: <Globe className="w-4 h-4" /> },
      { id: "opera", name: "Opera", icon: <Globe className="w-4 h-4" /> },
      { id: "brave", name: "Brave", icon: <Globe className="w-4 h-4" /> }
    ];
    
    const chromePublishSteps = (
      <div className="space-y-4 text-sm">
        <ol className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">1. Create a developer account</p>
            <p className="text-gray-600">Visit the <a href="https://chrome.google.com/webstore/devconsole" target="_blank" rel="noopener"  className="text-red-600 hover:underline">Chrome Web Store Developer Dashboard</a></p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">2. Pay one-time $5 registration fee</p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">3. Click "New Item" and upload your ZIP file</p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">4. Fill in store listing information</p>
            <p className="text-gray-600">Add screenshots, descriptions, and categories</p>
          </li>
          
          <li>
            <p className="font-medium">5. Submit for review (takes 1-3 days)</p>
          </li>
        </ol>
      </div>
    );
    
    const edgePublishSteps = (
      <div className="space-y-4 text-sm">
        <ol className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">1. Create a Microsoft Partner Center account</p>
            <p className="text-gray-600">Register at <a href="https://partner.microsoft.com/dashboard/microsoftedge/overview" target="_blank" rel="noopener"  className="text-red-600 hover:underline">Microsoft Partner Center</a></p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">2. Create a new submission</p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">3. Upload your ZIP file</p>
            <p className="text-gray-600">Edge supports Chrome extensions with minimal changes</p>
          </li>
          
          <li>
            <p className="font-medium">4. Complete listing details and submit</p>
            <p className="text-gray-600">Review typically takes 1-2 days</p>
          </li>
        </ol>
      </div>
    );
    
    const operaPublishSteps = (
      <div className="space-y-4 text-sm">
        <ol className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">1. Create an Opera developer account</p>
            <p className="text-gray-600">Sign up at <a href="https://addons.opera.com/developer/" target="_blank" rel="noopener"  className="text-red-600 hover:underline">Opera Add-ons Dashboard</a></p>
          </li>
          
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">2. Upload your ZIP file</p>
            <p className="text-gray-600">Opera works with Chrome extensions</p>
          </li>
          
          <li>
            <p className="font-medium">3. Add details and submit for review</p>
            <p className="text-gray-600">Review takes 1-2 days</p>
          </li>
        </ol>
      </div>
    );
    
    const bravePublishSteps = (
      <div className="space-y-4 text-sm">
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          <p className="font-medium">Brave uses the Chrome Web Store</p>
          <p>You only need to publish to the Chrome Web Store</p>
        </div>
        
        <ol className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <p className="font-medium">1. Follow the Chrome Web Store steps</p>
          </li>
          
          <li>
            <p className="font-medium">2. Mention Brave compatibility in your description</p>
          </li>
        </ol>
      </div>
    );
    
    const getActiveTabContent = () => {
      switch(activeTab) {
        case "chrome": return chromePublishSteps;
        case "edge": return edgePublishSteps;
        case "opera": return operaPublishSteps;
        case "brave": return bravePublishSteps;
        default: return chromePublishSteps;
      }
    };
    
    return (
      <div className="space-y-6">
        <div className="border rounded-md overflow-hidden">
          <div className="flex justify-between border-b px-8">
            {browserTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab.id ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 sm:p-5">
            {getActiveTabContent()}
          </div>
        </div>
        
        <a
          href={activeTab === "chrome" ? "https://chrome.google.com/webstore/devconsole" :
               activeTab === "edge" ? "https://partner.microsoft.com/dashboard/microsoftedge/overview" :
               activeTab === "opera" ? "https://addons.opera.com/developer/" : 
               "https://chrome.google.com/webstore/devconsole"}
          target="_blank" rel="noopener" 
          className="block w-full py-3 px-4 bg-black text-white text-center font-medium rounded-md hover:bg-gray-800"
        >
          Go to {activeTab === "chrome" ? "Chrome" : 
                 activeTab === "edge" ? "Edge" : 
                 activeTab === "opera" ? "Opera" : 
                 "Chrome"} Developer Dashboard
        </a>
      </div>
    );
  };
  
  // Main render
  return (
    <section>
      <Header/>

<br/>
<br/>
<br/>
<br/>
<br/>


      <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow my-4">
        <div className="mb-6">
          <div className='grid gap-4 text-center'>
            <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/main-desktop-browser-logos.png" className='max-w-64 m-auto' alt="Browser Logos"/>
            <h1 className="font-funneldisplay text-xl font-bold mb-2">Browser Extension Generator</h1>
          </div>
          
          {/* Simple Tab Navigation */}
          <div className="flex border-b items-center m-auto justify-center">
            <button 
              onClick={() => setActiveStep(1)}
              className={`py-2 px-4 text-sm font-medium border-b-2 ${activeStep === 1 ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
              Generate Extension
            </button>
            
            <button 
              onClick={() => setActiveStep(2)}
              className={`py-2 px-4 text-sm font-medium border-b-2 ${activeStep === 2 ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
              Publish to Store
            </button>
          </div>
        </div>
        
        {activeStep === 1 ? renderStep1() : renderStep2()}
        
        {/* Test URL popup */}
        {showIframePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">Website Preview</h3>
                <button 
                  onClick={() => setShowIframePopup(false)}
                  className="text-gray-500 hover:text-gray-700 text-lg"
                >
                  &times;
                </button>
              </div>
              
              <div className="p-4 flex-1 overflow-auto">
                <p className="mb-3 text-sm">Testing if <strong>{websiteUrl}</strong> works in your extension.</p>
                
                <div className="relative border rounded-md overflow-hidden h-64 bg-gray-100">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    </div>
                  )}
                  <iframe
                    src={ensureProtocol(websiteUrl)}
                    title="URL preview"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts"
                    onLoad={() => setIframeLoaded(true)}
                    style={{ visibility: iframeLoaded ? 'visible' : 'hidden' }}
                  />
                </div>
              </div>
              
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={() => setShowIframePopup(false)}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowserExtensionWizard;
