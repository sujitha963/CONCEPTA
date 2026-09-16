import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import { PRACTICE_QUESTIONS_SLIDING_WINDOW } from '../data/initialData';
import { CheckCircle2, ChevronRight, RotateCcw, ArrowRight, HelpCircle, Award, Sparkles } from 'lucide-react';

export default function PracticeQuizPage() {
  const { navigate, recordActivity } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = PRACTICE_QUESTIONS_SLIDING_WINDOW;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));
  };

  const handleFinishPractice = () => {
    setSubmitted(true);
    recordActivity('practice');
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Targeted Practice • Sliding Window
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Weak Concept Drill
            </h1>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/30'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="bg-white border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl disabled:opacity-40"
              >
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
                >
                  Next Practice Question
                </button>
              ) : (
                <button
                  onClick={handleFinishPractice}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-7 py-3 rounded-xl shadow-lg transition"
                >
                  Complete Practice Drill
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Post Practice Summary */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Practice Drills Completed!
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Great job practicing Sliding Window!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed font-medium">
                You are now ready to take the official Reassessment Quiz to upgrade your Knowledge Map score from 28% ➔ 81%!
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('reassessment')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                Launch Reassessment Quiz <RotateCcw size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
