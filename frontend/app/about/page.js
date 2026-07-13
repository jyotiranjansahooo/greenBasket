"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    {
      number: "500+",
      label: "Fresh Products",
      emoji: "🥬",
    },
    {
      number: "100+",
      label: "Local Farmers",
      emoji: "👨‍🌾",
    },
    {
      number: "10K+",
      label: "Happy Customers",
      emoji: "😊",
    },
    {
      number: "24/7",
      label: "Support",
      emoji: "💬",
    },
  ];

  const values = [
    {
      title: "Fresh & Organic",
      icon: "🌱",
      description:
        "We connect customers with farmers to deliver fresh and healthy products directly from farms.",
    },
    {
      title: "Support Farmers",
      icon: "👨‍🌾",
      description:
        "Green Basket empowers local farmers by helping them sell products online.",
    },
    {
      title: "Fast Delivery",
      icon: "🚚",
      description:
        "Our delivery network ensures your groceries arrive quickly and safely.",
    },
    {
      title: "Trusted Quality",
      icon: "⭐",
      description:
        "Every product is carefully selected to maintain the highest quality.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7FAF5] text-gray-800">

      {/* Hero */}

      <section className="bg-gradient-to-r from-[#346739] to-[#4f9657] px-6 py-24 text-white">

        <div className="mx-auto max-w-6xl text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-font text-6xl font-bold"
          >
            About Green Basket 🌱
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-xl text-green-100"
          >
            Green Basket bridges the gap between local farmers and customers,
            making fresh, organic, and healthy food accessible to everyone.
          </motion.p>

        </div>

      </section>

      {/* Story */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold text-[#346739]">
                Our Story
              </h2>

              <p className="text-lg leading-9 text-gray-600">
                Green Basket was created with one simple goal: to make farm-fresh
                products available directly to customers while supporting local
                farmers. We believe that technology can strengthen communities,
                reduce food waste, and create a healthier future.
              </p>

              <p className="mt-6 text-lg leading-9 text-gray-600">
                By connecting farmers and consumers through a modern marketplace,
                Green Basket ensures transparency, fair pricing, and sustainable
                agriculture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-10 shadow-xl"
            >
              <h3 className="mb-6 text-3xl font-bold text-[#346739]">
                Our Mission 🎯
              </h3>

              <ul className="space-y-5 text-lg text-gray-600">
                <li>✅ Support local farmers.</li>
                <li>✅ Deliver fresh products.</li>
                <li>✅ Promote sustainable farming.</li>
                <li>✅ Build healthier communities.</li>
              </ul>

            </motion.div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl">
                {stat.emoji}
              </div>

              <h3 className="mt-4 text-4xl font-bold text-[#346739]">
                {stat.number}
              </h3>

              <p className="mt-2 text-gray-500">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </div>

      </section>

      {/* Values */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <h2 className="mb-14 text-center text-5xl font-bold text-[#346739]">
            Why Choose Us?
          </h2>

          <div className="grid gap-8 md:grid-cols-2">

            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2"
              >
                <div className="text-5xl">
                  {value.icon}
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#346739]">
                  {value.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {value.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}