/**
 * ===========================================
 * HOME PAGE
 * ===========================================
 * Work-first IA (F2): Hero → Featured Work → rest.
 * Hobi remains visible (D6).
 */

import { setRequestLocale } from 'next-intl/server';
import {
    HeroSection,
    TechMarqueeSection,
    AboutSummarySection,
    HobiSection,
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
            <HeroSection />

            {/* Work immediately after hero */}
            <ShowcaseProjectsSection />

            <TechMarqueeSection />

            <AboutSummarySection />

            {/* D6: Hobi stays visible */}
            <HobiSection />

            <EducationSection />

            <WorkExperienceSection />

            <AchievementsSection />
        </main>
    );
}
