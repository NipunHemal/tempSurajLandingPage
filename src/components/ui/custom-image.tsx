'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface CustomImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
    fallbackSrc?: string;
}

export default function CustomImage({
    src,
    alt,
    className,
    fallbackSrc = '/placeholder.png', // Default to our new placeholder
    ...props
}: CustomImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

    useEffect(() => {
        setImgSrc(src || fallbackSrc);
        setIsError(false);
        setIsLoading(true);
    }, [src, fallbackSrc]);

    // Safety check: if no source at all, show error state immediately
    if (!imgSrc) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-secondary/30 text-muted-foreground">
                <ImageOff className="h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden">
            {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
            )}

            {isError ? (
                <div className="flex h-full w-full items-center justify-center bg-secondary/30 text-muted-foreground">
                    <ImageOff className="h-10 w-10" />
                </div>
            ) : (
                <Image
                    src={imgSrc}
                    alt={alt}
                    className={cn(
                        "transition-opacity duration-500",
                        isLoading ? "opacity-0" : "opacity-100",
                        className
                    )}
                    {...props}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setIsError(true);
                        // Optional: Try fallback if provided, but standard ImageOff might be cleaner
                        if (fallbackSrc && fallbackSrc !== imgSrc) {
                            setImgSrc(fallbackSrc);
                            setIsError(false); // Reset error to try loading fallback
                        }
                    }}
                />
            )}
        </div>
    );
}
