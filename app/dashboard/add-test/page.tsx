"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { 
  useCreateTestMutation, 
  useUpdateTestMutation, 
  useGetTestByIdQuery 
} from "@/apis/tests/testsApi";

const AddTestPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("id");

  const [createTest, { isLoading: isCreating }] = useCreateTestMutation();
  const [updateTest, { isLoading: isUpdating }] = useUpdateTestMutation();
  const { data: testResponse, isSuccess: isFetchSuccess } = useGetTestByIdQuery(testId, {
    skip: !testId,
  });

  const [formData, setFormData] = useState({
    title: "",
    candidates: "",
    slots: "",
    questionSet: "",
    questionType: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (isFetchSuccess && testResponse?.data) {
      const test = testResponse.data;
      setFormData({
        title: test.title || "",
        candidates: test.candidates || "",
        slots: String(test.slots) || "",
        questionSet: test.question_set || "",
        questionType: test.question_type || "",
        startTime: test.start_time || "",
        endTime: test.end_time || "",
        duration: test.duration || "",
      });
    }
  }, [isFetchSuccess, testResponse]);

  // Automatically calculate duration when start or end time changes
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startH, startM] = formData.startTime.split(":").map(Number);
      const [endH, endM] = formData.endTime.split(":").map(Number);

      let diffInMinutes = endH * 60 + endM - (startH * 60 + startM);

      if (diffInMinutes < 0) diffInMinutes += 24 * 60; // Handle overnight duration

      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;

      let durationStr = "";
      if (hours > 0) durationStr += `${hours} hr `;
      if (minutes > 0 || hours === 0) durationStr += `${minutes} min`;

      setFormData((prev) => ({ ...prev, duration: durationStr }));
    }
  }, [formData.startTime, formData.endTime]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAndContinue = async () => {
    try {
      // Map local state to the requested payload structure
      const payload = {
        title: formData.title,
        candidates: formData.candidates,
        start_time: formData.startTime,
        end_time: formData.endTime,
        duration: formData.duration,
        slots: Number(formData.slots),
        question_set: formData.questionSet,
        question_type: formData.questionType,
      };

      let finalId = testId;

      if (testId) {
        // Update existing test
        await updateTest({ ...payload, id: Number(testId) }).unwrap();
        toast.success("Test basic information updated successfully!");
      } else {
        // Create new test
        const res = await createTest(payload).unwrap();
        finalId = res.data.id;
        toast.success("Test basic information created successfully!");
      }
      
      router.push(`/dashboard/add-test/questions?id=${finalId}`);
    } catch (err: any) {
      console.error("Failed to save test:", err);
      toast.error(err?.data?.message || "Failed to save test. Please try again.");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-[#1e1e50]">
              Manage Online Test
            </h1>

            {/* Stepper */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6339f9] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  1
                </div>
                <span className="text-[#6339f9] font-bold text-sm">
                  Basic Info
                </span>
              </div>
              <div className="w-16 h-[1.5px] bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold border border-gray-100">
                  2
                </div>
                <span className="text-gray-400 font-medium text-sm">
                  Questions
                </span>
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

      {/* Form Content Card */}
      <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm max-w-5xl mx-auto mb-8">
        <h2 className="text-lg font-bold text-[#1e1e50] mb-8">
          Basic Information
        </h2>

        <form className="space-y-6">
          {/* Online Test Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3c4b64]">
              Online Test Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter online test title"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm placeholder:text-gray-300"
            />
          </div>

          {/* Candidates & Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Total Candidates <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="candidates"
                value={formData.candidates}
                onChange={handleChange}
                placeholder="Enter total candidates"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Total Slots <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="slots"
                  value={formData.slots}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm appearance-none bg-white"
                >
                  <option value="">Select total shots</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Question Set & Question Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Total Question Set <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="questionSet"
                  value={formData.questionSet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm appearance-none bg-white"
                >
                  <option value="">Select total question set</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Question Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm appearance-none bg-white"
                >
                  <option value="">Select question type</option>
                  <option value="mcq">MCQ</option>
                  <option value="written">Written</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Timer Section: Start Time, End Time, Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Start Time <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm text-[#1e1e50] font-medium bg-white appearance-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                End Time <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9] transition-all text-sm text-[#1e1e50] font-medium bg-white appearance-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3c4b64]">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                placeholder="Duration Time"
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-[#6339f9] text-sm font-bold shadow-inner"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Footer Actions */}
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <button className="px-10 py-3 border border-gray-200 text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-sm">
          Cancel
        </button>
        <button
          onClick={handleSaveAndContinue}
          disabled={isLoading}
          className={`px-10 py-3 bg-[#6339f9] text-white font-bold text-sm rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-100 active:scale-95 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default AddTestPage;
