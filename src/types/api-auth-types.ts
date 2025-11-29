
import { Institute } from "./api-institute-types";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
    firstName: string;
    lastName: string;
    profilePicture?: string;
}

export interface EmailChangeData {
    newEmail: string;
}

export interface EmailChangeCodeData {
    code: string;
}

export interface PasswordResetRequestData {
  email: string;
}

export interface ResetPasswordData {
  code: string;
  newPassword: string;
  email: string;
}

export interface StudentData {
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
  gender: string | null;
  profilePicture: string | null;
  year: string | null;
  nic: string | null;
  nicPic: string | null;
  homeAddress: string | null;
  registerCode: string | null;
  isProfileCompleted: boolean;
  approvalStatus: string;
  approvedBy: string | null;
  approvedAt: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  institute: Institute | null;
}

export interface UserProfileData {
  id: string;
  email: string;
  role: string;
  provider: string;
  phoneNumber: string | null;
  whatsappNumber: string | null;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  accountStatus: string;
  lastLogin: string;
  maxLoginDevice: number;
  themeMode: string;
  createdAt: string;
  updatedAt: string;
  student: StudentData;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfileData;
}
