"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { _loadFromJson } from "@/app/utils/helper";
import notionfooterImage from "@/public/images/freedesigner.png";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MigrateFrom from "@/public/images/migratefrom.png";
import Header from "@/components/ui/header";

// Define types for the product structure
interface Product {
    name?: string;
    description?: string;
    logo?: string;
    type?: string;
    tags?: string[];
}

interface Template {
    id: string;
    product?: Product;
}

interface TagCount {
    tag: string;
    count: number;
}

// Utility function to truncate text with proper typing
const truncateText = (text: string | undefined, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// --- Reusable Flipping Button Component ---
interface FlippingButtonLinkProps {
    href: string;
    initialText: string;
    hoverText: string;
    className?: string; // To pass the dynamic styles
    target?: string;    // Prop for target attribute
    rel?: string;       // Prop for rel attribute
}

const FlippingButtonLink: React.FC<FlippingButtonLinkProps> = ({
    href,
    initialText,
    hoverText,
    className = '', // Default to empty string
    target,
    rel,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Base classes for the link structure and behavior - adjusted for inline-block needs if className contains it
    const baseClasses = "flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 relative";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${className}`} // Combine base and passed classes
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            target={target} // Pass target
            rel={rel}       // Pass rel
        >
            {/* Container for the flipping text - adjust height (e.g., h-5) if needed based on font/padding */}
            <div className="relative overflow-hidden h-5">
                {/* Initial Text */}
                <div
                    style={{
                        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
                        transition: 'transform 0.3s ease-in-out',
                        whiteSpace: 'nowrap', // Prevent text wrapping during transition
                    }}
                >
                    {initialText}
                </div>
                {/* Hover Text */}
                <div
                    className="absolute top-0 left-0 w-full text-center" // Center text
                    style={{
                        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease-in-out',
                        whiteSpace: 'nowrap', // Prevent text wrapping during transition
                    }}
                >
                    {hoverText}
                </div>
            </div>
        </Link>
    );
};
// --- End of FlippingButtonLink Component ---


// Create a client component to handle the search params
function TemplateClientContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
    const [allTags, setAllTags] = useState<TagCount[]>([]);
    const [popularTags, setPopularTags] = useState<TagCount[]>([]);
    const [lesserTags, setLesserTags] = useState<TagCount[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllTags, setShowAllTags] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Helper function to update URL
    const updateUrlParams = (tags: string[]) => {
        // Create a URLSearchParams object
        const params = new URLSearchParams();

        // Add tags to URL if there are any selected
        if (tags.length > 0) {
            params.set('tags', tags.join(','));
        }

        // Update the URL without refreshing the page
        const newUrl = tags.length > 0
            ? `?${params.toString()}`
            : window.location.pathname;

        router.push(newUrl, { scroll: false });
    };

    // Initialize and parse tags from URL on initial load
    useEffect(() => {
        // Only run once
        if (initialized) return;
        setInitialized(true);

        if (!searchParams) return;

        const tagsParam = searchParams.get('tags');
        if (tagsParam) {
            const urlTags = tagsParam.split(',').map(tag => tag.trim());
            setSelectedTags(urlTags);
        }

        const fetchData = async () => {
            try {
                const data = await _loadFromJson() as Template[];

                setTemplates(data);
                setFilteredTemplates(data);

                // Count tag occurrences
                const tagCounts: Record<string, number> = {};
                data.forEach(template => {
                    if (template.product?.tags) {
                        template.product.tags.forEach(tag => {
                            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                        });
                    }
                });

                // Add "free design" tag
                tagCounts["free design"] = (tagCounts["free design"] || 0) + 1;

                // Convert to TagCount array and sort
                const tagCountArray: TagCount[] = Object.entries(tagCounts).map(([tag, count]) => ({
                    tag,
                    count
                }));

                // Sort by count (descending) then alphabetically
                tagCountArray.sort((a, b) => {
                    if (b.count !== a.count) return b.count - a.count;
                    return a.tag.localeCompare(b.tag);
                });

                setAllTags(tagCountArray);

                // Separate popular tags (more than 1 template) from lesser tags
                const popular = tagCountArray.filter(tc => tc.count > 1);
                const lesser = tagCountArray.filter(tc => tc.count === 1);

                setPopularTags(popular);
                setLesserTags(lesser);

                // Apply URL filters after getting data
                if (tagsParam) {
                    const urlTags = tagsParam.split(',').map(tag => tag.trim());
                    // Only keep tags that actually exist in our data
                    const validUrlTags = urlTags.filter(tag => tagCountArray.some(tc => tc.tag === tag));
                    setSelectedTags(validUrlTags);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error loading templates:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchParams, initialized, router]); // Added router to dependency array as it's used in updateUrlParams called indirectly

    // Filter templates when selectedTags changes
    useEffect(() => {
        if (selectedTags.length === 0) {
            setFilteredTemplates(templates);
        } else {
            const filtered = templates.filter(template => {
                const templateTags = template.product?.tags || [];
                return selectedTags.some(tag => templateTags.includes(tag));
            });
            setFilteredTemplates(filtered);
        }
    }, [selectedTags, templates]);

    // Handle tag selection/deselection
    const toggleTag = (tag: string) => {
        const newSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(newSelectedTags);
        updateUrlParams(newSelectedTags);
    };

    // Clear all selected tags
    const clearTags = () => {
        setSelectedTags([]);
        updateUrlParams([]);
    };

    // Toggle showing all tags
    const toggleShowAllTags = () => {
        setShowAllTags(!showAllTags);
    };

    // Render the template items with alternating banners every 6 cards
    const renderTemplateItems = () => {
        const rowSize = 3; // Number of templates per row
        const bannerInterval = 6; // Show a banner after every 2 rows (6 cards)

        const items = [];
        const filteredTemplatesList = [...filteredTemplates];

        for (let i = 0; i < filteredTemplatesList.length; i++) {
            // Add a banner after every 6 templates (2 rows with 3 templates each)
            if (i > 0 && i % bannerInterval === 0) {
                // Alternate between Design Assistance and Migration banners
                // If i is divisible by 12 (every other banner should be Migration)
                if ((i / bannerInterval) % 2 === 0) {
                    // Add the "Migrate From" banner
                    items.push(
                        <div key={`migrate-banner-${i}`} className="sm:col-span-2 lg:col-span-3 my-8">
                            {/* Link wrapper for the banner */}
                            <Link
                                href="https://app.youform.com/forms/r3rvhjv4" // Link target for the whole banner
                                target="_blank" rel="noopener"
                                className="block"
                            >
                                <div
                                    className="relative bg-slate-900 rounded-2xl px-4 md:py-8 md:px-12 shadow-2xl overflow-hidden mt-12 w-full h-auto min-h-[200px]"
                                >
                                    {/* Background illustration */}
                                    <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block">
                                        <Image alt="Logo" width={400} className="block" src={MigrateFrom} />
                                    </div>

                                    <div className="relative flex flex-col lg:flex-row justify-between items-center py-6">
                                        {/* CTA content */}
                                        <div className="text-center lg:text-left lg:max-w-xl space-y-6">
                                            <h3 className="h3 text-white mb-2">
                                                Planning to <b className="text-red-600">migrate</b> to
                                                CrabsHQ  from another platform?
                                            </h3>

                                            {/* --- UPDATED Migration CTA Button --- */}
                                            {/* Using a div wrapper for the button as the parent Link handles navigation */}
                                            <div className="w-full lg:w-auto">
                                                <div onClick={(e) => e.preventDefault()} className="inline-block"> {/* Prevent nested link navigation */}
                                                    <FlippingButtonLink
                                                        href="https://app.youform.com/forms/r3rvhjv4" // Keep href for potential direct click, though parent Link should capture
                                                        target="_blank"
                                                        rel="noopener"
                                                        initialText="We can do it for you →"
                                                        hoverText="Request Migration" // Or other text
                                                        className="btn bg-red-700 hover:bg-red-700 shadow px-12 inline-block text-slate-900 py-3" // Original classes merged with base
                                                    />
                                                </div>
                                                <p className="text-sm text-slate-400 mt-3">Free of charge</p>
                                            </div>
                                            {/* --- END OF UPDATE --- */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                } else {
                    // Add the "Free Design Assistance" banner
                    items.push(
                        <div key={`design-assistance-banner-${i}`} className="sm:col-span-2 lg:col-span-3 my-8">
                            {/* Link wrapper for the banner */}
                            <Link
                                href="https://app.youform.com/forms/design-assistance" // Link target for the whole banner
                                target="_blank" rel="noopener"
                                className="block"
                            >
                                <div
                                    className="relative bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl px-4 md:py-8 md:px-12 shadow-2xl overflow-hidden mt-12 w-full h-auto min-h-[200px]"
                                >
                                    {/* Background illustration */}
                                    <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block">
                                        <Image alt="Designer" width={300} className="block" src={notionfooterImage} />
                                    </div>

                                    <div className="relative flex flex-col lg:flex-row justify-between items-center py-6">
                                        {/* CTA content */}
                                        <div className="text-center lg:text-left lg:max-w-xl space-y-6">
                                            <h3 className="h3 text-white mb-2">
                                                Want to get <b className="text-red-600">free design</b> assistance?
                                            </h3>

                                            {/* --- UPDATED Free Design CTA Button --- */}
                                            {/* Using a div wrapper for the button as the parent Link handles navigation */}
                                            <div className="w-full lg:w-auto">
                                                 <div onClick={(e) => e.preventDefault()} className="inline-block"> {/* Prevent nested link navigation */}
                                                    <FlippingButtonLink
                                                        href="https://app.youform.com/forms/design-assistance" // Keep href for potential direct click
                                                        target="_blank"
                                                        rel="noopener"
                                                        initialText="Get started - free now →"
                                                        hoverText="in just 15 mins" // Or other text
                                                        className="btn bg-white hover:bg-slate-100 shadow px-12 inline-block text-red-600 py-3" // Original classes merged with base
                                                    />
                                                 </div>
                                                <p className="text-sm text-white mt-3">Professional design help at no cost</p>
                                            </div>
                                            {/* --- END OF UPDATE --- */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                }
            }

            // Add the template item
            const template = filteredTemplatesList[i];
            items.push(
                <Link
                    href={`/showcase/${template.id}`}
                    key={`template-${i}`}
                    className="group relative flex flex-col overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full border border-slate-200 hover:border-red-200"
                >
                    <div className="w-full">
                        {/* Image container with improved styling */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                            <Image
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                width={120}
                                height={120}
                                src={template?.product?.logo || "https://via.placeholder.com/120"}
                                unoptimized
                                alt={template?.product?.name || "Template"}
                            />
                        </div>

                        <div className="p-6">
                            {/* Template type badge with improved styling */}
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                                {template?.product?.type || "Template"}
                            </span>

                            {/* Title with hover effect */}
                            <div className="mt-4 flex items-start">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-200">
                                    {template?.product?.name || "Untitled Template"}
                                </h3>
                                <span className="ml-2 text-slate-400 group-hover:text-red-500 transition-colors duration-200">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 12 11"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mt-1"
                                    >
                                        <g
                                            stroke="currentColor"
                                            strokeWidth="1.25"
                                            fill="none"
                                            fillRule="evenodd"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M4.10437012.76923H1.83333333C1.37309604.76923 1 1.11362635 1 1.53846077v7.69230769c0 .42483442.37309604.76923077.83333333.76923077h8.33333334c.46023729 0 .83333333-.34439635.83333333-.76923077V7.03051681M7.4205317.78000087h3.20254469c.21241721 0 .38461538.17219818.38461538.38461539V4.345704M10.5 1.5L6 5.84615385"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>

                            {/* Description with improved styling */}
                            <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                                {truncateText(template?.product?.description, 100) || "No description available"}
                            </p>

                            {/* Tags with improved styling and layout */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {template?.product?.tags && template.product.tags.length > 0 ? (
                                    template.product.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                        <span
                                            key={tagIndex}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors duration-200 ${selectedTags.includes(tag)
                                                ? "bg-red-200 text-red-800"
                                                : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-400">
                                        No tags available
                                    </span>
                                )}
                                {template?.product?.tags && template.product.tags.length > 3 && (
                                    <span className="text-xs text-slate-500 self-center">+{template.product.tags.length - 3} more</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            );
        }

        return items;
    };

    return (
        <section id="template-section">

            <Header />


<br/>
<br/>
<br/>
<br/>
<br/>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page header with improved spacing and typography */}
                <div className="pt-4 pb-12 md:pt-12 md:pb-18">
                    <div className="mx-auto text-center">
                        <h1 className="font-funneldisplay text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-4xl mb-6">
                            <span className="block">Websites built on Wonder</span>
                            <span className="block text-red-600">and a few templates.</span>
                        </h1>


                        {/* Tag filtering section */}
                        <div className="mt-12 mb-8">
                            <div className="mb-4 max-w-4xl m-auto">
                                <div className="flex flex-wrap justify-center gap-2 mx-auto">
                                    {/* Make "free design" always appear first and highlighted */}
                                    <button
                                        onClick={() => toggleTag("free design")}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.includes("free design")
                                            ? "bg-red-500 text-white"
                                            : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        free design
                                        {selectedTags.includes("free design") && (
                                            <span className="ml-1.5">×</span>
                                        )}
                                    </button>

                                    {/* Popular tags (with more than 1 template) */}
                                    {popularTags
                                        .filter(({ tag }) => tag !== "free design") // Skip "free design" as we already added it
                                        .map(({ tag, count }) => (
                                            <button
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.includes(tag)
                                                    ? "bg-red-500 text-white"
                                                    : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {tag}
                                                {selectedTags.includes(tag) && (
                                                    <span className="ml-1.5">×</span>
                                                )}
                                            </button>
                                        ))}

                                    {/* Lesser tags (with 1 template) - only shown when showAllTags is true */}
                                    {showAllTags && lesserTags
                                        .filter(({ tag }) => tag !== "free design") // Skip "free design" as we already added it
                                        .map(({ tag, count }) => (
                                            <button
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.includes(tag)
                                                    ? "bg-red-500 text-white"
                                                    : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {tag}
                                                {selectedTags.includes(tag) && (
                                                    <span className="ml-1.5">×</span>
                                                )}
                                            </button>
                                        ))}
                                </div>

                                {/* Show/Hide Tags Toggle */}
                                {lesserTags.length > 0 && (
                                    <button
                                        onClick={toggleShowAllTags}
                                        className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                    >
                                        {showAllTags ? "Show less" : `Show all (${lesserTags.length} more)`}
                                    </button>
                                )}

                                <div className="mt-4 flex justify-center items-center gap-3">
                                    {selectedTags.length > 0 && (
                                        <button
                                            onClick={clearTags}
                                            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                        >
                                            Clear all filters
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="text-sm text-slate-600">
                                {selectedTags.length > 0 ? (
                                    <p>Showing {filteredTemplates.length} templates matching your filters</p>
                                ) : (
                                    <p>Showing all {templates.length} templates</p>
                                )}
                            </div>
                        </div>


                    </div>

                    {/* Loading state */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-md h-12 w-12 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Empty state */}
                            {filteredTemplates.length === 0 && (
                                <div className="text-center py-16">
                                    <h3 className="text-lg font-medium text-slate-900 mb-2">No templates found</h3>
                                    <p className="text-slate-600">Try adjusting your filter selection or clear all filters.</p>
                                </div>
                            )}

                            {/* Template grid with banners inserted at specific positions */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {renderTemplateItems()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

// Wrapper component with Suspense
export default function TemplateClient() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen"> {/* Added min-h-screen */}
                <div className="animate-spin rounded-md h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        }>
            <TemplateClientContent />
        </Suspense>
    );
}