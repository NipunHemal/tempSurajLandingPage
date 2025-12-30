import { Announcement, AnnouncementSeverity } from "@/types/announcement.types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
        <Card className={cn(
            "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 flex flex-col h-full",
            isPriority ? "border-amber-500/30 bg-amber-500/5" : "border-border/50"
        )}>
            {announcement.imageUrl && (
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                        {announcement.hasViewed ? (
                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                                <Eye className="w-3 h-3 mr-1" /> Seen
                            </Badge>
                        ) : (
                            <Badge className="bg-primary text-primary-foreground shadow-sm animate-pulse">
                                New
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            <CardHeader className={cn("pb-3", !announcement.imageUrl && "pt-6")}>
                <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="capitalize font-normal text-muted-foreground border-primary/20 bg-primary/5">
                        {announcement.type.toLowerCase()}
                    </Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="font-bold text-lg leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {announcement.title}
                </h3>
            </CardHeader>

            <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {announcement.body}
                </p>
            </CardContent>

            <CardFooter className="pt-0 pb-4 px-6">
                <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-primary group/btn" size="sm">
                    Read Details
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}
