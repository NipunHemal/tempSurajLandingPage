
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
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
        <SidebarHeader className="h-16 items-center justify-center border-b">
          <div className="flex items-center gap-2 font-headline text-lg font-semibold">
            <Image
              src="/logo.svg"
              alt="Elight LMS Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
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
