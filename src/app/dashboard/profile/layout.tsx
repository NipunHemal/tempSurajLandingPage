'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/components/dashboard-header';
import { profileTabs } from '@/constants/profile-tabs';
import { cn } from '@/lib/utils';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <>
            <DashboardHeader title="Profile" />
            <main className="p-6">
                <div className="mb-6 grid w-full grid-cols-4 rounded-lg bg-muted p-1">
                    {profileTabs.map((tab) => {
                        const isActive = pathname === tab.path;
                        return (
                            <Link
                                key={tab.value}
                                href={tab.path}
                                className={cn(
                                    'flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground'
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
                {children}
            </main>
        </>
    );
}
