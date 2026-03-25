import { IAuthRepository } from "@/domain/repositories/auth.repository";

export class LogoutUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(refreshToken: string): Promise<boolean> {
    return await this.authRepository.logout(refreshToken);
  }
}
