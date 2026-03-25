import React, { useEffect, useState } from "react";

import { getPracticeTestDetail } from "@/presentation/services/practice_test.service";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PracticeTest,
  PracticeTestDetail,
  PracticeTestQuestions,
} from "@/domain/entities/PracticeTest";
import { isAxiosError } from "axios";

export default function usePracticeTestDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [baseInfo, setBaseInfo] = useState<PracticeTest | null>(null);
  const [questions, setQuestions] = useState<PracticeTestQuestions[]>([]);

  const [formData, setFormData] = useState({
    num_of_ques: "",
    timer: "30",
  });
  const [error, setError] = useState<string | null>(null);
  const [errStatus, setErrStatus] = useState<number | null>(null);

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.num_of_ques || !formData.timer) return;
    // Check num ques
    if (Number(formData.num_of_ques) < 2) {
      setError("Số lượng câu hỏi phải từ 2 câu hỏi");
      return;
    } else if (Number(formData.num_of_ques) > questions.length) {
      setError(`Số lượng câu hỏi vượt mức cho phép (${questions.length})`);
      return;
    }

    // Check timer
    if (Number(formData.timer) <= 0) {
      setError("Thời gian phải từ 1 phút");
      return;
    } else if (Number(formData.timer) > 500) {
      setError("Thời gian phải ít hơn 500 phút");
      return;
    }

    const practiceTestId = searchParams.get("uuid");
    router.push(
      `/practice-test/test?uuid=${practiceTestId}&num_of_ques=${formData.num_of_ques}&timer=${formData.timer}`,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const practiceTestId = searchParams.get("uuid");
      if (!practiceTestId) return;

      try {
        const data: PracticeTestDetail =
          await getPracticeTestDetail(practiceTestId);

        if (data) {
          setBaseInfo(data.baseInfo);
          setQuestions(data.questions);
          setFormData({
            num_of_ques:
              data.questions.length >= 20
                ? "20"
                : data.questions.length.toString(),
            timer: "30",
          });
        }
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data.detail);
          if (err.status) setErrStatus(err.status);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const status = errStatus;
      const timer = setTimeout(() => {
        setError(null);
        setErrStatus(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
        if (status !== null) {
          router.replace("/dashboard");
        }
      };
    }
  }, [error]);

  return {
    error,
    baseInfo,
    questions,
    handleFormSubmit,
    handleFormInputChange,
  };
}
