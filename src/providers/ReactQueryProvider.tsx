"use client";
import { queryClient } from "@/lib/react-query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useGetMe } from "@/service/query/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
};

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { data: userProfile, isLoading, isSuccess, isError } = useGetMe();
  const { setUser, setLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLoading(isLoading);
    if (isSuccess && userProfile?.data) {
      setUser(userProfile.data);
      if (
        !userProfile.data.student.isProfileCompleted &&
        pathname !== "/dashboard/complete-profile"
      ) {
        router.replace("/dashboard/complete-profile");
      }
    }
    if (isError) {
      setUser(null);
    }
  }, [userProfile, isLoading, isSuccess, isError, setUser, setLoading, router, pathname]);

  const hasToken = !!Cookies.get("accesstoken");
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(p => pathname.startsWith(p));
  const isPublicPage = pathname === '/' || isAuthPage;

  if (!isClient) {
    return null; // or a basic skeleton
  }

  if (isLoading && hasToken && !isPublicPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
      oshan  <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
