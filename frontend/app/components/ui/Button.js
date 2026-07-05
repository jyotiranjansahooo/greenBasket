"use client";

export default function Button({
  children,
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className={`
        rounded-xl
        bg-[#346739]
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-[#2d5a31]
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}