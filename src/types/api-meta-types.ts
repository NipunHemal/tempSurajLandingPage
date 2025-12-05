

export interface Field {
  fieldName: 'first_name' | 'last_name' | 'dob' | 'gender' | 'phone_number' | 'profile_picture' | 'year' | 'nic' | 'nic_pic' | 'al_year' | 'ol_year' | 'stream' | 'medium' | 'school' | 'whatsapp_number' | 'telegram_number' | 'shy_select' | 'postalcode' | 'home_address' | 'delivery_address' | 'guardian_name' | 'relationship' | 'guardian_contact_number' | 'city' | 'district' | 'province' | 'country' | 'institute_number' | 'institute_card_image' | 'profile_picture_upload_id' | 'nic_pic_upload_id';
  required: boolean;
  isEnabled: boolean;
  enum?: string[];
}

export interface ProfileSetting {
  settingType: 'STUDENT_PROFILE' | 'ADMIN_PROFILE';
  fields: Field[];
}

export interface Settings {
  STUDENT_PROFILE: ProfileSetting;
  ADMIN_PROFILE: ProfileSetting;
}

export interface MetaData {
  apiVersion: string;
  lastUpdated: string;
  settings: Settings;
}

export interface MetaResponse {
  success: boolean;
  data: MetaData;
}
