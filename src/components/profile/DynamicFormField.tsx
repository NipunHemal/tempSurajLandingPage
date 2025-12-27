
'use client';

import { useRef, useState, useEffect } from 'react';
import { Control, ControllerRenderProps, FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormField as ShadcnFormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Loader2, Upload, Pencil } from 'lucide-react';
import { useUploadImage } from '@/service/query/useUpload';
import { toast } from 'sonner';
import type { Field } from '@/types/api-meta-types';

import { MetaData } from '@/types/api-meta-types';

const baseValidators = {
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select a gender.' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  profilePicture: z.string().min(1, { message: 'Required' }),
  nicPic: z.string().min(1, { message: 'Required' }),
  profilePictureUploadId: z.string().min(1, { message: 'Required' }),
  nicPicUploadId: z.string().min(1, { message: 'Required' }),
  year: z.coerce.number(),
  nic: z.string().min(1, { message: 'Required' }),
  alYear: z.coerce.number(),
  olYear: z.coerce.number(),
  stream: z.string().min(1, { message: 'Required' }),
  medium: z.string().min(1, { message: 'Required' }),
  school: z.string().min(1, { message: 'Required' }),
  whatsappNumber: z.string().min(1, { message: 'Required' }),
  telegramNumber: z.string().min(1, { message: 'Required' }),
  shySelect: z.coerce.number(),
  postalcode: z.string().min(1, { message: 'Required' }),
  homeAddress: z.string().min(1, { message: 'Required' }),
  deliveryAddress: z.string().min(1, { message: 'Required' }),
  guardianName: z.string().min(1, { message: 'Required' }),
  relationship: z.string().min(1, { message: 'Required' }),
  guardianContactNumber: z.string().min(1, { message: 'Required' }),
  city: z.string().min(1, { message: 'Required' }),
  district: z.string().min(1, { message: 'Required' }),
  province: z.string().min(1, { message: 'Required' }),
  country: z.string().min(1, { message: 'Required' }),
  instituteNumber: z.string().min(1, { message: 'Required' }),
  instituteCardImage: z.string().min(1, { message: 'Required' }),
  instituteCardImageUploadId: z.string().min(1, { message: 'Required' }),
};

export const createProfileFormSchema = (meta: MetaData | null) => {
  const shape: Record<keyof typeof baseValidators, z.ZodTypeAny> = {} as any;
  const enabledFields = new Set<string>();

  if (meta) {
    meta.settings.STUDENT_PROFILE.fields.forEach((field) => {
      if (field.isEnabled) {
        enabledFields.add(field.fieldName);
      }
    });
  }

  // Always required fields if not in meta (fallback)
  const defaultRequired = ['firstName', 'lastName', 'gender', 'phoneNumber'];

  for (const [key, validator] of Object.entries(baseValidators)) {
    let isRequired = false;

    if (meta) {
      if (enabledFields.has(key)) {
        isRequired = true;
      }
      // Special case: if it's one of the core fields and meta doesn't explicitly disable it (conceptually),
      // strictly speaking relying on enabledFields.has(key) is correct per user request.
      // But we should ensure core fields are in the meta if we rely 100% on it.
      // The user provided JSON shows core fields like firstName ARE in the meta and are enabled.
    } else {
      // Fallback for when meta is not loaded yet
      if (defaultRequired.includes(key)) {
        isRequired = true;
      }
    }

    // Special handling for upload IDs to match their visual fields if needed, 
    // or just leave them optional to avoid validation blocking if the user hasn't uploaded yet? 
    // Usually hidden fields rely on the main field validation unless we manually link them.
    // Let's make them optional by default to avoid issues, unless we want to enforce upload.
    // If 'profilePicture' is required, the UI shows a visual error. The form submit handler might check strictness.
    // zod schema validation runs on submit. If profilePicture is required, string must be present.
    // If we want to strictly require the upload ID, we'd need to map that too.
    // For now, let's treat the visual field (e.g. CAO) as the source of truth for "requiredness".

    shape[key as keyof typeof baseValidators] = isRequired ? validator : validator.optional();
  }

  return z.object(shape);
};

