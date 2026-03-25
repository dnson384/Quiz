import {
  PracticeTest,
  PracticeTestQuestions,
  QuestionOption,
} from "@/domain/entities/PracticeTest";
import { create } from "zustand";

interface QuestionSelectedData {
  [key: number]: QuestionOption;
}

interface TestResultData {
  score: number;
  baseInfo: PracticeTest | null;
  shuffleQuestions: PracticeTestQuestions[];
  selectedOptions: QuestionSelectedData;
}

interface testResultState {
  practiceTestResult: TestResultData;
  setPracticeTestResult: (
    score: number,
    baseInfo: PracticeTest,
    shuffleQuestions: PracticeTestQuestions[],
    selectedOptions: QuestionSelectedData,
  ) => void;
}

export const usePracticeTestResult = create<testResultState>((set) => ({
  practiceTestResult: {
    score: 0,
    baseInfo: null,
    shuffleQuestions: [],
    selectedOptions: {},
  },
  setPracticeTestResult: (
    score: number,
    baseInfo: PracticeTest,
    shuffleQuestions: PracticeTestQuestions[],
    selectedOptions: QuestionSelectedData,
  ) =>
    set(() => ({
      practiceTestResult: {
        score,
        baseInfo,
        shuffleQuestions,
        selectedOptions,
      },
    })),
}));
