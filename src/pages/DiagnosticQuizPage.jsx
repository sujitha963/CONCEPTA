import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import { DIAGNOSTIC_QUIZ_QUESTIONS } from '../data/initialData';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle, Tag, Clock } from 'lucide-react';

export default function DiagnosticQuizPage() {
  const { submitDiagnosticQuiz, navigate } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { 1: 0, 2: 1, 3: 1, 4: 0, 5: 0 }

  const questions = DIAGNOSTIC_QUIZ_QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate concept accuracy based on answers
    // Default demo scores matching requirement if unanswered or default:
    // Arrays: 90%, Strings: 84%, Hashing: 62%, Recursion: 45%, Sliding Window: 28%
    const conceptScores = {
      'Arrays': 90,
      'Strings': 84,
      'Hashing': 62,
      'Recursion': 45,
      'Sliding Window': 28
    };

    // If user answered specific question incorrect/correct, tweak score dynamically
    questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      if (userChoice !== undefined) {
        const isCorrect = userChoice === q.correctAnswer;
        if (isCorrect) {
          conceptScores[q.concept] = Math.min(100, (conceptScores[q.concept] || 50) + 10);
        } else {
          conceptScores[q.concept] = Math.max(10, (conceptScores[q.concept] || 50) - 15);
        }
      }
    });

    submitDiagnosticQuiz(conceptScores);
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header & Progress */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Data Structures Diagnostic Test
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Concept-Tagged Assessment
            </h1>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-500">Question {currentIndex + 1} of {total}</span>
            <div className="w-36 bg-slate-100 h-2 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
              <Tag size={12} /> Concept: {currentQuestion.concept}
            </span>
            <span className="bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
              Difficulty: {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/30 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                </div>

                {isSelected && <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {currentIndex < total - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
            >
              Next Question <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition"
            >
              Submit Diagnostic Test <CheckCircle2 size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
