
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useUpdateStudentProfile } from '@/service/query/useStudent';
import { useMetaStore } from '@/store/meta.store';
import { useRouter } from 'next/navigation';
import { DynamicFormField, profileFormSchema } from './DynamicFormField';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateStudentProfile({
    onSuccess: () => {
      router.push('/complete-profile?step=2', { scroll: false });
    },
  });

  const { meta } = useMetaStore();

  const { personalAndAcademicFields, contactFields, addressFields, guardianFields } = useMemo(() => {
    if (!meta) return { personalAndAcademicFields: [], contactFields: [], addressFields: [], guardianFields: [] };

    const permanentFields = ['first_name', 'last_name', 'dob', 'gender', 'phone_number'];
    const allDynamicFields = meta.settings.STUDENT_PROFILE.fields.filter(
      (field) => field.isEnabled && !permanentFields.includes(field.fieldName)
    );

    const personalAndAcademicFields = allDynamicFields.filter((f) =>
      ['profile_picture', 'year', 'nic', 'nic_pic', 'al_year', 'ol_year', 'stream', 'medium', 'school', 'shy_select', 'institute_number', 'institute_card_image'].includes(f.fieldName)
    );
    const contactFields = allDynamicFields.filter((f) => ['whatsapp_number', 'telegram_number'].includes(f.fieldName));
    const addressFields = allDynamicFields.filter((f) =>
      ['home_address', 'delivery_address', 'postalcode', 'city', 'district', 'province', 'country'].includes(f.fieldName)
    );
    const guardianFields = allDynamicFields.filter((f) =>
      ['guardian_name', 'relationship', 'guardian_contact_number'].includes(f.fieldName)
    );

    return { personalAndAcademicFields, contactFields, addressFields, guardianFields };
  }, [meta]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      whatsapp_number: '',
      phone_number: '',
      nic: '',
      gender: undefined,
      stream: undefined,
      medium: undefined,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    const payload: Record<string, any> = {};
    for (const key in data) {
      const value = data[key as keyof typeof data];
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'dob' && value instanceof Date) {
          payload[key] = format(value, 'yyyy-MM-dd');
        } else {
          payload[key] = value;
        }
      }
    }
    updateProfile(payload);
  }

  const isSubmitting = form.formState.isSubmitting || isUpdatingProfile;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal & Academic Information</CardTitle>
            <CardDescription>This information is required to create your student profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              {personalAndAcademicFields.find((f) => f.fieldName === 'profile_picture') && (
                <DynamicFormField
                  key="profile_picture"
                  control={form.control}
                  fieldConfig={personalAndAcademicFields.find((f) => f.fieldName === 'profile_picture')!}
                  form={form}
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                          captionLayout="dropdown-nav"
                          fromYear={1950}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="07xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {personalAndAcademicFields
                .filter((f) => !['profile_picture'].includes(f.fieldName))
                .map((fieldConfig) => (
                  <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                ))}
            </div>
          </CardContent>
        </Card>

        {contactFields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              {contactFields.map((fieldConfig) => (
                <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
              ))}
            </CardContent>
          </Card>
        )}

        {addressFields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              {addressFields.map((fieldConfig) => (
                <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
              ))}
            </CardContent>
          </Card>
        )}

        {guardianFields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              {guardianFields.map((fieldConfig) => (
                <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
              ))}
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Saving...' : 'Save and Continue'}
        </Button>
      </form>
    </Form>
  );
}
