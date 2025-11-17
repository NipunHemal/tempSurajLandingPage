import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, requestPasswordResetCode, resetPassword, registerStudent } from "@/service/functions/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserProfileResponse } from "@/types/api-auth-types";
import Cookies from "js-cookie";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success(response.message);
      const { accessToken, refreshToken } = response.data;
      if (accessToken) {
        Cookies.set("accesstoken", accessToken, { expires: 1/48 }); // expires in 30 minutes
      }
      if (refreshToken) {
        Cookies.set("refreshtoken", refreshToken, { expires: 1 }); // expires in 1 day
      }
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    },
  });
};

export const useRegisterStudent = () => {
    return useMutation({
        mutationFn: registerStudent,
        onSuccess: (response) => {
            toast.success(response.message || "Registration successful! Please login.");
        },
        onError: (error: any) => {
            console.error("Registration failed:", error);
            toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
        },
    });
};

export const useGetMe = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: getMe,
    enabled: !!Cookies.get("accesstoken"),
    retry: 1,
    staleTime: Infinity,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      toast.success(response.message || "Logged out successfully");
      Cookies.remove("accesstoken");
      Cookies.remove("refreshtoken");
      queryClient.setQueryData(["userProfile"], null);
      router.push("/login");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Logout failed. Please try again."
      );
      Cookies.remove("accesstoken");
      Cookies.remove("refreshtoken");
      queryClient.setQueryData(["userProfile"], null);
      router.push("/login");
    },
  });
};

export const useRequestPasswordResetCode = () => {
    return useMutation({
        mutationFn: requestPasswordResetCode,
        onSuccess: (response) => {
            toast.success(response.message || "Password reset code sent.");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send password reset code.");
        },
    });
};

export const useResetPassword = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(response.message || "Password changed successfully.");
            router.push('/login');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to reset password.");
        },
    });
};
