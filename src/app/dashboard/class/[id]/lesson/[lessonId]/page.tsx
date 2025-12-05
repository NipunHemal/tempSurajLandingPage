
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import DashboardHeader from '@/components/dashboard-header';
import {
  Download,
  FileText,
  PlayCircle,
  BookCheck,
  ClipboardList,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import PaymentDialog from '@/components/payment/PaymentDialog';
import { useGetClassById } from '@/service/query/useClass';

// Mock data, to be replaced by API calls
const mockLessonData = {
    '1-1': {
        id: '1-1',
        title: 'The Fertile Crescent', 
        longDescription: 'This lesson explores the geographical and environmental factors of the Fertile Crescent that gave rise to the world\'s first agricultural societies. We will examine how the domestication of plants and animals transformed human life and led to the establishment of permanent settlements.',
        bannerImage: 'https://images.unsplash.com/photo-1600023062179-6c6b954698cd?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhbmNpZW50JTIwcnVpbnN8ZW58MHx8fHwxNzYyMzIxNzI5fDA&w=1080&q=80',
        bannerImageHint: 'babylon ruins',
        content: [
          { week: '1st Week', progress: 75, items: [
            { type: 'video', title: 'Lecture: The Neolithic Revolution', duration: '15:23', link: '#' },
            { type: 'reading', title: 'Chapter 1: Dawn of Agriculture', duration: '25 min read', link: '#' },
            { type: 'exam', title: 'Exam 1: Early Settlements', duration: '10 Questions', link: '#' }
          ]},
          { week: '2nd Week', progress: 25, items: [
            { type: 'video', title: 'Video: Cuneiform and Early Writing', duration: '12:45', link: '#'},
            { type: 'reading', title: 'Article: The Code of Ur-Nammu', duration: '15 min read', link: '#'}
          ]},
          { week: '3rd Week', progress: 0, items: [] },
          { week: '4th Week', progress: 0, items: [] },
        ]
    }
    // Add other lesson details here...
}


export default function LessonDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const lessonId = params.lessonId as string;
  const { data: classResponse } = useGetClassById(classId);
  const details = classResponse?.data;

  const [filter, setFilter] = useState<string | null>(null);

  // TODO: Replace with API data for lesson
  const lesson = (mockLessonData as any)[lessonId];

  if (!details || !lesson) {
    return (
        <>
            <DashboardHeader title="Lesson Not Found" />
            <main className="flex flex-1 items-center justify-center">
                <p>The lesson you are looking for does not exist.</p>
            </main>
        </>
    );
  }


  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="text-muted-foreground" />;
      case 'reading':
      case 'resource':
        return <FileText className="text-muted-foreground" />;
      case 'quiz':
      case 'exam':
        return <ClipboardList className="text-muted-foreground" />;
      case 'assignment':
        return <BookCheck className="text-muted-foreground" />;
      default:
        return <PlayCircle className="text-muted-foreground" />;
    }
  };

  const handleFilter = (type: string) => {
    setFilter(prevFilter => (prevFilter === type ? null : type));
  };
  
  const weeklyContent = useMemo(() => {
    const baseContent = lesson.content;

    if (!filter) {
      return baseContent;
    }

    return baseContent.map((week: any) => ({
      ...week,
      items: week.items.filter((item: any) => {
        if (filter === 'resource') {
          return item.type === 'reading' || item.type === 'video';
        }
        return item.type === filter
      }),
    }));

  }, [lesson.content, filter]);

  // A student has access if they are enrolled and the class is free, or if they are enrolled and have paid.
  // For now, let's assume if enrollmentStatus is ENROLLED, they should pay if the price > 0
  const hasPaid = false; // This will be determined by payment status API later
  const needsToPay = details.enrollmentStatus === 'ENROLLED' && details.price > 0 && !hasPaid;

  const renderContentItem = (item: any, itemIndex: number) => {
     const isFreeItem = itemIndex === 0; // Let's assume the first item of each week is free

     if (needsToPay && !isFreeItem) {
        return (
             <li key={itemIndex} className="flex items-center justify-between rounded-md border p-4 opacity-50">
                <div className="flex items-center gap-4">
                    {getContentTypeIcon(item.type)}
                    <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                     <PaymentDialog classId={details.id} amount={details.price}>
                        <Button size="sm">Pay to Unlock</Button>
                    </PaymentDialog>
                </div>
            </li>
        )
     }

     return (
        <li key={itemIndex} className="flex items-center justify-between rounded-md border p-4">
            <div className="flex items-center gap-4">
            {getContentTypeIcon(item.type)}
            <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
            </div>
            </div>
            <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{item.duration}</span>
            {item.type === 'video' ? (
                <Button asChild variant="ghost" size="sm">
                <Link href={item.link}>
                    <PlayCircle className="mr-2" />
                    Watch
                </Link>
                </Button>
            ) : (
                <Button asChild variant="ghost" size="sm">
                <Link href={item.link}>
                    <Download className="mr-2" />
                    Download
                </Link>
                </Button>
            )}
            </div>
        </li>
     )
  }

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
               {/* This should eventually link to the module page */}
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/class/${classId}`}>{details.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </DashboardHeader>
      <main>
        {lesson.bannerImage && (
          <div className="relative h-64 w-full">
            <Image
              src={lesson.bannerImage}
              alt={lesson.title}
              fill
              className="object-cover"
              data-ai-hint={lesson.bannerImageHint}
            />
          </div>
        )}
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-2 font-headline text-4xl font-bold">
              {lesson.title}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {lesson.longDescription}
            </p>

            <div className="mb-8 flex gap-2">
               <Button 
                variant={filter === 'video' ? 'default' : 'outline'}
                className={filter !== 'video' ? 'bg-background' : ''}
                onClick={() => handleFilter('video')}>
                <PlayCircle className="mr-2" />
                Videos
              </Button>
              <Button 
                variant={filter === 'resource' ? 'default' : 'outline'}
                className={filter !== 'resource' ? 'bg-background' : ''}
                onClick={() => handleFilter('resource')}>
                <FileText className="mr-2" />
                Resources
              </Button>
              <Button 
                variant={filter === 'assignment' ? 'default' : 'outline'}
                className={filter !== 'assignment' ? 'bg-background' : ''}
                onClick={() => handleFilter('assignment')}>
                <BookCheck className="mr-2" />
                Assignments
              </Button>
              <Button 
                variant={filter === 'exam' ? 'default' : 'outline'}
                className={filter !== 'exam' ? 'bg-background' : ''}
                onClick={() => handleFilter('exam')}>
                <ClipboardList className="mr-2" />
                Exams
              </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
              {weeklyContent.map((week: any, index: number) => (
                <AccordionItem value={`item-${index}`} key={index} className="rounded-md border-0 bg-green-100/50">
                  <AccordionTrigger className="px-4 text-lg font-semibold text-green-900 hover:no-underline">
                    <div className="flex w-full items-center gap-4">
                      <div className="relative h-10 w-10">
                          <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-200" strokeWidth="2"></circle>
                              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600" strokeWidth="2" strokeDasharray={`${week.progress * 100.5 / 100} 100.5`}  strokeDashoffset="0" transform="rotate(-90 18 18)"></circle>
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{week.progress}%</span>
                      </div>
                      <span className="flex-1 text-left">{week.week}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background">
                    {week.items.length > 0 ? (
                      <ul className="space-y-2 pt-4">
                        {week.items.map(renderContentItem)}
                      </ul>
                    ) : (
                      <div className="pt-4 text-center text-muted-foreground">No content for this week matching your filter.</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </>
  );
}
