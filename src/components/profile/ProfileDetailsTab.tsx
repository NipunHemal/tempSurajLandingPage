'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, BookOpen, Phone, MapPin, Shield, Camera, Pencil } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('personal');

  const { personalFields, academicFields, contactFields, addressFields, guardianFields } = useMemo(() => {
    if (!meta) return { personalFields: [], academicFields: [], contactFields: [], addressFields: [], guardianFields: [] };

    const permanentFields = ['firstName', 'lastName', 'dob', 'gender', 'phoneNumber'];
    const allDynamicFields = meta.settings.STUDENT_PROFILE.fields.filter(
      (field) => field.isEnabled && !permanentFields.includes(field.fieldName)
    );

    const personalFields = allDynamicFields.filter((f) =>
      ['profilePicture', 'nic', 'nicPic'].includes(f.fieldName)
    );
    const academicFields = allDynamicFields.filter((f) =>
      ['year', 'alYear', 'olYear', 'stream', 'medium', 'school', 'shySelect', 'instituteNumber', 'instituteCardImage'].includes(f.fieldName)
    );
    const contactFields = allDynamicFields.filter((f) => ['whatsappNumber', 'telegramNumber'].includes(f.fieldName));
    const addressFields = allDynamicFields.filter((f) =>
      ['homeAddress', 'deliveryAddress', 'postalcode', 'city', 'district', 'province', 'country'].includes(f.fieldName)
    );
    const guardianFields = allDynamicFields.filter((f) =>
      ['guardianName', 'relationship', 'guardianContactNumber'].includes(f.fieldName)
    );

    return { personalFields, academicFields, contactFields, addressFields, guardianFields };
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
    <div className="container mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onProfileSubmit, (e) => console.log(e))} className="flex flex-col gap-8 lg:flex-row">

          {/* Left Column: Profile Card */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <Card className="overflow-hidden border-border/50 shadow-lg">
              <div className="h-32 bg-gradient-to-br from-primary/80 to-primary/40 relative">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  {/* Profile Picture Upload Field */}
                  {personalFields.find((f) => f.fieldName === 'profilePicture') && (
                    <DynamicFormField
                      key="profilePicture"
                      control={form.control}
                      fieldConfig={personalFields.find((f) => f.fieldName === 'profilePicture')!}
                      form={form}
                    />
                  )}
                </div>
              </div>
              <CardContent className="mt-20 text-center pb-8">
                <h2 className="text-2xl font-bold tracking-tight">{user?.student?.firstName} {user?.student?.lastName}</h2>
                <p className="text-muted-foreground font-medium">{user?.email}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Student</Badge>
                  {user?.student?.id && <Badge variant="outline" className="px-3 py-1 text-muted-foreground">ID: {user?.student?.id}</Badge>}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex-col gap-2 bg-muted/30 p-4">
                <div className="flex w-full items-center justify-between text-sm">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium text-foreground">
                    {user?.student?.createdAt ? new Date(user.student.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </aside>

          {/* Right Column: Tabbed Form */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
              </div>
              <Button type="submit" disabled={isSubmitting} className="min-w-[140px] shadow-md hover:shadow-lg transition-all">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:flex lg:w-auto h-auto p-1 bg-muted/50 gap-1 rounded-xl">
                <TabsTrigger value="personal" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 px-4"><User className="mr-2 h-4 w-4" /> Personal</TabsTrigger>
                <TabsTrigger value="academic" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 px-4"><BookOpen className="mr-2 h-4 w-4" /> Academic</TabsTrigger>
                {contactFields.length > 0 && <TabsTrigger value="contact" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 px-4"><Phone className="mr-2 h-4 w-4" /> Contact</TabsTrigger>}
                {addressFields.length > 0 && <TabsTrigger value="address" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 px-4"><MapPin className="mr-2 h-4 w-4" /> Address</TabsTrigger>}
                {guardianFields.length > 0 && <TabsTrigger value="guardian" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg py-2.5 px-4"><Shield className="mr-2 h-4 w-4" /> Guardian</TabsTrigger>}
              </TabsList>

              <div className="mt-6">
                <TabsContent value="personal" className="space-y-6 focus-visible:outline-none">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Basic personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name <span className="text-primary">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} className="bg-background/50 focus:bg-background transition-colors" />
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
                            <FormLabel>Last Name <span className="text-primary">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} className="bg-background/50 focus:bg-background transition-colors" />
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
                            <FormLabel>Date of Birth <span className="text-primary">*</span></FormLabel>
                            <FormControl>
                              <Input type="date" {...field} value={field.value || ''} className="bg-background/50 focus:bg-background transition-colors" />
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
                            <FormLabel>Gender <span className="text-primary">*</span></FormLabel>
                            <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50 focus:bg-background transition-colors">
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
                            <FormLabel>Phone Number <span className="text-primary">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="07xxxxxxxx" {...field} className="bg-background/50 focus:bg-background transition-colors" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {personalFields
                        .filter((f) => !['profilePicture'].includes(f.fieldName))
                        .map((fieldConfig) => (
                          <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                        ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="academic" className="space-y-6 focus-visible:outline-none">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Academic Details</CardTitle>
                      <CardDescription>Your educational background and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      {academicFields.length > 0 ? (
                        academicFields.map((fieldConfig) => (
                          <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">No academic fields configured.</div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-6 focus-visible:outline-none">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Additional Contacts</CardTitle>
                      <CardDescription>Social and messaging contacts.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      {contactFields.map((fieldConfig) => (
                        <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="address" className="space-y-6 focus-visible:outline-none">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Address Information</CardTitle>
                      <CardDescription>Shipping and billing addresses.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      {addressFields.map((fieldConfig) => (
                        <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="guardian" className="space-y-6 focus-visible:outline-none">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Guardian Details</CardTitle>
                      <CardDescription>Parent or guardian contact information.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      {guardianFields.map((fieldConfig) => (
                        <DynamicFormField key={fieldConfig.fieldName} control={form.control} fieldConfig={fieldConfig} form={form} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

              </div>
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
}
