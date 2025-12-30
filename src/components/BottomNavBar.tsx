
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/constants/dashboard-nav';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  User,
  Megaphone,
} from 'lucide-react';

const mobileNavItems = mainNav.filter(item =>
  [LayoutDashboard, BookOpen, BookMarked, User, Megaphone].some(
    icon => item.icon === icon
  )
);

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-background/80 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-lg md:hidden pb-safe">
      <div className="grid h-16 grid-cols-5 items-center justify-items-center">
        {mobileNavItems.map(item => {
          const isActive = !!(item.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href || '#'}
              className={cn(
                'group relative flex h-full w-full flex-col items-center justify-center gap-1 transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <div className="absolute top-0 h-0.5 w-8 rounded-b-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              )}
              <div className={cn("transition-transform duration-300 group-active:scale-95", isActive ? "-translate-y-0.5" : "")}>
                <item.icon
                  className={cn('h-6 w-6 transition-all', isActive ? 'drop-shadow-[0_0_8px_rgba(250,187,9,0.4)]' : 'opacity-70 group-hover:opacity-100')}
                />
              </div>
              <span className={cn("text-[10px] font-medium transition-all", isActive ? "font-bold" : "opacity-70")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
