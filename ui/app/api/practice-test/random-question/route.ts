import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";
import { GetPracticeTestRandomDetailUsecase } from "@/application/usecases/practiceTest/getRandomDetail.usecase";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const practiceTestId = params.get("practice_test_id");
    const count = Number(params.get("count")) || undefined;
    if (!practiceTestId) return;

    const repo = new PracticeTestRepositoryImpl();
    const usecase = new GetPracticeTestRandomDetailUsecase(repo);
    const practiceTestDetail = await usecase.execute(practiceTestId, count);

    return NextResponse.json(practiceTestDetail, { status: 200 });
  } catch (err: unknown) {
    console.error("Lỗi API:", err);

    if (isAxiosError(err) && err.response)
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status },
      );

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