// Default schema for type inference and initial state
export const profileFormSchema = createProfileFormSchema(null);

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface DynamicFormFieldProps {
  control: Control<ProfileFormValues>;
  fieldConfig: Field;
  form: UseFormReturn<ProfileFormValues>;
}

export function DynamicFormField({ control, fieldConfig, form }: DynamicFormFieldProps) {
  const fieldName = fieldConfig.fieldName as keyof ProfileFormValues;

  let label = fieldConfig.fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  if (fieldName === 'shySelect') {
    label = 'Select Your Exam Shy';
  }
  if (fieldName === 'year') {
    label = 'Exam Year';
  }
  label += (fieldConfig.required ? ' *' : '');


  const existingImageValue = form.watch(fieldName);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  useEffect(() => {
    // Only set preview from existing value if it looks like a URL
    if (typeof existingImageValue === 'string' && existingImageValue.startsWith('http')) {
      setPreview(existingImageValue);
    }
  }, [existingImageValue]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'nic' | 'class' | 'institute_card_image',
    field: keyof ProfileFormValues
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage(
        { image: file, type },
        {
          onSuccess: (data) => {
            form.setValue(field, data.data.uploadId);
            toast.success(`${type === 'profile' ? 'Profile picture' : type === 'nic' ? 'NIC image' : 'Institute card image'} uploaded!`);
          },
          onError: () => {
            setPreview(null);
          },
        }
      );
    }
  };



  const renderField = (rhfProps: ControllerRenderProps<ProfileFormValues, keyof ProfileFormValues>) => {
    if (fieldConfig.enum) {
      return (
        <Select onValueChange={rhfProps.onChange} value={rhfProps.value as string | undefined} defaultValue={rhfProps.value as string | undefined}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={`Select a ${label.replace(' *', '')}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {fieldConfig.enum?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    switch (fieldName) {
      case 'profilePicture':
        return (
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'profile', 'profilePictureUploadId')}
            />
            <div className="relative group" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarImage src={preview || undefined} alt="Profile Picture" />
                <AvatarFallback className="text-3xl">
                  <Upload />
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full border-2 border-background cursor-pointer group-hover:bg-gray-700 transition-colors">
                <Pencil className="text-white w-4 h-4" />
              </div>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}
            </div>
          </div>
        );
      case 'nicPic':
      case 'instituteCardImage':
        const uploadType = fieldName === 'nicPic' ? 'nic' : 'institute_card_image';
        const buttonText = fieldName === 'nicPic' ? 'NIC Image' : 'Institute Card Image';
        const uploadIdField = fieldName === 'nicPic' ? 'nicPicUploadId' : 'instituteCardImageUploadId';
        return (
          <div className="col-span-full">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, uploadType, uploadIdField as any)}
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {preview ? `Change ${buttonText}` : `Upload ${buttonText}`}
            </Button>
            {preview && (
              <div className="relative mt-4 h-48 w-full">
                <Image src={preview} alt={`${buttonText} Preview`} fill className="object-contain rounded-md border" />
              </div>
            )}
          </div>
        );
      case 'shySelect':
        return (
          <Select onValueChange={(value) => rhfProps.onChange(Number(value))} value={rhfProps.value?.toString()}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your shy" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'alYear':
      case 'olYear':
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);
        return (
          <Select onValueChange={(value) => rhfProps.onChange(Number(value))} value={rhfProps.value?.toString()}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.replace(' *', '')}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'homeAddress':
      case 'deliveryAddress':
        return <Textarea placeholder={`Your ${label.replace(' *', '')}`} {...rhfProps} value={rhfProps.value ?? ''} />;
      default:
        const inputType = typeof form.getValues(fieldName) === 'number' ? 'number' : 'text';
        return <Input placeholder={`Your ${label.replace(' *', '')}`} {...rhfProps} value={rhfProps.value ?? ''} type={inputType} />;
    }
  };

  const isImageUpload = ['profilePicture', 'nicPic', 'instituteCardImage'].includes(fieldName);

  return (
    <ShadcnFormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={isImageUpload ? (fieldName === 'profilePicture' ? '' : 'col-span-full') : ''}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
