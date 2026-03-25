import { PracticeTestDetail } from "@/domain/entities/PracticeTest";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";

export class GetPracticeTestRandomDetailUsecase {
  constructor(
    private readonly practiceTestRepository: PracticeTestRepositoryImpl,
  ) {}

  async execute(
    id: string,
    count?: number,
  ): Promise<PracticeTestDetail | null> {
    return await this.practiceTestRepository.getPracticeTestRandomDetail(
      id,
      count,
    );
  }
}
