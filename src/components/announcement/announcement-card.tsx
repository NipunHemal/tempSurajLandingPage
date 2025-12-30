import { Announcement, AnnouncementSeverity } from "@/types/announcement.types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnnouncementCardProps {
    announcement: Announcement;
    onView?: (id: string) => void;
}

export default function AnnouncementCard({
    announcement,
    onView
}: AnnouncementCardProps) {
    const isPriority = announcement.severity === AnnouncementSeverity.WARNING || announcement.severity === AnnouncementSeverity.ERROR;

    return (
        <Card className={cn("overflow-hidden transition-all hover:shadow-md", isPriority ? "border-amber-500/50" : "")}>
            {announcement.imageUrl && (
                <div className="relative h-48 w-full bg-muted">
                    <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex gap-2 mb-2">
                            <Badge variant="outline" className="capitalize">{announcement.type.toLowerCase()}</Badge>
                            {announcement.severity !== AnnouncementSeverity.DEFAULT && (
                                <Badge variant={isPriority ? "destructive" : "secondary"} className="capitalize">
                                    {announcement.severity.toLowerCase()}
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="line-clamp-2 md:text-xl">{announcement.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            {new Date(announcement.createdAt).toLocaleDateString()}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {announcement.body}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {announcement.hasViewed ? (
                        <span className="flex items-center gap-1 text-green-600">
                            <Eye className="h-3 w-3" /> Seen
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-amber-600">
                            <AlertCircle className="h-3 w-3" /> New
                        </span>
                    )}
                </div>
                {/* If there was a 'Read More' or detail view logic, we'd add button here */}
            </CardFooter>
        </Card>
    );
}
