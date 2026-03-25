import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTestResult } from "../../store/courseTest.store";

import useFlashcard from "./useCourseFlashcard";
import { getCourseTestQuestions } from "@/presentation/services/course.service";

import { Course, Term, TestQuestion } from "@/domain/entities/Course";
import { shuffleArray } from "@/presentation/utils/arrayHelpers.util";

interface OptionSelectedData {
  optionId: string;
  correctId: string;
}

interface QuestionSelectedData {
  [key: number]: OptionSelectedData;
}

export default function useCourseTest() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleClose } = useFlashcard();
  const setTestResutl = useTestResult((state) => state.setTestResult);

  const [baseInfo, setBaseInfo] = useState<Course | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [shuffledQuestionsOptions, setShuffledQuestionsOptions] = useState<
    Term[][]
  >([]);
  const [selectedOption, setSelectedOption] = useState<QuestionSelectedData>(
    {},
  );

  useEffect(() => {
    const fetchQuestion = async () => {
      const courseId = searchParams.get("uuid");
      if (!courseId) return;

      try {
        const data = await getCourseTestQuestions(courseId);
        if (data) {
          setBaseInfo(data.baseInfo);
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    const shuffledQuestions = questions?.map((ques) =>
      shuffleArray([ques.question, ...ques.options]),
    );
    if (shuffledQuestions) {
      setShuffledQuestionsOptions(shuffledQuestions);
    }
  }, [questions]);

  const handleOptionSelected = (
    questionIndex: number,
    option_id: string,
    correct_id: string,
  ) => {
    if (
      selectedOption[questionIndex] &&
      selectedOption[questionIndex].optionId === option_id
    ) {
      const newSelectedOption = { ...selectedOption };
      delete newSelectedOption[questionIndex];
      setSelectedOption(newSelectedOption);
    } else {
      setSelectedOption((prev) => ({
        ...prev,
        [questionIndex]: {
          optionId: option_id,
          correctId: correct_id,
        },
      }));
    }
  };

  const handleSubmitTestClick = () => {
    if (!baseInfo || !questions || !shuffledQuestionsOptions) return;
    const courseId = searchParams.get("uuid");

    let score = 0;
    Object.values(selectedOption).forEach((value) => {
      value.optionId === value.correctId && score++;
    });
    setTestResutl(
      score,
      baseInfo,
      questions,
      shuffledQuestionsOptions,
      selectedOption,
    );
    router.push(`/course/test/result?uuid=${courseId}`);
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

  return {
    baseInfo,
    questions,
    selectedOption,
    shuffledQuestionsOptions,
    handleClose,
    handleOptionSelected,
    handleSubmitTestClick,
    handleSidebarClick,
  };
}
