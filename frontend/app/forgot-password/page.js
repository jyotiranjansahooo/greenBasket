"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// import api from "@/services/api";
import api from "@/lib/axios";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpBlockedUntil, setOtpBlockedUntil] = useState(null);
  const [otpTimeLeft, setOtpTimeLeft] = useState(0);
  const isOtpBlocked = otpTimeLeft > 0;

  // Send OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", {
        email,
      });

      toast.success("OTP sent to your email.");
      setStep(2);
      setCanResend(false);
      setResendTimer(60);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter exactly 6 digits.");

      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-reset-code", {
        email,
        code: otp,
      });

      toast.success("OTP verified.");

      setStep(3);
    } catch (error) {
      const message = error.response?.data?.message;

      toast.error(message || "Invalid OTP.");

      if (error.response?.status === 429) {
        const match = message.match(/(\d+)/);

        if (match) {
          const seconds = Number(match[1]);

          setOtpBlockedUntil(Date.now() + seconds * 1000);

          setOtpTimeLeft(seconds);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        email,
        password,
      });

      toast.success("Password updated successfully.");

      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (step !== 2 || canResend) return;

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
  }, [step, canResend]);
  useEffect(() => {
    if (!otpBlockedUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.ceil((otpBlockedUntil - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);

        setOtpTimeLeft(0);

        setOtpBlockedUntil(null);

        return;
      }

      setOtpTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpBlockedUntil]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-300 via-emerald-100 to-green-300 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-8 text-gray-800 shadow-2xl backdrop-blur-md">
        <h1 className="text-center text-3xl font-bold text-green-700">
          Forgot Password
        </h1>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Reset your password securely with OTP verification.
        </p>

        {/* Step 1 */}

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendOtp();
            }}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 */}

        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Verification Code
              </label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-center text-xl tracking-[10px] outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || isOtpBlocked}
              className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isOtpBlocked
                ? `Try again in ${otpTimeLeft}s`
                : loading
                  ? "Verifying..."
                  : "Verify OTP"}
            </button>
            {isOtpBlocked && (
              <p className="mt-3 text-center text-sm text-red-500">
                Too many incorrect OTP attempts. Please wait {otpTimeLeft}{" "}
                seconds.
              </p>
            )}

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="font-semibold text-green-600 transition hover:text-green-800 hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend OTP in{" "}
                  <span className="font-semibold text-green-700">
                    {resendTimer}s
                  </span>
                </p>
              )}
            </div>
          </form>
        )}

        {/* Step 3 */}

        {step === 3 && (
          <form onSubmit={resetPassword} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
