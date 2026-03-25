import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { GetUserPracticeTestsUsecase } from "@/application/usecases/practiceTest/getUserPracticeTest.usecase";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { detail: "Không có access token" },
      { status: 401 },
    );
  }

  try {
    const repo = new PracticeTestRepositoryImpl();
    const usecase = new GetUserPracticeTestsUsecase(repo);

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
