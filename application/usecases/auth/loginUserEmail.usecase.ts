import { LoginRequest } from "@/application/dtos/auth/loginRequest.dto";
import { UserResponse } from "@/domain/entities/User";
import { IAuthRepository } from "@/domain/repositories/auth.repository";

export class LoginUserEmailUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(payload: LoginRequest): Promise<UserResponse> {
    return await this.authRepository.loginEmail({
      email: payload.email,
      plainPassword: payload.plainPassword,
    });
  }
}
