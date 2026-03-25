import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { GetUserCoursesUsecase } from "@/application/usecases/course/getUserCourse.usecase";
import { CourseRepositoryImpl } from "@/infrastructure/repositories/course.repository";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { detail: "Không có access token" },
      { status: 401 },
    );
  }

  try {
    const repo = new CourseRepositoryImpl();
    const usecase = new GetUserCoursesUsecase(repo);

    const courses = await usecase.execute(accessToken);

    return NextResponse.json(courses, { status: 200 });
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
