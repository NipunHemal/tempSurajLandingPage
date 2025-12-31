export enum LiveSessionStatus {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  ENDED = "ENDED",
}

export enum LiveSessionProviderType {
  ZOOM = "ZOOM",
  YOUTUBE = "YOUTUBE",
  GOOGLE_MEET = "GOOGLE_MEET",
}

export enum AccessType {
  FREE = "FREE",
  PAID = "PAID",
}

export interface LiveProvider {
  id: string;
  provider: LiveSessionProviderType;
  joinUrl: string;
  isPrimary: boolean;
}

export interface LiveSession {
  id: string;
  classId: string;
  className?: string; // Often returned in list views
  title: string;
  description?: string;
  accessType: AccessType;
  status: LiveSessionStatus;
  startTime: string; // ISO 8601
  endTime?: string; // ISO 8601
  showBeforeMinutes?: number;
  providers: LiveProvider[];
  isVisible: boolean;
  paymentStatus?: "PAID" | "NOT_PAID" | "PENDING"; // Contextual to user
}

export interface LiveSessionFilterParams {
  page?: number;
  limit?: number;
  classId?: string; // Optional filtering if supported
}

export interface LiveSessionResponse {
  success: boolean;
  data: {
    items: LiveSession[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface MyLiveSessionResponse {
  success: boolean;
  data: LiveSession[]; // Note: "Get My Sessions" might return array directly or wrapped. Assuming array based on doc description but doc says "Standard Response Structure" wrapper. I'll assume wrapper with list.
  message: string;
}
