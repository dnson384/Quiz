import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { CourseRepositoryImpl } from "@/infrastructure/repositories/course.repository";
import { UpdateCourseUsecase } from "@/application/usecases/course/updateCourse.usecase";
import { UpdateCourse } from "@/domain/entities/Course";

interface BodyData {
  id: string;
  updateCourse: UpdateCourse;
}

export async function PUT(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Không có access token" },
        { status: 401 },
      );
    }

    const body: BodyData = await req.json();

    const repo = new CourseRepositoryImpl();
    const usecase = new UpdateCourseUsecase(repo);
    const updateStatus = await usecase.execute(
      body.id,
      accessToken,
      body.updateCourse,
    );

    return NextResponse.json(updateStatus, { status: 200 });
  } catch (err) {
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
