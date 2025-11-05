
'use client';
import {
  Book,
  BookMarked,
  BookOpen,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  BarChart3,
  User,
} from 'lucide-react';
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

export default function Home() {
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
            <span className="font-headline">LMS</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/class'}
                tooltip="Classes"
              >
                <Link href="/dashboard/class">
                  <BookOpen />
                  Classes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Lesson">
                <Book />
                Lesson
              </SidebarMenuButton>
              <SidebarMenuBadge className="h-5 w-5 justify-center rounded-full bg-destructive text-destructive-foreground">3</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/my-classes'}
                tooltip="My Classes"
              >
                <Link href="/dashboard/my-classes">
                  <BookMarked />
                  My Classes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Progress">
                    <BarChart3 />
                    Progress
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile">
                    <User />
                    Profile
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Announcements">
                    <Megaphone />
                    Announcements
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <LifeBuoy />
                Help
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader title="Dashboard" />
        <main className="p-6">
          {/* Content will be implemented later */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
