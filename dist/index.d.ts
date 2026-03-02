import React from 'react';
import { z } from 'zod';

declare function Hi(): React.JSX.Element;

declare const ModernTemplateSchema: z.ZodObject<{
    hero: z.ZodObject<{
        badge: z.ZodString;
        title: z.ZodString;
        titleAccent: z.ZodString;
        description: z.ZodString;
        ctaText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        badge: string;
        titleAccent: string;
        description: string;
        ctaText: string;
    }, {
        title: string;
        badge: string;
        titleAccent: string;
        description: string;
        ctaText: string;
    }>;
    product: z.ZodObject<{
        image: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        image: string;
    }, {
        image: string;
    }>;
}, "strip", z.ZodTypeAny, {
    hero: {
        title: string;
        badge: string;
        titleAccent: string;
        description: string;
        ctaText: string;
    };
    product: {
        image: string;
    };
}, {
    hero: {
        title: string;
        badge: string;
        titleAccent: string;
        description: string;
        ctaText: string;
    };
    product: {
        image: string;
    };
}>;
type ModernTemplateSchemaType = z.infer<typeof ModernTemplateSchema>;

interface ModernTemplateProps {
    data?: Partial<ModernTemplateSchemaType>;
    isEditable?: boolean;
    onSave?: (data: ModernTemplateSchemaType) => void;
}
declare function ModernTemplate({ data, isEditable, onSave }: ModernTemplateProps): React.JSX.Element;

declare const ClassicViewSchema: z.ZodObject<{
    navbar: z.ZodObject<{
        logoText: z.ZodString;
        links: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            href: string;
        }, {
            label: string;
            href: string;
        }>, "many">;
        ctaText: z.ZodString;
        phoneNumber: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ctaText: string;
        logoText: string;
        links: {
            label: string;
            href: string;
        }[];
        phoneNumber: string;
    }, {
        ctaText: string;
        logoText: string;
        links: {
            label: string;
            href: string;
        }[];
        phoneNumber: string;
    }>;
    hero: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        features: z.ZodArray<z.ZodString, "many">;
        ctaPrimaryText: z.ZodString;
        ctaSecondaryText: z.ZodString;
        phoneNumber: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        phoneNumber: string;
        features: string[];
        ctaPrimaryText: string;
        ctaSecondaryText: string;
    }, {
        title: string;
        description: string;
        phoneNumber: string;
        features: string[];
        ctaPrimaryText: string;
        ctaSecondaryText: string;
    }>;
    visual: z.ZodObject<{
        mainImage: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mainImage: string;
    }, {
        mainImage: string;
    }>;
    testimonials: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        content: z.ZodString;
        rating: z.ZodNumber;
        avatar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        content: string;
        rating: number;
        avatar: string;
    }, {
        name: string;
        content: string;
        rating: number;
        avatar: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    hero: {
        title: string;
        description: string;
        phoneNumber: string;
        features: string[];
        ctaPrimaryText: string;
        ctaSecondaryText: string;
    };
    navbar: {
        ctaText: string;
        logoText: string;
        links: {
            label: string;
            href: string;
        }[];
        phoneNumber: string;
    };
    visual: {
        mainImage: string;
    };
    testimonials: {
        name: string;
        content: string;
        rating: number;
        avatar: string;
    }[];
}, {
    hero: {
        title: string;
        description: string;
        phoneNumber: string;
        features: string[];
        ctaPrimaryText: string;
        ctaSecondaryText: string;
    };
    navbar: {
        ctaText: string;
        logoText: string;
        links: {
            label: string;
            href: string;
        }[];
        phoneNumber: string;
    };
    visual: {
        mainImage: string;
    };
    testimonials: {
        name: string;
        content: string;
        rating: number;
        avatar: string;
    }[];
}>;
type ClassicViewSchemaType = z.infer<typeof ClassicViewSchema>;

interface ClassicTemplateProps {
    data?: Partial<ClassicViewSchemaType>;
    isEditable?: boolean;
    onSave?: (data: ClassicViewSchemaType) => void;
}
declare function ClassicTemplate({ data: initialData, isEditable, onSave }: ClassicTemplateProps): React.JSX.Element;

