'use client';

import DashboardHeader from '@/components/dashboard-header';
import { useGetLiveSessions } from '@/service/query/useLiveSession';
import LiveSessionCard from '@/components/live-session/live-session-card';
import { LiveSession } from '@/types/live-session.types';
import { Loader2, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  // Fetch upcoming/live sessions
  const { data: response, isLoading } = useGetLiveSessions({ limit: 4 });
  const sessions = response?.data?.items || [];

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="p-6 space-y-8">
        {/* Live & Upcoming Classes Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Live & Upcoming Classes</h2>
              <p className="text-sm text-muted-foreground">Join your scheduled live sessions.</p>
            </div>
            {/* If we had a dedicated /live-classes page, link there */}
            {/* <Button variant="ghost" asChild className="text-sm">
                            <Link href="/dashboard/live">View All</Link>
                        </Button> */}
          </div>

          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sessions.map((session: LiveSession) => (
                <LiveSessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <MonitorPlay className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No scheduled classes</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                You don&apos;t have any live classes scheduled for today. Check your specific class schedules for more details.
              </p>
            </div>
          )}
        </section>

        {/* Placeholder for other dashboard widgets */}
      </main>
    </>
  );
}
