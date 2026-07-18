"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const [loading, setLoading] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
    houseNumber: "",
    area: "",
    state: "",
    pincode: "",
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
      if (formData.pincode.length !== 6) {
        toast.error("Pincode must contain exactly 6 digits.");

        return;
      }
      setLoading(true);

      const payload = {
        ...formData,
        cropTypes: formData.cropTypes
          ? formData.cropTypes.split(",").map((crop) => crop.trim())
          : [],
      };

      setPendingUser(payload);

      await api.post("/auth/send-verification-code", payload);

      setShowOtpPopup(true);
      setCanResend(false);
      setResendTimer(60);

      toast.success("Verification code sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter exactly 6 digits.");
      return;
    }
    try {
      setLoading(true);

      await api.post("/auth/verify-code", {
        email: pendingUser.email,
        code: otp,
      });

      toast.success("Account verified successfully!");

      setShowOtpPopup(false);

      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!showOtpPopup || canResend) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtpPopup, canResend]);

  const handleResendOtp = async () => {
    try {
      await api.post("/auth/send-verification-code", pendingUser);

      toast.success("Verification code resent.");

      setCanResend(false);
      setResendTimer(60);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));
                }
              }}
              required
              placeholder="Enter your phone number"
              className="w-full rounded-lg border p-3"
            />

            {formData.phone.length > 0 && formData.phone.length !== 10 && (
              <p className="mt-1 text-sm text-red-500">
                Phone number must contain exactly 10 digits.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">House Number</label>

              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="House / Flat No."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Area / Street</label>

              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area / Street"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">State</label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select your state</option>

                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">Pincode</label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 6) {
                    setFormData((prev) => ({
                      ...prev,
                      pincode: value,
                    }));
                  }
                }}
                required
                placeholder="6-digit pincode"
                className="w-full rounded-lg border p-3"
              />

              {formData.pincode.length > 0 && formData.pincode.length !== 6 && (
                <p className="mt-1 text-sm text-red-500">
                  Pincode must contain exactly 6 digits.
                </p>
              )}
            </div>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                maxLength={6}
                placeholder="Enter OTP"
                className="mt-6 w-full rounded-lg border p-3 text-center text-2xl tracking-[10px]"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="mt-5 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Verification in progress..." : "Verify"}
              </button>

              <div className="mt-4 text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-semibold text-green-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {resendTimer}s
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
