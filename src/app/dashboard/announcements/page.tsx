'use client';

import { useGetAnnouncements } from "@/service/query/useAnnouncement";
import { Announcement } from "@/types/announcement.types";
import AnnouncementCard from "@/components/announcement/announcement-card";
import DashboardHeader from "@/components/dashboard-header";
import { Loader2, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnnouncementsPage() {
  const [filterType, setFilterType] = useState<string>("ALL");

  const { data: response, isLoading } = useGetAnnouncements({
    limit: 50, // Fetch more for history view
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const announcements = response?.data?.items || [];

  const filteredAnnouncements = announcements.filter(item => {
    if (filterType === "ALL") return true;
    return item.type === filterType;
  });

  return (
    <>
      <DashboardHeader title="Announcements" />
      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
              <p className="text-muted-foreground">Stay updated with system news and events.</p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="SYSTEM">System</SelectItem>
                  <SelectItem value="ACADEMIC">Academic</SelectItem>
                  <SelectItem value="EVENT">Events</SelectItem>
                  <SelectItem value="PAYMENT">Payment</SelectItem>
                  <SelectItem value="GENERAL">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAnnouncements.map((announcement: Announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="rounded-full bg-muted p-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">No announcements found</h3>
                <p className="text-sm text-muted-foreground">
                  {filterType !== 'ALL' ? "Try adjusting your filters." : "You're all caught up!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
