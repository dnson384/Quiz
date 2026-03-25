import { IAdminRepository } from "@/domain/repositories/admin.repository";

export class GrantAdminUsecase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(accessToken: string, id: string): Promise<boolean> {
    return this.adminRepository.grantAdmin(accessToken, id);
  }
}
