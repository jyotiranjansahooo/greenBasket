"use client";

export default function Select({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="body-font text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full rounded-xl border border-gray-300
          bg-white px-4 py-3
          text-black placeholder-black/30
          outline-none
          transition-all duration-200
          focus:border-[#79AE6F]
          focus:ring-4 focus:ring-[#9FCB98]/30
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      >
        {children}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}