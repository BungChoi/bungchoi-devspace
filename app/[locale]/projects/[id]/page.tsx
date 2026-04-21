/**
 * ===========================================
 * PROJECT DETAIL PAGE - Simple Layout Draft
 * ===========================================
 * Temporary dummy layout for reviewing project detail presentation.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { projects } from '@/lib/data';
import { locales, Locale } from '@/lib/i18n/config';
import { t } from '@/lib/utils/localization';

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

interface DetailDraft {
    title: string;
    badge: string;
    sourceLabel: string;
    sourceUrl: string;
    sections: {
        overview: string;
        problem: string;
        solution: string;
        features: string[];
        technologies: string[];
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: project.title,
        description: t(project.description, locale as Locale),
    };
}

export async function generateStaticParams() {
    return locales.flatMap((locale) =>
        projects.map((project) => ({
            locale,
            id: project.id,
        }))
    );
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);
    const loc = locale as Locale;

    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const label = getLabels(loc);
    const draft = getDummyDetail(loc);

    return (
        <main className="relative min-h-screen pt-28 pb-20">
            <div className="container mx-auto max-w-5xl">
                <Link
                    href="/#projects"
                    className="mb-8 inline-flex text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--primary)]"
                >
                    {label.back}
                </Link>

                <article className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)]/45 p-6 sm:p-8 lg:p-10">
                    <header className="flex flex-col gap-5 border-b border-[var(--foreground)]/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                                {draft.title}
                            </h1>
                            <div className="mt-5">
                                <span className="inline-flex rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-2 text-sm font-semibold text-[var(--primary)]">
                                    {draft.badge}
                                </span>
                            </div>
                        </div>

                        <a
                            href={draft.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-[var(--foreground)]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                        >
                            <GithubIcon />
                            {draft.sourceLabel}
                        </a>
                    </header>

                    {project.image && (
                        <figure className="border-b border-[var(--foreground)]/10 py-8">
                            <div className="relative aspect-video overflow-hidden rounded-lg border border-[var(--foreground)]/10 bg-[var(--background-tertiary)]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 960px"
                                    priority
                                />
                            </div>
                        </figure>
                    )}

                    <div>
                        <ContentSection title={label.overview} accent="primary">
                            <Paragraph>{draft.sections.overview}</Paragraph>
                        </ContentSection>

                        <ContentSection title={label.problem} accent="amber">
                            <Paragraph>{draft.sections.problem}</Paragraph>
                        </ContentSection>

                        <ContentSection title={label.solution} accent="primary">
                            <Paragraph>{draft.sections.solution}</Paragraph>
                        </ContentSection>

                        <ContentSection title={label.features} accent="primary">
                            <FeatureGrid items={draft.sections.features} />
                        </ContentSection>

                        <ContentSection title={label.technologies} accent="primary" isLast>
                            <TagList tags={draft.sections.technologies} />
                        </ContentSection>
                    </div>
                </article>
            </div>
        </main>
    );
}

function ContentSection({
    title,
    accent,
    isLast = false,
    children,
}: {
    title: string;
    accent: 'primary' | 'amber';
    isLast?: boolean;
    children: ReactNode;
}) {
    const accentClass = accent === 'amber' ? 'border-amber-400' : 'border-[var(--primary)]';

    return (
        <section className={isLast ? 'py-8' : 'border-b border-[var(--foreground)]/10 py-8'}>
            <h2 className={`border-l-4 ${accentClass} pl-4 text-xl font-bold leading-tight text-[var(--foreground)]`}>
                {title}
            </h2>
            <div className="mt-5">{children}</div>
        </section>
    );
}

function Paragraph({ children }: { children: ReactNode }) {
    return (
        <p className="max-w-none text-base leading-8 text-[var(--foreground-secondary)] sm:text-lg">
            {children}
        </p>
    );
}

function FeatureGrid({ items }: { items: string[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
                <div
                    key={item}
                    className="flex items-start gap-4 rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] px-4 py-4"
                >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                    <p className="text-sm font-medium leading-relaxed text-[var(--foreground-secondary)] sm:text-base">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
}

function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.04] px-4 py-2 text-sm font-semibold text-[var(--foreground-secondary)]"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

function GithubIcon() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.94c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.82 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
        </svg>
    );
}

function getDummyDetail(loc: Locale): DetailDraft {
    if (loc === 'en') {
        return {
            title: 'Mobile App Case Study',
            badge: 'Open Source',
            sourceLabel: 'Source',
            sourceUrl: 'https://github.com/example/mobile-app',
            sections: {
                overview:
                    'This project is a dummy mobile application case study created to review the project detail layout. The page is designed to explain the project in a simple sequence: what the product is, what problem it addresses, how the solution works, which features matter, and which technologies are used. The final content can later be replaced with real project data without changing the main reading structure.',
                problem:
                    'The main problem is that project detail pages can become too dense when every technical note, feature, role, and result is shown at once. A portfolio reader usually needs a cleaner flow that quickly explains context and value before going into implementation details. This layout keeps the story short, structured, and easier to scan.',
                solution:
                    'The solution is to use a compact report-style layout. Each section has one clear purpose, short descriptions, and a consistent visual marker. Features are grouped into simple cards so the page still feels alive, while technologies are placed at the end as supporting information.',
                features: [
                    'Clear project summary with enough context for first-time readers',
                    'Problem statement that explains why the project matters',
                    'Solution section focused on product direction and implementation approach',
                    'Feature cards for important capabilities without long paragraphs',
                    'Technology badges for quick stack recognition',
                    'Source link placed near the title for fast access',
                ],
                technologies: ['Flutter', 'Dart', 'REST API', 'Firebase', 'Figma'],
            },
        };
    }

    return {
        title: 'Studi Kasus Mobile App',
        badge: 'Open Source',
        sourceLabel: 'Source',
        sourceUrl: 'https://github.com/example/mobile-app',
        sections: {
            overview:
                'Project ini adalah dummy studi kasus aplikasi mobile untuk mengecek layout detail project. Halaman dibuat dengan alur sederhana: menjelaskan apa projectnya, masalah apa yang ingin diselesaikan, bagaimana solusinya, feature apa yang penting, dan teknologi apa yang digunakan. Nanti seluruh konten ini bisa diganti dengan data asli tanpa mengubah struktur utama halaman.',
            problem:
                'Masalah utamanya adalah halaman detail project sering terasa terlalu padat ketika semua catatan teknis, feature, role, dan hasil project ditampilkan sekaligus. Pembaca portfolio biasanya butuh alur yang lebih bersih agar cepat memahami konteks dan value sebelum melihat detail implementasi. Layout ini menjaga cerita tetap singkat, terstruktur, dan mudah dipindai.',
            solution:
                'Solusinya adalah memakai layout bergaya laporan ringkas. Setiap section punya fungsi yang jelas, deskripsi pendek, dan penanda visual yang konsisten. Feature dibuat dalam card sederhana agar halaman tetap hidup, sedangkan teknologi ditempatkan di akhir sebagai informasi pendukung.',
            features: [
                'Ringkasan project yang jelas untuk pembaca pertama kali',
                'Penjelasan masalah agar alasan project mudah dipahami',
                'Bagian solusi yang fokus pada arah produk dan pendekatan implementasi',
                'Card feature untuk menampilkan kemampuan penting tanpa paragraf panjang',
                'Badge teknologi agar stack cepat dikenali',
                'Link source diletakkan dekat judul agar mudah diakses',
            ],
            technologies: ['Flutter', 'Dart', 'REST API', 'Firebase', 'Figma'],
        },
    };
}

function getLabels(loc: Locale) {
    return {
        back: loc === 'id' ? '<- Kembali ke Beranda' : '<- Back to Home',
        overview: loc === 'id' ? 'Ringkasan' : 'Overview',
        problem: loc === 'id' ? 'Masalah' : 'Problem',
        solution: loc === 'id' ? 'Solusi' : 'Solution',
        features: loc === 'id' ? 'Feature' : 'Features',
        technologies: loc === 'id' ? 'Teknologi' : 'Technologies',
    };
}
