'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, CheckCircle, Loader2, Upload, Building } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { useUploadImage } from '@/service/query/useUpload';
import { toast } from 'sonner';
import Image from 'next/image';
import { useAssignInstitute, useUpdateStudentProfile } from '@/service/query/useStudent';
import { useGetInstitutes } from '@/service/query/useInstitute';
import { Institute } from '@/types/api-institute-types';
import { useSearchParams, useRouter } from 'next/navigation';
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

export default function CompleteProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = searchParams.get('step') === '2' ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [nicPicPreview, setNicPicPreview] = useState<string | null>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const nicPicInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateStudentProfile({
    onSuccess: () => {
      router.push('/dashboard/complete-profile?step=2', { scroll: false });
      setStep(2);
    }
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        firstName: '',
        lastName: '',
        whatsappNumber: '',
        phoneNumber: '',
        nic: '',
        year: new Date().getFullYear(),
        gender: undefined,
    }
  });
  
  useEffect(() => {
    const stepParam = searchParams.get('step');
    const newStep = stepParam === '2' ? 2 : 1;
    setStep(newStep);
  }, [searchParams]);

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
          setPreview(null);
        }
      });
    }
  };

  function onProfileSubmit(data: ProfileFormValues) {
    const payload = {
        ...data,
        dob: format(data.dob, 'yyyy-MM-dd'),
    };
    updateProfile(payload);
  }

  const isSubmitting = form.formState.isSubmitting || isUploading || isUpdatingProfile;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl rounded-lg border bg-card p-6 shadow-sm">
        {step === 1 ? (
          <>
            <h1 className="mb-4 text-center font-headline text-2xl font-bold">Complete Your Profile (Step 1 of 2)</h1>
            <p className="mb-8 text-center text-muted-foreground">Please fill in your details to continue.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-8">
                <div className="flex flex-col items-center gap-6">
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
                                                <AvatarFallback className="text-3xl">
                                                    <Upload />
                                                </AvatarFallback>
                                            </Avatar>
                                            {isUploading && form.watch('profilePictureUploadId') === undefined && (
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Saving...' : 'Save and Continue'}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <InstituteSelector />
        )}
      </div>
    </div>
  );
}

function InstituteSelector() {
  const { data: institutesResponse, isLoading: isLoadingInstitutes } = useGetInstitutes();
  const { mutate: assignInstitute, isPending: isAssigning } = useAssignInstitute();
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  const handleAssign = () => {
    if (selectedInstitute) {
      assignInstitute({ instituteId: selectedInstitute.id });
    } else {
      toast.warning('Please select an institute to continue.');
    }
  };

  const institutes = institutesResponse?.data || [];

  return (
    <div>
      <h1 className="mb-4 text-center font-headline text-2xl font-bold">Select Your Institute (Step 2 of 2)</h1>
      <p className="mb-8 text-center text-muted-foreground">Choose your institute from the list below.</p>
      
      <Sheet>
        <SheetTrigger asChild>
          {selectedInstitute ? (
             <Card className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/50">
              <CardContent className="flex items-center gap-6 p-4">
                 <Image
                  src={selectedInstitute.image}
                  alt={selectedInstitute.name}
                  width={120}
                  height={80}
                  className="aspect-[3/2] rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedInstitute.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedInstitute.location}</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="cursor-pointer border-dashed transition-all hover:border-primary">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                  <Building className="size-10 text-muted-foreground" />
                  <p className="font-semibold">Select Institute</p>
                  <p className="text-sm text-muted-foreground">Click here to choose your institute</p>
              </CardContent>
            </Card>
          )}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select an Institute</SheetTitle>
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
                        selectedInstitute?.id === institute.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedInstitute(institute)}
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
                        {selectedInstitute?.id === institute.id && (
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


      <Button onClick={handleAssign} className="mt-8 w-full" disabled={isAssigning || !selectedInstitute}>
        {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Finish Setup
      </Button>
    </div>
  );
}

    