import {
  DeleteOptionData,
  NewPracticeTest,
  PracticeTest,
  PracticeTestDetail,
  UpdatePracticeTest,
  AnswerQuestionData,
} from "../entities/PracticeTest";
import {
  ResultWithHistories,
  ResultWithPracticeTest,
} from "../entities/Result";

export interface IPracticeTestRepository {
  getRandomPracticeTests: () => Promise<PracticeTest[]>;
  getPracticeTestDetail: (id: string) => Promise<PracticeTestDetail | null>;
  getPracticeTestRandomDetail(
    id: string,
    count?: number,
  ): Promise<PracticeTestDetail | null>;
  getAllHistories(accessToken: string): Promise<ResultWithPracticeTest[]>;
  getResultHistory(
    accessToken: string,
    resultId: string,
    practiceTestId: string,
  ): Promise<ResultWithHistories>;
  getUserPracticeTests(accessToken: string): Promise<PracticeTest[]>;
  createNewPracticeTest(
    accessToken: string,
    newPracticeTest: NewPracticeTest,
  ): Promise<boolean>;
  submitTest(
    practiceTestId: string,
    accessToken: string,
    answerQuestions: AnswerQuestionData,
    questionsCount: number,
    score: number,
  ): Promise<string>;
  updatePracticeTest(
    practiceTestId: string,
    accessToken: string,
    updatePracticeTest: UpdatePracticeTest,
  ): Promise<boolean>;
  deleteOptions(
    practiceTestId: string,
    accessToken: string,
    deleteOptions: DeleteOptionData[],
  ): Promise<boolean>;
  deleteQuestions(
    practiceTestId: string,
    accessToken: string,
    deleteQuestions: string[],
  ): Promise<boolean>;
  deletePracticeTest(
    practiceTestId: string,
    accessToken: string,
  ): Promise<boolean>;
}
