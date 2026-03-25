import { Course } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class GetUserCoursesUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(accessToken: string): Promise<Course[]> {
    return await this.courseRepository.getUserCourses(accessToken);
  }
}
