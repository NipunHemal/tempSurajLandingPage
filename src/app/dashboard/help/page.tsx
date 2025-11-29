'use client';

import DashboardHeader from '@/components/dashboard-header';

export default function HelpPage() {
  return (
    <>
      <DashboardHeader title="Help" />
      <main className="p-6">
        <div className="flex items-center justify-center h-[50vh] border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">Help page content will be implemented here.</p>
        </div>
      </main>
    </>
  );
}
