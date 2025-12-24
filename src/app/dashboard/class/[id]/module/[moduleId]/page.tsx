'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import PaymentDialog from '@/components/payment/PaymentDialog';
import { Button } from '@/components/ui/button';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import DashboardHeader from '@/components/dashboard-header';
import {
    Download,
    FileText,
    PlayCircle,
    BookCheck,
    ClipboardList,
    Loader2,
    ExternalLink,
    Lock,
} from 'lucide-react';
import CustomImage from '@/components/ui/custom-image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useGetClassById } from '@/service/query/useClass';
import { useGetModuleResources, useGetModuleById } from '@/service/query/useModule';
import { ModuleResource } from '@/service/functions/modules.service';

export default function ModuleDetailPage() {
    const params = useParams();
    const classId = params.id as string;
    const moduleId = params.moduleId as string;

    const { data: classResponse } = useGetClassById(classId);
    const classDetails = classResponse?.data;

    const { data: moduleResponse, isLoading: isLoadingModule } = useGetModuleById(moduleId);
    const moduleDetails = moduleResponse?.data;

    const {
        data: resourcesResponse,
        isLoading: isLoadingResources,
        error: resourcesError
    } = useGetModuleResources(moduleId);

    const resources = resourcesResponse?.data || [];

    const [filter, setFilter] = useState<string | null>(null);

    const getContentTypeIcon = (type: string) => {
        switch (type) {
            case 'VIDEO':
                return <PlayCircle className="text-muted-foreground" />;
            case 'DOCUMENT':
                return <FileText className="text-muted-foreground" />;
            case 'LINK':
                return <ExternalLink className="text-muted-foreground" />;
            default:
                return <FileText className="text-muted-foreground" />;
        }
    };

    const handleFilter = (type: string) => {
        setFilter(prevFilter => (prevFilter === type ? null : type));
    };

    // Format month from YYYY-MM to readable format like "November 2026"
    const formatMonthDisplay = (monthKey: string): string => {
        if (monthKey === 'General') return 'General';
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const parts = monthKey.split('-');
        if (parts.length !== 2) return monthKey;
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        if (monthIndex < 0 || monthIndex > 11) return monthKey;
        return `${months[monthIndex]} ${year}`;
    };

    // Group resources by month
    const groupedContent = useMemo(() => {
        if (!resources || resources.length === 0) return [];

        const grouped: Record<string, ModuleResource[]> = {};

        resources.forEach(item => {
            // Filter logic
            if (filter && item.type !== filter) {
                return;
            }

            const key = item.month || 'General';
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        });

        return Object.entries(grouped)
            .sort((a, b) => b[0].localeCompare(a[0])) // Sort months descending? Or distinct sorting needed?
            .map(([month, items]) => ({
                month,
                items
            }));
    }, [resources, filter]);

    const [selectedResource, setSelectedResource] = useState<ModuleResource | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        // Basic YouTube ID extraction
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return url;
    };

    if (isLoadingResources || isLoadingModule) {
        return (
            <>
                <DashboardHeader />
                <main className="flex flex-1 items-center justify-center h-[50vh]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </main>
            </>
        );
    }

    if (resourcesError) {
        return (
            <>
                <DashboardHeader title="Module Not Found" />
                <main className="flex flex-1 items-center justify-center">
                    <p className="text-destructive">Error loading module resources.</p>
                </main>
            </>
        )
    }

    const moduleTitle = moduleDetails?.name || "Module Resources";

    const renderContentItem = (item: ModuleResource, itemIndex: number) => {
        const isLocked = item.paymentStatus === 'NOT_PAID';

        const handleCardClick = () => {
            if (isLocked) {
                setShowPaymentDialog(true);
            } else if (item.type === 'VIDEO') {
                setSelectedResource(item);
            }
        };

        const cardContent = (
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {isLocked ? (
                        <Lock className="text-muted-foreground" />
                    ) : (
                        getContentTypeIcon(item.type)
                    )}
                    <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Release: {new Date(item.releaseDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    {isLocked ? (
                        <>
                            <Lock className="h-4 w-4" />
                            <span className="text-sm">Locked</span>
                        </>
                    ) : item.type === 'VIDEO' ? (
                        <>
                            <PlayCircle className="h-4 w-4" />
                            <span className="text-sm">Watch</span>
                        </>
                    ) : item.type === 'LINK' ? (
                        <>
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm">Open</span>
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4" />
                            <span className="text-sm">Download</span>
                        </>
                    )}
                </div>
            </div>
        );

        // Locked items or VIDEO items use onClick
        if (isLocked || item.type === 'VIDEO') {
            return (
                <li
                    key={item.id}
                    onClick={handleCardClick}
                    className={`flex items-center justify-between rounded-md border p-4 cursor-pointer transition-colors ${isLocked ? 'opacity-75 bg-muted/30 hover:bg-muted/50' : 'hover:bg-muted/30'}`}
                >
                    {cardContent}
                </li>
            );
        }

        // For LINK/DOCUMENT items, wrap in Link for navigation
        return (
            <li key={item.id} className="rounded-md border hover:bg-muted/30 transition-colors">
                <Link
                    href={item.url || '#'}
                    target="_blank"
                    className="flex items-center justify-between p-4 w-full"
                >
                    {cardContent}
                </Link>
            </li>
        );
    }

    return (
        <>
            <DashboardHeader>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild href={''}>
                                <Link href="/dashboard/class">Classes</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {classDetails ? (
                                <BreadcrumbLink asChild href={''}>
                                    <Link href={`/dashboard/class/${classId}`}>{classDetails.name}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <span>Class</span>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{moduleTitle}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </DashboardHeader>
            <main>
                {moduleDetails?.image && (
                    <div className="relative h-64 w-full">
                        <CustomImage
                            src={moduleDetails.image}
                            alt={moduleDetails.name}
                            fill
                            className="object-cover"
                        // data-ai-hint="module-banner"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h1 className="mb-2 font-headline text-4xl font-bold">
                                {moduleDetails.name}
                            </h1>
                            <p className="text-lg opacity-90">
                                {moduleDetails.description}
                            </p>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <div className="mx-auto max-w-4xl">
                        {!moduleDetails?.image && (
                            <>
                                <h1 className="mb-2 font-headline text-4xl font-bold">
                                    {moduleTitle}
                                </h1>
                                {moduleDetails?.description && (
                                    <p className="mb-6 text-muted-foreground">
                                        {moduleDetails.description}
                                    </p>
                                )}
                            </>
                        )}

                        <div className="mb-8 flex gap-2">
                            <Button
                                variant={filter === 'VIDEO' ? 'default' : 'outline'}
                                className={filter !== 'VIDEO' ? 'bg-background' : ''}
                                onClick={() => handleFilter('VIDEO')}>
                                <PlayCircle className="mr-2" />
                                Videos
                            </Button>
                            <Button
                                variant={filter === 'DOCUMENT' ? 'default' : 'outline'}
                                className={filter !== 'DOCUMENT' ? 'bg-background' : ''}
                                onClick={() => handleFilter('DOCUMENT')}>
                                <FileText className="mr-2" />
                                Documents
                            </Button>
                        </div>

                        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                            {groupedContent.map((group, index) => (
                                <AccordionItem value={`item-${index}`} key={index} className="rounded-md border-0 bg-secondary/10">
                                    <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline">
                                        <div className="flex w-full items-center gap-4">
                                            <span className="flex-1 text-left">{formatMonthDisplay(group.month)}</span>
                                            <span className="text-sm text-muted-foreground mr-4 font-normal">{group.items.length} items</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-background">
                                        {group.items.length > 0 ? (
                                            <ul className="space-y-2 pt-4">
                                                {group.items.map((item, idx) => renderContentItem(item, idx))}
                                            </ul>
                                        ) : (
                                            <div className="pt-4 text-center text-muted-foreground">No content for this month matching your filter.</div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}

                            {groupedContent.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground">
                                    No resources found for this module.
                                </div>
                            )}
                        </Accordion>
                    </div>
                </div>
            </main>

            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{selectedResource?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                        {selectedResource?.type === 'VIDEO' && (
                            <iframe
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(selectedResource.url || '')}
                                title={selectedResource.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full border-0"
                            />
                        )}
                        {/* Add Logic for DOCUMENTS if needed, typically they open in new tab or PDF viewer. 
                            For now, keeping only VIDEO in popup as implied by "watch". 
                            If it is not video, maybe just show a link or generic placeholder */}
                        {selectedResource?.type !== 'VIDEO' && (
                            <div className="flex h-full items-center justify-center text-white">
                                <p>This resource cannot be embedded directly.</p>
                                <Button asChild variant="secondary" className="ml-4">
                                    <Link href={selectedResource?.url || '#'} target="_blank">
                                        Open in New Tab
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <PaymentDialog
                classId={classId}
                amount={classDetails?.price || 0}
                open={showPaymentDialog}
                onOpenChange={setShowPaymentDialog}
            />
        </>
    );
}
