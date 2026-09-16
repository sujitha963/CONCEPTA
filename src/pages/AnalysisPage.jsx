import React from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  BarChart2,
  Brain,
  Info,
  ChevronRight
} from 'lucide-react';

export default function AnalysisPage() {
  const { concepts, primaryGapConcept, navigate } = useApp();

  const strongConcepts = concepts.filter(c => c.mastery >= 80);
  const developingConcepts = concepts.filter(c => c.mastery >= 50 && c.mastery < 80);
  const weakConcepts = concepts.filter(c => c.mastery < 50);

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              <Brain size={14} className="text-indigo-600" /> Concepta Analysis Engine Results
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Diagnostic Concept Breakdown
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Data Structures concept-wise accuracy calculated from diagnostic performance.
            </p>
          </div>

          <button
            onClick={() => navigate('knowledge-map')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-1.5 shrink-0"
          >
            View Interactive Knowledge Map <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Primary Knowledge Gap Hero Box */}
      {primaryGapConcept && (
        <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-700/60 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-200 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-500/40">
                <Flame size={14} className="text-rose-400 fill-rose-400" /> Primary Knowledge Gap Detected
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {primaryGapConcept.name} — <span className="text-rose-400">{primaryGapConcept.mastery}% Accuracy</span>
              </h2>
              <p className="text-xs sm:text-sm text-rose-100/80 max-w-xl leading-relaxed">
                Your diagnostic performance identified Sliding Window as your single lowest concept. Addressing this gap will unlock maximum performance gains across array and string algorithms.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => navigate('gap-result')}
                className="w-full md:w-auto bg-white hover:bg-rose-50 text-rose-950 font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
              >
                Inspect Gap & Start Learning <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accuracy List Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          Concept-wise Accuracy Breakdown
        </h3>

        <div className="space-y-4">
          {concepts.map((concept) => {
            const isMastered = concept.mastery >= 80;
            const isDeveloping = concept.mastery >= 50 && concept.mastery < 80;
            const isWeak = concept.mastery < 50;

            return (
              <div
                key={concept.id}
                className={`p-4 sm:p-5 rounded-2xl border transition ${
                  concept.isPrimaryGap
                    ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-500/30'
                    : isMastered
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isDeveloping
                    ? 'bg-amber-50/40 border-amber-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isMastered
                          ? 'bg-emerald-500 text-white'
                          : isDeveloping
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {concept.mastery}%
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{concept.name}</h4>
                      <span className="text-xs text-slate-500 font-medium">{concept.description}</span>
                    </div>
                  </div>

                  <span
                    className={`self-start sm:self-auto text-xs font-extrabold px-3 py-1 rounded-full ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-800'
                        : isDeveloping
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {concept.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered
                        ? 'bg-emerald-500'
                        : isDeveloping
                        ? 'bg-amber-500'
                        : 'bg-rose-600'
                    }`}
                    style={{ width: `${concept.mastery}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclosure Box */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Rule-Based Analysis Engine:</strong> Concepta prototype uses deterministic rule-based evaluation to calculate exact concept accuracies and isolate primary knowledge gaps. Machine learning modules will integrate in production.
        </p>
      </div>
    </div>
  );
}
