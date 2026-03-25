import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";
import { GetAllHistoriesUsecase } from "@/application/usecases/practiceTest/getAllHistories.usecase";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Không có access token" },
        { status: 401 },
      );
    }

    const repo = new PracticeTestRepositoryImpl();
    const useCase = new GetAllHistoriesUsecase(repo);

    const histories = await useCase.execute(accessToken);

    return NextResponse.json(histories, { status: 200 });
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
