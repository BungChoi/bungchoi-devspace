/**
 * ===========================================
 * SECTIONS BARREL EXPORT
 * ===========================================
 * Re-export all section components for cleaner imports
 *
 * @example
 * import { HeroSection, HobiSection, ShowcaseProjectsSection } from '@/components/sections';
 */

// Hero Section
export { HeroSection } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

// Hobi Section (My Activity)
export { HobiSection } from './HobiSection';
export type { HobiSectionProps } from './HobiSection';

// Showcase Projects Section
export { ShowcaseProjectsSection } from './ShowcaseProjectsSection';
export type { ShowcaseProjectsSectionProps, Project } from './ShowcaseProjectsSection';

// Tech Marquee Section (used inside Hero)
export { TechMarqueeSection } from './TechMarqueeSection';
export type { TechMarqueeSectionProps } from './TechMarqueeSection';

// Future sections:
// export { BlogPreviewSection } from './BlogPreviewSection';
