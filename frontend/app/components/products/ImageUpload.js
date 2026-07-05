"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function ImageUpload({
  images,
  setImages,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages((prev) => [...prev, ...acceptedFiles]);
    },
    [setImages]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 5,
      onDrop,
    });

  function removeImage(index) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-4">

      <label className="body-font font-medium">
        Product Images
      </label>

      <div
        {...getRootProps()}
        className={`
          cursor-pointer rounded-2xl border-2 border-dashed
          p-10 text-center transition
          ${
            isDragActive
              ? "border-[#346739] bg-[#9FCB98]/20"
              : "border-gray-300"
          }
        `}
      >
        <input {...getInputProps()} />

        <FiUploadCloud className="mx-auto text-5xl text-[#346739]" />

        <p className="mt-4">
          Drag images here or click to upload
        </p>

        <p className="text-sm text-gray-500">
          Maximum 5 images
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt=""
                width={150}
                height={150}
                className="h-36 w-full object-cover"
                unoptimized
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
              >
                <FiX />
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}