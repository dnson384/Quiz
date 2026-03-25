import { GrantAdminUsecase } from "@/application/usecases/admin/grantAdmin.usecase";
import { AdminRepositoryImpl } from "@/infrastructure/repositories/admin.repository";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");
    if (!userId) {
      return NextResponse.json({ detail: "Missing id" }, { status: 404 });
    }

    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Missing access token" },
        { status: 401 },
      );
    }

    const repo = new AdminRepositoryImpl();
    const usecase = new GrantAdminUsecase(repo);
    const grantStatus = await usecase.execute(accessToken, userId);

    return NextResponse.json(grantStatus, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
