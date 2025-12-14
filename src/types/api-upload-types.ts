export interface UploadImageParams {
  image: File;
  type: "profile" | "nic" | "class" | "institute_card_image";
}

export interface UploadImageResponse {
  success: boolean;
  data: {
    uploadId: string;
    url: string;
  };
  message: string;
}
