"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Edit3 } from "lucide-react";
import { useGetTestByIdQuery } from "@/apis/tests/testsApi";

const ManageTestPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: testResponse, isLoading } = useGetTestByIdQuery(id);

  const test = testResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6339f9]"></div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1e1e50]">Test not found</h2>
          <Link href="/dashboard" className="text-[#6339f9] underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-[#1e1e50]">Manage Online Test</h1>

            {/* Stepper */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6339f9] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  1
                </div>
                <span className="text-[#6339f9] font-bold text-sm">Basic Info</span>
              </div>
              <div className="w-16 h-[1.5px] bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold border border-gray-100">
                  2
                </div>
                <span className="text-gray-400 font-medium text-sm">Questions</span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-6 py-2 border border-gray-200 text-[#1e1e50] font-bold text-sm rounded-xl hover:bg-gray-50 transition-all whitespace-nowrap shadow-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content Card (Basic Info View) */}
      <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm max-w-5xl mx-auto mb-8 relative">
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-xl font-bold text-[#1e1e50]">Basic Information</h2>
          <button 
            onClick={() => router.push(`/dashboard/add-test?id=${test.id}`)}
            className="flex items-center gap-2 text-[#6339f9] font-bold text-sm hover:opacity-80 transition-opacity"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-10">
          {/* Title Row */}
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-gray-400">Online Test Title</p>
            <p className="text-[16px] font-bold text-[#1e1e50]">{test.title}</p>
          </div>

          {/* Grid for stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
            <div className="space-y-2">
              <p className="text-[13px] font-medium text-gray-400">Total Candidates</p>
              <p className="text-[16px] font-bold text-[#1e1e50]">{test.candidates || "10,000"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[13px] font-medium text-gray-400">Total Slots</p>
              <p className="text-[16px] font-bold text-[#1e1e50]">{test.slots}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[13px] font-medium text-gray-400">Total Question Set</p>
              <p className="text-[16px] font-bold text-[#1e1e50]">{test.question_set}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[13px] font-medium text-gray-400">Duration Per Slots (Minutes)</p>
              <p className="text-[16px] font-bold text-[#1e1e50]">{test.duration || "30"}</p>
            </div>
          </div>

          {/* Question Type Row */}
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-gray-400">Question Type</p>
            <p className="text-[16px] font-bold text-[#1e1e50] uppercase">{test.question_type}</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <button 
          onClick={() => router.push("/dashboard")}
          className="px-10 py-3 border border-gray-200 text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => router.push(`/dashboard/add-test/questions?id=${test.id}`)}
          className="px-10 py-3 bg-[#6339f9] text-white font-bold text-sm rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ManageTestPage;
