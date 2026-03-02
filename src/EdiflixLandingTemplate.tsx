import React from 'react';
import { EditorProvider } from './context/EditorContext';
import { ModernTemplate } from './templates/Modern/Template';
import { ClassicTemplate } from './templates/ClassicView/Template';
import { NaturalTemplate } from './templates/Natural/Template';

import { ModernTemplateSchemaType } from './templates/Modern/schema';
import { ClassicViewSchemaType } from './templates/ClassicView/schema';
import { NaturalTemplateSchemaType } from './templates/Natural/schema';

type TemplateType = 'Modern' | 'ClassicView' | 'Natural';

interface EdiflixLandingTemplateProps {
    template: TemplateType;
    data?: ModernTemplateSchemaType | ClassicViewSchemaType | NaturalTemplateSchemaType | any;
    isEditable?: boolean;
    onSave?: (data: any) => void;
}

export function EdiflixLandingTemplate({
    template,
    data,
    isEditable = false,
    onSave,
}: EdiflixLandingTemplateProps) {
    const renderTemplate = () => {
        switch (template) {
            case 'Modern':
                return <ModernTemplate data={data as ModernTemplateSchemaType} isEditable={isEditable} onSave={onSave} />;
            case 'ClassicView':
                return <ClassicTemplate data={data as ClassicViewSchemaType} isEditable={isEditable} onSave={onSave} />;
            case 'Natural':
                return <NaturalTemplate data={data as NaturalTemplateSchemaType} isEditable={isEditable} onSave={onSave} />;
            default:
                return <div>Template "{template}" not found.</div>;
        }
    };

    return (
        <EditorProvider>
            {renderTemplate()}
        </EditorProvider>
    );
}
