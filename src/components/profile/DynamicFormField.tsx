'use client';

import { Control, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { FormField as ShadcnFormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Field } from '@/types/api-meta-types';
import { UploadField } from './fields/UploadField';
import { SelectField } from './fields/SelectField';

interface DynamicFormFieldProps {
  control: Control<any>;
  fieldConfig: Field;
  form: UseFormReturn<any>;
}

export function DynamicFormField({ control, fieldConfig, form }: DynamicFormFieldProps) {
  const fieldName = fieldConfig.fieldName;
  let label = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

  if (fieldName === 'shySelect') label = 'Select Your Exam Shy';
  if (fieldName === 'year') label = 'Exam Year';

  // Strict requirement based on isEnabled, consistent with schema
  const isRequired = fieldConfig.isEnabled;
  const labelWithAsterisk = isRequired ? `${label} *` : label;

  const renderField = (rhfProps: ControllerRenderProps<any, string>) => {
    // 1. Enum / Select Fields
    if (fieldConfig.enum) {
      return (
        <SelectField
          value={rhfProps.value}
          onChange={rhfProps.onChange}
          options={fieldConfig.enum}
          placeholder={`Select ${label}`}
        />
      );
    }

    // 2. Specific Select Logic (Years, Shy)
    if (fieldName === 'alYear' || fieldName === 'olYear') {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);
      return (
        <SelectField
          value={rhfProps.value}
          onChange={(val) => rhfProps.onChange(Number(val))}
          options={years}
          placeholder="Select Year"
        />
      );
    }

    if (fieldName === 'shySelect') {
      return (
        <SelectField
          value={rhfProps.value}
          onChange={(val) => rhfProps.onChange(Number(val))}
          options={[1, 2, 3, 4, 5]}
          placeholder="Select Shy"
        />
      );
    }

    // 3. Upload Fields
    const isImageField = ['profilePicture', 'nicPic', 'instituteCardImage'].includes(fieldName);
    if (isImageField) {
      // Variant mapping
      const variant = fieldName === 'profilePicture' ? 'avatar' : 'card';
      return (
        <UploadField
          label={label}
          value={rhfProps.value}
          onChange={rhfProps.onChange}
          variant={variant}
        />
      );
    }

    // 4. Textarea
    if (['homeAddress', 'deliveryAddress'].includes(fieldName)) {
      return <Textarea placeholder={label} {...rhfProps} value={rhfProps.value ?? ''} />;
    }

    // 5. Default Input
    const inputType = (fieldName.toLowerCase().includes('year') || fieldName === 'shySelect') ? 'number' : 'text';
    return (
      <Input
        placeholder={label}
        {...rhfProps}
        value={rhfProps.value ?? ''}
        type={inputType}
        onChange={(e) => {
          // Handle numeric inputs safely
          if (inputType === 'number') {
            rhfProps.onChange(e.target.valueAsNumber);
          } else {
            rhfProps.onChange(e);
          }
        }}
      />
    );
  };

  const isImageUpload = ['profilePicture', 'nicPic', 'instituteCardImage'].includes(fieldName);

  return (
    <ShadcnFormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={isImageUpload && fieldName !== 'profilePicture' ? 'col-span-full' : ''}>
          {fieldName !== 'profilePicture' && <FormLabel>{labelWithAsterisk}</FormLabel>}
          <FormControl>
            {renderField(field)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
