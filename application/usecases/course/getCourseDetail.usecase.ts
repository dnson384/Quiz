import { CourseDetail } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

export class GetCourseDetailUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(id: string): Promise<CourseDetail | null> {
    const courseDetail = await this.courseRepository.getCourseDetail(id);
    return courseDetail;
  }
}
