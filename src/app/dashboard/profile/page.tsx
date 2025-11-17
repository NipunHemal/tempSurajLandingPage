
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Book,
  BookMarked,
  BookOpen,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  BarChart3,
  User,
  CalendarIcon,
  Upload,
  Loader2,
  FileText,
  CreditCard,
  BarChart,
  Building,
  CheckCircle,
} from 'lucide-react';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import DashboardHeader from '@/components/dashboard-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUploadImage } from '@/service/query/useUpload';
import { useAssignInstitute, useUpdateStudentProfile } from '@/service/query/useStudent';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useGetInstitutes } from '@/service/query/useInstitute';
import { Institute } from '@/types/api-institute-types';
import { ScrollArea } from '@/components/ui/scroll-area';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dob: z.date({ required_error: 'A date of birth is required.' }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select a gender.' }),
  whatsappNumber: z.string().optional(),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 5),
  nic: z.string().min(10, { message: 'NIC must be at least 10 characters.' }),
  profilePictureUploadId: z.string().optional(),
  nicPicUploadId: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


export default function ProfilePage() {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="h-16 items-center justify-center border-b">
          <div className="flex items-center gap-2 font-headline text-lg font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-primary"
            >
              <path d="M12 3L2 9L12 15L22 9L12 3Z" />
              <path d="M2 15L12 21L22 15" />
              <path d="M2 9L12 15L22 9" />
            </svg>
            <span className="font-headline">ELIGHT LMS</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard/class')}
                tooltip="Classes"
              >
                <Link href="/dashboard/class">
                  <BookOpen />
                  Classes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Lesson">
                <Book />
                Lesson
              </SidebarMenuButton>
              <SidebarMenuBadge className="h-5 w-5 justify-center rounded-full bg-destructive text-destructive-foreground">3</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/my-classes'}
                tooltip="My Classes"
              >
                <Link href="/dashboard/my-classes">
                  <BookMarked />
                  My Classes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Progress">
                    <BarChart3 />
                    Progress
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={pathname === '/dashboard/profile'}
                  tooltip="Profile">
                    <Link href="/dashboard/profile">
                        <User />
                        Profile
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Announcements">
                    <Megaphone />
                    Announcements
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <LifeBuoy />
                Help
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader title="Profile" />
        <main className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="details">
                <User className="mr-2" /> Profile Details
              </TabsTrigger>
              <TabsTrigger value="progress">
                <BarChart className="mr-2" /> Progress
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="mr-2" /> Payments
              </TabsTrigger>
              <TabsTrigger value="exams">
                <FileText className="mr-2" /> Exams
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProfileDetailsTab />
            </TabsContent>
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Your academic progress will be shown here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payments</CardTitle>
                  <CardDescription>Your payment history will be shown here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="exams">
              <Card>
                <CardHeader>
                  <CardTitle>Exams</CardTitle>
                  <CardDescription>Your exam results and schedules will be shown here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ProfileDetailsTab() {
  const { user } = useAuthStore();
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(user?.student.profilePicture || null);
  const [nicPicPreview, setNicPicPreview] = useState<string | null>(user?.student.nicPic || null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const nicPicInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateStudentProfile();
  const { mutate: assignInstitute, isPending: isAssigning } = useAssignInstitute();
  const { data: institutesResponse, isLoading: isLoadingInstitutes } = useGetInstitutes();
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(user?.student.institute || null);

  const institutes = institutesResponse?.data || [];
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.student.firstName || '',
      lastName: user?.student.lastName || '',
      dob: user?.student.dob ? parseISO(user.student.dob) : new Date(),
      gender: user?.student.gender as 'MALE' | 'FEMALE' | 'OTHER' | undefined,
      phoneNumber: user?.phoneNumber || '',
      whatsappNumber: user?.whatsappNumber || '',
      year: user?.student.year ? parseInt(user.student.year, 10) : new Date().getFullYear(),
      nic: user?.student.nic || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.student.firstName || '',
        lastName: user.student.lastName || '',
        dob: user.student.dob ? parseISO(user.student.dob) : undefined,
        gender: user.student.gender as 'MALE' | 'FEMALE' | 'OTHER' | undefined,
        phoneNumber: user.phoneNumber || '',
        whatsappNumber: user.whatsappNumber || '',
        year: user.student.year ? parseInt(user.student.year, 10) : new Date().getFullYear(),
        nic: user.student.nic || '',
      });
      setProfilePicPreview(user.student.profilePicture || null);
      setNicPicPreview(user.student.nicPic || null);
      setSelectedInstitute(user.student.institute || null);
    }
  }, [user, form]);
  

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'nic',
    field: 'profilePictureUploadId' | 'nicPicUploadId',
    setPreview: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage({ image: file, type }, {
        onSuccess: (data) => {
          form.setValue(field, data.data.uploadId);
          toast.success(`${type === 'profile' ? 'Profile picture' : 'NIC image'} uploaded!`);
        },
        onError: () => {
          setPreview(type === 'profile' ? user?.student.profilePicture || null : user?.student.nicPic || null);
        }
      });
    }
  };

  function onSubmit(data: ProfileFormValues) {
    const payload = {
        ...data,
        dob: format(data.dob, 'yyyy-MM-dd'),
    };
    updateProfile(payload);
  }

  const handleAssignInstitute = (instituteId: string) => {
      assignInstitute({ instituteId });
  };
  
  const isSubmitting = form.formState.isSubmitting || isUploading || isUpdatingProfile;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details here.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-6">
                <FormField
                    control={form.control}
                    name="profilePictureUploadId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <input
                                        type="file"
                                        ref={profilePicInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'profile', 'profilePictureUploadId', setProfilePicPreview)}
                                    />
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 cursor-pointer" onClick={() => profilePicInputRef.current?.click()}>
                                            <AvatarImage src={profilePicPreview || ''} alt="Profile Picture" />
                                            <AvatarFallback>
                                                <Upload />
                                            </AvatarFallback>
                                        </Avatar>
                                        {isUploading && form.getValues('profilePictureUploadId') !== user?.student.profilePicture && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                                                <Loader2 className="animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid gap-1.5">
                  <h2 className="text-2xl font-bold">{user.student.firstName} {user.student.lastName}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
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
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="07xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="07xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>A/L Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC</FormLabel>
                    <FormControl>
                      <Input placeholder="Your National ID Card number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
                control={form.control}
                name="nicPicUploadId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>NIC Image</FormLabel>
                        <FormControl>
                            <div>
                            <input
                                type="file"
                                ref={nicPicInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'nic', 'nicPicUploadId', setNicPicPreview)}
                            />
                            <Button type="button" variant="outline" onClick={() => nicPicInputRef.current?.click()} className="w-full">
                                <Upload className="mr-2 h-4 w-4" />
                                {nicPicPreview ? 'Change NIC Image' : 'Upload NIC Image'}
                            </Button>
                            </div>
                        </FormControl>
                        {nicPicPreview && (
                            <div className="relative mt-4 h-48 w-full">
                                <Image src={nicPicPreview} alt="NIC Preview" layout="fill" objectFit="contain" className="rounded-md border"/>
                            </div>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      <Separator className="my-8" />
      
      <CardHeader>
        <CardTitle>Institute Information</CardTitle>
        <CardDescription>Your currently enrolled institute.</CardDescription>
      </CardHeader>
      <CardContent>
          <Sheet>
            <SheetTrigger asChild>
            {user.student.institute ? (
                <Card className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/50">
                    <CardContent className="flex items-center gap-6 p-4">
                        <Image
                            src={user.student.institute.image}
                            alt={user.student.institute.name}
                            width={120}
                            height={80}
                            className="aspect-[3/2] rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{user.student.institute.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.student.institute.location}</p>
                        </div>
                        <Button variant="outline">Change Institute</Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="cursor-pointer border-dashed transition-all hover:border-primary">
                    <CardContent className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                        <Building className="size-10 text-muted-foreground" />
                        <p className="font-semibold">Select Institute</p>
                        <p className="text-sm text-muted-foreground">You have not selected an institute yet.</p>
                    </CardContent>
                </Card>
            )}
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Change Institute</SheetTitle>
              </SheetHeader>
              {isLoadingInstitutes ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="grid gap-4 py-4">
                    {institutes.map((institute: Institute) => (
                      <SheetClose asChild key={institute.id}>
                        <Card
                          className={cn(
                            "cursor-pointer transition-all",
                            user.student.institute?.id === institute.id && "ring-2 ring-primary"
                          )}
                          onClick={() => handleAssignInstitute(institute.id)}
                        >
                          <CardContent className="relative flex items-center gap-4 p-3">
                            <Image
                              src={institute.image}
                              alt={institute.name}
                              width={80}
                              height={60}
                              className="aspect-[4/3] rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{institute.name}</h3>
                              <p className="text-xs text-muted-foreground">{institute.location}</p>
                            </div>
                            {user.student.institute?.id === institute.id && (
                                <div className="absolute right-3 top-3 rounded-full bg-primary p-1 text-primary-foreground">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                          </CardContent>
                        </Card>
                      </SheetClose>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </SheetContent>
          </Sheet>
      </CardContent>

    </Card>
  );
}
