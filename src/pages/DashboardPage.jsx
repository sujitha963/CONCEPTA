import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import AchievementsView from '../components/common/AchievementsView';
import StudyTimerModal from '../components/common/StudyTimerModal';
import StreakFreezeModal from '../components/common/StreakFreezeModal';
import {
  Flame,
  Target,
  Coins,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Award,
  BarChart2,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { user, concepts, primaryGapConcept, quizHistory, navigate, reassessmentDone } = useApp();
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);

  // Weekly progress chart data
  const weeklyData = [
    { day: 'Mon', mastery: 48 },
    { day: 'Tue', mastery: 52 },
    { day: 'Wed', mastery: 55 },
    { day: 'Thu', mastery: 58 },
    { day: 'Fri', mastery: 61 },
    { day: 'Sat', mastery: 61.8 },
    { day: 'Sun', mastery: reassessmentDone ? 72.4 : 61.8 },
  ];

  const masteredCount = concepts.filter(c => c.status === 'Mastered').length;
  const developingCount = concepts.filter(c => c.status === 'Developing').length;
  const weakCount = concepts.filter(c => c.status === 'Needs Attention').length;

  const conceptsTarget = user.dailyConceptsTarget || 2;
  const conceptsCompleted = user.dailyConceptsCompleted || 1;
  const conceptsRemaining = Math.max(0, conceptsTarget - conceptsCompleted);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Product Principle Learning Loop Banner */}
      <FlowBanner />

      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            <Sparkles size={14} className="text-amber-500" /> Adaptive EdTech Hackathon Project
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user.name.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Goal: <span className="font-bold text-slate-800">{user.learningGoal}</span> • {user.collegeDetails?.degree || 'College'} Student ({user.collegeDetails?.department || 'CS'}).
          </p>
        </div>

        {/* Quick CTA */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 z-10">
          <button
            onClick={() => setShowTimerModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2"
          >
            <Clock size={16} /> Launch Focus Timer
          </button>
          {primaryGapConcept && (
            <button
              onClick={() => navigate('gap-result')}
              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-rose-600/25 transition flex items-center justify-center gap-2"
            >
              <Flame size={16} /> Repair Knowledge Gap
            </button>
          )}
        </div>
      </div>

      {/* Key Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Streak & Freeze Status */}
        <div
          onClick={() => setShowFreezeModal(true)}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-300 transition"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
            <Flame size={24} className="fill-rose-500 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Mastery Streak</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{user.masteryStreak} Days</h3>
            <p className="text-[10px] font-semibold text-rose-600 mt-0.5">
              ❄️ {user.streakFreezes || 1} Freeze Equipped
            </p>
          </div>
        </div>

        {/* Daily Study Minutes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Target size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Daily Study Target</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {user.dailyTargetCompletedMinutes}/{user.dailyTargetMinutes} <span className="text-xs font-normal text-slate-500">mins</span>
            </h3>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${Math.min(100, (user.dailyTargetCompletedMinutes / user.dailyTargetMinutes) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Concept Coins */}
        <div
          onClick={() => setShowFreezeModal(true)}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-300 transition"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Coins size={24} className="fill-amber-400" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Concept Coins</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{user.conceptCoins}</h3>
            <p className="text-[10px] font-semibold text-amber-700 mt-0.5">Click for Freeze Shop</p>
          </div>
        </div>

        {/* DS Mastery Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">DS Mastery Score</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {reassessmentDone ? '72.4%' : '61.8%'}
            </h3>
            <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
              {reassessmentDone ? '▲ +10.6% Improved!' : 'Diagnostic complete'}
            </p>
          </div>
        </div>

      </div>

      {/* GAMIFICATION WIDGET 1: Daily Concept Goal Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-200 text-[11px] font-bold px-3 py-1 rounded-full border border-indigo-400/30">
              <Target size={14} className="text-emerald-400" /> Daily Concept Goal
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              “Complete {conceptsTarget} concepts today.”
            </h2>
            <p className="text-xs text-indigo-200/90 font-medium">
              Completed: <strong className="text-emerald-400">{conceptsCompleted}</strong> / {conceptsTarget} Concepts • Remaining: <strong className="text-amber-300">{conceptsRemaining} Concept</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="w-32 bg-slate-800/80 h-3 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-400 to-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(conceptsCompleted / conceptsTarget) * 100}%` }}
              />
            </div>

            <button
              onClick={() => navigate('recommended-learning')}
              className="bg-white text-indigo-950 hover:bg-indigo-50 font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition shrink-0 flex items-center gap-1.5"
            >
              Continue Learning <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Primary Knowledge Gap & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Primary Gap & Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Primary Knowledge Gap Highlight Card */}
          {primaryGapConcept && (
            <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-rose-700/60 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-200 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-500/40 mb-3">
                    <AlertCircle size={14} className="text-rose-400" /> Primary Knowledge Gap Identified
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {primaryGapConcept.name} — <span className="text-rose-400">{primaryGapConcept.mastery}% Mastery</span>
                  </h2>
                  <p className="text-xs text-rose-100/80 mt-2 max-w-md leading-relaxed font-medium">
                    Your diagnostic test revealed difficulty optimizing O(N²) nested array loops into single-pass O(N) window algorithms.
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => navigate('gap-result')}
                    className="w-full sm:w-auto bg-white text-rose-950 hover:bg-rose-50 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Start Targeted Learning <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Continue Learning Module Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-600" /> Recommended Learning Path
              </h3>
              <span className="text-xs font-semibold text-slate-500">Data Structures</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-md">
                  Recommended Concept
                </span>
                <h4 className="font-extrabold text-lg text-slate-900 mt-1">Sliding Window Pattern & Visual Notes</h4>
                <p className="text-xs text-slate-600 mt-1">
                  12 mins • Visual step-by-step slider + practice questions + reassessment.
                </p>
              </div>

              <button
                onClick={() => navigate('recommended-learning')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition shrink-0 flex items-center justify-center gap-1.5"
              >
                Resume Module <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <BarChart2 size={18} className="text-indigo-600" /> Weekly Concept Mastery Trajectory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time score reflection upon reassessment</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {reassessmentDone ? '+10.6% Growth' : 'Diagnostic Baseline'}
              </span>
            </div>

            <div className="h-48 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[30, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value) => [`${value}%`, 'Mastery Score']}
                  />
                  <Area type="monotone" dataKey="mastery" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMastery)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Knowledge Overview & Activity */}
        <div className="space-y-6">
          
          {/* Knowledge Overview Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              Concept Mastery Overview
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Mastered Concepts
                </span>
                <span className="font-extrabold text-slate-900">{masteredCount} Concepts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Developing Concepts
                </span>
                <span className="font-extrabold text-slate-900">{developingCount} Concepts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Needs Attention
                </span>
                <span className="font-extrabold text-rose-600">{weakCount} Concept</span>
              </div>
            </div>

            <button
              onClick={() => navigate('knowledge-map')}
              className="w-full mt-2 text-xs font-extrabold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2.5 px-4 rounded-xl border border-indigo-200 transition text-center"
            >
              Open Full Knowledge Map →
            </button>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              Recent Activity
            </h3>

            <div className="space-y-3.5">
              {quizHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Score: <span className="font-bold text-indigo-600">{item.overallScore}%</span> • {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* GAMIFICATION SECTION 2: Achievements & Badges Grid */}
      <AchievementsView />

      {/* Modals */}
      <StudyTimerModal isOpen={showTimerModal} onClose={() => setShowTimerModal(false)} />
      <StreakFreezeModal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} />
    </div>
  );
}
