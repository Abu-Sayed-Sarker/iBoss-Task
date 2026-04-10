export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 flex-1">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-[#1e1e50] mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-500 mb-8">
          You have successfully logged in. This is a protected route.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <h2 className="font-bold text-indigo-900 mb-2">User Access</h2>
            <p className="text-sm text-indigo-700 italic">Route: /get-post</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <h2 className="font-bold text-purple-900 mb-2">Admin Access</h2>
            <p className="text-sm text-purple-700 italic">Route: /added-post</p>
          </div>
        </div>
      </div>
    </div>
  );
}
