"use client";
import { ResultWithPracticeTest } from "@/domain/entities/Result";
import { useAuthContext } from "@/presentation/context/auth.context";
import { getAllHistories } from "@/presentation/services/practice_test.service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAllHistories() {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [histories, setHistories] = useState<ResultWithPracticeTest[]>([]);

  const handleResultCardClick = (resultId: string, practiceTestId: string) => {
    router.push(`${pathname}/${practiceTestId}?rid=${resultId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllHistories();
      if (response) {
        setHistories(response.data);
      }
    };
    fetchData();
  }, [user]);
  return { user, histories, handleResultCardClick };
}
