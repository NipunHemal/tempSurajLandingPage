
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

// Centralized schema definition
export const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.').optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select a gender.' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  profilePicture: z.string().optional(),
  nicPic: z.string().optional(),
  profilePictureUploadId: z.string().optional(),
  nicPicUploadId: z.string().optional(),
  year: z.coerce.number().optional(),
  nic: z.string().optional(),
  alYear: z.coerce.number().optional(),
  olYear: z.coerce.number().optional(),
  stream: z.string().optional(),
  medium: z.string().optional(),
  school: z.string().optional(),
  whatsappNumber: z.string().optional(),
  telegramNumber: z.string().optional(),
  shySelect: z.coerce.number().optional(),
  postalcode: z.string().optional(),
  homeAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  guardianName: z.string().optional(),
  relationship: z.string().optional(),
  guardianContactNumber: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
  instituteNumber: z.string().optional(),
  instituteCardImage: z.string().optional(),
});

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
    type: 'profile' | 'nic' | 'class',
    field: 'profilePictureUploadId' | 'nicPicUploadId' | 'instituteCardImage'
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
        const uploadType = fieldName === 'nicPic' ? 'nic' : 'class';
        const buttonText = fieldName === 'nicPic' ? 'NIC Image' : 'Institute Card Image';
        const uploadIdField = fieldName === 'nicPic' ? 'nicPicUploadId' : 'instituteCardImage';
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
