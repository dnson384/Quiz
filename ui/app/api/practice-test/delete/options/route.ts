import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { DeleteOptionsUsecase } from "@/application/usecases/practiceTest/deleteOptions.usecase";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";
import { DeleteOptionData } from "@/domain/entities/PracticeTest";

interface BodyData {
  practiceTestId: string;
  deletedOptions: DeleteOptionData[];
}

export async function DELETE(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Không có access token" },
        { status: 401 },
      );
    }

    const body: BodyData = await req.json();

    const repo = new PracticeTestRepositoryImpl();
    const usecase = new DeleteOptionsUsecase(repo);
    const deleteStatus = await usecase.execute(
      body.practiceTestId,
      accessToken,
      body.deletedOptions,
    );

    return NextResponse.json(deleteStatus, { status: 200 });
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
