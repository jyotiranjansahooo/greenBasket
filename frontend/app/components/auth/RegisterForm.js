"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingUser, setPendingUser] = useState(null);

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
          ? formData.cropTypes.split(",").map((crop) => crop.trim())
          : [],
      };

      setPendingUser(payload);

      await api.post("/auth/send-verification-code", {
        email: payload.email,
      });

      setShowOtpPopup(true);

      toast.success("Verification code sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async () => {
  try {
    setLoading(true);

    await api.post("/auth/verify-code", {
      email: pendingUser.email,
      code: otp,
    });

    const user = await registerUser(pendingUser);

    toast.success(
      "Account created successfully!"
    );

    setShowOtpPopup(false);

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
      "Invalid verification code"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-800 bg-green-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700">🌱 Green Basket</h1>

          <p className="mt-2 text-gray-500">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold ">Name</label>

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
            <label className="mb-2 block font-semibold">Email</label>

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
            <label className="mb-2 block font-semibold">Password</label>

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
            <label className="mb-2 block font-semibold">Phone</label>

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
            <label className="mb-2 block font-semibold">Address</label>

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
            <label className="mb-2 block font-semibold">Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="customer">Customer</option>

              <option value="farmer">Farmer</option>
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
                <label className="mb-2 block font-semibold">Crop Types</label>

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
                  <option value="">Select Method</option>

                  <option value="organic">Organic</option>

                  <option value="conventional">Conventional</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {loading ? "Creating Account..." : "Register"}
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
      {showOtpPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      <h2 className="text-2xl font-bold text-center text-green-700">
        Verify Email
      </h2>

      <p className="mt-2 text-center text-gray-500">
        Enter the 6-digit code sent to your email.
      </p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter OTP"
        className="mt-6 w-full rounded-lg border p-3 text-center text-2xl tracking-[10px]"
      />

      <button
        type="button"
        onClick={handleVerifyOtp}
        className="mt-5 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
      >
        Verify
      </button>

    </div>
  </div>
)}
</div>

    </div>
  );
}
