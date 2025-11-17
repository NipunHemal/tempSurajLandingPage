import { LoginData, PasswordResetRequestData, RegisterData, ResetPasswordData } from "@/types/api-auth-types";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";

export const login = async (loginData: LoginData) => {
  const response = await axiosClient.post(ENDPOINTS.auth.login, loginData);
  return response.data;
};

export const registerStudent = async (registerData: RegisterData) => {
    const response = await axiosClient.post(ENDPOINTS.students.register, registerData);
    return response.data;
};

export const getMe = async () => {
    const response = await axiosClient.get(ENDPOINTS.auth.me);
    return response.data;
};

export const logout = async () => {
    const response = await axiosClient.post(ENDPOINTS.auth.logout);
    return response.data;
};

export const requestPasswordResetCode = async (data: PasswordResetRequestData) => {
    const response = await axiosClient.post(ENDPOINTS.auth.requestPasswordReset, data);
    return response.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
    const response = await axiosClient.post(ENDPOINTS.auth.resetPassword, data);
    return response.data;
}
