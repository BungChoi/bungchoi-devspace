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

// Sub-types for structured project content (with LocalizedString support)
export interface ProjectOverview {
    summary: LocalizedString;
    context?: LocalizedString;
    goals?: LocalizedString[];
    targetUsers?: {
        primary: LocalizedString;
        secondary?: LocalizedString;
        useCase?: LocalizedString;
    };
}

export interface ProjectChallenge {
    painPoints?: LocalizedString[];
    constraints?: LocalizedString[];
    risks?: LocalizedString[];
}

export interface ProjectSolution {
    approach?: LocalizedString;
    keyDecisions?: { decision: LocalizedString; reason: LocalizedString }[];
    highlights?: LocalizedString[];
}

export interface ProjectFeature {
    name: LocalizedString;
    benefit: LocalizedString;
    techNote?: string; // Technical notes stay in English
}

export interface ProjectUserFlow {
    title: LocalizedString;
    steps: LocalizedString[];
}

export interface ProjectArchitecture {
    stack: {
        frontend?: string; // Tech names don't need translation
        stateManagement?: string;
        backend?: string;
        tools?: string[];
    };
    notes?: LocalizedString[];
}

export interface ProjectResult {
    outcomes?: LocalizedString[];
    impact?: LocalizedString[];
}

export interface Project {
    id: string;
    title: string; // Project names stay the same
    subtitle?: LocalizedString;
    description: LocalizedString;
    longDescription?: LocalizedString;
    image: string;
    tags: string[]; // Tech tags don't need translation
    liveUrl?: string;
    githubUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    featured?: boolean;
    year: number;

    // Extended content fields
    role?: LocalizedString;
    platform?: LocalizedString;
    status?: LocalizedString;
    timeline?: string;
    team?: LocalizedString;

    // Rich content sections
    overview?: ProjectOverview;
    challenges?: ProjectChallenge;
    solution?: ProjectSolution;
    contributions?: LocalizedString[];
    features?: ProjectFeature[];
    roleBasedFeatures?: {
        [role: string]: LocalizedString[];
    };
    userFlows?: ProjectUserFlow[];
    architecture?: ProjectArchitecture;
    results?: ProjectResult;
    lessonsLearned?: LocalizedString[];
    nextImprovements?: LocalizedString[];
    screenshots?: { title: LocalizedString; caption: LocalizedString; image?: string }[];
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
