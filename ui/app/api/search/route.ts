import { SearchByKeywordUsecase } from "@/application/usecases/search/searchByKeyword.usecase";
import { SearchRepositoryImpl } from "@/infrastructure/repositories/search.repository";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const keyword = params.get("keyword");
    const type = params.get("type");
    const cursorId = params.get("cursor_id") || undefined;

    if (!keyword || !type) return;

    const repo = new SearchRepositoryImpl();
    const usecase = new SearchByKeywordUsecase(repo);

    const searchResult = await usecase.execute(keyword, type, cursorId);

    return NextResponse.json(searchResult, { status: 200 });
  } catch (err: unknown) {
    console.error("Lỗi API:", err);

    if (isAxiosError(err) && err.response)
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status }
      );

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 }
    );
  }
}
