'use client';

import { Search, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import DashboardHeader from '@/components/dashboard-header';
import ContentCard from '@/components/content-card';
import { Input } from '@/components/ui/input';
import { useGetClasses } from '@/service/query/useClass';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGetLiveSessions } from '@/service/query/useLiveSession';
import { LiveSessionStatus } from '@/types/live-session.types';
import LiveSessionBanner from '@/components/live-session/live-session-banner';
import { subMinutes } from 'date-fns';
import { useAuthStore } from '@/store/auth.store';

export default function MyClassesPage() {
  const { user } = useAuthStore();
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

  // Poll for live sessions to show in banner
  const { data: liveSessionResponse } = useGetLiveSessions({ limit: 10 });
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

  const enrolledClasses = classesResponse?.data ?? [];

  return (
    <>
      <DashboardHeader title="My Classes" />
      <main>
        {/* Welcome & Search Header */}
        <div className="flex flex-col justify-between gap-6 border-b bg-muted/40 px-8 py-12 md:flex-row md:items-center relative overflow-hidden">
          {/* Subtle background texture/gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-background pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-card-foreground">
              Welcome back, {user?.student?.firstName || 'Student'}!
            </h1>
            <p className="text-muted-foreground">
              You're making great progress. Continue your learning journey.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              className="h-11 w-full rounded-xl bg-background pl-10 text-base shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">

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
                  enrollmentStatus={card.enrollmentStatus}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
