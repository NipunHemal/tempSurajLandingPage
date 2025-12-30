
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { mainNav, footerNav } from '@/constants/dashboard-nav';
import BottomNavBar from '@/components/BottomNavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuthStore } from '@/store/auth.store';
import { Hourglass } from 'lucide-react';
import ApprovalBanner from '@/components/alerts/ApprovalBanner';
import AnnouncementManager from '@/components/announcement/announcement-manager';
import GlobalLiveAlert from '@/components/live-session/global-live-alert';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { user } = useAuthStore();

  const isPendingApproval = user?.student?.approvalStatus === 'PENDING';

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="h-20 items-center justify-center border-b border-border/40 p-4">
          <div className="flex items-center gap-3 font-headline text-xl font-bold tracking-wide">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <path d="M12 3L2 9L12 15L22 9L12 3Z" />
                <path d="M2 15L12 21L22 15" />
                <path d="M2 9L12 15L22 9" />
              </svg>
            </div>
            <span className="font-headline bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">ELIGHT LMS</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {mainNav.map((item, index) => {
              const isActive = item.href === '/dashboard'
                ? pathname === item.href
                : !!(item.href && pathname.startsWith(item.href));

              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.tooltip}
                  >
                    <Link href={item.href || '#'}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="h-5 w-5 justify-center rounded-full bg-destructive text-destructive-foreground">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            {footerNav.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  isActive={!!(item.href && pathname.startsWith(item.href))}
                  tooltip={item.tooltip}
                >
                  <Link href={item.href || '#'}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className={isMobile ? 'pb-20' : ''}>
        <GlobalLiveAlert />
        <AnnouncementManager />
        {isPendingApproval && <ApprovalBanner />}
        {children}
      </SidebarInset>
      {isMobile && <BottomNavBar />}
    </SidebarProvider>
  );
}
