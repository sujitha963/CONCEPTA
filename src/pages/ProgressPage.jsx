import React from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Flame,
  Zap,
  AlertCircle,
  Target,
  BarChart2,
  Award,
  Sparkles,
  ArrowRight,
  Printer,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';

export default function ProgressPage() {
  const { concepts, user, navigate, reassessmentDone } = useApp();

  // Weekly study minutes dataset
  const studyTimeData = [
    { day: 'Mon', minutes: 30 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 35 },
    { day: 'Thu', minutes: 40 },
    { day: 'Fri', minutes: 30 },
    { day: 'Sat', minutes: 45 },
    { day: 'Sun', minutes: 40 }
  ];

  // Concept accuracy comparison dataset
  const conceptComparisonData = concepts.map(c => ({
    name: c.name,
    Initial: c.name === 'Sliding Window' ? 28 : c.mastery,
    Current: c.mastery
  }));

  const masteredCount = concepts.filter(c => c.status === 'Mastered').length;
  const weakestRemaining = concepts.reduce((prev, curr) => (prev.mastery < curr.mastery ? prev : curr), concepts[0]);

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              <Sparkles size={14} className="text-amber-500" /> Weekly Adaptive Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Weekly Learning Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Comprehensive report for student <strong>{user.name}</strong> • Week ending Sep 14
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
          >
            <Printer size={15} /> Print Report
          </button>
        </div>
      </div>

      {/* 8 Weekly Report Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Study Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Study Time</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">3h 45m</h3>
            <p className="text-[10px] font-semibold text-indigo-600 mt-0.5">225 Mins logged</p>
          </div>
        </div>

        {/* Concepts Practiced */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Concepts Practiced</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">5 Concepts</h3>
            <p className="text-[10px] font-semibold text-sky-600 mt-0.5">Data Structures</p>
          </div>
        </div>

        {/* Concepts Mastered */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Concepts Mastered</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{masteredCount} / 5</h3>
            <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">≥80% Accuracy</p>
          </div>
        </div>

        {/* Mastery Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
            <Flame size={24} className="fill-rose-500 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Current Streak</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{user.masteryStreak} Days</h3>
            <p className="text-[10px] font-semibold text-rose-600 mt-0.5">🔥 Active consistency</p>
          </div>
        </div>

        {/* Overall Mastery Improvement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Mastery Growth</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {reassessmentDone ? '+10.6%' : 'Baseline'}
            </h3>
            <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
              {reassessmentDone ? '61.8% ➔ 72.4%' : 'Diagnostic active'}
            </p>
          </div>
        </div>

        {/* Biggest Improvement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Biggest Improvement</p>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5 truncate">
              Sliding Window
            </h3>
            <p className="text-[10px] font-semibold text-amber-700 mt-0.5">
              {reassessmentDone ? '28% ➔ 81% (+53% 🎉)' : 'Repair in progress'}
            </p>
          </div>
        </div>

        {/* Weakest Remaining Concept */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Weakest Remaining</p>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5 truncate">
              {weakestRemaining.name}
            </h3>
            <p className="text-[10px] font-semibold text-rose-600 mt-0.5">
              {weakestRemaining.mastery}% Accuracy
            </p>
          </div>
        </div>

        {/* Recommended Focus Next Week */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Target size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Next Week Focus</p>
            <h3 className="text-sm font-extrabold text-slate-900 mt-0.5 truncate">
              Tree Recursion
            </h3>
            <p className="text-[10px] font-semibold text-indigo-600 mt-0.5">Call Stack Formulation</p>
          </div>
        </div>

      </div>

      {/* Recharts Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Daily Study Minutes */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600" /> Daily Focus Study Time (Minutes)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Minutes logged per day across focus timers and practice</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val} mins`, 'Study Time']}
                />
                <Bar dataKey="minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Initial vs Current Concept Mastery Comparison */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <BarChart2 size={18} className="text-indigo-600" /> Concept Accuracy Shift
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Comparison between initial diagnostic score & current score</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conceptComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Accuracy']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="Initial" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Current" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recommended Action Card for Next Week */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30">
            Next Week Recommendation
          </span>
          <h3 className="text-xl font-extrabold mt-2">Target Weakest Remaining Concept: Recursion</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Recursion is currently at 45% accuracy. Studying call stack formulation will elevate your Data Structures mastery above 80%.
          </p>
        </div>

        <button
          onClick={() => navigate('notes')}
          className="bg-white text-indigo-950 hover:bg-indigo-50 font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-1.5 shrink-0"
        >
          Study Recursion Notes <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
