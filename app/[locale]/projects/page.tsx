/**
 * ===========================================
 * PROJECTS PAGE
 * ===========================================
 * Full projects listing with filtering options.
 */

import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { projects } from '@/lib/data';
import { ProjectsHeaderSection, ProjectsGridSection } from '@/components/sections/projects';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of mobile and web development projects.',
};

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="relative">
            {/* Header Section */}
            <ProjectsHeaderSection totalProjects={projects.length} />

            {/* Projects Grid with Filters */}
            <ProjectsGridSection projects={projects} />
        </main>
    );
}
