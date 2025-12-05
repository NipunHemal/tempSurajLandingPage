
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
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dob: z.date({ required_error: 'A date of birth is required.' }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select a gender.' }),
  phone_number: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  profile_picture: z.string().optional(),
  nic_pic: z.string().optional(),
  profile_picture_upload_id: z.string().optional(),
  nic_pic_upload_id: z.string().optional(),
  year: z.coerce.number().optional(),
  nic: z.string().optional(),
  al_year: z.coerce.number().optional(),
  ol_year: z.coerce.number().optional(),
  stream: z.string().optional(),
  medium: z.string().optional(),
  school: z.string().optional(),
  whatsapp_number: z.string().optional(),
  telegram_number: z.string().optional(),
  shy_select: z.coerce.number().optional(),
  postal_code: z.string().optional(),
  home_address: z.string().optional(),
  delivery_address: z.string().optional(),
  guardian_name: z.string().optional(),
  relationship: z.string().optional(),
  guardian_contact_number: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
  institute_number: z.string().optional(),
  institute_card_image: z.string().optional(),
  institute_card_image_upload_id: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface DynamicFormFieldProps {
  control: Control<ProfileFormValues>;
  fieldConfig: Field;
  form: UseFormReturn<ProfileFormValues>;
}

export function DynamicFormField({ control, fieldConfig: field_config, form }: DynamicFormFieldProps) {
  const fieldName = field_config.fieldName as keyof ProfileFormValues;
  
  let label = field_config.fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (fieldName === 'shy_select') {
    label = 'Select Your Exam Shy';
  }
  if (fieldName === 'year') {
    label = 'Exam Year';
  }
  label += (field_config.required ? ' *' : '');


  const existingImageValue = form.watch(fieldName);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  
  useEffect(() => {
    if (typeof existingImageValue === 'string' && (existingImageValue.startsWith('http') || existingImageValue.startsWith('/'))) {
      setPreview(existingImageValue);
    }
  }, [existingImageValue]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'nic' | 'class',
    uploadIdField: 'profile_picture_upload_id' | 'nic_pic_upload_id' | 'institute_card_image_upload_id'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage(
        { image: file, type },
        {
          onSuccess: (data) => {
            form.setValue(uploadIdField, data.data.uploadId);
            toast.success(`${type === 'profile' ? 'Profile picture' : type === 'nic' ? 'NIC image' : 'Institute card image'} uploaded!`);
          },
          onError: () => {
            setPreview(null);
          },
        }
      );
    }
  };

  console.log("⚡⚡⚡" , preview)

  const renderField = (rhfProps: ControllerRenderProps<ProfileFormValues, keyof ProfileFormValues>) => {
    if (field_config.enum) {
      return (
        <Select onValueChange={rhfProps.onChange} value={rhfProps.value as string | undefined} defaultValue={rhfProps.value as string | undefined}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={`Select a ${label.replace(' *', '')}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {field_config.enum?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    switch (fieldName) {
      case 'profile_picture':
        return (
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'profile', 'profile_picture_upload_id')}
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
      case 'nic_pic':
      case 'institute_card_image':
        const uploadType = fieldName === 'nic_pic' ? 'nic' : 'class';
        const buttonText = fieldName === 'nic_pic' ? 'NIC Image' : 'Institute Card Image';
        const uploadIdField = fieldName === 'nic_pic' ? 'nic_pic_upload_id' : 'institute_card_image_upload_id';
        return (
          <div className="col-span-full">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, uploadType, uploadIdField!)}
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {preview ? `Change ${buttonText}` : `Upload ${buttonText}`}
            </Button>
            {preview && (
              <div className="relative mt-4 h-48 w-full">
                <Image src={preview} alt={`${buttonText} Preview`} fill style={{ objectFit: 'contain' }} className="rounded-md border" />
              </div>
            )}
          </div>
        );
      case 'shy_select':
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
      case 'home_address':
      case 'delivery_address':
        return <Textarea placeholder={`Your ${label.replace(' *', '')}`} {...rhfProps} value={rhfProps.value ?? ''} />;
      default:
        const inputType = typeof form.getValues(fieldName) === 'number' ? 'number' : 'text';
        return <Input placeholder={`Your ${label.replace(' *', '')}`} {...rhfProps} value={rhfProps.value ?? ''} type={inputType} />;
    }
  };

  const isImageUpload = ['profile_picture', 'nic_pic', 'institute_card_image'].includes(fieldName);

  return (
    <ShadcnFormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={isImageUpload ? (fieldName === 'profile_picture' ? '' : 'col-span-full') : ''}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
