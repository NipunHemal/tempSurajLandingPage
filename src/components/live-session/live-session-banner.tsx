'use client';

import { LiveSession, LiveSessionStatus } from "@/types/live-session.types";
import { Button } from "@/components/ui/button";
import { X, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LiveIndicator from "./live-indicator";
import { motion, AnimatePresence } from "framer-motion";

interface LiveSessionBannerProps {
    session: LiveSession;
    className?: string;
}

export default function LiveSessionBanner({ session, className }: LiveSessionBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || session.status !== LiveSessionStatus.LIVE) return null;

    const primaryProvider = session.providers.find(p => p.isPrimary) || session.providers[0];
    const joinUrl = primaryProvider?.joinUrl || '#';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={className}
                >
                    <div className="relative w-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 h-full w-32 bg-white/5 skew-x-12 -mr-16"></div>

                        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
                            <div className="flex flex-1 items-center gap-3 overflow-hidden">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <Video className="h-4 w-4 text-white" />
                                </span>
                                <div className="flex flex-col gap-0.5 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <p className="truncate font-medium text-sm sm:text-base">
                                            Live Lesson Started: <span className="font-bold">{session.title}</span>
                                        </p>
                                        <LiveIndicator className="bg-white/20 text-white border-0" pulse={true} />
                                    </div>
                                    <p className="truncate text-xs text-red-100/90 sm:text-sm">
                                        Join now to participate in the live session.
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                                <Button
                                    asChild
                                    size="sm"
                                    className="hidden shrink-0 bg-white text-red-600 hover:bg-white/90 sm:inline-flex border-0 font-semibold"
                                >
                                    <Link href={joinUrl} target="_blank">
                                        Join Now
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsVisible(false)}
                                    className="text-white hover:bg-white/20 shrink-0 h-8 w-8"
                                >
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Dismiss</span>
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Action Bar */}
                        <a
                            href={joinUrl}
                            target="_blank"
                            className="flex w-full items-center justify-center bg-black/10 py-2 text-xs font-medium text-white hover:bg-black/20 sm:hidden"
                        >
                            Join Session
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
