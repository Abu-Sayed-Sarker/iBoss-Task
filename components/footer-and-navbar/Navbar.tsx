import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 h-16 px-6 md:px-16 flex items-center justify-between shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center gap-12">
        {/* Logo Recreation */}
        <Image src="/logo02.png" alt="Akij Resource" width={100} height={100} />

        {/* Dashboard Link */}
        <div className="hidden md:flex items-center ml-4">
          <span className="text-[#3c4b64] font-medium text-[15px]">
            Dashboard
          </span>
        </div>
      </div>

      {/* Right Section: User Profile */}
      <div className="flex items-center gap-4 cursor-pointer group">
        <div className="flex flex-col items-end leading-tight mr-1">
          <span className="text-[#1e1e50] font-bold text-[14px]">
            Arif Hossain
          </span>
          <span className="text-[11px] text-[#64748b] font-medium mt-0.5">
            Ref. ID - 16101121
          </span>
        </div>

        {/* Avatar Circle */}
        <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center overflow-hidden border border-gray-100">
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
          className="group-hover:translate-y-0.5 transition-all"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
