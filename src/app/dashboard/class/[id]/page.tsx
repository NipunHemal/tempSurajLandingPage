
'use client';

import { AlertCircle, Loader2, CheckCircle, Clock, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CustomImage from '@/components/ui/custom-image';
import { useState, useMemo } from 'react';

import DashboardHeader from '@/components/dashboard-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGetClassById, useGetModulesByClass } from '@/service/query/useClass';
import { useEnrollInClass } from '@/service/query/useEnrollment';
import { useGetPaymentHistory } from '@/service/query/usePayment';
import { useAuthStore } from '@/store/auth.store';
import ModuleCard from '@/components/module-card';

export default function ClassDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: classResponse,
    isLoading: isLoadingClass,
    isError: isClassError,
    error: classError,
  } = useGetClassById(id);

  const details = classResponse?.data;
  const isEnrolled = details?.enrollmentStatus === 'ENROLLED';

  const {
    data: modulesResponse,
    isLoading: isLoadingModules,
  } = useGetModulesByClass({ classId: id, limit: 50 }, isEnrolled);

  const { mutate: enroll, isPending: isEnrolling } = useEnrollInClass();

  const [subDescriptionOpen, setSubDescriptionOpen] = useState(false);

  const { user } = useAuthStore();

  const { data: paymentHistoryResponse } = useGetPaymentHistory(
    user?.id,
    id
  );

  // Create a map of payment status by month (YYYY-MM format)
  const paymentStatusByMonth = useMemo(() => {
    const statusMap: Record<string, 'COMPLETED' | 'PENDING' | 'REJECTED'> = {};
    if (paymentHistoryResponse?.data) {
      paymentHistoryResponse.data.forEach(payment => {
        // If there's already a COMPLETED status for this month, don't override
        if (statusMap[payment.paymentMonth] !== 'COMPLETED') {
          statusMap[payment.paymentMonth] = payment.status;
        }
      });
    }
    return statusMap;
  }, [paymentHistoryResponse]);

  if (isLoadingClass) {
    return (
      <>
        <DashboardHeader />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </>
    );
  }

  if (isClassError || !details) {
    return (
      <>
        <DashboardHeader title="Class Not Found" />
        <main className="p-6">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {classError?.message ||
                'The class you are looking for does not exist or could not be loaded.'}
            </AlertDescription>
          </Alert>
        </main>
      </>
    );
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const modules = modulesResponse?.data ?? [];
  const handleEnroll = () => {
    enroll({ classId: id });
  };

  // Convert month name to YYYY-MM format for the page URL
  const getMonthApiFormat = (monthName: string): string => {
    const monthIndex = months.indexOf(monthName) + 1;
    const year = details?.year || new Date().getFullYear();
    return `${year}-${monthIndex.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <DashboardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild href={''}>
                <Link href="/dashboard/class">Classes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{details.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </DashboardHeader>
      <main>
        <div className="relative h-64 w-full">
          <div className="relative h-64 w-full">
            <CustomImage
              src={details.image}
              alt={details.name}
              fill
              className="object-cover"
            // data-ai-hint="class details"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-2 font-headline text-4xl font-bold">
              {details.name}
            </h1>
            <p className="mb-1 text-muted-foreground">
              {details.description}
            </p>
            {details.subDescription && (
              <div className="mb-6">
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-primary"
                  onClick={() => setSubDescriptionOpen(!subDescriptionOpen)}
                >
                  {subDescriptionOpen ? "Show Less" : "More Details"}
                </Button>
                {subDescriptionOpen && (
                  <div
                    className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground transition-all animate-in fade-in slide-in-from-top-2"
                  // If user has HTML content, we might need dangerouslySetInnerHTML, 
                  // but sticking to whitespace-pre-wrap as per previous safe impl unless explicitly asked to unsafe render.
                  // User said "html content", so let's try to interpret if it needs parsing? 
                  // For now staying safe.
                  >
                    {details.subDescription}
                  </div>
                )}
              </div>
            )}

            {!isEnrolled ? (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Enrolled</AlertTitle>
                <AlertDescription className='flex justify-between items-center'>
                  You are not enrolled in this class. Please enroll to access
                  the content.
                  <Button size="sm" onClick={handleEnroll} disabled={isEnrolling}>
                    {isEnrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="month" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="month">Month Wise</TabsTrigger>
                  <TabsTrigger value="lessons">Lesson Wise</TabsTrigger>
                </TabsList>
                <TabsContent value="lessons">
                  {isLoadingModules ? (
                    <div className="flex h-[30vh] items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : modules.length === 0 ? (
                    <div className="flex h-[30vh] items-center justify-center rounded-md border-2 border-dashed">
                      <p className="text-muted-foreground">No modules found for this class yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {modules.map((module: any) => (
                        <ModuleCard
                          key={module.id}
                          title={module.name}
                          description={module.description}
                          link={`/dashboard/class/${id}/module/${module.id}`}
                          imageUrl={module.image}
                          imageHint="module"
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="month">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {months.map(month => {
                      const monthKey = getMonthApiFormat(month);
                      const paymentStatus = paymentStatusByMonth[monthKey];
                      const isPaid = paymentStatus === 'COMPLETED';
                      const isPending = paymentStatus === 'PENDING';

                      return (
                        <Link
                          key={month}
                          href={`/dashboard/class/${id}/month/${monthKey}`}
                        >
                          <Card
                            className={`flex flex-col overflow-hidden transition-all hover:shadow-lg cursor-pointer relative ${isPaid ? 'ring-2 ring-green-500/50' : isPending ? 'ring-2 ring-amber-500/50' : ''
                              }`}
                          >
                            {/* Payment status badge */}
                            <div className="absolute top-2 right-2 z-10">
                              {isPaid ? (
                                <div className="flex items-center gap-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  <CheckCircle className="h-3 w-3" /> Paid
                                </div>
                              ) : isPending ? (
                                <div className="flex items-center gap-1 bg-amber-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  <Clock className="h-3 w-3" /> Pending
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 bg-muted/80 text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
                                  <Lock className="h-3 w-3" /> Not Paid
                                </div>
                              )}
                            </div>
                            <div className={`flex aspect-[3/2] w-full items-center justify-center p-6 ${isPaid ? 'bg-gradient-to-br from-green-600/80 to-green-500/40' :
                              isPending ? 'bg-gradient-to-br from-amber-600/80 to-amber-500/40' :
                                'bg-gradient-to-br from-destructive/80 to-destructive/40'
                              }`}>
                              <h3 className="font-headline text-2xl font-bold text-destructive-foreground">
                                {month}
                              </h3>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main >
    </>
  );
}
