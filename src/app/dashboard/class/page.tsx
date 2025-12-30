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
      <main className="min-h-screen bg-background pb-12">
        {/* Professional Hero Search Section */}
        <div className="relative w-full bg-zinc-950 border-b border-border/50 overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background opacity-20 pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fabb09_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="container mx-auto max-w-7xl px-6 py-10 md:py-14 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-sm">
              Find Your Next <span className="text-primary">Masterpiece</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-300 max-w-2xl mb-8 leading-relaxed">
              Explore our curated collection of professional courses.
            </p>

            <div className="w-full max-w-2xl relative group">
              <div className="relative flex items-center bg-white dark:bg-zinc-950 rounded-full p-1.5 shadow-lg ring-1 ring-white/10">
                <Search className="ml-4 h-5 w-5 text-zinc-400" />
                <Input
                  placeholder="What do you want to learn today?"
                  className="flex-1 border-0 bg-transparent text-base h-11 px-4 placeholder:text-zinc-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-900 dark:text-zinc-100"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 font-semibold transition-all text-sm">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

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
        </div>
      </main>
    </>
  );
}
