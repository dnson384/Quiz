import { ICourseRepository } from "@/domain/repositories/course.repository";

export class DeleteTermsUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(
    courseId: string,
    accessToken: string,
    deletedTerms: string[],
  ): Promise<boolean> {
    return await this.courseRepository.deleteTerms(
      courseId,
      accessToken,
      deletedTerms,
    );
  }
}
