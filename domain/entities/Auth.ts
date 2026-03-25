export interface UserCreationParams {
  email: string;
  username: string;
  plainPassword: string;
  role: "STUDENT" | "TEACHER";
}

export interface UserLoginParams {
  email: string;
  plainPassword: string;
}
