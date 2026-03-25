import { UpdateUser } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/user.repository";

export class UpdateMeUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(accessToken: string, payload: UpdateUser): Promise<boolean> {
    return this.userRepository.updateMe(accessToken, payload);
  }
}
