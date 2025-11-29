
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-t-lg md:hidden">
      <div className="grid h-16 grid-cols-5">
        {mobileNavItems.map(item => {
          const isActive = !!(item.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href || '#'}
              className={cn(
                'group flex flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors',
                isActive
                  ? 'text-primary'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon
                className={cn('h-6 w-6', isActive ? 'text-primary' : '')}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
