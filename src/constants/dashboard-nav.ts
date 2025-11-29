
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

export const mainNav = [
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
    label: 'Help',
    icon: LifeBuoy,
    tooltip: 'Help',
  },
];
