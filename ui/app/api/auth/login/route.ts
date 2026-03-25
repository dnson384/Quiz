import { LoginRequest } from "@/application/dtos/auth/loginRequest.dto";
import { LoginUserEmailUsecase } from "@/application/usecases/auth/loginUserEmail.usecase";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload: LoginRequest = await req.json();

    const repo = new AuthRepositoryImpl();
    const usecase = new LoginUserEmailUsecase(repo);

    const data = await usecase.execute({
      email: payload.email,
      plainPassword: payload.plainPassword,
    });

    const { accessToken, refreshToken, user } = data;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { detail: "Không nhận được token từ máy chủ backend" },
        { status: 500 },
      );
    }

    const nextResponse = NextResponse.json({ user: user });

    nextResponse.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 30 * 60,
    });

    nextResponse.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
    });

    return nextResponse;
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const statusCode = axiosErr.response?.status || 500;
    const errorMessage =
      axiosErr.response?.data?.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error("Lỗi khi gọi API đăng nhập:", errorMessage);

    return NextResponse.json({ detail: errorMessage }, { status: statusCode });
  }
}
