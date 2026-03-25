import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { CourseRepositoryImpl } from "@/infrastructure/repositories/course.repository";
import { GetCourseTestUsecase } from "@/application/usecases/course/getCourseTest.usecase";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const courseId = params.get("course_id");
    if (!courseId) return;

    const repo = new CourseRepositoryImpl();
    const usecase = new GetCourseTestUsecase(repo);
    const courseTest = await usecase.execute(courseId);

    return NextResponse.json(courseTest, { status: 200 });
  } catch (err: unknown) {
    console.error("Lỗi API:", err);

    if (isAxiosError(err) && err.response)
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status },
      );

    return NextResponse.json(
      { detail: "Lỗi máy chủ nội bộ (Internal Server Error)" },
      { status: 500 },
    );
  }
}
