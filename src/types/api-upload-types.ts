export interface UploadImageParams {
  image: File;
  type: 'profile' | 'nic' | 'class';
}

export interface UploadImageResponse {
  success: boolean;
  data: {
    uploadId: string;
    url: string;
  };
  message: string;
}
