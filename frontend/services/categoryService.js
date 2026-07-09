import api from "@/lib/axios";

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export async function createCategory(formData) {
  const { data } = await api.post(
    "/categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function updateCategory(id, formData) {
  const { data } = await api.put(
    `/categories/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function deleteCategory(id) {
  const { data } = await api.delete(
    `/categories/${id}`
  );

  return data;
}