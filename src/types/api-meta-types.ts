export interface Field {
  fieldName: string;
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
