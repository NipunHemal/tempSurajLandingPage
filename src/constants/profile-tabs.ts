import { User, BarChart3, CreditCard, FileText } from 'lucide-react';

export const profileTabs = [
  {
    value: 'details',
    label: 'Profile Details',
    icon: User,
  },
  {
    value: 'progress',
    label: 'My Progress',
    icon: BarChart3,
  },
  {
    value: 'payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    value: 'exams',
    label: 'My Exams',
    icon: FileText,
  },
];
