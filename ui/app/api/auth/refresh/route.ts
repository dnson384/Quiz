import { RefreshAccessTokenUsecase } from "@/application/usecases/auth/refreshAccessToken.usecase";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { detail: "Không có refresh token" },
      { status: 401 },
    );
  }

  try {
    const repo = new AuthRepositoryImpl();
    const usecase = new RefreshAccessTokenUsecase(repo);
    const newAccessToken = await usecase.execute(refreshToken);

    const nextResponse = NextResponse.json({
      detail: "Tạo lại access token thành công",
    });

    nextResponse.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 30 * 60,
    });

    return nextResponse;
  } catch (err) {
    if (isAxiosError(err) && err.status === 401) {
      const res = NextResponse.json(
        { detail: err.response?.data.detail },
        { status: 401 },
      );

      res.cookies.delete("access_token");
      res.cookies.delete("refresh_token");
      return res;
    }

    return NextResponse.json(
      { detail: "Lỗi server khi re-generate access token" },
      { status: 500 },
    );
  }
}
