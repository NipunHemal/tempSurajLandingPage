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

export { EditorProvider, Hi, ModernTemplate, ModernTemplateSchema, type ModernTemplateSchemaType, useEditor };
