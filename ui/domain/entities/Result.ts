import { PracticeTest, PracticeTestQuestions } from "./PracticeTest";

export interface Result {
  readonly id: string;
  questionsCount: number;
  score: number;
}

export interface History {
  id: string;
  optionId: string[];
  detail: PracticeTestQuestions;
}

export interface ResultWithPracticeTest {
  result: Result;
  baseInfo: PracticeTest;
}

export interface ResultWithHistories {
  result: Result;
  baseInfo: PracticeTest;
  histories: History[];
}
