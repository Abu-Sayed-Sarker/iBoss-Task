"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { accessToken } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (accessToken) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [accessToken, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans min-h-[calc(100vh-117px)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Redirecting...</p>
      </div>
    </div>
  );
}
