import axios from "axios";

const base_url = "/api/search";

export async function search(
  keyword: string,
  type: string,
  cursor_id: string | null = null
) {
  const response = await axios.get(`${base_url}`, {
    params: {
      keyword: keyword,
      type: type,
      cursor_id: cursor_id,
    },
  });
  return response.data;
}
