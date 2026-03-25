import { UpdateUser, User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/user.repository";
import axios from "axios";

interface RawUserResponse {
  user_id: string;
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  avatar_url: string;
  login_method: "EMAIL" | "GOOGLE";
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly baseUrl: string = process.env.BACKEND_URL!) {}

  async getMe(accessToken: string): Promise<User> {
    const { data } = await axios.get<RawUserResponse>(
      `${this.baseUrl}/user/me`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return {
      id: data.user_id,
      name: data.username,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatar_url,
      loginMethod: data.login_method,
    };
  }

  async uploadTempAvatar(formData: FormData): Promise<string> {
    const { data } = await axios.post<string>(
      `${this.baseUrl}/user/upload-avatar`,
      formData,
    );
    return data;
  }

  async updateMe(accessToken: string, payload: UpdateUser): Promise<boolean> {
    const { data } = await axios.put<boolean>(
      `${this.baseUrl}/user/update-me`,
      {
        user_id: payload.id,
        username: payload.name,
        email: payload.email,
        role: payload.role,
        avatar_url: payload.avatarUrl,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return data;
  }
}
