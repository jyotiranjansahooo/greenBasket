import api from "@/lib/axios";

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}