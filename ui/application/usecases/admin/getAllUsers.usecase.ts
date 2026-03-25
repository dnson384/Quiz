import { User } from "@/domain/entities/User";
import { IAdminRepository } from "@/domain/repositories/admin.repository";

export class GetAllUsersUsecase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(accessToken: string): Promise<User[]> {
    return this.adminRepository.getAllUsers(accessToken);
  }
}
