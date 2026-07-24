import api from "@/lib/axios";

//Create Product
export async function createProduct(formData) {
  const { data } = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

//Farmer Products
export async function getFarmerProducts() {
  const { data } = await api.get("/products/farmer");

  return data;
}

// Single Product
export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);

  return data;
}

// Update Product
export async function updateProduct(id, formData) {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

//  Delete Product
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);

  return data;
}

// Public Products
export async function getProducts(params = {}) {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
}

//Featured Products
export async function getFeaturedProducts() {
  const { data } = await api.get("/products", {
    params: {
      limit: 8,
      sort: "latest",
    },
  });
  return data;
}
export const updateProductStock = async (id, amount) => {
  const { data } = await api.patch(`/farmer/products/${id}/stock`, {
    amount,
  });
  return data;
};
