import { Announcement, AnnouncementDisplayType, AnnouncementSeverity } from "@/types/announcement.types";
import { X, AlertTriangle, CheckCircle, Info, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnnouncementBannerProps {
    announcement: Announcement;
    onDismiss: (id: string) => void;
}

export default function AnnouncementBanner({
    announcement,
    onDismiss,
}: AnnouncementBannerProps) {
    const isBottom = announcement.displayType === AnnouncementDisplayType.BOTTOM_BANNER;

    const getSeverityStyles = (severity: AnnouncementSeverity) => {
        switch (severity) {
            case AnnouncementSeverity.ERROR:
                return "bg-destructive text-destructive-foreground border-destructive/20";
            case AnnouncementSeverity.WARNING:
                return "bg-amber-500 text-white border-amber-600/20";
            case AnnouncementSeverity.SUCCESS:
                return "bg-green-600 text-white border-green-700/20";
            case AnnouncementSeverity.INFO:
            default:
                return "bg-primary text-primary-foreground border-primary/20";
        }
    };

    const getIcon = (severity: AnnouncementSeverity) => {
        switch (severity) {
            case AnnouncementSeverity.ERROR:
                return <AlertOctagon className="h-5 w-5 shrink-0" />;
            case AnnouncementSeverity.WARNING:
                return <AlertTriangle className="h-5 w-5 shrink-0" />;
            case AnnouncementSeverity.SUCCESS:
                return <CheckCircle className="h-5 w-5 shrink-0" />;
            case AnnouncementSeverity.INFO:
            default:
                return <Info className="h-5 w-5 shrink-0" />;
        }
    };

    return (
        <div
            className={cn(
                "fixed left-0 right-0 z-50 flex w-full items-center justify-between px-4 py-3 shadow-md transition-all duration-300 ease-in-out md:px-8",
                getSeverityStyles(announcement.severity),
                isBottom ? "bottom-0" : "top-0"
            )}
            role="alert"
        >
            <div className="flex flex-1 items-center gap-4">
                {getIcon(announcement.severity)}
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                    <p className="font-semibold">{announcement.title}</p>
                    <span className="hidden h-1 w-1 rounded-full bg-current opacity-50 md:block" />
                    <p className="text-sm opacity-90">{announcement.body}</p>
                </div>
            </div>

            {announcement.isDismissible && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDismiss(announcement.id)}
                    className={cn(
                        "ml-4 h-8 w-8 shrink-0 hover:bg-black/10",
                        announcement.severity === AnnouncementSeverity.WARNING ? "text-white hover:text-white" : ""
                    )}
                    aria-label="Dismiss"
                >
                    <X className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
}
