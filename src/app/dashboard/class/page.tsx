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
      <main className="p-6">
        <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="relative w-[95%] max-w-md md:w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" />
              <Input
                placeholder="Search classes..."
                className="h-12 w-full rounded-full border-2 border-white/50 bg-transparent pl-12 text-lg text-white placeholder:text-white/80 focus:border-white focus:ring-offset-0"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
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
