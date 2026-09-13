import { z } from 'zod';

export const LocalizedStringSchema = z.object({
  id: z.string().min(1, 'ID translation must not be empty'),
  en: z.string().min(1, 'EN translation must not be empty'),
});

export const SocialLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url('URL must be valid'),
  icon: z.string().min(1),
});

export type LocalizedStringZod = z.infer<typeof LocalizedStringSchema>;
export type SocialLinkZod = z.infer<typeof SocialLinkSchema>;
