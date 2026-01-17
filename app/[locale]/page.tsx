/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { setRequestLocale } from 'next-intl/server';
import { HeroSection, HobiSection, ShowcaseProjectsSection, BlogPreviewSection } from '@/components/sections';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="relative">
            {/* Hero Section */}
            <HeroSection />

            {/* My Activity Section - Spotify & GitHub */}
            <HobiSection />

            {/* Showcase Projects Section */}
            <ShowcaseProjectsSection />

            {/* Blog Preview Section */}
            <BlogPreviewSection />
        </main>
    );
}
