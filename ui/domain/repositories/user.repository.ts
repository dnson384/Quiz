import { UpdateUser, User } from "../entities/User";

export interface IUserRepository {
  getMe: (accessToken: string) => Promise<User>;
  uploadTempAvatar: (formData: FormData) => Promise<string>;
  updateMe: (accessToken: string, payload: UpdateUser) => Promise<boolean>;
}
