import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { GetPracticeTestDetailUsecase } from "@/application/usecases/practiceTest/getDetail.usecase";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const practiceTestId = params.get("practice_test_id");
    if (!practiceTestId) return;

    const repo = new PracticeTestRepositoryImpl();
    const usecase = new GetPracticeTestDetailUsecase(repo);
    const practiceTestDetail = await usecase.execute(practiceTestId);

    return NextResponse.json(practiceTestDetail, { status: 200 });
  } catch (err: unknown) {
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
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
