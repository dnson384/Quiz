import { RegisterRequest } from "@/application/dtos/auth/registerRequest.dto";
import { RegisterUserEmailUsecase } from "@/application/usecases/auth/registerUserEmail.usecase";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload: RegisterRequest = await req.json();

    const repo = new AuthRepositoryImpl();
    const usecase = new RegisterUserEmailUsecase(repo);

    const newUser = await usecase.execute(payload);

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: unknown) {
    console.error("Lỗi API:", err);

    if (isAxiosError(err) && err.response)
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status },
      );

    if (err instanceof Error) {
      return NextResponse.json({ detail: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
