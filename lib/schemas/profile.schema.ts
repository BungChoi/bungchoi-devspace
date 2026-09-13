import { z } from 'zod';
import { LocalizedStringSchema, SocialLinkSchema } from './common.schema';

export const StatItemSchema = z.object({
  label: LocalizedStringSchema,
  value: z.string().min(1),
  icon: z.string().min(1),
});

export const PersonalInfoSchema = z.object({
  name: z.string().min(1),
  title: LocalizedStringSchema,
  subtitle: LocalizedStringSchema.optional(),
  bio: LocalizedStringSchema,
  email: z.string().email(),
  phone: z.string().optional(),
  location: LocalizedStringSchema,
  avatar: z.string().optional(),
  resumeUrl: z.string().optional(),
  stats: z.array(StatItemSchema).optional(),
  socialLinks: z.array(SocialLinkSchema),
});

export type PersonalInfoZod = z.infer<typeof PersonalInfoSchema>;
