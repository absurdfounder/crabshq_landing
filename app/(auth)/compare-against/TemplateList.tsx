"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, HelpCircle, BookOpen, ShoppingBag, FileText, Briefcase, FileCode, Tag } from 'lucide-react';
import templateData from '@/public/showcase_data.json';

// TypeScript interfaces remain the same
interface CallToAction {
  text: string;
  link: string;
}

interface viewDemo {
  text: string;
  link: string;
}

interface Product {
  name: string;
  logo: string;
  description: string;
  type: string;
  provider: string;
  callToCopy: CallToAction;
  viewDemo: viewDemo;
  tags?: string[]; // Add tags property
}

interface Template {
  id: string;
  product: Product;
  overview: {
    content: string;
  };
  howItWorks: {
    content: string;
  };
  configuration: {
    content: string;
  };
  proof: {
    screenshot: string;
    youtubevideo: string;
  };
}

interface TagCount {
  tag: string;
  count: number;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

interface TemplateLibraryProps {
  initialSelectedType?: string;
}

const TemplateLibrary = ({ initialSelectedType = 'all' }: TemplateLibraryProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayedTemplates, setDisplayedTemplates] = useState<Template[]>([]);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const [popularTags, setPopularTags] = useState<TagCount[]>([]);
  const [lesserTags, setLesserTags] = useState<TagCount[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const types = ['all', 'helpdesk', 'blog', 'directory', 'marketplace', 'company wiki', 'documentation'];

  const typeIcons = {
    'all': HelpCircle,
    'helpdesk': HelpCircle,
    'blog': BookOpen,
    'directory': FileText,
    'marketplace': ShoppingBag,
    'company wiki': Briefcase,
    'documentation': FileCode
  };

  useEffect(() => {
    const allTemplates = templateData[0]?.template_library || [];
    setTemplates(allTemplates);

    // Count tag occurrences across all templates
    const tagCounts: Record<string, number> = {};

    allTemplates.forEach(template => {
      if (template?.product?.tags) {
        template.product.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    // Convert to TagCount objects and sort alphabetically
    const tagCountArray = Object.entries(tagCounts).map(([tag, count]) => ({
      tag,
      count
    }));

    // Sort alphabetically first
    tagCountArray.sort((a, b) => a.tag.localeCompare(b.tag));

    // Then separate popular (2+ occurrences) from lesser tags (1 occurrence)
    const popular = tagCountArray.filter(tc => tc.count >= 2);
    const lesser = tagCountArray.filter(tc => tc.count < 2);

    setPopularTags(popular);
    setLesserTags(lesser);
  }, []);

  // Removed selectedType effect

  useEffect(() => {
    if (!Array.isArray(templates)) {
      setDisplayedTemplates([]);
      return;
    }

    let filteredTemplates = templates;

    // Filter by selected tags if any
    if (selectedTags.length > 0) {
      filteredTemplates = filteredTemplates.filter(template => {
        if (!template?.product?.tags) return false;
        return selectedTags.some(tag => template.product.tags?.includes(tag));
      });
    }

    const templatesArray = Array.isArray(filteredTemplates) ? filteredTemplates : [];
    setDisplayedTemplates(templatesArray.slice(0, 6)); // Always limit to 6 templates
  }, [selectedTags, templates]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' id="template-section">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8'>
        <div className="flex-1">
          <motion.h2
            className="text-start font-funneldisplay text-2xl sm:text-3xl md:text-4xl text-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Beautifully crafted.
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 sm:mb-8 text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse through examples of live Notion websites, built with CrabsHQ.
          </motion.p>
        </div>

        <Link
          className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg lg:text-xl border border-slate-900 text-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-300 text-center whitespace-nowrap"
          href="/showcase"
        >
          Explore all Showcases 
        </Link>
      </div>




      <motion.div
        className="mt-8 mb-8 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Mobile dropdown for tags */}
        <div className="sm:hidden relative mb-4">
          <button
            onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
            className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm flex items-center justify-between"
          >
            <span>Tags {selectedTags.length > 0 ? `(${selectedTags.length} selected)` : ''}</span>
            <svg className={`w-5 h-5 transition-transform ${isTagMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isTagMenuOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {/* Popular tags first (2+ templates) */}
              <div className="p-2 bg-gray-50 border-b">
                <p className="text-xs text-slate-500 font-medium">Popular Tags</p>
              </div>
              {popularTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`w-full px-4 py-2 text-left flex items-center justify-between ${selectedTags.includes(tag) ? 'bg-red-700 text-white' : 'hover:bg-slate-100'}`}
                >
                  <span className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    {tag}
                  </span>

                </button>
              ))}

              {/* Show less common tags when expanded */}
              {showAllTags && lesserTags.length > 0 && (
                <>
                  <div className="p-2 bg-gray-50 border-b border-t">
                    <p className="text-xs text-slate-500 font-medium">Other Tags</p>
                  </div>
                  {lesserTags.map(({ tag, count }) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between ${selectedTags.includes(tag) ? 'bg-red-700 text-white' : 'hover:bg-slate-100'}`}
                    >
                      <span className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        {tag}
                      </span>
                      <span className={`text-xs ${selectedTags.includes(tag) ? 'text-white' : 'text-slate-400'}`}>
                        {count} template
                      </span>
                    </button>
                  ))}
                </>
              )}

