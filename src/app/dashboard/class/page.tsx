'use client';

import { Search, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';

import DashboardHeader from '@/components/dashboard-header';
import ContentCard from '@/components/content-card';
import { Input } from '@/components/ui/input';
import { useGetClasses } from '@/service/query/useClass';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGetLiveSessions } from '@/service/query/useLiveSession';
import { LiveSessionStatus } from '@/types/live-session.types';
import LiveSessionBanner from '@/components/live-session/live-session-banner';
import { subMinutes } from 'date-fns';

export default function ClassPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: classesResponse,
    isLoading,
    isError,
    error,
  } = useGetClasses({ search: debouncedSearchTerm });

  // Poll for live sessions to show in banner
  const { data: liveSessionResponse } = useGetLiveSessions({ limit: 10 });

  // Find a session to show: Priority to LIVE, then SCHEDULED entering buffer
  const activeLiveSession = liveSessionResponse?.data?.items?.find(s => {
    // 1. Check if LIVE
    if (s.status === LiveSessionStatus.LIVE) return true;

    // 2. Check if UPCOMING and within buffer
    if (s.status === LiveSessionStatus.SCHEDULED) {
      const startTime = new Date(s.startTime);
      const bufferMinutes = s.showBeforeMinutes || 15;
      const showAfter = subMinutes(startTime, bufferMinutes);
      return new Date() >= showAfter;
    }
    return false;
  });

  const classes = classesResponse?.data ?? [];

  return (
    <>
      <DashboardHeader title="Classes" />
      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore Classes</h1>
            <p className="text-muted-foreground mt-1">Browse and enroll in available courses.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for classes..."
              className="h-11 w-full pl-10 rounded-xl bg-background border-border/60 focus-visible:ring-primary/20 transition-all shadow-sm focus:shadow-md"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Live Session Banner */}
        {activeLiveSession && (
          <div className="mb-8">
            <LiveSessionBanner session={activeLiveSession} />
          </div>
        )}

        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message ||
                'Failed to load classes. Please try again later.'}
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
                enrollmentStatus={card.enrollmentStatus}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
