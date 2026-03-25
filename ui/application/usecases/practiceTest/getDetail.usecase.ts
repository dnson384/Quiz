import { PracticeTestDetail } from "@/domain/entities/PracticeTest";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";

export class GetPracticeTestDetailUsecase {
  constructor(
    private readonly practiceTestRepository: PracticeTestRepositoryImpl,
  ) {}

  async execute(id: string): Promise<PracticeTestDetail | null> {
    return await this.practiceTestRepository.getPracticeTestDetail(id);
  }
}
