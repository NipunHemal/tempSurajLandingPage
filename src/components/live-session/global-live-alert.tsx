'use client';

import { usePollLiveSessions } from "@/service/query/useLiveSession";
import { LiveSession, LiveSessionStatus } from "@/types/live-session.types";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Video, Clock } from "lucide-react";
import LiveIndicator from "./live-indicator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow, addMinutes, subMinutes, isWithinInterval } from "date-fns";

export default function GlobalLiveAlert() {
    // Poll for live sessions
    const { data: response } = usePollLiveSessions();
    const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
    // Force re-render every minute to update countdowns
    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    // Filter for active LIVE sessions or UPCOMING sessions within buffer
    const activeAlertSession = useMemo(() => {
        if (!response?.data?.items) return null;

        const now = new Date();

        return response.data.items.find(session => {
            if (dismissedIds.has(session.id)) return false;

            // 1. Is it LIVE?
            if (session.status === LiveSessionStatus.LIVE) return true;

            // 2. Is it SCHEDULED and within buffer?
            if (session.status === LiveSessionStatus.SCHEDULED) {
                const startTime = new Date(session.startTime);
                const bufferMinutes = session.showBeforeMinutes || 15; // Default 15 if not set
                const showAfter = subMinutes(startTime, bufferMinutes);

                // Show if current time is between (Start - Buffer) and (Start + assumed duration/end)
                // For simplicity, just check if we passed the "showAfter" time and haven't started yet (or just slightly past start but not marked LIVE yet)
                return now >= showAfter && now < startTime; // Only show strictly before start? Or allow slight overlap?
                // Let's say strictly before start. Once started, backend should flip to LIVE.
            }

            return false;
        });
    }, [response, dismissedIds]); // Added tick dependency implicitly via re-render if needed, but 'now' inside memo needs refcheck

    if (!activeAlertSession) return null;

    const isLive = activeAlertSession.status === LiveSessionStatus.LIVE;
    const primaryProvider = activeAlertSession.providers.find(p => p.isPrimary) || activeAlertSession.providers[0];
    const joinUrl = primaryProvider?.joinUrl || '#';
    const startTime = new Date(activeAlertSession.startTime);

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
            <Card className={cn(
                "w-80 overflow-hidden border-l-4 shadow-2xl transition-colors",
                isLive ? "border-l-red-500" : "border-l-amber-500"
            )}>
                <div className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            {isLive ? (
                                <>
                                    <LiveIndicator />
                                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Happening Now</span>
                                </>
                            ) : (
                                <>
                                    <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
                                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Starting Soon</span>
                                </>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mr-2 -mt-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setDismissedIds(prev => new Set(prev).add(activeAlertSession.id))}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="mt-3">
                        <h4 className="font-bold leading-tight">{activeAlertSession.title}</h4>
                        {activeAlertSession.className && (
                            <p className="text-sm text-muted-foreground mt-1">{activeAlertSession.className}</p>
                        )}
                        {!isLive && (
                            <p className="text-xs font-medium text-amber-600 mt-2">
                                Starts in {formatDistanceToNow(startTime)}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <Button
                            asChild
                            size="sm"
                            className={cn(
                                "w-full text-white shadow-sm",
                                isLive ? "bg-red-600 hover:bg-red-700 shadow-red-200" : "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
                            )}
                            disabled={!isLive && false} // Let them join early if they want? Or disable? usually 'Join' is fine even early (waiting room).
                        >
                            <Link href={joinUrl} target="_blank" className="flex items-center justify-center gap-2">
                                <Video className="h-4 w-4" />
                                {isLive ? "Join Class" : "Join Waiting Room"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
