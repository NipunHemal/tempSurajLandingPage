'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor } from '../../context/EditorContext';
import { mergeWithDefaults } from '../../utils';
import { ClassicViewSchemaType } from './schema';
import { defaultClassicData } from './defaultData';
import ClassicView from './ClassicView';

interface ClassicTemplateProps {
    data?: Partial<ClassicViewSchemaType>;
    isEditable?: boolean;
    onSave?: (data: ClassicViewSchemaType) => void;
}

export function ClassicTemplate({ data: initialData, isEditable = false, onSave }: ClassicTemplateProps) {
    const { setIsEditable, setOnSave, updatePageData } = useEditor();
    const [internalData, setInternalData] = useState<ClassicViewSchemaType>(() =>
        mergeWithDefaults(initialData as ClassicViewSchemaType, defaultClassicData)
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
            if (section === 'hero' && field.startsWith('features-')) {
                const index = parseInt(field.split('-')[1]);
                const newFeatures = [...newData.hero.features];
                newFeatures[index] = value;
                newData.hero = { ...newData.hero, features: newFeatures };
            } else if (section === 'testimonials') {
                const [fieldKey, indexStr] = field.split('-');
                const index = parseInt(indexStr);
                const newTestimonials = [...newData.testimonials];
                newTestimonials[index] = { ...newTestimonials[index], [fieldKey]: value };
                newData.testimonials = newTestimonials;
            } else {
                // @ts-ignore
                newData[section] = { ...newData[section], [field]: value };
            }

            // Sync with global EditorContext if needed
            updatePageData(`${section}.${field}`, value);

            return newData;
        });
    }, [updatePageData]);

    return <ClassicView data={internalData} isEditable={isEditable} onUpdate={handleUpdate} />;
}
