
import {
  Book,
  BookMarked,
  BookOpen,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  User,
} from 'lucide-react';

type NavItem = {
  href?: string;
  label: string;
  icon: React.FC<any>;
  tooltip: string;
  badge?: string;
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
    href: '/dashboard/my-classes',
    label: 'My Classes',
    icon: BookMarked,
    tooltip: 'My Classes',
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
    tooltip: 'Profile',
  },
  // {
  //   href: '/dashboard/announcements',
  //   label: 'Announce',
  //   icon: Megaphone,
  //   tooltip: 'Announcements',
  // },
];

export const footerNav: NavItem[] = [
  {
    href: '/dashboard/help',
    label: 'Help',
    icon: LifeBuoy,
    tooltip: 'Help',
  },
];
