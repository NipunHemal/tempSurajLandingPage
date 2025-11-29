
'use client';

import DashboardHeader from '@/components/dashboard-header';

export default function AnnouncementsPage() {
  return (
    <>
      <DashboardHeader title="Announcements" />
      <main className="p-6">
        <div className="flex h-[50vh] items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground">
            Announcements page content will be implemented here.
          </p>
        </div>
      </main>
    </>
  );
}
