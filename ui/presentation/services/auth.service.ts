import axios from "axios";

const baseUrl = "/api/auth";

export async function login(fieldData: Record<string, string>) {
  try {
    const response = await axios.post(`${baseUrl}/login`, fieldData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function register(fieldData: Record<string, string>) {
  const payload = {
    email: fieldData.email,
    username: fieldData.username,
    plainPassword: fieldData.plainPassword,
    confirmPassword: fieldData.confirmPassword,
    role: fieldData.role,
  };
  try {
    const response = await axios.post(`${baseUrl}/register`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${baseUrl}/logout`);
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
