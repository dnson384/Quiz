export interface RegisterRequest {
  email: string;
  username: string;
  plainPassword: string;
  confirmPassword: string
  role: "STUDENT" | "TEACHER";
}
