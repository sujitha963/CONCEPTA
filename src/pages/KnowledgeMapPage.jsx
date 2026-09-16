import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import KnowledgeGraphView from '../components/visualizers/KnowledgeGraphView';
import { Network, Flame, CheckCircle2, AlertCircle, ArrowRight, Filter } from 'lucide-react';

export default function KnowledgeMapPage() {
  const { concepts, primaryGapConcept, navigate } = useApp();
  const [filter, setFilter] = useState('All');

  const filteredConcepts = concepts.filter(c => {
    if (filter === 'Mastered') return c.status === 'Mastered';
    if (filter === 'Developing') return c.status === 'Developing';
    if (filter === 'Needs Attention') return c.status === 'Needs Attention';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Visual Knowledge Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Data Structures Knowledge Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualizing concept mastery distribution and key knowledge gap priorities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          {['All', 'Mastered', 'Developing', 'Needs Attention'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                filter === f
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Network Map */}
      <KnowledgeGraphView />

      {/* Concept Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredConcepts.map((c) => {
          const isPrimary = c.isPrimaryGap;
          return (
            <div
              key={c.id}
              className={`bg-white p-6 rounded-3xl border shadow-sm transition ${
                isPrimary
                  ? 'border-rose-400 ring-2 ring-rose-500/20 shadow-rose-100'
                  : 'border-slate-200'
              }`}
            >
              {isPrimary && (
                <div className="flex items-center gap-1 text-[10px] font-extrabold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full w-max mb-3 border border-rose-200">
                  <Flame size={12} className="fill-rose-500" /> Primary Gap
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-extrabold text-lg text-slate-900">{c.name}</h3>
                <span
                  className={`text-sm font-black ${
                    c.mastery >= 80 ? 'text-emerald-600' : c.mastery >= 50 ? 'text-amber-600' : 'text-rose-600'
                  }`}
                >
                  {c.mastery}%
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.description}</p>

              <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    c.mastery >= 80 ? 'bg-emerald-500' : c.mastery >= 50 ? 'bg-amber-500' : 'bg-rose-600'
                  }`}
                  style={{ width: `${c.mastery}%` }}
                />
              </div>

              <button
                onClick={() => {
                  if (c.isPrimaryGap) navigate('gap-result');
                  else navigate('recommended-learning');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
              >
                {c.isPrimaryGap ? 'Repair Gap Now' : 'Study Concept Notes'} <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
