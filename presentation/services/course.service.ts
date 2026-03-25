import {
  Course,
  CourseLearn,
  CourseTest,
  NewCourse,
  UpdateCourse,
} from "@/domain/entities/Course";
import axios from "axios";

const base_url = "/api/course";

export async function getUserCoures(): Promise<Course[]> {
  const response = await axios.get(`${base_url}/user`);
  return response.data;
}

export async function getRandomCourse() {
  const response = await axios.get(`${base_url}/random`);
  return response.data;
}

export async function getCourseDetail(courseId: string) {
  const response = await axios.get(`${base_url}/detail`, {
    params: {
      course_id: courseId,
    },
  });
  return response.data;
}

export async function getCourseLearnQuestions(
  courseId: string,
): Promise<CourseLearn | null> {
  const response = await axios.get(`${base_url}/learn`, {
    params: {
      course_id: courseId,
    },
  });
  return response.data;
}

export async function getCourseTestQuestions(
  courseId: string,
): Promise<CourseTest | null> {
  const response = await axios.get(`${base_url}/test`, {
    params: {
      course_id: courseId,
    },
  });
  return response.data;
}

export async function createNewCoures(newCourse: NewCourse) {
  return await axios.post(`${base_url}/create`, newCourse);
}

export async function updateCourse(
  courseId: string,
  updateCourse: UpdateCourse,
  deletedTerms: string[],
) {
  const updateStatus = await axios.put(`${base_url}/update`, {
    id: courseId,
    updateCourse: updateCourse,
  });
  const deleteStatus = await axios.delete(`${base_url}/delete/details`, {
    data: { id: courseId, deletedTerms: deletedTerms },
  });
  return updateStatus && deleteStatus;
}

export async function deleteCourse(courseId: string) {
  const resposne = await axios.delete(`${base_url}/delete`, {
    data: { id: courseId },
  });
  return resposne.data;
}
