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
      <main className="min-h-screen bg-background pb-12">
        {/* Personal Hero Header */}
        <div className="relative w-full bg-zinc-950 border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-black opacity-90" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fabb09_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="container mx-auto max-w-7xl px-6 py-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-zinc-400 text-base">
                  Track your progress and continue your journey.
                </p>
              </div>

              <div className="w-full md:w-[400px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  placeholder="Filter your enrolled classes..."
                  className="w-full h-11 pl-10 rounded-xl border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus:bg-zinc-900 focus:border-primary transition-all shadow-md text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

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
