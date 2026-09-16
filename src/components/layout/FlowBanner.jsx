import React from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, ChevronRight, CheckCircle2, Flame, Target, BookOpen, RotateCcw } from 'lucide-react';

export default function FlowBanner() {
  const { currentView, navigate } = useApp();

  const steps = [
    { id: 'diagnostic-quiz', label: '1. Diagnostic Quiz', icon: Target },
    { id: 'analysis', label: '2. Concept Analysis', icon: CheckCircle2 },
    { id: 'knowledge-map', label: '3. Knowledge Map', icon: HelpCircle },
    { id: 'gap-result', label: '4. Knowledge Gap', icon: Flame },
    { id: 'recommended-learning', label: '5. Learn Concept', icon: BookOpen },
    { id: 'practice-quiz', label: '6. Practice & Reassess', icon: RotateCcw },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-4 md:p-5 shadow-lg border border-indigo-700/50 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-400/30 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Concepta Product Principle
          </span>
          <h2 className="text-base md:text-lg font-extrabold text-white tracking-tight">
            Not just quiz scores — <span className="text-indigo-300">targeted concept repair loop</span>
          </h2>
        </div>
        <div className="text-xs text-indigo-200/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 self-start lg:self-auto">
          <span>Team Cipher Mates Hackathon Project</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-indigo-700/40">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentView === step.id;
          return (
            <button
              key={step.id}
              onClick={() => navigate(step.id)}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-white text-indigo-950 font-bold shadow-md ring-2 ring-indigo-400 scale-[1.02]'
                  : 'bg-indigo-950/40 text-indigo-200 hover:bg-indigo-700/40 hover:text-white border border-indigo-800/50'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-900/60 text-indigo-300'}`}>
                <Icon size={14} />
              </div>
              <span className="truncate">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
