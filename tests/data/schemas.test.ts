import { describe, it, expect } from 'vitest';
import { projects } from '@/lib/data/projects';
import { personalInfo } from '@/lib/data/profile';
import { ProjectsListSchema } from '@/lib/schemas/project.schema';
import { PersonalInfoSchema } from '@/lib/schemas/profile.schema';

describe('Data Integrity & Schema Verification', () => {
  it('validates that all projects conform to ProjectsListSchema', () => {
    const result = ProjectsListSchema.safeParse(projects);
    if (!result.success) {
      console.error('Project Schema Validation Errors:', JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });

  it('validates that personal info conforms to PersonalInfoSchema', () => {
    const result = PersonalInfoSchema.safeParse(personalInfo);
    if (!result.success) {
      console.error('Profile Schema Validation Errors:', JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });
});
