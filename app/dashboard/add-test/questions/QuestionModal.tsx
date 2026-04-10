"use client";

import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  RotateCcw, 
  RotateCw, 
  Bold, 
  Italic, 
  List, 
  Plus, 
  ChevronDown,
  X
} from "lucide-react";

interface Option {
  id: number;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: any) => void;
  initialData?: any;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [questionText, setQuestionText] = useState("");
  const [score, setScore] = useState("1");
  const [type, setType] = useState("MCQ");
  const [options, setOptions] = useState<Option[]>([
    { id: Date.now(), label: 'A', text: "", isCorrect: true },
    { id: Date.now() + 1, label: 'B', text: "", isCorrect: false },
    { id: Date.now() + 2, label: 'C', text: "", isCorrect: false },
  ]);

  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.question || "");
      setScore(initialData.points?.split(" ")[0] || "1");
      setType(initialData.type || "MCQ");
      if (initialData.options) {
        setOptions(initialData.options.map((opt: any, idx: number) => ({
          id: idx,
          label: opt.label.split(".")[0],
          text: opt.label.split(". ")[1] || "",
          isCorrect: opt.isCorrect
        })));
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddOption = () => {
    const nextLabel = String.fromCharCode(65 + options.length); // A, B, C, D...
    setOptions([...options, { id: Date.now(), label: nextLabel, text: "", isCorrect: false }]);
  };

  const handleDeleteOption = (id: number) => {
    if (options.length <= 1) return;
    const newOptions = options.filter(opt => opt.id !== id).map((opt, idx) => ({
       ...opt,
       label: String.fromCharCode(65 + idx)
    }));
    setOptions(newOptions);
  };

  const handleOptionTextChange = (id: number, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleToggleCorrect = (id: number) => {
    if (type === "MCQ") {
      setOptions(options.map(opt => ({ ...opt, isCorrect: opt.id === id })));
    } else {
      setOptions(options.map(opt => opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt));
    }
  };

  const handleSave = () => {
    const formattedQuestion = {
      type,
      points: `${score} pt`,
      question: questionText,
      options: type !== "Text" ? options.map(opt => ({
        label: `${opt.label}. ${opt.text}`,
        isCorrect: opt.isCorrect
      })) : null,
      description: type === "Text" ? "Sample description for text question..." : null
    };
    onSave(formattedQuestion);
    onClose();
  };

  const EditorToolbar = () => (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
      <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
        <RotateCcw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        <RotateCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex items-center gap-3 px-4 border-r border-gray-100 cursor-pointer group">
        <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Normal text</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>
      <div className="flex items-center gap-3 pr-4 border-r border-gray-100 cursor-pointer group">
        <List className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>
      <div className="flex items-center gap-4">
        <Bold className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-800" />
        <Italic className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-800" />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl min-h-[80vh] flex flex-col my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">1</div>
             <h3 className="text-lg font-bold text-[#1e1e50]">New Question</h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#1e1e50]">Score:</span>
              <input 
                type="text" 
                value={score} 
                onChange={(e) => setScore(e.target.value)}
                className="w-12 h-9 rounded-lg border border-gray-100 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6339f9]/10 focus:border-[#6339f9]"
              />
            </div>

            <div className="relative">
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="flex items-center gap-3 h-9 px-4 rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer hover:bg-gray-50 text-sm font-bold text-[#1e1e50] appearance-none outline-none pr-8"
              >
                <option value="MCQ">MCQ</option>
                <option value="Checkbox">Checkbox</option>
                <option value="Text">Text</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button onClick={onClose} className="text-gray-300 hover:text-gray-500">
               <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-250px)]">
          {/* Main Question Editor */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <EditorToolbar />
            <textarea 
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full h-32 p-4 text-sm focus:outline-none resize-none placeholder:text-gray-200"
              placeholder="Enter your question here..."
            />
          </div>

          {/* Options Section */}
          {type !== "Text" && (
            <div className="space-y-6">
              {options.map((opt) => (
                <div key={opt.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">{opt.label}</div>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={opt.isCorrect}
                          onChange={() => handleToggleCorrect(opt.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#6339f9] focus:ring-[#6339f9]" 
                        />
                        <span className="text-gray-500 font-medium group-hover:text-gray-700">Set as correct answer</span>
                      </label>
                    </div>
                    <Trash2 
                      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" 
                      onClick={() => handleDeleteOption(opt.id)}
                    />
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                    <EditorToolbar />
                    <textarea 
                      value={opt.text}
                      onChange={(e) => handleOptionTextChange(opt.id, e.target.value)}
                      className="w-full h-24 p-4 text-sm focus:outline-none resize-none"
                      placeholder={`Option ${opt.label} text...`}
                    />
                  </div>
                </div>
              ))}

              <button 
                onClick={handleAddOption}
                className="flex items-center gap-2 text-[#6339f9] font-bold text-sm hover:translate-x-1 transition-transform mt-4"
              >
                <Plus className="w-4 h-4" />
                Another options
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-gray-50 flex justify-end gap-3 bg-white rounded-b-3xl">
          <button 
            onClick={handleSave}
            className="px-10 py-3 border border-[#6339f9] text-[#6339f9] font-bold text-sm rounded-xl hover:bg-[#6339f9]/5 transition-all w-48"
          >
            Save
          </button>
          <button 
            onClick={handleSave}
            className="px-10 py-3 bg-[#6339f9] text-white font-bold text-sm rounded-xl hover:bg-[#522ed1] transition-all shadow-lg w-48 active:scale-95"
          >
            Save & Add More
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuestionModal;
