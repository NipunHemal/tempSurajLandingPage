
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CreditCard,
  FileUp,
  Landmark,
  Loader2,
  Ticket,
} from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useUploadImage } from '@/service/query/useUpload';
import { useCreatePayment } from '@/service/query/usePayment';

const paymentFormSchema = z.object({
  slipPictureUploadId: z.string().min(1, 'Payment slip is required.'),
  paymentMonth: z.string().min(1, 'Payment month is required.'),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentDialogProps {
  children?: React.ReactNode;
  classId: string;
  amount: number;
  defaultPaymentMonth?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function PaymentDialog({
  children,
  classId,
  amount,
  defaultPaymentMonth,
  open: controlledOpen,
  onOpenChange,
}: PaymentDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: createPayment, isPending: isSubmittingPayment } = useCreatePayment({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      setPreview(null);
    }
  });

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      slipPictureUploadId: '',
      paymentMonth: defaultPaymentMonth || '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage(
        { image: file, type: 'payment_slip' },
        {
          onSuccess: data => {
            form.setValue('slipPictureUploadId', data.data.uploadId);
            toast.success('Payment slip uploaded successfully!');
          },
          onError: () => {
            setPreview(null);
            form.setValue('slipPictureUploadId', '');
          },
        }
      );
    }
  };

  const onSubmit = (values: PaymentFormValues) => {
    createPayment({
      classId,
      amount,
      currency: 'LKR',
      method: 'BANK_SLIP',
      ...values,
    });
  };

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(currentYear, i, 1).toLocaleString('default', { month: 'long' });
    const value = `${currentYear}-${String(i + 1).padStart(2, '0')}`;
    return { label: `${month} ${currentYear}`, value };
  });

  const isSubmitting = isUploading || isSubmittingPayment;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Enrollment</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to enroll in the class. Amount: <b>Rs. {amount}</b>
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="slip">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slip">
              <Landmark className="mr-2 h-4 w-4" /> Slip
            </TabsTrigger>
            <TabsTrigger value="online">
              <CreditCard className="mr-2 h-4 w-4" /> Online
            </TabsTrigger>
            <TabsTrigger value="free-card">
              <Ticket className="mr-2 h-4 w-4" /> Free Card
            </TabsTrigger>
          </TabsList>
          <TabsContent value="slip" className="py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="paymentMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slipPictureUploadId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Payment Slip</FormLabel>
                      <FormControl>
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <div
                            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            {isUploading ? (
                              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            ) : preview ? (
                              <Image
                                src={preview}
                                alt="Slip preview"
                                width={100}
                                height={100}
                                className="h-full w-auto object-contain"
                              />
                            ) : (
                              <div className="text-center">
                                <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Click or drag to upload slip
                                </p>

                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="online" className="py-4 text-center">
            <p className="text-muted-foreground">
              Online payment is currently under development.
            </p>
          </TabsContent>
          <TabsContent value="free-card" className="py-4 text-center">
            <p className="text-muted-foreground">
              Free card requests are currently under development.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
