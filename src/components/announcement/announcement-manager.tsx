'use client';

import {
    useGetAnnouncements,
    useMarkAnnouncementViewed
} from "@/service/query/useAnnouncement";
import {
    Announcement,
    AnnouncementDisplayType,
    AnnouncementPriority
} from "@/types/announcement.types";
import { useEffect, useMemo, useState } from "react";
import AnnouncementBanner from "./announcement-banner";
import AnnouncementPopup from "./announcement-popup";
import { usePathname } from "next/navigation";

export default function AnnouncementManager() {
    // Only run on dashboard/protected routes usually. 
    // If layout includes this, it runs everywhere.

    const { data: response, isLoading } = useGetAnnouncements({
        // We fetch "active" ones via status/expiry presumably, or backend handles it.
        // Assuming backend returns valid valid ones.
        status: 'PUBLISHED' // Example filter if needed
    });

    const { mutate: markAsViewed } = useMarkAnnouncementViewed();
    const [dismissedSessionIds, setDismissedSessionIds] = useState<Set<string>>(new Set());

    const announcements = useMemo(() => {
        if (!response?.data?.items) return [];

        // Filter out locally dismissed items for this session
        // (In a real app, 'hasViewed' from backend is better, but immediate UI feedback needs this)
        return response.data.items.filter(a => !dismissedSessionIds.has(a.id) && !a.hasViewed);
    }, [response, dismissedSessionIds]);

    const handleDismiss = (id: string) => {
        setDismissedSessionIds(prev => new Set(prev).add(id));
        markAsViewed(id);
    };

    // LOGIC:
    // 1. Show only ONE "Blocking" Popup at a time (Center). Prioritize Highest Priority.
    // 2. Show ONE "Banner" at a time (Top/Bottom). 
    // 3. Show ONE "Toast/LeftBottom" at a time.
    // This prevents screen clutter.

    const activeCenterPopup = useMemo(() => {
        return announcements
            .filter(a => a.displayType === AnnouncementDisplayType.POPUP_CENTER)
            .sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority))[0];
    }, [announcements]);

    const activeBanner = useMemo(() => {
        // Don't show banner if a popup is showing? Optional. Let's show both.
        return announcements
            .filter(a => a.displayType === AnnouncementDisplayType.BANNER || a.displayType === AnnouncementDisplayType.BOTTOM_BANNER)
            .sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority))[0];
    }, [announcements]);

    const activeToast = useMemo(() => {
        return announcements
            .filter(a => a.displayType === AnnouncementDisplayType.POPUP_LEFT_BOTTOM)
            .sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority))[0];
    }, [announcements]);


    if (isLoading || announcements.length === 0) return null;

    return (
        <>
            {activeBanner && (
                <AnnouncementBanner
                    announcement={activeBanner}
                    onDismiss={handleDismiss}
                />
            )}

            {activeCenterPopup && (
                <AnnouncementPopup
                    announcement={activeCenterPopup}
                    onDismiss={handleDismiss}
                />
            )}

            {activeToast && (
                <AnnouncementPopup
                    announcement={activeToast}
                    onDismiss={handleDismiss}
                />
            )}
        </>
    );
}

function getPriorityWeight(priority: AnnouncementPriority): number {
    switch (priority) {
        case AnnouncementPriority.URGENT: return 4;
        case AnnouncementPriority.HIGH: return 3;
        case AnnouncementPriority.NORMAL: return 2;
        case AnnouncementPriority.LOW: return 1;
        default: return 0;
    }
}
