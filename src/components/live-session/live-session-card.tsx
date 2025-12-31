import { LiveSession, LiveSessionStatus, LiveSessionProviderType } from "@/types/live-session.types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MonitorPlay } from "lucide-react";
import LiveIndicator from "./live-indicator";
import { format, subMinutes } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LiveSessionCardProps {
    session: LiveSession;
    showClassName?: boolean;
}

export default function LiveSessionCard({ session, showClassName = true }: LiveSessionCardProps) {
    const isLive = session.status === LiveSessionStatus.LIVE;
    const isEnded = session.status === LiveSessionStatus.ENDED;

    // Check if starting soon (within buffer)
    const isStartingSoon = !isLive && !isEnded && (() => {
        if (session.status === LiveSessionStatus.SCHEDULED) {
            const startTime = new Date(session.startTime);
            const bufferMinutes = session.showBeforeMinutes || 15;
            const showAfter = subMinutes(startTime, bufferMinutes);
            return new Date() >= showAfter;
        }
        return false;
    })();

    const primaryProvider = session.providers.find(p => p.isPrimary) || session.providers[0];
    const joinUrl = primaryProvider?.joinUrl || '#';

    const getProviderIcon = (type?: LiveSessionProviderType) => {
        switch (type) {
            case LiveSessionProviderType.ZOOM: return <Video className="h-4 w-4" />;
            case LiveSessionProviderType.YOUTUBE: return <MonitorPlay className="h-4 w-4" />;
            default: return <Video className="h-4 w-4" />;
        }
    };

    return (
        <Card className={cn(
            "flex flex-col overflow-hidden transition-all hover:shadow-md",
            isLive ? "border-red-500/50 shadow-red-500/5" :
                isStartingSoon ? "border-amber-500/50 shadow-amber-500/5" : ""
        )}>
            <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                        {showClassName && session.className && (
                            <Badge variant="outline" className="mb-1 text-xs font-normal text-muted-foreground">
                                {session.className}
                            </Badge>
                        )}
                        <h4 className="font-semibold line-clamp-1">{session.title}</h4>
                    </div>
                    {isLive ? (
                        <LiveIndicator />
                    ) : isStartingSoon ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                            </span>
                            SOON
                        </span>
                    ) : (
                        <Badge variant="secondary" className={cn("text-xs", isEnded ? "opacity-70" : "")}>
                            {session.status}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex-1 space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-2">
                    {session.description || "No description provided."}
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{format(new Date(session.startTime), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                            {format(new Date(session.startTime), "h:mm a")}
                            {session.endTime && ` - ${format(new Date(session.endTime), "h:mm a")}`}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                {isLive ? (
                    <Button
                        asChild
                        className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                        size="sm"
                    >
                        <Link href={joinUrl} target="_blank">
                            {getProviderIcon(primaryProvider?.provider)}
                            Join Live Class
                        </Link>
                    </Button>
                ) : isStartingSoon ? (
                    <Button
                        asChild
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2"
                        size="sm"
                    >
                        <Link href={joinUrl} target="_blank">
                            {getProviderIcon(primaryProvider?.provider)}
                            Join Waiting Room
                        </Link>
                    </Button>
                ) : isEnded ? (
                    <Button disabled variant="outline" size="sm" className="w-full">
                        Class Ended
                    </Button>
                ) : (
                    <Button variant="secondary" size="sm" className="w-full" disabled>
                        Starts in {Math.max(0, Math.ceil((new Date(session.startTime).getTime() - new Date().getTime()) / (1000 * 60 * 60)))}h
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
