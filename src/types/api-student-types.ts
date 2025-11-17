export interface UpdateStudentProfileData {
  profilePictureUploadId?: string;
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  whatsappNumber?: string;
  phoneNumber: string;
  year: number;
  nic: string;
  nicPicUploadId?: string;
}

export interface AssignInstituteData {
    instituteId: string;
}
