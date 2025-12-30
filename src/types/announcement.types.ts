export enum AnnouncementDisplayType {
  BANNER = "BANNER",
  POPUP_CENTER = "POPUP_CENTER",
  POPUP_LEFT_BOTTOM = "POPUP_LEFT_BOTTOM",
  BOTTOM_BANNER = "BOTTOM_BANNER",
  FULL_SCREEN = "FULL_SCREEN",
}

export enum AnnouncementType {
  GENERAL = "GENERAL",
  ACADEMIC = "ACADEMIC",
  PAYMENT = "PAYMENT",
  SYSTEM = "SYSTEM",
  EVENT = "EVENT",
  PERSONAL = "PERSONAL",
}

export enum AnnouncementPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum AnnouncementSeverity {
  DEFAULT = "DEFAULT",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export enum AnnouncementDisplayRule {
  SHOW_ONCE = "SHOW_ONCE",
  SHOW_UNTIL_EXPIRE = "SHOW_UNTIL_EXPIRE",
  ALWAYS = "ALWAYS",
  CUSTOM = "CUSTOM",
}

export enum TargetType {
  USER = "USER",
  ROLE = "ROLE",
  INSTITUTE = "INSTITUTE",
  CLASS = "CLASS",
}

export interface AnnouncementTarget {
  targetType: TargetType;
  userId?: string;
  role?: "OWNER" | "ADMIN" | "STUDENT";
  instituteId?: string;
  classId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  imageUrl?: string | null;
  displayType: AnnouncementDisplayType;
  type: AnnouncementType;
  priority: AnnouncementPriority;
  severity: AnnouncementSeverity;
  displayRule: AnnouncementDisplayRule;

  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; // Inferred from API response example generally, but user schema implies this exists

  isDismissible: boolean;
  requiresAction: boolean;

  publishedAt?: string | null;
  expiresAt?: string | null;
  createdAt: string;

  targets: AnnouncementTarget[];

  // Frontend/Response specific
  hasViewed: boolean;
}

export interface AnnouncementFilterParams {
  type?: AnnouncementType;
  status?: string;
  priority?: AnnouncementPriority;
  severity?: AnnouncementSeverity;
  displayType?: AnnouncementDisplayType;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AnnouncementResponse {
  success: boolean;
  data: {
    items: Announcement[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
}
