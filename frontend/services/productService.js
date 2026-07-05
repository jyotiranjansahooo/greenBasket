import api from "@/lib/axios";

export async function createProduct(formData) {
  const { data } = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function getFarmerProducts() {
  const { data } = await api.get("/products/farmer");
  return data;
}