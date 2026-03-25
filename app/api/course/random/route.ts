import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { GetRandomCoursesUsecase } from "@/application/usecases/course/getRandom.usecase";
import { CourseRepositoryImpl } from "@/infrastructure/repositories/course.repository";

export async function GET() {
  try {
    const repo = new CourseRepositoryImpl();
    const usecase = new GetRandomCoursesUsecase(repo);

    const courses = await usecase.execute();

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
