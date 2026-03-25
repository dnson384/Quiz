import { UpdateUser } from "@/domain/entities/User";
import axios from "axios";

const base_url = "/api/user";

export async function uploadTempAvatar(formData: FormData): Promise<string> {
  const response = await axios.post(`${base_url}/upload-temp-avatar`, formData);
  return response.data;
}

export async function updateMe(payload: UpdateUser) {
  return await axios.put(`${base_url}/update-me`, payload);
}