import { UpdateUser, User } from "@/domain/entities/User";
import { IAdminRepository } from "@/domain/repositories/admin.repository";
import axios from "axios";

interface RawUserResponse {
  user_id: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
  login_method: string;
  is_actived: boolean;
}

export class AdminRepositoryImpl implements IAdminRepository {
  constructor(private readonly baseUrl: string = process.env.BACKEND_URL!) {}

  async getAllUsers(accessToken: string): Promise<User[]> {
    const { data } = await axios.get<RawUserResponse[]>(
      `${this.baseUrl}/admin/all-users`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return data.map((raw) => ({
      id: raw.user_id,
      name: raw.username,
      email: raw.email,
      role: raw.role,
      avatarUrl: raw.avatar_url,
      loginMethod: raw.login_method,
      isActived: raw.is_actived,
    }));
  }

  async grantAdmin(accessToken: string, id: string): Promise<boolean> {
    const { data } = await axios.put(
      `${this.baseUrl}/admin/grant-admin`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { user_id: id },
      },
    );
    return data;
  }

  async lockUser(accessToken: string, id: string): Promise<boolean> {
    const { data } = await axios.put(
      `${this.baseUrl}/admin/lock-user`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { user_id: id },
      },
    );
    return data;
  }

  async unLockUser(accessToken: string, id: string): Promise<boolean> {
    const { data } = await axios.put(
      `${this.baseUrl}/admin/unlock-user`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { user_id: id },
      },
    );
    return data;
  }
}
