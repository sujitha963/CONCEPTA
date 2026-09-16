import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  Network,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  ShieldAlert,
  Flame,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              C
            </div>
            <div>
              <span className="font-extrabold text-xl text-slate-900 tracking-wider">CONCEPTA</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full ml-2">
                Hackathon Edition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('register')}
              className="text-xs font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('onboarding')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-extrabold mb-6 shadow-xs">
            <Sparkles size={14} className="text-amber-500" />
            <span>Built by Team Cipher Mates</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Learn what you <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">need next.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Concepta is a student-first adaptive learning platform. Instead of giving you an arbitrary quiz percentage score, Concepta diagnoses exact underlying concept gaps and guides you step-by-step to mastery.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('dashboard')}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              Launch Student Dashboard <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('diagnostic-quiz')}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold px-6 py-3.5 rounded-2xl shadow-sm transition flex items-center justify-center gap-2"
            >
              Take Diagnostic Quiz
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="mt-12 inline-flex items-center justify-center gap-6 sm:gap-12 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-600">
            <div><span className="font-extrabold text-slate-900">5</span> Core Concepts</div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div><span className="font-extrabold text-indigo-600">O(1) Gap Detection</span></div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div><span className="font-extrabold text-emerald-600">28% ➔ 81%</span> Reassessment Engine</div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The EdTech Problem vs Concepta’s Solution
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              Why traditional test scores fail students, and how targeted concept analysis changes everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 sm:p-8">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5 font-bold">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-lg font-bold text-rose-950 mb-2">Traditional Quiz Platforms</h3>
              <p className="text-xs text-rose-800 leading-relaxed font-medium mb-4">
                "You scored 65% on Data Structures!"
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Shows only an aggregate score without topic breakdown.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Leaves the student guessing what to study next.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Demotivates students by treating all mistakes equally.
                </li>
              </ul>
            </div>

            {/* The Concepta Way */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-6 sm:p-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 font-bold">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">Concepta Adaptive Platform</h3>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium mb-4">
                "Your biggest knowledge gap is Sliding Window (28%). Repair this now!"
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Pinpoints exact weak concept tags instantly.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Provides targeted notes, visualizers & step explanations.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Reassesses targeted concepts to verify real score jumps (28% ➔ 81%).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Complete Hackathon Demo Flow
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Follow Alex's learning journey from diagnostic quiz to mastery update.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">1. Diagnostic Quiz</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take concept-tagged questions on Arrays, Strings, Hashing, Recursion, and Sliding Window.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
                <Network size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">2. Knowledge Map & Gap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect concept mastery rings and highlight your primary knowledge gap (Sliding Window at 28%).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">3. Learn & Reassess</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interact with step visualizers, complete practice questions, and watch mastery jump to 81%!
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition inline-flex items-center gap-2"
            >
              Start Exploring Concepta Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-300 font-bold">CONCEPTA — Hackathon Prototype</p>
          <p className="text-slate-500 mt-1">Built with ❤️ by Team Cipher Mates</p>
        </div>
      </footer>
    </div>
  );
}
