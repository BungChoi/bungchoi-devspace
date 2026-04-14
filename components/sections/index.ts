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
    AboutSummarySection,
    TechMarqueeSection,
    HobiSection,
    ShowcaseProjectsSection,
    BlogPreviewSection,
    ContactSection,
} from './home';

export type {
    HeroSectionProps,
    AboutSummarySectionProps,
    TechMarqueeSectionProps,
    HobiSectionProps,
    ShowcaseProjectsSectionProps,
    BlogPreviewSectionProps,
    ContactSectionProps,
} from './home';

// ============================================
// ABOUT PAGE SECTIONS
// ============================================
export {
    BioSection,
    SkillsSection,
    AchievementsSection,
    ExperienceSection,
} from './about';

export type {
    BioSectionProps,
    SkillsSectionProps,
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
