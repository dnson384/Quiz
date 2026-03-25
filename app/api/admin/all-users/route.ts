import { GetAllUsersUsecase } from "@/application/usecases/admin/getAllUsers.usecase";
import { AdminRepositoryImpl } from "@/infrastructure/repositories/admin.repository";
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

    const repo = new AdminRepositoryImpl();
    const usecase = new GetAllUsersUsecase(repo);
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
