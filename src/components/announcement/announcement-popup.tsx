import { Announcement, AnnouncementDisplayType } from "@/types/announcement.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { X, Bell, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AnnouncementPopupProps {
    announcement: Announcement;
    onDismiss: (id: string) => void;
}

export default function AnnouncementPopup({
    announcement,
    onDismiss,
}: AnnouncementPopupProps) {
    const isCenter = announcement.displayType === AnnouncementDisplayType.POPUP_CENTER;

    if (isCenter) {
        return (
            <Dialog open={true} onOpenChange={(open) => !open && announcement.isDismissible && onDismiss(announcement.id)}>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden gap-0 border-none shadow-2xl bg-background/80 backdrop-blur-xl ring-1 ring-white/20">
                    <div className="relative">
                        {announcement.imageUrl ? (
                            <div className="relative w-full h-56">
                                <Image
                                    src={announcement.imageUrl}
                                    alt={announcement.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                            </div>
                        ) : (
                            <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
                        )}

                        <div className={cn("absolute left-6", announcement.imageUrl ? "-bottom-8" : "top-6")}>
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-lg ring-1 ring-border/50">
                                <Bell className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pt-10 pb-6">
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                    {announcement.severity || "UPDATE"}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-medium">
                                    {new Date(announcement.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                                {announcement.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
                            {announcement.body}
                        </div>

                        <DialogFooter className="mt-8 flex gap-3 sm:justify-end">
                            {announcement.isDismissible && (
                                <Button
                                    onClick={() => onDismiss(announcement.id)}
                                    variant="outline"
                                    className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                                >
                                    Dismiss
                                </Button>
                            )}
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                Read More <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Toast Style Popup (Left Bottom)
    return (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm animate-in slide-in-from-left-5 fade-in duration-500">
            <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-primary/20 bg-background/90 backdrop-blur-md overflow-hidden ring-1 ring-border/50">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                {announcement.isDismissible && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => onDismiss(announcement.id)}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                )}

                <div className="flex p-4 gap-4">
                    {announcement.imageUrl && (
                        <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden ring-1 ring-border">
                            <Image
                                src={announcement.imageUrl}
                                alt={announcement.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-sm leading-none tracking-tight pr-4">
                            {announcement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {announcement.body}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
