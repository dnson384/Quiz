import { CourseLearn } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class GetCourseLearnUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(id: string): Promise<CourseLearn | null> {
    const courseLearn = await this.courseRepository.getCourseLearn(id);
    return courseLearn;
  }
}
