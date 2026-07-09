"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
    address: "",
    farmLocation: "",
    cropTypes: "",
    farmingMethod: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        cropTypes: formData.cropTypes
          ? formData.cropTypes
              .split(",")
              .map((crop) => crop.trim())
          : [],
      };

      const user = await registerUser(payload);

      toast.success("Registration successful!");

      switch (user.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;

        case "farmer":
          router.push("/farmer/dashboard");
          break;

        default:
          router.push("/products");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-800 bg-green-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700">
            🌱 Green Basket
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-semibold ">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
                            placeholder="Enter your email"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
                            placeholder="Enter your password"

              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
                            placeholder="Enter your phone number"

              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Address
            </label>

            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
                            placeholder="Enter your proper address"

              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Register As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="customer">
                Customer
              </option>

              <option value="farmer">
                Farmer
              </option>
            </select>
          </div>

                    {formData.role === "farmer" && (
            <>
              <div>
                <label className="mb-2 block font-semibold">
                  Farm Location
                </label>

                <input
                  type="text"
                  name="farmLocation"
                  value={formData.farmLocation}
                  onChange={handleChange}
                  placeholder="Enter your farm location"
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Crop Types
                </label>

                <input
                  type="text"
                  name="cropTypes"
                  value={formData.cropTypes}
                  onChange={handleChange}
                  placeholder="Tomato, Onion, Potato"
                  className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-gray-500">
                  Separate multiple crops with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Farming Method
                </label>

                <select
                  name="farmingMethod"
                  value={formData.farmingMethod}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">
                    Select Method
                  </option>

                  <option value="organic">
                    Organic
                  </option>

                  <option value="conventional">
                    Conventional
                  </option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}