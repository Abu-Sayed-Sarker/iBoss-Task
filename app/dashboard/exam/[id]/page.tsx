"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useStartExamMutation,
  useSubmitAnswerMutation,
  useFinalizeExamMutation,
} from "@/apis/exam/examApi";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetTestByIdQuery } from "@/apis/tests/testsApi";

const ExamPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: testResponse, isLoading: isTestLoading } =
    useGetTestByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);

  const [startExam] = useStartExamMutation();
  const [submitAnswer, { isLoading: isSubmitting }] = useSubmitAnswerMutation();
  const [finalizeExam, { isLoading: isFinalizing }] = useFinalizeExamMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});
  const [timeLeft, setTimeLeft] = useState(1231); // 20:31 in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  const testData = testResponse?.data;
  const questions = testData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Start exam on mount
  useEffect(() => {
    if (id) {
      startExam(Number(id))
        .unwrap()
        .catch((err) => {
          console.error("Failed to start exam:", err);
          // toast.error("Failed to initialize exam sequence.");
        });
    }
  }, [id, startExam]);

  // Timer logic
  useEffect(() => {
    if (isCompleted || isTimedOut) return;
    if (timeLeft <= 0) {
      setIsTimedOut(true);
      handleFinalize(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted, isTimedOut]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")} left`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (isCompleted || isTimedOut) return;
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleFinalize = async (silent = false) => {
    try {
      await finalizeExam(Number(id)).unwrap();
      if (!silent) setIsCompleted(true);
    } catch (err) {
      console.error("Finalize error:", err);
      if (!silent) toast.error("Failed to finalize exam.");
    }
  };

  const handleNext = async () => {
    const selectedIndex = selectedOptions[currentQuestion.id];

    if (selectedIndex !== undefined) {
      try {
        await submitAnswer({
          testId: Number(id),
          questionId: currentQuestion.id,
          selectedOptionIndex: selectedIndex,
        }).unwrap();
      } catch (err) {
        console.error("Submission error:", err);
        toast.error("Failed to save answer.");
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinalize();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (isTestLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6339f9]"></div>
      </div>
    );
  }

  // Success Screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-3xl p-16 border border-gray-100 shadow-sm flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-8 shadow-xl shadow-blue-100">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1e1e50] mb-4">
            Test Completed
          </h2>
          <p className="text-gray-400 max-w-2xl mb-12 leading-relaxed">
            Congratulations! {user?.name || "Candidate"}, You have completed
            your {testData?.question_type?.toUpperCase() || "MCQ"} Exam for{" "}
            {testData?.title || "Probationary Officer"}. Thank you for
            participating.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-12 py-3.5 border border-gray-200 text-[#1e1e50] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion && !isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1e1e50] mb-4">
            No questions available for this test.
          </h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 bg-[#6339f9] text-white rounded-xl font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12 flex flex-col items-center relative">
      {/* Timeout Modal */}
      {isTimedOut && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-4xl p-12 max-w-xl w-full flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                <Clock className="w-10 h-10 text-slate-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-500 fill-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1e1e50] mb-4">Timeout!</h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-[15px]">
              Dear {user?.name || "Candidate"}, Your exam time has been
              finished. Thank you for participating.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-48 py-3.5 border border-gray-100 text-[#1e1e50] font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Header Card (Question Progress & Timer) */}
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1e1e50]">
          Question ({currentQuestionIndex + 1}/{questions.length})
        </h2>
        <div className="px-10 py-3 bg-gray-50 rounded-xl flex items-center gap-3">
          <span className="text-[#1e1e50] font-bold text-lg">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl p-10 border border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]">
        <h1 className="text-xl font-bold text-[#1e1e50] mb-10 leading-relaxed">
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </h1>

        <div className="space-y-4 mb-12">
          {currentQuestion.options?.map((option: any, idx: number) => {
            const isSelected = selectedOptions[currentQuestion.id] === idx;
            return (
              <label
                key={idx}
                className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all hover:border-[#6339f9]/30 ${
                  isSelected
                    ? "border-[#6339f9] bg-[#6339f9]/5 shadow-sm"
                    : "border-gray-100 bg-white"
                }`}
                onClick={() => handleOptionSelect(idx)}
              >
                <div className="shrink-0">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-[#6339f9]" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-200" />
                  )}
                </div>
                <span
                  className={`text-[15px] font-medium ${isSelected ? "text-[#1e1e50]" : "text-gray-500"}`}
                >
                  {option.label}
                </span>
                <input
                  type="radio"
                  className="hidden"
                  name={`question-${currentQuestion.id}`}
                  checked={isSelected}
                  onChange={() => {}}
                />
              </label>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="px-8 py-3.5 border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
          >
            Skip this Question
          </button>
          <button
            onClick={handleNext}
            disabled={isSubmitting || isFinalizing}
            className="px-8 py-3.5 bg-[#6339f9] text-white font-bold rounded-xl hover:bg-[#522ed1] transition-all shadow-lg shadow-indigo-100 active:scale-95 text-sm flex items-center gap-2 disabled:opacity-70"
          >
            {(isSubmitting || isFinalizing) && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
