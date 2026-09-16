import React from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import {
  Flame,
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function GapResultPage() {
  const { primaryGapConcept, navigate, reassessmentDone } = useApp();

  const gap = primaryGapConcept || {
    name: 'Sliding Window',
    mastery: 28,
    status: 'Needs Attention'
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Main Hero Gap Result Container */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-600/40 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-200 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
            <Flame size={16} className="text-rose-400 fill-rose-400 animate-pulse" />
            <span>Primary Knowledge Gap Highlight</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            "Your biggest knowledge gap is <span className="text-rose-400 underline decoration-rose-500 decoration-wavy decoration-2">{gap.name}</span>."
          </h1>

          <div className="flex items-center gap-4 pt-2">
            <div className="bg-rose-950/80 border border-rose-700/60 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-rose-400">{gap.mastery}%</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-rose-300">Current Mastery</p>
                <p className="text-xs font-semibold text-rose-200">{gap.status}</p>
              </div>
            </div>

            {reassessmentDone && (
              <div className="bg-emerald-950/80 border border-emerald-700/60 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">81%</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-300">Reassessed Mastery</p>
                  <p className="text-xs font-semibold text-emerald-200">🎉 Mastered!</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-medium">
            Don't worry, Alex! Recognizing this gap is the single most effective step toward mastering Data Structures. Sliding Window algorithm patterns frequently appear in tech interview questions involving subarrays, strings, and dynamic contiguous ranges.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('recommended-learning')}
              className="w-full sm:w-auto bg-white text-rose-950 hover:bg-rose-50 font-black text-sm px-8 py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              Start Recommended Learning Module <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('knowledge-map')}
              className="w-full sm:w-auto bg-rose-950/50 hover:bg-rose-900/60 text-rose-200 border border-rose-700/50 font-bold text-xs px-6 py-4 rounded-2xl transition flex items-center justify-center gap-1.5"
            >
              Back to Knowledge Map
            </button>
          </div>
        </div>
      </div>

      {/* Analytical Breakdown: Why this concept needs attention */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" size={22} /> Why {gap.name} Needs Attention
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-3">
              <Zap size={20} />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">Complexity Bottleneck</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without Sliding Window intuition, brute-force solutions run in O(N²) quadratic time, leading to Time Limit Exceeded (TLE) errors in online coding assessments.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3">
              <AlertCircle size={20} />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">Window Synchronization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diagnostic answers showed confusion when maintaining left and right pointer bounds when shrinking dynamic variable-sized windows.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">High-Yield Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fixing this single gap increases overall Data Structures mastery from 61.8% to 72.4% and grants +50 Concept Coins!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
