import {
  Course,
  CourseDetail,
  CourseLearn,
  CourseTest,
  NewCourse,
  UpdateCourse,
} from "../entities/Course";
export interface ICourseRepository {
  getRandomCourses: () => Promise<Course[]>;
  getCourseDetail: (id: string) => Promise<CourseDetail | null>;
  getCourseLearn: (id: string) => Promise<CourseLearn | null>;
  getCourseTest: (id: string) => Promise<CourseTest | null>;
  getUserCourses: (accessToken: string) => Promise<Course[]>;
  createNewCourse: (
    accessToken: string,
    payload: NewCourse,
  ) => Promise<boolean>;
  updateCourse: (
    courseId: string,
    accessToken: string,
    updateCourse: UpdateCourse,
  ) => Promise<boolean>;
  deleteTerms: (
    courseId: string,
    accessToken: string,
    deleteTerms: string[],
  ) => Promise<boolean>;
  deleteCourse(courseId: string, accessToken: string): Promise<boolean>;
}
