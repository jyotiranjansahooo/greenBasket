"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  FiUploadCloud,
  FiImage,
  FiTrash2,
} from "react-icons/fi";

import { getImageUrl } from "@/lib/imageUrl";

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUpload({
  images,
  setImages,

  existingImages = [],
  setExistingImages = () => {},
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const total =
        images.length + existingImages.length;

      const remaining = MAX_FILES - total;

      if (remaining <= 0) return;

      const files = acceptedFiles.slice(0, remaining);

      setImages((prev) => [...prev, ...files]);
    },
    [
      images,
      existingImages,
      setImages,
    ]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,

    accept: {
      "image/*": [],
    },
  });

  const previews = useMemo(() => {
    return images.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  }, [images]);

  function removeNewImage(index) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function removeExistingImage(index) {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="body-font font-semibold text-gray-700">
          Product Images
        </label>

        <p className="mt-1 text-sm text-gray-500">
          Upload up to 5 images
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-10
          text-center
          transition-all

          ${
            isDragActive
              ? "border-[#346739] bg-[#9FCB98]/20"
              : "border-gray-300 hover:border-[#79AE6F]"
          }
        `}
      >
        <input {...getInputProps()} />

        <FiUploadCloud
          size={55}
          className="mx-auto text-[#346739]"
        />

        <h3 className="heading-font mt-5 text-2xl">
          Drag & Drop Images
        </h3>

        <p className="mt-2 text-gray-500">
          or click to browse
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          Some files were rejected.
        </div>
      )}

      {(existingImages.length > 0 ||
        previews.length > 0) && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <FiImage />

            <span className="font-medium">
              Images
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

            {existingImages.map((image, index) => (
              <div
                key={`old-${index}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={getImageUrl(image)}
                  alt="Product"
                  width={250}
                  height={250}
                  unoptimized
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeExistingImage(index)
                  }
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-red-500
                    p-2
                    text-white
                  "
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            {previews.map((item, index) => (
              <div
                key={`new-${index}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.preview}
                  alt="Preview"
                  width={250}
                  height={250}
                  unoptimized
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeNewImage(index)
                  }
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-red-500
                    p-2
                    text-white
                  "
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}