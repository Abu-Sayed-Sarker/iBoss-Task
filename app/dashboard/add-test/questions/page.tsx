"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Plus, Edit2, Trash2 } from "lucide-react";
import QuestionModal from "./QuestionModal";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useGetTestByIdQuery } from "@/apis/tests/testsApi";
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} from "@/apis/Quations/questionApi";

const QuestionsSetsPage = () => {
  const searchParams = useSearchParams();
  const testId = searchParams.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  const { data: testResponse, isLoading: isFetching } = useGetTestByIdQuery(testId, {
    skip: !testId,
  });

  console.log("Current Test ID:", testId);
  console.log("Full Test Response:", testResponse);

  const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation();

  const testData = testResponse?.data;
  const questions = testData?.questions || [];

  const handleSaveQuestion = async (modalQuestion: any) => {
    try {
      if (editingQuestion) {
        // Update question payload - actual payload is just the question object
        const payload = {
          ...modalQuestion,
          id: editingQuestion.id,
          test_id: Number(testId),
        };

        await updateQuestion({ id: editingQuestion.id, data: payload }).unwrap();
        toast.success("Question updated successfully!");
      } else {
        // Add question payload - actual payload is just the question object
        const payload = {
          ...modalQuestion,
          id: 0,
          test_id: Number(testId),
        };

        await addQuestion(payload).unwrap();
        toast.success("Question added to exam!");
      }
      setIsModalOpen(false);
      setEditingQuestion(null);
    } catch (err: any) {
      console.error("Failed to save question:", err);
      toast.error(err?.data?.message || "Failed to save question.");
    }
  };

  const handleEdit = (q: any) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  const removeQuestion = async (id: number) => {
    try {
      await deleteQuestion({ id }).unwrap();
      toast.success("Question removed");
    } catch (err: any) {
      console.error("Failed to delete question:", err);
      toast.error("Failed to remove question.");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6339f9]"></div>
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
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-gray-400 font-medium text-sm">Basic Info</span>
              </div>
              <div className="w-16 h-[1.5px] bg-[#6339f9]"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6339f9] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  2
                </div>
                <span className="text-[#6339f9] font-bold text-sm">Questions Sets</span>
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

      {/* Questions Review List */}
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {questions.length === 0 && !isFetching && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400">No questions added yet. Click the button below to add one.</p>
          </div>
        )}

        {questions.map((q: any, index: number) => (
          <div key={q.id || index} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Card Header */}
            <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#1e1e50]">Question {index + 1}</h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg border border-gray-100 text-[12px] font-bold text-gray-400 bg-gray-50/50 uppercase">
                  {q.type}
                </span>
                <span className="px-3 py-1 rounded-lg border border-gray-100 text-[12px] font-bold text-gray-400 bg-gray-50/50">
                  {q.points}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <p className="text-[16px] font-bold text-[#1e1e50] mb-6">{q.question}</p>
              
              {q.options && q.options.length > 0 ? (
                <div className="space-y-4">
                  {q.options.map((opt: any, idx: number) => (
                    <div 
                      key={idx}
                      className={`px-5 py-3.5 rounded-xl border text-[15px] flex items-center justify-between transition-all ${
                        opt.isCorrect 
                        ? "bg-gray-50/80 border-gray-100 text-[#1e1e50] font-medium" 
                        : "bg-white border-transparent text-gray-400"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {opt.isCorrect && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-gray-400 leading-relaxed font-medium">
                  {q.description || "No description provided."}
                </p>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-8 py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
              <button 
                onClick={() => handleEdit(q)}
                className="flex items-center gap-2 text-[14px] font-bold text-[#6339f9] hover:underline transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => removeQuestion(q.id)}
                disabled={isDeleting}
                className="flex items-center gap-2 text-[14px] font-bold text-red-400 hover:text-red-500 hover:underline transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? "Removing..." : "Remove From Exam"}
              </button>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="md:px-2">
            <button 
              onClick={() => {
                setEditingQuestion(null);
                setIsModalOpen(true);
              }}
              disabled={isAdding || isUpdating}
              className="w-full bg-[#6339f9] text-white font-bold py-4 rounded-xl hover:bg-[#522ed1] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-70"
            >
              {(isAdding || isUpdating) ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Plus className="w-5 h-5" />
              )}
              Add Question
            </button>
        </div>
      </div>

      {/* Modal Component */}
      <QuestionModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuestion(null);
        }} 
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />
    </div>
  );
};

export default QuestionsSetsPage;
