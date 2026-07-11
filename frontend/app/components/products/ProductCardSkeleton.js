export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <div className="relative h-56 w-full animate-pulse bg-gray-200">

        <div className="absolute right-3 top-3 h-11 w-11 rounded-full bg-white shadow" />

      </div>

      <div className="space-y-4 p-5">

        <div className="flex items-center justify-between">

          <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />

          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />

        </div>

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex items-center justify-between">

          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />

          <div className="h-5 w-14 animate-pulse rounded bg-gray-200" />

        </div>

        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

        <div className="h-12 w-full animate-pulse rounded-xl bg-green-200" />

      </div>
    </div>
  );
}