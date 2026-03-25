import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  PracticeTestQuestions,
  AnswerQuestionData,
  PracticeTestDetail,
  PracticeTest,
} from "@/domain/entities/PracticeTest";

import { generateSlug } from "@/presentation/utils/textFormatter.util";
import {
  getPracticeTestRandomDetail,
  submitPracticeTest,
} from "@/presentation/services/practice_test.service";

export default function useTakePracticeTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Data
  const [baseInfo, setBaseInfo] = useState<PracticeTest>();
  const [questions, setQuestions] = useState<PracticeTestQuestions[]>();

  const [timer, setTimer] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnswerQuestionData>({});

  const handleOptionSelected = (
    questionIndex: number,
    questionType: string,
    optionId: string,
  ) => {
    setAnsweredQuestions((prev) => {
      const newAnsweredOptions = { ...prev };
      if (newAnsweredOptions[questionIndex]) {
        let newOptions = [...newAnsweredOptions[questionIndex].optionId];

        let newIsCorrect = newAnsweredOptions[questionIndex].isCorrect;
        const curRawQuestion = questions?.find(
          (question) =>
            question.question.id ===
            newAnsweredOptions[questionIndex].questionId,
        );
        if (!curRawQuestion) return prev;
        const correctAnswersId = curRawQuestion.options
          .filter((option) => option.isCorrect === true)
          .map((option) => option.id);

        if (questionType === "MULTIPLE_CHOICE") {
          const curOptIndex = newAnsweredOptions[
            questionIndex
          ].optionId.findIndex((id) => id === optionId);

          // optionid
          if (curOptIndex < 0) {
            newOptions.push(optionId);
          } else {
            newOptions.splice(curOptIndex, 1);
          }

          // iscorrect
          if (correctAnswersId.length !== newOptions.length) {
            newIsCorrect = false;
          } else {
            newIsCorrect = !newOptions.some(
              (id) => !correctAnswersId.includes(id),
            );
          }
        } else {
          newOptions = [optionId];
          newIsCorrect = correctAnswersId.includes(optionId);
        }
        newAnsweredOptions[questionIndex] = {
          ...newAnsweredOptions[questionIndex],
          optionId: newOptions,
          isCorrect: newIsCorrect,
        };
      }
      return newAnsweredOptions;
    });
  };

  const handleSubmitTestClick = async () => {
    const practiceTestId = searchParams.get("uuid");
    const questionsCount = questions?.length;
    const score = Object.values(answeredQuestions).reduce(
      (total, opt) => (total += opt.isCorrect ? 1 : 0),
      0,
    );
    if (!practiceTestId || !questionsCount) return;

    const resultId = await submitPracticeTest(
      practiceTestId,
      answeredQuestions,
      questionsCount,
      score,
    );
    if (resultId) {
      router.replace(`/history/${practiceTestId}?rid=${resultId}`);
    }
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

  const handleClose = () => {
    const practiceTestId = searchParams.get("uuid");
    if (!baseInfo) return;
    const slug = generateSlug(baseInfo?.name);
    router.push(`/practice-test/${slug}?uuid=${practiceTestId}`);
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const practiceTestId = searchParams.get("uuid");
      const questionsCount = searchParams.get("num_of_ques");
      if (!practiceTestId) return;

      const data: PracticeTestDetail = await getPracticeTestRandomDetail(
        practiceTestId,
        questionsCount ? Number(questionsCount) : undefined,
      );

      if (data) {
        setBaseInfo(data.baseInfo);
        setQuestions(data.questions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAnsweredQuestions((prev) => {
      if (!questions) return prev;

      const newAnsweredOptions = { ...prev };
      questions.forEach((question, index) => {
        answeredQuestions[index] = {
          questionId: question.question.id,
          optionId: [],
          isCorrect: false,
        };
      });
      return newAnsweredOptions;
    });
  }, [questions]);

  // Timer
  useEffect(() => {
    const timer = searchParams.get("timer");
    if (timer) {
      setTimer(Number(timer) * 60);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      const submit = async () => {
        await handleSubmitTestClick();
      };
      submit();
    }
  }, [timer]);

  return {
    baseInfo,
    questions,
    timer,
    answeredQuestions,
    handleClose,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  };
}
