
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { useState, useRef, useEffect, useMemo } from 'react';
import { useUploadImage } from '@/service/query/useUpload';
import { toast } from 'sonner';
import Image from 'next/image';
import { useAssignInstitute, useUpdateStudentProfile } from '@/service/query/useStudent';
import { useGetInstitutes } from '@/service/query/useInstitute';
import { Institute } from '@/types/api-institute-types';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMetaStore } from '@/store/meta.store';
import { Field } from '@/types/api-meta-types';
import { Textarea } from '@/components/ui/textarea';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  dob: z.date({ required_error: 'A date of birth is required.' }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select a gender.' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  
  // Dynamic fields
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

const permanentFields = ['firstName', 'lastName', 'dob', 'gender', 'phoneNumber'];

export default function CompleteProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = searchParams.get('step') === '2' ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [nicPicPreview, setNicPicPreview] = useState<string | null>(null);
  const [instituteCardImagePreview, setInstituteCardImagePreview] = useState<string | null>(null);

  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const nicPicInputRef = useRef<HTMLInputElement>(null);
  const instituteCardImageInputRef = useRef<HTMLInputElement>(null);

  
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateStudentProfile({
    onSuccess: () => {
      router.push('/dashboard/complete-profile?step=2', { scroll: false });
      setStep(2);
    }
  });
  
  const { meta } = useMetaStore();
  
  const { personalAndAcademicFields, contactFields, addressFields, guardianFields } = useMemo(() => {
    if (!meta) return { personalAndAcademicFields: [], contactFields: [], addressFields: [], guardianFields: [] };
    
    const allDynamicFields = meta.settings.STUDENT_PROFILE.fields
      .filter(field => field.isEnabled && !permanentFields.includes(field.fieldName));

    const personalAndAcademicFields = allDynamicFields.filter(f => ['profilePicture', 'year', 'nic', 'nicPic', 'alYear', 'olYear', 'stream', 'medium', 'school', 'shySelect', 'instituteNumber', 'instituteCardImage'].includes(f.fieldName));
    const contactFields = allDynamicFields.filter(f => ['whatsappNumber', 'telegramNumber'].includes(f.fieldName));
    const addressFields = allDynamicFields.filter(f => ['homeAddress', 'deliveryAddress', 'postalcode', 'city', 'district', 'province', 'country'].includes(f.fieldName));
    const guardianFields = allDynamicFields.filter(f => ['guardianName', 'relationship', 'guardianContactNumber'].includes(f.fieldName));
    
    return { personalAndAcademicFields, contactFields, addressFields, guardianFields };
  }, [meta]);


  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        firstName: '',
        lastName: '',
        whatsappNumber: '',
        phoneNumber: '',
        nic: '',
        gender: undefined,
        stream: undefined,
        medium: undefined,
    }
  });
  
  useEffect(() => {
    const stepParam = searchParams.get('step');
    const newStep = stepParam === '2' ? 2 : 1;
    setStep(newStep);
  }, [searchParams]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'nic' | 'class',
    field: 'profilePictureUploadId' | 'nicPicUploadId' | 'instituteCardImage',
    setPreview: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage({ image: file, type }, {
        onSuccess: (data) => {
          form.setValue(field, data.data.uploadId);
          toast.success(`${type === 'profile' ? 'Profile picture' : type === 'nic' ? 'NIC image' : 'Institute card image'} uploaded!`);
        },
        onError: () => {
          setPreview(null);
        }
      });
    }
  };

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
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

  const isSubmitting = form.formState.isSubmitting || isUploading || isUpdatingProfile;
  
  const toTitleCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  }

  const renderField = (fieldConfig: Field) => {
    const fieldName = fieldConfig.fieldName as keyof ProfileFormValues;
    const label = toTitleCase(fieldName) + (fieldConfig.required ? ' *' : '');

    if (fieldConfig.enum) {
        return (
            <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as string | undefined}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select a ${toTitleCase(fieldName)}`} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {fieldConfig.enum?.map(option => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    switch (fieldName) {
      case 'profilePicture':
        return (
           <FormField
                key={fieldName}
                control={form.control}
                name="profilePictureUploadId"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                        <FormLabel>Profile Picture</FormLabel>
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
        );
      case 'nicPic':
        return (
            <FormField
                key={fieldName}
                control={form.control}
                name="nicPicUploadId"
                render={({ field }) => (
                    <FormItem className="col-span-full">
                        <FormLabel>{label}</FormLabel>
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
        );
       case 'instituteCardImage':
        return (
            <FormField
                key={fieldName}
                control={form.control}
                name="instituteCardImage"
                render={({ field }) => (
                    <FormItem className="col-span-full">
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div>
                            <input
                                type="file"
                                ref={instituteCardImageInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'class', 'instituteCardImage', setInstituteCardImagePreview)}
                            />
                            <Button type="button" variant="outline" onClick={() => instituteCardImageInputRef.current?.click()} className="w-full">
                                <Upload className="mr-2 h-4 w-4" />
                                {instituteCardImagePreview ? 'Change Institute Card Image' : 'Upload Institute Card Image'}
                            </Button>
                            </div>
                        </FormControl>
                        {instituteCardImagePreview && (
                            <div className="relative mt-4 h-48 w-full">
                                <Image src={instituteCardImagePreview} alt="Institute Card Preview" layout="fill" objectFit="contain" className="rounded-md border"/>
                            </div>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
      case 'homeAddress':
      case 'deliveryAddress':
          return (
              <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                      <FormItem className="col-span-full">
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                              <Textarea placeholder={`Your ${toTitleCase(fieldName)}`} {...field} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
          );
      default:
        return (
            <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input placeholder={`Your ${toTitleCase(fieldName)}`} {...field} value={field.value ?? ''} type={typeof form.getValues(fieldName) === 'number' ? 'number' : 'text'} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {step === 1 ? (
          <>
            <h1 className="mb-4 text-center font-headline text-2xl font-bold">Complete Your Profile (Step 1 of 2)</h1>
            <p className="mb-8 text-center text-muted-foreground">Please fill in your details to continue.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-8">

                <Card>
                  <CardHeader>
                    <CardTitle>Personal & Academic Information</CardTitle>
                    <CardDescription>This information is required to create your student profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      {personalAndAcademicFields.find(f => f.fieldName === 'profilePicture') && 
                          renderField(personalAndAcademicFields.find(f => f.fieldName === 'profilePicture')!)
                      }
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
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth *</FormLabel>
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
                              <FormLabel>Gender *</FormLabel>
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
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="07xxxxxxxx" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {personalAndAcademicFields.filter(f => !['profilePicture'].includes(f.fieldName)).map(renderField)}
                    </div>
                  </CardContent>
                </Card>
                
                {(contactFields.length > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                        {contactFields.map(renderField)}
                    </CardContent>
                  </Card>
                )}

                {addressFields.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Address Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                      {addressFields.map(renderField)}
                    </CardContent>
                  </Card>
                )}
                
                {guardianFields.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Guardian Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                      {guardianFields.map(renderField)}
                    </CardContent>
                  </Card>
                )}
                
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
    <Card>
      <CardHeader>
        <CardTitle>Select Your Institute (Step 2 of 2)</CardTitle>
        <CardDescription>Choose your institute from the list below.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingInstitutes ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-[60vh]">
            <div className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 lg:grid-cols-3">
              {institutes.map((institute: Institute) => (
                <Card
                  key={institute.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedInstitute?.id === institute.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedInstitute(institute)}
                >
                  <CardContent className="relative flex flex-col items-center gap-4 p-4">
                    <Image
                      src={institute.image}
                      alt={institute.name}
                      width={160}
                      height={120}
                      className="aspect-[4/3] w-full rounded-md object-cover"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold">{institute.name}</h3>
                      <p className="text-xs text-muted-foreground">{institute.location}</p>
                    </div>
                    {selectedInstitute?.id === institute.id && (
                        <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground">
                            <CheckCircle className="h-4 w-4" />
                        </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAssign} className="w-full" disabled={isAssigning || !selectedInstitute}>
          {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finish Setup
        </Button>
      </CardFooter>
    </Card>
  );
}

    

    

    
