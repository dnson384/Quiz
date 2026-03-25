import { GetMeUsecase } from "@/application/usecases/user/getMe.usecase";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Missing access token" },
        { status: 401 },
      );
    }

    const repo = new UserRepositoryImpl();
    const usecase = new GetMeUsecase(repo);
    const currentUser = await usecase.execute(accessToken);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { detail: "An error occurred while fetching token" },
      { status: 500 },
    );
  }
}
