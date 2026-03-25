import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { login, logout, register } from "@/presentation/services/auth.service";
import {
  validateLogin,
  validateRegister,
} from "@/presentation/utils/authValidation.util";
import { useAuthStore } from "@/presentation/store/auth.store";

export default function useAuth() {
  const router = useRouter();

  const [fieldData, setFieldData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [acceptTerm, setAcceptTerm] = useState(false);

  const setAuthMethod = useAuthStore((state) => state.setAuthMethod);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const setRole = (roleInput: string) => {
    setFieldData((prev) => ({ ...prev, role: roleInput.toUpperCase() }));
  };

  const handleRoleChoice = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    setRole(target.id);
  };

  const handleCloseAuthForm = () => {
    router.push("/");
  };

  const handleSubmitLoginForm = async (
    event: React.MouseEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const errMessage = validateLogin(fieldData);
    if (errMessage) {
      setError(errMessage);
      return;
    }

    try {
      const cur_user = await login({
        email: fieldData.email,
        plainPassword: fieldData.plainPassword,
      });
      if (!cur_user) throw Error;

      if (cur_user.user.role !== "ADMIN") {
        router.replace("/dashboard");
      } else {
        router.replace("/admin");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail: string }>;
      setError(axiosErr.response?.data?.detail || "Đăng nhập thất bại");
    }
  };

  const handleSubmitRegisterForm = async (
    event: React.MouseEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!acceptTerm) {
      setError("Vui lòng chấp nhận điều khoản...");
      return;
    }

    const errMessage = validateRegister(fieldData);
    if (errMessage) {
      setError(errMessage);
      return;
    }

    try {
      await register({
        email: fieldData.email,
        username: fieldData.username,
        plainPassword: fieldData.plainPassword,
        confirmPassword: fieldData.confirmPassword,
        role: fieldData.role,
      });
      setAuthMethod("login");
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail: string }>;
      setError(axiosErr.response?.data?.detail || "Đăng ký thất bại");
    }
  };

  const handleAcceptTermChange = () => {
    setAcceptTerm(!acceptTerm);
  };

  const logoutUser = async () => {
    const logoutSucess = await logout();
    if (logoutSucess) {
      window.location.replace("/");
    }
  };

  // Check error
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return {
    fieldData,
    error,
    acceptTerm,
    setFieldData,
    setError,
    handleInputChange,
    setRole,
    handleRoleChoice,
    handleCloseAuthForm,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
    handleAcceptTermChange,
    logoutUser,
  };
}
