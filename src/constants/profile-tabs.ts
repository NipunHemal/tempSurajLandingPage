import { User, BarChart3, CreditCard, FileText } from "lucide-react";

export const profileTabs = [
  {
    value: "details",
    label: "Profile",
    icon: User,
    path: "/dashboard/profile",
  },
  {
    value: "progress",
    label: "Progress",
    icon: BarChart3,
    path: "/dashboard/profile/progress",
  },
  {
    value: "payments",
    label: "Payments",
    icon: CreditCard,
    path: "/dashboard/profile/payments",
  },
  {
    value: "exams",
    label: "Exams",
    icon: FileText,
    path: "/dashboard/profile/exams",
  },
];
