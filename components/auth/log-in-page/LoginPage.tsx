"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/apis/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser, setTokens } from "@/features/authSlice";
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;

        // 1. Store in Redux
        dispatch(setUser(user));
        dispatch(setTokens({ accessToken, refreshToken }));

        // 2. Store in Cookie for Middleware
        const authData = JSON.stringify({
          access: accessToken,
          user: user,
        });
        setCookie("auth", authData);
        setCookie("role", user.role);

        toast.success("Login Successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold text-[#1e1e50] mb-8">Sign In</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email/User ID */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3c4b64]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3c4b64]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88L14.12 14.12" />
                    <path d="M2 2l20 20" />
                    <path d="M10.37 4.37a11 11 0 0 1 11.13 6.63" />
                    <path d="M12 17c-3.1 0-6.17-1.39-8.58-3.37" />
                    <path d="M4.37 19.37l1.41-1.41" />
                    <path d="M2 12c1.78-2.9 4.37-5.38 7.37-6.37" />
                    <path d="M15.63 4.37L14.22 5.78" />
                    <path d="M18.63 7.37l1.41-1.41" />
                    <path d="M22 12c-1.78 2.9-4.37 5.38-7.37 6.37" />
                    <path d="M12 7c2.2 0 4 1.8 4 4" />
                    <path d="M15.63 19.63l-1.41-1.41" />
                    <path d="M11 17c-2.2 0-4-1.8-4-4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forget Password */}
          <div className="flex justify-end">
            <Link
              href="#"
              className="text-xs font-bold text-[#3c4b64] hover:text-indigo-600 transition-colors"
            >
              Forget Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#6339f9] text-white font-bold py-3.5 rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-indigo-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
