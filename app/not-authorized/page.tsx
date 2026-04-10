import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 flex-1">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1e1e50] mb-4">Access Denied</h1>
        <p className="text-gray-500 mb-8 text-sm">
          You don't have the required permissions to view this page. This section is restricted to specific roles.
        </p>
        <Link 
          href="/dashboard"
          className="inline-block bg-[#6339f9] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-200"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
