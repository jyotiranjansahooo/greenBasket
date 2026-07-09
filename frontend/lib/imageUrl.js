export function getImageUrl(path) {
  if (!path) {
    return "/images/product-placeholder.png";
  }

  // Already a full URL
  if (path.startsWith("http")) {
    return path;
  }

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Old DB records: "tomato.jpg"
if (!path.startsWith("/")) {
  path = `/api/uploads/products/${path}`;
}

  return `${baseUrl}${path}`;
}