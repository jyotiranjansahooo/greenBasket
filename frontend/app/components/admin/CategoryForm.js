"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRef } from "react";
import Image from "next/image";
import { createCategory } from "@/services/categoryService";

export default function CategoryForm() {
  const queryClient = useQueryClient();

const inputRef = useRef(null);
const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const mutation = useMutation({
    mutationFn: createCategory,

   onSuccess: () => {
  toast.success("Category created successfully");

  setFormData({
    name: "",
    description: "",
  });

  setImage(null);
  setPreview(null);

  queryClient.invalidateQueries({
    queryKey: ["admin-categories"],
  });

  queryClient.invalidateQueries({
    queryKey: ["categories"],
  });
},

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create category"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append(
      "description",
      formData.description
    );

    if (image) {
      payload.append("image", image);
    }

    mutation.mutate(payload);
  };

  return (
    <div className="rounded-2xl text-gray-700 bg-white p-8 shadow">
      <h2 className="mb-6 text-3xl font-bold">
        Create Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Category Name
          </label>

          <input
            type="text"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={formData.description}
                        placeholder="Enter category description"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>

          <div>
  <label className="mb-2 block font-medium">
    Category Image
  </label>

  <div
    onClick={() => inputRef.current?.click()}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();

      const file = e.dataTransfer.files[0];

      if (!file) return;

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }}
    className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 transition border-green-800 "
  >
    {preview ? (
      <div className="relative h-full w-full">
        <Image
          src={preview}
          alt="Preview"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    ) : (
      <>
        <p className="text-lg font-medium text-gray-700">
          Drag & drop an image here
        </p>

        <p className="mt-2 text-sm text-gray-500">
          or click to select a file
        </p>
      </>
    )}
  </div>

  <input
    ref={inputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }}
  />
</div>
        </div>

        <div className="flex justify-center">
  <button
    type="submit"
    disabled={mutation.isPending}
    className="rounded-lg bg-green-600 px-8 py-3 text-white transition hover:bg-green-700 disabled:opacity-50"
  >
    {mutation.isPending
      ? "Creating..."
      : "Create Category"}
  </button>
</div>
      </form>
    </div>
  );
}