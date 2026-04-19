/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Main landing page of the portfolio website.
 * Composed of multiple sections.
 */

import { setRequestLocale } from 'next-intl/server';
import {
    HeroSection,
    TechMarqueeSection,
    AboutSummarySection,
    EducationSection,
    WorkExperienceSection,
    ShowcaseProjectsSection,
    AchievementsSection,
} from '@/components/sections';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="home-page relative">
            {/* Hero Section */}
            <HeroSection />

            {/* Tech Stack Marquee */}
            <TechMarqueeSection className="-mt-12 sm:-mt-16" />

            {/* About Summary */}
            <AboutSummarySection />

            {/* Education */}
            <EducationSection />

            {/* Work Experience */}
            <WorkExperienceSection />

            {/* Showcase Projects Section */}
            <ShowcaseProjectsSection />

            {/* Awards & Certifications */}
            <AchievementsSection />
        </main>
    );
}
