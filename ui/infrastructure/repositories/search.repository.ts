import axios from "axios";

import { Course } from "@/domain/entities/Course";
import { ISearchRepository } from "@/domain/repositories/search.repository";
import { Search } from "@/domain/entities/Search";
import { PracticeTest } from "@/domain/entities/PracticeTest";

interface RawCourse {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface RawPracticeTest {
  practice_test_id: string;
  practice_test_name: string;
  author_avatar_url: string;
  author_username: string;
}

interface RawSearchResponse {
  courses: RawCourse[];
  practice_tests: RawPracticeTest[];
}

export class SearchRepositoryImpl implements ISearchRepository {
  constructor(private readonly baseUrl: string = process.env.BACKEND_URL!) {}

  async searchByKeyword(
    keyword: string,
    type: string,
    cursorId?: string,
  ): Promise<Search | null> {
    try {
      const { data } = await axios.get<RawSearchResponse>(
        `${this.baseUrl}/search`,
        {
          params: {
            keyword: keyword,
            type: type,
            ...(cursorId && { cursor_id: cursorId }),
          },
        },
      );

      // Courses
      const coursesDomain: Course[] = [];
      data.courses.forEach((course) => {
        coursesDomain.push({
          id: course.course_id,
          name: course.course_name,
          authorAvatar: course.author_avatar_url,
          authorName: course.author_username,
          authorRole: course.author_role,
          termCount: course.num_of_terms,
        });
      });

      // Practice Test
      const practiceTestDomain: PracticeTest[] = [];
      data.practice_tests.forEach((practiceTest) => {
        practiceTestDomain.push({
          id: practiceTest.practice_test_id,
          name: practiceTest.practice_test_name,
          authorAvatar: practiceTest.author_avatar_url,
          authorName: practiceTest.author_username,
        });
      });

      return {
        courses: coursesDomain,
        practiceTests: practiceTestDomain,
      };
    } catch (err) {
      console.error("Lỗi khi gọi backend từ repo: ", err);
      return null;
    }
  }
}
