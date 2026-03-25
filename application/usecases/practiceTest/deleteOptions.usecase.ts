import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

interface DeleteOptionData {
  questionId: string;
  optionId: string;
}

export class DeleteOptionsUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(
    practiceTestId: string,
    accessToken: string,
    deleteOptions: DeleteOptionData[],
  ): Promise<boolean> {
    return await this.practiceTestRepository.deleteOptions(
      practiceTestId,
      accessToken,
      deleteOptions,
    );
  }
}
