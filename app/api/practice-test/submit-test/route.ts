import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/practiceTest.repository";
import { SubmitTestUsecase } from "@/application/usecases/practiceTest/submitTest.usecase";
import { AnswerQuestionData } from "@/domain/entities/PracticeTest";

interface BodyData {
  practiceTestId: string;
  answerQuestions: AnswerQuestionData;
  questionsCount: number;
  score: number;
}

export async function POST(req: NextRequest) {
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
    const usecase = new SubmitTestUsecase(repo);
    const submitStatus = await usecase.execute(
      body.practiceTestId,
      accessToken,
      body.answerQuestions,
      body.questionsCount,
      body.score,
    );

    return NextResponse.json(submitStatus, { status: 201 });
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
