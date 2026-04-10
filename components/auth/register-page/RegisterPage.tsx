"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRegisterMutation } from "@/apis/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser, setTokens } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    refferal_id: "",
    role: "user",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referral_id: formData.refferal_id,
        role: formData.role,
      }).unwrap();

      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;

        dispatch(setUser(user));
        dispatch(setTokens({ accessToken, refreshToken }));

        toast.success(response?.message || "Registration Successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(
        err?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1e1e50] mb-6">Create Account</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#3c4b64]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
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

          {/* Referral ID */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#3c4b64]">
              Referral ID
            </label>
            <input
              type="text"
              name="refferal_id"
              value={formData.refferal_id}
              onChange={handleChange}
              placeholder="Enter referral ID (optional)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#3c4b64]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
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
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#3c4b64]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300 text-sm"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#6339f9] text-white font-bold py-3.5 rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] mt-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-indigo-600 hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
