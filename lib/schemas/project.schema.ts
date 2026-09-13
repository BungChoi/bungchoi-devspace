import { z } from 'zod';
import { LocalizedStringSchema } from './common.schema';

export const ProjectFeatureSchema = z.object({
  name: LocalizedStringSchema,
  benefit: LocalizedStringSchema,
  techNote: z.string().optional(),
});

export const ProjectUserFlowSchema = z.object({
  title: LocalizedStringSchema,
  steps: z.array(LocalizedStringSchema),
});

export const ProjectArchitectureSchema = z.object({
  stack: z.object({
    frontend: z.string().optional(),
    stateManagement: z.string().optional(),
    backend: z.string().optional(),
    tools: z.array(z.string()).optional(),
  }),
  notes: z.array(LocalizedStringSchema).optional(),
});

export const ProjectOverviewSchema = z.object({
  summary: LocalizedStringSchema,
  context: LocalizedStringSchema.optional(),
  goals: z.array(LocalizedStringSchema).optional(),
  targetUsers: z
    .object({
      primary: LocalizedStringSchema,
      secondary: LocalizedStringSchema.optional(),
      useCase: LocalizedStringSchema.optional(),
    })
    .optional(),
});

export const ProjectChallengeSchema = z.object({
  painPoints: z.array(LocalizedStringSchema).optional(),
  constraints: z.array(LocalizedStringSchema).optional(),
  risks: z.array(LocalizedStringSchema).optional(),
});

export const ProjectSolutionSchema = z.object({
  approach: LocalizedStringSchema.optional(),
  keyDecisions: z
    .array(
      z.object({
        decision: LocalizedStringSchema,
        reason: LocalizedStringSchema,
      })
    )
    .optional(),
  highlights: z.array(LocalizedStringSchema).optional(),
});

export const ProjectResultSchema = z.object({
  outcomes: z.array(LocalizedStringSchema).optional(),
  impact: z.array(LocalizedStringSchema).optional(),
});

export const ProjectSchema = z.object({
  id: z.string().min(1, 'Project id is required'),
  title: z.string().min(1, 'Project title is required'),
  subtitle: LocalizedStringSchema.optional(),
  description: LocalizedStringSchema,
  longDescription: LocalizedStringSchema.optional(),
  image: z.string().min(1, 'Project image path is required'),
  tags: z.array(z.string()).min(1, 'At least one tech tag is required'),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  playStoreUrl: z.string().optional(),
  appStoreUrl: z.string().optional(),
  featured: z.boolean().optional(),
  year: z.number().int().min(2020),

  role: LocalizedStringSchema.optional(),
  platform: LocalizedStringSchema.optional(),
  status: LocalizedStringSchema.optional(),
  timeline: z.union([LocalizedStringSchema, z.string()]).optional(),
  team: LocalizedStringSchema.optional(),

  overview: ProjectOverviewSchema.optional(),
  challenges: ProjectChallengeSchema.optional(),
  solution: ProjectSolutionSchema.optional(),
  contributions: z.array(LocalizedStringSchema).optional(),
  features: z.array(ProjectFeatureSchema).optional(),
  roleBasedFeatures: z.record(z.string(), z.array(LocalizedStringSchema)).optional(),
  userFlows: z.array(ProjectUserFlowSchema).optional(),
  architecture: ProjectArchitectureSchema.optional(),
  results: ProjectResultSchema.optional(),
});

export const ProjectsListSchema = z.array(ProjectSchema);

export type ProjectZod = z.infer<typeof ProjectSchema>;
