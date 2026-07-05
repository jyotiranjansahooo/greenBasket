"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/services/productService";

import { productSchema } from "@/lib/productSchema";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

import useCategories from "@/hooks/useCategories";

export default function ProductForm() {
  const { categories, loading: categoriesLoading } = useCategories();
const router = useRouter();

const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

 async function onSubmit(data) {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    await createProduct(formData);

    toast.success("Product added successfully 🌱");

    router.push("/farmer/products");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to create product"
    );
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-xl"
    >
      <h1 className="heading-font text-4xl text-[#346739]">
        Add Product
      </h1>

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

          {categoriesLoading ? (
            <option>Loading...</option>
          ) : (
            categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))
          )}
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
          placeholder="20"
          error={errors.quantity?.message}
          {...register("quantity")}
        />

        <Select
          label="Unit"
          error={errors.unit?.message}
          {...register("unit")}
        >
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
/>

      <Button
        type="submit"
        loading={isSubmitting}
      >
        Save Product
      </Button>
    </form>
  );
}