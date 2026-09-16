import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import SlidingWindowVisualizer from '../components/visualizers/SlidingWindowVisualizer';
import { SLIDING_WINDOW_LEARNING_CONTENT } from '../data/initialData';
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Flame,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function RecommendedLearningPage() {
  const { navigate, recordActivity } = useApp();
  const [activeTab, setActiveTab] = useState('intuition'); // intuition | visualizer | patterns
  const [isCompleted, setIsCompleted] = useState(false);

  const content = SLIDING_WINDOW_LEARNING_CONTENT;

  const handleToggleComplete = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (nextState) {
      recordActivity('learning');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
              <Flame size={14} className="fill-rose-500" /> Gap Repair Module
            </span>
            <span className="text-xs font-semibold text-slate-500">{content.estimatedTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {content.summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={handleToggleComplete}
            className={`w-full sm:w-auto font-bold text-xs px-4 py-3 rounded-xl border transition flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 size={16} className={isCompleted ? 'text-emerald-600' : 'text-slate-400'} />
            <span>{isCompleted ? 'Marked Complete ✓' : 'Mark as Complete'}</span>
          </button>

          <button
            onClick={() => navigate('practice-quiz')}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            Take Practice Quiz <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'intuition', label: '1. Intuition & Concept', icon: BookOpen },
          { id: 'visualizer', label: '2. Interactive Step Visualizer', icon: Sparkles },
          { id: 'patterns', label: '3. Code Patterns & Notes', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-extrabold border-b-2 transition whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Intuition & Overview */}
      {activeTab === 'intuition' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Core Intuition: Why Slide?</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Imagine looking through a physical sliding window frame over a long row of houses. As you step forward, only one house leaves your view on the left, and only one new house enters on the right. You don't need to count all houses inside the frame from scratch every step!
            </p>

            <div className="bg-indigo-50/80 border border-indigo-200 p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">
                The O(N²) ➔ O(N) Efficiency Shift
              </h4>
              <p className="text-xs text-indigo-900 leading-relaxed">
                Brute Force: Recomputing sum of K elements at every position = <strong>O(N * K)</strong>.<br />
                Sliding Window: <code>windowSum += incomingElement - outgoingElement</code> = <strong>O(N)</strong> total time!
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('visualizer')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              Next: Interactive Visualizer <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Visualizer */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <SlidingWindowVisualizer />

          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveTab('intuition')}
              className="bg-white text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
            >
              ← Previous: Concept Intuition
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              Next: Code Patterns <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Code Patterns & Notes */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.keyPatterns.map((pat, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Pattern {idx + 1}
                </span>
                <h3 className="font-extrabold text-base text-slate-900">{pat.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{pat.description}</p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{pat.codeSnippet}</pre>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold">Ready to verify your mastery?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Take the targeted practice quiz or launch reassessment directly!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('practice-quiz')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition"
              >
                Practice Quiz
              </button>
              <button
                onClick={() => navigate('reassessment')}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-1.5"
              >
                Launch Reassessment <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
