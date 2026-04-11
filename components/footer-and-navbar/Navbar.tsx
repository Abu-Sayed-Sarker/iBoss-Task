"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state: any) => state.auth);

  const getHeaderTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/add-test") return "Create Online Test";
    if (pathname.includes("/manage-test")) return "Manage Online Test";
    if (pathname.includes("/questions")) return "Questions Sets";
    if (pathname.includes("/exam")) return "Exam Terminal";
    return "Dashboard";
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 h-16 px-6 md:px-16 flex items-center justify-between shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] sticky top-0 z-50">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center gap-12">
        {/* Logo Recreation */}
        <div 
          className="relative w-32 h-10 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
           <Image 
             src="/logo02.png" 
             alt="Akij Resource" 
             fill
             className="object-contain"
             priority
           />
        </div>

        {/* Dashboard Link / Dynamic Title */}
        <div className="hidden md:flex items-center ml-4">
          <span 
            onClick={() => router.push("/dashboard")}
            className="text-[#64748b] font-medium text-[15px] cursor-pointer hover:text-[#6339f9] transition-all flex items-center gap-2"
          >
            Dashboard
            {pathname !== "/dashboard" && (
              <>
                <span className="text-gray-300 mx-1">/</span>
                <span className="text-[#1e1e50] font-bold">{getHeaderTitle()}</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Right Section: User Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 cursor-pointer group relative">
          <div className="flex flex-col items-end leading-tight mr-1">
            <span className="text-[#1e1e50] font-bold text-[14px]">
              {user?.name || "Guest User"}
            </span>
            <span className="text-[11px] text-[#64748b] font-medium mt-0.5">
              Ref. ID - {user?.refferal_id || user?.id || "N/A"}
            </span>
          </div>

          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-indigo-200 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#d1d5db"
              className="mt-1"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Dropdown Chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-y-0.5 transition-all group-hover:stroke-[#6339f9]"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>

          {/* Simple Dropdown Menu on hover */}
          <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
            <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 w-48 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 font-medium">Account Settings</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
