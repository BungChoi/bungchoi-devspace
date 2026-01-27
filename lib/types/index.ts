/**
 * ===========================================
 * TYPE DEFINITIONS
 * ===========================================
 * Centralized TypeScript types for the application
 */

// ============================================
// LOCALIZATION TYPES
// ============================================
export interface LocalizedString {
    id: string;
    en: string;
}

// ============================================
// NAVIGATION TYPES
// ============================================
export interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

// ============================================
// SOCIAL LINKS TYPES
// ============================================
export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

// ============================================
// PROJECT TYPES
// ============================================
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    featured?: boolean;
    year: number;
}

// ============================================
// SKILL TYPES
// ============================================
export interface Skill {
    name: string;
    icon?: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: SkillCategory;
}

export type SkillCategory =
    | 'mobile'
    | 'frontend'
    | 'backend'
    | 'database'
    | 'tools'
    | 'other';

// ============================================
// ACHIEVEMENT TYPES (with i18n support)
// ============================================
export interface Achievement {
    id: string;
    title: LocalizedString;
    issuer: LocalizedString;
    date: LocalizedString;
    description?: LocalizedString;
    certificateUrl?: string;
}

// ============================================
// EXPERIENCE TYPES (with i18n support)
// ============================================
export interface Experience {
    id: string;
    company: string;
    position: LocalizedString;
    startDate: LocalizedString;
    endDate?: LocalizedString; // undefined = current
    description: LocalizedString;
    achievements?: LocalizedString[];
    technologies?: string[];
    companyLogo?: string;
}

// ============================================
// EDUCATION TYPES (with i18n support)
// ============================================
export interface Education {
    id: string;
    institution: string;
    degree: LocalizedString;
    field: LocalizedString;
    startDate: LocalizedString;
    endDate?: LocalizedString;
    description?: LocalizedString;
    gpa?: string;
}

// ============================================
// CONTACT FORM TYPES
// ============================================
export interface ContactFormData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export interface ContactFormState {
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
}

// ============================================
// PROFILE / PERSONAL INFO TYPES (with i18n support)
// ============================================
export interface Stat {
    label: LocalizedString;
    value: string;
    icon?: string;
}

export interface PersonalInfo {
    name: string;
    title: LocalizedString;
    subtitle?: LocalizedString;
    bio: LocalizedString;
    email: string;
    phone?: string;
    location: LocalizedString;
    avatar?: string;
    resumeUrl?: string;
    socialLinks: SocialLink[];
    stats?: Stat[];
}

// Helper type for accessing localized content
export type Locale = 'id' | 'en';

// ============================================
// COMPONENT PROP TYPES
// ============================================
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
    id?: string;
    title?: string;
    subtitle?: string;
}
