'use client';

/**
 * ===========================================
 * BLOG PREVIEW SECTION
 * ===========================================
 * Displays 4 latest blog posts in a grid layout
 * with a "See All" button linking to /blog page.
 */

import Link from 'next/link';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface BlogPreviewSectionProps {
    className?: string;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    link: string;
    image?: string;
}

// ============================================
// MOCK DATA - TODO: Replace with CMS/API
// ============================================

const latestPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Building Scalable Flutter Apps with GetX',
        excerpt: 'Learn how to structure your Flutter applications for scalability and maintainability using the GetX state management library.',
        date: 'Jan 10, 2026',
        readTime: '5 min read',
        category: 'Flutter',
        link: '/blog/flutter-getx-scalability',
        image: '/blog/flutter-getx.jpg',
    },
    {
        id: '2',
        title: 'Next.js 14 vs 15: What\'s New?',
        excerpt: 'A deep dive into the new features and improvements in Next.js 15, and why you should consider upgrading your projects.',
        date: 'Jan 05, 2026',
        readTime: '8 min read',
        category: 'Next.js',
        link: '/blog/nextjs-15-whats-new',
        image: '/blog/nextjs-15.jpg',
    },
    {
        id: '3',
        title: 'Mastering Tailwind CSS v4',
        excerpt: 'Tips and tricks to get the most out of the new Tailwind CSS v4 engine, including new configuration options and performance boosts.',
        date: 'Dec 28, 2025',
        readTime: '6 min read',
        category: 'CSS',
        link: '/blog/mastering-tailwind-v4',
        image: '/blog/tailwind-v4.jpg',
    },
    {
        id: '4',
        title: 'The Future of Mobile Development',
        excerpt: 'Exploring emerging trends in mobile development, from cross-platform frameworks to AI integration in mobile apps.',
        date: 'Dec 15, 2025',
        readTime: '7 min read',
        category: 'Mobile',
        link: '/blog/mobile-dev-future',
        image: '/blog/mobile-future.jpg',
    },
];

// ============================================
// COMPONENT
// ============================================

export function BlogPreviewSection({ className }: BlogPreviewSectionProps) {
    return (
        <section
            id="blog"
            className={cn(
                'relative py-20 sm:py-28',
                className
            )}
        >
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        My Thoughts
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Latest <span className="text-gradient">Articles</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Insights, tutorials, and thoughts on software development and technology.
                    </p>
                </div>

                {/* Blog List (Vertical) */}
                <div className="flex flex-col gap-4 mb-12 max-w-4xl mx-auto">
                    {latestPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {/* See All Button */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className={cn(
                            'inline-flex items-center gap-2',
                            'px-8 py-3 rounded-full',
                            'bg-[var(--primary)] text-white font-medium',
                            'hover:bg-[var(--primary)]/90 transition-colors',
                            'shadow-lg shadow-[var(--primary)]/25'
                        )}
                    >
                        Read More Articles
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================
// BLOG CARD
// ============================================

interface BlogCardProps {
    post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={post.link}
            className={cn(
                'group block',
                'p-6 sm:p-8 rounded-xl',
                'bg-[var(--background)]/40 backdrop-blur-xl',
                'border border-[var(--primary)]/30',
                'shadow-sm hover:shadow-md transition-all duration-300',
                'hover:border-[var(--primary)]/60'
            )}
        >
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                {/* Content Left */}
                <div className="flex-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-3 uppercase tracking-wider font-medium">
                        <span className="text-[var(--primary)]">{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[var(--foreground-secondary)] line-clamp-2 mb-4">
                        {post.excerpt}
                    </p>

                    {/* Footer - Read Info */}
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-[var(--foreground-muted)]">
                            {post.readTime}
                        </span>
                        <span className="text-[var(--primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read Article
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Image Right (Placeholder/Mock) */}
                <div className="w-full sm:w-48 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden bg-[var(--background-tertiary)] relative flex-shrink-0 border border-[var(--primary)]/10 group-hover:border-[var(--primary)]/30 transition-colors">
                    {/* Placeholder content until real images are hooked up */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                        📰
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { BlogPreviewSectionProps };
