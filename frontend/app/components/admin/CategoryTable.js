"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCategory } from "@/services/categoryService";



export default function CategoryTable({
  
  categories,
}) {const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteCategory,

  onSuccess: () => {
    toast.success("Category deleted");

    queryClient.invalidateQueries({
      queryKey: ["admin-categories"],
    });

    queryClient.invalidateQueries({
      queryKey: ["categories"],
    });
  },

  onError: () => {
    toast.error("Failed to delete category");
  },
});
  return (
    <div className="overflow-hidden text-gray-800 rounded-2xl bg-white shadow">
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-100">
  <tr>
    <th className="p-4 text-left">
      Image
    </th>

    <th className="p-4 text-left">
      Name
    </th>

    <th className="p-4 text-left">
      Description
    </th>

    <th className="p-4 text-left">
      Status
    </th>

    <th className="p-4 text-left">
      Actions
    </th>
  </tr>
</thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">

                      {category.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${category.image}`}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm">
                          No image
                        </div>
                      )}

                    </div>
                  </td>

                  <td className="p-4 font-semibold capitalize">
                    {category.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {category.description}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
  <button
    onClick={() => {
      const confirmed = window.confirm(
        `Delete "${category.name}"?`
      );

      if (confirmed) {
        deleteMutation.mutate(
          category._id
        );
      }
    }}
    disabled={deleteMutation.isPending}
    className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:opacity-50"
  >
    Delete
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}