'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor } from '../../context/EditorContext';
import { mergeWithDefaults } from '../../utils';
import { NaturalTemplateSchemaType } from './schema';
import { defaultNaturalData } from './defaultData';
import NaturalView from './NaturalView';

interface NaturalTemplateProps {
    data?: Partial<NaturalTemplateSchemaType>;
    isEditable?: boolean;
    onSave?: (data: NaturalTemplateSchemaType) => void;
}

export function NaturalTemplate({ data: initialData, isEditable = false, onSave }: NaturalTemplateProps) {
    const { setIsEditable, setOnSave, updatePageData } = useEditor();
    const [internalData, setInternalData] = useState<NaturalTemplateSchemaType>(() =>
        mergeWithDefaults(initialData as NaturalTemplateSchemaType, defaultNaturalData)
    );

    useEffect(() => {
        setIsEditable(isEditable);
    }, [isEditable, setIsEditable]);

    useEffect(() => {
        if (onSave) {
            setOnSave(onSave);
        }
    }, [onSave, setOnSave]);

    const handleUpdate = useCallback((section: string, field: string, value: any) => {
        setInternalData((prev) => {
            const newData = { ...prev };

            // Handle array updates based on field name patterns
            if (section === 'navbar' && field.startsWith('links-')) {
                const index = parseInt(field.split('-')[1]);
                const newLinks = [...newData.navbar.links];
                newLinks[index] = value;
                newData.navbar = { ...newData.navbar, links: newLinks };
            } else if (section === 'hero' && field.startsWith('stats-')) {
                const parts = field.split('-');
                const index = parseInt(parts[1]);
                const key = parts[2];
                const newStats = [...newData.hero.stats];
                newStats[index] = { ...newStats[index], [key]: value };
                newData.hero = { ...newData.hero, stats: newStats };
            } else if (section === 'whyUs' && field.startsWith('features-')) {
                const parts = field.split('-');
                const index = parseInt(parts[1]);
                const key = parts[2];
                const newFeatures = [...newData.whyUs.features];
                newFeatures[index] = { ...newFeatures[index], [key]: value };
                newData.whyUs = { ...newData.whyUs, features: newFeatures };
            } else if (section === 'flowers' && field.startsWith('items-')) {
                const parts = field.split('-');
                const index = parseInt(parts[1]);
                const key = parts[2];
                const newItems = [...newData.flowers.items];
                newItems[index] = { ...newItems[index], [key]: value };
                newData.flowers = { ...newData.flowers, items: newItems };
            } else if (section === 'reviews' && field.startsWith('items-')) {
                const parts = field.split('-');
                const index = parseInt(parts[1]);
                const key = parts[2];
                const newItems = [...newData.reviews.items];
                newItems[index] = { ...newItems[index], [key]: value };
                newData.reviews = { ...newData.reviews, items: newItems };
            } else {
                // Fallback for simple flat object updates
                // @ts-ignore
                newData[section] = { ...newData[section], [field]: value };
            }

            // Sync with global EditorContext if needed
            updatePageData(`${section}.${field}`, value);

            return newData;
        });
    }, [updatePageData]);

    return <NaturalView data={internalData} isEditable={isEditable} onUpdate={handleUpdate} />;
}
