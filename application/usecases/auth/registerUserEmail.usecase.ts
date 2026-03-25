import { RegisterRequest } from "@/application/dtos/auth/registerRequest.dto";
import { User } from "@/domain/entities/User";
import { IAuthRepository } from "@/domain/repositories/auth.repository";

export class RegisterUserEmailUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(payload: RegisterRequest): Promise<User> {
    if (payload.confirmPassword !== payload.plainPassword) {
      throw new Error("Mật khẩu xác nhận không trùng khớp");
    }
    return await this.authRepository.registerEmail({
      email: payload.email,
      username: payload.username,
      plainPassword: payload.plainPassword,
      role: payload.role,
    });
  }
}
