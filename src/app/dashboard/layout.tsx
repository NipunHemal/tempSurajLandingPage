
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
import DashboardHeader from '@/components/dashboard-header';
import { mainNav, footerNav } from '@/constants/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="h-16 items-center justify-center border-b">
          <div className="flex items-center gap-2 font-headline text-lg font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-primary"
            >
              <path d="M12 3L2 9L12 15L22 9L12 3Z" />
              <path d="M2 15L12 21L22 15" />
              <path d="M2 9L12 15L22 9" />
            </svg>
            <span className="font-headline">ELIGHT LMS</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {mainNav.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href && pathname.startsWith(item.href)}
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
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            {footerNav.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton tooltip={item.tooltip}>
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
