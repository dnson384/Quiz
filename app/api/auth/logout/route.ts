import { LogoutUsecase } from "@/application/usecases/auth/logoutUser.usecase";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) throw new Error("Không tìm thấy token");

    const repo = new AuthRepositoryImpl();
    const usecase = new LogoutUsecase(repo);

    const logoutSuccess = await usecase.execute(refreshToken);

    const nextResponse = NextResponse.json(logoutSuccess, { status: 200 });

    nextResponse.cookies.delete("access_token");
    nextResponse.cookies.delete("refresh_token");

    return nextResponse;
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const statusCode = axiosErr.response?.status || 500;
    const errorMessage =
      axiosErr.response?.data?.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error("Lỗi khi gọi API đăng xuất:", errorMessage);

    return NextResponse.json({ detail: errorMessage }, { status: statusCode });
  }
}
