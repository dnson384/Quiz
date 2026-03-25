import { PracticeTest } from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/practiceTest.repository";

export class GetRandomPracticeTestsUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository,
  ) {}

  async execute(): Promise<PracticeTest[]> {
    const practiceTests =
      await this.practiceTestRepository.getRandomPracticeTests();
    return practiceTests;
  }
}
