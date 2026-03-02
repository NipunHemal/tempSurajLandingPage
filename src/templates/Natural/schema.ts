import { z } from 'zod';

export const NaturalNavbarSchema = z.object({
    logoText: z.string().min(1, 'Logo text is required'),
    logoSubText: z.string(),
    links: z.array(z.string()),
    ctaText: z.string().min(1, 'CTA text is required'),
});

export const NaturalHeroStatSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export const NaturalHeroSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    ctaPrimaryText: z.string().min(1, 'Primary CTA text is required'),
    ctaSecondaryText: z.string().min(1, 'Secondary CTA text is required'),
    stats: z.array(NaturalHeroStatSchema),
    image: z.string().url('Invalid image URL'),
    imageBadgeTitle: z.string(),
    imageBadgeDesc: z.string(),
});

export const NaturalWhyUsFeatureSchema = z.object({
    title: z.string(),
    desc: z.string()
});

export const NaturalWhyUsSchema = z.object({
    sectionTitle: z.string(),
    features: z.array(NaturalWhyUsFeatureSchema)
});

export const NaturalFlowersProductSchema = z.object({
    name: z.string(),
    img: z.string().url()
});

export const NaturalFlowersSchema = z.object({
    sectionTitle: z.string(),
    ctaText: z.string(),
    items: z.array(NaturalFlowersProductSchema)
});

export const NaturalTestimonialSchema = z.object({
    type: z.string(),
    quote: z.string()
});

export const NaturalReviewsSchema = z.object({
    sectionTitle: z.string(),
    items: z.array(NaturalTestimonialSchema)
});

export const NaturalContactSchema = z.object({
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    footerText1: z.string(),
    footerText2: z.string(),
    footerText3: z.string()
});

export const NaturalTemplateSchema = z.object({
    navbar: NaturalNavbarSchema,
    hero: NaturalHeroSchema,
    whyUs: NaturalWhyUsSchema,
    flowers: NaturalFlowersSchema,
    reviews: NaturalReviewsSchema,
    contact: NaturalContactSchema
});

export type NaturalNavbarSchemaType = z.infer<typeof NaturalNavbarSchema>;
export type NaturalHeroSchemaType = z.infer<typeof NaturalHeroSchema>;
export type NaturalWhyUsSchemaType = z.infer<typeof NaturalWhyUsSchema>;
export type NaturalFlowersSchemaType = z.infer<typeof NaturalFlowersSchema>;
export type NaturalReviewsSchemaType = z.infer<typeof NaturalReviewsSchema>;
export type NaturalContactSchemaType = z.infer<typeof NaturalContactSchema>;
export type NaturalTemplateSchemaType = z.infer<typeof NaturalTemplateSchema>;
