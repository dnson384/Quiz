"use client";
import { PracticeTest } from "@/domain/entities/PracticeTest";
import { History, Result } from "@/domain/entities/Result";
import { useAuthContext } from "@/presentation/context/auth.context";
import { getResultHistory } from "@/presentation/services/practice_test.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useHistory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuthContext();

  const [result, setResult] = useState<Result>();
  const [baseInfo, setBaseInfo] = useState<PracticeTest>();
  const [histories, setHistories] = useState<History[]>([]);

  const handleClose = () => {
    router.push("/history");
  };

  const handleSidebarClick = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resultId = searchParams.get("rid");
      if (!resultId) return;

      const practiceTestId =
        pathname.split("/")[pathname.split("/").length - 1];

      const data = await getResultHistory(resultId, practiceTestId);
      if (data) {
        setResult(data.result);
        setBaseInfo(data.baseInfo);
        setHistories(data.histories);
      }
    };
    fetchData();
  }, [user]);
  return { result, baseInfo, histories, handleClose, handleSidebarClick };
}
