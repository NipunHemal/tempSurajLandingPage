
'use client';

import { Search, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import DashboardHeader from '@/components/dashboard-header';
import ContentCard from '@/components/content-card';
import { Input } from '@/components/ui/input';
import { useGetClasses } from '@/service/query/class.service';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ClassPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: classesResponse,
    isLoading,
    isError,
    error,
  } = useGetClasses({ search: debouncedSearchTerm });

  const classes = classesResponse?.data ?? [];

  return (
    <>
      <DashboardHeader title="Classes" />
      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Tag-based filtering can be re-added if API supports it */}
        </div>

        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || 'Failed to load classes. Please try again later.'}
            </AlertDescription>
          </Alert>
        ) : classes.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-muted-foreground">No classes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {classes.map(card => (
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
