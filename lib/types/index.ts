/**
 * ===========================================
 * TYPE DEFINITIONS
 * ===========================================
 * Centralized TypeScript types for the application
 */

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
// EXPERIENCE TYPES
// ============================================
export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string; // undefined = current
    description: string;
    achievements?: string[];
    technologies?: string[];
    companyLogo?: string;
}

// ============================================
// EDUCATION TYPES
// ============================================
export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    description?: string;
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
// PROFILE / PERSONAL INFO TYPES
// ============================================
export interface Stat {
    label: string;
    value: string;
    icon?: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    subtitle?: string;
    bio: string;
    email: string;
    phone?: string;
    location: string;
    avatar?: string;
    resumeUrl?: string;
    socialLinks: SocialLink[];
    stats?: Stat[];
}

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
