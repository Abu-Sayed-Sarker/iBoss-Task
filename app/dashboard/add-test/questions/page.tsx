"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import QuestionModal from "./QuestionModal";
import { toast } from "react-hot-toast";

const QuestionsSetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial dummy data
  const [addedQuestions, setAddedQuestions] = useState([
    {
      id: 1,
      type: "MCQ",
      points: "1 pt",
      question: "What is the Capital of Bangladesh?",
      options: [
        { label: "A. Dhaka", isCorrect: true },
        { label: "B. Chattogram", isCorrect: false },
        { label: "C. Rajshahi", isCorrect: false },
        { label: "D. Barishal", isCorrect: false },
      ],
    },
    {
      id: 2,
      type: "Checkbox",
      points: "1 pt",
      question: "What is the Capital of Bangladesh?",
      options: [
        { label: "A. Dhaka", isCorrect: true },
        { label: "B. Chattogram", isCorrect: false },
        { label: "C. Rajshahi", isCorrect: true },
        { label: "D. Barishal", isCorrect: false },
      ],
    },
    {
      id: 3,
      type: "Text",
      points: "5 pt",
      question: "Write a brief of your capital city",
      description: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    },
  ]);

  const handleSaveQuestion = (newQuestion: any) => {
    const questionWithId = {
      ...newQuestion,
      id: addedQuestions.length + 1
    };
    setAddedQuestions([...addedQuestions, questionWithId]);
    toast.success("Question added to exam!");
  };

  const removeQuestion = (id: number) => {
    setAddedQuestions(addedQuestions.filter(q => q.id !== id));
    toast.error("Question removed");
  };

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
        {addedQuestions.map((q) => (
          <div key={q.id} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Card Header */}
            <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#1e1e50]">Question {q.id}</h3>
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
              
              {q.options ? (
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
                  {q.description}
                </p>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-8 py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
              <button className="text-[14px] font-bold text-[#6339f9] hover:underline transition-all">
                Edit
              </button>
              <button 
                onClick={() => removeQuestion(q.id)}
                className="text-[14px] font-bold text-red-400 hover:text-red-500 hover:underline transition-all"
              >
                Remove From Exam
              </button>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="md:px-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#6339f9] text-white font-bold py-4 rounded-xl hover:bg-[#522ed1] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.99]"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
        </div>
      </div>

      {/* Modal Component */}
      <QuestionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveQuestion}
      />
    </div>
  );
};

export default QuestionsSetsPage;
