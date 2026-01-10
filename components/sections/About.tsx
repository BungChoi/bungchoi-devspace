'use client';

/**
 * ===========================================
 * ABOUT SECTION COMPONENT
 * ===========================================
 * Section introducing the developer with
 * personal info, experience highlights, and photo.
 */

import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface AboutProps {
    className?: string;
}

// ============================================
// SAMPLE DATA - GANTI DENGAN DATA ANDA!
// ============================================

const aboutData = {
    // Paragraf tentang diri Anda
    paragraphs: [
        `Halo! Saya adalah seorang Mobile Developer yang bersemangat dalam 
        menciptakan aplikasi mobile yang indah dan berkinerja tinggi. 
        Dengan fokus utama pada Flutter, saya telah membangun berbagai 
        aplikasi yang membantu bisnis dan pengguna mencapai tujuan mereka.`,

        `Saya percaya bahwa teknologi harus membuat hidup lebih mudah. 
        Itulah mengapa saya selalu berusaha membuat aplikasi yang tidak 
        hanya fungsional, tetapi juga menyenangkan untuk digunakan.`,
    ],

    // Highlight/fakta singkat
    highlights: [
        { label: 'Lokasi', value: 'Indonesia 🇮🇩' },
        { label: 'Fokus', value: 'Mobile Development' },
        { label: 'Bahasa', value: 'Indonesia, English' },
        { label: 'Status', value: 'Open to Work' },
    ],

    // Pengalaman singkat (timeline)
    experiences: [
        {
            year: '2024',
            title: 'Freelance Mobile Developer',
            company: 'Self-Employed',
            description: 'Mengembangkan aplikasi mobile untuk berbagai klien.',
        },
        {
            year: '2023',
            title: 'Junior Flutter Developer',
            company: 'Tech Startup',
            description: 'Membangun fitur-fitur baru untuk aplikasi e-commerce.',
        },
        {
            year: '2022',
            title: 'Mulai Belajar Flutter',
            company: 'Self-Learning',
            description: 'Memulai perjalanan sebagai mobile developer.',
        },
    ],
};

// ============================================
// COMPONENT
// ============================================

export function About({ className }: AboutProps) {
    const { name, avatar } = personalInfo;

    return (
        <section
            id="about"
            className={cn(
                'relative py-20 sm:py-28',
                'bg-[var(--background-secondary)]',
                className
            )}
        >
            {/* Section Header */}
            <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        Tentang Saya
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Kenali Saya Lebih <span className="text-gradient">Dekat</span>
                    </h2>
                </div>

                {/* Main Content - Two Column */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Column - Image & Highlights */}
                    <div className="space-y-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-[var(--border)] bg-[var(--background-tertiary)]">
                                {/* Placeholder - Ganti dengan foto Anda */}
                                <div className="w-full h-full flex items-center justify-center text-[var(--foreground-muted)]">
                                    <div className="text-center p-8">
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                                            <span className="text-4xl">👨‍💻</span>
                                        </div>
                                        <p className="text-sm">Foto {name}</p>
                                        <p className="text-xs mt-1 text-[var(--foreground-muted)]">
                                            (Ganti di public/images/avatar.jpg)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--primary)]/30 rounded-2xl -z-10" />
                        </div>

                        {/* Quick Highlights */}
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                            {aboutData.highlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]"
                                >
                                    <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-1">
                                        {item.label}
                                    </p>
                                    <p className="font-semibold text-[var(--foreground)]">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Text & Timeline */}
                    <div className="space-y-8">
                        {/* About Paragraphs */}
                        <div className="space-y-4">
                            {aboutData.paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-[var(--foreground-secondary)] leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Experience Timeline */}
                        <div className="pt-6">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[var(--primary)]" />
                                Perjalanan Saya
                            </h3>

                            <div className="space-y-6">
                                {aboutData.experiences.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="relative pl-8 border-l-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--primary)]" />

                                        <div className="pb-6">
                                            <span className="text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded">
                                                {exp.year}
                                            </span>
                                            <h4 className="font-semibold mt-2">
                                                {exp.title}
                                            </h4>
                                            <p className="text-sm text-[var(--foreground-muted)]">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm text-[var(--foreground-secondary)] mt-1">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { AboutProps };
