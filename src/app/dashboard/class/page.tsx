
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Book,
  BookMarked,
  BookOpen,
  LayoutDashboard,
  LifeBuoy,
  Search,
  BarChart3,
  User,
  Megaphone,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';

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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContentCard from '@/components/content-card';
import { availableClasses } from '@/lib/class-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ClassPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find(img => img.id === id);
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const filteredClasses = useMemo(() => {
    return availableClasses.filter(c => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterValue === 'all' || c.tags.includes(filterValue);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterValue]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    availableClasses.forEach(c => c.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

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
        <DashboardHeader title="Classes" />
        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filterValue === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterValue('all')}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={filterValue === tag ? 'default' : 'outline'}
                  onClick={() => setFilterValue(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredClasses.map(card => {
              const image = getImage(card.imageId);
              return (
                <ContentCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  link={card.link}
                  imageUrl={image?.imageUrl ?? ''}
                  imageHint={image?.imageHint ?? ''}
                  paid={card.paid}
                  status={(card as any).status}
                />
              );
            })}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
