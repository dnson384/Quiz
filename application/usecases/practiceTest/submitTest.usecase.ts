import { AnswerQuestionData } from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class SubmitTestUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(
    practiceTestId: string,
    accessToken: string,
    answerQuestions: AnswerQuestionData,
    questionsCount: number,
    score: number,
  ): Promise<string> {
    return await this.practiceTestRepository.submitTest(
      practiceTestId,
      accessToken,
      answerQuestions,
      questionsCount,
      score,
    );
  }
}
