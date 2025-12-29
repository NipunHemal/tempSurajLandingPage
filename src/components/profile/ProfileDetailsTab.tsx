'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useUpdateStudentProfile } from '@/service/query/useStudent';
import { useMetaStore } from '@/store/meta.store';
import { DynamicFormField } from './DynamicFormField';
import { useAuthStore } from '@/store/auth.store';
import { createProfileFormSchema, mapSubmissionData } from './utils/form-helpers';

type ProfileFormValues = z.infer<ReturnType<typeof createProfileFormSchema>>;

export function ProfileDetailsTab() {
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateStudentProfile();
  const { meta } = useMetaStore();

  const { personalAndAcademicFields, contactFields, addressFields, guardianFields } = useMemo(() => {
    if (!meta) return { personalAndAcademicFields: [], contactFields: [], addressFields: [], guardianFields: [] };

    const permanentFields = ['firstName', 'lastName', 'dob', 'gender', 'phoneNumber'];
    const allDynamicFields = meta.settings.STUDENT_PROFILE.fields.filter(
      (field) => field.isEnabled && !permanentFields.includes(field.fieldName)
    );

    const personalAndAcademicFields = allDynamicFields.filter((f) =>
      ['profilePicture', 'year', 'nic', 'nicPic', 'alYear', 'olYear', 'stream', 'medium', 'school', 'shySelect', 'instituteNumber', 'instituteCardImage'].includes(f.fieldName)
    );
    const contactFields = allDynamicFields.filter((f) => ['whatsappNumber', 'telegramNumber'].includes(f.fieldName));
    const addressFields = allDynamicFields.filter((f) =>
      ['homeAddress', 'deliveryAddress', 'postalcode', 'city', 'district', 'province', 'country'].includes(f.fieldName)
    );
    const guardianFields = allDynamicFields.filter((f) =>
      ['guardianName', 'relationship', 'guardianContactNumber'].includes(f.fieldName)
    );

    return { personalAndAcademicFields, contactFields, addressFields, guardianFields };
  }, [meta]);

  const formSchema = useMemo(() => createProfileFormSchema(meta), [meta]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      whatsappNumber: '',
      phoneNumber: '',
      nic: '',
      gender: undefined,
      stream: undefined,
      medium: undefined,
    },
  });

  useEffect(() => {
    if (user?.student) {
      form.reset({
        // Permanent fields
        firstName: user.student.firstName || '',
        lastName: user.student.lastName || '',
        dob: user.student.dob ? user.student.dob.split('T')[0] : undefined,
        gender: user.student.gender as 'MALE' | 'FEMALE' | 'OTHER' | undefined,
        phoneNumber: user.phoneNumber || '',

        // Dynamic Personal & Academic fields
        profilePicture: user.student.profilePicture || undefined,
        year: user.student.year ? Number(user.student.year) : undefined,
        nic: user.student.nic || '',
        nicPic: user.student.nicPic || undefined,
        alYear: user.student.alYear ? Number(user.student.alYear) : undefined,
        olYear: user.student.olYear ? Number(user.student.olYear) : undefined,
        stream: user.student.stream || undefined,
        medium: user.student.medium || undefined,
        school: user.student.school || '',
        shySelect: user.student.shySelect ? Number(user.student.shySelect) : undefined,
        instituteNumber: user.student.instituteNumber || '',
        instituteCardImage: user.student.instituteCardImage || undefined,

        // Dynamic Contact fields
        whatsappNumber: user.whatsappNumber || '',
        telegramNumber: user.student.telegramNumber || '',

        // Dynamic Address fields
        homeAddress: user.student.homeAddress || '',
        deliveryAddress: user.student.deliveryAddress || '',
        postalcode: user.student.postalcode || '',
        city: user.student.city || '',
        district: user.student.district || '',
        province: user.student.province || '',
        country: user.student.country || '',

        // Dynamic Guardian fields
        guardianName: user.student.guardianName || '',
        relationship: user.student.relationship || '',
        guardianContactNumber: user.student.guardianContactNumber || '',
      });
    }
  }, [user, form]);

  function onProfileSubmit(data: any) {
    const payload = mapSubmissionData(data);
    updateProfile(payload);
  }

  const isSubmitting = form.formState.isSubmitting || isUpdatingProfile;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onProfileSubmit, (e) => console.log(e))} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal & Academic Information</CardTitle>
            <CardDescription>This information is required to create your student profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              {personalAndAcademicFields.find((f) => f.fieldName === 'profilePicture') && (
                <DynamicFormField
                  key="profilePicture"
                  control={form.control}
                  fieldConfig={personalAndAcademicFields.find((f) => f.fieldName === 'profilePicture')!}
                  form={form}
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
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
                name="lastName"
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
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} value={field.value || ''} />
                    </FormControl>
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
                    <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value}>
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
                name="phoneNumber"
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
                .filter((f) => !['profilePicture'].includes(f.fieldName))
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
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
