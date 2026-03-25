import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";
import { GetResultHistoryUsecase } from "@/application/usecases/practiceTest/getResultHistory.usecase";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const practiceTestId = pathname.split("/")[pathname.split("/").length - 1];
    const resultId = req.nextUrl.searchParams.get("rid");
    if (!resultId) {
      return NextResponse.json({ detail: "Không có rid" }, { status: 404 });
    }

    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Không có access token" },
        { status: 401 },
      );
    }

    const repo = new PracticeTestRepositoryImpl();
    const useCase = new GetResultHistoryUsecase(repo);

    const histories = await useCase.execute(
      accessToken,
      resultId,
      practiceTestId,
    );

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
