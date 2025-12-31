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
    Loader2,
    ExternalLink,
    Lock,
    Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useGetClassById } from '@/service/query/useClass';
import { useGetResourcesByClassAndMonth } from '@/service/query/useModule';
import { useGetPaymentHistory } from '@/service/query/usePayment';
import { useAuthStore } from '@/store/auth.store';
import { ModuleResource } from '@/service/functions/modules.service';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthResourcesPage() {
    const params = useParams();
    const classId = params.id as string;
    const month = params.month as string; // Format: YYYY-MM

    const { data: classResponse } = useGetClassById(classId);
    const classDetails = classResponse?.data;

    const {
        data: resourcesResponse,
        isLoading: isLoadingResources,
        error: resourcesError
    } = useGetResourcesByClassAndMonth(classId, month);

    const resources = resourcesResponse?.data || [];

    const [filter, setFilter] = useState<string | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState<ModuleResource | null>(null);

    const { user } = useAuthStore();

    const { data: paymentHistoryResponse } = useGetPaymentHistory(
        user?.id,
        classId
    );

    // Check payment status for current month
    const currentMonthPayment = paymentHistoryResponse?.data?.find(
        payment => payment.paymentMonth === month
    );
    const isPaid = currentMonthPayment?.status === 'COMPLETED';
    const isPending = currentMonthPayment?.status === 'PENDING';
    const needsPayment = !isPaid && !isPending;

    // Get month display name from YYYY-MM format
    const getMonthDisplayName = (): string => {
        if (!month) return '';
        const [year, monthNum] = month.split('-');
        const monthIndex = parseInt(monthNum, 10) - 1;
        return `${MONTHS[monthIndex]} ${year}`;
    };

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

    // Convert YouTube URL to embed URL
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return url;
    };

    // Group resources by module name (lesson)
    const groupedContent = useMemo(() => {
        if (!resources || resources.length === 0) return [];

        const grouped: Record<string, { moduleId: string; items: ModuleResource[] }> = {};

        resources.forEach(item => {
            // Filter logic
            if (filter && item.type !== filter) {
                return;
            }

            const moduleName = item.module?.name || 'General';
            const moduleId = item.module?.id || item.moduleId;
            if (!grouped[moduleName]) {
                grouped[moduleName] = { moduleId, items: [] };
            }
            grouped[moduleName].items.push(item);
        });

        return Object.entries(grouped)
            .map(([moduleName, { moduleId, items }]) => ({
                moduleName,
                moduleId,
                items
            }));
    }, [resources, filter]);

    const renderContentItem = (item: ModuleResource, itemIndex: number) => {
        const isLocked = item.paymentStatus === 'NOT_PAID';
        const isPending = item.paymentStatus === 'PENDING';
        const isAccessible = !isLocked && !isPending;

        const handleCardClick = () => {
            if (isLocked) {
                setShowPaymentDialog(true);
            }
            // For pending, we don't do anything - just show the status
        };

        const cardContent = (
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {isLocked ? (
                        <Lock className="text-muted-foreground" />
                    ) : isPending ? (
                        <Clock className="text-amber-500" />
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
                    ) : isPending ? (
                        <>
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-amber-500">Pending</span>
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

        // Locked items - show payment dialog on click
        if (isLocked) {
            return (
                <li
                    key={item.id}
                    onClick={handleCardClick}
                    className="flex items-center justify-between rounded-md border p-4 opacity-75 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                    {cardContent}
                </li>
            );
        }

        // Pending items - not clickable, show pending status
        if (isPending) {
            return (
                <li
                    key={item.id}
                    className="flex items-center justify-between rounded-md border p-4 opacity-75 bg-amber-500/10 border-amber-500/30"
                    title="Payment is pending approval"
                >
                    {cardContent}
                </li>
            );
        }

        // VIDEO items - open in popup
        if (item.type === 'VIDEO') {
            return (
                <li
                    key={item.id}
                    onClick={() => setSelectedResource(item)}
                    className="rounded-md border hover:bg-muted/30 transition-colors cursor-pointer"
                >
                    <div className="flex items-center justify-between p-4 w-full">
                        {cardContent}
                    </div>
                </li>
            );
        }

        // For LINK/DOCUMENT items, wrap in Link for navigation
        const href = item.url || '#';

        return (
            <li key={item.id} className="rounded-md border hover:bg-muted/30 transition-colors">
                <Link
                    href={href}
                    target="_blank"
                    className="flex items-center justify-between p-4 w-full"
                >
                    {cardContent}
                </Link>
            </li>
        );
    }

    if (isLoadingResources) {
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
                <DashboardHeader title="Resources Not Found" />
                <main className="flex flex-1 items-center justify-center">
                    <p className="text-destructive">Error loading resources for this month.</p>
                </main>
            </>
        )
    }

    const monthTitle = getMonthDisplayName();

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
                                    <Link
                                        href={`/dashboard/class/${classId}`}
                                        className="block max-w-[100px] truncate md:max-w-none"
                                    >
                                        {classDetails.name}
                                    </Link>
                                </BreadcrumbLink>
                            ) : (
                                <span>Class</span>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 max-w-[120px] md:max-w-none">{monthTitle}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </DashboardHeader>
            <main>
                <div className="p-6">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-2 font-headline text-4xl font-bold">
                            {monthTitle}
                        </h1>
                        <p className="mb-4 text-muted-foreground">
                            Resources for {monthTitle}
                        </p>

                        {/* Payment Banner */}
                        {needsPayment && (
                            <div className="mb-6 rounded-lg border border-destructive/50 bg-gradient-to-r from-destructive/20 to-destructive/10 p-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-destructive/20 p-2">
                                            <Lock className="h-5 w-5 text-destructive" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-destructive">Payment Required</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Unlock all content for {monthTitle} by completing your payment.
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setShowPaymentDialog(true)}
                                        className="bg-destructive hover:bg-destructive/90"
                                    >
                                        Pay Now - Rs. {classDetails?.price || 0}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {isPending && (
                            <div className="mb-6 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-amber-500/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-amber-500/20 p-2">
                                        <Clock className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-amber-600">Payment Pending Approval</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Your payment for {monthTitle} is being reviewed. You&apos;ll have full access once approved.
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                            <span className="flex-1 text-left">{group.moduleName}</span>
                                            <span className="text-sm text-muted-foreground mr-4 font-normal">{group.items.length} items</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-background">
                                        {group.items.length > 0 ? (
                                            <ul className="space-y-2 pt-4">
                                                {group.items.map((item, idx) => renderContentItem(item, idx))}
                                            </ul>
                                        ) : (
                                            <div className="pt-4 text-center text-muted-foreground">No content for this section matching your filter.</div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}

                            {groupedContent.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground">
                                    No resources found for this month.
                                </div>
                            )}
                        </Accordion>
                    </div>
                </div>
            </main>

            <PaymentDialog
                classId={classId}
                amount={classDetails?.price || 0}
                defaultPaymentMonth={month}
                open={showPaymentDialog}
                onOpenChange={setShowPaymentDialog}
            />

            {/* Video Player Dialog */}
            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{selectedResource?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full bg-black rounded-md overflow-hidden">
                        {selectedResource?.url && (
                            <iframe
                                src={getEmbedUrl(selectedResource.url)}
                                title={selectedResource.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full border-0"
                            />
                        )}
                        {!selectedResource?.url && (
                            <div className="flex h-full items-center justify-center text-white">
                                <p>Video URL not available.</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
