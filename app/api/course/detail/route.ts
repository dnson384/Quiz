import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { GetCourseDetailUsecase } from "@/application/usecases/course/getCourseDetail.usecase";
import { CourseRepositoryImpl } from "@/infrastructure/repositories/course.repository";
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const courseId = params.get("course_id");

    if (!courseId) return;

    const repo = new CourseRepositoryImpl();
    const usecase = new GetCourseDetailUsecase(repo);

    const courseDetail = await usecase.execute(courseId);

    return NextResponse.json(courseDetail, { status: 200 });
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.status === 422) {
        return NextResponse.json(
          { detail: "course_id không hợp lệ" },
          { status: err.response.status },
        );
      }
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status },
      );
    }

    return NextResponse.json(
      { detail: "Lỗi máy chủ nội bộ (Internal Server Error)" },
      { status: 500 },
    );
  }
}
