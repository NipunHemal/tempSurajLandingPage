"use client";
import { queryClient } from "@/lib/react-query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useGetMe } from "@/service/query/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useGetMeta } from "@/service/query/useMeta";
import { useMetaStore } from "@/store/meta.store";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <MetaInitializer>{children}</MetaInitializer>
      </AuthInitializer>
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

  const hasToken = isClient ? !!Cookies.get("accesstoken") : false;
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(p => pathname.startsWith(p));
  const isPublicPage = pathname === '/' || isAuthPage;

  if (!isClient) {
    return null; 
  }
  
  if (isLoading && hasToken && !isPublicPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

const MetaInitializer = ({ children }: { children: React.ReactNode }) => {
  const { data: metaData, isLoading, isSuccess } = useGetMeta();
  const { setMeta, setLoading } = useMetaStore();

  useEffect(() => {
    setLoading(isLoading);
    if (isSuccess && metaData?.data) {
      setMeta(metaData.data);
    }
  }, [metaData, isLoading, isSuccess, setMeta, setLoading]);

  return <>{children}</>;
};
