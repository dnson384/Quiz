import { NewPracticeTest } from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class CreateNewPracticeTestUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(
    accessToken: string,
    newPracticeTest: NewPracticeTest,
  ): Promise<boolean> {
    return await this.practiceTestRepository.createNewPracticeTest(
      accessToken,
      newPracticeTest,
    );
  }
}
