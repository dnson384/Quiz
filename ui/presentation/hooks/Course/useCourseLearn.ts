import { useEffect, useState } from "react";
import { getCourseLearnQuestions } from "@/presentation/services/course.service";
import { useSearchParams } from "next/navigation";
import useFlashcard from "./useCourseFlashcard";
import { Course, LearnQuestion, Term } from "@/domain/entities/Course";
import { shuffleArray } from "@/presentation/utils/arrayHelpers.util";

export default function useCourseLearn() {
  const searchParams = useSearchParams();

  const { handleClose } = useFlashcard();

  const [baseInfo, setBaseInfo] = useState<Course | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    LearnQuestion[] | null
  >(null);

  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [currentQuestionOptions, setCurrentQuestionOptions] = useState<Term[]>(
    [],
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState<LearnQuestion[]>([]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showRetryPrompt, setShowRetryPrompt] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const courseId = searchParams.get("uuid");
      if (!courseId) return;

      try {
        const data = await getCourseLearnQuestions(courseId);
        if (data) {
          setBaseInfo(data.baseInfo);
          setShuffledQuestions(shuffleArray(data.questions));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (!shuffledQuestions) return;
    const currentQuestion = shuffledQuestions[currentIndex];
    const options = [currentQuestion.question, ...currentQuestion.options];
    setSelectedOptionId(null);
    setCurrentQuestionOptions(shuffleArray(options));
  }, [shuffledQuestions, currentIndex]);

  const handleOptionSelected = (option_id: string, correct_id: string) => {
    setSelectedOptionId(option_id);
    if (baseInfo && shuffledQuestions) {
      if (currentIndex < shuffledQuestions.length - 1) {
        setTimeout(() => {
          setcurrentIndex(currentIndex + 1);
        }, 1000);
      } else {
        setIsDone(true);
      }

      if (option_id !== correct_id) {
        setIncorrectAnswers((prev) => [
          ...prev,
          shuffledQuestions[currentIndex],
        ]);
      }
    }
  };

  const handlePromptOption = (option: boolean) => {
    setShowRetryPrompt(false);
    setIsDone(false);
    if (option) {
      setShuffledQuestions(shuffleArray(incorrectAnswers));
      setcurrentIndex(0);
      setIncorrectAnswers([]);
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    if (!shuffledQuestions) return;

    if (isDone) {
      if (incorrectAnswers.length > 0) {
        setShowRetryPrompt(true);
      } else {
        setNotification(
          "Chúc mừng! Bạn đã hoàn thành bài học với kết quả tuyệt đối.",
        );
      }
    }
  }, [isDone]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
      handleClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  return {
    baseInfo,
    shuffledQuestions,
    currentIndex,
    currentQuestionOptions,
    selectedOptionId,
    showRetryPrompt,
    notification,
    handleClose,
    handlePromptOption,
    handleOptionSelected,
  };
}
