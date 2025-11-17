import axios from "axios";
import { ENDPOINTS } from "./endpoints";
import Cookies from "js-cookie";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleLogout = () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
    if (typeof window !== 'undefined') {
        window.location.href = "/login";
    }
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshtoken");
        if (!refreshToken) {
          toast.error("Session expired. Please log in again.");
          handleLogout();
          return Promise.reject(error);
        }
        const response = await axios.post(
          BASE_URL + ENDPOINTS.auth.refreshToken,
          {
            refreshToken,
          }
        );
        const { accessToken } = response.data.data;
        Cookies.set("accesstoken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
