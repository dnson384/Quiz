import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class DeleteQuestionsUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(
    practiceTestId: string,
    accessToken: string,
    deleteQuestions: string[],
  ): Promise<boolean> {
    return await this.practiceTestRepository.deleteQuestions(
      practiceTestId,
      accessToken,
      deleteQuestions,
    );
  }
}
