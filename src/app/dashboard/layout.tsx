'use client';

import { useAuthStore } from '@/store/auth.store';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { mainNav, footerNav } from '@/constants/dashboard-nav';
import { BottomNavBar } from '@/components/BottomNavBar';
import AnnouncementManager from '@/components/announcement/announcement-manager';
import { GlobalLiveAlert } from '@/components/live-session/global-live-alert';
import ApprovalBanner from '@/components/alerts/ApprovalBanner';

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
      <Sidebar className="border-r-0 bg-zinc-950 text-white" variant="floating" collapsible="icon">
        {/* Sidebar Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 opacity-90" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Vector Icons - Subtle Background */}
          <svg className="absolute -right-10 top-20 text-white/5 opacity-[0.03] h-64 w-64 rotate-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
          <svg className="absolute -left-10 bottom-20 text-white/5 opacity-[0.03] h-64 w-64 -rotate-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
        </div>

        <SidebarHeader className="relative z-10 h-20 items-center justify-center border-b border-white/10 p-4">
          <div className="flex items-center gap-3 font-headline text-xl font-bold tracking-wide">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
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
            <span className="font-headline text-white drop-shadow-sm group-data-[collapsible=icon]:hidden">Suraj S Kumara</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="relative z-10 p-3 pt-6">
          <SidebarMenu className="space-y-1.5">
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
                    className="text-zinc-400 hover:bg-white/10 hover:text-white data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold transition-all duration-200"
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <span className="absolute right-2 top-2 flex h-2 w-2">
                       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                       <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="relative z-10 p-3 pb-6 border-t border-white/5">
          <SidebarMenu>
            {footerNav.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  isActive={!!(item.href && pathname.startsWith(item.href))}
                  tooltip={item.tooltip}
                  className="text-zinc-500 hover:bg-white/5 hover:text-white"
                >
                  <a href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
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
