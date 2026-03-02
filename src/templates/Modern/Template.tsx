"use client";

import React, { useMemo, useEffect } from "react";
import { View } from "./View";
import { defaultData } from "./defaultData";
import { ModernTemplateSchemaType } from "./schema";
import { mergeWithDefaults } from "../../utils";
import { useEditor } from "../../context/EditorContext";

interface ModernTemplateProps {
    data?: Partial<ModernTemplateSchemaType>;
    isEditable?: boolean;
    onSave?: (data: ModernTemplateSchemaType) => void;
}

export function ModernTemplate({ data, isEditable = false, onSave }: ModernTemplateProps) {
    const { setIsEditable, setOnSave } = useEditor();

    // Sync props with global editor context
    useEffect(() => {
        setIsEditable(isEditable);
    }, [isEditable, setIsEditable]);

    useEffect(() => {
        if (onSave) {
            setOnSave(onSave as any);
        }
    }, [onSave, setOnSave]);

    const mergedData = useMemo(() => {
        return mergeWithDefaults(
            data as ModernTemplateSchemaType | undefined,
            defaultData
        );
    }, [data]);

    return (
        <View
            data={mergedData}
            isEditable={isEditable}
        />
    );
}

export default ModernTemplate;
