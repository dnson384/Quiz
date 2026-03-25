import { Course, TestQuestion, Term } from "@/domain/entities/Course";
import { create } from "zustand";

interface OptionSelectedData {
  optionId: string;
  correctId: string;
}

interface QuestionSelectedData {
  [key: number]: OptionSelectedData;
}

interface TestResultData {
  score: number;
  baseInfo: Course | null;
  questions: TestQuestion[];
  shuffleQuestionsOptions: Term[][];
  selectedOptions: QuestionSelectedData;
}

interface testResultState {
  testResult: TestResultData;
  setTestResult: (
    score: number,
    baseInfo: Course,
    questions: TestQuestion[],
    shuffleQuestionsOptions: Term[][],
    selectedOptions: QuestionSelectedData,
  ) => void;
}

export const useTestResult = create<testResultState>((set) => ({
  testResult: {
    score: 0,
    baseInfo: null,
    questions: [],
    shuffleQuestionsOptions: [],
    selectedOptions: {},
  },
  setTestResult: (
    score: number,
    baseInfo: Course,
    questions: TestQuestion[],
    shuffleQuestionsOptions: Term[][],
    selectedOptions: QuestionSelectedData,
  ) =>
    set(() => ({
      testResult: {
        score,
        baseInfo,
        questions,
        shuffleQuestionsOptions,
        selectedOptions,
      },
    })),
}));
