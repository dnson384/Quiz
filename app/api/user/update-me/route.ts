import { UpdateMeUsecase } from "@/application/usecases/user/updateMe.usecase";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

export async function PUT(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Missing access token" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const repo = new UserRepositoryImpl();
    const usecase = new UpdateMeUsecase(repo);
    const updatedUser = await usecase.execute(accessToken, body);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        { detail: err.response?.data.detail },
        { status: err.status },
      );
    }
    return NextResponse.json(
      { detail: "An error occurred while update" },
      { status: 500 },
    );
  }
}
