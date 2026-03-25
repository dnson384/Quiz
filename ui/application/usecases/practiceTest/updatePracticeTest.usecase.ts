import { UpdatePracticeTest } from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class UpdatePracticeTestUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(
    practiceTestId: string,
    accessToken: string,
    updatePracticeTest: UpdatePracticeTest,
  ): Promise<boolean> {
    return await this.practiceTestRepository.updatePracticeTest(
      practiceTestId,
      accessToken,
      updatePracticeTest,
    );
  }
}
