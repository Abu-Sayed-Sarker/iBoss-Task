import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-3 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light border-t border-white/5">
      <div className="flex items-center gap-3">
        <span className="text-white/60 text-[13px]">Powered by</span>
        <Image src="/logo.png" alt="Akij Resource" width={100} height={100} />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
        <div className="flex items-center gap-6">
          <span className="text-white/80">Helpline</span>
          <div className="flex items-center gap-2.5 hover:text-blue-400 transition-colors cursor-pointer group">
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
              className="text-white/70 group-hover:text-current"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[15px] font-medium">+88 011020202505</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 hover:text-blue-400 transition-colors cursor-pointer group">
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
            className="text-white/70 group-hover:text-current"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-[15px] font-medium">support@akij.work</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
