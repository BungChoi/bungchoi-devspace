/**
 * ===========================================
 * SECTIONS BARREL EXPORT
 * ===========================================
 * Re-export all section components organized by page
 * 
 * STRUCTURE:
 * - home/    → Landing page sections (Hero, Hobi, Showcase, BlogPreview)
 * - about/   → About page sections (Bio, Achievements, Experience)
 * - projects/→ Projects page sections (future)
 * - blog/    → Blog page sections (future)
 */

// ============================================
// HOME / LANDING PAGE SECTIONS
// ============================================
export {
    HeroSection,
    TechMarqueeSection,
    HobiSection,
    ShowcaseProjectsSection,
    BlogPreviewSection,
} from './home';

export type {
    HeroSectionProps,
    TechMarqueeSectionProps,
    HobiSectionProps,
    ShowcaseProjectsSectionProps,
    BlogPreviewSectionProps,
    Project,
} from './home';

// ============================================
// ABOUT PAGE SECTIONS
// ============================================
export {
    BioSection,
    AchievementsSection,
    ExperienceSection,
} from './about';

export type {
    BioSectionProps,
    AchievementsSectionProps,
    ExperienceSectionProps,
} from './about';

// ============================================
// PROJECTS PAGE SECTIONS
// ============================================
export {
    ProjectsHeaderSection,
    ProjectsGridSection,
} from './projects';

export type {
    ProjectsHeaderSectionProps,
    ProjectsGridSectionProps,
} from './projects';

// ============================================
// BLOG PAGE SECTIONS (Future)
// ============================================
// export { ... } from './blog';

