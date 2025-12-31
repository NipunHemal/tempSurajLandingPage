import { Announcement, AnnouncementDisplayType, AnnouncementSeverity } from "@/types/announcement.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, AlertTriangle, CheckCircle, Info, AlertOctagon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnnouncementPopupProps {
    announcement: Announcement;
    onDismiss: (id: string) => void;
}

export default function AnnouncementPopup({
    announcement,
    onDismiss,
}: AnnouncementPopupProps) {
    const isCenter = announcement.displayType === AnnouncementDisplayType.POPUP_CENTER;

    // Center Popup uses Dialog (Modal behavior, blocking)
    if (isCenter) {
        return (
            <Dialog open={true} onOpenChange={(open) => !open && announcement.isDismissible && onDismiss(announcement.id)}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
                    {announcement.imageUrl && (
                        <div className="relative w-full h-48 bg-muted">
                            <Image
                                src={announcement.imageUrl}
                                alt={announcement.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6">
                        <DialogHeader className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                {/* Optional: Add severity badge/icon here if needed */}
                            </div>
                            <DialogTitle className="text-xl">{announcement.title}</DialogTitle>
                        </DialogHeader>

                        <div className="text-muted-foreground whitespace-pre-wrap">
                            {announcement.body}
                        </div>

                        <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                            {announcement.isDismissible && (
                                <Button onClick={() => onDismiss(announcement.id)}>
                                    Dismiss
                                </Button>
                            )}
                            {/* If actions were required, we'd add another button here */}
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Left Bottom Popup uses Fixed Position Card (Non-blocking)
    return (
        <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm animate-in slide-in-from-left-5 fade-in duration-300">
            <Card className="shadow-lg border-l-4 border-l-primary relative overflow-hidden">
                {announcement.isDismissible && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground"
                        onClick={() => onDismiss(announcement.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}

                <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-base flex items-center gap-2">
                        {announcement.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 text-sm text-muted-foreground">
                    {announcement.body}
                </CardContent>
                {announcement.imageUrl && (
                    <div className="px-6 pb-4">
                        <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                            <Image
                                src={announcement.imageUrl}
                                alt={announcement.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
