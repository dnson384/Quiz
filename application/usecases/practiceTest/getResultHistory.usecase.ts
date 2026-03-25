import { ResultWithHistories } from "@/domain/entities/Result";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";

export class GetResultHistoryUsecase {
  constructor(
    private readonly practiceTestRepository: PracticeTestRepositoryImpl,
  ) {}

  async execute(
    accessToken: string,
    resultId: string,
    practiceTestId: string,
  ): Promise<ResultWithHistories> {
    return await this.practiceTestRepository.getResultHistory(
      accessToken,
      resultId,
      practiceTestId,
    );
  }
}
