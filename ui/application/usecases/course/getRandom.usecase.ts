import { Course } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class GetRandomCoursesUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(): Promise<Course[]> {
    return await this.courseRepository.getRandomCourses();
  }
}
