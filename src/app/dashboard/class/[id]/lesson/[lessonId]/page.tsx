
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
import { classDetails } from '@/lib/class-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

export default function LessonDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const lessonId = params.lessonId as string;

  const [filter, setFilter] = useState<string | null>(null);

  const course = (classDetails as any)[classId];
  const lesson = course?.modules
    .flatMap((m: any) => m.lessons)
    .find((l: any) => l.id === lessonId);

  if (!course || !lesson) {
    return (
        <>
            <DashboardHeader title="Lesson Not Found" />
            <main className="flex flex-1 items-center justify-center">
                <p>The lesson you are looking for does not exist.</p>
            </main>
        </>
    );
  }

  const bannerImage = PlaceHolderImages.find(
    img => img.id === lesson.bannerImageId
  );

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
    const baseContent = [
      { week: '1st Week', progress: 75, content: lesson.content.slice(0, 3) },
      { week: '2nd Week', progress: 25, content: lesson.content.slice(0, 2) },
      { week: '3rd Week', progress: 0, content: lesson.content.slice(0, 1) },
      { week: '4th Week', progress: 0, content: [] },
    ];

    if (!filter) {
      return baseContent;
    }

    return baseContent.map(week => ({
      ...week,
      content: week.content.filter((item: any) => {
        if (filter === 'resource') {
          return item.type === 'reading' || item.type === 'video';
        }
        return item.type === filter
      }),
    }));

  }, [lesson.content, filter]);

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
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/class/${classId}`}>{course.title}</Link>
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
        {bannerImage && (
          <div className="relative h-64 w-full">
            <Image
              src={bannerImage.imageUrl}
              alt={lesson.title}
              fill
              className="object-cover"
              data-ai-hint={bannerImage.imageHint}
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
              {weeklyContent.map((week, index) => (
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
                    {week.content.length > 0 ? (
                      <ul className="space-y-2 pt-4">
                        {week.content.map((item: any, itemIndex: number) => (
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
                        ))}
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
