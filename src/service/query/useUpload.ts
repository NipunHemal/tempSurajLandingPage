import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/service/functions/upload.service';
import { toast } from 'sonner';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: response => {
      // toast.success(response.message || 'Image uploaded successfully!');
    },
    onError: (error: any) => {
      console.error('Image upload failed:', error);
      toast.error(
        error?.response?.data?.message || 'Image upload failed. Please try again.'
      );
    },
  });
};
