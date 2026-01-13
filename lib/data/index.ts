/**
 * ===========================================
 * DATA EXPORTS
 * ===========================================
 * Re-export all data for easy imports
 */

export { personalInfo } from './profile';
export { projects, featuredProjects, getProjectsByYear } from './projects';
export { skills, getSkillsByCategory, skillCategoryLabels } from './skills';
export { experiences, educations, getCurrentPosition } from './experience';
export { achievements } from './achievements';
export type { Achievement } from './achievements';
