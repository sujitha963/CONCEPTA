import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import { REASSESSMENT_QUESTIONS_SLIDING_WINDOW } from '../data/initialData';
import {
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Coins,
  ArrowRight,
  RotateCcw,
  Award,
  Flame,
  Network
} from 'lucide-react';

export default function ReassessmentPage() {
  const { submitReassessmentQuiz, reassessmentDone, navigate } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(reassessmentDone);

  const questions = REASSESSMENT_QUESTIONS_SLIDING_WINDOW;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (idx) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: idx
    }));
  };

  const handleCompleteReassessment = () => {
    setIsFinished(true);
    submitReassessmentQuiz(81);
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        {!isFinished ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Concept Reassessment • Sliding Window
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Reassessment Diagnostic Test
                </h1>
              </div>
              <span className="text-xs font-bold text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
            </div>

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
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
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
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteReassessment}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition"
                  >
                    Submit Reassessment <CheckCircle2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Reassessment Victory / Score Upgrade Screen */
          <div className="space-y-8 py-4">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl border border-indigo-700/50 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-4 py-1.5 rounded-full border border-emerald-400/40 mb-4">
                <Sparkles size={16} className="text-amber-400" /> Mastery Milestone Achieved!
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Sliding Window Concept Repaired! 🎉
              </h2>

              <p className="text-xs sm:text-sm text-indigo-200 mt-2 max-w-lg mx-auto font-medium leading-relaxed">
                Your targeted learning and practice paid off! The Concepta analysis engine has updated your knowledge map.
              </p>

              {/* Before vs After Score Comparison */}
              <div className="grid grid-cols-2 max-w-md mx-auto gap-4 my-8">
                <div className="bg-rose-950/80 border border-rose-700/60 p-4 rounded-2xl">
                  <p className="text-[10px] font-extrabold uppercase text-rose-300">Initial Diagnostic</p>
                  <h3 className="text-3xl font-black text-rose-400 mt-1">28%</h3>
                  <span className="text-[10px] bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded font-bold">Needs Attention</span>
                </div>

                <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-2xl ring-2 ring-emerald-500/40 animate-pulse-subtle">
                  <p className="text-[10px] font-extrabold uppercase text-emerald-300">Reassessment Score</p>
                  <h3 className="text-3xl font-black text-emerald-400 mt-1">81%</h3>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded font-bold">Mastered ✓</span>
                </div>
              </div>

              {/* Rewards */}
              <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-2.5 rounded-full text-xs font-extrabold text-amber-300 border border-white/10">
                <span className="flex items-center gap-1.5">
                  <Coins size={16} className="fill-amber-400 text-amber-400" /> +50 Concept Coins
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1.5 text-rose-300">
                  <Flame size={16} className="fill-rose-400 text-rose-400" /> Streak Preserved
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('knowledge-map')}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                Inspect Updated Knowledge Map <Network size={16} />
              </button>
              <button
                onClick={() => navigate('dashboard')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
