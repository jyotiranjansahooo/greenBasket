"use client";

import Image from "next/image";

export default function CategoryTable({
  categories,
}) {
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
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
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
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}