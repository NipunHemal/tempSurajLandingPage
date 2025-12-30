
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationCenter from './notification-center';
import { SidebarTrigger } from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { LifeBuoy, LogOut, User } from 'lucide-react';
import React from 'react';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useLogout } from '@/service/query/useAuth';

export default function DashboardHeader({ title, children }: { title?: string, children?: React.ReactNode }) {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/40 bg-background/60 px-6 backdrop-blur-xl transition-all supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hidden md:flex hover:bg-white/10 hover:text-primary transition-colors" />
        <div>
          {children}
          {title && <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground/90">
            {title}
          </h1>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationCenter />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.student?.profilePicture || undefined} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.student?.firstName?.[0] || 'A'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 overflow-hidden rounded-xl border-border/50 bg-background/95 backdrop-blur-xl">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.student?.firstName} {user?.student?.lastName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary">
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary">
              <Link href="/dashboard/help">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Help
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
