import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 md:flex-row">

        <div className="flex-1">
          <h1 className="heading-font mb-6 text-5xl font-extrabold leading-tight text-gray-900">
            Fresh From Farm
            <span className="block text-green-600">
              Directly To Your Home 🌱
            </span>
          </h1>

          <p className="body-font mb-8 text-lg text-gray-600">
            Buy fresh vegetables, fruits, grains and dairy products directly
            from trusted local farmers without middlemen.
          </p>

          <div className="flex gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-700"
            >
              Shop Now
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl border border-green-600 px-7 py-4 font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
            >
              Become a Farmer
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-1 justify-center md:mt-0">
          <Image
  src="/images/hero.png"
  alt="Fresh vegetables"
  width={600}
  height={500}
  className="rounded-3xl shadow-xl"
/>
        </div>
      </div>
    </section>
  );
}