"use client";

import {  useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { productSchema } from "@/lib/productSchema";
import useCategories from "@/app/hooks/useCategories";

import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";

import ImageUpload from "./ImageUpload";
import { createProduct, updateProduct } from "@/services/productService";

export default function ProductForm({ product = null }) {
  const router = useRouter();

  const [images, setImages] = useState([]);
const [existingImages, setExistingImages] = useState(
  product?.images || []
);
  const { categories, loading: categoryLoading } = useCategories();

 const {
  register,
  handleSubmit,
  formState: {
    errors,
    isSubmitting,
  },
  reset,
} = useForm({
  resolver: zodResolver(productSchema),

  defaultValues: {
    name: product?.name || "",
    category:
      product?.category?._id ||
      product?.category ||
      "",
    description:
      product?.description || "",
    price: product?.price ?? "",
    quantity:
      product?.quantity ?? "",
    unit: product?.unit || "",
    farmingMethod:
      product?.farmingMethod || "",
    harvestDate:
      product?.harvestDate?.slice(0, 10) ||
      "",
    origin: product?.origin || "",
  },
});


  async function onSubmit(values) {
  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    // Keep existing images
    existingImages.forEach((image) => {
      formData.append(
        "existingImages",
        image
      );
    });

    if (product) {
      await updateProduct(
        product._id,
        formData
      );

      toast.success(
        "Product updated successfully 🌱"
      );
    } else {
      await createProduct(formData);

      toast.success(
        "Product added successfully 🌱"
      );
    }

    if (!product) {
  reset();
  setImages([]);
  setExistingImages([]);
}

router.push("/farmer/products");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Unable to save product."
    );
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        rounded-3xl
        bg-white
        p-10
        shadow-xl
        space-y-8
      "
    >
      <div>
        <h1 className="heading-font text-4xl text-[#346739]">{product ? "Edit Product" : "Add Product"}</h1>

        <p className="body-font mt-2 text-gray-500">
{product
  ? "Update your product information."
  : "Fill in the product details below."}        </p>
      </div>

      <Input
        label="Product Name"
        placeholder="Fresh Tomato"
        error={errors.name?.message}
        {...register("name")}
      />

      <Textarea
        label="Description"
        placeholder="Write product description..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Category"
          error={errors.category?.message}
          {...register("category")}
        >
          <option value="">Select Category</option>

          {!categoryLoading &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </Select>

        <Input
          type="number"
          label="Price"
          placeholder="50"
          error={errors.price?.message}
          {...register("price")}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          type="number"
          label="Quantity"
          placeholder="25"
          error={errors.quantity?.message}
          {...register("quantity")}
        />

        <Select label="Unit" error={errors.unit?.message} {...register("unit")}>
          <option value="">Select Unit</option>

          <option value="kg">Kg</option>

          <option value="g">Gram</option>

          <option value="piece">Piece</option>

          <option value="dozen">Dozen</option>

          <option value="liter">Liter</option>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Farming Method"
          error={errors.farmingMethod?.message}
          {...register("farmingMethod")}
        >
          <option value="">Select Method</option>

          <option value="organic">Organic</option>

          <option value="conventional">Conventional</option>
        </Select>

        <Input
          type="date"
          label="Harvest Date"
          error={errors.harvestDate?.message}
          {...register("harvestDate")}
        />
      </div>

      <Input
        label="Origin"
        placeholder="Bhubaneswar"
        error={errors.origin?.message}
        {...register("origin")}
      />

<ImageUpload
  images={images}
  setImages={setImages}
  existingImages={existingImages}
  setExistingImages={
    setExistingImages
  }
/>
      <div className="pt-2">
        <Button loading={isSubmitting} type="submit" className="w-full">
{product
  ? "Update Product"
  : "Save Product"}        </Button>
      </div>
    </form>
  );
}
