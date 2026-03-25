import axios, { isAxiosError } from "axios";

import {
  Course,
  CourseDetail,
  CourseLearn,
  CourseTest,
  LearnQuestion,
  NewCourse,
  Term,
  UpdateCourse,
} from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/course.repository";

interface RawCourseResponse {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface RawTerm {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface RawCourseDetailReponse {
  course: RawCourseResponse;
  course_detail: RawTerm[];
}

interface RawQuestion {
  question: RawTerm;
  options: RawTerm[];
}

interface RawCourseLearnResponse {
  course: RawCourseResponse;
  questions: RawQuestion[];
}

interface RawCourseTestResponse {
  course: RawCourseResponse;
  questions: RawQuestion[];
}

export class CourseRepositoryImpl implements ICourseRepository {
  constructor(private readonly baseUrl: string = process.env.BACKEND_URL!) {}

  async getUserCourses(accessToken: string): Promise<Course[]> {
    try {
      const { data } = await axios.get<RawCourseResponse[]>(
        `${this.baseUrl}/course/my-course`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data.map((raw) => ({
        id: raw.course_id,
        name: raw.course_name,
        authorAvatar: raw.author_avatar_url,
        authorName: raw.author_username,
        authorRole: raw.author_role,
        termCount: raw.num_of_terms,
      }));
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response?.data.detail);
        return [];
      }
      console.error("Lỗi khi gọi backend từ repo: ", err);
      return [];
    }
  }

  async getRandomCourses(): Promise<Course[]> {
    try {
      const { data } = await axios.get<RawCourseResponse[]>(
        `${this.baseUrl}/course/random`,
      );

      return data.map((raw) => ({
        id: raw.course_id,
        name: raw.course_name,
        authorAvatar: raw.author_avatar_url,
        authorName: raw.author_username,
        authorRole: raw.author_role,
        termCount: raw.num_of_terms,
      }));
    } catch (err) {
      console.error("Lỗi khi gọi backend từ repo: ", err);
      return [];
    }
  }

  async getCourseDetail(id: string): Promise<CourseDetail> {
    try {
      const { data } = await axios.get<RawCourseDetailReponse>(
        `${this.baseUrl}/course`,
        {
          params: { course_id: id },
        },
      );

      const rawBaseInfo = data.course;
      const rawTerms = data.course_detail;

      const baseInfoDomain: Course = {
        id: rawBaseInfo.course_id,
        name: rawBaseInfo.course_name,
        authorAvatar: rawBaseInfo.author_avatar_url,
        authorName: rawBaseInfo.author_username,
        authorRole: rawBaseInfo.author_role,
        termCount: rawBaseInfo.num_of_terms,
      };

      const termsDomain = rawTerms.map((raw) => ({
        id: raw.course_detail_id,
        term: raw.term,
        definition: raw.definition,
      }));

      return {
        baseInfo: baseInfoDomain,
        terms: termsDomain,
      };
    } catch (err) {
      throw err;
    }
  }

  async getCourseLearn(id: string): Promise<CourseLearn | null> {
    try {
      const { data } = await axios.get<RawCourseLearnResponse>(
        `${this.baseUrl}/course/learn`,
        { params: { course_id: id } },
      );

      const rawBaseInfo = data.course;
      const rawQuestions = data.questions;

      const baseInfoDomain = {
        id: rawBaseInfo.course_id,
        name: rawBaseInfo.course_name,
        authorAvatar: rawBaseInfo.author_avatar_url,
        authorName: rawBaseInfo.author_username,
        authorRole: rawBaseInfo.author_role,
        termCount: rawBaseInfo.num_of_terms,
      };

      const questionsDomain: LearnQuestion[] = [];
      rawQuestions.forEach((raw) => {
        const questionDomain: Term = {
          id: raw.question.course_detail_id,
          term: raw.question.term,
          definition: raw.question.definition,
        };

        const optionsDomain: Term[] = [];
        raw.options.forEach((option) => {
          optionsDomain.push({
            id: option.course_detail_id,
            term: option.term,
            definition: option.definition,
          });
        });

        questionsDomain.push({
          question: questionDomain,
          options: optionsDomain,
        });
      });

      return { baseInfo: baseInfoDomain, questions: questionsDomain };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCourseTest(id: string): Promise<CourseTest | null> {
    try {
      const { data } = await axios.get<RawCourseTestResponse>(
        `${this.baseUrl}/course/test`,
        {
          params: { course_id: id },
        },
      );

      const baseInfoDomain = {
        id: data.course.course_id,
        name: data.course.course_name,
        authorAvatar: data.course.author_avatar_url,
        authorName: data.course.author_username,
        authorRole: data.course.author_role,
        termCount: data.course.num_of_terms,
      };

      const questionsDomain: LearnQuestion[] = [];
      data.questions.forEach((raw) => {
        const questionDomain: Term = {
          id: raw.question.course_detail_id,
          term: raw.question.term,
          definition: raw.question.definition,
        };

        const optionsDomain: Term[] = [];
        raw.options.forEach((option) => {
          optionsDomain.push({
            id: option.course_detail_id,
            term: option.term,
            definition: option.definition,
          });
        });

        questionsDomain.push({
          question: questionDomain,
          options: optionsDomain,
        });
      });

      return {
        baseInfo: baseInfoDomain,
        questions: questionsDomain,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async createNewCourse(
    accessToken: string,
    payload: NewCourse,
  ): Promise<boolean> {
    const course_in = {
      course_name: payload.baseInfo.name,
    };
    const detail_in = payload.terms.map((term) => ({
      term: term.term,
      definition: term.definition,
    }));

    const { data } = await axios.post(
      `${this.baseUrl}/course`,
      {
        course_in: course_in,
        detail_in: detail_in,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async updateCourse(
    courseId: string,
    accessToken: string,
    updateCourse: UpdateCourse,
  ): Promise<boolean> {
    const course = updateCourse.course
      ? { course_name: updateCourse.course.name }
      : undefined;
    const details = updateCourse.details?.map((detail) => ({
      course_detail_id: detail.id,
      term: detail.term,
      definition: detail.definition,
    }));
    const payload = {
      ...(course && { course: course }),
      details: details,
    };
    const { data } = await axios.put(
      `${this.baseUrl}/course/${courseId}`,
      payload,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return data;
  }

  async deleteTerms(
    courseId: string,
    accessToken: string,
    deletedTerms: string[],
  ): Promise<boolean> {
    const { data } = await axios.delete(
      `${this.baseUrl}/course/${courseId}/detail`,
      {
        data: { course_detail_id: deletedTerms },
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return data;
  }

  async deleteCourse(courseId: string, accessToken: string): Promise<boolean> {
    const { data } = await axios.delete(`${this.baseUrl}/course/${courseId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }
}
