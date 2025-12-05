
'use client';

import { Search, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import DashboardHeader from '@/components/dashboard-header';
import ContentCard from '@/components/content-card';
import { Input } from '@/components/ui/input';
import { useGetClasses } from '@/service/query/useClass';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MyClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: classesResponse,
    isLoading,
    isError,
    error,
  } = useGetClasses({
    search: debouncedSearchTerm,
    enrollmentStatus: 'ENROLLED',
  });

  const enrolledClasses = classesResponse?.data ?? [];

  return (
    <>
      <DashboardHeader title="My Classes" />
      <main className="p-6">
        <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/70">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary-foreground">
              Your Learning Journey
            </h2>
            <p className="max-w-md text-primary-foreground/90">
              All your enrolled courses in one place. Search below to find a
              specific class.
            </p>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" />
              <Input
                placeholder="Search my classes..."
                className="h-12 w-full rounded-full border-2 border-white/50 bg-transparent pl-12 text-lg text-white placeholder:text-white/80 focus:border-white focus:ring-offset-0"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message ||
                'Failed to load your classes. Please try again later.'}
            </AlertDescription>
          </Alert>
        ) : enrolledClasses.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-muted-foreground">
              You haven&apos;t enrolled in any classes yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {enrolledClasses.map(card => (
              <ContentCard
                key={card.id}
                title={card.name}
                description={card.description}
                link={`/dashboard/class/${card.id}`}
                imageUrl={card.image}
                imageHint="class" // Generic hint for dynamic images
                price={card.price}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
