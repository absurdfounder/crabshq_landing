import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions
interface CallToAction {
  text: string;
  link: string;
}

interface ViewDemo {
  text: string;
  link: string;
}

// Updated Product interface to match the actual JSON structure
interface Product {
  logo: string;
  name: string;
  type: string;
  provider: string;
  description: string;
  callToCopy: CallToAction;
  callToAction?: CallToAction; // Make this optional
  viewDemo: ViewDemo;
  tags?: string[]; // Add tags field
}

interface ContentSection {
  content: string;
}

interface Proof {
  screenshot: string;
  youtubevideo: string;
}

interface Template {
  id: string;
  product: Product;
  overview: ContentSection;
  howItWorks: ContentSection;
  configuration: ContentSection;
  proof: Proof;
}

// Update TemplateData to match the actual structure
interface TemplateData {
  template_library: Template[];
}

interface IntegrationData {
  integration_library: Template[];
}

interface ComparisonData {
  comparision_library: {
    id: string;
    product: {
      logo: string;
      name: string;
      provider: string;
      description: string;
      heroimage: string;
    };
    comparison_table: {
      feature: string;
      feature_value: {
        Item: boolean;
        Notion: boolean;
      };
    }[];
  }[];
}

interface ContentItem {
  type: string;
  text?: string;
  url?: string;
  alt?: string;
  items?: string[];
  href?: string;
  code?: string;
  src?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  link: string;
  install_command: string;
  website: string;
}

interface SkillsData {
  skill_library: Skill[];
}

// Import JSON data
import templateData from '../../public/showcase_data.json';
import integrationData from '../../public/integration_data.json';
import comparisonData from '../../public/comparison_data.json';
import skillsData from '../../public/skills_data.json';

export const goBack = () => {
  window.history.back();
};

export const renderContent = (item: ContentItem, index: number) => {
  switch (item.type) {
    case 'heading':
      return <h3 key={index} className="text-xl font-bold text-slate-900 mt-4 mb-2">{item.text}</h3>;
    case 'paragraph':
      return <p key={index} className="text-base text-slate-700 my-2">{item.text}</p>;
    case 'image':
      return (
        <div key={index} className="flex justify-center">
          <Image 
            width={1000} 
            height={1000} 
            src={item.url || ''} 
            unoptimized 
            alt={item.alt || ''} 
            className="max-w-full h-auto rounded-lg shadow-md" 
          />
        </div>
      );
    case 'bold':
      return <strong key={index} className="font-semibold">{item.text}</strong>;
    case 'list':
      return (
        <ul key={index} className="list-disc pl-5 space-y-1">
          {item.items?.map((listItem: string, listItemIndex: number) => (
            <li key={listItemIndex} className="text-slate-700">{listItem}</li>
          ))}
        </ul>
      );
    case 'link':
      return (
        <Link 
          key={index} 
          href={item.href || '#'} 
          target="_blank" rel="noopener"  
           
          className="text-red-500 hover:text-red-700 underline"
        >
          {item.text}
        </Link>
      );
    case 'blockquote':
      return <blockquote key={index} className="italic border-l-4 border-slate-200 pl-4 py-2 my-2">{item.text}</blockquote>;
    case 'code':
      return (
        <pre key={index} className="bg-slate-100 rounded-md p-3 overflow-auto">
          <code className="text-sm">{item.code}</code>
        </pre>
      );
    case 'video':
      return (
        <video 
          key={index} 
          width={1000} 
          height={1000} 
          src={item.src} 
          loop 
          className="w-full h-auto max-w-full rounded-lg shadow-md"
        />
      );
    case 'iframe':
      return (
        <iframe 
          key={index} 
          src={item.src} 
          frameBorder="0" 
          allowFullScreen 
          className="w-full h-64 md:h-96 rounded-lg shadow-md"
        />
      );
    default:
      return null;
  }
};

export const _loadFromJson = async (template: boolean = true): Promise<Template[]> => {
  try {
    if (template) {
      // Fix this line to handle the actual structure of templateData
      return (templateData as unknown as TemplateData[]).length > 0 
        ? (templateData as unknown as TemplateData[])[0].template_library
        : [];
    } else {
      return (integrationData as IntegrationData).integration_library;
    }
  } catch (error) {
    console.error("Failed to load templates", error);
    return [];
  }
};

export const _loadSkills = async (): Promise<Skill[]> => {
  try {
    return (skillsData as SkillsData).skill_library;
  } catch (error) {
    console.error("Failed to load skills", error);
    return [];
  }
};

export const _loadFromJsonComparison = async () => {
  try {
    return (comparisonData as ComparisonData).comparision_library;
  } catch (error) {
    console.error("Failed to load templates", error);
    return [];
  }
};

interface TransformedContent {
  type: string;
  text?: string;
  url?: string;
  alt?: string;
  src?: string;
}

export const _transformDataToPostPageView = (dataObject: Template): TransformedContent[] => {
  const postPageView: TransformedContent[] = [];

  if (dataObject.overview?.content) {
    postPageView.push({
      type: 'paragraph',
      text: dataObject.overview.content
    });
  }

  if (dataObject.howItWorks?.content) {
    postPageView.push({
      type: 'paragraph',
      text: dataObject.howItWorks.content
    });
  }

  if (dataObject.configuration?.content) {
    postPageView.push({
      type: 'paragraph',
      text: dataObject.configuration.content
    });
  }

  if (dataObject.proof) {
    if (dataObject.proof.screenshot) {
      postPageView.push({
        type: 'image',
        url: dataObject.proof.screenshot,
        alt: "Screenshot of the product"
      });
    }

    if (dataObject.proof.youtubevideo) {
      postPageView.push({
        type: 'video',
        src: dataObject.proof.youtubevideo
      });
    }
  }

  return postPageView;
};