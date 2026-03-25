"use client";
import { nanoid } from "nanoid";
import {
  PracticeTestDetail,
  // Update
  UpdateBaseInfo,
  UpdateQuestion,
  UpdateOption,
  PracticeTestQuestions,
} from "@/domain/entities/PracticeTest";
import { useAuthContext } from "@/presentation/context/auth.context";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  deletePracticeTestService,
  getPracticeTestDetail,
  getUserPracticeTest,
} from "@/presentation/services/practice_test.service";
import {
  updatePracticetestService,
  deleteOptionsService,
  deleteQuestionsService,
} from "@/presentation/services/practice_test.service";

interface DeleteOptionData {
  questionId: string;
  optionId: string;
}

export default function useMyPractice() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getNewOption = (): UpdateOption => ({
    id: null,
    tempId: nanoid(),
    text: "",
    isCorrect: false,
  });
  const getNewQuestion = (): UpdateQuestion => ({
    id: null,
    tempId: nanoid(),
    question: {
      text: "",
      type: "SINGLE_CHOICE",
    },
    options: Array.from({ length: 4 }, () => getNewOption()),
  });

  // Raw data
  const [practiceTestId, setPracticeTestId] = useState<string>();
  const [rawQuestions, setRawQuestions] = useState<PracticeTestQuestions[]>([]);

  // Show data
  const [baseInfo, setBaseInfo] = useState<UpdateBaseInfo>();
  const [questions, setQuestions] = useState<UpdateQuestion[]>([]);

  // Changed data
  const [changedName, setChangedName] = useState<UpdateBaseInfo>();
  const [changedQuestions, setChangedQuestions] = useState<UpdateQuestion[]>(
    [],
  );
  const [deleteOptions, setDeleteOptions] = useState<DeleteOptionData[]>([]);
  const [deleteQuestions, setDeleteQuestions] = useState<string[]>([]);

  // UI
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Card Behavior
  const handleDeleteCard = (
    questionIndex: number,
    questionId: string | null,
  ) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (
        questionId === null ||
        newQuestions[questionIndex].id === questionId
      ) {
        newQuestions.splice(questionIndex, 1);
      }
      return newQuestions;
    });

    setDeleteQuestions((prev) => {
      const newDeleteQuestions = [...prev];
      if (questionId && questions[questionIndex].id === questionId) {
        newDeleteQuestions.push(questionId);
      }
      return newDeleteQuestions;
    });
  };

  const handleAddCard = () => {
    setIsSubmitted(false);
    setQuestions((prev) => [...prev, getNewQuestion()]);
  };

  // Input Change
  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;
    setChangedName((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    questionIndex: number,
    questionType: string,
    optionIndex: number | null,
  ) => {
    setIsSubmitted(false);
    const target = event.target;
    const section = event.target.dataset.section;

    const { name, value } = target;
    setChangedQuestions((prev) => {
      const newChangedQuestion = [...prev];
      const currentQuestion = questions[questionIndex];
      if (!currentQuestion) return prev;

      let curChangeQuestionIndex = newChangedQuestion.findIndex(
        (changedQuestion) => {
          if (currentQuestion.id !== null) {
            return changedQuestion.id === currentQuestion.id;
          } else {
            return changedQuestion.tempId === currentQuestion.tempId;
          }
        },
      );

      if (curChangeQuestionIndex < 0) {
        const currentQuestion = questions[questionIndex];
        if (!currentQuestion.question) return prev;

        newChangedQuestion.push({
          id: currentQuestion.id,
          tempId: currentQuestion.tempId ? currentQuestion.tempId : undefined,
          question: {
            text: currentQuestion.question.text,
            type: currentQuestion.question.type,
          },
          options: currentQuestion.options.map((option) => ({
            id: option.id,
            tempId: option.tempId ? option.tempId : undefined,
            text: option.text,
            isCorrect: option.isCorrect,
          })),
        });
        curChangeQuestionIndex = newChangedQuestion.length - 1;
      }

      // Update questionBase
      if (section === "questionBase") {
        const curChangeQuestion =
          newChangedQuestion[curChangeQuestionIndex].question;
        if (!curChangeQuestion) return prev;

        if (name === "type") {
          const curType = curChangeQuestion.type;
          if (!curType) return prev;

          // MULTIPLE <-> SINGLE
          if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(curType) &&
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value)
          ) {
            questions[questionIndex].options.forEach(
              (option) => (option.isCorrect = false),
            );
            newChangedQuestion[curChangeQuestionIndex].options.forEach(
              (option) => (option.isCorrect = false),
            );
          }
          // SINGLE / MULTIPLE -> TRUE_FALSE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(curType) &&
            value === "TRUE_FALSE"
          ) {
            // Xoá option cũ
            setDeleteOptions((prev) => {
              const newDeleteOptions = [...prev];
              if (!currentQuestion.id) return prev;

              const currentRawQuestion = rawQuestions.find(
                (question) => question.question.id === currentQuestion.id,
              );

              currentRawQuestion?.options.forEach((option) => {
                newDeleteOptions.push({
                  questionId: currentRawQuestion.question.id,
                  optionId: option.id,
                });
              });
              return newDeleteOptions;
            });

            // Cập nhật option mới
            const newOptions = [
              { id: null, tempId: nanoid(), text: "Đúng", isCorrect: false },
              { id: null, tempId: nanoid(), text: "Sai", isCorrect: false },
            ];
            questions[questionIndex].options = newOptions.map((option) => ({
              id: option.id,
              tempId: option.tempId,
              text: option.text,
              isCorrect: option.isCorrect,
            }));
            newChangedQuestion[curChangeQuestionIndex].options = newOptions.map(
              (option) => ({
                id: option.id,
                tempId: option.tempId,
                text: option.text,
                isCorrect: option.isCorrect,
              }),
            );
          }
          // TRUE_FALSE -> SINGLE / MULTIPLE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value) &&
            curType === "TRUE_FALSE"
          ) {
            // Xoá option cũ
            setDeleteOptions((prev) => {
              const newDeleteOptions = [...prev];
              if (!currentQuestion.id) return prev;

              const currentRawQuestion = rawQuestions.find(
                (question) => question.question.id === currentQuestion.id,
              );

              currentRawQuestion?.options.forEach((option) => {
                newDeleteOptions.push({
                  questionId: currentRawQuestion.question.id,
                  optionId: option.id,
                });
              });
              return newDeleteOptions;
            });

            const newOptions = Array.from({ length: 4 }, () => getNewOption());
            questions[questionIndex].options = newOptions.map((option) => ({
              id: option.id,
              tempId: option.tempId,
              text: option.text,
              isCorrect: option.isCorrect,
            }));
            newChangedQuestion[curChangeQuestionIndex].options = newOptions.map(
              (option) => ({
                id: option.id,
                tempId: option.tempId,
                text: option.text,
                isCorrect: option.isCorrect,
              }),
            );
          }
        }

        newChangedQuestion[curChangeQuestionIndex].question = {
          ...curChangeQuestion,
          [name]: value,
        };
      }
      // Update options
      else if (section === "options" && optionIndex !== null) {
        const currentOption = currentQuestion.options[optionIndex];

        const nameOption = name.split("-")[0];
        const isChecked = (target as HTMLInputElement).checked;

        let currentOptionIndex = newChangedQuestion[
          curChangeQuestionIndex
        ].options.findIndex((option) => {
          if (option.id) {
            return option.id === currentOption.id;
          }
          return option.tempId === currentOption.tempId;
        });

        if (currentOptionIndex < 0) {
          newChangedQuestion[curChangeQuestionIndex].options.push({
            id: currentOption.id,
            tempId: currentOption.tempId ? currentOption.tempId : undefined,
            text: currentOption.text,
            isCorrect: false,
          });

          currentOptionIndex =
            newChangedQuestion[curChangeQuestionIndex].options.length - 1;
        }

        if (questionType === "MULTIPLE_CHOICE") {
          newChangedQuestion[curChangeQuestionIndex].options[
            currentOptionIndex
          ] = {
            ...newChangedQuestion[curChangeQuestionIndex].options[
              currentOptionIndex
            ],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        } else {
          if (nameOption === "isCorrect") {
            newChangedQuestion[curChangeQuestionIndex].options.forEach(
              (option) => {
                option.isCorrect = false;
              },
            );
          }

          newChangedQuestion[curChangeQuestionIndex].options[
            currentOptionIndex
          ] = {
            ...newChangedQuestion[curChangeQuestionIndex].options[
              currentOptionIndex
            ],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        }
      }
      return newChangedQuestion;
    });
  };

  const handleAddOption = (questionIndex: number) => {
    const newOption = getNewOption();
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (!newQuestions[questionIndex]) return prev;

      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [...newQuestions[questionIndex].options, newOption],
      };
      return newQuestions;
    });

    setChangedQuestions((prev) => {
      const newChangedQuestions = [...prev];
      if (!newChangedQuestions[questionIndex]) return prev;

      newChangedQuestions[questionIndex] = {
        ...newChangedQuestions[questionIndex],
        options: [...newChangedQuestions[questionIndex].options, newOption],
      };
      return newChangedQuestions;
    });
  };

  const handleDeleteOption = (
    questionId: string | null,
    optionId: string | null,
    questionTempId?: string,
    newQuestionIndex?: number,
    optionTempId?: string,
    newOptionIndex?: number,
  ) => {
    // Phương án mới
    if (
      questionTempId !== undefined &&
      optionTempId !== undefined &&
      newOptionIndex !== undefined &&
      newQuestionIndex !== undefined
    ) {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[newQuestionIndex] = {
          ...newQuestions[newQuestionIndex],
          options: newQuestions[newQuestionIndex].options.filter(
            (_, index) => index !== newOptionIndex,
          ),
        };
        return newQuestions;
      });
      setChangedQuestions((prev) => {
        const newQuestions = [...prev];
        const currentIndex = newQuestions.findIndex(
          (question) => question.tempId === questionTempId,
        );
        if (currentIndex < 0) return prev;
        const currentOptionIndex = newQuestions[currentIndex].options.findIndex(
          (option) => option.tempId === optionTempId,
        );

        newQuestions[currentIndex] = {
          ...newQuestions[currentIndex],
          options: newQuestions[currentIndex].options.filter(
            (_, index) => index !== currentOptionIndex,
          ),
        };
        return newQuestions;
      });
    }
    // Phương án cũ
    else {
      setQuestions((prev) => {
        const newQuestions = [...prev];

        const curIndex = newQuestions.findIndex(
          (question) => question.id === questionId,
        );
        if (curIndex < 0) return prev;

        const curOptionIndex = newQuestions[curIndex].options.findIndex(
          (option) => option.id === optionId,
        );
        if (curOptionIndex < 0) return prev;

        newQuestions[curIndex] = {
          ...newQuestions[curIndex],
          options: newQuestions[curIndex].options.filter(
            (_, index) => index !== curOptionIndex,
          ),
        };
        return newQuestions;
      });

      setChangedQuestions((prev) => {
        const newChangedQuestions = [...prev];
        const curIndex = newChangedQuestions.findIndex(
          (changedQuestion) => changedQuestion.id === questionId,
        );
        if (curIndex < 0) return prev;

        const curOptionIndex = newChangedQuestions[curIndex].options.findIndex(
          (changedOption) => changedOption.id === optionId,
        );
        if (curOptionIndex < 0) return prev;

        if (curIndex < 0 || curOptionIndex < 0) return prev;
        newChangedQuestions[curIndex] = {
          ...newChangedQuestions[curIndex],
          options: newChangedQuestions[curIndex].options.filter(
            (_, index) => index !== curOptionIndex,
          ),
        };
        return newChangedQuestions;
      });

      setDeleteOptions((prev) => {
        const newDeleteOptions = [...prev];
        if (questionId && optionId) {
          newDeleteOptions.push({
            questionId: questionId,
            optionId: optionId,
          });
        }
        return newDeleteOptions;
      });
    }
  };

  // Save
  const handleSaveChange = async (valid: boolean) => {
    setIsSubmitted(true);

    if (!valid || !practiceTestId) return;

    // Duyệt qua từng câu hỏi hiện tại để tìm sự thay đổi
    const questionsPayload: UpdateQuestion[] = changedQuestions.map(
      (changedQuestion) => {
        const rawQuestion = rawQuestions.find(
          (raw) => raw.question.id === changedQuestion.id,
        );

        // check question base
        // nếu không có rawQuestion -> câu hỏi mới
        const isQuestionBaseChange =
          rawQuestion && changedQuestion.question
            ? rawQuestion.question.text !== changedQuestion.question.text ||
              rawQuestion.question.type !== changedQuestion.question.type
            : true;

        // check question option
        const changedOptions = changedQuestion.options.filter(
          (changeOption) => {
            // Option mới
            if (!changeOption.id) {
              return true;
            }

            // TRƯỜNG HỢP B: Option cũ (có ID) -> So sánh với bản gốc
            const rawOption = rawQuestion?.options.find(
              (option) => option.id === changeOption.id,
            );

            if (!rawOption) return true;

            // So sánh giá trị text và isCorrect
            const isTextChanged = changeOption.text !== rawOption.text;
            const isCorrectChanged =
              changeOption.isCorrect !== rawOption.isCorrect;

            return isTextChanged || isCorrectChanged;
          },
        );

        // Trả về cấu trúc chứa các options đã thay đổi
        return {
          id: changedQuestion.id,
          question: isQuestionBaseChange ? changedQuestion.question : null,
          options: changedOptions,
        };
      },
    );

    const updateStatus = await updatePracticetestService(practiceTestId, {
      ...(changedName && {
        baseInfo: changedName,
      }),
      questions: questionsPayload,
    });

    const deleteOptionsStatus = await deleteOptionsService(
      practiceTestId,
      deleteOptions,
    );

    const deleteQuestionsStatus = await deleteQuestionsService(
      practiceTestId,
      deleteQuestions,
    );

    if (updateStatus && deleteOptionsStatus && deleteQuestionsStatus) {
      window.location.reload();
    }
  };

  // Delete
  const handleDeletePracticeTest = async () => {
    if (confirm("Xác nhận xoá học phần")) {
      if (!practiceTestId) return;
      if (await deletePracticeTestService(practiceTestId)) {
        router.replace("/my-lib");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseData = async () => {
      const practiceTestId = searchParams.get("practice-test-id");
      if (!practiceTestId) return;

      const userPracticeTest = await getUserPracticeTest();
      if (
        !userPracticeTest.some(
          (practiceTest) => practiceTest.id === practiceTestId,
        )
      ) {
        router.push("/dashboard");
        return;
      }

      const response: PracticeTestDetail =
        await getPracticeTestDetail(practiceTestId);
      if (response) {
        // set raw data
        setPracticeTestId(response.baseInfo.id);
        setRawQuestions(response.questions);

        // set show data
        setBaseInfo(response.baseInfo);
        setQuestions(
          response.questions.map((question) => ({
            id: question.question.id,
            question: {
              text: question.question.text,
              type: question.question.type,
            },
            options: question.options.map((option) => ({
              id: option.id,
              text: option.text,
              isCorrect: option.isCorrect,
            })),
          })),
        );

        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  return {
    // Data
    baseInfo,
    questions,
    changedName,
    changedQuestions,
    deleteOptions,
    deleteQuestions,
    // UI
    isLoading,
    isSubmitted,
    // Card Behavior
    handleDeleteCard,
    handleAddCard,
    // Input Change
    handleBaseInfoChange,
    handleQuestionChange,
    handleAddOption,
    handleDeleteOption,
    // Save
    handleSaveChange,
    handleDeletePracticeTest,
  };
}
