"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { token } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(
          `/auth/verify-email/${token}`
        );

        setSuccess(true);

        setMessage(data.message);

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
            "Verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#97bf93] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Green Basket 🌱
        </h1>

        {loading ? (
          <p className="text-gray-600">
            Verifying your email...
          </p>
        ) : success ? (
          <>
            <p className="text-lg font-semibold text-green-600">
              {message}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Redirecting to login...
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-red-600">
              {message}
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 text-white"
            >
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}