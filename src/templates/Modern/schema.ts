import { z } from 'zod';

export const ModernHeroSchema = z.object({
    badge: z.string().min(1, 'Badge text is required'),
    title: z.string().min(1, 'Title is required'),
    titleAccent: z.string().min(1, 'Accent title is required'),
    description: z.string().min(1, 'Description is required'),
    ctaText: z.string().min(1, 'CTA text is required'),
});

export const ModernProductSchema = z.object({
    image: z.string().url('Invalid image URL'),
});

export const ModernTemplateSchema = z.object({
    hero: ModernHeroSchema,
    product: ModernProductSchema,
});

export type ModernHeroSchemaType = z.infer<typeof ModernHeroSchema>;
export type ModernProductSchemaType = z.infer<typeof ModernProductSchema>;
export type ModernTemplateSchemaType = z.infer<typeof ModernTemplateSchema>;
