"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useGetAllTestsQuery } from "@/apis/tests/testsApi";

// Types
interface Test {
  id: number;
  title: string;
  candidates: string;
  question_set: string;
  slots: number;
  question_type: string;
  created_at: string;
  updated_at: string;
}

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: testsResponse, isLoading } = useGetAllTestsQuery(undefined);

  const tests = testsResponse?.data || [];

  const filteredTests = tests.filter((test: Test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="text-[28px] font-bold text-[#1e1e50]">Online Tests</h1>

        {/* Search Bar Container */}
        <div className="flex-1 max-w-2xl mx-auto w-full group transition-all">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by exam title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-12 rounded-xl bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm placeholder:text-gray-300"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-300" />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-50 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4 text-[#6339f9]" />
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/add-test"
          className="h-11 px-6 bg-[#6339f9] text-white font-bold rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Create Online Test
        </Link>
      </div>

      {/* Conditional Rendering: Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse"
            >
              <div className="h-7 bg-gray-100 rounded-lg w-3/4 mb-8"></div>
              <div className="flex gap-10 mb-10">
                <div className="h-5 bg-gray-100 rounded w-24"></div>
                <div className="h-5 bg-gray-100 rounded w-24"></div>
                <div className="h-5 bg-gray-100 rounded w-24"></div>
              </div>
              <div className="h-10 bg-gray-100 rounded-xl w-32"></div>
            </div>
          ))}
        </div>
      ) : filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map((test: Test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.08)] transition-all group"
            >
              <h2 className="text-[20px] font-bold text-[#1e1e50] mb-8 leading-tight group-hover:text-[#6339f9] transition-colors">
                {test.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-10">
                {/* Candidates */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex gap-1.5 text-[15px]">
                    <span className="text-gray-400">Candidates:</span>
                    <span className="text-[#1e1e50] font-bold">
                      {test.candidates ? "N/A" : "0"}
                    </span>
                  </div>
                </div>

                {/* Question Set */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-gray-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex gap-1.5 text-[15px]">
                    <span className="text-gray-400">Question Set:</span>
                    <span className="text-[#1e1e50] font-bold">
                      {test.question_set || "Not Set"}
                    </span>
                  </div>
                </div>

                {/* Exam Slots */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-gray-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex gap-1.5 text-[15px]">
                    <span className="text-gray-400">Exam Slots:</span>
                    <span className="text-[#1e1e50] font-bold">
                      {test.slots || "Not Set"}
                    </span>
                  </div>
                </div>
              </div>

              <button className="px-7 py-2.5 rounded-xl border border-[#6339f9]/30 text-[#6339f9] font-bold text-[14px] hover:bg-[#6339f9] hover:text-white transition-all shadow-sm active:scale-95">
                View Candidates
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 border border-gray-100 shadow-sm flex flex-col items-center text-center">
          {/* Empty State Image Placeholder (SVG) */}
          <div className="w-48 h-48 mb-6 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect
                x="50"
                y="70"
                width="100"
                height="80"
                rx="10"
                fill="#4B5563"
              />
              <rect x="50" y="70" width="100" height="15" fill="#374151" />
              <path d="M50 150 L150 150 L130 130 L70 130 Z" fill="#3B82F6" />
              <circle cx="100" cy="80" r="15" fill="#3B82F6" />
              <text x="94" y="85" fill="white" fontSize="16" fontWeight="bold">
                X
              </text>
              <circle cx="130" cy="60" r="4" fill="#10B981" />
              <circle cx="140" cy="75" r="3" fill="#A7F3D0" />
              <circle cx="80" cy="65" r="3" fill="#93C5FD" />
            </svg>
          </div>
          <h3 className="text-[22px] font-bold text-[#1e1e50] mb-3">
            No Online Test Available
          </h3>
          <p className="text-gray-400 max-w-md">
            Currently, there are no online tests available. Please check back
            later for updates.
          </p>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        {/* Page Select */}
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-50 flex items-center justify-center font-bold text-[#1e1e50] text-sm">
            1
          </div>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Per Page Selection */}
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-gray-400 font-medium">
            Online Test Per Page
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:border-indigo-300 transition-all group">
            <span className="text-[13px] font-bold text-[#1e1e50]">8</span>
            <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
