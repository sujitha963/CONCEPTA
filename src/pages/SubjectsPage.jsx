import React from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import {
  Boxes,
  GitFork,
  Database,
  Code2,
  ArrowRight,
  Target,
  CheckCircle2,
  BarChart2,
  BookOpen
} from 'lucide-react';

export default function SubjectsPage() {
  const { subjects, navigate, setSelectedSubjectId } = useApp();

  const getIcon = (name) => {
    switch (name) {
      case 'Boxes': return Boxes;
      case 'GitFork': return GitFork;
      case 'Database': return Database;
      default: return Code2;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Subject Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Choose a Subject for Diagnostic Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Select a subject to launch concept-tagged diagnostic testing, pinpoint knowledge gaps, or view your knowledge map.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subj) => {
          const Icon = getIcon(subj.icon);
          const isDS = subj.id === 'ds';

          return (
            <div
              key={subj.id}
              className={`bg-white rounded-3xl border p-6 md:p-7 shadow-sm transition-all duration-200 relative ${
                isDS
                  ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {isDS && (
                <span className="absolute top-4 right-4 bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Active Demo Focus
                </span>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{subj.category}</span>
                  <h3 className="font-extrabold text-xl text-slate-900">{subj.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{subj.description}</p>
                </div>
              </div>

              {/* Progress Bar & Stats */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Average Concept Mastery</span>
                  <span className="font-extrabold text-indigo-600">{subj.averageMastery}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${subj.averageMastery}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-medium">
                  <span>{subj.conceptCount} Core Concepts</span>
                  <span className="font-semibold text-slate-700">{subj.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    navigate('diagnostic-quiz');
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Target size={14} /> Take Diagnostic Quiz
                </button>
                <button
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    navigate('knowledge-map');
                  }}
                  className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs py-3 px-4 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <BarChart2 size={14} /> Knowledge Map
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
