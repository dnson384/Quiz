"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import axios, { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  loginMethod: string;
}

interface AuthContextType {
  user: User | null;
  error: AxiosError | null;
}

const fetcher = async (url: string): Promise<User> => {
  try {
    const resposne = await axios.get(url);
    return resposne.data;
  } catch (err) {
    throw err;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_PATHS = ["/auth", "/"];

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    await axios.post("/api/auth/refresh");
    return true;
  } catch (error) {
    console.error("Refresh token failed", error);
    return false;
  }
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sendRefresh, setSendRefresh] = useState<boolean>(false);

  const isPublicPath = PUBLIC_PATHS.some((path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  });

  const swrKey = isPublicPath ? null : "/api/user/me";

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User, AxiosError>(swrKey, fetcher, {
    revalidateOnFocus: false, // tránh gọi API liên tục khi đổi tab)
    shouldRetryOnError: false, // nếu lỗi 401, không thử lại
    revalidateIfStale: false,
  });

  useEffect(() => {
    if (error?.response?.status === 401 && !sendRefresh) {
      setSendRefresh(true);

      const handleRefresh = async () => {
        const success = await refreshAccessToken();

        if (success) {
          try {
            await mutate();
            setSendRefresh(false);
          } catch (mutateError) {
            console.error(
              "Mutate failed after refresh, redirecting.",
              mutateError,
            );
            router.push("/auth");
          }
        } else {
          router.push("/auth");
        }
      };

      handleRefresh();
    }
  }, [error, router, sendRefresh, mutate]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        error: error || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
