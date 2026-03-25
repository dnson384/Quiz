import { UpdateCourse } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class UpdateCourseUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(
    courseId: string,
    accessToken: string,
    updateCourse: UpdateCourse,
  ): Promise<boolean> {
    return await this.courseRepository.updateCourse(
      courseId,
      accessToken,
      updateCourse,
    );
  }
}
