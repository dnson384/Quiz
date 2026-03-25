import { UserCreationParams, UserLoginParams } from "@/domain/entities/Auth";
import { User, UserResponse } from "@/domain/entities/User";
import { IAuthRepository } from "@/domain/repositories/auth.repository";
import axios from "axios";

interface RawUser {
  user_id: string;
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  avatar_url: string;
  login_method: "EMAIL" | "GOOGLE";
}

interface RawUserResponse {
  user: RawUser;
  access_token: string | null;
  refresh_token: string | null;
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly baseUrl: string = process.env.BACKEND_URL!) {}

  async registerEmail(payload: UserCreationParams): Promise<User> {
    const { data } = await axios.post<RawUser>(
      `${this.baseUrl}/auth/register`,
      {
        username: payload.username,
        email: payload.email,
        plain_password: payload.plainPassword,
        role: payload.role,
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

  async loginEmail(payload: UserLoginParams): Promise<UserResponse> {
    const { data } = await axios.post<RawUserResponse>(
      `${this.baseUrl}/auth/login`,
      {
        email: payload.email,
        plain_password: payload.plainPassword,
      },
    );

    return {
      user: {
        id: data.user.user_id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
        avatarUrl: data.user.avatar_url,
        loginMethod: data.user.login_method,
      },
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  async logout(refreshToken: string): Promise<boolean> {
    const { data } = await axios.post(
      `${this.baseUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );
    return data;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const { data } = await axios.post<string>(
      `${this.baseUrl}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );
    return data;
  }
}
