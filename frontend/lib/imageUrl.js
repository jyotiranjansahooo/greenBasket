export function getImageUrl(path) {
  if (!path) {
    return "/images/product-placeholder.png";
  }

  if (path.startsWith("http")) {
    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Remove duplicate "/api"
  if (path.startsWith("/api/")) {
    path = path.replace("/api", "");
  }

  if (!path.startsWith("/")) {
    path = `/uploads/products/${path}`;
  }

  return `${baseUrl}${path}`;
}