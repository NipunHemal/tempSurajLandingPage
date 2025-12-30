import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
    className?: string;
    pulse?: boolean;
}

export default function LiveIndicator({ className, pulse = true }: LiveIndicatorProps) {
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400",
            className
        )}>
            <span className="relative flex h-2 w-2">
                {pulse && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            LIVE
        </span>
    );
}
