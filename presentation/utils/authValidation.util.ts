export const validateLogin = (data: Record<string, string>): string | null => {
  if (!data.email) return "Vui lòng nhập email";
  if (!data.plainPassword) return "Vui lòng nhập mật khẩu";
  if (data.plainPassword.length < 8 || data.plainPassword.length > 64)
    return "Độ dài mật khẩu không hợp lệ (8-64 ký tự)";
  return null;
};

export const validateRegister = (
  data: Record<string, string>
): string | null => {
  if (!data.email) return "Vui lòng nhập email";
  if (!data.username) return "Vui lòng nhập tên người dùng";
  if (!data.plainPassword) return "Vui lòng nhập mật khẩu";
  if (!data.confirmPassword) return "Vui lòng nhập mật khẩu xác nhận";

  if (data.plainPassword.length < 8 || data.plainPassword.length > 64)
    return "Độ dài mật khẩu không hợp lệ (8-64 ký tự)";

  if (data.plainPassword !== data.confirmPassword)
    return "Mật khẩu xác nhận không khớp";

  if (!data.role) return "Vui lòng chọn vai trò người dùng";
  return null;
};
