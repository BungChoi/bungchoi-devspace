/**
 * ===========================================
 * ABOUT PAGE
 * ===========================================
 * Full about page with bio, achievements, and experience.
 * Designed to communicate value and build trust.
 */

import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BioSection, AchievementsSection, ExperienceSection } from '@/components/sections/about';

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Learn more about my background, achievements, and experience as a mobile developer.',
};

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="relative pt-20">
            {/* Bio Section - Who I am */}
            <BioSection />

            {/* Experience & Education - My journey */}
            <ExperienceSection />

            {/* Awards & Certifications */}
            <AchievementsSection />
        </main>
    );
}
