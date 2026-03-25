import { UploadAvatarUsecase } from "@/application/usecases/user/uploadAvatar.usecase";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const repo = new UserRepositoryImpl();
    const usecase = new UploadAvatarUsecase(repo);
    const newAvatar = await usecase.execute(formData);
    return NextResponse.json(newAvatar, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        { detail: err.response?.data.detail },
        { status: err.status },
      );
    }
    return NextResponse.json(
      { detail: "An error occurred while fetching token" },
      { status: 500 },
    );
  }
}
