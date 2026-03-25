import { UserCreationParams, UserLoginParams } from "../entities/Auth";
import { User, UserResponse } from "../entities/User";

export interface IAuthRepository {
  registerEmail: (payload: UserCreationParams) => Promise<User>;
  loginEmail: (payload: UserLoginParams) => Promise<UserResponse>;
  refreshAccessToken: (refreshToken: string) => Promise<string>;
  logout: (refreshToken: string) => Promise<boolean>;
}
