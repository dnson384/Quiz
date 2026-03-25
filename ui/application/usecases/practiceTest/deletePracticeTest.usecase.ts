import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class DeletePracticeTestUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(practiceTestId: string, accessToken: string): Promise<boolean> {
    return await this.practiceTestRepository.deletePracticeTest(
      practiceTestId,
      accessToken,
    );
  }
}