              {/* Show/hide toggle */}
              {lesserTags.length > 0 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="w-full px-4 py-2 text-left text-red-600 border-t"
                >
                  {showAllTags ? "Show less" : `Show all (${lesserTags.length} more)`}
                </button>
              )}

              {/* Clear button */}
              {selectedTags.length > 0 && (
                <button
                  onClick={clearTags}
                  className="w-full px-4 py-2 text-left text-red-600 border-t"
                >
                  Clear all tags
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop tag filters */}
        <div className="hidden sm:block">
          <div className="flex flex-wrap justify-start gap-2 mb-2 max-w-3xl">
            {/* Popular tags (2+ templates) */}
            {popularTags.map(({ tag, count }) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.includes(tag)
                  ? "bg-red-500 text-white"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <span className="ml-1.5">×</span>
                )}
              </motion.button>
            ))}

            {/* Show less common tags when expanded */}
            {showAllTags && lesserTags.map(({ tag, count }) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.includes(tag)
                  ? "bg-red-500 text-white"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <span className="ml-1.5">×</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Show/hide toggle */}
          {lesserTags.length > 0 && (
            <button
              onClick={toggleShowAllTags}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200 mt-2"
            >
              {showAllTags ? "Show less" : `Show all (${lesserTags.length} more)`}
            </button>
          )}

          {/* Clear all button */}
          {selectedTags.length > 0 && (
            <button
              onClick={clearTags}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200 mt-2"
            >
              Clear all filters
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {displayedTemplates.length > 0 ? (
          <motion.div
            key="templates"
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTemplates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-full"
              >
                <Link
                  href={"/showcase/" + template.id}
                  className="relative flex flex-col w-full overflow-hidden bg-white rounded-2xl  border hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-full p-4">
                    <div className="flex justify-center items-center">
                      <Image
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                        src={template.product.logo}
                        unoptimized
                        alt={template.product.name}
                      />
                    </div>
                    <div className="p-4 text-start">

                      <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-4'>
                        <Link href={"/showcase/" + template.id} className="group flex gap-2 items-center flex-1 min-w-0">
                          <span className="text-start font-bold group-hover:text-red-600 transition-colors duration-300 truncate">
                            {template.product.name}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-colors duration-300 flex-shrink-0" />
                        </Link>

                        <span className="inline-block bg-slate-100 border-slate-200 border-dashed border-2 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm whitespace-nowrap self-start sm:self-auto">
                          {template.product.type}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 mt-2 mb-3 line-clamp-2">
                        {template.product.description}
                      </p>

                      {/* Type and tags */}
                      <div className="flex flex-wrap gap-2">


                        {/* Tags display */}
                        {template.product.tags && template.product.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`inline-block px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm bg-slate-100 text-slate-800`}
                          >
                            {tag}
                          </span>
                        ))}
                        {template.product.tags && template.product.tags.length > 2 && (
                          <span className="inline-block text-xs text-slate-400 self-center">
                            +{template.product.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center mt-8 p-8 bg-slate-100 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle size={48} className="text-red-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No templates found</h2>
            <p className="text-slate-600">Try adjusting your filters or check back later for more templates.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TemplateLibrary;
