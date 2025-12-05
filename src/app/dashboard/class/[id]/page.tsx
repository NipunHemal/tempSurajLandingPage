
'use client';

import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

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

  return (
    <>
      <DashboardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
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
          <Image
            src={details.image}
            alt={details.name}
            fill
            className="object-cover"
            data-ai-hint="class details"
          />
        </div>
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-2 font-headline text-4xl font-bold">
              {details.name}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {details.description}
            </p>

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
              <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="lessons">Lesson Wise</TabsTrigger>
                  <TabsTrigger value="month">Month Wise</TabsTrigger>
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
                    {months.map(month => (
                      <Card
                        key={month}
                        className="flex flex-col overflow-hidden transition-all hover:shadow-lg"
                      >
                        <div className="flex aspect-[3/2] w-full items-center justify-center bg-gradient-to-br from-destructive/80 to-destructive/40 p-6">
                          <h3 className="font-headline text-2xl font-bold text-destructive-foreground">
                            {month}
                          </h3>
                        </div>
                        <CardContent className="flex-1 p-4 pt-6">
                          <p className="text-sm text-muted-foreground">
                            Content for {month}.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