declare const NaturalTemplateSchema: z.ZodObject<{
    navbar: z.ZodObject<{
        logoText: z.ZodString;
        logoSubText: z.ZodString;
        links: z.ZodArray<z.ZodString, "many">;
        ctaText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ctaText: string;
        logoText: string;
        links: string[];
        logoSubText: string;
    }, {
        ctaText: string;
        logoText: string;
        links: string[];
        logoSubText: string;
    }>;
    hero: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        ctaPrimaryText: z.ZodString;
        ctaSecondaryText: z.ZodString;
        stats: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            label: string;
        }, {
            value: string;
            label: string;
        }>, "many">;
        image: z.ZodString;
        imageBadgeTitle: z.ZodString;
        imageBadgeDesc: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        image: string;
        description: string;
        ctaPrimaryText: string;
        ctaSecondaryText: string;
        stats: {
            value: string;
            label: string;
        }[];
        imageBadgeTitle: string;
        imageBadgeDesc: string;
    }, {
        title: string;
        image: string;
        description: string;
        ctaPrimaryText: string;
        ctaSecondaryText: string;
        stats: {
            value: string;
            label: string;
        }[];
        imageBadgeTitle: string;
        imageBadgeDesc: string;
    }>;
    whyUs: z.ZodObject<{
        sectionTitle: z.ZodString;
        features: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            desc: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            desc: string;
        }, {
            title: string;
            desc: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        features: {
            title: string;
            desc: string;
        }[];
        sectionTitle: string;
    }, {
        features: {
            title: string;
            desc: string;
        }[];
        sectionTitle: string;
    }>;
    flowers: z.ZodObject<{
        sectionTitle: z.ZodString;
        ctaText: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            img: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            img: string;
        }, {
            name: string;
            img: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        ctaText: string;
        sectionTitle: string;
        items: {
            name: string;
            img: string;
        }[];
    }, {
        ctaText: string;
        sectionTitle: string;
        items: {
            name: string;
            img: string;
        }[];
    }>;
    reviews: z.ZodObject<{
        sectionTitle: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            quote: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            quote: string;
        }, {
            type: string;
            quote: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        sectionTitle: string;
        items: {
            type: string;
            quote: string;
        }[];
    }, {
        sectionTitle: string;
        items: {
            type: string;
            quote: string;
        }[];
    }>;
    contact: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        buttonText: z.ZodString;
        footerText1: z.ZodString;
        footerText2: z.ZodString;
        footerText3: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        buttonText: string;
        footerText1: string;
        footerText2: string;
        footerText3: string;
    }, {
        title: string;
        description: string;
        buttonText: string;
        footerText1: string;
        footerText2: string;
        footerText3: string;
    }>;
}, "strip", z.ZodTypeAny, {
    hero: {
        title: string;
        image: string;
        description: string;
        ctaPrimaryText: string;
        ctaSecondaryText: string;
        stats: {
            value: string;
            label: string;
        }[];
        imageBadgeTitle: string;
        imageBadgeDesc: string;
    };
    navbar: {
        ctaText: string;
        logoText: string;
        links: string[];
        logoSubText: string;
    };
    whyUs: {
        features: {
            title: string;
            desc: string;
        }[];
        sectionTitle: string;
    };
    flowers: {
        ctaText: string;
        sectionTitle: string;
        items: {
            name: string;
            img: string;
        }[];
    };
    reviews: {
        sectionTitle: string;
        items: {
            type: string;
            quote: string;
        }[];
    };
    contact: {
        title: string;
        description: string;
        buttonText: string;
        footerText1: string;
        footerText2: string;
        footerText3: string;
    };
}, {
    hero: {
        title: string;
        image: string;
        description: string;
        ctaPrimaryText: string;
        ctaSecondaryText: string;
        stats: {
            value: string;
            label: string;
        }[];
        imageBadgeTitle: string;
        imageBadgeDesc: string;
    };
    navbar: {
        ctaText: string;
        logoText: string;
        links: string[];
        logoSubText: string;
    };
    whyUs: {
        features: {
            title: string;
            desc: string;
        }[];
        sectionTitle: string;
    };
    flowers: {
        ctaText: string;
        sectionTitle: string;
        items: {
            name: string;
            img: string;
        }[];
    };
    reviews: {
        sectionTitle: string;
        items: {
            type: string;
            quote: string;
        }[];
    };
    contact: {
        title: string;
        description: string;
        buttonText: string;
        footerText1: string;
        footerText2: string;
        footerText3: string;
    };
}>;
type NaturalTemplateSchemaType = z.infer<typeof NaturalTemplateSchema>;

interface NaturalTemplateProps {
    data?: Partial<NaturalTemplateSchemaType>;
    isEditable?: boolean;
    onSave?: (data: NaturalTemplateSchemaType) => void;
}
declare function NaturalTemplate({ data: initialData, isEditable, onSave }: NaturalTemplateProps): React.JSX.Element;

interface EditorContextType {
    isEditable: boolean;
    pageData: Record<string, any>;
    hasChanges: boolean;
    setIsEditable: (value: boolean) => void;
    updatePageData: (key: string, value: any) => void;
    saveChanges: () => void;
    discardChanges: () => void;
    setOnSave: (cb: (data: any) => void) => void;
}
declare const EditorProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const useEditor: () => EditorContextType;

export { ClassicTemplate as ClassicView, ClassicViewSchema, type ClassicViewSchemaType, EditorProvider, Hi, ModernTemplate, ModernTemplateSchema, type ModernTemplateSchemaType, NaturalTemplateSchema, type NaturalTemplateSchemaType, NaturalTemplate as NaturalView, useEditor };
