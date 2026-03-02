import { z } from 'zod';

export const ClassicNavbarSchema = z.object({
    logoText: z.string().min(1, 'Logo text is required'),
    links: z.array(z.object({
        label: z.string(),
        href: z.string(),
    })),
    ctaText: z.string().min(1, 'CTA text is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
});

export const ClassicHeroSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    features: z.array(z.string()),
    ctaPrimaryText: z.string().min(1, 'Primary CTA text is required'),
    ctaSecondaryText: z.string().min(1, 'Secondary CTA text is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
});

export const ClassicVisualSchema = z.object({
    mainImage: z.string().url('Invalid image URL'),
});

export const ClassicTestimonialSchema = z.object({
    name: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5),
    avatar: z.string().url(),
});

export const ClassicViewSchema = z.object({
    navbar: ClassicNavbarSchema,
    hero: ClassicHeroSchema,
    visual: ClassicVisualSchema,
    testimonials: z.array(ClassicTestimonialSchema),
});

export type ClassicNavbarSchemaType = z.infer<typeof ClassicNavbarSchema>;
export type ClassicHeroSchemaType = z.infer<typeof ClassicHeroSchema>;
export type ClassicVisualSchemaType = z.infer<typeof ClassicVisualSchema>;
export type ClassicTestimonialSchemaType = z.infer<typeof ClassicTestimonialSchema>;
export type ClassicViewSchemaType = z.infer<typeof ClassicViewSchema>;
