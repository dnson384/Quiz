export interface User {
  readonly id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  loginMethod?: string;
  isActived?: boolean;
}

export interface UserResponse {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
}

// Update
export interface UpdateUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  avatarUrl: string | null;
}
