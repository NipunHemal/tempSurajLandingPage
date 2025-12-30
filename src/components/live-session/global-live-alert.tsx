'use client';

import { usePollLiveSessions } from "@/service/query/useLiveSession";
import { LiveSessionStatus } from "@/types/live-session.types";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Video } from "lucide-react";
import LiveIndicator from "./live-indicator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function GlobalLiveAlert() {
    // Poll for live sessions
    const { data: response } = usePollLiveSessions();
    const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

    // Filter for active LIVE sessions that haven't been dismissed in this session
    const activeLiveSession = useMemo(() => {
        if (!response?.data?.items) return null;

        return response.data.items.find(session =>
            session.status === LiveSessionStatus.LIVE &&
            !dismissedIds.has(session.id)
        );
    }, [response, dismissedIds]);

    if (!activeLiveSession) return null;

    const primaryProvider = activeLiveSession.providers.find(p => p.isPrimary) || activeLiveSession.providers[0];
    const joinUrl = primaryProvider?.joinUrl || '#';

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
            <Card className="w-80 overflow-hidden border-l-4 border-l-red-500 shadow-2xl">
                <div className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <LiveIndicator />
                            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Happening Now</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mr-2 -mt-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setDismissedIds(prev => new Set(prev).add(activeLiveSession.id))}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="mt-3">
                        <h4 className="font-bold leading-tight">{activeLiveSession.title}</h4>
                        {activeLiveSession.className && (
                            <p className="text-sm text-muted-foreground mt-1">{activeLiveSession.className}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200">
                            <Link href={joinUrl} target="_blank" className="flex items-center justify-center gap-2">
                                <Video className="h-4 w-4" />
                                Join Class
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
