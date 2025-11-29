
'use client';

import {
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import DashboardHeader from '@/components/dashboard-header';
import { classDetails } from '@/lib/class-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContentCard from '@/components/content-card';
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

export default function ClassDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const details = (classDetails as any)[id];

  if (!details) {
    return (
        <>
            <DashboardHeader title="Class Not Found" />
            <main className="flex flex-1 items-center justify-center">
                <p>The class you are looking for does not exist.</p>
            </main>
        </>
    );
  }

  const bannerImage = PlaceHolderImages.find(
    img => img.id === details.bannerImageId
  );
  const getImage = (id: string) =>
    PlaceHolderImages.find(img => img.id === id);
    
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const allLessons = details.modules?.flatMap((module: any) => module.lessons) ?? [];

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
                <BreadcrumbPage>{details.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </DashboardHeader>
      <main>
        {bannerImage && (
          <div className="relative h-64 w-full">
            <Image
              src={bannerImage.imageUrl}
              alt={details.title}
              fill
              className="object-cover"
              data-ai-hint={bannerImage.imageHint}
            />
          </div>
        )}
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-2 font-headline text-4xl font-bold">
              {details.title}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {details.description}
            </p>

            {details.paid ? (
               <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Paid Class</AlertTitle>
                  <AlertDescription>
                      This is a premium class. Please enroll to access the content.
                      <Button size="sm" className="ml-4">Enroll Now</Button>
                  </AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="lessons">Lesson Wise</TabsTrigger>
                  <TabsTrigger value="month">Month Wise</TabsTrigger>
                </TabsList>
                <TabsContent value="lessons">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {allLessons.map((lesson: any) => {
                      const image = getImage(lesson.imageId);
                      return (
                        <ContentCard
                          key={lesson.id}
                          title={lesson.title}
                          description={lesson.description}
                          tags={lesson.tags}
                          link={lesson.link}
                          imageUrl={image?.imageUrl ?? ''}
                          imageHint={image?.imageHint ?? ''}
                          paid={false} // Lessons inside a class are not individually paid
                        />
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="month">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
