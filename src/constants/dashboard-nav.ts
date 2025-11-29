
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

type NavItem = {
  href?: string
  label: string
  icon: React.FC
  tooltip: string
  badge?: string
};


export const mainNav: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    tooltip: 'Dashboard',
  },
  {
    href: '/dashboard/class',
    label: 'Classes',
    icon: BookOpen,
    tooltip: 'Classes',
  },
  {
    label: 'Lesson',
    icon: Book,
    tooltip: 'Lesson',
    badge: '3',
  },
  {
    href: '/dashboard/my-classes',
    label: 'My Classes',
    icon: BookMarked,
    tooltip: 'My Classes',
  },
  {
    label: 'Progress',
    icon: BarChart3,
    tooltip: 'Progress',
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
    tooltip: 'Profile',
  },
  {
    label: 'Announcements',
    icon: Megaphone,
    tooltip: 'Announcements',
  },
];

export const footerNav = [
  {
    href: '/dashboard/help',
    label: 'Help',
    icon: LifeBuoy,
    tooltip: 'Help',
  },
];
