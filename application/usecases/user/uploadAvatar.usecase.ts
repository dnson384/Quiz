import { IUserRepository } from "@/domain/repositories/user.repository";

export class UploadAvatarUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(formData: FormData): Promise<string> {
    return this.userRepository.uploadTempAvatar(formData);
  }
}
