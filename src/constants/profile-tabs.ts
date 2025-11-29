import { User, BarChart3, CreditCard, FileText } from 'lucide-react';

export const profileTabs = [
  {
    value: 'details',
    label: 'Profile',
    icon: User,
  },
  {
    value: 'progress',
    label: 'Progress',
    icon: BarChart3,
  },
  {
    value: 'payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    value: 'exams',
    label: 'Exams',
    icon: FileText,
  },
];
