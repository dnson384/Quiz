import { NewCourse } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class CreateNewCourseUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(accessToken: string, newCourse: NewCourse): Promise<boolean> {
    return await this.courseRepository.createNewCourse(accessToken, newCourse);
  }
}
