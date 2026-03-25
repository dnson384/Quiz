"use client";
import { User } from "@/domain/entities/User";
import { useAuthContext } from "@/presentation/context/auth.context";
import {
  getAllUsers,
  grantAdmin,
  lockUser,
  unLockUser,
} from "@/presentation/services/admin.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useDashboardAdmin() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();

  const grantAdminRole = async (id: string) => {
    if (confirm("Chắc chưa?")) {
      if (await grantAdmin(id)) {
        setUsers((prev) => {
          if (!prev) return;
          return prev.filter((user) => user.id !== id);
        });
      }
    }
  };

  const lockOrUnlockUser = async (id: string, isActived: boolean) => {
    if (isActived) {
      if (await lockUser(id)) {
        setUsers((prev) => {
          if (!prev) return;

          const newUsers = [...prev];
          const index = newUsers.findIndex((user) => user.id === id);
          newUsers[index] = {
            ...newUsers[index],
            isActived: false,
          };
          return newUsers;
        });
      }
    } else {
      if (await unLockUser(id)) {
        setUsers((prev) => {
          if (!prev) return;

          const newUsers = [...prev];
          const index = newUsers.findIndex((user) => user.id === id);
          newUsers[index] = {
            ...newUsers[index],
            isActived: true,
          };
          return newUsers;
        });
      }
    }
  };

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      if (!data) return;

      setUsers(
        data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
          isActived: user.isActived,
        })),
      );
    };
    fetchData();
  }, [user]);

  return { user, users, grantAdminRole, lockOrUnlockUser };
}
