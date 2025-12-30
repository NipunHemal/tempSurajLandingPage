'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useUploadImage } from '@/service/query/useUpload';
import { toast } from 'sonner';

interface UploadFieldProps {
    value?: string;
    onChange: (value: string) => void;
    variant?: 'avatar' | 'card';
    label: string;
}

export function UploadField({ value, onChange, variant = 'avatar', label }: UploadFieldProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
    const buttonText = label || 'Image';

    useEffect(() => {
        // If value looks like a URL, it's a preview. If it's an ID, we assume previous preview is valid or we might need a way to fetch it.
        // However, existing logic only set preview if it started with http.
        // In strict ID mode, we might loose the preview if the parent only passes the ID.
        // Requirement said: "i need to image id return handle image preview internaly".
        // This implies we handle ephemeral preview here.
        if (value && value.startsWith('http')) {
            setPreview(value);
        }
    }, [value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // Determine upload type based on simple heuristic or prop?
            // existing logic mapped variants to types.
            // 'profile' | 'nic' | 'class' | 'institute_card_image'
            // We'll infer type from variant or label mostly, but ideally this should be a prop.
            // Let's deduce type mapping similar to previous code but cleaner.
            let uploadType: 'profile' | 'nic' | 'class' | 'institute_card_image' = 'profile';

            if (variant === 'avatar') uploadType = 'profile';
            else if (label.toLowerCase().includes('nic')) uploadType = 'nic';
            else if (label.toLowerCase().includes('institute')) uploadType = 'institute_card_image';

            uploadImage(
                { image: file, type: uploadType },
                {
                    onSuccess: (data) => {
                        onChange(data.data.uploadId);
                        toast.success(`${label} uploaded!`);
                    },
                    onError: () => {
                        setPreview(null);
                        // We might want to clear the onChange value or keep old one?
                        // Usually valid to clear if upload failed.
                    },
                }
            );
        }
    };

    const triggerUpload = () => fileInputRef.current?.click();

    if (variant === 'avatar') {
        return (
            <div className="flex flex-col items-center">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div className="relative group" onClick={triggerUpload}>
                    <Avatar className="h-32 w-32 cursor-pointer border-4 border-background shadow-xl ring-4 ring-primary/20 transition-all hover:ring-primary/40">
                        <AvatarImage src={preview || undefined} alt="Profile Picture" className="object-cover" />
                        <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                            <Upload className="h-10 w-10 opacity-50" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-1 right-1 flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full border-4 border-background shadow-sm cursor-pointer hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95">
                        <Pencil className="w-4 h-4" />
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                            <Loader2 className="animate-spin text-white" />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-full">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Button type="button" variant="outline" onClick={triggerUpload} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {preview ? `Change ${buttonText}` : `Upload ${buttonText}`}
            </Button>
            {preview && (
                <div className="relative mt-4 h-48 w-full">
                    <Image src={preview} alt={`${buttonText} Preview`} fill className="object-contain rounded-md border" />
                </div>
            )}
        </div>
    );
}
