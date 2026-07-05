"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  FiUploadCloud,
  FiImage,
  FiTrash2,
} from "react-icons/fi";

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ImageUpload({
  images,
  setImages,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const remaining = MAX_FILES - images.length;

      if (remaining <= 0) return;

      const files = acceptedFiles.slice(0, remaining);

      setImages((prev) => [...prev, ...files]);
    },
    [images, setImages]
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

  function removeImage(index) {
    setImages((prev) =>
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

          Upload up to 5 images (PNG, JPG, WEBP)

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
          duration-300

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

        <p className="body-font mt-2 text-gray-500">

          or click to browse

        </p>

      </div>

      {fileRejections.length > 0 && (

        <div className="rounded-xl bg-red-50 p-4 text-red-600">

          Some files were rejected.

          <ul className="mt-2 list-disc pl-5">

            {fileRejections.map((rejection, index) => (

              <li key={index}>

                {rejection.file.name}

              </li>

            ))}

          </ul>

        </div>

      )}

      {previews.length > 0 && (

        <div>

          <div className="mb-4 flex items-center gap-2">

            <FiImage />

            <span className="font-medium">

              Selected Images

            </span>

          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

            {previews.map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
              >

                <Image
                  src={item.preview}
                  alt="Preview"
                  width={250}
                  height={250}
                  unoptimized
                  className="
                    h-40
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-red-500
                    p-2
                    text-white
                    shadow-lg
                    transition
                    hover:bg-red-600
                  "
                >
                  <FiTrash2 size={18} />
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}